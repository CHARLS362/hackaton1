import { CitizenReportForm } from "@/components/app/citizen-report-form";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import Image from "next/image";

export default function ReportPage() {
  const heroImage = PlaceHolderImages.find((p) => p.id === "hero-background");

  return (
    <div>
      <section className="relative py-24 md:py-32 bg-slate-900 text-white text-center">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover object-center opacity-20"
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950" />

        <div className="relative container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold">Reporte Ciudadano</h1>
          <p className="mt-4 max-w-2xl mx-auto text-slate-300">
            Tu ayuda es fundamental. Reporta cualquier incidente ambiental que
            observes.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-24 bg-slate-50 dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <CitizenReportForm />
        </div>
      </section>
    </div>
  );
}
