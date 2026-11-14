"use client"

import { useEffect, useRef, useState } from "react"
import { useReveal } from "@/hooks/useReveal"
import {
  Container,
  Heading,
  RoomStack,
  Section,
  SheetCard,
  TerminalLabel,
} from "@/components/ui/primitives"
import { cn } from "@/lib/utils"
import {
  RENT_ROLL_FIELDS,
  RENT_ROLL_REGIONS,
} from "@/components/demonstration/rent-roll-fields"

const TOTAL = RENT_ROLL_FIELDS.length

/**
 * DocumentsFieldsOut: the home page's second act (J-342), documents in
 * and fields out. The rent roll visual is a product picture and carries
 * the stacked sheets treatment; the field table is live DOM rendered
 * from rent-roll-fields.ts. Hover (desktop), tap (phone), or keyboard
 * focus on a field row lifts the row, surfaces its citation chip, and
 * highlights the matching region of the document visual in step. On
 * entering view the fields land one after another in a staged build,
 * each landing lighting its region and surfacing its citation, with a
 * running count in digits only. prefers-reduced-motion stills the build
 * to the completed state and disables the lift transition.
 */
export default function DocumentsFieldsOut() {
  const revealRef = useReveal<HTMLElement>()
  const buildRef = useRef<HTMLDivElement | null>(null)
  const [active, setActive] = useState(0)
  const [landed, setLanded] = useState(TOTAL)
  const [armed, setArmed] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const buildStarted = useRef(false)

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReducedMotion(mq.matches)
    if (mq.matches) return

    const node = buildRef.current
    if (!node || typeof IntersectionObserver === "undefined") return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || buildStarted.current) continue
          buildStarted.current = true
          setArmed(true)
          setLanded(0)
          setActive(0)
          let step = 0
          const timer = window.setInterval(() => {
            step += 1
            setLanded(step)
            setActive(step - 1)
            if (step >= TOTAL) window.clearInterval(timer)
          }, 420)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const choose = (index: number) => {
    setActive(index)
    if (armed && landed < TOTAL) setLanded(TOTAL)
  }

  const activeField = RENT_ROLL_FIELDS[active]
  const activeRegion = RENT_ROLL_REGIONS[activeField.region]

  return (
    <Section
      id="documents-fields-out"
      ref={revealRef}
      aria-labelledby="documents-fields-out-heading"
    >
      <Container>
        <div className="mb-5">
          <span aria-hidden="true" data-reveal-line className="mb-3" />
          <TerminalLabel data-reveal-stamp className="block text-primary">
            THE DATA ROOM
          </TerminalLabel>
        </div>

        <Heading
          id="documents-fields-out-heading"
          level={2}
          className="max-w-3xl text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
        >
          The documents read themselves. Every field shows its work.
        </Heading>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-foreground/80 sm:text-lg">
          Drop a rent roll, a profit and loss statement, or a purchase
          agreement into the data room, and the fields lift off the page into
          the record. Each field carries where it came from: the document, the
          page, and the place on the page. What the paper cannot support, the
          record does not invent.
        </p>
        <p className="mt-4 font-mono text-[10px] tracking-[0.25em] text-foreground/70">
          One real record, anonymized. Names and figures are changed.
        </p>

        <div ref={buildRef} className="mt-10">
          <RoomStack room="acquire">
            <SheetCard className="p-5 sm:p-8 lg:p-10">
              <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
                <figure className="card-stack card-stack-acquire stack-sheets">
                  <div className="sheet-card relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/demonstration/rent-roll-anonymized.png"
                      alt="Anonymized rent roll page"
                      width={1744}
                      height={1384}
                      className="block h-auto w-full"
                    />
                    <div
                      aria-hidden="true"
                      className={cn(
                        "pointer-events-none absolute border-2 border-[var(--acquire)] bg-[var(--acquire)]/10",
                        reducedMotion
                          ? ""
                          : "transition-all duration-300 ease-out",
                      )}
                      style={{
                        left: `${activeRegion.x}%`,
                        top: `${activeRegion.y}%`,
                        width: `${activeRegion.w}%`,
                        height: `${activeRegion.h}%`,
                      }}
                    />
                  </div>
                </figure>

                <div>
                  <div className="mb-3 flex items-baseline justify-end">
                    <span
                      aria-hidden="true"
                      className="font-mono text-sm font-bold text-foreground"
                    >
                      {landed} / {TOTAL}
                    </span>
                  </div>

                  <table className="w-full border-collapse text-left">
                    <thead>
                      <tr className="border-b border-border">
                        <th
                          scope="col"
                          className="py-2 pr-3 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60"
                        >
                          Field
                        </th>
                        <th
                          scope="col"
                          className="py-2 pr-3 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60"
                        >
                          Value
                        </th>
                        <th
                          scope="col"
                          className="py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/60"
                        >
                          From
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {RENT_ROLL_FIELDS.map((f, i) => {
                        const isActive = i === active
                        const isLanded = !armed || i < landed
                        return (
                          <tr
                            key={f.id}
                            tabIndex={0}
                            aria-label={`${f.field}: ${f.value}. From ${f.document}, page ${f.page}, ${f.place}.`}
                            onMouseEnter={() => choose(i)}
                            onFocus={() => choose(i)}
                            onClick={() => choose(i)}
                            className={cn(
                              "cursor-pointer border-b border-border/60 outline-none",
                              reducedMotion
                                ? ""
                                : "transition-all duration-300 ease-out",
                              isLanded
                                ? "translate-y-0 opacity-100"
                                : "translate-y-2 opacity-0",
                              isActive &&
                                "bg-[var(--acquire)]/10 shadow-[inset_3px_0_0_var(--acquire)]",
                            )}
                          >
                            <td className="py-2.5 pl-3 pr-3 text-sm font-semibold text-foreground">
                              {f.field}
                            </td>
                            <td className="py-2.5 pr-3 font-mono text-sm text-foreground">
                              {f.value}
                            </td>
                            <td className="py-2.5 text-sm text-foreground/70">
                              {f.document}, page {f.page}
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>

                  <div
                    aria-live="polite"
                    className="mt-4 inline-block border border-[var(--acquire)] bg-white px-3 py-2 font-mono text-xs font-bold tracking-wide text-foreground"
                  >
                    {activeField.document} · page {activeField.page} ·{" "}
                    {activeField.place}
                  </div>
                </div>
              </div>

              <p className="mt-8 border-t border-border pt-5 font-mono text-xs leading-relaxed tracking-wide text-foreground/80 sm:text-sm">
                Graded by hand against the paper: six real documents, 8,408
                field values lifted, 8,405 exact, three missed, 179 seconds of
                machine time.
              </p>
            </SheetCard>
          </RoomStack>
        </div>
      </Container>
    </Section>
  )
}
