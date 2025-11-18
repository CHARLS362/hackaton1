
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { LiveStats } from "@/components/landing/live-stats";
import { DataMapLoader } from "@/components/landing/data-map-loader";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveStats />
      <Features />
      <DataMapLoader />
    </>
  );
}
