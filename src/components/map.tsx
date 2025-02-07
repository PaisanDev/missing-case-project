/*Since the map was loaded on client side, 
we need to make this component client rendered as well*/
"use client";

//Map component Component from library
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import { useState, useEffect } from "react";
import {
  MarkerLocation,
  MissingCategory,
  PersonDetails,
  PetDetails,
  VehicleDetails,
} from "@/types/map";
import Image from "next/image";

//Map's styling
const defaultMapContainerStyle = {
  width: "100%",
  height: "100vh",
  borderRadius: "15px 0px 0px 15px",
};

//K2's coordinates
const defaultMapCenter = {
  lat: 13.707482,
  lng: 100.5045192,
};

//Default zoom level, can be adjusted
const defaultMapZoom = 10;

//Map options
const defaultMapOptions = {
  zoomControl: true,
  tilt: 0,
  gestureHandling: "auto",
  clickableIcons: false,
  styles: [
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
  ],
};

interface DatabaseCase {
  id: string;
  latitude: number;
  longitude: number;
  category: MissingCategory;
  title: string;
  description: string;
  image: string;
  lastSeen: string;
  contactInfo: string;
  otherDetails: string | null;
  personName?: string;
  personAge?: number;
  personHeight?: string;
  personWeight?: string;
  personClothing?: string;
  personMedicalCondition?: string;
  petName?: string;
  petSpecies?: string;
  petBreed?: string;
  petAge?: number;
  petColor?: string;
  petCollar?: string;
  petMicrochip?: string;
  vehicleMake?: string;
  vehicleModel?: string;
  vehicleYear?: number;
  vehicleColor?: string;
  vehicleLicensePlate?: string;
  vehicleFeatures?: string;
}

// Mock data for markers
const mockData: DatabaseCase[] = [
  {
    id: "1",
    latitude: 13.707482,
    longitude: 100.5045192,
    category: "person",
    title: "Missing Person",
    description: "Last seen near the park.",
    image: "https://placehold.co/400x300/png",
    lastSeen: "2023-10-01",
    contactInfo: "Contact: 123-456-7890",
    otherDetails: "Wearing a red jacket.",
    personName: "John Doe",
    personAge: 30,
    personHeight: "180 cm",
    personWeight: "75",
    personClothing: "Red jacket, blue jeans",
    personMedicalCondition: "None",
  },
  {
    id: "2",
    latitude: 13.715482,
    longitude: 100.5145192,
    category: "pet",
    title: "Lost Dog",
    description: "Last seen in the neighborhood.",
    image: "https://placehold.co/400x300/png",
    lastSeen: "2023-10-02",
    contactInfo: "Contact: 098-765-4321",
    otherDetails: "Friendly and loves treats.",
    petName: "Buddy",
    petSpecies: "Dog",
    petBreed: "Golden Retriever",
    petAge: 5,
    petColor: "Golden",
    petCollar: "Blue collar",
    petMicrochip: "123456789",
  },
  {
    id: "3",
    latitude: 13.720482,
    longitude: 100.5245192,
    category: "vehicle",
    title: "Stolen Car",
    description: "Last seen parked near the mall.",
    image: "https://placehold.co/400x300/png",
    lastSeen: "2023-10-03",
    contactInfo: "Contact: 555-555-5555",
    otherDetails: "License plate ABC1234.",
    vehicleMake: "Toyota",
    vehicleModel: "Camry",
    vehicleYear: 2020,
    vehicleColor: "Black",
    vehicleLicensePlate: "ABC1234",
    vehicleFeatures: "Sunroof, leather seats",
  },
];

