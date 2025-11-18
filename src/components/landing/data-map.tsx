"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Compass } from "lucide-react";
import { useEffect, useRef } from "react";
import lagoTiticacaDataUTM from "@/data/lago_titicaca.json";

export function DataMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainer.current) return;

    Promise.all([import("leaflet"), import("proj4")]).then(([L, proj4Module]) => {
      if (!mapContainer.current) return;

      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      const proj4 = proj4Module.default;
      
      // Definir proyecciones: UTM Zone 19S y WGS84
      const utmZone19S = '+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs';
      const wgs84 = '+proj=longlat +datum=WGS84 +no_defs';

      const map = L.map(mapContainer.current).setView([-15.9, -69.4], 9);
      mapInstance.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
        subdomains: ['a', 'b', 'c', 'd']
      }).addTo(map);

      // Convertir coordenadas con proj4
      const convertCoords = (coords: any): any => {
        if (typeof coords[0] === "number") {
          const [lng, lat] = proj4(utmZone19S, wgs84, [coords[0], coords[1]]);
          return [lat, lng];
        }
        return coords.map(convertCoords);
      };

      // Procesar features
      lagoTiticacaDataUTM.features?.forEach((feature: any) => {
        if (feature.geometry?.coordinates) {
          const converted = convertCoords(feature.geometry.coordinates);
          
          if (feature.geometry.type === "MultiPolygon") {
            converted.forEach((polygon: any) => {
              L.polygon(polygon, {
                color: "#4A90E2",
                fillColor: "#4A90E2",
                fillOpacity: 0.3,
                weight: 2,
              }).addTo(map);
            });
          }
        }
      });
    }).catch((error) => {
      console.error("Error loading map libraries:", error);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <section id="map" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Visualiza los Datos en el Mapa
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explora datos en tiempo real y los puntos críticos del Lago
            Titicaca de forma intuitiva.
          </p>
        </div>

        <div className="relative rounded-2xl shadow-2xl bg-slate-100 border border-slate-200 p-2 lg:p-4">
          <div className="flex items-center gap-2 px-2 pt-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className={cn("h-[80vh] w-full z-0 rounded-lg mt-2 relative")}>
            <div ref={mapContainer} className="h-full w-full rounded-lg" />
            <div className="absolute top-4 right-4 z-[1000] pointer-events-auto">
              <Button
                size="lg"
                asChild
                className="shadow-xl hover:shadow-2xl transition-all"
              >
                <Link href="/mapa">
                  <Compass className="mr-2 h-5 w-5" />
                  Explorar Mapa Interactivo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
