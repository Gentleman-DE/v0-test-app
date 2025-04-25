"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"

// Loading component to show while the map is loading
const MapLoading = () => (
  <div className="flex-1 flex items-center justify-center bg-gray-100 p-8">
    <div className="text-center">
      <h2 className="text-xl font-semibold mb-2">Loading Exercise Map...</h2>
      <p className="text-gray-600">Please wait while we prepare your interactive exercise map</p>
    </div>
  </div>
)

// Dynamically import the ExerciseMap component with SSR disabled
const ExerciseMapNoSSR = dynamic(() => import("@/components/exercise-map"), {
  ssr: false,
  loading: () => <MapLoading />,
})

export default function ExerciseMapWrapper() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <MapLoading />
  }

  return <ExerciseMapNoSSR />
}
