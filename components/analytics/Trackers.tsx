"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { track } from "@vercel/analytics"

/**
 * Conversion tracking primitives for the CrosstownOS marketing funnel.
 * All events flow through Vercel Analytics custom events.
 *
 * Funnel: workspace_view -> pricing_view -> apply_click -> deal_desk_submit -> deal_desk_success
 * Plus: quiet_cta_click, footer_subscribe, resource_download (existing), tool_* (existing)
 */

// Fires a custom event once when the page mounts. Drop inside a
// server-component page to mark a funnel entry point.
export function PageViewTracker({ event, data }: { event: string; data?: Record<string, string> }) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    track(event, data)
  }, [event])
  return null
}

// Fires once when scrolled into view. Renders an invisible sentinel div.
export function SectionViewTracker({
  event,
  data,
  className,
}: {
  event: string
  data?: Record<string, string>
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          track(event, data)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [event])
  return <div ref={ref} aria-hidden="true" className={className} />
}

// Anchor to #apply with click tracking. plan: "single-deal" | "annual".
export function TrackedApplyLink({
  plan,
  className,
  children,
}: {
  plan: string
  className?: string
  children: ReactNode
}) {
  return (
    <a href="#apply" className={className} onClick={() => track("apply_click", { plan })}>
      {children}
    </a>
  )
}

// Anchor to #plans with click tracking.
export function TrackedPlansLink({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <a href="#plans" className={className} onClick={() => track("plans_click")}>
      {children}
    </a>
  )
}
