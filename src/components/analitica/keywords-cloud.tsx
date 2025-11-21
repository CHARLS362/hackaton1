import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Sparkles } from "lucide-react"
  import { Badge } from "@/components/ui/badge"
  
  const keywords = [
    { text: "eutrofización", color: "bg-sky-500/80 hover:bg-sky-500" },
    { text: "contaminación del agua", color: "bg-purple-500/80 hover:bg-purple-500" },
    { text: "metales pesados", color: "bg-green-500/80 hover:bg-green-500" },
    { text: "calidad del agua", color: "bg-orange-500/80 hover:bg-orange-500" },
    { text: "sedimentos", color: "bg-yellow-500/80 hover:bg-yellow-500" },
    { text: "biorremediación", color: "bg-cyan-500/80 hover:bg-cyan-500" },
    { text: "Lago Titicaca", color: "bg-pink-500/80 hover:bg-pink-500" },
    { text: "microplásticos", color: "bg-rose-500/80 hover:bg-rose-500" },
    { text: "nutrientes", color: "bg-amber-500/80 hover:bg-amber-500" },
    { text: "Lemna sp.", color: "bg-teal-500/80 hover:bg-teal-500" },
    { text: "hidrodinámica", color: "bg-indigo-500/80 hover:bg-indigo-500" },
    { text: "río Katari", color: "bg-lime-500/80 hover:bg-lime-500" },
    { text: "totora", color: "bg-red-500/80 hover:bg-red-500" },
    { text: "sensores remotos", color: "bg-orange-400/80 hover:bg-orange-400" },
    { text: "clorofila-a", color: "bg-sky-400/80 hover:bg-sky-400" },
    { text: "Bahía de Puno", color: "bg-fuchsia-500/80 hover:bg-fuchsia-500" },
    { text: "bioacumulación", color: "bg-emerald-500/80 hover:bg-emerald-500" },
    { text: "mercurio", color: "bg-yellow-400/80 hover:bg-yellow-400" },
    { text: "aguas residuales", color: "bg-rose-400/80 hover:bg-rose-400" },
  ]
  
  export function KeywordsCloud() {
    return (
      <Card className="bg-slate-900 border-slate-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-fuchsia-400" />
            <CardTitle className="text-slate-200">Palabras Clave Principales</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
            <div className="flex flex-wrap gap-2">
                {keywords.map(keyword => (
                    <Badge
                        key={keyword.text}
                        className={`text-sm text-white border-0 transition-all cursor-pointer ${keyword.color}`}
                    >
                        {keyword.text}
                    </Badge>
                ))}
            </div>
        </CardContent>
      </Card>
    )
  }
  