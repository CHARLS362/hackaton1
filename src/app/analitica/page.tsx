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
import { AudioPlayer } from '@/components/layout/audio-player';

export default function AnaliticaPage() {
  const pageDescription =
    'Bienvenido a la sección de Analítica. Aquí puedes explorar información avanzada y visualizaciones interactivas de la base de datos de investigación, incluyendo tendencias de publicación, autores destacados e instituciones de élite.';
  return (
    <div className="bg-white min-h-screen">
      <AudioPlayer text={pageDescription} />
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
            datos de investigación.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total de papeles"
            value="559"
            icon={Book}
            color="blue"
          />
          <StatCard
            title="Autores únicos"
            value="2,572"
            icon={Users}
            color="purple"
          />
          <StatCard
            title="Revistas"
            value="197"
            icon={FileText}
            color="green"
          />
          <StatCard
            title="Instituciones"
            value="748"
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
