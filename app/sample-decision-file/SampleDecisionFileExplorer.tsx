"use client"

import { useMemo, useState } from "react"
import { cn } from "@/lib/utils"

const STEPS = [
  "Start",
  "Broker package",
  "Source findings",
  "Field observations",
  "Acquire review",
  "Gates",
  "Documented posture",
] as const

const ARRIVAL_STAGES = [
  {
    label: "Package received",
    note: "The file begins with what the broker package claims.",
  },
  {
    label: "Records arrive",
    note: "Seller records arrive. Some claims gain support. Some become open items.",
  },
  {
    label: "Field walk reviewed",
    note: "Site observations are reviewed against the paper record. Captured is not verified.",
  },
  {
    label: "Human review complete",
    note: "A reviewer records what the evidence supports, what stays assumed, and what remains unresolved.",
  },
] as const

type Claim = {
  name: string
  source: string
  states: readonly string[]
  notes: readonly string[]
}

const CLAIMS: Claim[] = [
  {
    name: "Paying occupancy",
    source: "OM p. 8; rent roll; deposit records",
    states: ["Broker-reported", "Unresolved", "Unresolved", "Verified"],
    notes: [
      "The package reports 92 percent occupancy. The deposits have not been reviewed.",
      "The rent roll counts more occupied sites than the deposits support. The difference stays open.",
      "The field count supports physical occupancy, not paying occupancy. The conflict remains in the record.",
      "A reviewer reconciles the ledger and deposits. The verified claim is narrower than the package headline.",
    ],
  },
  {
    name: "Trailing twelve-month NOI",
    source: "Seller P&L; utility bills; approved model inputs",
    states: ["Broker-reported", "Unresolved", "Unresolved", "Calculated"],
    notes: [
      "The seller P&L states the number. Its expense lines have not been tested.",
      "Two expense categories do not reconcile to the records provided. The output cannot be treated as verified.",
      "The field walk adds condition notes, but condition is not an expense record. The claim stays unresolved.",
      "The model calculates from reviewed inputs and one labeled assumption. The output is Calculated, not Verified.",
    ],
  },
  {
    name: "Water and sewer capacity",
    source: "OM site summary; utility letter; field meter photo",
    states: ["Broker-reported", "Missing evidence", "Unresolved", "Verified"],
    notes: [
      "The package states municipal service for every site. No capacity record is attached.",
      "The utility letter and service records have not been received or located.",
      "The package site count and the meter record do not match. Both sources stay in the file.",
      "A reviewer reconciles the utility letter, the site count, and the field observation.",
    ],
  },
  {
    name: "Room for 20 more sites",
    source: "OM expansion note; survey; zoning record",
    states: ["Broker-reported", "Missing evidence", "Missing evidence", "Underwriting assumption"],
    notes: [
      "The package presents expansion as room to grow. No survey or zoning letter is included.",
      "Survey and zoning confirmation have not been received or located.",
      "Open land is visible on the walk. Permission to build on it is a separate claim.",
      "The buyer may model the expansion as a labeled assumption. It is not carried as a verified fact.",
    ],
  },
]

function stateClass(state: string) {
  switch (state) {
    case "Verified":
      return "border-success/60 text-success"
    case "Broker-reported":
      return "border-accent/60 text-accent"
    case "Missing evidence":
      return "border-critical/60 text-critical"
    case "Underwriting assumption":
    case "Calculated":
      return "border-primary/60 text-primary"
    default:
      return "border-border text-muted"
  }
}

function StateBadge({ state }: { state: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em]",
        stateClass(state),
      )}
    >
      {state}
    </span>
  )
}

function ScreenFooter() {
  return (
    <p className="mt-6 border-t border-border/50 pt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
      Illustrative sample / fictional park / not a live deal
    </p>
  )
}

