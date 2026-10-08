"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"

/**
 * ScrollExperience (simplified) — page fades, nothing else.
 *
 * The scroll-jacking was too much. All that's left:
 * - First load: body fades in once via CSS.
 * - Route changes: soft re-fade.
 * - Anchor links: native browser behavior + the site's CSS
 *   `scroll-behavior: smooth`. No JS scroll animation, no flash, no rAF
 *   scroll loops, no scroll listeners.
 * - prefers-reduced-motion: no fade, content just appears.
 * - No-JS: content renders normally (the fade class is JS-added).
 */

const FADE_CLASS = "page-fade-in"

function retriggerFade() {
  const html = document.documentElement
  html.classList.remove(FADE_CLASS)
  // Force reflow so re-adding restarts the CSS animation.
  void html.offsetWidth
  html.classList.add(FADE_CLASS)
}

export default function ScrollExperience() {
  const pathname = usePathname()
  const firstRouteRef = useRef(true)

  // First mount: fade in after first paint.
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      document.documentElement.classList.add(FADE_CLASS)
    })
    return () => {
      cancelAnimationFrame(raf)
      document.documentElement.classList.remove(FADE_CLASS)
    }
  }, [])

  // Client-side route changes: soft re-fade.
  useEffect(() => {
    if (firstRouteRef.current) {
      firstRouteRef.current = false
      return
    }
    retriggerFade()
  }, [pathname])

  return null
}
