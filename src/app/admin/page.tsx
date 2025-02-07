"use client";

import { useState } from "react";
import { MissingCategory } from "@/types/map";
import { GoogleMap, Marker } from "@react-google-maps/api";
import PersonDetails from "@/components/PersonDetails";
import PetDetails from "@/components/PetDetails";
import VehicleDetails from "@/components/VehicleDetails";
import ImageUpload from "@/components/ImageUpload";

const AdminPage = () => {
  const [formData, setFormData] = useState({
    category: "person" as MissingCategory,
    title: "",
    description: "",
    image: "",
    lastSeen: "",
    contactInfo: "",
    otherDetails: "",
    position: {
      lat: 13.707482,
      lng: 100.5045192,
    },
    personDetails: {
      name: "",
      age: "",
      height: "",
      weight: "",
      clothing: "",
      medicalCondition: "",
    },
    petDetails: {
      name: "",
      species: "",
      breed: "",
      age: "",
      color: "",
      collar: "",
      microchip: "",
    },
    vehicleDetails: {
      make: "",
      model: "",
      year: "",
      color: "",
      licensePlate: "",
      distinguishingFeatures: "",
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/cases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("ไม่สามารถสร้างกรณีได้");
      }

      alert("สร้างกรณีสำเร็จ!");
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error);
      alert("ไม่สามารถสร้างกรณีได้");
    }
  };

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setFormData((prevData) => ({
        ...prevData,
        position: { lat, lng },
      }));
    }
  };

  const handleMarkerDragEnd = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setFormData((prevData) => ({
        ...prevData,
        position: { lat, lng },
      }));
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      category: e.target.value as MissingCategory,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">เพิ่มกรณีคนหายใหม่</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              สถานที่ (คลิกที่แผนที่หรือลากเครื่องหมายเพื่อตั้งสถานที่)
            </label>
            <GoogleMap
              onClick={handleMapClick}
              mapContainerStyle={{
                width: "100%",
                height: "400px",
              }}
              center={formData.position}
              zoom={10}
              options={{ streetViewControl: false }} // Disable street view
            >
              <Marker
                position={formData.position}
                draggable={true}
                onDragEnd={handleMarkerDragEnd}
              />
            </GoogleMap>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              หมวดหมู่
            </label>
            <select
              value={formData.category}
              onChange={handleCategoryChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
            >
              <option value="person">คน</option>
              <option value="pet">สัตว์เลี้ยง</option>
              <option value="vehicle">รถยนต์</option>
            </select>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                ชื่อเรื่อง
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                รายละเอียด
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
                rows={3}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                รูปภาพ
              </label>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                วันที่/เวลาที่เห็นล่าสุด
              </label>
              <input
                type="datetime-local"
                value={formData.lastSeen}
                onChange={(e) =>
                  setFormData({ ...formData, lastSeen: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                ข้อมูลการติดต่อ
              </label>
              <input
                type="text"
                value={formData.contactInfo}
                onChange={(e) =>
                  setFormData({ ...formData, contactInfo: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                รายละเอียดอื่นๆ
              </label>
              <textarea
                value={formData.otherDetails}
                onChange={(e) =>
                  setFormData({ ...formData, otherDetails: e.target.value })
                }
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
                rows={3}
              />
            </div>
          </div>

          {formData.category === "person" && (
            <PersonDetails formData={formData} setFormData={setFormData} />
          )}
          {formData.category === "pet" && (
            <PetDetails formData={formData} setFormData={setFormData} />
          )}
          {formData.category === "vehicle" && (
            <VehicleDetails formData={formData} setFormData={setFormData} />
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
          >
            เพิ่มกรณีคนหาย
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
