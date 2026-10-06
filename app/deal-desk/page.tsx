import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import DealDeskForm from "@/components/DealDeskForm"
import ToolContextLine from "@/components/ToolContextLine"
import PageBackdrop from "@/components/PageBackdrop"
import { SOURCE_SENTENCE } from "@/lib/source-copy"
import { FAQ_JSON_LD } from "@/lib/tools/faqs"

export const metadata: Metadata = {
  title: "RV Park Due Diligence Software: The Founding Deal Desk | CrosstownOS",
  description:
    "RV park due diligence for live deals. The Founding Deal Desk runs your acquisition inside CrosstownOS: diligence register, capacity gates, deterministic underwriting, and a documented decision file. $2,500 paid at acceptance.",
  alternates: { canonical: "/deal-desk" },
  openGraph: {
    title: "RV Park Due Diligence Software: The Founding Deal Desk | CrosstownOS",
    description:
      "Work your real RV park or manufactured housing acquisition inside CrosstownOS, from intake to a documented decision posture. Five buyers. One live deal each.",
    type: "website",
    url: "/deal-desk",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "The Founding Deal Desk | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "RV Park Due Diligence Software: The Founding Deal Desk | CrosstownOS",
    description:
      "Five buyers. One live deal each. $2,500 paid at acceptance, worked to a documented decision posture.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

const PAINS = [
  {
    title: "The numbers do not tie.",
    body: "The rent roll, the P&L, and the bank deposits tell three different stories, and nobody owns the reconciliation.",
  },
  {
    title: "The package never mentions the infrastructure.",
    body: "Water, sewer, electrical, and roads carry the real risk, and the broker package is silent on all of it.",
  },
  {
    title: "There is no authoritative record.",
    body: "Diligence lives in inboxes, photo folders, and memory. When the deadline moves, the truth moves with it.",
  },
] as const

const SCOPE_ITEMS = [
  "One active deal, worked inside CrosstownOS from intake to decision.",
  "Broker-package intake with provenance attached to every document.",
  "The diligence register with capacity-gate tracking across water, sewer, electrical, roads, and zoning, permits, and legal.",
  "Deterministic underwriting calculated from human-approved assumptions.",
  "Weekly Deal Desk sessions in a fixed format.",
  "A documented decision file built to the ParkProof standard.",
] as const

const HOW_IT_WORKS = [
  {
    title: "Bring the deal.",
    body: "You bring the broker package and everything you have. We build the intake record with provenance attached to every document, so every number can answer where it came from.",
  },
  {
    title: "Build the register.",
    body: "Every claim is extracted and given an evidence state: Verified, Broker-reported, Missing evidence, Underwriting assumption, Calculated, or Unresolved. Missing evidence becomes a named request with an owner and a due date. Nothing silently disappears.",
  },
  {
    title: "Walk it with Field.",
    body: "On the site walk you capture what the paper cannot show: utilities, wastewater, metering, roads, site conditions. Every capture is unreviewed evidence until a person reviews it.",
  },
  {
    title: "Review and resolve.",
    body: "Capacity-gate risks across water, sewer, electrical, roads, and zoning, permits, and legal block the move toward offer until they are verified or an authorized person waives them with a documented reason.",
  },
  {
    title: "Underwrite from confirmed inputs.",
    body: "The engine calculates from human-approved assumptions only. Models may propose. People confirm. Code calculates.",
  },
  {
    title: "Decide on the record.",
    body: "Your documented posture, advance, retrade, pause, or walk, is organized from reviewed evidence, unresolved gates, and approved assumptions: a dated decision file built to the ParkProof standard that you can take to partners, lenders, or your own investment committee.",
  },
] as const

const NOVEMBER_PRODUCT = [
  {
    name: "Source",
    color: "#4A90D9",
    family: "Know it",
    body: SOURCE_SENTENCE,
  },
  {
    name: "Field",
    color: "#D97706",
    family: "Take it",
    body: "Field captures what you see when you get there. Photos, notes, and observations stay unreviewed evidence until a person reviews them. Captured is not verified.",
  },
  {
    name: "Acquire",
    color: "#00468B",
    family: "Know it",
    body: "Acquire organizes what either stream means. The diligence register, capacity gates, and deterministic underwriting feed the decision file. You own the decision.",
  },
] as const

const INCLUDED = [
  "One active deal, worked through your documented decision posture or 90 days, whichever comes first.",
  "One primary owner and one viewer/collaborator on the deal workspace.",
  "Onboarding and a shared channel for the life of the engagement.",
  "Weekly Deal Desk sessions in a fixed format, with every output reviewed before you see it.",
  "The diligence register with capacity-gate tracking across water, sewer, electrical, roads, and zoning, permits, and legal.",
  "Deterministic underwriting calculated from human-approved assumptions.",
  "A documented decision file built to the ParkProof standard, organizing your documented posture: advance, retrade, pause, or walk.",
] as const

const FOR_ITEMS = [
  "Active RV park or manufactured housing buyers with a live or imminent deal and a decision deadline in the next 60 to 90 days.",
  "Independent sponsors, small acquisition shops, and owner-operators who will bring real materials and work the record. You build it; the workflow guides you.",
  "Buyers who want the decision file to show what is verified, what is claimed, what is missing, and what was assumed, so the posture they take is defensible.",
] as const

const NOT_FOR_ITEMS = [
  "Brokers, sellers, and intermediaries. The Deal Desk serves the buyer's side of the table only.",
  "The curious with no live deal. The free resource library and the Field Network are the right doors for now.",
  "Buyers who want someone else to run diligence for them. The workflow guides; the buyer builds the record.",
  "Anyone looking for software that issues the verdict. CrosstownOS organizes the record. The buyer owns the decision.",
] as const

const FAQ = [
  {
    q: "What does the $2,500 pay for?",
    a: "One active deal worked inside CrosstownOS from intake to a documented decision posture, or 90 days, whichever comes first. That includes the diligence register, capacity-gate tracking, deterministic underwriting from your approved assumptions, weekly Deal Desk sessions, and a documented decision file built to the ParkProof standard. It is an engagement around your live acquisition, not a software license.",
  },
  {
    q: "What is the refund policy?",
    a: "Full refund any time before kickoff. After onboarding begins and your workspace is activated, the fee is non-refundable. The line is stated before you pay so there is no ambiguity later.",
  },
  {
    q: "What exactly happens during the engagement?",
    a: "We intake your broker package and materials with provenance attached, build the diligence register with evidence states on every claim, configure Field for your site walk, run the register through weekly Deal Desk sessions, and close with a documented decision file built to the ParkProof standard, carrying your documented posture: advance, retrade, pause, or walk.",
  },
  {
    q: "What does CrosstownOS not do?",
    a: "It does not tell you whether to buy, certify the deal, verify the property, or guarantee any investment outcome. It does not replace your attorney, engineer, inspector, environmental consultant, title company, appraiser, lender, tax professional, insurance professional, utility or wastewater specialist, or your own investment judgment. It organizes the record; you own the decision.",
  },
  {
    q: "Does CrosstownOS replace my professional team?",
    a: "No. Every output should be reviewed by your own qualified professionals before you commit capital. The system is built to make their review sharper, by showing exactly what is verified, what is broker-reported, what is missing, and what was assumed.",
  },
  {
    q: "Who makes the final call on my deal?",
    a: "You do. The decision file organizes your documented posture from reviewed evidence, unresolved gates, and approved assumptions. It is decision support, not a verdict from software.",
  },
  {
    q: "How is my deal data handled?",
    a: "Everything you share, in the application, the fit call, and the workspace, is treated as confidential. It is never used in content, examples, marketing, or conversation without your written permission. Confidentiality terms are signed at kickoff before any materials are ingested.",
  },
  {
    q: "What happens after 90 days, or if my deal ends early?",
    a: "The engagement runs through your documented decision posture or 90 days, whichever comes first. If your deal reaches a posture early, the engagement completes early and the conversion review follows. If your deal is still live at day 90, the conversion review sets the next step.",
  },
  {
    q: "How does the conversion credit work?",
    a: "Convert to the Founding Acquisition Workspace ($3,000/year) within 30 days of your documented decision posture and the full $2,500 applies to your first year. The credit is a prepayment toward the Workspace, not a discount and not a bonus. The 30-day window runs from the dated verdict, because the conversion decision should be made while the posture is fresh.",
  },
  {
    q: "Why only five buyers?",
    a: "Because every engagement is worked personally: every output is reviewed before you see it, and the weekly sessions run in a fixed format. Five is the number the calendar can hold without the quality dropping. When seats are full, the Field Network is the waitlist for the next window.",
  },
] as const

export default function DealDeskPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD["/deal-desk"]) }}
      />
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          {/* Hero */}
          <p className="mono-label mb-4">Founding offer, November 2026</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            The Founding Deal Desk. Five buyers. One live deal each.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Work your real acquisition inside CrosstownOS, from
            intake to a documented decision posture.
          </p>
          <ToolContextLine />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#apply"
              className="inline-block border border-primary/60 bg-primary px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Bring a live deal
            </a>
            <a
              href="#how-it-works"
              className="inline-block border border-border px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See how the Deal Desk works
            </a>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            Not ready for the Desk? Run the math first: the{" "}
            <Link
              href="/tools"
              className="font-semibold text-primary hover:underline"
            >
              Diligence Working Papers
            </Link>{" "}
            run in your browser, free, no account. Bring the export to your fit call.
          </p>

          {/* The problem */}
          <section aria-labelledby="deal-desk-problem" className="mt-20">
            <h2 id="deal-desk-problem" className="serif-display text-2xl tracking-tight sm:text-3xl">
              The problem, briefly.
            </h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {PAINS.map((pain) => (
                <div key={pain.title} className="theme-cream border border-border bg-card p-6">
                  <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                    {pain.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{pain.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* What you get */}
          <section aria-labelledby="deal-desk-scope" className="mt-20">
            <h2 id="deal-desk-scope" className="serif-display text-2xl tracking-tight sm:text-3xl">
              What you get.
            </h2>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {SCOPE_ITEMS.map((item) => (
                <li key={item} className="theme-cream flex gap-3 border border-border bg-card p-5 text-sm leading-relaxed text-foreground/85">
                  <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-5 text-sm leading-relaxed text-muted">
              Exclusions: CrosstownOS does not replace your attorney, engineer,
              inspector, environmental consultant, title company, appraiser,
              lender, or other qualified professionals. See the{" "}
              <a href="#faq" className="text-primary underline underline-offset-2 hover:no-underline">
                FAQ
              </a>
              .
            </p>
          </section>

          {/* How it works */}
          <section id="how-it-works" aria-labelledby="deal-desk-how" className="mt-20 scroll-mt-24">
            <h2 id="deal-desk-how" className="serif-display text-2xl tracking-tight sm:text-3xl">
              How the Deal Desk works.
            </h2>
            <ol className="mt-6 space-y-4">
              {HOW_IT_WORKS.map((step, index) => (
                <li key={step.title} className="theme-cream flex gap-4 border border-border bg-card p-5 sm:p-6">
                  <span className="serif-display flex-none text-2xl text-primary">
                    {index + 1}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* The November product, compact */}
          <section aria-labelledby="deal-desk-product" className="mt-20">
            <h2 id="deal-desk-product" className="serif-display text-2xl tracking-tight sm:text-3xl">
              The November product, in one view.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Know it. Take it. Hold it. Opens November 2026: Source + Field +
              Acquire, the first connected loop across Know it and Take it.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {NOVEMBER_PRODUCT.map((module) => (
                <div
                  key={module.name}
                  className="theme-cream border border-border bg-card p-6"
                  style={{ borderTop: `2px solid ${module.color}` }}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 flex-none"
                      style={{ backgroundColor: module.color }}
                      aria-hidden="true"
                    />
                    <h3 className="font-sans text-lg font-bold tracking-tight text-foreground">
                      {module.name}
                    </h3>
                  </div>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted">
                    {module.family}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/80">{module.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ParkProof */}
          <section aria-labelledby="deal-desk-parkproof" className="mt-20">
            <h2 id="deal-desk-parkproof" className="serif-display text-2xl tracking-tight sm:text-3xl">
              The decision file.
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-foreground/85">
              At the end of the engagement, the Desk produces a documented
              decision file built to the ParkProof standard: your documented
              posture, built from reviewed evidence, unresolved gates, and
              approved assumptions.
              CrosstownOS organizes the record. You own the decision.
            </p>
            <Link
              href="/parkproof-standard"
              className="mt-4 inline-block text-sm text-primary underline underline-offset-2 transition-colors hover:text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Read the ParkProof Standard
            </Link>
          </section>

          {/* Terms */}
          <section id="terms" aria-labelledby="deal-desk-terms" className="mt-20 scroll-mt-24">
            <h2 id="deal-desk-terms" className="serif-display text-2xl tracking-tight sm:text-3xl">
              The terms, stated plainly.
            </h2>
            <div className="theme-cream mt-6 border border-primary/40 bg-card p-6 sm:p-8">
              <p className="serif-display text-3xl tracking-tight text-foreground">
                $2,500, paid at acceptance.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Full refund any time before kickoff. Non-refundable after
                onboarding and workspace activation.
              </p>
              <h3 className="mt-8 font-sans text-base font-bold tracking-tight text-foreground">
                What is included
              </h3>
              <ul className="mt-4 space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                    <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-foreground/85">
                Conversion credit: the full $2,500 applies to your first year
                of the Founding Acquisition Workspace ($3,000/year) when you
                convert within 30 days of your documented decision posture. The
                Deal Desk fee is the first money toward the Workspace, not a
                fee on top of it.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                Seats: five buyers. Eligibility: a live or imminent deal with a
                decision deadline in the next 60 to 90 days.
              </p>
            </div>
          </section>

          {/* Who it is for / not for */}
          <section aria-labelledby="deal-desk-who" className="mt-20">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="theme-cream border border-border bg-card p-6 sm:p-8">
                <h2 id="deal-desk-who" className="serif-display text-2xl tracking-tight">
                  Who the Deal Desk is for.
                </h2>
                <ul className="mt-5 space-y-3">
                  {FOR_ITEMS.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                      <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="theme-cream border border-border bg-card p-6 sm:p-8">
                <h2 className="serif-display text-2xl tracking-tight">
                  Who it is not for.
                </h2>
                <ul className="mt-5 space-y-3">
                  {NOT_FOR_ITEMS.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                      <span className="mt-2 h-1.5 w-1.5 flex-none bg-accent" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">
              No live deal yet? Start with the free{" "}
              <Link href="/resources" className="text-primary underline underline-offset-2 hover:no-underline">
                Acquisition Signal library
              </Link>
              , join the email list in the footer below, or join the Field
              Network for first word when the next seats open. Brokers, lenders,
              and advisers: see the{" "}
              <Link href="/#paths" className="text-primary underline underline-offset-2 hover:no-underline">
                Referral Alliance
              </Link>
              .
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" aria-labelledby="deal-desk-faq" className="mt-20 scroll-mt-24">
            <h2 id="deal-desk-faq" className="serif-display text-2xl tracking-tight sm:text-3xl">
              Questions buyers ask.
            </h2>
            <div className="mt-6 space-y-4">
              {FAQ.map((item, index) => (
                <details
                  key={item.q}
                  className="theme-cream group border border-border bg-card transition-colors hover:border-primary/40"
                >
                  <summary className="flex cursor-pointer list-none items-center p-6 font-sans text-base font-bold tracking-tight text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
                    <span className="mr-3 font-mono text-[10px] tracking-[0.2em] text-primary">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">{item.q}</span>
                    <span
                      aria-hidden="true"
                      className="ml-4 font-mono text-lg leading-none text-primary transition-transform duration-200 group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-sm leading-relaxed text-muted">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Application */}
          <section id="apply" aria-labelledby="deal-desk-apply" className="mt-20 scroll-mt-24">
            <h2 id="deal-desk-apply" className="serif-display text-2xl tracking-tight sm:text-3xl">
              Bring a live deal.
            </h2>
            <p className="theme-cream paper mt-4 max-w-3xl border border-border/60 bg-card/50 p-4 text-sm leading-relaxed text-muted">
              Everything you share here is treated as confidential and is never
              used in content, examples, or conversation without your written
              permission.
            </p>
            <div className="theme-cream mt-6 border border-border bg-card p-6 sm:p-8">
              <DealDeskForm />
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
