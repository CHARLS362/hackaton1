"use client"

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Calendar } from "lucide-react"

const chartData = [
    { year: "2015", publications: 12 },
    { year: "2016", publications: 18 },
    { year: "2017", publications: 25 },
    { year: "2018", publications: 22 },
    { year: "2019", publications: 30 },
    { year: "2020", publications: 28 },
    { year: "2021", publications: 35 },
    { year: "2022", publications: 45 },
    { year: "2023", publications: 58 },
    { year: "2024", publications: 14 },
]


export function PublicationsChart() {
  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            <CardTitle className="text-slate-200">Publicaciones a lo Largo del Tiempo</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorPublications" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.2)" />
              <XAxis dataKey="year" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
              <Tooltip
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: "hsl(var(--slate-900))",
                  borderColor: "hsl(var(--slate-700))",
                  borderRadius: 'var(--radius)',
                  color: 'hsl(var(--foreground))',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              />
              <Area
                type="monotone"
                dataKey="publications"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                fill="url(#colorPublications)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
