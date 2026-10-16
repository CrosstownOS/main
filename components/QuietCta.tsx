"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, X } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  LIVE_TOOL_BY_RESOURCE_SLUG,
  RESOURCE_DETAIL_BY_SLUG,
  TOOL_BY_CODE,
  resourceSlug,
} from "@/lib/resources"
import { RESOURCE_INSIDE } from "@/lib/resource-inside"

const STORAGE_KEY = "crosstown:quiet-cta-dismissed"

// The Referral Alliance door lives in the inquiry modal (Chapter5), opened
// by this window event (defined in components/zone1/PlatformLinks.tsx).
const OPEN_REFERRAL_NETWORK_EVENT = "crosstown:open-referral-network"

const TOOL_NAMES: Record<string, string> = {
  "60-second-screener": "60-Second Deal Screener",
  "poh-toh-split": "POH/TOH Split Valuation",
  "rent-roll-truth-check": "Rent-Roll Truth Check",
  "expense-normalizer": "Expense Normalizer",
  "utility-capacity-triage": "Utility Capacity Risk Triage",
  "emd-clock": "EMD Clock and Gate Tracker",
}

// Post slug -> the resource page that note points to. Mirrors the
// POST_RESOURCE_SLUGS map the blog post page uses for its Next step card.
const POST_RESOURCE_SLUGS: Record<string, string> = {
  "anatomy-of-a-broker-package": "broker-package-intake-sheet",
  "before-you-underwrite-establish-what-is-true": "the-evidence-status-standard",
  "manufactured-housing-diligence-starts-with-who-owns-the-homes": "poh-toh-split-valuation-worksheet",
  "read-the-pl-like-the-other-side-wrote-it": "mom-and-pop-expense-normalizer",
  "reported-occupancy-is-not-paying-occupancy": "the-rent-roll-truth-check",
  "speed-is-a-strategy-for-sellers-not-buyers": "the-walk-away-pact",
  "the-permits-buyers-skip": "evidence-request-list",
  "the-rent-roll-is-a-claim-not-income-verification": "the-rent-roll-truth-check",
  "the-utility-system-nobody-underwrote": "utility-and-wastewater-diligence-sheet",
}

type CtaConfig = {
  kicker: string
  text: string
  href?: string
  eventName?: string
}

const PILOT: CtaConfig = {
  kicker: "Acquisition Workspace",
  text: "apply for a pilot place",
  href: "/workspace",
}

// No prompt on the workspace page itself (the bar links there), and none
// on the legal pages: no honest contextual ask exists for them.
const SUPPRESSED = new Set(["/workspace", "/privacy", "/terms"])

/**
 * The bar's content is keyed to the page family's user goal, not one
 * global ask. Tool pages point at the record that tool feeds; resource
 * pages at the paired live tool or the next worksheet in the Inside
 * chain; Field Notes at the working paper behind the note; guides at
 * the workspace in the guide's own terms; partners at the conversation
 * itself. Surfaces with no honest contextual ask are suppressed.
 */
