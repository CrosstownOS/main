"use client"

import { useState } from "react"
import Link from "next/link"
import { useReveal } from "@/hooks/useReveal"
import { RoomStack, SheetCard } from "@/components/ui/primitives"
import { cn } from "@/lib/utils"
import EvidenceStamps from "@/components/demonstration/EvidenceStamps"

type Room = "source" | "field" | "acquire"

interface Beat {
  n: number
  room: Room
  caption: string
  desktop?: string
  phone?: string
  alt: string
  pending?: string
}

/**
 * The walk, in the order of record (J-343). All eight beats stand in
 * this register. Two beats do not render in this ship, and the set is
 * expressly incomplete until both land:
 * - Beat 2 (the map find): J-341's f2 frames carry no public derivative;
 *   the basemap cannot paint from the bench (environment limit, proven
 *   in jobs/j-341-captures-20261113/manifest.md), so under the brief's
 *   stop conditions the beat does not build.
 * - Beat 7 (the Lead Brief): constructed here to receive frame 8
 *   (f8-brief, files named below) and renders when frame 8 lands as a
 *   follow-on commit after OS J-330 (Deploy 92), plainly at its real
 *   size, with no peak treatment.
 */
const BEATS: Beat[] = [
  {
    n: 1,
    room: "source",
    caption: "The hunt serves the park to the tray.",
    desktop: "/images/specimen/f1-tray-desktop-public.png",
    phone: "/images/specimen/f1-tray-phone-public.png",
    alt: "The specimen record standing in triage in Source, anonymized",
  },
  {
    n: 2,
    room: "source",
    caption: "On the map, where Source keeps every park it can place.",
    alt: "The specimen record on the Source park map, anonymized",
    pending: "f2-map: no public derivative (environment, J-341 manifest)",
  },
  {
    n: 3,
    room: "source",
    caption:
      "From above: the photograph the record works from, and the date it was flown.",
    desktop: "/images/specimen/f3-aerial-desktop-public.png",
    phone: "/images/specimen/f3-aerial-phone-public.png",
    alt: "The aerial photograph standing on the specimen record, anonymized",
  },
  {
    n: 4,
    room: "field",
    caption: "Walked, photographed, and stamped on the ground.",
    desktop: "/images/specimen/f4-field-desktop-public.png",
    phone: "/images/specimen/f4-field-phone-public.png",
    alt: "Field findings standing on the specimen record, anonymized",
  },
  {
    n: 5,
    room: "acquire",
    caption: "The paper lands, and the fields lift off it.",
    desktop: "/images/specimen/f5-dataroom-desktop-public.png",
    phone: "/images/specimen/f5-dataroom-phone-public.png",
    alt: "The specimen record's data room, anonymized",
  },
  {
    n: 6,
    room: "acquire",
    caption: "Every open question on one register, with its state named.",
    desktop: "/images/specimen/f6-register-desktop-public.png",
    phone: "/images/specimen/f6-register-phone-public.png",
    alt: "The specimen record's diligence register, anonymized",
  },
  {
    n: 7,
    room: "acquire",
    caption: "The Lead Brief: the deal's brief, standing on the record.",
    desktop: "/images/specimen/f8-brief-desktop-public.png",
    phone: "/images/specimen/f8-brief-phone-public.png",
    alt: "The specimen record's Lead Brief, anonymized",
    pending: "frame 8 lands after OS J-330 (Deploy 92) as a follow-on commit",
  },
  {
    n: 8,
    room: "acquire",
    caption: "ParkProof issues from the record. The buyer owns the decision.",
    desktop: "/images/specimen/f7-parkproof-desktop-public.png",
    phone: "/images/specimen/f7-parkproof-phone-public.png",
    alt: "The specimen record's ParkProof, anonymized",
  },
]

const SHIPPED_BEATS = BEATS.filter((b) => !b.pending)

