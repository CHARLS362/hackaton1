import { Droplets } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 text-white">
        <Droplets size={20} />
      </div>
      <span className="text-lg font-bold text-foreground">SIGA-Titicaca</span>
    </Link>
  );
}
