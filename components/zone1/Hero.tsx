"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Heading, TerminalLabel } from "@/components/ui/primitives"
import { OPEN_DESIGN_PARTNER_EVENT } from "@/components/ui/navigation"
import { releaseScroll, suppressScroll } from "@/lib/scroll-suppress"

const HEADER_OFFSET = 104

export default function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion())

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return

    const top = Math.max(
      element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      0,
    )

    suppressScroll()
    window.scrollTo({
      top,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    })
    history.replaceState(null, "", `#${id}`)

    const finishScroll = () => {
      releaseScroll()
      window.removeEventListener("scrollend", finishScroll)
    }

    window.addEventListener("scrollend", finishScroll, { once: true })
    window.setTimeout(finishScroll, shouldReduceMotion ? 50 : 1500)
  }

  const openDesignPartner = () => {
    window.dispatchEvent(
      new CustomEvent(OPEN_DESIGN_PARTNER_EVENT, {
        detail: { source: "hero" },
      }),
    )
  }

  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className="relative flex min-h-[calc(100svh-6.125rem)] w-full items-center overflow-hidden bg-transparent px-6 py-20 text-center lg:py-24"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" }}
        className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center"
      >
<div className="mb-8 overflow-hidden [clip-path:circle(50%)]">
  <Image
    src="/logo.jpg"
    alt="Crosstown logo"
    width={112}
    height={112}
    className="h-24 w-24 object-cover sm:h-28 sm:w-28"
    priority
  />
</div>

        <TerminalLabel className="mb-6 tracking-[0.34em]">
          CrosstownOS // Acquire
        </TerminalLabel>

        <Heading
          id="hero-headline"
          level={1}
          className="mb-7 max-w-4xl text-balance text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
        >
          Know what is true before you buy.
        </Heading>

        <p className="mb-10 max-w-3xl text-balance font-sans text-lg leading-relaxed text-muted sm:text-xl">
          CrosstownOS helps RV park and manufactured-housing acquisition teams turn broker packages, diligence documents, operating data, and field evidence into one organized, evidence-backed workflow.
        </p>

        <div className="mb-5 flex w-full flex-col justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={() => scrollToSection("parkproof")}
            className="border border-primary/60 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Explore ParkProof
          </button>
          <button
            type="button"
            onClick={openDesignPartner}
            aria-haspopup="dialog"
            className="border border-border bg-background/60 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur transition-colors hover:border-accent/70 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Request Design Partner Access
          </button>
        </div>

        <button
          type="button"
          onClick={() => scrollToSection("acquire")}
          className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted underline decoration-border underline-offset-4 transition-colors hover:text-primary hover:decoration-primary/60 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          See how CrosstownOS works
        </button>
      </motion.div>
    </section>
  )
}