"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { Compass } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import lagoTiticacaDataUTM from "@/data/lago_titicaca.json";
import monitoringData from "@/data/ana_oct2019.json";

// Tipos para los datos adicionales de cada punto
interface PointData {
  gestiones: string[];
  valores: string[];
  limites: (string | null)[];
  eca: string[];
}

// Importar datos adicionales por código de punto
// Ejemplo: { "LTit59": [[gestiones], [valores], [limites], [eca]], ... }
interface AdditionalDataMap {
  [key: string]: [string[], string[], (string | null)[], string[]];
}

// Definir parámetros disponibles fuera del componente
const PARAMETROS_DISPONIBLES = {
  "aceites_grasas": {
    nombre: "Aceites y Grasas",
    unidad: "mg/L",
    data: {
      "LTit59": [["ABR2019", "OCT2019"], ["0.9", "0.18"], [null, null], ["5.0000000", "5.0000000"]] as [string[], string[], (string | null)[], string[]],
      "LTit60": [["ABR2019", "OCT2019"], ["0.9", "0.19"], [null, null], ["5.0000000", "5.0000000"]] as [string[], string[], (string | null)[], string[]],
      "LTit61": [["ABR2019", "OCT2019"], ["4", "0.1"], [null, null], ["5.0000000", "5.0000000"]] as [string[], string[], (string | null)[], string[]],
      "LTit62": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit63": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit64": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit65": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit66": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit67": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit68": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit69": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit70": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit71": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit72": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
      "LTit73": [["OCT2019"], ["8e-05"], [], []] as [string[], string[], (string | null)[], string[]],
    } as AdditionalDataMap
  },
  "clorofila_a": {
    nombre: "Clorofila a",
    unidad: "mg/L",
    data: {
      "LTit59": [["ABR2019", "OCT2019"], ["0.08935", "0.04287"], [null, null], ["0.0080000", "0.0080000"]] as [string[], string[], (string | null)[], string[]],
      "LTit60": [["ABR2019", "OCT2019"], ["0.11894", "0.02802"], [null, null], ["0.0080000", "0.0080000"]] as [string[], string[], (string | null)[], string[]],
    } as AdditionalDataMap
  }
};

