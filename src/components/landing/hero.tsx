import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";

export function Hero() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-background");

  return (
    <section className="relative h-[90vh] min-h-[700px] max-h-[1080px] w-full bg-slate-950 flex items-center justify-center text-center text-white overflow-hidden">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover"
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">
        <Badge
          variant="outline"
          className="bg-background/10 border-white/20 backdrop-blur-sm text-white animate-fade-in-up rounded-full"
        >
          <span className="relative flex h-2 w-2 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Sistema en Tiempo Real Activo
        </Badge>
        <h1 className="mt-4 text-5xl md:text-7xl font-extrabold tracking-tight animate-fade-in-up animation-delay-200">
          Protegiendo el corazón del Altiplano: <br />
          El Lago{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">
            Titicaca
          </span>
        </h1>
        <p className="mt-6 max-w-3xl text-lg text-slate-300 animate-fade-in-up animation-delay-400">
          La plataforma integral para el monitoreo, análisis y acción ambiental.
          Uniendo tecnología y comunidad para la preservación de nuestro
          patrimonio natural.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-600">
          <Button size="lg" className="group" asChild>
            <Link href="/dashboard">
              Ver Dashboard
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/report">Reportar Incidente</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
