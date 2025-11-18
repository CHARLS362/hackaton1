"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText } from "lucide-react"

const data = [
  { name: "npj Microgravity", value: 29.45 },
  { name: "International Journal of Molecular Sciences", value: 20.55 },
  { name: "Scientific Reports", value: 17.81 },
  { name: "Life", value: 16.44 },
  { name: "Frontiers in Plant Science", value: 15.75 },
]

const COLORS = ["#10B981", "#34D399", "#6EE7B7", "#A7F3D0", "#D1FAE5"].reverse();

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-2 border border-slate-700 rounded-lg shadow-lg">
          <p className="text-sm text-white">{`${payload[0].name} : ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
};

export function TopJournalsChart() {
  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-400" />
          <CardTitle className="text-slate-200">Revistas más importantes</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
         <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={120}
                        innerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="hsl(var(--slate-900))"
                        strokeWidth={4}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
         </div>
      </CardContent>
    </Card>
  )
}
