"use client"

import { useState, useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Users, Clock, Info, Star, Filter } from "lucide-react"
import { exerciseLocations, type ExerciseLocation, type ExerciseType } from "@/data/exercise-locations"

// Fix for Leaflet icon issue in Next.js
const customIcon = (type: ExerciseType) => {
  let iconUrl = "/markers/gym.svg"
  const iconSize: [number, number] = [32, 32]

  switch (type) {
    case "gym":
      iconUrl = "/markers/gym.svg"
      break
    case "park":
      iconUrl = "/markers/park.svg"
      break
    case "trail":
      iconUrl = "/markers/trail.svg"
      break
    case "pool":
      iconUrl = "/markers/pool.svg"
      break
    case "court":
      iconUrl = "/markers/court.svg"
      break
  }

  return new Icon({
    iconUrl,
    iconSize,
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  })
}

function MapController({ center }: { center: [number, number] }) {
  const map = useMap()

  useEffect(() => {
    map.setView(center, map.getZoom())
  }, [center, map])

  return null
}

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
  const [mapRef] = useState(useRef(null))
  const [locationAttempted, setLocationAttempted] = useState(false)

  useEffect(() => {
    // Get user's location if they allow it
    if (navigator.geolocation) {
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
                  <CardFooter className="p-3 pt-0 text-xs text-gray-500 flex gap-3">
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      {location.hours}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star size={14} />
                      {location.rating}/5
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex-1 h-[50vh] md:h-screen relative">
        {typeof window !== "undefined" && (
          <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }} ref={mapRef}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapController center={mapCenter} />

            {userLocation && (
              <Marker
                position={userLocation}
                icon={
                  new Icon({
                    iconUrl: "/markers/user-location.svg",
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                    popupAnchor: [0, -32],
                  })
                }
              >
                <Popup>
                  <b>Your Location</b>
                </Popup>
              </Marker>
            )}

            {filteredLocations.map((location) => (
              <Marker
                key={location.id}
                position={[location.lat, location.lng]}
                icon={customIcon(location.type)}
                eventHandlers={{
                  click: () => handleMarkerClick(location),
                }}
              >
                <Popup>
                  <div className="text-sm">
                    <h3 className="font-bold">{location.name}</h3>
                    <p>{location.address}</p>
                    <p className="mt-1">{location.description}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-xs text-gray-500">{location.hours}</span>
                      <Badge className={getTypeColor(location.type)}>{location.type}</Badge>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {selectedLocation && (
          <Card className="absolute bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-[1000] shadow-lg">
            <CardHeader className="p-3">
              <div className="flex justify-between">
                <CardTitle className="text-lg">{selectedLocation.name}</CardTitle>
                <Badge className={getTypeColor(selectedLocation.type)}>{selectedLocation.type}</Badge>
              </div>
              <CardDescription>{selectedLocation.address}</CardDescription>
            </CardHeader>
            <CardContent className="p-3 pt-0">
              <p className="text-sm mb-2">{selectedLocation.description}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex items-center gap-1">
                  <Clock size={14} />
                  <span>{selectedLocation.hours}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{selectedLocation.crowdLevel}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={14} />
                  <span>{selectedLocation.rating}/5</span>
                </div>
                <div className="flex items-center gap-1">
                  <Info size={14} />
                  <span>{selectedLocation.price}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-3 pt-0">
              <Button
                size="sm"
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() =>
                  window.open(
                    `https://www.google.com/maps/dir/?api=1&destination=${selectedLocation.lat},${selectedLocation.lng}`,
                    "_blank",
                  )
                }
              >
                Get Directions
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </>
  )
}
