import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { ArrowDown, ArrowUp, Thermometer, Waves, Wind } from "lucide-react";
import { BiSolidTachometer } from 'react-icons/bi';


const stats = [
  {
    icon: Thermometer,
    title: "Temperatura del Agua",
    value: "12.5°C",
    trend: "+0.2°C",
    trendDirection: "up",
  },
  {
    icon: Waves,
    title: "Nivel del Lago",
    value: "3809.8 m",
    trend: "-1 cm",
    trendDirection: "down",
  },
  {
    icon: BiSolidTachometer,
    title: "Turbidez",
    value: "5.2 NTU",
    trend: "+0.5 NTU",
    trendDirection: "up",
  },
  {
    icon: Wind,
    title: "Calidad del Aire",
    value: "25 AQI",
    trend: "Estable",
    trendDirection: "stable",
  },
];

const StatCard = ({ stat }: { stat: (typeof stats)[0] }) => {
    const TrendIcon = stat.trendDirection === 'up' ? ArrowUp : ArrowDown;
    const trendColor = stat.trendDirection === 'up' ? 'text-red-500' : 'text-green-500';

    return (
        <Card className="shadow-xl rounded-2xl border-border/50 backdrop-blur-lg bg-card/80 animate-fade-in-up">
            <CardContent className="p-6 flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                    <stat.icon className="h-8 w-8" />
                </div>
                <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                {stat.trendDirection !== 'stable' ? (
                    <div className={`flex items-center text-xs ${trendColor}`}>
                        <TrendIcon className="h-3 w-3 mr-1" />
                        <span>{stat.trend} vs ayer</span>
                    </div>
                ) : (
                    <p className="text-xs text-muted-foreground">{stat.trend}</p>
                )}
                </div>
            </CardContent>
        </Card>
    );
};


export function LiveStats() {
  return (
    <section className="bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative -mt-24 md:-mt-20 z-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} style={{ animationDelay: `${200 + index * 150}ms` }}>
                <StatCard stat={stat} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
