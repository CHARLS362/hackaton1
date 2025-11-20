'use client';

import type { Report } from '@/data/reports';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Calendar, User } from 'lucide-react';
import Image from 'next/image';
import { Map, Marker } from 'pigeon-maps';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
  const timeAgo = formatDistanceToNow(new Date(report.timestamp), {
    addSuffix: true,
    locale: es,
  });

  const incidentTypeColors: { [key: string]: string } = {
    'Vertido de Residuos': 'bg-amber-100 text-amber-800 border-amber-200',
    'Contaminación del Agua': 'bg-blue-100 text-blue-800 border-blue-200',
    'Fauna Afectada': 'bg-red-100 text-red-800 border-red-200',
    'Deforestación en Orillas': 'bg-green-100 text-green-800 border-green-200',
    'Otro': 'bg-slate-100 text-slate-800 border-slate-200',
  };

  return (
    <Card className="bg-white border-slate-200 text-slate-800 h-full flex flex-col group transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        <Image
          src={report.image}
          alt={report.description}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge
          className={`absolute top-3 right-3 ${
            incidentTypeColors[report.type] || incidentTypeColors['Otro']
          }`}
        >
          {report.type}
        </Badge>
      </div>
      <div className="flex flex-col flex-grow p-5">
        <CardHeader className="p-0">
          <CardDescription className="text-slate-500 text-xs">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
              <div className="flex items-center gap-1.5" title={new Date(report.timestamp).toLocaleString()}>
                <Calendar className="w-3 h-3" />
                <span>{timeAgo}</span>
              </div>
              {report.author && (
                <div className="flex items-center gap-1.5">
                  <User className="w-3 h-3" />
                  <span>{report.author}</span>
                </div>
              )}
            </div>
          </CardDescription>
          <CardTitle className="text-base font-bold leading-tight pt-2">
            {report.description}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0 mt-4">
          <div className="h-32 w-full rounded-md overflow-hidden border border-slate-200">
             <Map
                defaultCenter={[report.location.lat, report.location.lng]}
                defaultZoom={12}
                provider={(x, y, z) => {
                return `https://{s}.basemaps.cartocdn.com/light_all/${z}/${x}/${y}.png`;
                }}
                attribution={false}
                mouseEvents={false}
                touchEvents={false}
            >
                <Marker anchor={[report.location.lat, report.location.lng]} color="hsl(var(--primary))" />
            </Map>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
            <MapPin className="w-3 h-3 text-primary" />
            <span>{`Lat: ${report.location.lat.toFixed(4)}, Lng: ${report.location.lng.toFixed(4)}`}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
