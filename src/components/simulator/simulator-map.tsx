"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import lagoTiticacaDataUTM from "@/data/lago_titicaca.json";

interface SimulatorMapProps {
    layer: "map" | "satellite";
    anomalies: Array<{ id: string; lat: number; lng: number; type: string }>;
    realPoints?: Array<{ id: string; lat: number; lng: number; value: number; hasData: boolean; type: string }>;
}

export function SimulatorMap({ layer, anomalies, realPoints = [] }: SimulatorMapProps) {
    const mapContainer = useRef<HTMLDivElement>(null);
    const mapInstance = useRef<any>(null);
    const markersRef = useRef<any[]>([]);
    const realMarkersRef = useRef<any[]>([]);
    const layerRef = useRef<any>(null);
    const polygonLayersRef = useRef<any[]>([]);

    useEffect(() => {
        if (typeof window === "undefined" || !mapContainer.current) return;

        Promise.all([import("leaflet"), import("proj4")]).then(([L, proj4Module]) => {
            if (!mapContainer.current) return;

            // Initialize map if not exists
            if (!mapInstance.current) {
                const map = L.map(mapContainer.current, {
                    zoomControl: false,
                    attributionControl: false
                }).setView([-15.9, -69.4], 9);

                mapInstance.current = map;

                // Add custom zoom control
                L.control.zoom({ position: 'bottomright' }).addTo(map);
            }

            const map = mapInstance.current;

            // Update Base Layer
            if (layerRef.current) {
                map.removeLayer(layerRef.current);
            }

            if (layer === "map") {
                layerRef.current = L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png", {
                    maxZoom: 19,
                    subdomains: ['a', 'b', 'c', 'd']
                }).addTo(map);
            } else {
                layerRef.current = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                    attribution: 'Tiles &copy; Esri'
                }).addTo(map);
            }

            // Update Anomaly Markers
            markersRef.current.forEach(marker => marker.remove());
            markersRef.current = [];

            anomalies.forEach(anomaly => {
                let color = "bg-red-500";
                let ringColor = "bg-red-400";

                if (anomaly.type.includes("Algas")) {
                    color = "bg-green-500";
                    ringColor = "bg-green-400";
                } else if (anomaly.type.includes("Oxígeno")) {
                    color = "bg-blue-500";
                    ringColor = "bg-blue-400";
                } else if (anomaly.type.includes("pH")) {
                    color = "bg-yellow-500";
                    ringColor = "bg-yellow-400";
                }

                const pulseIcon = L.divIcon({
                    className: 'custom-pulse-icon',
                    html: `
                    <div class="relative flex h-6 w-6">
                      <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${ringColor} opacity-75"></span>
                      <span class="relative inline-flex rounded-full h-6 w-6 ${color} border-2 border-white shadow-lg"></span>
                    </div>
                  `,
                    iconSize: [24, 24],
                    iconAnchor: [12, 12]
                });

                const marker = L.marker([anomaly.lat, anomaly.lng], { icon: pulseIcon })
                    .addTo(map)
                    .bindPopup(`<div class="font-bold ${color.replace('bg-', 'text-')}">${anomaly.type}</div>`);

                markersRef.current.push(marker);
            });

            // Update Real Data Markers
            realMarkersRef.current.forEach(marker => marker.remove());
            realMarkersRef.current = [];

            realPoints.forEach(point => {
                if (!point.hasData) return;

                const color = point.type === "Bahia" ? "#FF6B6B" : "#4ECDC4";
                const icon = L.divIcon({
                    className: 'real-point-icon',
                    html: `
            <div style="
              background-color: ${color};
              width: 10px;
              height: 10px;
              border-radius: 50%;
              border: 1px solid white;
              box-shadow: 0 0 4px ${color};
              opacity: 0.8;
            "></div>
          `,
                    iconSize: [10, 10],
                    iconAnchor: [5, 5]
                });

                const marker = L.marker([point.lat, point.lng], { icon })
                    .addTo(map)
                    .bindPopup(`
            <div class="text-xs">
              <strong class="block mb-1">${point.id}</strong>
              Valor: ${point.value}
            </div>
          `);

                realMarkersRef.current.push(marker);
            });

            // Render Lake Polygons (Zones)
            // Clear existing polygon layers
            polygonLayersRef.current.forEach(layer => map.removeLayer(layer));
            polygonLayersRef.current = [];

            // Calculate average values for coloring
            const bahiaPoints = realPoints.filter(p => p.type === "Bahia");
            const lagoPoints = realPoints.filter(p => p.type === "Lago");

            const getStatusColor = (points: any[]) => {
                if (points.length === 0) return "#4A90E2"; // Default blue
                const avg = points.reduce((acc, p) => acc + p.value, 0) / points.length;
                // Thresholds (example for oils/fats)
                if (avg > 0.5) return "#ef4444"; // Red (Critical)
                if (avg > 0.2) return "#eab308"; // Yellow (Warning)
                return "#22c55e"; // Green (Good)
            };

            const lagoColor = getStatusColor(lagoPoints);

            // Convert coords function
            const utmZone19S = '+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs';
            const wgs84 = '+proj=longlat +datum=WGS84 +no_defs';

            const convertCoords = (coords: any): any => {
                if (typeof coords[0] === "number") {
                    const [lng, lat] = proj4Module.default(utmZone19S, wgs84, [coords[0], coords[1]]);
                    return [lat, lng];
                }
                return coords.map(convertCoords);
            };

            // Render GeoJSON
            lagoTiticacaDataUTM.features?.forEach((feature: any) => {
                if (feature.geometry?.coordinates) {
                    const converted = convertCoords(feature.geometry.coordinates);

                    if (feature.geometry.type === "MultiPolygon") {
                        converted.forEach((polygon: any) => {
                            const polygonLayer = L.polygon(polygon, {
                                color: lagoColor,
                                fillColor: lagoColor,
                                fillOpacity: 0.2,
                                weight: 1,
                            }).addTo(map);
                            polygonLayersRef.current.push(polygonLayer);
                        });
                    }
                }
            });

        }).catch(err => console.error("Error loading map:", err));

        return () => {
            // Cleanup handled by refs, but could destroy map if needed
        };
    }, [layer, anomalies, realPoints]);

    return <div ref={mapContainer} className="h-full w-full bg-slate-900" />;
}
