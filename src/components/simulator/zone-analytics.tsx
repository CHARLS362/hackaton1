"use client";

import { Activity, Droplets, Wind } from "lucide-react";

interface ZoneData {
    name: string;
    ph: number;
    oxygen: number;
    status: "stable" | "warning" | "critical";
}

interface ZoneAnalyticsProps {
    zones: ZoneData[];
}

export function ZoneAnalytics({ zones }: ZoneAnalyticsProps) {
    return (
        <div className="grid grid-cols-1 gap-2">
            {zones.map((zone) => (
                <div key={zone.name} className="bg-black/60 backdrop-blur-md border border-white/10 rounded-lg p-3 hover:bg-white/5 transition-colors cursor-pointer group">
                    <div className="flex justify-between items-center mb-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">{zone.name}</h4>
                        <span className={
                            zone.status === "critical" ? "text-red-400 text-[10px] font-bold px-1.5 py-0.5 bg-red-500/20 rounded" :
                                zone.status === "warning" ? "text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 bg-yellow-500/20 rounded" :
                                    "text-green-400 text-[10px] font-bold px-1.5 py-0.5 bg-green-500/20 rounded"
                        }>
                            {zone.status.toUpperCase()}
                        </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-1.5">
                            <Droplets className="h-3 w-3 text-cyan-400" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/50 uppercase">pH</span>
                                <span className="text-xs font-mono text-white">{zone.ph.toFixed(1)}</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Wind className="h-3 w-3 text-purple-400" />
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/50 uppercase">O2</span>
                                <span className="text-xs font-mono text-white">{zone.oxygen.toFixed(1)} mg/L</span>
                            </div>
                        </div>
                    </div>

                    {/* Mini Progress Bar for Health */}
                    <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                            className={
                                zone.status === "critical" ? "h-full bg-red-500 w-[30%]" :
                                    zone.status === "warning" ? "h-full bg-yellow-500 w-[60%]" :
                                        "h-full bg-green-500 w-[90%]"
                            }
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}
