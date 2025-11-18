
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { LiveStats } from "@/components/landing/live-stats";
import { DataMapLoader } from "@/components/landing/data-map-loader";
import { AudioPlayer } from "@/components/layout/audio-player";


export default function Home() {
  const welcomeMessage = "Bienvenido a SIGA-Titicaca, la plataforma inteligente para el monitoreo y la preservación del Lago Titicaca, uniendo tecnología y comunidad."
  return (
    <>
      <AudioPlayer text={welcomeMessage} />
      <Hero />
      <LiveStats />
      <Features />
      <DataMapLoader />
    </>
  );
}
