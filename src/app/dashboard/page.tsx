'use client';

import { ReportCard } from '@/components/dashboard/report-card';
import { reports, type Report } from '@/data/reports';
import { Bell } from 'lucide-react';

export default function DashboardPage() {
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
            Visualiza y gestiona los incidentes ambientales reportados por la comunidad.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
}
