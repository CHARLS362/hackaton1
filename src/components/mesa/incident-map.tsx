'use client';

import { Report } from '@/data/reports';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Map, Marker } from 'pigeon-maps';
import { useState } from 'react';
import { Badge } from '../ui/badge';
import { cn } from '@/lib/utils';
import { osm } from 'pigeon-maps/providers';

interface IncidentMapProps {
  reports: Report[];
}

const incidentTypeColors: { [key: string]: { color: string; bg: string; text: string; border: string } } = {
  'Vertido de Residuos': { color: '#f59e0b', bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  'Contaminación del Agua': { color: '#3b82f6', bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  'Fauna Afectada': { color: '#ef4444', bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
  'Deforestación en Orillas': { color: '#22c55e', bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300' },
  'Otro': { color: '#64748b', bg: 'bg-slate-100', text: 'text-slate-800', border: 'border-slate-300' },
};

export function IncidentMap({ reports }: IncidentMapProps) {
  const [activeFilters, setActiveFilters] = useState<string[]>(Object.keys(incidentTypeColors));

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const filteredReports = reports.filter(report => activeFilters.includes(report.type));
  
  return (
    <Card className="w-full bg-white shadow-xl border">
      <CardHeader>
        <CardTitle>Mapa de Incidencia de Reportes</CardTitle>
        <CardDescription>
          Visualiza los reportes de incidentes ambientales en el mapa. Filtra por tipo de reporte.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
            {Object.entries(incidentTypeColors).map(([type, colors]) => (
                <Badge 
                    key={type}
                    onClick={() => toggleFilter(type)}
                    className={cn(
                        "cursor-pointer transition-all border",
                        activeFilters.includes(type)
                            ? `${colors.bg} ${colors.text} ${colors.border}`
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                    )}
                >
                    <span className={cn("w-2 h-2 rounded-full mr-2")} style={{ backgroundColor: colors.color }}></span>
                    {type}
                </Badge>
            ))}
        </div>
        <div className="h-[500px] w-full rounded-lg overflow-hidden border">
          <Map
            provider={osm}
            dprs={[1, 2]}
            defaultCenter={[-15.9, -69.4]}
            defaultZoom={9}
          >
            {filteredReports.map(report => (
                <Marker 
                    key={report.id}
                    anchor={[report.location.lat, report.location.lng]} 
                    color={incidentTypeColors[report.type]?.color}
                />
            ))}
          </Map>
        </div>
      </CardContent>
    </Card>
  );
}
