"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { date: "Ene", pH: 8.2, turbidez: 4.5 },
  { date: "Feb", pH: 8.1, turbidez: 4.8 },
  { date: "Mar", pH: 8.3, turbidez: 5.1 },
  { date: "Abr", pH: 8.5, turbidez: 5.5 },
  { date: "May", pH: 8.4, turbidez: 5.2 },
  { date: "Jun", pH: 8.6, turbidez: 6.0 },
  { date: "Jul", pH: 8.3, turbidez: 5.7 },
];

export function TrendAnalysisCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle>Evolución de Calidad</CardTitle>
            <CardDescription>Análisis histórico de parámetros clave.</CardDescription>
          </div>
          <Select defaultValue="ph">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Seleccionar parámetro" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ph">pH</SelectItem>
              <SelectItem value="turbidez">Turbidez</SelectItem>
              <SelectItem value="oxigeno">Oxígeno Disuelto</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Tabs defaultValue="30d" className="mt-4">
          <TabsList>
            <TabsTrigger value="24h">24h</TabsTrigger>
            <TabsTrigger value="7d">7d</TabsTrigger>
            <TabsTrigger value="30d">30d</TabsTrigger>
            <TabsTrigger value="1a">1A</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="date" tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis tickLine={false} axisLine={false} stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "var(--radius)",
                }}
              />
              <ReferenceLine y={8.5} label={{ value: "Límite", position: "insideTopRight", fill: "hsl(var(--destructive))", fontSize: 10 }} stroke="hsl(var(--destructive))" strokeDasharray="3 3" />
              <Area type="monotone" dataKey="pH" stroke="hsl(var(--primary))" fill="url(#colorUv)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
