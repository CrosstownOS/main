"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

/**
 * SignalLine — standalone royal signal line for pages without the useReveal wrapper.
 * A 2px royal (#3a86f2) rule that draws via scaleX when scrolled into view.
 * JS-gated: .signal-line-armed is added on mount, so no-JS never hides the line.
 * Respects prefers-reduced-motion (renders statically, no draw).
 */
export default function SignalLine({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.classList.add("signal-line-armed")
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible")
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.classList.add("is-visible")
          io.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <span
      ref={ref}
      aria-hidden="true"
      data-signal-line
      className={cn("mb-4", className)}
    />
  )
}
