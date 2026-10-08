"use client"

import { useCallback, useEffect, useRef, useState, type MouseEvent } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getIsScrolling, releaseScroll, suppressScroll } from "@/lib/scroll-suppress"

export const OPEN_DESIGN_PARTNER_EVENT = "crosstown:open-design-partner"

type NavEntry = {
  index: string
  label: string
  anchorId?: string
  href?: string
}

const NAV_ITEMS: NavEntry[] = [
  { index: "01", label: "Product", anchorId: "product" },
  { index: "02", label: "Workspace", href: "/workspace" },
  { index: "03", label: "ParkProof", href: "/parkproof-walkthrough" },
  { index: "04", label: "Resources", href: "/resources" },
  { index: "05", label: "Tools", href: "/tools" },
  { index: "06", label: "Field Notes", href: "/blog" },
  { index: "07", label: "Paths", anchorId: "paths" },
  { index: "08", label: "Standards", href: "/editorial-standards" },
]

const ANCHOR_IDS = NAV_ITEMS.map((item) => item.anchorId).filter(
  (id): id is string => Boolean(id),
)

const HEADER_OFFSET = 104
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

// ── SCROLL PROGRESS BAR ──
// Self-contained: scroll updates mutate the bar's transform directly (GPU-cheap,
// transform-only) instead of re-rendering Navigation on every scroll frame.
// scrollHeight is measured on resize, never per scroll frame.
// Section labels (THESIS / FIELD / PROOF / PAPERS) ride under the line on
// desktop: upcoming dim, current full, passed faded. Opacity-only updates.
const SECTION_LABELS = [
  { label: "THESIS", id: "thesis" },
  { label: "FIELD", id: "field-reality" },
  { label: "PROOF", id: "parkproof" },
  { label: "PAPERS", id: "working-papers" },
] as const

