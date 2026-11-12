"use client"

import Link from "next/link"
import { useReveal } from "@/hooks/useReveal"
import {
  Container,
  Heading,
  RecordCard,
  RoomStack,
  Section,
  SheetCard,
  TerminalLabel,
} from "@/components/ui/primitives"

const LIFECYCLE = [
  { name: "Source", family: "Know it", state: "live", stateLabel: "Live", color: "#4A90D9", blurb: "Finds the park in public pages, listings, and records, and keeps where every fact came from." },
  { name: "Acquire", family: "Know it", state: "live", stateLabel: "Live", color: "#00468B", blurb: "The register, gates, and underwriting that show what is true before capital is committed." },
  { name: "Intelligence", family: "Know it", state: "direction", stateLabel: "Direction", color: "#1F2A5C", blurb: "Patterns across your deals and outcomes, carried into the next acquisition decision." },
  { name: "Field", family: "Take it", state: "live", stateLabel: "Live", color: "#D97706", blurb: "Photos, notes, and observations from the site walk, tied to the deal they belong to." },
  { name: "Close", family: "Take it", state: "direction", stateLabel: "Direction", color: "#C1272D", blurb: "Closing conditions, capital requirements, and accepted risks, documented and ready." },
  { name: "Launch", family: "Take it", state: "direction", stateLabel: "Direction", color: "#8A4B16", blurb: "The first 100 days under new ownership, from closing to stabilization." },
  { name: "Operate", family: "Hold it", state: "direction", stateLabel: "Direction", color: "#1FAA6B", blurb: "Running the park day to day against the record and thesis you bought it on." },
  { name: "Capital", family: "Hold it", state: "direction", stateLabel: "Direction", color: "#045E41", blurb: "The money behind the asset, tracked against its obligations and return expectations." },
  { name: "Exit", family: "Hold it", state: "direction", stateLabel: "Direction", color: "#C9A227", blurb: "Hold, refinance, recapitalize, or sell with the full record intact." },
] as const

type LifecycleModule = (typeof LIFECYCLE)[number]

function ModuleInterior({
  module,
  index,
  live,
}: {
  module: LifecycleModule
  index: number
  live: boolean
}) {
  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="font-mono text-[10px] tracking-[0.22em] text-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="border border-border bg-[var(--paper)] px-2 py-1 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground">
          {module.stateLabel}
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 flex-none"
          style={{ backgroundColor: module.color }}
          aria-hidden="true"
        />
        <Heading
          level={3}
          className={
            live
              ? "text-xl leading-snug"
              : "text-xl leading-snug text-foreground/85"
          }
        >
          {module.name}
        </Heading>
      </div>
      <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
        {module.family}
      </p>
      <p
        className={
          live
            ? "mt-3 text-sm leading-relaxed text-foreground/90"
            : "mt-3 text-sm leading-relaxed text-foreground/75"
        }
      >
        {module.blurb}
      </p>
    </>
  )
}

export default function LifecycleVision() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <Section
      id="lifecycle-vision"
      ref={revealRef}
      aria-labelledby="lifecycle-vision-heading"
    >
      <Container>
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <div className="mb-5">
            <span aria-hidden="true" data-reveal-line className="mx-auto mb-3" />
            <TerminalLabel data-reveal-stamp className="block">
              Long-Term System Vision
            </TerminalLabel>
          </div>
          <Heading
            id="lifecycle-vision-heading"
            level={2}
            className="text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            Know it. Take it. Hold it.
          </Heading>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            Evidens is the house, and the Acquisition Workspace is its live
            slice. The record you build to decide is the record you carry
            after you close; the deal does not end at closing, and the truth
            record should not either.
          </p>
        </div>

        <ol
          aria-label="Evidens lifecycle modules by family"
          className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
        >
          {LIFECYCLE.map((module, index) => {
            const isLive = module.state === "live"

            if (isLive) {
              return (
                <li key={module.name} data-reveal-item>
                  <RoomStack
                    room={
                      module.name.toLowerCase() as
                        | "source"
                        | "field"
                        | "acquire"
                    }
                    className="stack-spring stack-sheets h-full"
                  >
                    <SheetCard className="flex h-full flex-col p-5">
                      <ModuleInterior module={module} index={index} live />
                    </SheetCard>
                  </RoomStack>
                </li>
              )
            }

            return (
              <li key={module.name} data-reveal-item>
                <RecordCard
                  className="corners card-lift flex h-full flex-col p-5"
                  style={{ borderStyle: "dashed" }}
                >
                  <ModuleInterior module={module} index={index} live={false} />
                </RecordCard>
              </li>
            )
          })}
        </ol>

        <SheetCard className="mt-10 p-6 text-center sm:p-8">
          <p className="serif-display text-3xl leading-tight sm:text-4xl">
            The Trail Log.
          </p>
          <div className="mt-6">
            <Link
              href="/trail-log"
              className="btn-plate inline-block border border-primary/60 bg-primary-deep px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Follow the build in The Trail Log
            </Link>
          </div>
        </SheetCard>

        <SheetCard className="mt-6 p-6 text-center sm:p-8">
          <p className="serif-display text-3xl leading-tight sm:text-4xl">
            Know what is true before you buy.
          </p>
          <div className="mt-6">
            <Link
              href="/workspace"
              className="btn-plate inline-block border border-primary/60 bg-primary-deep px-7 py-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Book a walkthrough
            </Link>
          </div>
        </SheetCard>
      </Container>
    </Section>
  )
}
