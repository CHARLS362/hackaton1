"use client";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import cuencaData from "@/data/cuenca.json";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Compass } from "lucide-react";

export function DataMap() {
  const onEachFeature = (feature: any, layer: any) => {
    if (feature.properties && feature.properties.nombre) {
      layer.bindTooltip(feature.properties.nombre);
    }
  };

  const geoJsonStyle = {
    fillColor: "hsl(var(--primary))",
    weight: 2,
    opacity: 1,
    color: "hsl(var(--primary-foreground))",
    fillOpacity: 0.5,
  };

  return (
    <section id="map" className="py-12 sm:py-16 lg:py-24 bg-background">
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

        <div className="relative rounded-2xl shadow-2xl bg-slate-800 border border-slate-700 p-2 lg:p-4">
          <div className="flex items-center gap-2 px-2 pt-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
            <MapContainer
              center={[-15.9, -69.4]}
              zoom={8}
              className={cn("h-[60vh] w-full z-0 rounded-lg mt-2")}
              scrollWheelZoom={false}
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all hover:bg-black/10 group z-10 pointer-events-none">
                <Button
                  size="lg"
                  asChild
                  className="scale-100 group-hover:scale-105 transition-transform pointer-events-auto"
                >
                  <Link href="/dashboard">
                    <Compass className="mr-2 h-5 w-5" />
                    Explorar Mapa Interactivo
                  </Link>
                </Button>
              </div>
              <TileLayer
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              />
              <GeoJSON data={cuencaData as any} style={geoJsonStyle} />
            </MapContainer>
        </div>
      </div>
    </section>
  );
}
