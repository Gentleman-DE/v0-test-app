import { NextResponse } from "next/server"
import { exerciseLocations } from "@/data/exercise-locations"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  if (type && type !== "all") {
    const filteredLocations = exerciseLocations.filter((location) => location.type === type)
    return NextResponse.json(filteredLocations)
  }

  return NextResponse.json(exerciseLocations)
}