function ProgressBar() {
  const barRef = useRef<HTMLDivElement>(null)
  const maxScrollRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([])
  const sectionsRef = useRef<Array<{ top: number; bottom: number } | null>>([])
  const [labelPcts, setLabelPcts] = useState<number[]>([])
  const pathname = usePathname()
  const isHome = pathname === "/"

  useEffect(() => {
    const measure = () => {
      const max = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
      )
      maxScrollRef.current = max

      if (isHome) {
        const sections = SECTION_LABELS.map(({ id }) => {
          const el = document.getElementById(id)
          if (!el) return null
          const top = el.getBoundingClientRect().top + window.scrollY
          return { top, bottom: top + el.offsetHeight }
        })
        sectionsRef.current = sections
        setLabelPcts(
          sections.map((s) =>
            s && max > 0 ? Math.min(0.96, Math.max(0.04, s.top / max)) : 0,
          ),
        )
      }
    }

    const update = () => {
      if (rafRef.current !== null) return
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null
        const max = maxScrollRef.current
        const ratio = max > 0 ? window.scrollY / max : 0
        const clamped = Math.min(1, Math.max(0, ratio))
        if (barRef.current) {
          barRef.current.style.transform = `scaleX(${clamped})`
        }
        if (isHome) {
          const mid = window.scrollY + window.innerHeight * 0.35
          sectionsRef.current.forEach((section, i) => {
            const span = labelRefs.current[i]
            if (!span) return
            let opacity = 0
            if (section) {
              opacity = mid < section.top ? 0.35 : mid > section.bottom ? 0 : 1
            }
            span.style.opacity = String(opacity)
          })
        }
      })
    }

    const onResize = () => {
      measure()
      update()
    }

    measure()
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", onResize)
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    }
  }, [isHome])

  return (
    <div className="relative h-0.5 bg-border" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full origin-left scale-x-0 bg-primary shadow-[0_0_8px_rgba(58,134,242,0.95),0_0_18px_rgba(58,134,242,0.55)]"
      />
      {isHome ? (
        <div className="theme-cream pointer-events-none absolute inset-x-0 top-full hidden md:block">
          {SECTION_LABELS.map(({ label }, i) => (
            <span
              key={label}
              ref={(el) => {
                labelRefs.current[i] = el
              }}
              className="absolute -translate-x-1/2 bg-background px-1 pt-[2px] font-mono text-[8px] uppercase leading-none tracking-[0.22em] text-muted opacity-0 transition-opacity duration-200"
              style={{ left: `${(labelPcts[i] ?? 0) * 100}%` }}
            >
              {label}
            </span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default function Navigation() {
  const [active, setActive] = useState<string>("")
  const [open, setOpen] = useState(false)

  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)
  const scrollEndHandlerRef = useRef<EventListener | null>(null)
  const scrollFallbackRef = useRef<number | null>(null)

  const clearScrollWatchers = useCallback(() => {
    if (scrollEndHandlerRef.current) {
      window.removeEventListener("scrollend", scrollEndHandlerRef.current)
      scrollEndHandlerRef.current = null
    }

    if (scrollFallbackRef.current) {
      window.clearTimeout(scrollFallbackRef.current)
      scrollFallbackRef.current = null
    }
  }, [])

  useEffect(() => {
    const sections = ANCHOR_IDS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        if (getIsScrolling()) return

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.innerWidth >= 1024) setOpen(false)
    }

    window.addEventListener("resize", closeOnDesktop)
    return () => window.removeEventListener("resize", closeOnDesktop)
  }, [])

  // ── MOBILE DRAWER: close on any link tap ──
  // ScrollExperience intercepts in-page anchor clicks at document capture and
  // calls stopPropagation, which prevents React's onClick from firing
  // setOpen(false) — the drawer stayed open over a dark overlay ("black
  // screen"). A native capture listener on the SAME node (document) still
  // runs despite stopPropagation, so the drawer reliably closes on every tap.
  useEffect(() => {
    if (!open) return
    const closeOnDrawerTap = (event: globalThis.MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (target?.closest?.("#mobile-navigation a[href]")) {
        setOpen(false)
      }
    }
    document.addEventListener("click", closeOnDrawerTap, true)
    return () => document.removeEventListener("click", closeOnDrawerTap, true)
  }, [open ])

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ""

      if (wasOpenRef.current) {
        wasOpenRef.current = false
        menuButtonRef.current?.focus()
      }

      return
    }

    wasOpenRef.current = true
    document.body.style.overflow = "hidden"

    const focusFrame = requestAnimationFrame(() => {
      const focusable = drawerRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      focusable?.[0]?.focus()
    })

    const trapFocus = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        setOpen(false)
        return
      }

      if (event.key !== "Tab" || !drawerRef.current) return

      const focusable = Array.from(
        drawerRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      ).filter((element) => !element.hasAttribute("disabled") && element.tabIndex !== -1)

      if (focusable.length === 0) return

      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const activeElement = document.activeElement as HTMLElement | null
      const focusIsInside = activeElement ? drawerRef.current.contains(activeElement) : false

      if (event.shiftKey && (!focusIsInside || activeElement === first)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (!focusIsInside || activeElement === last)) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", trapFocus)

    return () => {
      cancelAnimationFrame(focusFrame)
      document.removeEventListener("keydown", trapFocus)
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    return () => {
      clearScrollWatchers()
      releaseScroll()
    }
  }, [clearScrollWatchers])

  const jump = useCallback(
    (id: string) => {
      const element = document.getElementById(id)
      setOpen(false)

      if (!element) return

      setActive(id)
      clearScrollWatchers()
      releaseScroll()

      requestAnimationFrame(() => {
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
        const top = Math.max(
          element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
          0,
        )

        suppressScroll()
        window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" })
        history.replaceState(null, "", `#${id}`)

        const finishScroll = () => {
          releaseScroll()
          window.removeEventListener("scrollend", finishScroll)

          if (scrollFallbackRef.current) {
            window.clearTimeout(scrollFallbackRef.current)
            scrollFallbackRef.current = null
          }

          scrollEndHandlerRef.current = null
        }

        scrollEndHandlerRef.current = finishScroll
        window.addEventListener("scrollend", finishScroll, { once: true })
        scrollFallbackRef.current = window.setTimeout(
          finishScroll,
          prefersReducedMotion ? 50 : 1500,
        )
      })
    },
    [clearScrollWatchers],
  )

  const handleAnchorClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      if (isHome) {
        event.preventDefault()
        jump(id)
        return
      }

      setOpen(false)
    },
    [isHome, jump],
  )

  const goHome = useCallback(() => {
    if (isHome) {
      jump("hero")
      return
    }

    setOpen(false)
    router.push("/")
  }, [isHome, jump, router])

  const renderEntry = (item: NavEntry, variant: "desktop" | "mobile") => {
    if (item.href) {
      const isCurrent = pathname === item.href

      if (variant === "desktop") {
        return (
          <Link
            href={item.href}
            aria-current={isCurrent ? "page" : undefined}
            className={cn(
              "relative flex h-16 items-center gap-2 px-2.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background xl:px-3",
              "after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:transition-colors xl:after:left-3 xl:after:right-3",
              isCurrent
                ? "text-primary after:bg-primary"
                : "text-muted after:bg-transparent hover:text-foreground hover:after:bg-border",
            )}
          >
            <span className={cn("hidden text-[8px]", isCurrent ? "text-primary" : "text-muted/60", "xl:inline")}>
              {item.index}
            </span>
            <span>{item.label}</span>
          </Link>
        )
      }

      return (
        <Link
          href={item.href}
          aria-current={isCurrent ? "page" : undefined}
          onClick={() => setOpen(false)}
          className={cn(
            "flex items-center gap-4 border-l-2 px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isCurrent
              ? "border-l-primary bg-primary/10 text-primary"
              : "border-l-transparent text-muted hover:border-l-border hover:bg-card/60 hover:text-foreground",
          )}
        >
          <span className={cn("font-mono text-[10px] tracking-[0.2em]", isCurrent ? "text-primary" : "text-muted/60")}>
            {item.index}
          </span>
          <span className="font-serif text-lg tracking-tight">{item.label}</span>
        </Link>
      )
    }

    const id = item.anchorId as string
    const isActive = active === id

    if (variant === "desktop") {
      return (
        <a
          href={isHome ? `#${id}` : `/#${id}`}
          aria-current={isActive ? "location" : undefined}
          onClick={(event) => handleAnchorClick(event, id)}
          className={cn(
            "relative flex h-16 items-center gap-2 px-2.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background xl:px-3",
            "after:absolute after:bottom-0 after:left-2.5 after:right-2.5 after:h-0.5 after:transition-colors xl:after:left-3 xl:after:right-3",
            isActive
              ? "text-primary after:bg-primary"
              : "text-muted after:bg-transparent hover:text-foreground hover:after:bg-border",
          )}
        >
          <span className={cn("hidden text-[8px]", isActive ? "text-primary" : "text-muted/60", "xl:inline")}>
            {item.index}
          </span>
          <span>{item.label}</span>
        </a>
      )
    }

    return (
      <a
        href={isHome ? `#${id}` : `/#${id}`}
        aria-current={isActive ? "location" : undefined}
        onClick={(event) => handleAnchorClick(event, id)}
        className={cn(
          "flex items-center gap-4 border-l-2 px-4 py-3 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          isActive
            ? "border-l-primary bg-primary/10 text-primary"
            : "border-l-transparent text-muted hover:border-l-border hover:bg-card/60 hover:text-foreground",
        )}
      >
        <span className={cn("font-mono text-[10px] tracking-[0.2em]", isActive ? "text-primary" : "text-muted/60")}>
          {item.index}
        </span>
        <span className="font-serif text-lg tracking-tight">{item.label}</span>
      </a>
    )
  }

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50">
        <ProgressBar />

        <div className="theme-cream flex h-8 items-center justify-center border-b border-border/70 bg-background/95 px-4">
          <p className="flex items-center gap-2 text-center font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
            <span className="h-1.5 w-1.5 bg-primary" aria-hidden="true" />
            The Acquisition Workspace opens November 2026. Single-deal or annual.
          </p>
        </div>

        <header className="border-b border-border bg-background/95">
          <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={goHome}
              className="group flex min-w-fit items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              aria-label="Return to the CrosstownOS homepage"
            >
              <span className="relative h-10 w-10 flex-none overflow-hidden [clip-path:circle(50%)]">
                <Image
                  src="/logo.jpg"
                  alt="CrosstownOS"
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </span>
              <span className="font-serif text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
                CrosstownOS
              </span>
            </button>

            <nav aria-label="Primary" className="hidden min-w-0 flex-1 justify-center lg:flex">
              <ul className="flex items-center gap-1 xl:gap-2">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>{renderEntry(item, "desktop")}</li>
                ))}
              </ul>
            </nav>

            <Link
              href="/workspace"
              className="hidden min-w-fit border border-primary/60 bg-primary px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:block"
            >
              See the plans
            </Link>

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="flex h-11 w-11 items-center justify-center border border-border text-foreground transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background lg:hidden"
            >
              {open ? <X className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
            </button>
          </div>
        </header>
      </div>

      {open ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setOpen(false)}
            className="fixed inset-x-0 bottom-0 top-[6.125rem] z-40 cursor-default bg-background/70 backdrop-blur-sm lg:hidden"
          />

          <div
            ref={drawerRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-navigation-title"
            className="fixed inset-x-0 bottom-0 top-[6.125rem] z-40 overflow-y-auto border-t border-border bg-background lg:hidden"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <p
                id="mobile-navigation-title"
                className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary"
              >
                Section Index
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close navigation menu"
                className="flex h-11 w-11 items-center justify-center border border-border text-muted transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile primary" className="px-5 py-5">
              <ul className="space-y-1">
                {NAV_ITEMS.map((item) => (
                  <li key={item.label}>{renderEntry(item, "mobile")}</li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-border px-5 py-5">
              <Link
                href="/workspace"
                onClick={() => setOpen(false)}
                className="block w-full border border-primary/60 bg-primary px-4 py-4 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the plans
              </Link>
              <p className="mt-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted">
                You operate the workspace. You own the decision.
              </p>
            </div>
          </div>
        </>
      ) : null}
    </>
  )
}
