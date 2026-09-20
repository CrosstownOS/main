"use client"

import Navigation from "@/components/ui/navigation"
import Hero from "@/components/zone1/Hero"
import WorkspaceCapabilities from "@/components/zone1/WorkspaceCapabilities"
import EngagementPaths from "@/components/zone1/PlatformLinks"
import Chapter5 from "@/components/chapters/chapter5"
import Chapter7 from "@/components/chapters/chapter7"
import Thesis from "@/components/zone1/Thesis"
import FieldReality from "@/components/zone1/FieldReality"
import ParkProof from "@/components/zone1/ParkProof"
import FieldNotes from "@/components/zone1/FieldNotes"
import DesignPartner from "@/components/zone1/DesignPartner"
import LifecycleVision from "@/components/zone1/LifecycleVision"
import { releaseScroll, suppressScroll } from "@/lib/scroll-suppress"

export default function Home() {
  const scrollToMain = () => {
    const element = document.getElementById("main-content")
    if (!element) return

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let fallbackId: number | null = null

    const finishScroll = () => {
      releaseScroll()
      window.removeEventListener("scrollend", finishScroll)

      if (fallbackId) {
        window.clearTimeout(fallbackId)
        fallbackId = null
      }
    }

    suppressScroll()
    element.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    })
    element.focus({ preventScroll: true })

    window.addEventListener("scrollend", finishScroll, { once: true })
    fallbackId = window.setTimeout(finishScroll, prefersReducedMotion ? 50 : 1500)
    history.replaceState(null, "", "/")
  }

  return (
    <>
      <button
        type="button"
        onClick={scrollToMain}
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-primary/60 focus:bg-primary focus:px-4 focus:py-2 focus:font-sans focus:text-xs focus:font-bold focus:uppercase focus:tracking-widest focus:text-white focus:outline-none"
      >
        Skip to Content
      </button>

      <main
        className="relative min-h-screen w-full bg-background text-foreground"
        style={{ overflowX: "clip" }}
      >
        {/* ── UNIVERSAL FIXED BACKDROP VIDEO ── */}
        <div
          className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
          aria-hidden="true"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover opacity-[0.55]"
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-background/70 to-background/95" />
          <div className="absolute inset-0 z-20 bg-accent/10 mix-blend-color" />
        </div>

        {/* ── ANNOUNCEMENT STRIP + STICKY TOP NAVIGATION ── */}
        <Navigation />

        {/* ── SINGLE-PAGE CONTENT ── */}
        <div
          id="main-content"
          tabIndex={-1}
          className="relative flex min-h-screen w-full flex-col pt-[6.125rem] focus:outline-none"
        >
          <Hero />
          <Thesis />
          <FieldReality />
          <WorkspaceCapabilities />
          <ParkProof />
          <FieldNotes />
          <DesignPartner />

          {/* Accessible modal/drawer form layer for Design-Partner, Outpost, and Basecamp. */}
          <Chapter5 />

          <EngagementPaths />
          <LifecycleVision />

          <div
            id="footer-curtain"
            className="relative z-40 w-full border-t border-border bg-background"
          >
            <Chapter7 />
          </div>
        </div>
      </main>
    </>
  )
}