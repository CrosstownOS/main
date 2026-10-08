"use client"

import { useEffect, useRef } from "react"

/**
 * useReveal — tiny IntersectionObserver scroll reveal.
 *
 * Attach the returned ref to a section wrapper. The hook adds the `reveal`
 * class (hidden states live behind it, so no-JS still shows content) and
 * observes the element once: on first intersect it adds `is-visible` to the
 * wrapper, then stamps `is-visible` onto each `[data-reveal-item]` child with
 * a 60ms stagger between siblings. One-shot: once visible, stays visible.
 *
 * Motion: 400ms ease-out, 16px rise. The stamp (`[data-reveal-stamp]`) and
 * the signal line (`[data-reveal-line]`) are driven by the same `is-visible`
 * flip via CSS in app/globals.css.
 *
 * Respects prefers-reduced-motion: everything resolves to visible instantly.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T | null>(null)
  const ioRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || ioRef.current) return

    // Hidden states live behind .reveal so no-JS still shows content.
    el.classList.add("reveal")

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible")
      el
        .querySelectorAll<HTMLElement>("[data-reveal-item]")
        .forEach((item) => item.classList.add("is-visible"))
      return
    }

    const items = Array.from(
      el.querySelectorAll<HTMLElement>("[data-reveal-item]"),
    )

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue
          io.disconnect()
          ioRef.current = null
          el.classList.add("is-visible")
          // 60ms stagger between siblings, one-shot.
          items.forEach((item, i) => {
            window.setTimeout(() => item.classList.add("is-visible"), i * 60)
          })
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    )

    ioRef.current = io
    io.observe(el)

    return () => {
      io.disconnect()
      ioRef.current = null
    }
  })

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
