"use client"

import Image from "next/image"
import Link from "next/link"
import { motion, useReducedMotion } from "framer-motion"

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

        <h1
          id="hero-headline"
          className="mb-7 max-w-4xl text-balance font-serif text-5xl font-black leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
        >
          Know what is true before you buy.
        </h1>

        <motion.span
          aria-hidden="true"
          initial={{ scaleX: shouldReduceMotion ? 1 : 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.4,
            delay: shouldReduceMotion ? 0 : 0.7,
            ease: "easeOut",
          }}
          style={{ transformOrigin: "left center" }}
          className="mb-7 block h-0.5 w-12 bg-[#3a86f2]"
        />

        <p className="mb-10 max-w-3xl text-balance font-sans text-lg leading-relaxed text-muted sm:text-xl">
          CrosstownOS is diligence software for RV park and manufactured
          housing buyers. One record carries your deal from the broker package,
          through the site walk, to the signed decision.
        </p>

        <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/workspace"
            className="border border-primary/60 bg-primary-deep px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See the plans
          </Link>
          <Link
            href="/workspace#how-it-works"
            className="border border-border bg-background/60 px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground backdrop-blur transition-colors hover:border-accent/70 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See how the workspace works
          </Link>
        </div>
      </motion.div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 border-b border-border" />
    </section>
  )
}
