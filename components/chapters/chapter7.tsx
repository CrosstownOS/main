"use client"

import type { MouseEvent } from "react"
import Link from "next/link"
import { ArrowUpRight, Mail } from "lucide-react"
import {
  Container,
  Heading,
  Section,
  TerminalLabel,
} from "@/components/ui/primitives"
import { releaseScroll, suppressScroll } from "@/lib/scroll-suppress"

const HEADER_OFFSET = 104

function scrollToAnchor(id: string) {
  const element = document.getElementById(id)
  if (!element) return

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const top = Math.max(element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, 0)

  suppressScroll()
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" })
  history.replaceState(null, "", `#${id}`)

  const finishScroll = () => {
    releaseScroll()
    window.removeEventListener("scrollend", finishScroll)
  }

  window.addEventListener("scrollend", finishScroll, { once: true })
  window.setTimeout(finishScroll, prefersReducedMotion ? 50 : 1500)
}

export default function Chapter7() {
  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    scrollToAnchor(id)
  }

  return (
    <Section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-background/70"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <TerminalLabel className="mb-5 block">
            Contact
          </TerminalLabel>
          <Heading
            id="contact-heading"
            level={2}
            className="text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            Help build the record you wish existed.
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
            If you are actively reviewing an RV park or manufactured-housing
            opportunity, Crosstown wants to learn how you work, and whether
            ParkProof can help make the next decision more disciplined.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/deal-desk"
              className="inline-flex items-center justify-center gap-2 border border-primary/60 bg-primary px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See the plans
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <a
              href="#paths"
              onClick={(event) => handleAnchorClick(event, "paths")}
              className="inline-flex items-center justify-center gap-2 border border-border px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Find Your Path
            </a>
          </div>

          <a
            href="mailto:jeremy@crosstownosrv.camp"
            className="mt-8 inline-flex items-center gap-2 font-sans text-sm tracking-wide text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            jeremy@crosstownosrv.camp
          </a>
        </div>
      </Container>
    </Section>
  )
}
