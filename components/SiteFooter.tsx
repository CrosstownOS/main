"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container, TerminalLabel } from "@/components/ui/primitives"
import SuccessState from "@/components/SuccessState"

const FOOTER_LINKS = [
  { href: "/parkproof-standard", label: "ParkProof Standard" },
  { href: "/editorial-standards", label: "Editorial Standards" },
  { href: "/parkproof-walkthrough", label: "ParkProof Walkthrough" },
  { href: "/workspace", label: "Workspace" },
  { href: "/pricing", label: "Pricing" },
  { href: "/for-brokers-lenders", label: "Brokers & Lenders" },
  { href: "/blog", label: "Field Notes" },
  { href: "/trail-log", label: "The Trail Log" },
  { href: "/resources", label: "Resources" },
  { href: "/tools", label: "Working Papers" },
  { href: "/checklist", label: "Diligence Checklist" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
] as const

const DISCLAIMER_PARAGRAPHS = [
  "Evidens provides diligence software and decision-support records for RV park and manufactured housing acquisitions. It does not provide legal, investment, tax, engineering, environmental, appraisal, title, lending, or insurance advice, and no advisory, agency, investment-advisory, or brokerage relationship is created by using the product, purchasing the workspace, or reading this site.",
  "The buyer is solely responsible for all investment decisions and for engaging qualified professionals to review diligence outputs before committing capital. ParkProof organizes the buyer's documented posture from reviewed evidence, unresolved gates, and approved assumptions. It does not certify the deal, verify the property, or guarantee any investment outcome.",
] as const

export default function SiteFooter() {
  const [footerEmail, setFooterEmail] = useState("")
  const [footerStatus, setFooterStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleFooterSubscribe = async (event: FormEvent) => {
    event.preventDefault()
    setFooterStatus("loading")

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: footerEmail.trim() }),
      })

      if (res.ok) {
        import("@vercel/analytics").then(({ track }) => track("footer_subscribe"))
        setFooterStatus("success")
        setFooterEmail("")
      } else {
        setFooterStatus("error")
      }
    } catch {
      setFooterStatus("error")
    }
  }

  return (
    <footer className="relative z-10 overflow-hidden border-t border-[#f7efda]/30 text-[#f7efda]">
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: "url(/footer-tiedye-portrait.png)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0 hidden bg-cover bg-center md:block"
        style={{ backgroundImage: "url(/footer-tiedye.png)" }}
      />
      <div aria-hidden className="absolute inset-0 bg-[#141923]/35" />
      <div className="relative border-b border-[#f7efda]/25 py-12">
        <Container className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <TerminalLabel className="mb-2 block font-bold text-[#f7efda]">
              Evidens Updates
            </TerminalLabel>
            <p className="font-sans text-xl font-bold text-[#f7efda]">
              Occasional build notes and diligence patterns. No noise.
            </p>
          </div>

          {footerStatus === "success" ? (
            <SuccessState
              eyebrow="Evidens Updates"
              title="You are on the list."
              body="Occasional build notes and diligence patterns. No noise."
              door={{ href: "/blog", label: "Read the Field Notes" }}
              className="w-full md:max-w-md"
            />
          ) : (
          <form
            onSubmit={handleFooterSubscribe}
            className="flex w-full flex-col gap-3 sm:flex-row md:w-auto"
          >
            <label htmlFor="footer-subscribe-email" className="sr-only">
              Email address
            </label>
            <input
              id="footer-subscribe-email"
              type="email"
              value={footerEmail}
              onChange={(event) => setFooterEmail(event.target.value)}
              placeholder="your@email.com"
              required
              autoComplete="email"
              className="w-full border border-[#141923]/25 bg-[#f7efda] px-4 py-3 text-sm text-[#141923] transition-colors placeholder:text-[#141923]/45 focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary md:w-72"
            />
            <button
              type="submit"
              disabled={footerStatus === "loading"}
              className="btn-press whitespace-nowrap border border-primary/60 bg-primary px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
            >
              {footerStatus === "loading" ? "Sending…" : "Subscribe"}
            </button>
          </form>
          )}

          <div aria-live="polite" className="min-h-[1rem]">
            {footerStatus === "error" ? (
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-[#f7efda]">
                Could not subscribe. Please try again.
              </p>
            ) : null}
          </div>
        </Container>
      </div>

      <div className="relative py-10">
        <Container className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="relative aspect-[2416/622] h-16 flex-none overflow-hidden sm:h-20 lg:h-24">
              <Image
                src="/logo-fused-on-ink.png"
                alt="Evidens"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-white">
              The Code is the System. The Dirt is the Prize.
            </span>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block bg-[#141923]/30 px-2.5 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-[#f7efda] shadow-[inset_0_0_0_1px_rgba(247,239,218,0.35)] transition-colors hover:bg-[#141923]/60 hover:text-white hover:shadow-[inset_0_0_0_1px_rgba(247,239,218,0.65),inset_0_-2px_0_0_#de7004] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#f7efda]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-2 text-center lg:items-end lg:text-right">
            <p className="max-w-xs text-[11px] leading-relaxed text-[#f7efda]/85">
              Confidentiality and data-handling terms will apply to use of the Acquisition Workspace when it opens.
            </p>
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#f7efda]/70">
              &copy;{' '}{new Date().getFullYear()}{' '}Evidens
            </p>
          </div>
        </Container>
      </div>

      <div className="relative border-t border-[#f7efda]/25 py-8 pb-24 md:pb-8">
        <Container>
          <div className="mx-auto max-w-4xl space-y-4">
            {DISCLAIMER_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-xs leading-relaxed text-[#f7efda]/80">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  )
}