import type { CSSProperties } from "react"
import Image from "next/image"
import Link from "next/link"

/**
 * Hero, server component. The video backdrop is retired (founder ruling,
 * 2026-11-11): the hero stands on the cream ground, the header carries the
 * lifecycle lockup, and the one visual is a true product screenshot in a
 * sheet frame. The entrance fade and the signal-line draw are pure CSS
 * animations (.hero-enter / .hero-signal-line in app/globals.css): no
 * client JS, no framer-motion. prefers-reduced-motion resolves both to
 * their final state instantly.
 */
export default function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-headline"
      className="relative flex w-full items-center overflow-hidden bg-transparent px-6 pb-20 pt-10 text-center lg:pb-24 lg:pt-12"
    >
      <div className="hero-enter relative z-20 mx-auto flex w-full max-w-5xl flex-col items-center">
        <h1
          id="hero-headline"
          className="mb-7 max-w-4xl text-balance font-serif text-5xl font-black leading-[1.02] text-foreground sm:text-6xl lg:text-7xl"
        >
          Know what is true before you buy.
        </h1>

        <span
          aria-hidden="true"
          className="hero-signal-line mb-7 block h-0.5 w-12 bg-primary"
        />

        <p className="mb-10 max-w-3xl text-balance font-sans text-lg leading-relaxed text-muted sm:text-xl">
          Evidens is diligence software for RV park and manufactured
          housing buyers. One record carries your deal from the broker package,
          through the site walk, to the signed decision.
        </p>

        <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/workspace"
            style={{ "--press-color": "var(--acquire)" } as CSSProperties}
            className="btn-plate border border-primary/60 bg-primary-deep px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Apply for a pilot place
          </Link>
          <Link
            href="/workspace#how-it-works"
            className="btn-press border border-border bg-card px-7 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-foreground hover:border-accent/70 hover:bg-accent/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            See how the workspace works
          </Link>
        </div>

        <div className="card-stack card-stack-source stack-spring stack-sheets mt-14 w-full">
        <figure className="sheet-card w-full p-2 text-left sm:p-3">
          <div className="relative hidden aspect-[1440/1120] w-full overflow-hidden sm:block">
            <Image
              src="/images/hero-source-overview.png"
              alt="The Evidens Source overview: the Library, your Tray, and the deal in Acquire on one record, with the Feed naming each arrival and where it came from."
              fill
              sizes="(min-width: 1024px) 1024px, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:hidden">
            <Image
              src="/images/hero-source-overview-phone.png"
              alt="The Evidens Source overview on a phone: the Library, your Tray, and Acquire on one record."
              fill
              sizes="100vw"
              className="object-cover object-top"
            />
          </div>
          <figcaption className="px-2 pb-1 pt-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            Source, end to end.
          </figcaption>
        </figure>
        </div>
      </div>
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 z-20 border-b border-border" />
    </section>
  )
}
