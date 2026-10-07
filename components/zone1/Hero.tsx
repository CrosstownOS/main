"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"
import { Heading } from "@/components/ui/primitives"

export default function Hero() {
  const shouldReduceMotion = Boolean(useReducedMotion())

  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className="relative flex min-h-[calc(100svh-6.125rem)] w-full items-center overflow-hidden bg-transparent px-6 pb-20 pt-10 text-center lg:pb-24 lg:pt-12"
    >
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.55, ease: "easeOut" }}
        className="relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center"
      >
        <div className="mb-5 overflow-hidden [clip-path:circle(50%)]">
          <Image
            src="/logo.jpg"
            alt="Crosstown logo"
            width={112}
            height={112}
            className="h-24 w-24 object-cover sm:h-28 sm:w-28"
            priority
          />
        </div>

        <Heading
          id="hero-headline"
          level={1}
          className="mb-7 max-w-4xl text-balance text-5xl leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
        >
          Know what is true before you buy.
        </Heading>

        <p className="mb-10 max-w-3xl text-balance font-sans text-lg leading-relaxed text-muted sm:text-xl">
          CrosstownOS is diligence software for RV park and manufactured
          housing buyers. One record carries your deal from the broker package,
          through the site walk, to the signed decision.
        </p>

        <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/deal-desk"
            className="border border-primary/60 bg-primary px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Bring a live deal
          </Link>
          <Link
            href="/deal-desk#how-it-works"
            className="border border-border bg-background/60 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur transition-colors hover:border-accent/70 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See how the workspace works
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
