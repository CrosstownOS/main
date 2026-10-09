"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  Handshake,
  Target,
  Users,
  X,
  type LucideIcon } from "lucide-react"
import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel } from "@/components/ui/primitives"
import { useReveal } from "@/hooks/useReveal"
import { cn } from "@/lib/utils"

export const OPEN_FOUNDING_CIRCLE_EVENT = "crosstown:open-founding-circle"
export const OPEN_REFERRAL_NETWORK_EVENT = "crosstown:open-referral-network"
export const OPEN_GENERAL_EVENT = "crosstown:open-general"

// Dormant legacy events — retained for future re-linking. Nothing on the
// public site dispatches these today.
export const OPEN_OUTPOST_EVENT = "crosstown:open-outpost"
export const OPEN_BASECAMP_EVENT = "crosstown:open-basecamp"
export const OPEN_COMPASS_EVENT = "crosstown:open-compass"

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'

type PathAction = "deal_desk" | "founding_circle" | "referral_network"

type ConversionPath = {
  code: string
  name: string
  question: string
  description: string
  cta: string
  action: PathAction
  href?: string
  secondaryLink?: {
    label: string
    href: string
  }
  icon: LucideIcon
}

const CONVERSION_PATHS: ConversionPath[] = [
  {
    code: "01",
    name: "Acquisition Workspace",
    question: "Actively acquiring an RV park or MHC?",
    description:
      "For buyers with a live or imminent deal and a decision deadline. Run the deal inside the CrosstownOS workspace, from evidence to a documented decision file.",
    cta: "See the plans",
    action: "deal_desk",
    href: "/workspace",
    icon: Target },
  {
    code: "02",
    name: "Field Network",
    question: "Want to follow the build from the inside?",
    description:
      "For operators, owners, and industry people who want early updates, a voice in what gets built, and first word when the workspace opens.",
    cta: "Join the Field Network",
    action: "founding_circle",
    secondaryLink: {
      label: "Read The Trail Log",
      href: "/trail-log" },
    icon: Users },
  {
    code: "03",
    name: "Referral Alliance",
    question: "Know the assets and the people?",
    description:
      "For brokers, lenders, operators, and advisers who want a standing partner conversation with Crosstown.",
    cta: "Start a Partner Conversation",
    action: "referral_network",
    secondaryLink: {
      label: "For brokers and lenders",
      href: "/for-brokers-lenders" },
    icon: Handshake },
]

// ---------------------------------------------------------------------------
// Dormant legacy code below — retained unlinked for future use per the
// strategic-alignment decision. The Compass drawer is fully functional but
// nothing on the public site renders or dispatches to it.
// ---------------------------------------------------------------------------

export const COMPASS_CRITERIA = [
  {
    title: "Asset types",
    items: [
      "RV parks, manufactured-housing communities, and select mixed RV/MHC assets.",
    ] },
  {
    title: "Deal situations",
    items: [
      "Direct owner sales, succession or retirement transitions, recapitalizations, brokered opportunities, operating transitions, and appropriate referral situations.",
    ] },
  {
    title: "Geography",
    items: ["Evaluated case by case."] },
  {
    title: "Infrastructure",
    items: [
      "City, well, septic, lagoon, and related utility systems are evaluated case by case. Infrastructure diligence matters.",
    ] },
  {
    title: "What helps an initial review",
    items: [
      "Property location, approximate site count, occupancy, utility configuration, asking expectation, ownership or transition context, rent roll or T12 if available, and existing permits or reports if available.",
    ] },
] as const

function dispatchFormEvent(eventName: string, source: string) {
  window.dispatchEvent(new CustomEvent(eventName, { detail: { source } }))
}

