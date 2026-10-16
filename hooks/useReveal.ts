"use client"

import { useEffect, useRef } from "react"

/**
 * useReveal — tiny IntersectionObserver scroll reveal.
 *
 * Attach the returned ref to a section wrapper. The hook adds the `reveal`
 * class (hidden states live behind it, so no-JS still shows content) and
 * observes two things:
 *
 *   - The wrapper itself, at threshold 0: as soon as any part of it is on
 *     screen it gets `is-visible`, which fades the wrapper in and drives
 *     the stamp (`[data-reveal-stamp]`) and the signal line
 *     (`[data-reveal-line]`) via CSS in app/globals.css.
 *   - Each `[data-reveal-item]` child INDIVIDUALLY, at threshold 0.12 of
 *     the item itself: an item gets `is-visible` when it scrolls into
 *     view, with a 60ms stagger between items revealed in the same batch.
 *     One-shot: once visible, stays visible.
 *
 * Items are observed individually because a wrapper-level threshold
 * breaks on tall containers. The Trail Log shipped list stands thousands
 * of pixels tall, so a phone viewport can never show 12% of the wrapper
 * at once; the old single-observer reveal never fired there and every
 * entry stayed at opacity 0. An item's own 12% is always reachable.
 *
 * Motion: 400ms ease-out, 16px rise.
 *
 * Respects prefers-reduced-motion: everything resolves to visible
 * instantly. If IntersectionObserver is unavailable, everything resolves
 * to visible as well.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Hidden states live behind .reveal so no-JS still shows content.
    el.classList.add("reveal")

    const items = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reveal-item]"),
    )

    const showAll = () => {
      el.classList.add("is-visible")
      items.forEach((item) => item.classList.add("is-visible"))
    }

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      typeof IntersectionObserver === "undefined"
    ) {
      showAll()
      return
    }

    const timers: number[] = []

    // The wrapper: any pixel on screen flips it visible. Stamps, signal
    // lines, and the wrapper's own fade hang off this class.
    const wrapperIO = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          el.classList.add("is-visible")
          wrapperIO.disconnect()
        }
      },
      { threshold: 0 },
    )
    wrapperIO.observe(el)

    // Each item on its own: it reveals when IT scrolls into view, no
    // matter how tall the container around it gets. Items revealed in
    // the same batch keep the 60ms cascade, in document order.
    const itemIO = new IntersectionObserver(
      (entries) => {
        const batch = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target as HTMLElement)
          .sort((a, b) => items.indexOf(a) - items.indexOf(b))
        batch.forEach((item, i) => {
          itemIO.unobserve(item)
          timers.push(
            window.setTimeout(() => item.classList.add("is-visible"), i * 60),
          )
        })
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )
    items.forEach((item) => itemIO.observe(item))

    return () => {
      wrapperIO.disconnect()
      itemIO.disconnect()
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [])

  return ref
}

/**
 * useCountUp — tick a number up over `duration` ms when it scrolls into view.
 * One-shot. Text content only, no layout animation. The element's initial
 * textContent should already read the final formatted value (no-JS safe).
 */
export function useCountUp(target: number, duration = 600) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const format = (n: number) => Math.round(n).toLocaleString("en-US")

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.textContent = format(target)
      return
    }

    let raf = 0
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.disconnect()
          const start = performance.now()
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration)
            const eased = 1 - Math.pow(1 - t, 3)
            el.textContent = format(target * eased)
            if (t < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 },
    )

    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [target, duration])

  return ref
}
