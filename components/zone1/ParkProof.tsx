"use client"

import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel,
} from "@/components/ui/primitives"
import { cn } from "@/lib/utils"

const TRUTH_STATES = [
  {
    title: "Verified",
    body: "Supported by identified evidence and human review.",
    className: "border-success/60 text-success",
  },
  {
    title: "Broker-reported",
    body: "Reported in an OM, call, model, or broker package; not yet independently verified.",
    className: "border-accent/60 text-accent",
  },
  {
    title: "Missing evidence",
    body: "Material information has not been received, located, or made sufficient for review.",
    className: "border-critical/60 text-critical",
  },
  {
    title: "Underwriting assumption",
    body: "A stated input in the investment case; not a verified fact.",
    className: "border-primary/60 text-primary",
  },
] as const

const REGISTER_COLUMNS = [
  "Evidence state",
  "Source reference",
  "Risk / open item",
  "Owner",
  "Materiality",
  "Disposition",
  "Underwriting impact",
  "Review status",
] as const

const REGISTER_ROWS = [
  {
    state: "Broker-reported",
    source: "OM p. 12",
    risk: "Reported occupancy support",
    owner: "Diligence lead",
    materiality: "High",
    disposition: "Open",
    impact: "Revenue sensitivity",
    review: "Human review required",
  },
  {
    state: "Verified",
    source: "Rent roll extract",
    risk: "Collections variance",
    owner: "Underwriting lead",
    materiality: "Medium",
    disposition: "Documented",
    impact: "NOI variance",
    review: "Reviewed",
  },
  {
    state: "Missing evidence",
    source: "Utility records",
    risk: "Water/sewer capacity",
    owner: "Infrastructure reviewer",
    materiality: "High",
    disposition: "Open",
    impact: "Unknown",
    review: "Evidence requested",
  },
  {
    state: "Underwriting assumption",
    source: "Approved input",
    risk: "Stabilized expense input",
    owner: "Underwriting lead",
    materiality: "Medium",
    disposition: "Assumption documented",
    impact: "NOI / DSCR sensitivity",
    review: "Approved input",
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
  return (
    <Section
      id="parkproof"
      aria-labelledby="parkproof-heading"
      className="bg-background/80"
    >
      <Container>
        {/* Row 1 — header: headline left, body right */}
        <div className="mb-12 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <div>
            <TerminalLabel className="mb-5 block">
              The Initial Decision Artifact
            </TerminalLabel>
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
              ParkProof is the source-backed, human-reviewed output of CrosstownOS // Acquire. It is designed to help a team see—not merely store—what is verified, broker-reported, missing, assumed, unresolved, or material to the decision.
            </p>
          </div>
        </div>

        {/* Row 2 — full-width conceptual decision file */}
        <TelemetryBox glass="heavy" className="border-primary/40 p-5 sm:p-6">
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-4">
            <TerminalLabel className="block">
              ParkProof / Decision File
            </TerminalLabel>
            <span className="border border-border/60 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
              Conceptual example
            </span>
          </div>

          <div
            className="overflow-x-auto"
            role="region"
            aria-label="ParkProof decision file conceptual example"
            tabIndex={0}
          >
            <table className="w-full min-w-[980px] border-collapse text-left">
              <caption className="sr-only">
                Conceptual ParkProof decision file with evidence state, source reference, risk, owner, materiality, disposition, underwriting impact, and review status.
              </caption>
              <thead>
                <tr className="border-b border-border/60">
                  {REGISTER_COLUMNS.map((column) => (
                    <th
                      key={column}
                      scope="col"
                      className="px-3 py-3 font-mono text-[8px] font-normal uppercase tracking-[0.16em] text-muted"
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {REGISTER_ROWS.map((row) => (
                  <tr key={`${row.state}-${row.risk}`} className="border-b border-border/40 transition-colors last:border-b-0 hover:bg-primary/5">
                    <td className="px-3 py-4">
                      <span
                        className={cn(
                          "inline-block border bg-background/40 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em]",
                          getStateClass(row.state),
                        )}
                      >
                        {row.state}
                      </span>
                    </td>
                    <td className="px-3 py-4 font-mono text-[10px] text-foreground">{row.source}</td>
                    <td className="px-3 py-4 text-xs leading-relaxed text-foreground">{row.risk}</td>
                    <td className="px-3 py-4 text-xs text-foreground/70">{row.owner}</td>
                    <td className="px-3 py-4 text-xs text-foreground/70">{row.materiality}</td>
                    <td className="px-3 py-4 text-xs text-foreground/70">{row.disposition}</td>
                    <td className="px-3 py-4 text-xs text-foreground/70">{row.impact}</td>
                    <td className="px-3 py-4 text-xs text-foreground/70">{row.review}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </TelemetryBox>

        {/* Row 3 — four truth states, full width */}
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {TRUTH_STATES.map((state) => (
            <TelemetryBox key={state.title} glass="light" className={cn("p-5", state.className)}>
              <TerminalLabel className="mb-3 block">
                {state.title}
              </TerminalLabel>
              <p className="text-sm leading-relaxed text-foreground/75">
                {state.body}
              </p>
            </TelemetryBox>
          ))}
        </div>

        {/* Row 4 — guardrails, side by side */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <TelemetryBox status="alert" glass="light" className="p-5">
            <TerminalLabel variant="alert" className="mb-3 block">
              Not Binary
            </TerminalLabel>
            <p className="text-sm leading-relaxed text-foreground/75">
              An uploaded document or completed inspection is not automatically a resolved risk. The record should preserve evidence, scope, date, limitations, reviewer judgment, and any remaining disposition.
            </p>
          </TelemetryBox>

          <TelemetryBox glass="heavy" className="border-primary/40 p-5">
            <TerminalLabel className="mb-3 block">
              Scope Boundary
            </TerminalLabel>
            <p className="text-sm leading-relaxed text-foreground/75">
              ParkProof supports a disciplined decision process. It does not replace legal, engineering, environmental, title, tax, insurance, regulatory, lending, or investment professionals.
            </p>
          </TelemetryBox>
        </div>
      </Container>
    </Section>
  )
}