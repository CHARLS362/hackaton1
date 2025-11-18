import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Sparkles } from "lucide-react"
  import { Badge } from "@/components/ui/badge"
  
  const keywords = [
    { text: "microgravedad", color: "bg-sky-500/80 hover:bg-sky-500" },
    { text: "vuelos espaciales", color: "bg-purple-500/80 hover:bg-purple-500" },
    { text: "Arabidopsis", color: "bg-green-500/80 hover:bg-green-500" },
    { text: "Estación Espacial Internacional", color: "bg-orange-500/80 hover:bg-orange-500" },
    { text: "vuelo espacial", color: "bg-yellow-500/80 hover:bg-yellow-500" },
    { text: "transcriptómica", color: "bg-cyan-500/80 hover:bg-cyan-500" },
    { text: "Arabidopsis thaliana", color: "bg-pink-500/80 hover:bg-pink-500" },
    { text: "proteómica", color: "bg-rose-500/80 hover:bg-rose-500" },
    { text: "Microgravedad", color: "bg-amber-500/80 hover:bg-amber-500" },
    { text: "expresión génica", color: "bg-teal-500/80 hover:bg-teal-500" },
    { text: "descarga de las extremidades posteriores", color: "bg-indigo-500/80 hover:bg-indigo-500" },
    { text: "radiación espacial", color: "bg-lime-500/80 hover:bg-lime-500" },
    { text: "estrés oxidativo", color: "bg-red-500/80 hover:bg-red-500" },
    { text: "gravitropismo", color: "bg-orange-400/80 hover:bg-orange-400" },
    { text: "biología espacial", color: "bg-sky-400/80 hover:bg-sky-400" },
    { text: "transcriptoma", color: "bg-fuchsia-500/80 hover:bg-fuchsia-500" },
    { text: "EEI", color: "bg-emerald-500/80 hover:bg-emerald-500" },
    { text: "C. elegans", color: "bg-yellow-400/80 hover:bg-yellow-400" },
    { text: "especies reactivas de oxígeno", color: "bg-rose-400/80 hover:bg-rose-400" },
  ]
  
  export function KeywordsCloud() {
    return (
      <Card className="bg-slate-900 border-slate-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-fuchsia-400" />
            <CardTitle className="text-slate-200">Palabras clave principales</CardTitle>
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
  