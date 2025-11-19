import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Satellite,
  AlertTriangle,
  MessageSquare,
  Database,
} from "lucide-react";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Link from "next/link";
import RotatingText from "../ui/rotating-text";
import SpotlightCard from "../ui/spotlight-card";

const features = [
  {
    title: "Monitoreo Satelital",
    description:
      "Análisis de imágenes de alta resolución para detectar cambios en la calidad del agua y el uso del suelo a gran escala.",
    icon: Satellite,
    className: "md:col-span-2 row-span-2",
    isLarge: true,
  },
  {
    title: "Alertas IoT",
    description:
      "Sensores en tiempo real que miden parámetros clave y emiten alertas automáticas.",
    icon: AlertTriangle,
    className: "",
    isLarge: false,
  },
  {
    title: "Reportes Ciudadanos",
    description:
      "Una plataforma para que la comunidad informe incidentes, fortaleciendo la vigilancia colectiva.",
    icon: MessageSquare,
    className: "",
    isLarge: false,
  },
  {
    title: "Análisis Big Data",
    description:
      "Modelos predictivos y análisis de tendencias para una gestión proactiva y basada en datos.",
    icon: Database,
    className: "md:col-span-2",
    isLarge: false,
  },
];

export function Features() {
  const satelliteImage = PlaceHolderImages.find((p) => p.id === "satellite-map");

  return (
    <section id="modules" className="py-12 sm:py-16 lg:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold flex items-center justify-center gap-2">
            <span>Un Ecosistema de</span>
            <RotatingText
              texts={['Análisis', 'Monitoreo', 'Acción']}
              mainClassName="px-2 sm:px-2 md:px-3 bg-primary text-primary-foreground overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
              staggerFrom={"last"}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Combinamos múltiples fuentes de datos para ofrecer una visión 360°
            del estado del lago.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-fr">
          {features.map((feature) => (
            <Link href="/dashboard" key={feature.title} className={feature.className}>
              <SpotlightCard
                className={`group h-full rounded-2xl bg-white shadow-lg transition-all duration-300 border flex flex-col`}
                spotlightColor="rgba(45, 155, 240, 0.2)"
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <feature.icon className="h-6 w-6 text-primary" />
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col">
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                  {feature.isLarge && satelliteImage && (
                    <div className="mt-4 flex-grow aspect-video rounded-lg overflow-hidden">
                      <Image
                        src={satelliteImage.imageUrl}
                        alt={satelliteImage.description}
                        width={800}
                        height={600}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        data-ai-hint={satelliteImage.imageHint}
                      />
                    </div>
                  )}
                </CardContent>
              </SpotlightCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
