"use client";

import { useState, useEffect } from "react";
import { SimulatorMap } from "./simulator-map";
import { AnomalyFeed } from "./anomaly-feed";
import { ZoneAnalytics } from "./zone-analytics";
import { Layers, Radio, ShieldCheck, AlertOctagon, Droplets } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { getMonitoringPoints, PARAMETROS_DISPONIBLES } from "@/lib/lake-data";

export function LakeSimulator() {
    const [layer, setLayer] = useState<"map" | "satellite">("satellite");
    const [parametro, setParametro] = useState<keyof typeof PARAMETROS_DISPONIBLES>("aceites_grasas");
    const [zones, setZones] = useState<any[]>([]);
    const [realPoints, setRealPoints] = useState<any[]>([]);
    const [anomalies, setAnomalies] = useState<any[]>([]);
    const [mapAnomalies, setMapAnomalies] = useState<any[]>([]);
    const [globalHealth, setGlobalHealth] = useState(78);

    // Load Real Data
    useEffect(() => {
        const points = getMonitoringPoints(parametro);
        setRealPoints(points);

        // Calculate Zone Status based on real points
        const bahiaPoints = points.filter(p => p.type === "Bahia" && p.hasData);
        const lagoPoints = points.filter(p => p.type === "Lago" && p.hasData);

        const avgBahia = bahiaPoints.reduce((acc, p) => acc + p.value, 0) / (bahiaPoints.length || 1);
        const avgLago = lagoPoints.reduce((acc, p) => acc + p.value, 0) / (lagoPoints.length || 1);

        // Determine status based on parameter (simplified logic)
        const getStatus = (val: number) => {
            if (parametro === "aceites_grasas") return val > 0.5 ? "critical" : val > 0.2 ? "warning" : "stable";
            return val > 0.05 ? "warning" : "stable";
        };

        setZones([
            {
                name: "Bahía Interior (Puno)",
                ph: 8.2, // Mock pH for now as we only have specific param data loaded
                oxygen: 6.5,
                value: avgBahia,
                status: getStatus(avgBahia)
            },
            {
                name: "Lago Mayor (Titicaca)",
                ph: 8.5,
                oxygen: 7.2,
                value: avgLago,
                status: getStatus(avgLago)
            },
        ]);

    }, [parametro]);

    // Simulation Logic
    useEffect(() => {
        const interval = setInterval(() => {
            const random = Math.random();

            // 30% chance of event
            if (random > 0.7) {
                const types = ["Derrame Detectado", "Baja de Oxígeno", "Algas Nocivas", "pH Inestable"];
                const type = types[Math.floor(Math.random() * types.length)];
                const severity = Math.random() > 0.8 ? "high" : Math.random() > 0.5 ? "medium" : "low";
                const zoneIndex = Math.floor(Math.random() * zones.length);
                const zoneName = zones[zoneIndex]?.name || "Zona Desconocida";

                // Create Feed Item
                const newAnomaly = {
                    id: Date.now().toString(),
                    message: `${type} en ${zoneName}`,
                    timestamp: new Date().toLocaleTimeString(),
                    severity
                };

                // Create Map Marker
                const baseLat = -15.8;
                const baseLng = -69.6;
                const lat = baseLat + (Math.random() * 0.5 - 0.25);
                const lng = baseLng + (Math.random() * 0.5 - 0.25);

                setAnomalies(prev => [newAnomaly, ...prev].slice(0, 20));
                setMapAnomalies(prev => [...prev, { id: newAnomaly.id, lat, lng, type }].slice(-10)); // Keep last 10 on map

                // Impact Health
                if (severity === "high") setGlobalHealth(prev => Math.max(0, prev - 2));
            } else {
                // Slowly recover health
                setGlobalHealth(prev => Math.min(100, prev + 0.5));
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [zones]);

    return (
        <div className="relative w-full h-screen bg-slate-950 overflow-hidden font-sans">
            {/* Background Map */}
            <div className="absolute inset-0 z-0">
                <SimulatorMap layer={layer} anomalies={mapAnomalies} realPoints={realPoints} />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

            {/* Header HUD */}
            <div className="absolute top-0 left-0 right-0 z-50 p-4 flex justify-between items-start pointer-events-none">
                <div className="bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-6 py-2 flex items-center gap-4 pointer-events-auto">
                    <div className="flex items-center gap-2">
                        <div className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                        </div>
                        <span className="font-bold text-white tracking-widest text-sm">TITICACA<span className="text-blue-400">OS</span></span>
                    </div>
                    <div className="h-4 w-px bg-white/20" />
                    <div className="text-xs text-white/60 font-mono">v2.4.0 LIVE</div>
                </div>

                <div className="flex gap-2 pointer-events-auto">
                    <select
                        value={parametro}
                        onChange={(e) => setParametro(e.target.value as any)}
                        className="bg-black/40 border border-white/10 text-white text-xs rounded-md px-2 py-1 outline-none focus:border-blue-500"
                    >
                        <option value="aceites_grasas">Aceites y Grasas</option>
                        <option value="clorofila_a">Clorofila a</option>
                    </select>

                    <Button
                        variant="outline"
                        size="sm"
                        className={cn("bg-black/40 border-white/10 text-white hover:bg-white/10", layer === "map" && "bg-blue-600/50 border-blue-500")}
                        onClick={() => setLayer("map")}
                    >
                        <Layers className="h-4 w-4 mr-2" />
                        Mapa
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn("bg-black/40 border-white/10 text-white hover:bg-white/10", layer === "satellite" && "bg-blue-600/50 border-blue-500")}
                        onClick={() => setLayer("satellite")}
                    >
                        <Radio className="h-4 w-4 mr-2" />
                        Satélite
                    </Button>
                </div>
            </div>

            {/* Left Panel - Analytics */}
            <div className="absolute top-24 left-4 bottom-8 z-40 w-80 flex flex-col gap-4 pointer-events-none">
                {/* Global Health Card */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-4 pointer-events-auto">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xs font-bold text-white/70 uppercase">Salud Global</h3>
                        {globalHealth > 70 ? (
                            <ShieldCheck className="h-5 w-5 text-green-400" />
                        ) : (
                            <AlertOctagon className="h-5 w-5 text-red-400" />
                        )}
                    </div>
                    <div className="text-4xl font-bold text-white mb-2">{globalHealth.toFixed(1)}%</div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-1000"
                            style={{ width: `${globalHealth}%` }}
                        />
                    </div>
                </div>

                {/* Zone Analytics */}
                <div className="flex-1 overflow-y-auto pointer-events-auto">
                    <ZoneAnalytics zones={zones} />
                </div>
            </div>

            {/* Right Panel - Feed */}
            <div className="absolute top-24 right-4 bottom-8 z-40 w-80 pointer-events-none">
                <div className="h-full pointer-events-auto">
                    <AnomalyFeed anomalies={anomalies} />
                </div>
            </div>
        </div>
    );
}
