"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "crosstown:quiet-cta-dismissed"

/**
 * QuietCta — slim acquisition-workspace bar that slides up after the visitor
 * scrolls past the hero. Mobile: full-width bottom bar. Desktop: bottom-right
 * chip. Dismissible; stays gone for the session via sessionStorage. Never
 * renders on load, only after the hero has scrolled out of view.
 * Transform-only motion; prefers-reduced-motion collapses the slide.
 */
export default function QuietCta() {
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
        const hero = document.getElementById("hero")
        // No hero on this page: stay hidden.
        if (!hero) return
        setPastHero(hero.getBoundingClientRect().bottom <= 0)
      })
    }

    check()
    window.addEventListener("scroll", check, { passive: true })
    return () => {
      window.removeEventListener("scroll", check)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  if (dismissed) return null

  const dismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "1")
    setDismissed(true)
  }

  return (
    <div
      aria-hidden={!pastHero}
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 transition-transform duration-200 ease-out",
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
          Acquisition Workspace, see the plans
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
