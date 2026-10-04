"use client"

import {
  Container,
  Heading,
  Section,
  TelemetryBox,
  TerminalLabel,
} from "@/components/ui/primitives"
import { SOURCE_SENTENCE } from "@/lib/source-copy"

const MODULES = [
  {
    name: "Source",
    color: "#4A90D9",
    family: "Know it",
    tagline: "What the outside world says before you arrive.",
    body: SOURCE_SENTENCE,
  },
  {
    name: "Field",
    color: "#D97706",
    family: "Take it",
    tagline: "What the asset reveals when you are physically there.",
    body: "Field captures what you see when you get there. Photos, notes, and observations from the site walk are tied to the deal and held as unreviewed evidence until a person reviews them. Captured is not verified.",
  },
  {
    name: "Acquire",
    color: "#00468B",
    family: "Know it",
    tagline: "What either stream means before you commit capital.",
    body: "Acquire organizes what either stream means before you make the decision. The diligence register, evidence states, capacity gates, and deterministic underwriting feed the ParkProof decision file. CrosstownOS organizes the record. You own the decision.",
  },
] as const

export default function ProductLoop() {
  return (
    <Section
      id="product"
      aria-labelledby="product-heading"
    >
      <Container>
        <div className="mb-12 max-w-3xl">
          <TerminalLabel className="mb-5 block">
            Source + Field + Acquire
          </TerminalLabel>
          <Heading
            id="product-heading"
            level={2}
            className="mb-6 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            One asset record. Before you arrive, while you walk, and before you decide.
          </Heading>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {MODULES.map((module) => (
            <TelemetryBox
              key={module.name}
              glass="light"
              className="theme-cream paper flex h-full flex-col p-6"
              style={{ borderTop: `2px solid ${module.color}` }}
            >
              <div className="mb-5 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 flex-none"
                    style={{ backgroundColor: module.color }}
                    aria-hidden="true"
                  />
                  <Heading level={3} className="text-xl">
                    {module.name}
                  </Heading>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                  {module.family}
                </span>
              </div>
              <p className="mb-4 font-sans text-sm font-bold tracking-tight text-foreground">
                {module.tagline}
              </p>
              <p className="text-sm leading-relaxed text-foreground/75">
                {module.body}
              </p>
            </TelemetryBox>
          ))}
        </div>
      </Container>
    </Section>
  )
}
