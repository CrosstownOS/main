"use client"

import { useEffect } from "react"

/**
 * ScrollExperience — the anchor-CTA landing experience.
 *
 * Every in-page anchor link (href="#...") gets:
 *  1. An 800ms ease-in-out smooth scroll to its target (custom rAF, so the
 *     timing is exact on desktop and mobile — CSS smooth-scroll durations
 *     are browser-controlled and can't be set).
 *  2. A royal glow pulse on the target section that fades over 1.5s.
 *  3. The signal-line draw across the target heading (the 2px royal rule
 *     wipes in, holds, then fades).
 *
 * Also handles: initial page load with a #hash, and back/forward hash
 * changes (browser positions natively; we add the flash moment).
 *
 * Accessibility: prefers-reduced-motion skips the animation and the flash
 * entirely — the jump is instant and honest.
 *
 * A user grabbing the scroll mid-animation (wheel / touch) cancels it
 * immediately, so it never fights the user.
 */

const SCROLL_DURATION_MS = 800
const FLASH_CLASS = "scroll-flash"
const HEADING_FLASH_CLASS = "scroll-flash-heading"

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/** Pixels of scroll-margin-top on the target (accounts for the fixed header). */
function targetScrollMarginTop(el: HTMLElement): number {
  const raw = window.getComputedStyle(el).scrollMarginTop
  const px = parseFloat(raw)
  return Number.isFinite(px) ? px : 0
}

/** 800ms ease-in-out scroll. Cancellable by user input. Resolves when done. */
function animatedScrollTo(targetY: number): Promise<void> {
  return new Promise((resolve) => {
    const startY = window.scrollY
    const distance = targetY - startY
    if (Math.abs(distance) < 2) {
      resolve()
      return
    }
    // Neutralize the CSS smooth baseline so rAF frames land exactly.
    const html = document.documentElement
    const prev = html.style.scrollBehavior
    html.style.scrollBehavior = "auto"

    let raf = 0
    let cancelled = false
    const cancel = () => {
      cancelled = true
      cancelAnimationFrame(raf)
      html.style.scrollBehavior = prev
      window.removeEventListener("wheel", cancel, { passive: true } as never)
      window.removeEventListener("touchstart", cancel, { passive: true } as never)
      resolve()
    }
    window.addEventListener("wheel", cancel, { passive: true })
    window.addEventListener("touchstart", cancel, { passive: true })

    const start = performance.now()
    const step = (now: number) => {
      if (cancelled) return
      const t = Math.min(1, (now - start) / SCROLL_DURATION_MS)
      window.scrollTo(0, startY + distance * easeInOutCubic(t))
      if (t < 1) {
        raf = requestAnimationFrame(step)
      } else {
        window.removeEventListener("wheel", cancel)
        window.removeEventListener("touchstart", cancel)
        html.style.scrollBehavior = prev
        resolve()
      }
    }
    raf = requestAnimationFrame(step)
  })
}

/** Royal glow pulse on the section + signal-line draw on its heading. */
function flashTarget(el: HTMLElement) {
  if (prefersReducedMotion()) return
  // Skip the flash on the skip-link target — glowing the whole page is noise.
  if (el.id === "main") return

  el.classList.remove(FLASH_CLASS)
  void el.offsetWidth // restart the animation if it was already flashing
  el.classList.add(FLASH_CLASS)
  const onEnd = (e: AnimationEvent) => {
    if (e.target !== el) return
    el.classList.remove(FLASH_CLASS)
    el.removeEventListener("animationend", onEnd as EventListener)
  }
  el.addEventListener("animationend", onEnd as EventListener)

  const heading: HTMLElement | null =
    el.matches("h1, h2, h3") ? el : el.querySelector("h1, h2, h3")
  if (heading && heading !== el) {
    heading.classList.remove(HEADING_FLASH_CLASS)
    void heading.offsetWidth
    heading.classList.add(HEADING_FLASH_CLASS)
    const onHeadingEnd = (e: AnimationEvent) => {
      if (e.target !== heading) return
      heading.classList.remove(HEADING_FLASH_CLASS)
      heading.removeEventListener("animationend", onHeadingEnd as EventListener)
    }
    heading.addEventListener("animationend", onHeadingEnd as EventListener)
  }
}

function scrollToHashTarget(id: string): boolean {
  const target = document.getElementById(id)
  if (!target) return false
  if (prefersReducedMotion()) {
    target.scrollIntoView({ behavior: "auto", block: "start" })
    return true
  }
  const targetY =
    target.getBoundingClientRect().top + window.scrollY - targetScrollMarginTop(target)
  void animatedScrollTo(targetY).then(() => flashTarget(target))
  return true
}

export default function ScrollExperience() {
  useEffect(() => {
    // Clicks on in-page anchors. Capture phase so we run before Next.js
    // Link handlers. preventDefault() stops the router from double-scrolling;
    // we deliberately do NOT stopPropagation so anchor onClick handlers
    // (e.g. mobile menu close) still fire.
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null
      if (!anchor) return
      const rawHref = anchor.getAttribute("href")
      if (!rawHref || rawHref === "#") return
      let url: URL
      try {
        url = new URL(anchor.href)
      } catch {
        return
      }
      if (url.pathname !== window.location.pathname) return
      const id = decodeURIComponent(rawHref.slice(1))
      if (!document.getElementById(id)) return
      e.preventDefault()
      // NOTE: do NOT stopPropagation here. The anchor's own onClick handlers
      // (e.g. mobile menu close) must still fire. preventDefault() alone is
      // sufficient to stop Next.js router interference (Link checks
      // e.defaultPrevented before navigating).
      window.history.replaceState(null, "", rawHref)
      scrollToHashTarget(id)
    }
    document.addEventListener("click", onClick, true)

    // Back/forward through hashes: browser positions natively, we add the moment.
    const onHashChange = () => {
      const id = decodeURIComponent(window.location.hash.slice(1))
      if (!id) return
      const target = document.getElementById(id)
      if (target) window.setTimeout(() => flashTarget(target), 60)
    }
    window.addEventListener("hashchange", onHashChange)

    // Direct load with a hash: let the browser land, then flash.
    if (window.location.hash.length > 1) {
      const id = decodeURIComponent(window.location.hash.slice(1))
      const target = document.getElementById(id)
      if (target) window.setTimeout(() => flashTarget(target), 350)
    }

    return () => {
      document.removeEventListener("click", onClick, true)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [])

  return null
}
