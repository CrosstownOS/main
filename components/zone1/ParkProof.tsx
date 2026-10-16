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
import SignalLine from "@/components/ui/SignalLine"
import { cn } from "@/lib/utils"

const TRUTH_STATES = [
  {
    title: "Verified",
    body: "Backed by evidence you can point to, and reviewed by a person.",
    className: "border-success/60 text-success",
  },
  {
    title: "Broker-reported",
    body: "Reported in an OM, call, model, or broker package; not independently checked yet.",
    className: "border-accent/60 text-accent",
  },
  {
    title: "Missing evidence",
    body: "Material information has not been received or located yet.",
    className: "border-critical/60 text-critical",
  },
  {
    title: "Underwriting assumption",
    body: "A stated input in the investment case; not a verified fact.",
    className: "border-primary/60 text-primary",
  },
  {
    title: "Calculated",
    body: "An output calculated from stated inputs. The calculation is only as reliable as the inputs behind it.",
    className: "border-calculated/60 text-calculated",
  },
  {
    title: "Unresolved",
    body: "A material claim remains open because sources conflict, a review is incomplete, or the answer has not been established.",
    className: "border-border text-muted",
  },
] as const

const DECISION_ROWS = [
  {
    claim: "Reported occupancy",
    state: "Broker-reported",
    source: "OM p. 12",
  },
  {
    claim: "Collections variance",
    state: "Verified",
    source: "Rent roll extract, reviewed",
  },
  {
    claim: "Water and sewer capacity",
    state: "Missing evidence",
    source: "Utility records, not yet received",
  },
  {
    claim: "Stabilized expense input",
    state: "Underwriting assumption",
    source: "Approved input to the investment case",
  },
] as const

function getStateClass(state: string) {
  if (state === "Verified") return "border-success/60 text-success"
  if (state === "Broker-reported") return "border-accent/60 text-accent"
  if (state === "Underwriting assumption") return "border-primary/60 text-primary"
  if (state === "Missing evidence") return "border-critical/60 text-critical"
  return "border-border text-muted"
}

export default function ParkProof() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <Section
      id="parkproof"
      ref={revealRef}
      aria-labelledby="parkproof-heading"
    >
      <Container>
        {/* Row 1 — header: headline left, body right */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <div className="mb-5">
              <span aria-hidden="true" data-reveal-line className="mb-3" />
              <TerminalLabel data-reveal-stamp className="block">
                The Initial Decision Artifact
              </TerminalLabel>
            </div>
            <Heading
              id="parkproof-heading"
              level={2}
              className="text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              ParkProof turns a deal file into a decision file.
            </Heading>
          </div>
          <div className="flex items-end">
            <p className="max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              Every material claim in the file carries where it came from and what state it is in: verified, broker-reported, missing evidence, underwriting assumption, calculated, or unresolved. The team sees the deal as it stands, not a pile of documents.
            </p>
          </div>
        </div>

        {/* Row 2 — conceptual decision file, stacked rows */}
        <TelemetryBox glass="heavy" className="theme-cream paper border-primary/40 p-5 sm:p-6">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
            <TerminalLabel className="block">
              CrosstownOS ParkProof / Decision File
            </TerminalLabel>
            <span className="border border-border/60 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
              Conceptual example
            </span>
          </div>

          <div role="region" aria-label="ParkProof decision file conceptual example">
            <ul>
              {DECISION_ROWS.map((row) => (
                <li
                  key={`${row.state}-${row.claim}`}
                  className="flex items-start justify-between gap-3 border-b border-border/40 py-4 last:border-b-0"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium leading-snug text-foreground">
                      {row.claim}
                    </p>
                    <p className="mt-1 font-mono text-[10px] text-muted">
                      {row.source}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "shrink-0 border bg-background/40 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em]",
                      getStateClass(row.state),
                    )}
                  >
                    {row.state}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </TelemetryBox>

        {/* Posture labels line */}
        <p className="mt-5 text-sm leading-relaxed text-foreground/75">
          Advance, Retrade, Pause, and Walk are evidence-readiness labels. They are not recommendations, approvals, or advice.
        </p>

        {/* Row 3 — six truth states, full width */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TRUTH_STATES.map((state) => (
            <TelemetryBox key={state.title} data-reveal-item glass="light" className={cn("theme-cream paper p-5", state.className)}>
              <TerminalLabel className="mb-3 block">
                {state.title}
              </TerminalLabel>
              <p className="text-sm leading-relaxed text-foreground/75">
                {state.body}
              </p>
            </TelemetryBox>
          ))}
        </div>

        {/* Closing card — disclaimer, doors, and the record line, housed in the section's cream card family */}
        <TelemetryBox glass="light" className="theme-cream paper mt-8 p-6 sm:p-8">
          <div className="mx-auto max-w-3xl text-center">
            <SignalLine className="mx-auto" />

            <Heading
              level={2}
              className="mb-4 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              The record is the product:
            </Heading>

            <div className="mb-8 font-serif text-xl leading-snug text-foreground/85 sm:text-2xl">
              <span className="block">
                what was claimed, what was proven, what stayed open, and what was decided,
              </span>
              <span className="mt-2 block">
                kept in one place where the next reader can find it.
              </span>
            </div>

            <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg">
              ParkProof supports a disciplined decision process. It does not replace legal, engineering, environmental, title, tax, insurance, regulatory, lending, or investment professionals.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Link
                href="/parkproof-standard"
                className="inline-block border border-primary/60 bg-primary-deep px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Read the ParkProof Standard
              </Link>
              <Link
                href="/parkproof-walkthrough"
                className="inline-block border border-primary/60 px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-primary transition-colors hover:bg-primary/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                See the ParkProof Walkthrough
              </Link>
            </div>
          </div>
        </TelemetryBox>
      </Container>
    </Section>
  )
}
