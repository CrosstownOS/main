"use client"

import { useReveal } from "@/hooks/useReveal"
import {
  Container,
  Heading,
  RoomStack,
  Section,
  SheetCard,
  TerminalLabel,
} from "@/components/ui/primitives"

/**
 * RegistryBand: the registry weight, set with the map hero (J-342).
 * One white face on the Source blue slab. The two registry figures are
 * the section's big figures; no counter animation, no ticker, nothing
 * implying a live feed (the demonstration plan's express bar). The band
 * takes the standing reveal as its motion.
 */
export default function RegistryBand() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <Section
      id="registry-band"
      ref={revealRef}
      aria-labelledby="registry-band-heading"
    >
      <Container>
        <div className="mb-5">
          <span aria-hidden="true" data-reveal-line className="mb-3" />
          <TerminalLabel data-reveal-stamp className="block text-primary">
            THE SOURCE REGISTRY
          </TerminalLabel>
        </div>

        <RoomStack room="source">
          <SheetCard className="p-6 sm:p-10 lg:p-12">
            <Heading
              id="registry-band-heading"
              level={2}
              className="text-balance leading-[1.05]"
            >
              <span className="block">
                <span className="text-6xl sm:text-7xl lg:text-8xl">61,296</span>{" "}
                <span className="text-3xl sm:text-4xl lg:text-5xl">
                  parks on record.
                </span>
              </span>
              <span className="mt-2 block">
                <span className="text-6xl sm:text-7xl lg:text-8xl">56,094</span>{" "}
                <span className="text-3xl sm:text-4xl lg:text-5xl">
                  of them mapped.
                </span>
              </span>
            </Heading>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              Each one carried as a record a buyer can open, check against the
              evidence, and work. The registry is the front door of the
              Acquisition Workspace.
            </p>
          </SheetCard>
        </RoomStack>
      </Container>
    </Section>
  )
}
