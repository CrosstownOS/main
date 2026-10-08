"use client"

import { useEffect, useRef } from "react"
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
import WorkingPapers from "@/components/zone1/WorkingPapers"
import DealDeskPromo from "@/components/zone1/DealDeskPromo"
import LifecycleVision from "@/components/zone1/LifecycleVision"
import QuietCta from "@/components/QuietCta"

const HOME_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CrosstownOS",
  url: "https://www.crosstownosrv.camp",
  description:
    "Acquisition intelligence and diligence software for RV park and manufactured housing buyers. Know what is true before you buy.",
  founder: { "@type": "Person", name: "Jeremy Cross" },
}

const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "CrosstownOS",
  url: "https://www.crosstownosrv.camp",
}

export default function Home() {
  const videoRef = useRef<HTMLVideoElement | null>(null)

  // Pause the hero backdrop video while the tab is hidden; resume on return.
  // Transform/opacity-free: no animation state lives in React.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onVisibilityChange = () => {
      if (document.hidden) {
        video.pause()
      } else {
        video.play().catch(() => {})
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange)
    return () => document.removeEventListener("visibilitychange", onVisibilityChange)
  }, [])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(HOME_JSON_LD) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
      />
      {/* ── FIXED NAVIGATION: outside <main> so overflow-x: clip doesn't break fixed positioning ── */}
      <Navigation />

      {/* ── QUIET CTA: slides up after the hero scrolls out of view ── */}
      <QuietCta />

      <main id="main"
        className="relative min-h-screen w-full bg-background text-foreground"
        style={{ overflowX: "clip" }}
      >
        {/* ── UNIVERSAL FIXED BACKDROP VIDEO ── */}
        <div
          className="pointer-events-none fixed inset-0 z-0 h-full w-full overflow-hidden"
          aria-hidden="true"
        >
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="/images/bg-poster.jpg"
            className="ken-burns h-full w-full object-cover opacity-[0.55]"
          >
            <source src="/bg.mp4" type="video/mp4" />
          </video>
          <img
            src="/images/opengraph.jpg"
            alt=""
            className="h-full w-full object-cover opacity-[0.55] md:hidden"
          />

          <div className="absolute inset-0 z-10 bg-gradient-to-b from-background/30 via-background/70 to-background/95" />
        </div>



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
          <WorkingPapers />
          {/* Legacy inbound links to /#design-partner land on the Deal Desk
              promo, the successor to the retired design-partner section. */}
          <span
            id="design-partner"
            aria-hidden="true"
            className="block scroll-mt-28"
          />
          <DealDeskPromo />

          {/* Accessible modal/drawer form layer for Field Network, Referral Alliance, and General. */}
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
