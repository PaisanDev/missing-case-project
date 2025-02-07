import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const missingCase = await prisma.missingCase.create({
      data: {
        category: data.category,
        title: data.title,
        description: data.description,
        image: data.image,
        lastSeen: new Date(data.lastSeen),
        contactInfo: data.contactInfo,
        otherDetails: data.otherDetails,
        latitude: data.position.lat,
        longitude: data.position.lng,

        // Conditional fields based on category
        ...(data.category === "person" && {
          personName: data.personDetails.name,
          personAge: parseInt(data.personDetails.age),
          personHeight: data.personDetails.height,
          personWeight: data.personDetails.weight,
          personClothing: data.personDetails.clothing,
          personMedicalCondition: data.personDetails.medicalCondition,
        }),

        ...(data.category === "pet" && {
          petName: data.petDetails.name,
          petSpecies: data.petDetails.species,
          petBreed: data.petDetails.breed,
          petAge: parseInt(data.petDetails.age),
          petColor: data.petDetails.color,
          petCollar: data.petDetails.collar,
          petMicrochip: data.petDetails.microchip,
        }),

        ...(data.category === "vehicle" && {
          vehicleMake: data.vehicleDetails.make,
          vehicleModel: data.vehicleDetails.model,
          vehicleYear: parseInt(data.vehicleDetails.year),
          vehicleColor: data.vehicleDetails.color,
          vehicleLicensePlate: data.vehicleDetails.licensePlate,
          vehicleFeatures: data.vehicleDetails.distinguishingFeatures,
        }),
      },
    });

    return NextResponse.json(missingCase);
  } catch (error) {
    console.error("Failed to create case:", error);
    return NextResponse.json(
      { error: "Failed to create case" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const cases = await prisma.missingCase.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(cases);
  } catch (error) {
    console.error("Failed to fetch cases:", error);
    return NextResponse.json(
      { error: "Failed to fetch cases" },
      { status: 500 }
    );
  }
}