// Add filter state to the component
const MapComponent = () => {
  const [selectedMarker, setSelectedMarker] = useState<MarkerLocation | null>(
    null
  );
  const [selectedCategory, setSelectedCategory] = useState<
    MissingCategory | "all"
  >("all");
  const [showMockData, setShowMockData] = useState<boolean>(true);
  const [markers, setMarkers] = useState<MarkerLocation[]>([]);

  useEffect(() => {
    const fetchMarkers = async () => {
      try {
        const response = await fetch("/api/cases");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();

        // Transform database data to marker format
        const transformedMarkers = data.map((item: DatabaseCase) => {
          const {
            latitude,
            longitude,
            category,
            title,
            description,
            image,
            lastSeen,
            contactInfo,
            otherDetails,
            personName,
            personAge,
            personHeight,
            personWeight,
            personClothing,
            personMedicalCondition,
            petName,
            petSpecies,
            petBreed,
            petAge,
            petColor,
            petCollar,
            petMicrochip,
            vehicleMake,
            vehicleModel,
            vehicleYear,
            vehicleColor,
            vehicleLicensePlate,
            vehicleFeatures,
          } = item;

          return {
            position: {
              lat: latitude,
              lng: longitude,
            },
            category,
            title,
            description,
            image,
            lastSeen,
            contactInfo,
            otherDetails,
            ...(category === "person" && {
              personDetails: {
                name: personName || "Unknown",
                age: personAge || "N/A",
                height: personHeight || "N/A",
                weight: personWeight || "N/A",
                clothing: personClothing || "N/A",
                medicalCondition: personMedicalCondition || "N/A",
              },
            }),
            ...(category === "pet" && {
              petDetails: {
                name: petName || "Unknown",
                species: petSpecies || "N/A",
                breed: petBreed || "N/A",
                age: petAge || "N/A",
                color: petColor || "N/A",
                collar: petCollar || "N/A",
                microchip: petMicrochip || "N/A",
              },
            }),
            ...(category === "vehicle" && {
              vehicleDetails: {
                make: vehicleMake || "Unknown",
                model: vehicleModel || "N/A",
                year: vehicleYear || "N/A",
                color: vehicleColor || "N/A",
                licensePlate: vehicleLicensePlate || "N/A",
                distinguishingFeatures: vehicleFeatures || "N/A",
              },
            }),
          };
        });

        setMarkers(transformedMarkers);
      } catch (error) {
        console.error("Failed to fetch markers:", error);
      }
    };

    if (!showMockData) {
      fetchMarkers();
    } else {
      const transformedMockData = mockData.map((item) => {
        const baseMarker = {
          position: {
            lat: item.latitude,
            lng: item.longitude,
          },
          title: item.title,
          description: item.description,
          image: item.image,
          lastSeen: item.lastSeen,
          contactInfo: item.contactInfo,
          otherDetails: item.otherDetails || "",
        };

        switch (item.category) {
          case "person":
            return {
              ...baseMarker,
              category: "person" as const,
              personDetails: {
                name: item.personName || "",
                age: item.personAge || 0,
                height: item.personHeight || "",
                weight: item.personWeight || "",
                clothing: item.personClothing || "",
                medicalCondition: item.personMedicalCondition || "",
              },
            } as PersonDetails;
          case "pet":
            return {
              ...baseMarker,
              category: "pet" as const,
              petDetails: {
                name: item.petName || "",
                species: item.petSpecies || "",
                breed: item.petBreed || "",
                age: item.petAge || 0,
                color: item.petColor || "",
                collar: item.petCollar || "",
                microchip: item.petMicrochip || "",
              },
            } as PetDetails;
          case "vehicle":
            return {
              ...baseMarker,
              category: "vehicle" as const,
              vehicleDetails: {
                make: item.vehicleMake || "",
                model: item.vehicleModel || "",
                year: item.vehicleYear || 0,
                color: item.vehicleColor || "",
                licensePlate: item.vehicleLicensePlate || "",
                distinguishingFeatures: item.vehicleFeatures || "",
              },
            } as VehicleDetails;
        }
      });
      setMarkers(transformedMockData);
    }
  }, [showMockData]);

  // Filter markers based on selected category
  const filteredMarkers =
    selectedCategory === "all"
      ? markers
      : markers.filter((marker) => marker.category === selectedCategory);

  return (
    <div className="w-full">
      {/* Toggle mock data */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setShowMockData((prev) => !prev)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {showMockData ? "Show Live Data" : "Show Mock Data"}
        </button>
      </div>

      {/* Move filter buttons to bottom center */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white px-4 py-3 rounded-full shadow-lg">
          <div className="flex gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setSelectedCategory("person")}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === "person"
                  ? "bg-red-500 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              People
            </button>
            <button
              onClick={() => setSelectedCategory("vehicle")}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === "vehicle"
                  ? "bg-yellow-500 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Vehicles
            </button>
            <button
              onClick={() => setSelectedCategory("pet")}
              className={`px-6 py-2 rounded-full transition-all duration-200 ${
                selectedCategory === "pet"
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              Pets
            </button>
          </div>
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={defaultMapContainerStyle}
        center={defaultMapCenter}
        zoom={defaultMapZoom}
        options={defaultMapOptions}
      >
        {filteredMarkers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.title}
            icon={markerIcons[marker.category]}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindow
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}
          >
            <RenderInfoWindowContent marker={selectedMarker} />
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

// Separate component for InfoWindow content based on category
const RenderInfoWindowContent = ({ marker }: { marker: MarkerLocation }) => {
  switch (marker.category) {
    case "person":
      return <PersonInfoWindow marker={marker} />;
    case "pet":
      return <PetInfoWindow marker={marker} />;
    case "vehicle":
      return <VehicleInfoWindow marker={marker} />;
  }
};

const PersonInfoWindow = ({ marker }: { marker: PersonDetails }) => (
  <div className="max-w-lg md:min-w-96 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="relative w-full h-48">
      <Image
        src={marker.image || "https://placehold.co/400x300/png"}
        alt={marker.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
    <div className="p-4">
      <div className="border-b pb-2 mb-3">
        <h3 className="font-bold text-xl">{marker.personDetails.name}</h3>
        <p className="text-sm text-gray-500">
          รหัสกรณี: #{Math.random().toString(36).substr(2, 6).toUpperCase()}
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-100 p-3 rounded-lg mb-3">
          <p className="font-medium">หายตั้งแต่</p>
          <p className="">{marker.lastSeen}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-600 text-sm">อายุ</p>
            <p className="font-medium">{marker.personDetails.age} ปี</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">ส่วนสูง</p>
            <p className="font-medium">{marker.personDetails.height}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">น้ำหนัก</p>
            <p className="font-medium">{marker.personDetails.weight}</p>
          </div>
        </div>

        <div>
          <p className="text-gray-600 text-sm">สถานที่ที่รู้จักล่าสุด</p>
          <p className="font-medium">{marker.description}</p>
        </div>

        <div>
          <p className="text-gray-600 text-sm">เสื้อผ้าที่สวมใส่ล่าสุด</p>
          <p className="font-medium">{marker.personDetails.clothing}</p>
        </div>

        {marker.personDetails.medicalCondition && (
          <div className="bg-yellow-50 p-3 rounded-lg">
            <p className="text-yellow-700 font-semibold mb-1">
              สภาพทางการแพทย์
            </p>
            <p className="text-yellow-800">
              {marker.personDetails.medicalCondition}
            </p>
          </div>
        )}

        {marker.otherDetails && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-700 font-semibold mb-1">รายละเอียดอื่นๆ</p>
            <p className="text-gray-600">{marker.otherDetails}</p>
          </div>
        )}

        <div className="mt-4 bg-green-50 p-3 rounded-lg">
          <p className="font-semibold mb-1">ข้อมูลการติดต่อ</p>
          <p className="">{marker.contactInfo}</p>
        </div>
      </div>
    </div>
  </div>
);

const PetInfoWindow = ({ marker }: { marker: PetDetails }) => (
  <div className="max-w-lg md:min-w-96 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="relative w-full h-48">
      <Image
        src={marker.image}
        alt={marker.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
    <div className="p-4">
      <div className="border-b pb-2 mb-3">
        <h3 className="font-bold text-xl">{marker.petDetails.name}</h3>
        <p className="text-sm text-gray-500">
          รหัสกรณี: #{Math.random().toString(36).substr(2, 6).toUpperCase()}
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-50 p-3 rounded-lg mb-3">
          <p className="font-medium">หายไปตั้งแต่</p>
          <p className="">{marker.lastSeen}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-600 text-sm">สายพันธุ์</p>
            <p className="font-medium">{marker.petDetails.species}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">พันธุ์</p>
            <p className="font-medium">{marker.petDetails.breed}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">อายุ</p>
            <p className="font-medium">{marker.petDetails.age} ปี</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">สี</p>
            <p className="font-medium">{marker.petDetails.color}</p>
          </div>
        </div>

        {marker.petDetails.collar && (
          <div>
            <p className="text-gray-600 text-sm">ปลอกคอ</p>
            <p className="font-medium">{marker.petDetails.collar}</p>
          </div>
        )}

        {marker.petDetails.microchip && (
          <div>
            <p className="text-gray-600 text-sm">ไมโครชิป</p>
            <p className="font-medium">{marker.petDetails.microchip}</p>
          </div>
        )}

        {marker.otherDetails && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-700 font-semibold mb-1">รายละเอียดอื่นๆ</p>
            <p className="text-gray-600">{marker.otherDetails}</p>
          </div>
        )}

        <div className="mt-4 bg-green-50 p-3 rounded-lg">
          <p className="text-green-700 font-semibold mb-1">ข้อมูลการติดต่อ</p>
          <p className="text-green-600">{marker.contactInfo}</p>
        </div>
      </div>
    </div>
  </div>
);

const VehicleInfoWindow = ({ marker }: { marker: VehicleDetails }) => (
  <div className="max-w-lg md:min-w-96 bg-white shadow-lg rounded-lg overflow-hidden">
    <div className="relative w-full h-48">
      <Image
        src={marker.image}
        alt={marker.title}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 400px"
      />
    </div>
    <div className="p-4">
      <div className="border-b pb-2 mb-3">
        <h3 className="font-bold text-xl ">
          {marker.vehicleDetails.make} {marker.vehicleDetails.model}
        </h3>
        <p className="text-sm text-gray-500">
          รหัสกรณี: #{Math.random().toString(36).substr(2, 6).toUpperCase()}
        </p>
      </div>

      <div className="space-y-3">
        <div className="bg-gray-50 p-3 rounded-lg mb-3">
          <p className="font-medium">หายไปตั้งแต่</p>
          <p>{marker.lastSeen}</p>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <p className="text-gray-600 text-sm">ปี</p>
            <p className="font-medium">{marker.vehicleDetails.year}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">สี</p>
            <p className="font-medium">{marker.vehicleDetails.color}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">หมายเลขทะเบียน</p>
            <p className="font-medium">{marker.vehicleDetails.licensePlate}</p>
          </div>
        </div>

        {marker.vehicleDetails.distinguishingFeatures && (
          <div>
            <p className="text-gray-600 text-sm">ลักษณะเด่น</p>
            <p className="font-medium">
              {marker.vehicleDetails.distinguishingFeatures}
            </p>
          </div>
        )}

        {marker.otherDetails && (
          <div className="bg-gray-50 p-3 rounded-lg">
            <p className="text-gray-700 font-semibold mb-1">รายละเอียดอื่นๆ</p>
            <p className="text-gray-600">{marker.otherDetails}</p>
          </div>
        )}

        <div className="mt-4 bg-green-50 p-3 rounded-lg">
          <p className="text-green-700 font-semibold mb-1">ข้อมูลการติดต่อ</p>
          <p className="text-green-600">{marker.contactInfo}</p>
        </div>
      </div>
    </div>
  </div>
);

// Add custom marker icons
const markerIcons = {
  person: {
    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  },
  pet: {
    url: "https://maps.google.com/mapfiles/ms/icons/green-dot.png",
  },
  vehicle: {
    url: "https://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
  },
};

export { MapComponent };
