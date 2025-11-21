'use client';

import { useState } from 'react';
import { ReportQueue } from '@/components/mesa/report-queue';
import { IncidentHeatmap } from '@/components/mesa/incident-heatmap';
import { reports, Report } from '@/data/reports';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, ListTodo } from 'lucide-react';

export default function MesaPage() {
  const [reportQueue, setReportQueue] = useState<Report[]>(reports);
  const [approvedReports, setApprovedReports] = useState<Report[]>([]);

  const handleDecision = (reportId: string, decision: 'approve' | 'reject') => {
    const report = reportQueue.find(r => r.id === reportId);
    if (!report) return;

    if (decision === 'approve') {
      setApprovedReports(prev => [...prev, report]);
    }
    
    setReportQueue(prev => prev.filter(r => r.id !== reportId));
  };
  
  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-headline text-slate-800">
            Mesa de Trabajo de Datos
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            Procesa y analiza los datos de los reportes ciudadanos para generar inteligencia ambiental.
          </p>
        </header>

        <Tabs defaultValue="triage" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="triage">
              <ListTodo className="mr-2" />
              Triaje de Datos
            </TabsTrigger>
            <TabsTrigger value="heatmap">
              <Layers className="mr-2" />
              Mapa de Incidencia
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="triage" className="mt-8">
            <ReportQueue reports={reportQueue} onDecision={handleDecision} />
          </TabsContent>

          <TabsContent value="heatmap" className="mt-8">
            <IncidentHeatmap reports={reports} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
