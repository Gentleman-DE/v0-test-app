export type ExerciseType = "gym" | "park" | "trail" | "pool" | "court"

export interface ExerciseLocation {
  id: string
  name: string
  type: ExerciseType
  lat: number
  lng: number
  address: string
  description: string
  hours: string
  rating: number
  price: string
  crowdLevel: string
  amenities: string[]
}

export const exerciseLocations: ExerciseLocation[] = [
  {
    id: "1",
    name: "Central Park",
    type: "park",
    lat: 40.7812,
    lng: -73.9665,
    address: "Central Park, New York, NY",
    description: "Expansive park with running paths, sports fields, and outdoor workout areas.",
    hours: "6:00 AM - 1:00 AM",
    rating: 4.8,
    price: "Free",
    crowdLevel: "Moderate",
    amenities: ["Running Paths", "Basketball Courts", "Tennis Courts", "Playgrounds"],
  },
  {
    id: "2",
    name: "Equinox Fitness Club",
    type: "gym",
    lat: 40.7549,
    lng: -73.984,
    address: "897 Broadway, New York, NY",
    description: "Luxury fitness club with state-of-the-art equipment and classes.",
    hours: "5:30 AM - 10:00 PM",
    rating: 4.5,
    price: "$$$",
    crowdLevel: "High",
    amenities: ["Weight Room", "Cardio Equipment", "Pool", "Sauna", "Group Classes"],
  },
  {
    id: "3",
    name: "Hudson River Greenway",
    type: "trail",
    lat: 40.7415,
    lng: -74.0091,
    address: "Hudson River Greenway, New York, NY",
    description: "Scenic waterfront trail perfect for running, walking, or cycling.",
    hours: "24/7",
    rating: 4.7,
    price: "Free",
    crowdLevel: "Moderate",
    amenities: ["Bike Path", "Running Trail", "Scenic Views", "Water Fountains"],
  },
  {
    id: "4",
    name: "Chelsea Piers Fitness",
    type: "gym",
    lat: 40.7466,
    lng: -74.0086,
    address: "Pier 60, New York, NY",
    description: "Comprehensive sports and fitness center with views of the Hudson River.",
    hours: "5:30 AM - 11:00 PM",
    rating: 4.6,
    price: "$$$",
    crowdLevel: "Moderate",
    amenities: ["Rock Climbing", "Swimming Pool", "Basketball Courts", "Fitness Classes"],
  },
  {
    id: "5",
    name: "Asphalt Green",
    type: "pool",
    lat: 40.7739,
    lng: -73.9446,
    address: "555 E 90th St, New York, NY",
    description: "Olympic-sized swimming pool and fitness facility.",
    hours: "5:45 AM - 10:30 PM",
    rating: 4.4,
    price: "$$",
    crowdLevel: "Low",
    amenities: ["Olympic Pool", "Fitness Center", "Soccer Field", "Group Classes"],
  },
  {
    id: "6",
    name: "West 4th Street Courts",
    type: "court",
    lat: 40.7309,
    lng: -74.0004,
    address: "W 4th St & 6th Ave, New York, NY",
    description: 'Famous street basketball courts known as "The Cage".',
    hours: "7:00 AM - 12:00 AM",
    rating: 4.3,
    price: "Free",
    crowdLevel: "High",
    amenities: ["Basketball Courts", "Spectator Area"],
  },
  {
    id: "7",
    name: "Planet Fitness",
    type: "gym",
    lat: 40.7519,
    lng: -73.987,
    address: "26 Broadway, New York, NY",
    description: "Affordable gym with a wide range of equipment.",
    hours: "24/7",
    rating: 4.0,
    price: "$",
    crowdLevel: "Moderate",
    amenities: ["Cardio Equipment", "Weight Machines", "Free Weights", "Locker Rooms"],
  },
  {
    id: "8",
    name: "Prospect Park",
    type: "park",
    lat: 40.6602,
    lng: -73.969,
    address: "Prospect Park, Brooklyn, NY",
    description: "Large park with trails, fields, and outdoor fitness areas.",
    hours: "5:00 AM - 1:00 AM",
    rating: 4.7,
    price: "Free",
    crowdLevel: "Moderate",
    amenities: ["Running Paths", "Baseball Fields", "Tennis Courts", "Lake"],
  },
  {
    id: "9",
    name: "Manhattan Plaza Health Club",
    type: "pool",
    lat: 40.7593,
    lng: -73.9957,
    address: "482 W 43rd St, New York, NY",
    description: "Health club with a rooftop pool and extensive facilities.",
    hours: "6:00 AM - 11:00 PM",
    rating: 4.2,
    price: "$$",
    crowdLevel: "Low",
    amenities: ["Rooftop Pool", "Tennis Courts", "Gym Equipment", "Sauna"],
  },
  {
    id: "10",
    name: "Riverside Park",
    type: "trail",
    lat: 40.8013,
    lng: -73.9722,
    address: "Riverside Park, New York, NY",
    description: "Four-mile-long park with scenic running and biking paths along the Hudson River.",
    hours: "6:00 AM - 1:00 AM",
    rating: 4.6,
    price: "Free",
    crowdLevel: "Low",
    amenities: ["Running Trails", "Bike Paths", "Sports Fields", "Playgrounds"],
  },
]