function resolveCta(pathname: string): CtaConfig | null {
  const path =
    pathname !== "/" && pathname.endsWith("/")
      ? pathname.slice(0, -1)
      : pathname

  if (SUPPRESSED.has(path)) return null
  if (path === "/") return PILOT

  if (path === "/tools") {
    return {
      kicker: "The Library",
      text: "the worksheets behind the tools",
      href: "/resources",
    }
  }
  if (path.startsWith("/tools/")) {
    const slug = path.slice("/tools/".length)
    const name = TOOL_NAMES[slug]
    if (name) {
      return {
        kicker: name,
        text: "keep this question in the record",
        href: `/workspace?tool=${slug}`,
      }
    }
    return PILOT
  }

  if (path === "/resources" || path === "/resources/catalog") {
    return {
      kicker: "Working Papers",
      text: "run a tool live in your browser",
      href: "/tools",
    }
  }
  if (path.startsWith("/resources/")) {
    const slug = path.slice("/resources/".length)
    const live = LIVE_TOOL_BY_RESOURCE_SLUG[slug]
    if (live) {
      return {
        kicker: live.toolName,
        text: "run this worksheet live",
        href: `/tools/${live.toolSlug}`,
      }
    }
    const code = RESOURCE_INSIDE[slug]?.handsTo.match(/AS-\d+R?/)?.[0]
    const target = code ? TOOL_BY_CODE[code] : undefined
    if (target) {
      return {
        kicker: `${target.code}: ${target.title}`,
        text: "next in the chain",
        href: `/resources/${resourceSlug(target)}`,
      }
    }
    if (RESOURCE_DETAIL_BY_SLUG[slug]) {
      return {
        kicker: "The Catalog",
        text: "browse the full library",
        href: "/resources/catalog",
      }
    }
    return PILOT
  }

  if (path === "/blog") {
    return {
      kicker: "Working Papers",
      text: "the papers behind the notes",
      href: "/resources",
    }
  }
  if (path.startsWith("/blog/")) {
    const slug = path.slice("/blog/".length)
    const resSlug = POST_RESOURCE_SLUGS[slug]
    const detail = resSlug ? RESOURCE_DETAIL_BY_SLUG[resSlug] : undefined
    if (detail) {
      return {
        kicker: detail.code ? `${detail.code}: ${detail.title}` : detail.title,
        text: "the working paper behind this note",
        href: `/resources/${detail.slug}`,
      }
    }
    return {
      kicker: "Field Notes",
      text: "get the free working papers",
      href: "/resources",
    }
  }

  switch (path) {
    case "/checklist":
      return {
        kicker: "Acquisition Workspace",
        text: "work the fifteen in the record",
        href: "/workspace",
      }
    case "/buying-an-rv-park":
    case "/buying-a-campground":
      return {
        kicker: "Acquisition Workspace",
        text: "run the deal on the record",
        href: "/workspace",
      }
    case "/mobile-home-park-investing":
    case "/rv-park-investing":
      return {
        kicker: "Acquisition Workspace",
        text: "bring the deal to the workspace",
        href: "/workspace",
      }
    case "/data-room-vs-diligence-software":
      return {
        kicker: "Acquisition Workspace",
        text: "the workspace runs the record",
        href: "/workspace",
      }
    case "/parkproof-standard":
      return {
        kicker: "ParkProof Walkthrough",
        text: "see a decision file built to the standard",
        href: "/parkproof-walkthrough",
      }
    case "/parkproof-walkthrough":
      return PILOT
    case "/for-brokers-lenders":
      return {
        kicker: "Referral Alliance",
        text: "start a partner conversation",
        eventName: OPEN_REFERRAL_NETWORK_EVENT,
      }
    case "/trail-log":
      return {
        kicker: "Weigh In",
        text: "vote on what gets attention next",
        href: "#trail-vote",
      }
    case "/editorial-standards":
      return {
        kicker: "Field Notes",
        text: "read the notes this standard governs",
        href: "/blog",
      }
    default:
      return PILOT
  }
}

/**
 * QuietCta — slim contextual bar that slides up after the visitor scrolls
 * past half a viewport. Mobile: full-width bottom bar. Desktop: bottom-right
 * chip. Dismissible; stays gone for the session via sessionStorage (set only
 * on explicit dismiss, so it never hides for users who never dismissed it).
 * Mounted in app/layout.tsx as a direct child of <body>, OUTSIDE
 * app/template.tsx: the .page-enter transform would otherwise break its
 * position: fixed. Transform-only motion; prefers-reduced-motion collapses
 * the slide.
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
    // orientation) which moves the half-viewport trigger point.
    window.addEventListener("resize", check)
    return () => {
      window.removeEventListener("scroll", check)
      window.removeEventListener("resize", check)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const config = pathname ? resolveCta(pathname) : null

  // Suppressed surfaces (workspace, legal pages) render nothing at all.
  if (!config || dismissed) return null

  const dismiss = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "1")
    setDismissed(true)
  }

  const trackClick = () =>
    import("@vercel/analytics").then(({ track }) => track("quiet_cta_click"))

  const inner = (
    <>
      <span className="font-serif text-xs text-[#4A90D9]">{config.kicker}</span>{" "}
      <span className="font-mono">{config.text}</span>
      <ArrowRight className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
    </>
  )

  const actionClasses =
    "btn-signal inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"

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
        {config.eventName ? (
          <button
            type="button"
            onClick={() => {
              trackClick()
              window.dispatchEvent(
                new CustomEvent(config.eventName!, {
                  detail: { source: "quiet-cta" },
                }),
              )
            }}
            tabIndex={pastHero ? 0 : -1}
            className={actionClasses}
          >
            {inner}
          </button>
        ) : (
          <Link
            href={config.href ?? "/workspace"}
            onClick={trackClick}
            tabIndex={pastHero ? 0 : -1}
            className={actionClasses}
          >
            {inner}
          </Link>
        )}
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
