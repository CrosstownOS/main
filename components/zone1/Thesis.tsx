"use client"

import { useReveal } from "@/hooks/useReveal"
import {
  Container,
  Heading,
  Section,
  TerminalLabel,
} from "@/components/ui/primitives"

const THESIS_SIGNALS = [
  {
    index: "01",
    title: "The asset is an operating business.",
    body: "Value lives in collections, leases, utilities, roads, and resident records, not only in the dirt.",
  },
  {
    index: "02",
    title: "The evidence is scattered.",
    body: "Broker packages, PDFs, spreadsheets, inboxes, inspections, and memory rarely reconcile themselves.",
  },
  {
    index: "03",
    title: "The decision happens before close.",
    body: "Once capital is committed, the cost of what was missed is already yours.",
  },
] as const

export default function Thesis() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <Section
      id="thesis"
      ref={revealRef}
      aria-labelledby="thesis-heading"
      className="relative overflow-hidden"
    >
      {/* Ambient primary glow — decorative only */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_70%_40%,oklch(0.50_0.08_250/0.08),transparent_70%)]"
      />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div className="mb-5">
              <span aria-hidden="true" data-reveal-line className="mb-3" />
              <TerminalLabel data-reveal-stamp className="block text-primary">
                Thesis / Why Now
              </TerminalLabel>
            </div>
            <Heading
              id="thesis-heading"
              level={2}
              className="max-w-xl text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              Ownership is changing hands. The truth should move with it.
            </Heading>
          </div>

          <div>
            <p className="max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              Operating businesses disguised as real estate often come with the evidence scattered across broker packages, spreadsheets, and memory. Crosstown makes the record disciplined before capital is committed, and for the life of the asset.
            </p>

            <div className="theme-cream paper mt-10 divide-y divide-border/60 border border-border/60 bg-card/40 shadow-[0_0_60px_-15px_oklch(0.50_0.08_250/0.25)]">
              {THESIS_SIGNALS.map((signal) => (
                <div key={signal.index} data-reveal-item className="flex gap-5 p-5">
                  <span className="mt-1 font-mono text-[10px] tracking-[0.22em] text-primary">
                    {signal.index}
                  </span>
                  <div>
                    <h3 className="mb-1 font-sans text-base font-bold text-foreground">
                      {signal.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-foreground/70">
                      {signal.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  )
}