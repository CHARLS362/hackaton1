"use client";

import { AlertTriangle, Terminal } from "lucide-react";
import { cn } from "@/lib/utils";

interface Anomaly {
    id: string;
    message: string;
    timestamp: string;
    severity: "low" | "medium" | "high";
}

interface AnomalyFeedProps {
    anomalies: Anomaly[];
}

export function AnomalyFeed({ anomalies }: AnomalyFeedProps) {
    return (
        <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col h-full">
            <div className="p-3 border-b border-white/10 flex items-center gap-2 bg-white/5">
                <Terminal className="h-4 w-4 text-blue-400" />
                <h3 className="text-xs font-bold text-blue-100 uppercase tracking-wider">Registro de Eventos</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                {anomalies.length === 0 ? (
                    <div className="text-center text-white/30 text-xs py-4">Esperando datos...</div>
                ) : (
                    anomalies.map((anomaly) => (
                        <div
                            key={anomaly.id}
                            className={cn(
                                "p-2 rounded border-l-2 text-xs animate-in slide-in-from-left fade-in duration-300",
                                anomaly.severity === "high" ? "bg-red-500/10 border-red-500 text-red-200" :
                                    anomaly.severity === "medium" ? "bg-yellow-500/10 border-yellow-500 text-yellow-200" :
                                        "bg-blue-500/10 border-blue-500 text-blue-200"
                            )}
                        >
                            <div className="flex justify-between items-start mb-1">
                                <span className="font-mono opacity-60 text-[10px]">{anomaly.timestamp}</span>
                                {anomaly.severity === "high" && <AlertTriangle className="h-3 w-3 text-red-400" />}
                            </div>
                            <p className="font-medium leading-tight">{anomaly.message}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
