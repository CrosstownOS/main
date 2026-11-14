"use client"

import { useReveal } from "@/hooks/useReveal"
import {
  Container,
  RoomStack,
  Section,
  SheetCard,
  TerminalLabel,
} from "@/components/ui/primitives"

/**
 * WeekAfternoonBand: diligence, two ways (J-342). One white face on the
 * Acquire navy slab (whole-journey surface), two columns at desktop
 * stacked at phone; the right column carries the section's weight. The
 * band settles in stages as it enters view through the standing reveal;
 * reduced motion stills it. No numbers appear in this band at all.
 */
export default function WeekAfternoonBand() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <Section
      id="week-afternoon-band"
      ref={revealRef}
      aria-labelledby="week-afternoon-band-heading"
    >
      <Container>
        <div className="mb-5">
          <span aria-hidden="true" data-reveal-line className="mb-3" />
          <TerminalLabel
            data-reveal-stamp
            id="week-afternoon-band-heading"
            className="block text-primary"
          >
            DILIGENCE, TWO WAYS
          </TerminalLabel>
        </div>

        <RoomStack room="acquire">
          <SheetCard className="p-6 sm:p-10 lg:p-12">
            <div className="grid gap-10 md:grid-cols-2 md:gap-0">
              <div data-reveal-item className="md:pr-10 lg:pr-14">
                <h3 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
                  By hand
                </h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/70">
                  Every figure typed. Every total re-added. The transcription
                  can take days, and all that time the judgment waits behind
                  the typing.
                </p>
              </div>
              <div
                data-reveal-item
                className="border-t border-border pt-10 md:border-l md:border-t-0 md:pl-10 md:pt-0 lg:pl-14"
              >
                <h3 className="font-serif text-2xl font-bold text-[var(--acquire)] sm:text-3xl">
                  On the record
                </h3>
                <p className="mt-4 text-base leading-relaxed text-foreground">
                  The paper can be read the day it lands. The fields stand on
                  the record with their evidence attached, and the buyer's
                  hours go where they belong: to judgment.
                </p>
              </div>
            </div>
          </SheetCard>
        </RoomStack>
      </Container>
    </Section>
  )
}
