import React from "react";
import { FormData } from "@/types/formData"; // นำเข้าประเภท FormData

interface VehicleDetailsProps {
  formData: FormData; // กำหนดประเภทสำหรับ formData
  setFormData: React.Dispatch<React.SetStateAction<FormData>>; // กำหนดประเภทสำหรับ setFormData
}

const VehicleDetails: React.FC<VehicleDetailsProps> = ({
  formData,
  setFormData,
}) => {
  return (
    <div>
      <h2 className="text-lg font-semibold mt-4">รายละเอียดรถยนต์</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ยี่ห้อ
        </label>
        <input
          type="text"
          value={formData.vehicleDetails.make}
          onChange={(e) =>
            setFormData({
              ...formData,
              vehicleDetails: {
                ...formData.vehicleDetails,
                make: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">รุ่น</label>
        <input
          type="text"
          value={formData.vehicleDetails.model}
          onChange={(e) =>
            setFormData({
              ...formData,
              vehicleDetails: {
                ...formData.vehicleDetails,
                model: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">ปี</label>
        <input
          type="text"
          value={formData.vehicleDetails.year}
          onChange={(e) =>
            setFormData({
              ...formData,
              vehicleDetails: {
                ...formData.vehicleDetails,
                year: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">สี</label>
        <input
          type="text"
          value={formData.vehicleDetails.color}
          onChange={(e) =>
            setFormData({
              ...formData,
              vehicleDetails: {
                ...formData.vehicleDetails,
                color: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          หมายเลขทะเบียน
        </label>
        <input
          type="text"
          value={formData.vehicleDetails.licensePlate}
          onChange={(e) =>
            setFormData({
              ...formData,
              vehicleDetails: {
                ...formData.vehicleDetails,
                licensePlate: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ลักษณะเด่น
        </label>
        <input
          type="text"
          value={formData.vehicleDetails.distinguishingFeatures}
          onChange={(e) =>
            setFormData({
              ...formData,
              vehicleDetails: {
                ...formData.vehicleDetails,
                distinguishingFeatures: e.target.value,
              },
            })
          }
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none px-2 py-1"
        />
      </div>
    </div>
  );
};

export default VehicleDetails;
