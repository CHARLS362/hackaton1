"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
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

const renderLegend = (props: any) => {
  const { payload } = props;
  
  if (!payload) {
    return null;
  }

  return (
    <ul className="space-y-2 text-sm text-slate-300">
      {
        payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center gap-2">
            <span className="w-3 h-3" style={{backgroundColor: entry.color}}></span>
            {entry.value}
          </li>
        ))
      }
    </ul>
  );
}


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
         <div className="h-[300px] grid grid-cols-2 items-center gap-4">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        innerRadius={60}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="hsl(var(--background))"
                        strokeWidth={4}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
            <Legend content={renderLegend} layout="vertical" verticalAlign="middle" align="right" />
         </div>
      </CardContent>
    </Card>
  )
}
