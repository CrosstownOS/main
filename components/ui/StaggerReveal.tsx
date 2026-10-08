"use client"

import type { ReactNode } from "react"
import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"

/**
 * StaggerReveal — client wrapper that brings the useReveal scroll-reveal to
 * grids and lists inside server components. Attach to any grid/list wrapper;
 * children carrying `data-reveal-item` cascade in with the 60ms stagger when
 * the wrapper scrolls into view (one-shot). Zero new CSS: hidden states and
 * the 400ms ease-out motion live behind the `.reveal` class in
 * app/globals.css, and the hook adds that class on mount so no-JS still
 * shows content. Respects prefers-reduced-motion.
 */
export default function StaggerReveal({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}
