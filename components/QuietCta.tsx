"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "crosstown:quiet-cta-dismissed"

/**
 * QuietCta — slim acquisition-workspace bar that slides up after the visitor
 * scrolls past half a viewport. Mobile: full-width bottom bar. Desktop:
 * bottom-right chip. Dismissible; stays gone for the session via sessionStorage
 * (set only on explicit dismiss, so it never hides for users who never
 * dismissed it). Never renders on /workspace itself: the CTA links there, so
 * showing it on that page would be redundant. Mounted in app/layout.tsx as a
 * direct child of <body>, OUTSIDE app/template.tsx: the .page-enter transform
 * would otherwise break its position: fixed. Transform-only motion;
 * prefers-reduced-motion collapses the slide.
 */
export default function QuietCta() {
  const pathname = usePathname()
  const [pastHero, setPastHero] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (window.sessionStorage.getItem(STORAGE_KEY)) {
      setDismissed(true)
      return
    }

    let raf = 0
    const check = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        raf = 0
        // Pure scroll-position trigger: show after scrolling past half a viewport.
        // No hero dependency — works on every page.
        setPastHero(window.scrollY > window.innerHeight * 0.5)
      })
    }

    check()
    window.addEventListener("scroll", check, { passive: true })
    // Re-evaluate on resize: innerHeight can change (mobile chrome show/hide,
    // orientation change), which moves the half-viewport trigger point.
    window.addEventListener("resize", check)
    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Never render on the workspace page: the CTA links to /workspace, so it
  // would be redundant there.
  if (pathname === "/workspace" || pathname === "/workspace/") return null

  if (dismissed) return null

  const dismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "1")
    setDismissed(true)
  }

  return (
    <div
      aria-hidden={!pastHero}
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 transition-transform duration-200 ease-out",
        "md:inset-x-auto md:bottom-6 md:right-6",
        pastHero ? "translate-y-0" : "translate-y-[130%]",
      )}
    >
      <div className="flex items-center justify-between gap-4 border border-border bg-background/95 px-4 py-3 backdrop-blur">
        <Link
          href="/workspace"
          tabIndex={pastHero ? 0 : -1}
          className="btn-signal inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="font-serif text-xs text-[#4A90D9]">Acquisition Workspace</span> <span className="font-mono">see the plans</span>
          <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          tabIndex={pastHero ? 0 : -1}
          className="flex h-7 w-7 flex-none items-center justify-center text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
