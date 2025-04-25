"use client"

import { useEffect, useRef } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { Icon } from "leaflet"
import type { ExerciseLocation, ExerciseType } from "@/data/exercise-locations"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Clock, Info, Star } from "lucide-react"

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

interface MapContainerProps {
  mapCenter: [number, number]
  userLocation: [number, number] | null
  filteredLocations: ExerciseLocation[]
  selectedLocation: ExerciseLocation | null
  handleMarkerClick: (location: ExerciseLocation) => void
  getTypeColor: (type: ExerciseType) => string
}

export default function MapContainerComponent({
  mapCenter,
  userLocation,
  filteredLocations,
  selectedLocation,
  handleMarkerClick,
  getTypeColor,
}: MapContainerProps) {
  const mapRef = useRef(null)

  return (
    <div className="flex-1 h-[50vh] md:h-screen relative">
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
  )
}
