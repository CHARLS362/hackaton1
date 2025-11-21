"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { FileText } from "lucide-react"

const data = [
  { name: "Water Research", value: 25.4 },
  { name: "Environmental Pollution", value: 22.1 },
  { name: "Science of The Total Environment", value: 18.5 },
  { name: "Journal of Hydrology", value: 15.2 },
  { name: "Revista de Biología Tropical", value: 18.8 },
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

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + (outerRadius + 30) * Math.cos(-midAngle * RADIAN);
  const y = cy + (outerRadius + 30) * Math.sin(-midAngle * RADIAN);
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={COLORS[index % COLORS.length]} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={COLORS[index % COLORS.length]} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#94a3b8" fontSize={12}>
        {`${name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

const CustomizedLegend = (props: any) => {
  const { cx, cy } = props;
  const total = data.reduce((acc, entry) => acc + entry.value, 0);

  return (
    <>
      <text x={cx} y={cy - 10} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="16" fontWeight="bold">
        Top 5 Revistas
      </text>
      <text x={cx} y={cy + 15} textAnchor="middle" dominantBaseline="central" fill="#A7F3D0" fontSize="24" fontWeight="bold">
        {`${total.toFixed(0)}%`}
      </text>
    </>
  );
}


export function TopJournalsChart() {
  return (
    <Card className="bg-slate-900 border-slate-700 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-green-400" />
          <CardTitle className="text-slate-200">Revistas de Mayor Impacto</CardTitle>
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
                        label={renderCustomizedLabel}
                        outerRadius={100}
                        innerRadius={70}
                        fill="#8884d8"
                        dataKey="value"
                        stroke="hsl(var(--slate-900))"
                        strokeWidth={4}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                         <Legend content={<CustomizedLegend />} verticalAlign="middle" />
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                </PieChart>
            </ResponsiveContainer>
         </div>
      </CardContent>
    </Card>
  )
}
