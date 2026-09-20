"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel,
} from "@/components/ui/primitives"
import { cn } from "@/lib/utils"

const WORKFLOW_STAGES = [
  {
    id: "deal-desk",
    index: "01",
    title: "Deal Desk",
    body: "Organize the opportunity, stage, team context, and next decisions.",
  },
  {
    id: "diligence-register",
    index: "02",
    title: "Diligence Register",
    body: "Assign evidence, owners, open items, due dates, and advancement gates.",
  },
  {
    id: "documents-provenance",
    index: "03",
    title: "Documents & Provenance",
    body: "Structure broker packages and preserve document and source-page context where available.",
  },
  {
    id: "deterministic-underwriting",
    index: "04",
    title: "Deterministic Underwriting",
    body: "Make approved inputs, assumptions, financial calculations, and variance analysis visible.",
  },
  {
    id: "parkproof",
    index: "05",
    title: "ParkProof",
    body: "Produce a source-backed, human-reviewed decision file.",
  },
] as const

const DECISION_CHAIN = ["Claim", "Evidence", "Review", "Decision"] as const

const EVIDENCE_STATES = [
  { label: "Broker-reported", className: "border-accent/60 text-accent" },
  { label: "Verified", className: "border-success/60 text-success" },
  { label: "Missing evidence", className: "border-critical/60 text-critical" },
  { label: "Underwriting assumption", className: "border-primary/60 text-primary" },
  { label: "Human review required", className: "border-accent-secondary/60 text-accent-secondary" },
] as const

export default function WorkspaceCapabilities() {
  const [activeStage, setActiveStage] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const current = WORKFLOW_STAGES[activeStage]

  const selectStage = (index: number) => {
    const wrappedIndex = (index + WORKFLOW_STAGES.length) % WORKFLOW_STAGES.length
    setActiveStage(wrappedIndex)
    tabRefs.current[wrappedIndex]?.focus()
  }

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault()
      selectStage(index + 1)
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault()
      selectStage(index - 1)
    } else if (event.key === "Home") {
      event.preventDefault()
      selectStage(0)
    } else if (event.key === "End") {
      event.preventDefault()
      selectStage(WORKFLOW_STAGES.length - 1)
    }
  }

  return (
    <Section
      id="acquire"
      aria-labelledby="acquire-heading"
      className="bg-background/75"
    >
      <Container>
        <div className="mb-12 max-w-3xl">
          <TerminalLabel className="mb-5 block">
            CrosstownOS // Acquire
          </TerminalLabel>
          <Heading
            id="acquire-heading"
            level={2}
            className="mb-6 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            From scattered records to a disciplined decision.
          </Heading>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            The first CrosstownOS workspace is being built around the most consequential point in the asset lifecycle: before a buyer commits capital.
          </p>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-12">
          <div
            role="tablist"
            aria-label="CrosstownOS Acquire workflow stages"
            aria-orientation="vertical"
            className="flex flex-col gap-2 lg:col-span-4"
          >
            {WORKFLOW_STAGES.map((stage, index) => {
              const isSelected = activeStage === index

              return (
                <button
                  key={stage.id}
                  ref={(element) => {
                    tabRefs.current[index] = element
                  }}
                  id={`acquire-tab-${stage.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`acquire-panel-${stage.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setActiveStage(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={cn(
                    "group flex w-full items-start gap-4 border-l-2 p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isSelected
                      ? "border-l-primary bg-primary/10 text-foreground"
                      : "border-l-border/60 bg-background/20 text-muted hover:border-l-primary/40 hover:bg-card/60 hover:text-foreground",
                  )}
                >
                  <span
                    className={cn(
                      "pt-0.5 font-mono text-[10px] tracking-[0.2em]",
                      isSelected ? "text-primary" : "text-muted/50",
                    )}
                  >
                    {stage.index}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-sans text-sm font-bold tracking-tight">
                      {stage.title}
                    </span>
                    <span className="mt-1 block font-mono text-[9px] uppercase tracking-[0.16em] text-muted/70">
                      Workflow stage
                    </span>
                  </span>
                </button>
              )
            })}
          </div>

          <div className="lg:col-span-8">
            <TelemetryBox
              key={current.id}
              id={`acquire-panel-${current.id}`}
              role="tabpanel"
              aria-labelledby={`acquire-tab-${current.id}`}
              glass="heavy"
              className="flex min-h-[430px] flex-col p-6 sm:p-8"
            >
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-5">
                <div>
                  <TerminalLabel className="mb-3 block">
                    Stage {current.index} / 05
                  </TerminalLabel>
                  <Heading level={3} className="text-2xl sm:text-3xl">
                    {current.title}
                  </Heading>
                </div>
                <span className="border border-border/60 bg-background/50 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted">
                  Conceptual workflow.
                </span>
              </div>

              <p className="max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
                {current.body}
              </p>

              <div className="mt-auto pt-8">
                <TerminalLabel className="mb-3 block text-muted">
                  Decision Chain
                </TerminalLabel>
                <ol
                  aria-label="Claim evidence review decision chain"
                  className="grid gap-2 sm:grid-cols-4"
                >
                  {DECISION_CHAIN.map((step, index) => (
                    <li key={step} className="relative">
                      <div className="border border-border/60 bg-background/40 px-3 py-3 text-center font-mono text-[9px] uppercase tracking-[0.18em] text-foreground">
                        {step}
                      </div>
                      {index < DECISION_CHAIN.length - 1 ? (
                        <span
                          className="absolute -right-2 top-1/2 hidden -translate-y-1/2 text-border sm:block"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      ) : null}
                    </li>
                  ))}
                </ol>

                <TerminalLabel className="mb-3 mt-7 block text-muted">
                  Evidence States
                </TerminalLabel>
                <ul className="flex flex-wrap gap-2" aria-label="Evidence state labels">
                  {EVIDENCE_STATES.map((state) => (
                    <li
                      key={state.label}
                      className={cn(
                        "border bg-background/40 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em]",
                        state.className,
                      )}
                    >
                      {state.label}
                    </li>
                  ))}
                </ul>
              </div>
            </TelemetryBox>
          </div>
        </div>
      </Container>
    </Section>
  )
}