"use client"

import {
  Container,
  Heading,
  Section,
  SheetCard,
  TerminalLabel,
} from "@/components/ui/primitives"

export default function ArizonaRule() {
  return (
    <Section
      id="arizona-rule"
      aria-labelledby="arizona-rule-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <TerminalLabel variant="alert" className="mb-5 block">
            The Arizona Rule
          </TerminalLabel>
          <Heading
            id="arizona-rule-heading"
            level={2}
            className="mb-8 text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
          >
            Dates move. Gates don&apos;t.
          </Heading>

          <div className="space-y-5 text-base leading-relaxed text-foreground/85 sm:text-lg">
            <p>
              An Arizona park. Numbers working. Every document in the data room
              checking out. A contractor walked the site and found a 1980s
              wastewater plant, skimmed by hand daily, rated for 30 to 40 pads,
              running 60. The assignment was worth $500,000. The contract was
              cancelled.
            </p>
            <p>
              The seller&apos;s story was wrong, and the questions that would
              have caught it were never asked inside a system that could hold
              the answer.
            </p>
            <p className="text-sm text-muted">
              This one is mine. I tell it because the pattern repeats.
            </p>
          </div>

          <div className="card-stack card-stack-field stack-spring mt-8">
          <SheetCard className="border-l-2 border-l-[var(--status-alert)] p-6">
            <p className="text-base leading-relaxed text-foreground/85">
              The Arizona Rule is the doctrine inside Evidens: a deal
              cannot move toward offer while capacity-gate risks remain
              unresolved, unless an authorized person explicitly waives them
              with a documented reason. The system holds the line so a deadline
              cannot quietly move it.
            </p>
          </SheetCard>
          </div>
        </div>
      </Container>
    </Section>
  )
}
