import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "../ui/input";

const projects = [
  {
    name: "Campaña de Limpieza de Orillas",
    status: "En Curso",
    budget: "$5,000",
    responsible: "Ana Torres",
    progress: 65,
  },
  {
    name: "Instalación de Sensores IoT - Fase II",
    status: "Planificación",
    budget: "$25,000",
    responsible: "Carlos Vega",
    progress: 10,
  },
  {
    name: "Monitoreo de Afluentes - Q3",
    status: "Finalizado",
    budget: "$2,500",
    responsible: "Sofia Ramos",
    progress: 100,
  },
  {
    name: "Proyecto Educativo Escolar",
    status: "En Curso",
    budget: "$1,200",
    responsible: "Luis Soto",
    progress: 40,
  },
];

const statusVariant: { [key: string]: "default" | "secondary" | "outline" } = {
  "En Curso": "default",
  Planificación: "secondary",
  Finalizado: "outline",
};

export function ProjectsDataTable() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <CardTitle>Gestión de Proyectos</CardTitle>
                <CardDescription>
                Seguimiento de las iniciativas de conservación y limpieza.
                </CardDescription>
            </div>
            <div className="flex items-center gap-2">
                <Input placeholder="Buscar proyecto..." className="max-w-xs" />
                <Button>Nuevo Proyecto</Button>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre del Proyecto</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Responsable</TableHead>
              <TableHead className="text-right">Avance</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.name}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>
                  <Badge variant={statusVariant[project.status] || "default"}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>{project.responsible}</TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <span className="text-muted-foreground text-xs">{project.progress}%</span>
                        <Progress value={project.progress} className="w-[100px]" />
                    </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Editar</DropdownMenuItem>
                      <DropdownMenuItem>Ver Detalles</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Archivar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
