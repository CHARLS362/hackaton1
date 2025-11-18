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

const COLORS = [
  "#8884d8", "#83a6ed", "#8dd1e1", "#82ca9d", "#a4de6c", 
  "#d0ed57", "#ffc658", "#ff9a3e", "#ff7300", "#bf5f00"
].reverse();

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-bold text-slate-700">{`${label}`}</p>
          <p className="text-sm text-primary">{`Publicaciones: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

export function TopAuthorsChart() {
  return (
    <Card className="bg-slate-50/50 border-slate-200">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          <CardTitle className="text-slate-800">Autores más destacados</CardTitle>
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
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={120}
              />
              <Tooltip cursor={{ fill: 'hsl(var(--accent))' }} content={<CustomTooltip />} />
              <Bar dataKey="publications" radius={[0, 4, 4, 0]}>
                {authorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`hsl(var(--primary), ${1 - (index/authorData.length) * 0.7})`} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}