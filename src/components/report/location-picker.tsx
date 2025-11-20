'use client';

import { useState } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LocateFixed, Loader2, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { osm } from 'pigeon-maps/providers';

interface LocationPickerProps {
  onLocationChange: (location: [number, number]) => void;
}

export function LocationPicker({ onLocationChange }: LocationPickerProps) {
  const [hue, setHue] = useState(0);
  const [markerLocation, setMarkerLocation] = useState<[number, number] | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-15.9, -69.4]);
  const [mapZoom, setMapZoom] = useState<number>(9);
  const [isLocating, setIsLocating] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [address, setAddress] = useState('');
  const { toast } = useToast();

  const handleMapClick = ({ latLng }: { latLng: [number, number] }) => {
    setMarkerLocation(latLng);
    onLocationChange(latLng);
    setHue(hue + 40);
  };

  const handleLocateMe = () => {
    if (!navigator.geolocation) {
      toast({
        variant: 'destructive',
        title: 'Geolocalización no soportada',
        description: 'Tu navegador no soporta la geolocalización.',
      });
      return;
    }

    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation: [number, number] = [latitude, longitude];
        setMapCenter(currentLocation);
        setMarkerLocation(currentLocation);
        onLocationChange(currentLocation);
        setMapZoom(14);
        setIsLocating(false);
        toast({
          title: 'Ubicación encontrada',
          description: 'Se ha fijado tu ubicación actual en el mapa.',
        });
      },
      (error) => {
        setIsLocating(false);
        toast({
          variant: 'destructive',
          title: 'Error de Geolocalización',
          description:
            'No se pudo obtener tu ubicación. Por favor, asegúrate de haber concedido los permisos.',
        });
        console.error('Geolocation Error:', error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };
  
  const handleAddressSearch = async () => {
    if (!address) return;
    setIsSearching(true);
    try {
      // Using Nominatim for geocoding (from OpenStreetMap)
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        const newLocation: [number, number] = [parseFloat(lat), parseFloat(lon)];
        setMapCenter(newLocation);
        setMarkerLocation(newLocation);
        onLocationChange(newLocation);
        setMapZoom(16);
        toast({
            title: "Dirección encontrada",
            description: `Se ha marcado "${data[0].display_name}" en el mapa.`
        });
      } else {
         toast({
            variant: "destructive",
            title: "Dirección no encontrada",
            description: "No se pudo encontrar la dirección especificada. Intenta con más detalles.",
        });
      }
    } catch (error) {
       toast({
            variant: "destructive",
            title: "Error de Búsqueda",
            description: "Ocurrió un error al buscar la dirección.",
        });
      console.error('Geocoding Error:', error);
    }
    setIsSearching(false);
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
         <Input 
            id="address-search"
            placeholder="O busca una dirección..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddressSearch();
              }
            }}
         />
         <Button type="button" onClick={handleAddressSearch} disabled={isSearching}>
            {isSearching ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            <span className="sr-only">Buscar Dirección</span>
         </Button>
      </div>

      <div className="h-64 w-full rounded-lg overflow-hidden border border-input relative">
        <Map
          provider={osm}
          dprs={[1, 2]}
          center={mapCenter}
          zoom={mapZoom}
          onBoundsChanged={({ center, zoom }) => {
            setMapCenter(center);
            setMapZoom(zoom);
          }}
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

        <Button
          type="button"
          size="icon"
          className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white text-slate-700"
          onClick={handleLocateMe}
          disabled={isLocating}
        >
          {isLocating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <LocateFixed className="h-5 w-5" />
          )}
          <span className="sr-only">Usar mi ubicación actual</span>
        </Button>

        {!markerLocation && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 pointer-events-none text-white text-center p-4">
            <FaMapMarkerAlt className="w-8 h-8 mb-2 opacity-80" />
            <p className="font-semibold">Haz clic para marcar la ubicación</p>
          </div>
        )}
      </div>
    </div>
  );
}