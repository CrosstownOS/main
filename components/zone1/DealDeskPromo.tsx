"use client"

import Link from "next/link"
import { useReveal } from "@/hooks/useReveal"
import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel,
} from "@/components/ui/primitives"

export default function DealDeskPromo() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <Section
      id="deal-desk"
      ref={revealRef}
      aria-labelledby="deal-desk-promo-heading"
    >
      <Container>
        <TelemetryBox glass="none" className="theme-cream paper border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] p-6 text-foreground sm:p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5">
              <span aria-hidden="true" data-reveal-line className="mx-auto mb-3" />
              <TerminalLabel data-reveal-stamp className="block">
                Free pilot, five places
              </TerminalLabel>
            </div>
            <Heading
              id="deal-desk-promo-heading"
              level={2}
              className="mb-6 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              The Acquisition Workspace. Five free pilot places.
            </Heading>
            <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg">
              Seller claims, source evidence, site observations, unresolved
              diligence, and underwriting, connected in one workspace before
              you commit capital. I am opening five free pilot places because
              I need proof it works on real deals.
            </p>
            <p className="mb-10 text-base leading-relaxed text-foreground/85">
              One live deal. 90 days. The full workspace. After the five: $299
              Monthly per 30-day period, $1,299 Single-Deal for one property
              over 180 days, or $2,999 Annual for 12 months.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                data-reveal-item
                href="/workspace"
                className="border border-primary/60 bg-primary-deep px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Apply for a pilot place
              </Link>
              <Link
                data-reveal-item
                href="/workspace#how-it-works"
                className="border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_14px_1px_rgba(58,134,242,0.18)] px-6 py-3.5 font-mono text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                How it works
              </Link>
            </div>
          </div>
        </TelemetryBox>
      </Container>
    </Section>
  )
}
