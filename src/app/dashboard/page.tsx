import { TrendAnalysisCard } from "@/components/app/trend-analysis-card";
import { ProjectsDataTable } from "@/components/app/projects-data-table";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
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
          {/* Another card could go here */}
        </div>
      </div>
      <div>
        <ProjectsDataTable />
      </div>
    </div>
  );
}
