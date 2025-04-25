import ExerciseMap from "@/components/exercise-map"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Exercise Map Explorer",
  description: "Discover places to exercise in your area with our interactive map",
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-green-600 text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">Exercise Map Explorer</h1>
          <p className="text-sm">Discover the perfect places to stay active in your area</p>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row">
        <ExerciseMap />
      </div>
    </main>
  )
}
