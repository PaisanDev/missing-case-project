import React from "react";
import { FormData } from "@/types/formData";

interface PersonDetailsProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const PersonDetails: React.FC<PersonDetailsProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mt-4">รายละเอียดบุคคล</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">ชื่อ</label>
        <input
          type="text"
          value={formData.personDetails.name}
          onChange={(e) =>
            setFormData({
              ...formData,
              personDetails: {
                ...formData.personDetails,
                name: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">อายุ</label>
        <input
          type="text"
          value={formData.personDetails.age}
          onChange={(e) =>
            setFormData({
              ...formData,
              personDetails: { ...formData.personDetails, age: e.target.value },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ส่วนสูง
        </label>
        <input
          type="text"
          value={formData.personDetails.height}
          onChange={(e) =>
            setFormData({
              ...formData,
              personDetails: {
                ...formData.personDetails,
                height: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          น้ำหนัก
        </label>
        <input
          type="text"
          value={formData.personDetails.weight}
          onChange={(e) =>
            setFormData({
              ...formData,
              personDetails: {
                ...formData.personDetails,
                weight: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          เสื้อผ้า
        </label>
        <input
          type="text"
          value={formData.personDetails.clothing}
          onChange={(e) =>
            setFormData({
              ...formData,
              personDetails: {
                ...formData.personDetails,
                clothing: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ข้อมูลการแพทย์
        </label>
        <input
          type="text"
          value={formData.personDetails.medicalCondition}
          onChange={(e) =>
            setFormData({
              ...formData,
              personDetails: {
                ...formData.personDetails,
                medicalCondition: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
    </div>
  );
};

export default PersonDetails;
