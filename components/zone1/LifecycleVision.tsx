"use client"

import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel,
} from "@/components/ui/primitives"
import { cn } from "@/lib/utils"

const LIFECYCLE = [
  { name: "Source", family: "Know it", state: "november", stateLabel: "Opens November 2026", color: "#4A90D9", blurb: "Finds the park in public pages, listings, and records, and keeps where every fact came from." },
  { name: "Acquire", family: "Know it", state: "november", stateLabel: "Opens November 2026", color: "#00468B", blurb: "The register, gates, and underwriting that show what is true before capital is committed." },
  { name: "Intelligence", family: "Know it", state: "direction", stateLabel: "Direction", color: "#1F2A5C", blurb: "Patterns across your deals and outcomes, carried into the next acquisition decision." },
  { name: "Field", family: "Take it", state: "november", stateLabel: "Opens November 2026", color: "#D97706", blurb: "Photos, notes, and observations from the site walk, tied to the deal they belong to." },
  { name: "Close", family: "Take it", state: "direction", stateLabel: "Direction", color: "#C1272D", blurb: "Closing conditions, capital requirements, and accepted risks, documented and ready." },
  { name: "Launch", family: "Take it", state: "direction", stateLabel: "Direction", color: "#8A4B16", blurb: "The first 100 days under new ownership, from closing to stabilization." },
  { name: "Operate", family: "Hold it", state: "direction", stateLabel: "Direction", color: "#1FAA6B", blurb: "Running the park day to day against the record and thesis you bought it on." },
  { name: "Capital", family: "Hold it", state: "direction", stateLabel: "Direction", color: "#045E41", blurb: "The money behind the asset, tracked against its obligations and return expectations." },
  { name: "Exit", family: "Hold it", state: "direction", stateLabel: "Direction", color: "#C9A227", blurb: "Hold, refinance, recapitalize, or sell with the full record intact." },
] as const

export default function LifecycleVision() {
  return (
    <Section
      id="lifecycle-vision"
      aria-labelledby="lifecycle-vision-heading"
      className="theme-cream"
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
            Know it. Take it. Hold it.
          </Heading>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            CrosstownOS is built in three families: KNOW (Source, Acquire,
            Intelligence), TAKE (Field, Close, Launch), HOLD (Operate,
            Capital, Exit). Opens November 2026: Source + Field + Acquire.
            Lifecycle extensions are the direction of the system. The record
            you build to decide is the record you carry after you close; the
            deal does not end at closing, and the truth record should not
            either.
          </p>
        </div>

        <ol
          aria-label="CrosstownOS lifecycle modules by family"
          className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
        >
          {LIFECYCLE.map((module, index) => {
            const isNovember = module.state === "november"

            return (
              <li key={module.name}>
                <TelemetryBox
                  glass={isNovember ? "light" : "none"}
                  className={cn(
                    "flex h-full flex-col p-5",
                    isNovember
                      ? ""
                      : "border-dashed border-border bg-card",
                  )}
                  style={
                    isNovember
                      ? {
                          backgroundColor: `${module.color}29`,
                          borderColor: `${module.color}80`,
                          borderTop: `3px solid ${module.color}`,
                        }
                      : { borderTop: `2px solid ${module.color}` }
                  }
                >
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em]",
                        isNovember
                          ? "border-primary/70 bg-primary/10 text-primary"
                          : "border-border/60 text-muted",
                      )}
                    >
                      {module.stateLabel}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 flex-none"
                      style={{ backgroundColor: module.color }}
                      aria-hidden="true"
                    />
                    <Heading
                      level={3}
                      className={cn(
                        "text-xl leading-snug",
                        isNovember ? "text-foreground" : "text-foreground/85",
                      )}
                    >
                      {module.name}
                    </Heading>
                  </div>
                  <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    {module.family}
                  </p>
                  <p
                    className={cn(
                      "mt-3 text-sm leading-relaxed",
                      isNovember ? "text-foreground/90" : "text-foreground/75",
                    )}
                  >
                    {module.blurb}
                  </p>
                </TelemetryBox>
              </li>
            )
          })}
        </ol>

        <p className="mt-8 border border-border/60 bg-card/50 px-5 py-4 font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted">
          Opens November 2026: Source + Field + Acquire.
        </p>
      </Container>
    </Section>
  )
}