export default function PlatformLinks() {
  const revealRef = useReveal<HTMLElement>()

  const handlePathAction = (path: ConversionPath) => {
    if (path.action === "founding_circle") {
      dispatchFormEvent(OPEN_FOUNDING_CIRCLE_EVENT, "paths-founding-network")
    } else if (path.action === "referral_network") {
      dispatchFormEvent(OPEN_REFERRAL_NETWORK_EVENT, "paths-referral-network")
    }
  }

  return (
    <Section
      id="paths"
      ref={revealRef}
      aria-labelledby="paths-heading"
    >
      <Container>
        <div className="mb-12 max-w-3xl">
          <div className="mb-5">
            <span aria-hidden="true" data-reveal-line className="mb-3" />
            <TerminalLabel data-reveal-stamp className="block">
              Paths Into Crosstown
            </TerminalLabel>
          </div>
          <Heading
            id="paths-heading"
            level={2}
            className="text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            Find your path into CrosstownOS.
          </Heading>
        </div>

          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-4">
          {CONVERSION_PATHS.map((path) => {
            const Icon = path.icon

            return (
              <TelemetryBox
                key={path.name}
                data-reveal-item
                glass="light"
                className="theme-cream paper flex h-full w-full flex-col p-5 transition-colors hover:border-primary/50 hover:bg-primary/5 md:w-[calc(50%-0.5rem)]"
              >
                <div className="mb-6 flex items-start justify-between gap-4">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-muted/60">
                    {path.code}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center border border-border/60 bg-background/50">
                    <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                  </div>
                </div>

                <TerminalLabel className="mb-3 block">
                  {path.name}
                </TerminalLabel>
                <Heading level={3} className="mb-3 text-xl leading-snug">
                  {path.question}
                </Heading>
                <p className="mb-8 text-sm leading-relaxed text-muted">
                  {path.description}
                </p>

                {path.href ? (
                  <Link
                    href={path.href}
                    className="mt-auto border border-primary/60 bg-primary-deep px-4 py-3 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {path.cta}
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => handlePathAction(path)}
                    aria-haspopup="dialog"
                    className="mt-auto border border-primary/60 px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {path.cta}
                  </button>
                )}

                {path.secondaryLink ? (
                  <Link
                    href={path.secondaryLink.href}
                    className="mt-3 block text-center font-mono text-[9px] uppercase tracking-[0.18em] text-muted underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  >
                    {path.secondaryLink.label}
                  </Link>
                ) : null}
              </TelemetryBox>
            )
          })}
        </div>

        <div className="mx-auto mt-8 max-w-5xl text-center">
          <button
            type="button"
            onClick={() => dispatchFormEvent(OPEN_GENERAL_EVENT, "paths-not-sure")}
            aria-haspopup="dialog"
            className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Not sure where you fit? Start a general conversation and we&rsquo;ll route it.
          </button>
        </div>
      </Container>
    </Section>
  )
}

// Dormant: The Compass acquisition-criteria drawer. Self-contained and
// event-driven — dispatch OPEN_COMPASS_EVENT to open it. Intentionally not
// rendered anywhere on the public site.
export function CompassCriteriaDrawer() {
  const [compassOpen, setCompassOpen] = useState(false)
  const drawerRef = useRef<HTMLDivElement>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    const triggerRef = useRef<HTMLElement | null>(null)

    const closeCompass = () => {
      setCompassOpen(false)
      // Return focus to the trigger that opened the drawer
      requestAnimationFrame(() => triggerRef.current?.focus())
    }

    const openDrawer = () => {
      triggerRef.current = document.activeElement as HTMLElement | null
      setCompassOpen(true)
    }
    window.addEventListener(OPEN_COMPASS_EVENT, openDrawer)
    return () => window.removeEventListener(OPEN_COMPASS_EVENT, openDrawer)
  }, [])

  useEffect(() => {
    if (!compassOpen) {
      document.body.style.overflow = ""
      wasOpenRef.current = false
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
        closeCompass()
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
  }, [compassOpen])

  const submitOpportunityFromCompass = () => {
    closeCompass()
    dispatchFormEvent(OPEN_OUTPOST_EVENT, "compass-criteria-drawer")
  }

  if (!compassOpen) return null

  return (
    <>
      <button
        type="button"
        aria-label="Close Compass criteria"
        onClick={closeCompass}
        className="fixed inset-0 z-[70] cursor-default bg-background/75 backdrop-blur-sm"
      />

      <div
        ref={drawerRef}
        id="compass-criteria-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compass-drawer-title"
        className="theme-cream fixed inset-y-0 right-0 z-[80] flex w-full max-w-3xl flex-col border-l border-border bg-background shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-6">
          <div>
            <TerminalLabel className="mb-2 block">
              The Compass // Acquisition Criteria
            </TerminalLabel>
            <h2 id="compass-drawer-title" className="font-serif text-2xl tracking-tight text-foreground">
              Initial fit criteria.
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCompass}
            aria-label="Close Compass criteria"
            className="flex h-10 w-10 flex-none items-center justify-center border border-border text-muted transition-colors hover:border-primary/60 hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-6">
          <section aria-label="Initial fit criteria" className="mb-8">
            <TerminalLabel className="mb-4 block text-muted">
              01. Initial Fit Criteria
            </TerminalLabel>
            <div className="grid gap-4 md:grid-cols-2">
              {COMPASS_CRITERIA.map((criterion) => (
                <div key={criterion.title} className="border border-border/60 bg-card/50 p-5">
                  <h3 className="mb-4 font-sans text-lg font-bold text-foreground">
                    {criterion.title}
                  </h3>
                  <ul className="space-y-3">
                    {criterion.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                        <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          <div className="border border-border/60 bg-card/50 p-5">
            <p className="mb-5 text-sm leading-relaxed text-muted">
              Criteria are initial screening guidelines and are evaluated case by case. Submission does not create an offer, valuation opinion, financing commitment, agency relationship, or obligation to transact.
            </p>
            <button
              type="button"
              onClick={submitOpportunityFromCompass}
              className="w-full border border-primary/60 bg-primary-deep px-5 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Submit an Opportunity
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
