"use client"

import { useState, type FormEvent } from "react"
import Image from "next/image"
import Link from "next/link"
import { Container, TerminalLabel } from "@/components/ui/primitives"

const FOOTER_LINKS = [
  { href: "/#thesis", label: "Thesis" },
  { href: "/#product", label: "Product" },
  { href: "/parkproof-standard", label: "ParkProof Standard" },
  { href: "/editorial-standards", label: "Editorial Standards" },
  { href: "/parkproof-walkthrough", label: "ParkProof Walkthrough" },
  { href: "/workspace", label: "Workspace" },
  { href: "/for-brokers-lenders", label: "Brokers & Lenders" },
  { href: "/blog", label: "Field Notes" },
  { href: "/trail-log", label: "The Trail Log" },
  { href: "/resources", label: "Resources" },
  { href: "/tools", label: "Working Papers" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
] as const

const DISCLAIMER_PARAGRAPHS = [
  "CrosstownOS provides diligence software and decision-support records for RV park and manufactured housing acquisitions. It does not provide legal, investment, tax, engineering, environmental, appraisal, title, lending, or insurance advice, and no advisory, agency, investment-advisory, or brokerage relationship is created by using the product, purchasing the workspace, or reading this site.",
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
    <footer className="relative z-10 border-t border-border/60 bg-background">
      <div className="border-b border-border/60 py-12">
        <Container className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <TerminalLabel className="mb-2 block">
              Crosstown Updates
            </TerminalLabel>
            <p className="font-sans text-xl font-bold text-foreground">
              Occasional build notes and diligence patterns. No noise.
            </p>
          </div>

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
              className="w-full border border-border/60 bg-background/50 px-4 py-3 text-sm text-foreground transition-colors placeholder:text-muted/50 focus:border-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary md:w-72"
            />
            <button
              type="submit"
              disabled={footerStatus === "loading" || footerStatus === "success"}
              className="whitespace-nowrap border border-primary/60 bg-primary px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-60"
            >
              {footerStatus === "success"
                ? "Subscribed"
                : footerStatus === "loading"
                  ? "Sending…"
                  : "Subscribe"}
            </button>
          </form>

          <div aria-live="polite" className="min-h-[1rem]">
            {footerStatus === "success" ? (
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                You are on the list.
              </p>
            ) : null}
            {footerStatus === "error" ? (
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-accent">
                Could not subscribe. Please try again.
              </p>
            ) : null}
          </div>
        </Container>
      </div>

      <div className="py-10">
        <Container className="flex flex-col items-center justify-between gap-10 lg:flex-row">
          <div className="flex items-center gap-4">
            <div className="relative h-10 w-10 flex-none overflow-hidden [clip-path:circle(50%)]">
              <Image
                src="/logo.jpg"
                alt="Crosstown logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg tracking-tight text-foreground">
                CrosstownOS
              </span>
              <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-muted">
                The Code is the System. The Dirt is the Prize.
              </span>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex flex-col items-center gap-2 text-center lg:items-end lg:text-right">
            <p className="max-w-xs text-[11px] leading-relaxed text-muted/80">
              Confidentiality and data-handling terms will apply to use of the Acquisition Workspace when it opens.
            </p>
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted/70">
              &copy; {new Date().getFullYear()} CrosstownOS
            </p>
          </div>
        </Container>
      </div>

      <div className="border-t border-border/60 py-8">
        <Container>
          <div className="mx-auto max-w-4xl space-y-4">
            {DISCLAIMER_PARAGRAPHS.map((paragraph) => (
              <p key={paragraph.slice(0, 24)} className="text-xs leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Container>
      </div>
    </footer>
  )
}