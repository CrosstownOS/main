"use client"

import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel,
} from "@/components/ui/primitives"
import { cn } from "@/lib/utils"

const FRAMEWORK_STAGES = [
  {
    name: "Acquire",
    state: "current",
    stateLabel: "Being built now",
    note: "The first CrosstownOS workspace.",
  },
  {
    name: "Transition",
    state: "future",
    stateLabel: "Future direction",
    note: null,
  },
  {
    name: "Operate",
    state: "future",
    stateLabel: "Future direction",
    note: null,
  },
  {
    name: "Intelligence",
    state: "future",
    stateLabel: "Future direction",
    note: null,
  },
] as const

export default function LifecycleVision() {
  return (
    <Section
      id="lifecycle-vision"
      aria-labelledby="lifecycle-vision-heading"
      className="bg-background/70"
    >
      <Container>
        <div className="mb-12 max-w-3xl">
          <TerminalLabel className="mb-5 block">
            Long-Term System Vision
          </TerminalLabel>
          <Heading
            id="lifecycle-vision-heading"
            level={2}
            className="text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            Build the record once. Carry it through the asset lifecycle.
          </Heading>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            CrosstownOS begins with acquisition truth. Over time, the goal is a
            durable, customer-controlled record where evidence, operating
            knowledge, decisions, and accountability do not disappear at
            closing.
          </p>
        </div>

        <ol
          aria-label="Long-term CrosstownOS system framework"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {FRAMEWORK_STAGES.map((stage, index) => {
            const isCurrent = stage.state === "current"

            return (
              <li key={stage.name} className="flex items-stretch gap-2">
                <TelemetryBox
                  glass={isCurrent ? "light" : "none"}
                  className={cn(
                    "flex w-full flex-col p-5",
                    isCurrent
                      ? "border-primary/60 bg-primary/5"
                      : "border-dashed border-border/60 bg-background/30 opacity-80",
                  )}
                >
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-muted/60">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em]",
                        isCurrent
                          ? "border-primary/70 bg-primary/10 text-primary"
                          : "border-border/60 text-muted",
                      )}
                    >
                      {stage.stateLabel}
                    </span>
                  </div>

                  <Heading
                    level={3}
                    className={cn(
                      "text-xl leading-snug",
                      isCurrent ? "text-foreground" : "text-muted",
                    )}
                  >
                    {stage.name}
                  </Heading>
                  {stage.note ? (
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      {stage.note}
                    </p>
                  ) : null}
                </TelemetryBox>

                {index < FRAMEWORK_STAGES.length - 1 ? (
                  <span
                    className="hidden self-center text-border xl:block"
                    aria-hidden="true"
                  >
                    →
                  </span>
                ) : null}
              </li>
            )
          })}
        </ol>

        <p className="mt-8 border border-border/60 bg-card/50 px-5 py-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted">
          Long-term system direction—not a list of currently available modules.
        </p>
      </Container>
    </Section>
  )
}