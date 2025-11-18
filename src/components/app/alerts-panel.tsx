import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ChevronRight, Droplet, Wind } from "lucide-react";
import { Badge } from "../ui/badge";

const alerts = [
  {
    id: 1,
    icon: AlertTriangle,
    title: "Alta Turbidez Detectada",
    location: "Sector Puno",
    time: "hace 5 minutos",
    level: "Alto",
    levelVariant: "destructive",
  },
  {
    id: 2,
    icon: Droplet,
    title: "Bajo Nivel de Oxígeno",
    location: "Bahía de Cohana",
    time: "hace 45 minutos",
    level: "Medio",
    levelVariant: "secondary",
  },
  {
    id: 3,
    icon: Wind,
    title: "Reporte de Olores Fuertes",
    location: "Desembocadura Río Coata",
    time: "hace 2 horas",
    level: "Bajo",
    levelVariant: "outline",
  },
];

export function AlertsPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Alertas Recientes</CardTitle>
        <CardDescription>
          Notificaciones críticas del sistema de monitoreo.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className="flex items-center gap-4 p-3 rounded-lg bg-background hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div
                className={`p-2 rounded-full ${
                  alert.level === "Alto"
                    ? "bg-destructive/10 text-destructive"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <alert.icon className="h-5 w-5" />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-between">
                  <p className="font-semibold">{alert.title}</p>
                  <Badge variant={alert.levelVariant as any}>{alert.level}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {alert.location} &bull; {alert.time}
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
