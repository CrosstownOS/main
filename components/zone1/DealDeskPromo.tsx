"use client"

import Link from "next/link"
import { useCountUp, useReveal } from "@/hooks/useReveal"
import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel,
} from "@/components/ui/primitives"

export default function DealDeskPromo() {
  const revealRef = useReveal<HTMLElement>()
  const singleDeal = useCountUp(1250)
  const annual = useCountUp(2500)

  return (
    <Section
      id="deal-desk"
      ref={revealRef}
      aria-labelledby="deal-desk-promo-heading"
    >
      <Container>
        <TelemetryBox glass="heavy" className="theme-cream paper border-primary/50 p-6 text-foreground sm:p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5">
              <span aria-hidden="true" data-reveal-line className="mx-auto mb-3" />
              <TerminalLabel data-reveal-stamp className="block">
                Available November 2026
              </TerminalLabel>
            </div>
            <Heading
              id="deal-desk-promo-heading"
              level={2}
              className="mb-6 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              The Acquisition Workspace. Your deal, on the record.
            </Heading>
            <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg">
              Seller claims, source evidence, site observations, unresolved
              diligence, and underwriting, connected in one workspace before
              you commit capital. You operate it. You own the decision.
            </p>
            <p className="mb-10 text-base leading-relaxed text-foreground/85">
              Single-deal $<span ref={singleDeal}>1,250</span>. Annual $
              <span ref={annual}>2,500</span>. Recorded walkthrough plus one
              live software Q&A.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                data-reveal-item
                href="/workspace"
                className="border border-primary/60 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the plans
              </Link>
              <Link
                data-reveal-item
                href="/workspace#how-it-works"
                className="border border-primary/50 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/70 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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
