"use client"

import { useState } from "react"
import { useReveal } from "@/hooks/useReveal"
import { EvidenceStateChip } from "@/components/evidence/EvidenceStateChip"
import { cn } from "@/lib/utils"

/**
 * EvidenceStamps: the stamps pair inside beat 4 of the specimen walk
 * (J-343). One fact in two states, in the product's own black stamp
 * chip form (the site's EvidenceStateChip, as the OS record wears it).
 * Behind the Verified block, and only there, a crop of the f4-field
 * derivative stands as the ground photograph the stamp rests on; the
 * Broker-reported block carries no photograph, deliberately. No site
 * count number is printed in the pair. The pair responds to hover,
 * tap, and keyboard focus as well as scroll; reduced motion stills it.
 */
export default function EvidenceStamps() {
  const revealRef = useReveal<HTMLDivElement>()
  const [active, setActive] = useState<"broker" | "verified" | null>(null)
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  )

  const blockClass = (which: "broker" | "verified") =>
    cn(
      "border border-border bg-white p-4 text-left sm:p-5",
      reducedMotion ? "" : "transition-all duration-300 ease-out",
      active === which && "shadow-[inset_3px_0_0_var(--field)]",
      active !== null && active !== which && "opacity-70",
    )

  return (
    <div ref={revealRef}>
      <h3 className="font-serif text-xl font-bold text-foreground">
        One fact, two states.
      </h3>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div
          data-reveal-item
          tabIndex={0}
          role="button"
          aria-label="As the broker reported it: Sites, as reported. Broker-reported."
          onMouseEnter={() => setActive("broker")}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive("broker")}
          onBlur={() => setActive(null)}
          onClick={(e) => {
            e.stopPropagation()
            setActive("broker")
          }}
          onKeyDown={(e) => e.stopPropagation()}
          className={cn(blockClass("broker"), "cursor-pointer")}
        >
          <p className="font-mono text-[10px] tracking-[0.25em] text-foreground/60">
            As the broker reported it
          </p>
          <p className="mt-3 font-serif text-lg font-bold text-foreground">
            Sites: as reported
          </p>
          <p className="mt-3">
            <EvidenceStateChip state="broker-reported" />
          </p>
        </div>

        <div
          data-reveal-item
          className={cn(
            "relative overflow-hidden border border-border",
            reducedMotion ? "" : "transition-all duration-300 ease-out",
            active !== null && active !== "verified" && "opacity-70",
          )}
        >
          <picture aria-hidden="true">
            <source
              media="(max-width: 767px)"
              srcSet="/images/specimen/f4-field-phone-public.png"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/specimen/f4-field-desktop-public.png"
              alt=""
              className="absolute inset-0 h-full w-full object-cover object-[center_35%] md:object-[center_43%]"
            />
          </picture>
          <div
            tabIndex={0}
            role="button"
            aria-label="After Field stood there: Sites, as counted on the ground. Verified."
            onMouseEnter={() => setActive("verified")}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive("verified")}
            onBlur={() => setActive(null)}
            onClick={(e) => {
              e.stopPropagation()
              setActive("verified")
            }}
            onKeyDown={(e) => e.stopPropagation()}
            className={cn(
              "relative mt-36 cursor-pointer bg-white p-4 sm:p-5",
              active === "verified" && "shadow-[inset_3px_0_0_var(--field)]",
            )}
          >
            <p className="font-mono text-[10px] tracking-[0.25em] text-foreground/60">
              After Field stood there
            </p>
            <p className="mt-3 font-serif text-lg font-bold text-foreground">
              Sites: as counted on the ground
            </p>
            <p className="mt-3">
              <EvidenceStateChip state="verified" />
            </p>
          </div>
        </div>
      </div>

      <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-[0.18em] text-foreground/60">
        Six states, one language: Verified. Broker-reported. Missing evidence.
        Underwriting assumption. Calculated. Unresolved.
      </p>
    </div>
  )
}
