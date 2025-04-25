"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Clock, Star, Filter, Info } from "lucide-react"
import { exerciseLocations, type ExerciseLocation, type ExerciseType } from "@/data/exercise-locations"

// Dynamically import the MapContainer component with SSR disabled
const MapContainerComponent = dynamic(() => import("./map-container"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 h-[50vh] md:h-screen bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg font-medium">Loading map...</p>
        <p className="text-sm text-gray-500">Please wait while we load the exercise locations</p>
      </div>
    </div>
  ),
})

const LocationPermissionBanner = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <Info className="h-5 w-5 text-amber-500" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-amber-700">
            Location access is disabled. We're showing default locations in New York City. You can still explore the map
            and filter locations.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function ExerciseMap() {
  const [selectedLocation, setSelectedLocation] = useState<ExerciseLocation | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([40.7128, -74.006]) // NYC default
  const [activeFilter, setActiveFilter] = useState<ExerciseType | "all">("all")
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null)
  const [locationAttempted, setLocationAttempted] = useState(false)
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)

    // Get user's location if they allow it
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      setLocationAttempted(true)
      try {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            setUserLocation([latitude, longitude])
            setMapCenter([latitude, longitude])
          },
          (error) => {
            console.log("Geolocation error:", error.message)
            // Just use the default location and don't show an error to the user
          },
          { timeout: 5000, enableHighAccuracy: false },
        )
      } catch (error) {
        console.log("Geolocation exception:", error)
        // Fallback silently to default location
      }
    }
  }, [])

  const filteredLocations =
    activeFilter === "all" ? exerciseLocations : exerciseLocations.filter((location) => location.type === activeFilter)

  const handleMarkerClick = (location: ExerciseLocation) => {
    setSelectedLocation(location)
    setMapCenter([location.lat, location.lng])
  }

  const getTypeColor = (type: ExerciseType) => {
    switch (type) {
      case "gym":
        return "bg-red-500"
      case "park":
        return "bg-green-500"
      case "trail":
        return "bg-amber-500"
      case "pool":
        return "bg-blue-500"
      case "court":
        return "bg-purple-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <>
      <div className="w-full md:w-1/3 p-4 overflow-y-auto max-h-[50vh] md:max-h-screen">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter size={18} />
              Filter Locations
            </CardTitle>
            <CardDescription>Find the perfect place to exercise</CardDescription>
          </CardHeader>
          <CardContent>
            {locationAttempted && !userLocation && <LocationPermissionBanner />}
            <Tabs value={activeFilter} onValueChange={(value) => setActiveFilter(value as ExerciseType | "all")}>
              <TabsList className="grid grid-cols-3 mb-4">
                <TabsTrigger
                  value="all"
                  className={activeFilter === "all" ? "bg-green-100 data-[state=active]:bg-green-600" : ""}
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="gym"
                  className={activeFilter === "gym" ? "bg-red-100 data-[state=active]:bg-red-600" : ""}
                >
                  Gyms
                </TabsTrigger>
                <TabsTrigger
                  value="park"
                  className={activeFilter === "park" ? "bg-green-100 data-[state=active]:bg-green-600" : ""}
                >
                  Parks
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="space-y-4 mt-4">
              {filteredLocations.map((location) => (
                <Card
                  key={location.id}
                  className={`cursor-pointer hover:shadow-md transition-shadow ${selectedLocation?.id === location.id ? "ring-2 ring-green-500" : ""}`}
                  onClick={() => handleMarkerClick(location)}
                >
                  <CardHeader className="p-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-base">{location.name}</CardTitle>
                      <Badge className={getTypeColor(location.type)}>
                        {location.type.charAt(0).toUpperCase() + location.type.slice(1)}
                      </Badge>
                    </div>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin size={14} />
                      {location.address}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-3 pt-0 text-xs text-gray-500 flex gap-3">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {location.hours}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} />
                      {location.rating}/5
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {isBrowser && (
        <MapContainerComponent
          mapCenter={mapCenter}
          userLocation={userLocation}
          filteredLocations={filteredLocations}
          selectedLocation={selectedLocation}
          handleMarkerClick={handleMarkerClick}
          getTypeColor={getTypeColor}
        />
      )}
    </>
  )
}
