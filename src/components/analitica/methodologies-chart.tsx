"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FlaskConical } from "lucide-react"

const data = [
    { name: "Spaceflight", value: 120 },
    { name: "Animal", value: 98 },
    { name: "Combined", value: 85 },
    { name: "Systematic", value: 70 },
    { name: "Polyphasic", value: 40 },
    { name: "Expert", value: 35 },
    { name: "Rat", value: 30 },
    { name: "Two-sample", value: 25 },
    { name: "Integrated", value: 22 },
    { name: "Whole", value: 20 },
    { name: "Hindlimb", value: 18 },
    { name: "RNA-seq", value: 15 },
    { name: "hypothesis/review", value: 12 },
    { name: "Proteomic", value: 10 },
    { name: "Adult-only", value: 8 },
    { name: "Field", value: 6 },
    { name: "double-blinded", value: 4 },
].reverse();


const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-2 border border-slate-700 rounded-lg shadow-lg">
          <p className="font-bold text-white">{`${label}`}</p>
          <p className="text-sm text-amber-400">{`Publicaciones: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export function MethodologiesChart() {
  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-amber-400" />
          <CardTitle className="text-slate-200">Metodologías de investigación</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
            >
              <XAxis type="number" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94a3b8"
                fontSize={10}
                tickLine={false}
                axisLine={false}
                width={100}
              />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
              <Bar dataKey="value" fill="#facc15" radius={[0, 4, 4, 0]} barSize={10} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
