'use client';

import Image from 'next/image';
import { Report } from '@/data/reports';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, MapPin } from 'lucide-react';
import { Badge } from '../ui/badge';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface ImageTriageCardProps {
  report: Report;
  onDecision: (reportId: string, decision: 'approve' | 'reject') => void;
}

const incidentTypeColors: { [key: string]: string } = {
    'Vertido de Residuos': 'bg-amber-100 text-amber-800 border-amber-200',
    'Contaminación del Agua': 'bg-blue-100 text-blue-800 border-blue-200',
    'Fauna Afectada': 'bg-red-100 text-red-800 border-red-200',
    'Deforestación en Orillas': 'bg-green-100 text-green-800 border-green-200',
    'Otro': 'bg-slate-100 text-slate-800 border-slate-200',
};


export function ImageTriageCard({ report, onDecision }: ImageTriageCardProps) {

  const timeAgo = formatDistanceToNow(new Date(report.timestamp), {
    addSuffix: true,
    locale: es,
  });

  return (
    <Card className="overflow-hidden bg-white shadow-lg border-slate-200 w-full max-w-sm mx-auto">
      <div className="relative aspect-video">
        <Image src={report.image} alt={report.description} fill className="object-cover" />
         <Badge
          className={`absolute top-3 right-3 ${
            incidentTypeColors[report.type] || incidentTypeColors['Otro']
          }`}
        >
          {report.type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-slate-600 mb-2">{report.description}</p>
        <div className="flex items-center text-xs text-slate-500 gap-2">
            <MapPin className="w-3 h-3 text-primary" />
            <span>{`Lat: ${report.location.lat.toFixed(4)}, Lng: ${report.location.lng.toFixed(4)}`}</span>
            <span>({timeAgo})</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <Button variant="outline" size="sm" onClick={() => onDecision(report.id.toString(), 'reject')}>
            <X className="mr-2 text-red-500" /> Rechazar
          </Button>
          <Button size="sm" onClick={() => onDecision(report.id.toString(), 'approve')} className="bg-green-600 hover:bg-green-700">
            <Check className="mr-2" /> Aprobar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
