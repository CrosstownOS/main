"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

/**
 * BrandLoader — branded loading screen for CrosstownOS.
 *
 * Full-screen brand moment on first visit per session: logo, wordmark
 * (Playfair), signal-line draw, launch teaser (sans), launch date (mono),
 * and a cohort CTA. Fades out after 3s or on click. Skipped entirely
 * for prefers-reduced-motion.
 *
 * Zero-delay first paint: the loader markup is server-rendered, so it ships
 * in the initial HTML and is visible on the very first paint — it never pops
 * in late after hydration. A tiny synchronous script at the top of <body>
 * (see app/layout.tsx) adds `brand-loader-seen` to <html> before first paint
 * when this session already saw the loader or reduced motion is preferred,
 * and CSS hides the loader in that case — no flash on repeat visits. The
 * effect below mirrors that check so React removes the node with no visual
 * change. No-JS users never see it (noscript style in <body>).
 *
 * SSR-safe: server and first client render both output the loader (show
 * starts true), so hydration always matches. All browser APIs live inside
 * the effect. No module-level window ternaries — no TDZ risk.
 */
const SESSION_KEY = "brand-loader-seen"
const DISPLAY_MS = 3000
const FADE_MS = 350

export default function BrandLoader() {
  const [show, setShow] = useState(true)
  const [leaving, setLeaving] = useState(false)

  useEffect(() => {
    // Mirror the synchronous pre-paint script in layout.tsx: when this
    // session already saw the loader, or reduced motion is preferred, the
    // loader is already hidden by CSS — drop the node with no visual change.
    let reduced = false
    try {
      reduced =
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    } catch {
      reduced = false
    }
    let seen: string | null = null
    try {
      seen = window.sessionStorage.getItem(SESSION_KEY)
    } catch {
      seen = null
    }
    if (reduced || seen) {
      setShow(false)
      return
    }
    try {
      window.sessionStorage.setItem(SESSION_KEY, "1")
    } catch {
      /* storage unavailable (private mode) — still show once */
    }
    const t = window.setTimeout(() => setLeaving(true), DISPLAY_MS)
    return () => window.clearTimeout(t)
  }, [])

  useEffect(() => {
    if (!leaving) return
    const t = window.setTimeout(() => setShow(false), FADE_MS)
    return () => window.clearTimeout(t)
  }, [leaving])

  if (!show) return null

  const dismiss = () => setLeaving(true)

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Welcome to CrosstownOS"
      onClick={dismiss}
      className={`brand-loader-root fixed inset-0 z-[200] flex cursor-pointer items-center justify-center bg-[#0c0b09] transition-opacity duration-300 ${
        leaving ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex flex-col items-center px-6 text-center">
        <span className="relative h-24 w-24 overflow-hidden [clip-path:circle(50%)]">
          <Image
            src="/logo.jpg"
            alt="CrosstownOS logo"
            fill
            sizes="96px"
            className="object-cover"
            priority
          />
        </span>
        <p className="mt-6 font-serif text-5xl font-semibold tracking-tight text-white">
          CrosstownOS
        </p>
        <span aria-hidden="true" className="brand-loader-line mt-5" />
        <p className="mt-5 text-lg text-neutral-300">Acquisition Workspace</p>
        <p className="mt-3 font-mono text-xs uppercase tracking-[0.3em] text-[#3a86f2]">
          Launching November 2026
        </p>
        <a
          href="/#design-partner"
          onClick={(e) => {
            e.stopPropagation()
            dismiss()
          }}
          className="mt-8 inline-flex items-center rounded-full bg-primary-deep px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary"
        >
          Join the Q4 Cohort
        </a>
      </div>
    </div>
  )
}
