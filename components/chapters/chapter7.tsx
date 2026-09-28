"use client"

import { useState, type FormEvent, type MouseEvent } from "react"
import Image from "next/image"
import { ArrowUpRight, Mail } from "lucide-react"
import {
  Container,
  Heading,
  Section,
  TerminalLabel,
} from "@/components/ui/primitives"
import { OPEN_DESIGN_PARTNER_EVENT } from "@/components/ui/navigation"
import { releaseScroll, suppressScroll } from "@/lib/scroll-suppress"

const HEADER_OFFSET = 104

const FOOTER_ANCHORS = [
  { id: "thesis", label: "Thesis" },
  { id: "acquire", label: "Acquire" },
  { id: "parkproof", label: "ParkProof" },
  { id: "design-partner", label: "Partners" },
  { id: "contact", label: "Contact" },
] as const

function scrollToAnchor(id: string) {
  const element = document.getElementById(id)
  if (!element) return

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const top = Math.max(element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET, 0)

  suppressScroll()
  window.scrollTo({ top, behavior: prefersReducedMotion ? "auto" : "smooth" })
  history.replaceState(null, "", `#${id}`)

  const finishScroll = () => {
    releaseScroll()
    window.removeEventListener("scrollend", finishScroll)
  }

  window.addEventListener("scrollend", finishScroll, { once: true })
  window.setTimeout(finishScroll, prefersReducedMotion ? 50 : 1500)
}

export default function Chapter7() {
  const [footerEmail, setFooterEmail] = useState("")
  const [footerStatus, setFooterStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleAnchorClick = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault()
    scrollToAnchor(id)
  }

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
    <>
      {/* FINAL CTA / CONTACT */}
      <Section
        id="contact"
        aria-labelledby="contact-heading"
        className="bg-background/70"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <TerminalLabel className="mb-5 block">
              Contact
            </TerminalLabel>
            <Heading
              id="contact-heading"
              level={2}
              className="text-balance text-3xl leading-tight sm:text-4xl lg:text-5xl"
            >
              Help build the record you wish existed.
            </Heading>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
              If you are actively reviewing an RV park or manufactured-housing
              opportunity, Crosstown wants to learn how you work, and whether
              ParkProof can help make the next decision more disciplined.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  window.dispatchEvent(
                    new CustomEvent(OPEN_DESIGN_PARTNER_EVENT, {
                      detail: { source: "final-cta" },
                    }),
                  )
                }
                className="inline-flex items-center justify-center gap-2 border border-primary/60 bg-primary px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Request Design Partner Access
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollToAnchor("paths")}
                className="inline-flex items-center justify-center gap-2 border border-border px-6 py-4 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                Find Your Path
              </button>
            </div>

            <a
              href="mailto:jeremy@crosstownosrv.camp"
              className="mt-8 inline-flex items-center gap-2 font-sans text-sm tracking-wide text-primary transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
              jeremy@crosstownosrv.camp
            </a>

            <p className="mx-auto mt-10 max-w-2xl border-t border-border/60 pt-6 text-xs leading-relaxed text-muted">
              CrosstownOS provides workflow and decision-support tools. It does
              not provide legal, engineering, environmental, title, tax,
              insurance, regulatory, lending, investment, appraisal, brokerage,
              or professional advisory services.
            </p>
          </div>
        </Container>
      </Section>

      {/* FOOTER */}
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
                  Crosstown™
                </span>
                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-muted">
                  The Code is the System. The Dirt is the Prize.
                </span>
              </div>
            </div>

            <nav aria-label="Footer">
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
                {FOOTER_ANCHORS.map((anchor) => (
                  <li key={anchor.id}>
                    <a
                      href={`#${anchor.id}`}
                      onClick={(event) => handleAnchorClick(event, anchor.id)}
                      className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                    >
                      {anchor.label}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="/blog"
                    className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    Field Notes
                  </a>
                </li>
                <li>
                  <a
                    href="/resources"
                    className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
                  >
                    Resources
                  </a>
                </li>
              </ul>
            </nav>

            <div className="flex flex-col items-center gap-2 text-center lg:items-end lg:text-right">
              <p className="max-w-xs text-[11px] leading-relaxed text-muted/80">
                Privacy and terms will be published before public document intake.
              </p>
              <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted/70">
                &copy; {new Date().getFullYear()} Crosstown
              </p>
            </div>
          </Container>
        </div>
      </footer>
    </>
  )
}