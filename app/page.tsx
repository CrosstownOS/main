"use client"

import Navigation from "@/components/ui/navigation"
import Hero from "@/components/zone1/Hero"
import ProductLoop from "@/components/zone1/ProductLoop"
import EngagementPaths from "@/components/zone1/PlatformLinks"
import Chapter5 from "@/components/chapters/chapter5"
import Chapter7 from "@/components/chapters/chapter7"
import Thesis from "@/components/zone1/Thesis"
import FieldReality from "@/components/zone1/FieldReality"
import ParkProof from "@/components/zone1/ParkProof"
import FieldNotes from "@/components/zone1/FieldNotes"
import DealDeskPromo from "@/components/zone1/DealDeskPromo"
import LifecycleVision from "@/components/zone1/LifecycleVision"

export default function Home() {
  return (
    <>
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
          <ProductLoop />
          <ParkProof />
          <FieldNotes />
          {/* Legacy inbound links to /#design-partner land on the Deal Desk
              promo, the successor to the retired design-partner section. */}
          <span
            id="design-partner"
            aria-hidden="true"
            className="block scroll-mt-28"
          />
          <DealDeskPromo />

          {/* Accessible modal/drawer form layer for Founding Network, Referral Alliance, and General. */}
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
