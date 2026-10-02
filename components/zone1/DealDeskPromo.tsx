"use client"

import Link from "next/link"
import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel,
} from "@/components/ui/primitives"

export default function DealDeskPromo() {
  return (
    <Section
      id="deal-desk"
      aria-labelledby="deal-desk-promo-heading"
      className="bg-primary/5"
    >
      <Container>
        <TelemetryBox glass="heavy" className="border-primary/50 p-6 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <TerminalLabel className="mb-5 block">
              Founding offer, November 2026
            </TerminalLabel>
            <Heading
              id="deal-desk-promo-heading"
              level={2}
              className="mb-6 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              The Founding Deal Desk. Five buyers. One live deal each.
            </Heading>
            <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg">
              Work your real acquisition inside CrosstownOS,
              from intake to a documented decision posture. One active deal,
              through your decision or 90 days. Onboarding, weekly Deal
              Desk sessions, and a documented decision file built to the
              ParkProof standard.
            </p>
            <p className="mb-10 text-base leading-relaxed text-foreground/85">
              $2,500, paid at acceptance. The full amount credits toward the
              Founding Acquisition Workspace if you convert within 30 days of
              your decision.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/deal-desk"
                className="border border-primary/60 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Bring a live deal
              </Link>
              <Link
                href="/deal-desk#terms"
                className="border border-border px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the terms
              </Link>
            </div>
          </div>
        </TelemetryBox>
      </Container>
    </Section>
  )
}
