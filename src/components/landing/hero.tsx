import { Button } from "@/components/ui/button";
import { ArrowRight, MessageSquare } from "lucide-react";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-[90vh] min-h-[700px] max-h-[1080px] w-full flex items-center justify-center text-center text-white overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover -z-10"
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight animate-fade-in-up font-headline">
          Explora el
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            futuro del Titicaca
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300 animate-fade-in-up animation-delay-200">
          Descubra, analice y conecte la investigación científica del lago
          con la tecnología de IA avanzada.
        </p>
        <div className="mt-10 animate-fade-in-up animation-delay-400">
          <Button
            size="lg"
            className="group rounded-full text-lg px-8 py-6 bg-blue-500 hover:bg-blue-600 text-white shadow-lg shadow-blue-500/30"
            asChild
          >
            <Link href="/dashboard">
              <MessageSquare className="mr-3 h-6 w-6" />
              Comienza a explorar
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
