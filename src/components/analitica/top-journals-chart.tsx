import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const journals = [
  { name: "Revista de Biología Tropical", count: 45, color: "bg-blue-500" },
  { name: "Water Research", count: 32, color: "bg-purple-500" },
  { name: "Environmental Pollution", count: 28, color: "bg-green-500" },
  { name: "Science of The Total Environment", count: 21, color: "bg-yellow-500" },
]

export function TopJournalsChart() {
  return (
    <Card className="bg-slate-50/50 border-slate-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          <CardTitle className="text-slate-800">Revistas más importantes</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
         <div className="space-y-4">
                {journals.map(journal => (
                    <div key={journal.name} className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                             <div className={`w-2.5 h-2.5 rounded-full ${journal.color}`} />
                             <p className="text-sm font-medium text-slate-700">{journal.name}</p>
                        </div>
                        <Badge variant="secondary" className="bg-slate-200 text-slate-600">{journal.count}</Badge>
                    </div>
                ))}
            </div>
      </CardContent>
    </Card>
  )
}
