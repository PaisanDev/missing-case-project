export type MissingCategory = "person" | "pet" | "vehicle";

export interface BaseMarkerLocation {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
  description: string;
  image: string;
  category: MissingCategory;
  lastSeen: string;
  contactInfo: string;
  otherDetails?: string;
}

export interface PersonDetails extends BaseMarkerLocation {
  category: "person";
  personDetails: {
    name: string;
    age: number;
    height: string;
    weight: string;
    clothing: string;
    medicalCondition?: string;
  };
}

export interface PetDetails extends BaseMarkerLocation {
  category: "pet";
  petDetails: {
    name: string;
    species: string;
    breed: string;
    age: number;
    color: string;
    collar?: string;
    microchip?: string;
  };
}

export interface VehicleDetails extends BaseMarkerLocation {
  category: "vehicle";
  vehicleDetails: {
    make: string;
    model: string;
    year: number;
    color: string;
    licensePlate: string;
    distinguishingFeatures?: string;
  };
}

export type MarkerLocation = PersonDetails | PetDetails | VehicleDetails;
