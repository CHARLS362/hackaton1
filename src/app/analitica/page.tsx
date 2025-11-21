import { StatCard } from '@/components/analitica/stat-card';
import {
  Book,
  Users,
  FileText,
  Building,
  BarChart,
} from 'lucide-react';
import { TopJournalsChart } from '@/components/analitica/top-journals-chart';
import { TopInstitutionsChart } from '@/components/analitica/top-institutions-chart';
import { MethodologiesChart } from '@/components/analitica/methodologies-chart';
import { KeywordsCloud } from '@/components/analitica/keywords-cloud';
import { PublicationsChart } from '@/components/analitica/publications-chart';
import { TopAuthorsChart } from '@/components/analitica/top-authors-chart';

export default function AnaliticaPage() {
  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <BarChart className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-slate-800">
              Análisis de Investigación
            </h1>
          </div>
          <p className="mt-3 text-lg text-slate-600">
            Información avanzada y visualizaciones interactivas de la base de
            datos de investigación sobre el Lago Titicaca.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de Artículos"
            value="287"
            icon={Book}
            color="blue"
          />
          <StatCard
            title="Autores Únicos"
            value="950"
            icon={Users}
            color="purple"
          />
          <StatCard
            title="Revistas Indexadas"
            value="85"
            icon={FileText}
            color="green"
          />
          <StatCard
            title="Instituciones"
            value="120"
            icon={Building}
            color="yellow"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <PublicationsChart />
            <TopAuthorsChart />
            <TopJournalsChart />
            <TopInstitutionsChart />
            <MethodologiesChart />
            <KeywordsCloud />
        </div>
      </div>
    </div>
  );
}
