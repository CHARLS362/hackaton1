import { Card, CardContent } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  icon: LucideIcon
  color: "blue" | "purple" | "green" | "yellow"
}

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    iconBg: "bg-blue-500/20",
    iconText: "text-blue-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    iconBg: "bg-purple-500/20",
    iconText: "text-purple-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    iconBg: "bg-green-500/20",
    iconText: "text-green-600",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    iconBg: "bg-yellow-500/20",
    iconText: "text-yellow-600",
  },
}

export function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
  const classes = colorClasses[color]

  return (
    <Card className={cn("overflow-hidden border-slate-200 transition-all hover:shadow-lg hover:-translate-y-1", classes.bg)}>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={cn("p-3 rounded-lg", classes.iconBg)}>
          <Icon className={cn("w-7 h-7", classes.iconText)} />
        </div>
        <div>
          <p className="text-2xl font-bold text-slate-800">{value}</p>
          <p className="text-sm text-slate-500">{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}