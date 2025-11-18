"use client";

import dynamic from "next/dynamic";

const DataMap = dynamic(
  () => import("@/components/landing/data-map").then((mod) => mod.DataMap),
  {
    ssr: false,
    loading: () => (
      <div className="bg-background py-12 sm:py-16 lg:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="h-9 bg-slate-200 dark:bg-slate-700 rounded-md w-1/2 mx-auto animate-pulse"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-3/4 mx-auto mt-4 animate-pulse"></div>
          </div>
          <div className="relative rounded-2xl shadow-2xl p-2 lg:p-4 border">
            <div className="h-[60vh] w-full z-0 rounded-lg mt-2 bg-slate-200 dark:bg-slate-800 animate-pulse"></div>
          </div>
        </div>
      </div>
    ),
  }
);

export function DataMapLoader() {
  return <DataMap />;
}