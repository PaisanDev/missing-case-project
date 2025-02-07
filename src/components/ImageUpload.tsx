"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      alert("Please upload an image file");
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onChange(data.url);
      setPreview(data.url);
    } catch (error) {
      console.error("Upload error:", error);
      alert("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="image-upload"
          disabled={uploading}
        />
        <label
          htmlFor="image-upload"
          className="cursor-pointer bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md transition-colors"
        >
          {uploading ? "Uploading..." : "Choose Image"}
        </label>
        {value && <span className="text-sm text-gray-500">Image selected</span>}
      </div>
      {preview && (
        <div className="relative w-full h-48">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
