
import { Features } from "@/components/landing/features";
import { Hero } from "@/components/landing/hero";
import { LiveStats } from "@/components/landing/live-stats";
import { DataMap } from "@/components/landing/data-map";

export default function Home() {
  return (
    <>
      <Hero />
      <LiveStats />
      <Features />
      <DataMap />
    </>
  );
}
