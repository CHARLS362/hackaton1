'use client';

import { useState } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { maptiler } from 'pigeon-maps/providers';
import { FaMapMarkerAlt } from 'react-icons/fa';

interface LocationPickerProps {
  onLocationChange: (location: [number, number]) => void;
}

// Replace with your MapTiler key if you have one for better limits, though not required for development.
const mapTilerProvider = maptiler('r15x45m4g3j3j3g5c6g7', 'streets-v2');

export function LocationPicker({ onLocationChange }: LocationPickerProps) {
  const [hue, setHue] = useState(0);
  const [markerLocation, setMarkerLocation] = useState<[number, number] | null>(null);
  
  const TiticacaCenter: [number, number] = [-15.9, -69.4];

  const handleMapClick = ({ latLng }: { latLng: [number, number] }) => {
    setMarkerLocation(latLng);
    onLocationChange(latLng);
    setHue(hue + 40);
  };

  return (
    <div className="h-64 w-full rounded-lg overflow-hidden border border-input relative">
      <Map
        provider={mapTilerProvider}
        dprs={[1, 2]}
        defaultCenter={TiticacaCenter}
        defaultZoom={9}
        onClick={handleMapClick}
      >
        {markerLocation && (
          <Marker
            width={30}
            anchor={markerLocation}
            color={`hsl(${hue} 80% 50%)`}
            onClick={() => setHue(hue + 40)}
          />
        )}
      </Map>
       {!markerLocation && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 pointer-events-none text-white text-center p-4">
            <FaMapMarkerAlt className="w-8 h-8 mb-2 opacity-80" />
            <p className="font-semibold">Haz clic para marcar la ubicación</p>
        </div>
       )}
    </div>
  );
}