export function DataMap() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const [parametroActivo, setParametroActivo] = useState<keyof typeof PARAMETROS_DISPONIBLES>("aceites_grasas");

  useEffect(() => {
    if (typeof window === "undefined" || !mapContainer.current) return;

    Promise.all([import("leaflet"), import("proj4")]).then(([L, proj4Module]) => {
      if (!mapContainer.current) return;

      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      const proj4 = proj4Module.default;
      
      // Definir proyecciones: UTM Zone 19S y WGS84
      const utmZone19S = '+proj=utm +zone=19 +south +datum=WGS84 +units=m +no_defs';
      const wgs84 = '+proj=longlat +datum=WGS84 +no_defs';

      const map = L.map(mapContainer.current).setView([-15.9, -69.4], 9);
      mapInstance.current = map;

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
        maxZoom: 19,
        subdomains: ['a', 'b', 'c', 'd']
      }).addTo(map);

      // Convertir coordenadas con proj4
      const convertCoords = (coords: any): any => {
        if (typeof coords[0] === "number") {
          const [lng, lat] = proj4(utmZone19S, wgs84, [coords[0], coords[1]]);
          return [lat, lng];
        }
        return coords.map(convertCoords);
      };

      // Procesar features del lago (polígonos)
      lagoTiticacaDataUTM.features?.forEach((feature: any) => {
        if (feature.geometry?.coordinates) {
          const converted = convertCoords(feature.geometry.coordinates);
          
          if (feature.geometry.type === "MultiPolygon") {
            converted.forEach((polygon: any) => {
              L.polygon(polygon, {
                color: "#4A90E2",
                fillColor: "#4A90E2",
                fillOpacity: 0.3,
                weight: 2,
              }).addTo(map);
            });
          }
        }
      });

      // Cargar datos por parámetro
      // Puedes importar desde archivos JSON separados:
      // import aceitesGrasasData from "@/data/parameters/aceites_grasas.json"
      // import clorofilaData from "@/data/parameters/clorofila_a.json"
      
      const parametrosDisponibles = {
        "aceites_grasas": {
          nombre: "Aceites y Grasas",
          unidad: "mg/L",
          data: {
            "LTit59": [["ABR2019", "OCT2019"], ["0.9", "0.18"], [null, null], ["5.0000000", "5.0000000"]],
            "LTit60": [["ABR2019", "OCT2019"], ["0.9", "0.19"], [null, null], ["5.0000000", "5.0000000"]],
            "LTit61": [["ABR2019", "OCT2019"], ["4", "0.1"], [null, null], ["5.0000000", "5.0000000"]],
            // ... más puntos
          }
        },
        "clorofila_a": {
          nombre: "Clorofila a",
          unidad: "mg/L",
          data: {
            "LTit59": [["ABR2019", "OCT2019"], ["0.08935", "0.04287"], [null, null], ["0.0080000", "0.0080000"]],
            "LTit60": [["ABR2019", "OCT2019"], ["0.11894", "0.02802"], [null, null], ["0.0080000", "0.0080000"]],
            // ... más puntos
          }
        }
      };
      
      // Parámetro activo (puedes hacer esto dinámico con un selector)
      const parametroInfo = PARAMETROS_DISPONIBLES[parametroActivo];
      const additionalData = parametroInfo.data;

      // Agregar puntos de monitoreo
      const monitoringFeatures = (monitoringData[1] as any)?.features;
      
      if (monitoringFeatures && Array.isArray(monitoringFeatures)) {
        // Iconos personalizados según el tipo
        const createCustomIcon = (tipo: string) => {
          const color = tipo === "Bahia" ? "#FF6B6B" : "#4ECDC4";
          return L.divIcon({
            html: `
              <div style="
                background-color: ${color};
                width: 14px;
                height: 14px;
                border-radius: 50%;
                border: 2px solid white;
                box-shadow: 0 2px 6px rgba(0,0,0,0.4);
                transition: transform 0.2s;
              "></div>
            `,
            className: 'custom-marker',
            iconSize: [14, 14],
            iconAnchor: [7, 7],
          });
        };

        monitoringFeatures.forEach((feature: any) => {
          if (feature.geometry?.type === "Point" && feature.geometry.coordinates) {
            const [lng, lat] = feature.geometry.coordinates;
            const props = feature.properties;
            const codigo = props.codigo;
            
            // Obtener datos adicionales del punto
            const pointData = additionalData[codigo];
            let chartHTML = '';
            const marker = L.marker([lat, lng], {
              icon: createCustomIcon(props.tipo)
            }).addTo(map);

              // Validar que el punto tenga datos
              if (!pointData || !pointData[0] || pointData[0].length === 0) {
                chartHTML = `
                  <div style="
                    margin-top: 16px;
                    padding: 20px;
                    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                    border: 1px solid #fcd34d;
                    border-radius: 12px;
                    text-align: center;
                  ">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#92400e" stroke-width="2" style="margin: 0 auto 8px;">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    <div style="color: #78350f; font-size: 12px; font-weight: 600;">
                      No hay datos históricos disponibles<br/>para este parámetro
                    </div>
                  </div>
                `;
              } else {
              const [gestiones, valores] = pointData;
              const maxValor = Math.max(...valores.map(v => parseFloat(v)));
              const chartWidth = 250;
              const chartHeight = 100;
              const barWidth = chartWidth / gestiones.length - 10;
              
              chartHTML = `
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #e5e7eb;">
                  <div style="font-weight: bold; font-size: 12px; margin-bottom: 8px;">Histórico de Mediciones</div>
                  <svg width="${chartWidth}" height="${chartHeight}" style="background: #f9fafb; border-radius: 4px;">
                    ${gestiones.map((gestion, i) => {
                      const valor = parseFloat(valores[i]);
                      const barHeight = (valor / maxValor) * (chartHeight - 30);
                      const x = i * (chartWidth / gestiones.length) + 10;
                      const y = chartHeight - barHeight - 20;
                      
                      return `
                        <g>
                          <rect 
                            x="${x}" 
                            y="${y}" 
                            width="${barWidth}" 
                            height="${barHeight}" 
                            fill="${props.tipo === 'Bahia' ? '#FF6B6B' : '#4ECDC4'}"
                            rx="2"
                          />
                          <text 
                            x="${x + barWidth/2}" 
                            y="${y - 3}" 
                            text-anchor="middle" 
                            font-size="10" 
                            fill="#374151"
                            font-weight="bold"
                          >${valor}</text>
                          <text 
                            x="${x + barWidth/2}" 
                            y="${chartHeight - 5}" 
                            text-anchor="middle" 
                            font-size="9" 
                            fill="#6b7280"
                          >${gestion}</text>
                        </g>
                      `;
                    }).join('')}
                  </svg>
                </div>
                <div style="margin-top: 8px; font-size: 11px; color: #6b7280;">
                  <div style="display: flex; justify-content: space-between;">
                    <span>Promedio:</span>
                    <span style="font-weight: bold;">${(valores.reduce((a, b) => parseFloat(a.toString()) + parseFloat(b), 0) / valores.length).toFixed(2)}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between;">
                    <span>ECA:</span>
                    <span style="font-weight: bold;">${pointData[3][0]}</span>
                  </div>
                </div>
              `;
            }

            // Crear popup con información
            const popupContent = `
              <div style="
                min-width: 300px; 
                max-width: 360px;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
              ">
                <!-- Header con gradiente -->
                <div style="
                  background: linear-gradient(135deg, ${props.tipo === 'Bahia' ? '#FF6B6B' : '#4ECDC4'} 0%, ${props.tipo === 'Bahia' ? '#ee5a6f' : '#45b7af'} 100%);
                  margin: -15px -15px 16px -15px;
                  padding: 16px;
                  border-radius: 12px 12px 0 0;
                  color: white;
                  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                ">
                  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                    <h3 style="margin: 0; font-weight: 700; font-size: 16px; letter-spacing: 0.5px;">
                      ${codigo}
                    </h3>
                    <span style="
                      background: rgba(255,255,255,0.25);
                      padding: 4px 10px;
                      border-radius: 12px;
                      font-size: 10px;
                      font-weight: 600;
                      text-transform: uppercase;
                      letter-spacing: 0.5px;
                      backdrop-filter: blur(10px);
                    ">${props.tipo}</span>
                  </div>
                  <div style="display: flex; align-items: center; gap: 12px; font-size: 11px; opacity: 0.95;">
                    <span style="display: flex; align-items: center; gap: 4px;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      ${props.fecha}
                    </span>
                    <span style="display: flex; align-items: center; gap: 4px;">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      ${props.hora}
                    </span>
                  </div>
                </div>
                
                <!-- Contenido -->
                <div style="padding: 0 4px;">
                  <!-- Nombre del punto -->
                  <div style="
                    background: linear-gradient(to right, #f8fafc, #f1f5f9);
                    border-left: 3px solid ${props.tipo === 'Bahia' ? '#FF6B6B' : '#4ECDC4'};
                    padding: 10px 12px;
                    margin-bottom: 16px;
                    border-radius: 6px;
                  ">
                    <p style="
                      margin: 0; 
                      color: #1e293b; 
                      font-size: 13px;
                      line-height: 1.5;
                      font-weight: 500;
                    ">
                      ${props.nombre || 'Sin nombre'}
                    </p>
                  </div>
                  
                  <!-- Grid de datos -->
                  <div style="
                    display: grid; 
                    grid-template-columns: repeat(2, 1fr); 
                    gap: 12px; 
                    margin-bottom: 16px;
                  ">
                    <!-- pH Card -->
                    <div style="
                      background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
                      border: 1px solid #86efac;
                      padding: 10px;
                      border-radius: 8px;
                      text-align: center;
                    ">
                      <div style="color: #15803d; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                        pH
                      </div>
                      <div style="color: #166534; font-size: 20px; font-weight: 700;">
                        ${props.ph}
                      </div>
                    </div>
                    
                    <!-- ECA Card -->
                    <div style="
                      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                      border: 1px solid #fcd34d;
                      padding: 10px;
                      border-radius: 8px;
                      text-align: center;
                    ">
                      <div style="color: #92400e; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                        ECA
                      </div>
                      <div style="color: #78350f; font-size: 14px; font-weight: 700;">
                        ${props.eca}
                      </div>
                    </div>
                  </div>
                  
                  <!-- Departamento si existe -->
                  ${props.departamento ? `
                    <div style="
                      display: flex;
                      align-items: center;
                      gap: 8px;
                      padding: 8px 12px;
                      background: #f8fafc;
                      border-radius: 6px;
                      margin-bottom: 16px;
                    ">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#64748b" stroke-width="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span style="color: #475569; font-size: 12px; font-weight: 500;">
                        ${props.departamento}
                      </span>
                    </div>
                  ` : ''}
                  
                  ${chartHTML}
                </div>
              </div>
            `;

            marker.bindPopup(popupContent, {
              maxWidth: 340,
              className: 'custom-popup'
            });

            // Efecto hover
            marker.on('mouseover', function(this: any) {
              this.getElement()?.querySelector('div')?.style.setProperty('transform', 'scale(1.3)');
            });
            
            marker.on('mouseout', function(this: any) {
              this.getElement()?.querySelector('div')?.style.setProperty('transform', 'scale(1)');
            });
          }
        });

        // Agregar leyenda mejorada
        const legend = (L as any).control({ position: 'bottomleft' });
        
        legend.onAdd = function () {
          const div = (L as any).DomUtil.create('div', 'info legend');
          div.style.cssText = `
            background: white;
            padding: 12px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.15);
            font-family: system-ui, -apple-system, sans-serif;
          `;
          
          div.innerHTML = `
            <div style="font-size: 12px;">
              <div style="margin-bottom: 10px; font-weight: bold; color: #111827;">
                Puntos de Monitoreo
              </div>
              <div style="display: flex; align-items: center; margin-bottom: 6px;">
                <span style="
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  background-color: #FF6B6B;
                  border-radius: 50%;
                  margin-right: 8px;
                  border: 2px solid white;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                "></span>
                <span style="color: #374151;">Bahía</span>
              </div>
              <div style="display: flex; align-items: center;">
                <span style="
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  background-color: #4ECDC4;
                  border-radius: 50%;
                  margin-right: 8px;
                  border: 2px solid white;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
                "></span>
                <span style="color: #374151;">Lago</span>
              </div>
              <div style="
                margin-top: 10px; 
                padding-top: 10px;
                border-top: 1px solid #e5e7eb;
                font-size: 11px; 
                color: #6b7280;
              ">
                <strong style="color: #111827;">${monitoringFeatures.length}</strong> puntos de monitoreo
                <div style="margin-top: 4px;">
                  Octubre 2019
                </div>
              </div>
            </div>
          `;
          
          return div;
        };
        
        legend.addTo(map);
      }

    }).catch((error) => {
      console.error("Error loading map libraries:", error);
    });

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [parametroActivo]); // Re-renderiza cuando cambia el parámetro

  return (
    <section id="map" className="py-12 sm:py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Visualiza los Datos en el Mapa
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            Explora datos en tiempo real y los puntos críticos del Lago
            Titicaca de forma intuitiva.
          </p>
        </div>

        {/* Selector de Parámetros */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <label 
              htmlFor="parametro-selector" 
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Seleccionar Parámetro de Monitoreo
            </label>
            <div className="relative">
              <select
                id="parametro-selector"
                value={parametroActivo}
                onChange={(e) => setParametroActivo(e.target.value)}
                className="block w-full px-4 py-3 pr-10 text-base border-2 border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all hover:border-gray-400 cursor-pointer appearance-none"
              >
                <option value="aceites_grasas">Aceites y Grasas (mg/L)</option>
                <option value="clorofila_a">Clorofila a (mg/L)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Los datos del mapa se actualizarán automáticamente según el parámetro seleccionado
            </p>
          </div>
        </div>

        <div className="relative rounded-2xl shadow-2xl bg-slate-100 border border-slate-200 p-2 lg:p-4">
          <div className="flex items-center gap-2 px-2 pt-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className={cn("h-[80vh] w-full z-0 rounded-lg mt-2 relative")}>
            <div ref={mapContainer} className="h-full w-full rounded-lg" />
            <div className="absolute top-4 right-4 z-[1000] pointer-events-auto">
              <Button
                size="lg"
                asChild
                className="shadow-xl hover:shadow-2xl transition-all"
              >
                <Link href="/mapa">
                  <Compass className="mr-2 h-5 w-5" />
                  Explorar Mapa Interactivo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
