"use client"

import { ResponsiveContainer, Treemap, Tooltip } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Building } from "lucide-react"

const data = [
    { name: 'NASA Ames Research Center', size: 40, fill: '#f472b6' },
    { name: 'University of Florida', size: 25, fill: '#60a5fa' },
    { name: 'Oregon State Univ...', size: 15, fill: '#fbbf24' },
    { name: 'Weill Cornell Med...', size: 15, fill: '#a3e635' },
    { name: 'Arizona State Uni...', size: 15, fill: '#4ade80' },
    { name: 'Jet Pro...', size: 10, fill: '#86efac' },
    { name: 'Loma Li...', size: 10, fill: '#bbf7d0' },
    { name: 'Jet Propulsi...', size: 10, fill: '#93c5fd' },
    { name: 'NASA Johns...', size: 10, fill: '#e9d5ff' },
    { name: 'Te...', size: 8, fill: '#a5b4fc' },
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item = payload[0].payload;
      return (
        <div className="bg-slate-800 p-3 border border-slate-700 rounded-lg shadow-lg text-white">
          <p className="font-bold">{item.name}</p>
          <p className="text-sm">Publicaciones: {item.size}</p>
        </div>
      );
    }
  
    return null;
};
  
  
export function TopInstitutionsChart() {
    return (
      <Card className="bg-slate-900 border-slate-700 text-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Building className="w-5 h-5 text-amber-400" />
            <CardTitle className="text-slate-200">Instituciones de élite</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
            <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                        data={data}
                        dataKey="size"
                        ratio={4/3}
                        stroke="#1e293b"
                        content={<CustomizedContent />}
                    >
                        <Tooltip content={<CustomTooltip />} />
                    </Treemap>
                </ResponsiveContainer>
            </div>
        </CardContent>
      </Card>
    )
}

const CustomizedContent = (props: any) => {
    const { root, depth, x, y, width, height, index, name, fill } = props;
  
    if (width < 1 || height < 1) {
        return null;
    }

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          style={{
            fill: fill,
            stroke: '#1e293b',
            strokeWidth: 2,
            
          }}
        />
        <foreignObject x={x + 4} y={y + 4} width={width - 8} height={height - 8}>
            <div className="w-full h-full text-white text-xs font-medium flex items-center justify-center text-center p-1">
                {name}
            </div>
        </foreignObject>
      </g>
    );
};
