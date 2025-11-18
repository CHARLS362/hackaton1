import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Building } from "lucide-react"
  import { Badge } from "@/components/ui/badge"
  
  const institutions = [
    { name: "Universidad Nacional del Altiplano", country: "PE", count: 128, color: "bg-blue-500" },
    { name: "Universidad Mayor de San Andrés", country: "BO", count: 95, color: "bg-purple-500" },
    { name: "Institut de Recherche pour le Développement", country: "FR", count: 72, color: "bg-green-500" },
    { name: "Autoridad Binacional del Lago Titicaca", country: "INT", count: 55, color: "bg-yellow-500" },
  ]
  
  export function TopInstitutionsChart() {
    return (
      <Card className="bg-slate-50/50 border-slate-200">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            <CardTitle className="text-slate-800">Instituciones de élite</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {institutions.map(inst => (
                    <div key={inst.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                             <div className={`w-2.5 h-2.5 rounded-full ${inst.color}`} />
                             <p className="text-sm font-medium text-slate-700">{inst.name}</p>
                        </div>
                        <Badge variant="secondary" className="bg-slate-200 text-slate-600">{inst.count}</Badge>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>
    )
  }
  