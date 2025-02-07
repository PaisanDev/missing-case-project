import React from "react";
import { FormData } from "@/types/formData";

interface PetDetailsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PetDetails: React.FC<PetDetailsProps> = ({ formData, setFormData }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mt-4">รายละเอียดสัตว์เลี้ยง</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">ชื่อ</label>
        <input
          type="text"
          value={formData.petDetails.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              petDetails: { ...formData.petDetails, name: e.target.value },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          สายพันธุ์
        </label>
        <input
          type="text"
          value={formData.petDetails.species}
          onChange={(e) =>
            setFormData({
              ...formData,
              petDetails: { ...formData.petDetails, species: e.target.value },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          พันธุ์
        </label>
        <input
          type="text"
          value={formData.petDetails.breed}
          onChange={(e) =>
            setFormData({
              ...formData,
              petDetails: { ...formData.petDetails, breed: e.target.value },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">อายุ</label>
        <input
          type="text"
          value={formData.petDetails.age}
          onChange={(e) =>
            setFormData({
              ...formData,
              petDetails: { ...formData.petDetails, age: e.target.value },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">สี</label>
        <input
          type="text"
          value={formData.petDetails.color}
          onChange={(e) =>
            setFormData({
              ...formData,
              petDetails: { ...formData.petDetails, color: e.target.value },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ปลอกคอ
        </label>
        <input
          type="text"
          value={formData.petDetails.collar}
          onChange={(e) =>
            setFormData({
              ...formData,
              petDetails: { ...formData.petDetails, collar: e.target.value },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ไมโครชิป
        </label>
        <input
          type="text"
          value={formData.petDetails.microchip}
          onChange={(e) =>
            setFormData({
              ...formData,
              petDetails: { ...formData.petDetails, microchip: e.target.value },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
    </div>
  );
};

export default PetDetails;
