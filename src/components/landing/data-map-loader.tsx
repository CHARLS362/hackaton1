"use client";

import dynamic from "next/dynamic";

const DataMap = dynamic(() => import("@/components/landing/data-map").then(mod => mod.DataMap), {
  ssr: false,
  loading: () => <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 animate-pulse" />
});

export function DataMapLoader() {
  return <DataMap />;
}
