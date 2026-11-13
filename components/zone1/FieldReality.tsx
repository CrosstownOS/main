"use client"

import { useReveal } from "@/hooks/useReveal"
import {
  Container,
  Heading,
  Section,
  SheetCard,
  TerminalLabel,
} from "@/components/ui/primitives"
import { cn } from "@/lib/utils"

type TruthLayer = {
  index: string
  title: string
  body: string
  room: "source" | "field" | "acquire"
  emphasis?: boolean
}

const TRUTH_LAYERS: TruthLayer[] = [
  {
    index: "01",
    title: "Financial truth",
    body: "Rent roll, leases, collections, delinquency, concessions, reimbursements, payroll, repairs, and real expense behavior.",
    room: "acquire",
  },
  {
    index: "02",
    title: "Operational truth",
    body: "Management transition, resident files, tenant mix, POH titles, month-to-month status, policies, and ancillary income.",
    room: "source",
  },
  {
    index: "03",
    title: "Infrastructure truth",
    body: "Water, sewer, septic, lagoons, electrical, roads, drainage, capacity, deferred repairs, and physical condition.",
    room: "field",
    emphasis: true,
  },
  {
    index: "04",
    title: "Legal / ownership truth",
    body: "Title, survey, access, easements, permits, zoning, nonconforming use, ownership authority, and actual use.",
    room: "source",
  },
]

const ROOM_STACK: Record<TruthLayer["room"], string> = {
  source: "card-stack card-stack-source stack-spring",
  field: "card-stack card-stack-field stack-spring",
  acquire: "card-stack card-stack-acquire stack-spring",
}

const ROOM_INDEX: Record<TruthLayer["room"], string> = {
  source: "text-[#4a90d9]",
  field: "text-accent",
  acquire: "text-[#00468b]",
}

export default function FieldReality() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <Section
      id="field-reality"
      ref={revealRef}
      aria-labelledby="field-reality-heading"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <div className="mb-5">
              <span aria-hidden="true" data-reveal-line className="mb-3" />
              <TerminalLabel data-reveal-stamp className="block">
                Field Reality / The Problem
              </TerminalLabel>
            </div>
            <Heading
              id="field-reality-heading"
              level={2}
              className="mb-6 max-w-2xl text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              The package is not the decision.
            </Heading>
            <p className="max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              A broker package can be a useful beginning. It is not proof.
              Reported occupancy is not always paying occupancy, and T12 NOI is
              not automatically supported by collections, payroll, or utility
              reimbursements. A utility system that appears functional may
              still carry permit, maintenance, capacity, or deferred-capital
              exposure. The costly surprises sit in the gap between what was
              reported and what can actually be verified.
            </p>
          </div>
        </div>

        <div
          aria-label="Four layers of asset truth"
          className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4"
        >
          {TRUTH_LAYERS.map((layer) => (
            <div
              key={layer.title}
              data-reveal-item
              className={ROOM_STACK[layer.room]}
            >
            <SheetCard
              className={cn(
                "flex h-full flex-col p-5",
                layer.emphasis
                  ? "border-accent/50 hover:border-accent/80"
                  : "hover:border-primary/60",
              )}
            >
              <span
                className={cn(
                  "mb-5 font-mono text-[10px] tracking-[0.24em]",
                  ROOM_INDEX[layer.room],
                )}
              >
                {layer.index}
              </span>
              <Heading level={3} className="mb-4 text-xl">
                {layer.title}
              </Heading>
              <p className="text-sm leading-relaxed text-foreground/75">
                {layer.body}
              </p>
            </SheetCard>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  )
}
