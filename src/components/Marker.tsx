import React from "react";
import { Marker as GoogleMarker } from "@react-google-maps/api";

interface MarkerProps {
  position: {
    lat: number;
    lng: number;
  };
}

const Marker: React.FC<MarkerProps> = ({ position }) => {
  return (
    <GoogleMarker
      position={position}
      icon={{
        url: "/path/to/marker-icon.png", // Replace with your marker icon path
        scaledSize: new window.google.maps.Size(30, 30), // Adjust size as needed
      }}
    />
  );
};

export default Marker;
