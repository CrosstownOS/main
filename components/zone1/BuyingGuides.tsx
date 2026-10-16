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

const GUIDES = [
  {
    href: "/buying-an-rv-park",
    label: "How to Buy an RV Park",
    description:
      "The buyer's verification guide: price-per-pad benchmarks, the five verification gates, and the red flags that kill deals.",
  },
  {
    href: "/buying-a-campground",
    label: "How to Buy a Campground",
    description:
      "What changes when the asset is seasonal: revenue traps, amenity capex, and water, sewer, and permit verification.",
  },
  {
    href: "/mobile-home-park-investing",
    label: "Mobile Home Park Investing",
    description:
      "Tenant-owned vs. park-owned, lot rent verification, and the hidden infrastructure capex. Underwrite the park that exists.",
  },
  {
    href: "/rv-park-investing",
    label: "RV Park Investing in 2026",
    description:
      "Where returns come from, where they leak, and the verification framework buyers run before capital commits.",
  },
]

export default function BuyingGuides() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <Section
      id="buying-guides"
      ref={revealRef}
      aria-labelledby="buying-guides-heading"
    >
      <Container>
        <TelemetryBox glass="heavy" className="theme-cream paper border-primary/50 p-6 text-foreground sm:p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5">
              <span aria-hidden="true" data-reveal-line className="mx-auto mb-3" />
              <TerminalLabel data-reveal-stamp className="block">
                Buying Guides
              </TerminalLabel>
            </div>
            <Heading
              id="buying-guides-heading"
              level={2}
              className="mb-6 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              Buying? Start with verification, not the brochure.
            </Heading>
            <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg">
              Four guides for buyers: what to verify, in what order, before
              the price becomes final. Written for the buyer&apos;s side of
              the table.
            </p>
          </div>
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {GUIDES.map((guide) => (
              <Link
                key={guide.href}
                href={guide.href}
                className="theme-cream card-lift border border-border bg-card p-6 transition-colors hover:border-primary/60"
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  Buyer&apos;s guide
                </p>
                <p className="mt-2 font-sans text-lg font-bold tracking-tight text-foreground">
                  {guide.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {guide.description}
                </p>
                <p className="mt-3 text-sm font-semibold text-primary">
                  Read the guide &rarr;
                </p>
              </Link>
            ))}
          </div>
        </TelemetryBox>
      </Container>
    </Section>
  )
}
