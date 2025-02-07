import { MissingCategory } from "@/types/map"; // Adjust the import path as necessary

export interface FormData {
  category: MissingCategory; // The category of the missing case
  title: string; // Title of the case
  description: string; // Description of the case
  image: string; // Image URL
  lastSeen: string; // Last seen information
  contactInfo: string; // Contact information
  otherDetails: string; // Other relevant details
  position: { lat: number; lng: number }; // Position coordinates
  personDetails: {
    name: string; // Name of the person
    age: string; // Age of the person
    height: string; // Height of the person
    weight: string; // Weight of the person
    clothing: string; // Clothing description
    medicalCondition: string; // Medical conditions
  };
  petDetails: {
    name: string; // Name of the pet
    species: string; // Species of the pet
    breed: string; // Breed of the pet
    age: string; // Age of the pet
    color: string; // Color of the pet
    collar: string; // Collar description
    microchip: string; // Microchip information
  };
  vehicleDetails: {
    make: string; // Make of the vehicle
    model: string; // Model of the vehicle
    year: string; // Year of the vehicle
    color: string; // Color of the vehicle
    licensePlate: string; // License plate number
    distinguishingFeatures: string; // Distinguishing features of the vehicle
  };
}
