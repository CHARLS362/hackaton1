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
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';
import { useEffect, useState } from 'react';

interface ReportCardProps {
  report: Report;
}

export function ReportCard({ report }: ReportCardProps) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    // Format date on the client to avoid hydration mismatch
    setTimeAgo(formatDistanceToNow(new Date(report.timestamp), {
      addSuffix: true,
      locale: es,
    }));
  }, [report.timestamp]);

  const incidentTypeColors: { [key: string]: string } = {
    'Vertido de Residuos': 'bg-amber-100 text-amber-800 border-amber-200',
    'Contaminación del Agua': 'bg-blue-100 text-blue-800 border-blue-200',
    'Fauna Afectada': 'bg-red-100 text-red-800 border-red-200',
    'Deforestación en Orillas': 'bg-green-100 text-green-800 border-green-200',
    'Otro': 'bg-slate-100 text-slate-800 border-slate-200',
  };

  const staticMapUrl = `https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-marker+f74e4e(${report.location.lng},${report.location.lat})/${report.location.lng},${report.location.lat},12,0/400x300?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;


  return (
    <Card className="bg-white border-slate-200 text-slate-800 h-full flex flex-col group transition-all shadow-sm hover:shadow-xl hover:-translate-y-1">
      <div className="aspect-video relative overflow-hidden rounded-t-lg">
        {report.image && (
             <Image
             src={report.image}
             alt={report.description}
             fill
             className="object-cover group-hover:scale-105 transition-transform duration-300"
           />
        )}
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
                <span>{timeAgo || 'Cargando...'}</span>
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
             <Image
                src={`https://api.mapbox.com/styles/v1/mapbox/light-v11/static/pin-s-marker+f44336(${report.location.lng},${report.location.lat})/${report.location.lng},${report.location.lat},11,0/400x300?access_token=pk.eyJ1IjoiZGF2aWRqYWNja2EiLCJhIjoiY2p3cnp3cWc5MDRlZDRhcGZpZ3F4azZ0ZCJ9.tFw3w3l2-mY_a1d3v3p0bQ`}
                alt={`Map of ${report.type}`}
                width={400}
                height={300}
                className="w-full h-full object-cover"
             />
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
