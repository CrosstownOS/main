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

const PAPERS = [
  { code: "AS-02", name: "60-Second Deal Screener", slug: "60-second-screener" },
  { code: "AS-09", name: "POH/TOH Split Valuation", slug: "poh-toh-split" },
  { code: "AS-15", name: "Rent-Roll Truth Check", slug: "rent-roll-truth-check" },
  { code: "AS-08", name: "Expense Normalizer", slug: "expense-normalizer" },
  { code: "AS-13", name: "Utility Capacity Risk Triage", slug: "utility-capacity-triage" },
  { code: "AS-17", name: "EMD Clock and Gate Tracker", slug: "emd-clock" },
]

export default function WorkingPapers() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <Section
      id="working-papers"
      ref={revealRef}
      aria-labelledby="working-papers-heading"
    >
      <Container>
        <TelemetryBox glass="heavy" className="theme-cream paper border-primary/50 p-6 text-foreground sm:p-8 lg:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5">
              <span aria-hidden="true" data-reveal-line className="mx-auto mb-3" />
              <TerminalLabel data-reveal-stamp className="block">
                Live Diligence Working Papers
              </TerminalLabel>
            </div>
            <Heading
              id="working-papers-heading"
              level={2}
              className="mb-6 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              Run the math on your live deal, in your browser.
            </Heading>
            <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg">
              Six working papers from the Acquisition Signal library, rebuilt as
              instruments. Every number carries an evidence state. Every output
              shows its lineage. Free to use, no account. Export the file and
              bring it to the fit call.
            </p>
            <div className="mb-10 grid gap-3 text-left sm:grid-cols-2">
              {PAPERS.map((paper) => (
                <Link
                  key={paper.slug}
                  data-reveal-item
                  href={`/tools/${paper.slug}`}
                  className="group flex items-center gap-3 border border-border bg-background/60 px-4 py-3 transition-colors hover:border-primary/60"
                >
                  <span className="bg-primary px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-white">
                    {paper.code}
                  </span>
                  <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                    {paper.name}
                  </span>
                </Link>
              ))}
            </div>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/tools"
                className="border border-primary/60 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Open the working papers
              </Link>
              <Link
                href="/resources/catalog"
                className="border border-primary/50 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/70 hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Browse the 35 tools
              </Link>
            </div>
          </div>
        </TelemetryBox>
      </Container>
    </Section>
  )
}
