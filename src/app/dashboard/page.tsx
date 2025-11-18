import { TrendAnalysisCard } from "@/components/app/trend-analysis-card";
import { ProjectsDataTable } from "@/components/app/projects-data-table";
import { AlertsPanel } from "@/components/app/alerts-panel";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Principal</h1>
        <p className="text-muted-foreground">
          Vista general del estado del sistema y datos recientes.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <TrendAnalysisCard />
        </div>
        <div className="lg:col-span-3">
          <AlertsPanel />
        </div>
      </div>
      <div>
        <ProjectsDataTable />
      </div>
    </div>
  );
}
