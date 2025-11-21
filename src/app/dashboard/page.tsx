'use client';

import { useEffect, useState } from 'react';
import { ReportCard } from '@/components/dashboard/report-card';
import { type Report } from '@/data/reports'; // Re-using the type, but data will be fetched
import { Bell, Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        // Fetch only approved reports for the public dashboard
        const response = await fetch('/api/reports?status=approved');
        if (!response.ok) {
          throw new Error('No se pudieron cargar los reportes.');
        }
        const data = await response.json();
        setReports(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Bell className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-slate-800">
              Panel de Reportes Ciudadanos
            </h1>
          </div>
          <p className="mt-3 text-lg text-slate-600">
            Visualiza y gestiona los incidentes ambientales reportados y aprobados por la comunidad.
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

        {!loading && !error && reports.length === 0 && (
          <Alert>
            <AlertTitle>No hay reportes</AlertTitle>
            <AlertDescription>
              Actualmente no hay reportes aprobados para mostrar.
            </AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
}
