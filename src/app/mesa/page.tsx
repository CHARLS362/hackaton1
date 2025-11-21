'use client';

import { useState, useEffect } from 'react';
import { ReportQueue } from '@/components/mesa/report-queue';
import { Report } from '@/data/reports';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layers, ListTodo, Loader2 } from 'lucide-react';
import IncidentMapLoader from '@/components/mesa/heatmap-loader';
import { cn } from '@/lib/utils';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function MesaPage() {
  const [pendingReports, setPendingReports] = useState<Report[]>([]);
  const [approvedReports, setApprovedReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('triage');

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [pendingRes, approvedRes] = await Promise.all([
        fetch('/api/reports?status=pending'),
        fetch('/api/reports?status=approved')
      ]);

      if (!pendingRes.ok || !approvedRes.ok) {
        throw new Error('Failed to fetch reports');
      }

      const pendingData = await pendingRes.json();
      const approvedData = await approvedRes.json();
      
      setPendingReports(pendingData);
      setApprovedReports(approvedData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleDecision = async (reportId: string, decision: 'approve' | 'reject') => {
    const originalPending = [...pendingReports];
    const reportToMove = pendingReports.find(r => r.id.toString() === reportId.toString());

    // Optimistic UI update
    setPendingReports(prev => prev.filter(r => r.id.toString() !== reportId.toString()));
    if (decision === 'approve' && reportToMove) {
      setApprovedReports(prev => [...prev, reportToMove]);
    }
    
    try {
      const response = await fetch(`/api/reports/${reportId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: decision === 'approve' ? 'approved' : 'rejected' }),
      });

      if (!response.ok) {
        throw new Error('Failed to update report status');
      }
      // No need to re-fetch, optimistic update is enough for the session
    } catch (error) {
      // Revert UI on failure
      setPendingReports(originalPending);
      if (decision === 'approve') {
        setApprovedReports(prev => prev.filter(r => r.id.toString() !== reportId.toString()));
      }
      alert('Error al actualizar el reporte. Inténtalo de nuevo.');
    }
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

        {loading && (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {!loading && !error && (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
                <TabsTrigger value="triage">
                  <ListTodo className="mr-2" />
                  Triaje de Datos ({pendingReports.length})
                </TabsTrigger>
                <TabsTrigger value="heatmap">
                  <Layers className="mr-2" />
                  Mapa de Incidencia ({approvedReports.length})
                </TabsTrigger>
              </TabsList>
              
              <div className={cn("mt-8", activeTab !== 'triage' && 'hidden')}>
                <ReportQueue reports={pendingReports} onDecision={handleDecision} />
              </div>

              <div className={cn("mt-8", activeTab !== 'heatmap' && 'hidden')}>
                <IncidentMapLoader reports={approvedReports} />
              </div>
            </Tabs>
        )}
      </div>
    </div>
  );
}
