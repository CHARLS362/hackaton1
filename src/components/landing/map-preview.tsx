import { Button } from "@/components/ui/button";
import { Compass } from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export function MapPreview() {
  const mapImage = PlaceHolderImages.find((p) => p.id === "dark-map-preview");

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
          <div className="relative aspect-video rounded-lg overflow-hidden mt-2">
            {mapImage && (
              <Image
                src={mapImage.imageUrl}
                alt={mapImage.description}
                fill
                className="object-cover"
                data-ai-hint={mapImage.imageHint}
              />
            )}

            <div className="absolute top-[30%] left-[40%]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border border-white/50"></span>
              </span>
            </div>
            <div className="absolute top-[50%] left-[60%]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500 border border-white/50"></span>
              </span>
            </div>
            <div className="absolute top-[65%] left-[25%]">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border border-white/50"></span>
              </span>
            </div>

            <div className="absolute top-[calc(30%-2rem)] left-[calc(40%+1.2rem)] bg-slate-900/80 text-white text-xs rounded-md p-2 shadow-lg border border-slate-700 whitespace-nowrap backdrop-blur-sm">
              <span className="font-bold">⚠️ Alerta:</span> Turbidez Alta -
              Sector Puno
            </div>

            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all hover:bg-black/10 group">
              <Button size="lg" asChild className="scale-100 group-hover:scale-105 transition-transform">
                <Link href="/dashboard">
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
