"use client"

import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel,
} from "@/components/ui/primitives"
import { OPEN_DESIGN_PARTNER_EVENT } from "@/components/ui/navigation"

const RECEIVE_ITEMS = [
  "Founder-supported private CrosstownOS // Acquire workflow",
  "Structured secure organization of acquisition materials",
  "Diligence register",
  "Clear separation of verified facts, broker-reported data, missing evidence, and underwriting assumptions",
  "Source-linked context where available",
  "Water/sewer capacity-risk workflow",
  "Deterministic underwriting",
  "Human-reviewed ParkProof decision-file draft",
  "Direct influence over V1 product direction",
] as const

const ASK_ITEMS = [
  "Real broker package or active diligence materials after fit review",
  "Kickoff conversation and one structured feedback session",
  "Honest feedback",
  "Conversion discussion after pilot",
] as const

const TIMELINE_STEPS = [
  "Request access",
  "Fit and live-deal review",
  "Confidentiality and secure intake",
  "Workflow runs alongside existing diligence",
  "ParkProof review",
  "Feedback and next-step conversation",
] as const

export default function DesignPartner() {
  const openDesignPartnerForm = () => {
    window.dispatchEvent(
      new CustomEvent(OPEN_DESIGN_PARTNER_EVENT, {
        detail: { source: "design-partner-section" },
      }),
    )
  }

  return (
    <Section
      id="design-partner"
      aria-labelledby="design-partner-heading"
      className="bg-primary/5"
    >
      <Container>
        <TelemetryBox glass="heavy" className="border-primary/50 p-6 sm:p-8 lg:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
            <div>
              <TerminalLabel className="mb-5 block">
                Limited Design-Partner Cohort
              </TerminalLabel>
              <Heading
                id="design-partner-heading"
                level={2}
                className="mb-6 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
              >
                Help shape the acquisition system you wish existed.
              </Heading>
              <p className="mb-8 text-base leading-relaxed text-muted sm:text-lg">
                CrosstownOS is preparing for a limited founder-supported design-partner program for active RV/MHC acquisition teams with a live or near-term opportunity.
              </p>

              <button
                type="button"
                onClick={openDesignPartnerForm}
                aria-haspopup="dialog"
                className="border border-primary/60 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Request Design Partner Access
              </button>

              <p className="mt-5 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted">
                Early access is limited. We review each request personally.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-border/60 bg-background/40 p-5">
                <TerminalLabel className="mb-5 block">
                  What You Receive
                </TerminalLabel>
                <ul className="space-y-3">
                  {RECEIVE_ITEMS.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-border/60 bg-background/40 p-5">
                <TerminalLabel variant="alert" className="mb-5 block">
                  What Crosstown Asks
                </TerminalLabel>
                <ul className="space-y-3">
                  {ASK_ITEMS.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                      <span className="mt-2 h-1.5 w-1.5 flex-none bg-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 border-t border-border/60 pt-8">
            <TerminalLabel className="mb-5 block text-muted">
              Design-Partner Sequence
            </TerminalLabel>
            <ol className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
              {TIMELINE_STEPS.map((step, index) => (
                <li key={step} className="border border-border/60 bg-background/40 p-4">
                  <span className="mb-3 block font-mono text-[10px] tracking-[0.22em] text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium leading-relaxed text-foreground">
                    {step}
                  </span>
                </li>
              ))}
            </ol>

<div className="mt-8 flex justify-center border-t border-border/60 pt-8">
  <button
    type="button"
    onClick={openDesignPartnerForm}
    aria-haspopup="dialog"
    className="w-full border border-primary/60 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:w-auto"
  >
    Request Design Partner Access
  </button>
</div>

<p className="mx-auto mt-6 max-w-4xl text-center text-xs leading-relaxed text-muted">
  Submitting this form does not create an advisory, agency, investment, financing, brokerage, or transaction relationship.
</p>
          </div>
        </TelemetryBox>
      </Container>
    </Section>
  )
}