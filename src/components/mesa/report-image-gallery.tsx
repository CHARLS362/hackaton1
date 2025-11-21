'use client';

import { Report } from '@/data/reports';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GalleryVertical, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { es } from 'date-fns/locale';

interface ReportImageGalleryProps {
  reports: Report[];
}

const incidentTypeColors: { [key: string]: string } = {
  'Vertido de Residuos': 'bg-amber-100 text-amber-800 border-amber-200',
  'Contaminación del Agua': 'bg-blue-100 text-blue-800 border-blue-200',
  'Fauna Afectada': 'bg-red-100 text-red-800 border-red-200',
  'Deforestación en Orillas': 'bg-green-100 text-green-800 border-green-200',
  'Otro': 'bg-slate-100 text-slate-800 border-slate-200',
};

export function ReportImageGallery({ reports }: ReportImageGalleryProps) {
  return (
    <Card className="w-full bg-white shadow-xl border">
      <CardHeader>
        <CardTitle>Galería de Imágenes de Reportes Aprobados</CardTitle>
        <CardDescription>
          Una vista rápida de toda la evidencia fotográfica recolectada y validada.
          Se encontraron {reports.length} imágenes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {reports.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {reports.map(report => (
              <Link key={report.id} href={`/dashboard#report-${report.id}`} passHref>
                <div className="group relative aspect-square w-full overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-xl hover:scale-105">
                  <Image
                    src={report.image}
                    alt={report.description}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-100 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 p-2 text-white">
                      <Badge
                        className={`text-xs ${
                          incidentTypeColors[report.type] || incidentTypeColors['Otro']
                        }`}
                      >
                        {report.type}
                      </Badge>
                      <p className="mt-1 flex items-center gap-1 text-xs font-light" title={new Date(report.timestamp).toLocaleString(es.code)}>
                        <MapPin className="h-3 w-3" />
                         {new Date(report.timestamp).toLocaleDateString(es.code)}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-50 rounded-lg border border-dashed">
            <GalleryVertical className="w-16 h-16 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700">No hay imágenes disponibles</h3>
            <p className="text-slate-500 mt-2">
              No se han encontrado reportes aprobados que contengan imágenes.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}