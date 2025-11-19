"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface GooeyNavProps {
  links: { href: string; label: string }[];
}

export function GooeyNav({ links }: GooeyNavProps) {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <nav
      onMouseLeave={() => setHovered(null)}
      className="relative flex items-center justify-center"
    >
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            onMouseEnter={() => setHovered(link.href)}
            className={cn(
              "relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "text-white"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            {link.label}
          </Link>
        );
      })}
      {/* The background bubble */}
      <motion.div
        className="absolute z-0 h-10 rounded-full bg-primary"
        layoutId="gooey-nav-bg"
        initial={{
          opacity: 0,
          x: 0,
          width: 0,
        }}
        animate={{
          opacity: 1,
          x: calculateX(hovered, pathname, links),
          width: calculateWidth(hovered, pathname, links),
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
        style={{
          // This creates the "gooey" effect
          filter: `url('data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg"><defs><filter id="gooey"><feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" /><feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7" result="goo" /><feBlend in="SourceGraphic" in2="goo" /></filter></defs></svg>#gooey')`,
        }}
      />
    </nav>
  );
}

// Helper functions to calculate the position and width of the bubble
// This is a simplified example; a real implementation would use element refs
const calculateX = (
  hovered: string | null,
  active: string,
  links: { href: string }[]
) => {
  const activeHref = hovered || active;
  const index = links.findIndex((l) => l.href === activeHref);
  if (index === -1) return 0;
  // This is a rough estimation, a real implementation should measure the elements
  return index * 88 + 10 * index; 
};

const calculateWidth = (
  hovered: string | null,
  active: string,
  links: { href: string }[]
) => {
  const activeHref = hovered || active;
  if (!activeHref) return 0;
  // This is a rough estimation
  return 88;
};
