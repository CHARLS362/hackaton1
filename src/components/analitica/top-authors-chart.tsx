"use client"

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Users } from "lucide-react"

const authorData = [
  { name: "K. Venkateswaran", publications: 52 },
  { name: "Christopher E. Mason", publications: 41 },
  { name: "Sylvain V. Costes", publications: 38 },
  { name: "Nitin K. Singh", publications: 35 },
  { name: "Afshin Beheshti", publications: 28 },
  { name: "Anna-Lisa Paul", publications: 26 },
  { name: "Nathaniel J. Szewczyk", publications: 24 },
  { name: "Fathi Karouia", publications: 23 },
  { name: "Robert J. Ferl", publications: 22 },
  { name: "Michael J. Pecaut", publications: 21 },
].reverse();

const PURPLE_COLORS = ["#c084fc", "#a855f7", "#9333ea", "#7e22ce", "#6b21a8", "#5b21b6"];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-2 border border-slate-700 rounded-lg shadow-lg">
          <p className="font-bold text-white">{`${label}`}</p>
          <p className="text-sm text-purple-400">{`Publicaciones: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export function TopAuthorsChart() {
  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-purple-400" />
          <CardTitle className="text-slate-200">Autores más destacados</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={authorData}
              layout="vertical"
              margin={{ top: 5, right: 20, left: 70, bottom: 5 }}
            >
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="name"
                stroke="#94a3b8"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={120}
              />
              <Tooltip cursor={{ fill: 'rgba(255,255,255,0.05)' }} content={<CustomTooltip />} />
              <Bar dataKey="publications" radius={[0, 4, 4, 0]}>
                {authorData.map((entry, index) => {
                  const colorIndex = Math.floor((index / authorData.length) * PURPLE_COLORS.length);
                  return <Cell key={`cell-${index}`} fill={PURPLE_COLORS[colorIndex]} />
                })}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