function BeatCard({
  beat,
  flip,
  peak,
}: {
  beat: Beat
  flip: boolean
  peak?: boolean
}) {
  const [open, setOpen] = useState(false)
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  const toggle = () => setOpen((v) => !v)
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <div data-reveal-item>
      <RoomStack room={beat.room}>
        <SheetCard className={cn("p-5 sm:p-8", peak && "lg:p-10")}>
          <div
            role="button"
            tabIndex={0}
            aria-expanded={open}
            aria-label={beat.caption}
            onClick={toggle}
            onKeyDown={onKey}
            className="cursor-pointer outline-none"
          >
            <div className="grid items-start gap-6 md:grid-cols-2 md:gap-8">
              <figure
                className={cn(
                  `card-stack card-stack-${beat.room} stack-sheets`,
                  flip && "md:order-2",
                )}
              >
                <div className="sheet-card relative overflow-hidden">
                  <div
                    className={cn(
                      "overflow-hidden",
                      reducedMotion
                        ? ""
                        : "transition-[max-height] duration-500 ease-out",
                      open ? "max-h-none" : "max-h-[420px] sm:max-h-[520px]",
                    )}
                  >
                    <picture>
                      <source
                        media="(max-width: 767px)"
                        srcSet={beat.phone}
                      />
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={beat.desktop}
                        alt={beat.alt}
                        className="block h-auto w-full"
                        loading="lazy"
                      />
                    </picture>
                  </div>
                </div>
              </figure>

              <div className={cn(flip && "md:order-1")}>
                <p
                  className={cn(
                    "font-serif font-bold leading-snug text-foreground",
                    peak ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
                  )}
                >
                  {beat.caption}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "ml-3 inline-block align-middle text-base text-foreground/50",
                      reducedMotion
                        ? ""
                        : "transition-transform duration-300",
                      open && "rotate-180",
                    )}
                  >
                    ▾
                  </span>
                </p>
                {beat.n === 4 && (
                  <div className="mt-6">
                    <EvidenceStamps />
                  </div>
                )}
              </div>
            </div>
          </div>
        </SheetCard>
      </RoomStack>
    </div>
  )
}

/**
 * SpecimenWalk: the workspace page's centerpiece (J-343). One
 * anonymized specimen record walked through the rooms in eight beats;
 * beat 8, ParkProof, is the peak and ending, and the section closes
 * with its only link, the hand off to the ParkProof Walkthrough. This
 * ship stands expressly incomplete: beat 2 does not build (no f2
 * derivative, environment) and beat 7 renders when frame 8 lands after
 * OS J-330. Beats are operable cards (click, tap, keyboard) that open
 * to present their frame in full inside the card; reduced motion
 * stills everything to the completed state. No glow anywhere.
 */
export default function SpecimenWalk() {
  const revealRef = useReveal<HTMLElement>()

  return (
    <section
      id="specimen-walk"
      ref={revealRef}
      aria-labelledby="specimen-walk-heading"
      className="mt-24 scroll-mt-24"
    >
      <div className="max-w-3xl">
        <p
          data-reveal-stamp
          className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted"
        >
          One park, start to finish
        </p>
        <h2
          id="specimen-walk-heading"
          className="serif-display mt-3 text-3xl tracking-tight sm:text-4xl"
        >
          Walk one record through the rooms.
        </h2>
        <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-[0.25em] text-foreground/70">
          One real record, anonymized. Names and figures are changed; the work
          is exactly as it stands.
        </p>
      </div>

      <div className="mt-10 space-y-8">
        {SHIPPED_BEATS.map((beat, i) => (
          <BeatCard
            key={beat.n}
            beat={beat}
            flip={i % 2 === 1}
            peak={beat.n === 8}
          />
        ))}
      </div>

      <div data-reveal-item className="mt-10">
        <Link
          href="/parkproof-walkthrough"
          className="card-stack card-stack-acquire stack-press block"
        >
          <span className="sheet-card block p-6 text-center sm:p-8">
            <span className="font-serif text-xl font-bold text-foreground sm:text-2xl">
              This is the finished proof, walked page by page.
            </span>
            <span aria-hidden="true" className="ml-3 text-foreground/50">
              →
            </span>
          </span>
        </Link>
      </div>
    </section>
  )
}