export default function SampleDecisionFileExplorer() {
  const [activeStep, setActiveStep] = useState(0)
  const [arrivalIndex, setArrivalIndex] = useState(0)

  const activeClaimRows = useMemo(
    () =>
      CLAIMS.map((claim) => ({
        ...claim,
        state: claim.states[arrivalIndex],
        note: claim.notes[arrivalIndex],
      })),
    [arrivalIndex],
  )

  const goToStep = (index: number) => {
    setActiveStep(Math.min(Math.max(index, 0), STEPS.length - 1))
  }

  return (
    <section aria-labelledby="sample-explorer-heading" className="theme-cream paper border border-primary/40 p-5 sm:p-7">
      <div className="flex flex-col gap-4 border-b border-border/60 pb-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            Interactive walk-through / static sample
          </p>
          <h2 id="sample-explorer-heading" className="serif-display mt-2 text-2xl tracking-tight text-foreground sm:text-3xl">
            Harbor Pines, a fictional park.
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            Follow one broker package as it becomes a documented decision
            file built to the ParkProof standard. Use the steps. Open the
            review stage and watch the states change as evidence arrives.
          </p>
        </div>
        <p className="w-fit border border-critical/60 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-critical">
          Illustrative / fictional
        </p>
      </div>

      <nav aria-label="Sample decision file steps" className="mt-5">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {STEPS.map((step, index) => (
            <li key={step}>
              <button
                type="button"
                onClick={() => goToStep(index)}
                aria-current={activeStep === index ? "step" : undefined}
                className={cn(
                  "w-full border px-3 py-3 text-left font-mono text-[9px] uppercase tracking-[0.16em] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                  activeStep === index
                    ? "border-primary bg-primary text-white"
                    : "border-border bg-card text-muted hover:border-primary/50 hover:text-foreground",
                )}
              >
                <span className="block text-[8px] opacity-80">Step {index + 1}</span>
                <span className="mt-1 block leading-snug">{step}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="mt-6 border border-border bg-card p-5 text-card-foreground sm:p-7">
        {activeStep === 0 && (
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
              Start with a claim, not a conclusion.
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              Harbor Pines is invented. The park, the seller, the broker,
              the package, and every number in this walk-through are
              synthetic. The point is the record: what was claimed, where it
              came from, what state it is in, and what remains open.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                "No live deal is shown.",
                "No product screen is shown.",
                "No deal is certified here.",
              ].map((line) => (
                <p key={line} className="border border-border bg-background/40 px-4 py-3 text-sm font-semibold text-foreground">
                  {line}
                </p>
              ))}
            </div>
            <ScreenFooter />
          </div>
        )}

        {activeStep === 1 && (
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
              The broker package makes the first claims.
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              The package describes a 68-site RV park, 92 percent occupancy,
              municipal water and sewer, and room for 20 more sites. Those
              are claims with a source. They are not yet findings.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {CLAIMS.map((claim) => (
                <article key={claim.name} className="border border-border bg-background/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-sans text-base font-bold text-foreground">{claim.name}</h4>
                    <StateBadge state="Broker-reported" />
                  </div>
                  <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.16em] text-primary">
                    Source / {claim.source}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{claim.notes[0]}</p>
                </article>
              ))}
            </div>
            <ScreenFooter />
          </div>
        )}

        {activeStep === 2 && (
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
              Source gathers the record and keeps the receipts.
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              Source finds the park from public pages, listings, and public
              records. It keeps where each fact came from and hands the
              record into underwriting and Acquire. A found record is a
              lead for review, not a verification.
            </p>
            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ["Listing matched to the package", "The park identity and asking presentation are tied to the same deal record."],
                ["Public record located", "A parcel record supports the address and acreage inquiry. It does not settle permitted site count."],
                ["Utility district page found", "The service area is identified. Capacity remains a separate claim."],
                ["Permit portal searched", "No expansion permit is located in the material provided. The absence is recorded as Missing evidence."],
              ].map(([title, body]) => (
                <li key={title} className="border border-border bg-background/30 p-4">
                  <h4 className="font-sans text-base font-bold text-foreground">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </li>
              ))}
            </ul>
            <ScreenFooter />
          </div>
        )}

        {activeStep === 3 && (
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
              Field captures what the paper cannot show.
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              Field is the on-site part of the system. It captures photos,
              notes, and observations on a deal that already exists. A photo
              is evidence to review. It is not, by itself, a verified fact.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["Meter bank photographed", "The count differs from the package site count. The conflict is recorded, not resolved."],
                ["Lift station observed", "The surface condition is captured. Service records were not located in the package."],
                ["Open ground walked", "Land is present. That observation does not establish zoning, setbacks, or capacity."],
              ].map(([title, body]) => (
                <article key={title} className="border border-border bg-background/30 p-4">
                  <StateBadge state="Unresolved" />
                  <h4 className="mt-3 font-sans text-base font-bold text-foreground">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 border border-primary/40 bg-primary/5 px-4 py-3 text-sm font-semibold text-foreground">
              Captured is not verified.
            </p>
            <ScreenFooter />
          </div>
        )}

        {activeStep === 4 && (
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
              Acquire holds the claims while evidence arrives.
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              Move through the record. The claim does not change because a
              document was uploaded. It changes when evidence arrives and a
              person reviews it.
            </p>

            <div className="mt-5 grid gap-2 sm:grid-cols-2 xl:grid-cols-4" role="group" aria-label="Evidence arrival stage">
              {ARRIVAL_STAGES.map((stage, index) => (
                <button
                  key={stage.label}
                  type="button"
                  onClick={() => setArrivalIndex(index)}
                  aria-pressed={arrivalIndex === index}
                  className={cn(
                    "border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                    arrivalIndex === index
                      ? "border-primary bg-primary text-white"
                      : "border-border bg-background/40 text-muted hover:border-primary/50 hover:text-foreground",
                  )}
                >
                  <span className="block font-mono text-[9px] uppercase tracking-[0.16em]">{stage.label}</span>
                  <span className="mt-1 block text-xs leading-relaxed opacity-90">{stage.note}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 overflow-hidden border border-border">
              <div className="grid bg-background/50 px-4 py-3 font-mono text-[8px] uppercase tracking-[0.16em] text-muted md:grid-cols-[1.1fr_1fr_1.4fr_0.8fr]">
                <span>Claim</span>
                <span className="hidden md:block">Source</span>
                <span className="hidden md:block">Record at this stage</span>
                <span>State</span>
              </div>
              {activeClaimRows.map((claim) => (
                <article key={claim.name} className="grid gap-3 border-t border-border/50 px-4 py-4 md:grid-cols-[1.1fr_1fr_1.4fr_0.8fr]">
                  <h4 className="font-sans text-sm font-bold text-foreground">{claim.name}</h4>
                  <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.13em] text-primary">{claim.source}</p>
                  <p className="text-sm leading-relaxed text-muted">{claim.note}</p>
                  <StateBadge state={claim.state} />
                </article>
              ))}
            </div>
            <ScreenFooter />
          </div>
        )}

        {activeStep === 5 && (
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
              The gates stay visible until they close.
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
              A gate is a material item that can stop the deal from moving
              forward on the paper as presented. Open gates are listed, not
              buried in an appendix.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {[
                ["Water and sewer capacity", "Verified", "The utility letter, site count, and field observation reconcile after review."],
                ["Expansion entitlement", "Missing evidence", "Survey and zoning confirmation have not been received or located. This gate remains open."],
                ["Lift station service record", "Unresolved", "The Field observation is captured. Service records and condition review remain open."],
                ["NOI output", "Calculated", "The model output carries reviewed inputs and one labeled assumption. It is not displayed as a verified fact."],
              ].map(([title, state, body]) => (
                <article key={title} className="border border-border bg-background/30 p-4">
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="font-sans text-base font-bold text-foreground">{title}</h4>
                    <StateBadge state={state} />
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{body}</p>
                </article>
              ))}
            </div>
            <ScreenFooter />
          </div>
        )}

        {activeStep === 6 && (
          <div>
            <h3 className="font-sans text-xl font-bold tracking-tight text-foreground">
              The documented posture is Pause.
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              Paying occupancy and utility capacity are Verified. The NOI
              output is Calculated from reviewed inputs and a labeled
              assumption. Expansion entitlement is still Missing evidence.
              Under the standard, a gating field in Missing evidence holds
              the record at Pause.
            </p>
            <div className="mt-6 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="border border-critical/60 bg-critical/5 p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-critical">
                  Evidence-readiness label
                </p>
                <p className="serif-display mt-3 text-4xl tracking-tight text-foreground">Pause</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Pause is an evidence-readiness label. It is not a
                  recommendation, approval, or advice. The buyer owns the
                  decision.
                </p>
              </div>
              <div className="border border-border bg-background/30 p-5">
                <h4 className="font-sans text-base font-bold text-foreground">What the file now shows</h4>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  <li>Two material claims point to reviewed evidence.</li>
                  <li>One model output shows its inputs and calculation lineage.</li>
                  <li>One expansion scenario is labeled as an assumption.</li>
                  <li>One gating item remains Missing evidence and stays on the record.</li>
                </ul>
              </div>
            </div>
            <ScreenFooter />
          </div>
        )}
      </div>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => goToStep(activeStep - 1)}
          disabled={activeStep === 0}
          className="border border-border px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Previous
        </button>
        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted" aria-live="polite">
          Screen {activeStep + 1} of {STEPS.length} / illustrative
        </p>
        <button
          type="button"
          onClick={() => goToStep(activeStep + 1)}
          disabled={activeStep === STEPS.length - 1}
          className="border border-primary/60 bg-primary px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </section>
  )
}
