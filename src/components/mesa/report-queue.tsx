'use client';

import { Report } from '@/data/reports';
import { ImageTriageCard } from './image-triage-card';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { FileQuestion } from 'lucide-react';

interface ReportQueueProps {
  reports: Report[];
  onDecision: (reportId: string, decision: 'approve' | 'reject') => void;
}

export function ReportQueue({ reports, onDecision }: ReportQueueProps) {
  return (
    <Card className="w-full bg-white shadow-xl border">
      <CardHeader>
        <CardTitle>Cola de Reportes para Triaje</CardTitle>
        <CardDescription>
          Aprueba o rechaza las imágenes de los reportes para incluirlas en el dataset de análisis.
          Quedan {reports.length} reportes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {reports.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map(report => (
              <ImageTriageCard key={report.id} report={report} onDecision={onDecision} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-50 rounded-lg border border-dashed">
            <FileQuestion className="w-16 h-16 text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-700">No hay reportes pendientes</h3>
            <p className="text-slate-500 mt-2">
              Has procesado todos los reportes de la cola.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
