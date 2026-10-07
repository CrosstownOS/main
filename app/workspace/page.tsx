import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import DealDeskForm from "@/components/DealDeskForm"
import ToolContextLine from "@/components/ToolContextLine"
import PageBackdrop from "@/components/PageBackdrop"
import { SOURCE_SENTENCE } from "@/lib/source-copy"
import { FAQ_JSON_LD, DEAL_DESK_FAQS } from "@/lib/tools/faqs"
import FaqSection from "@/components/tools/FaqSection"

export const metadata: Metadata = {
  title: "CrosstownOS Acquisition Workspace: RV Park Due Diligence Software",
  description:
    "Run your RV park or manufactured housing acquisition inside the CrosstownOS Acquisition Workspace. Source, Field, and Acquire connect your evidence into a ParkProof decision file. Single-deal or annual plans. You operate it.",
  alternates: { canonical: "/workspace" },
  openGraph: {
    title: "CrosstownOS Acquisition Workspace",
    description:
      "Your acquisition decision record: seller claims, source evidence, site observations, unresolved diligence, and underwriting connected in one workspace before you commit capital.",
    type: "website",
    url: "/workspace",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "CrosstownOS Acquisition Workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CrosstownOS Acquisition Workspace",
    description:
      "Single-deal or annual. You operate the workspace. You own the decision.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

const PAINS = [
  {
    title: "The numbers do not tie.",
    body: "The rent roll, the P&L, and the bank deposits tell three different stories, and nobody owns the reconciliation.",
  },
  {
    title: "The package does not establish infrastructure condition or capacity.",
    body: "Water, sewer, electrical, and roads carry the real risk. A package may mention them without establishing permits, responsibility, or operating condition.",
  },
  {
    title: "There is no authoritative record.",
    body: "Diligence lives in inboxes, photo folders, and memory. When the deadline moves, the truth moves with it.",
  },
] as const

const SCOPE_ITEMS = [
  "The full Acquisition Workspace: Source, Field, and Acquire, connected around one deal record.",
  "Source organizes your broker packages, public records, and seller statements with provenance on every document you attach.",
  "Field captures your site-walk photos, notes, and observations against the deal record. Captured is not verified.",
  "Acquire runs the diligence register: evidence states, capacity gates, and deterministic underwriting from assumptions you approve.",
  "A ParkProof decision file you generate from your own reviewed evidence, unresolved gates, and approved assumptions.",
  "Recorded onboarding walkthrough plus one live software Q&A session.",
] as const

const HOW_IT_WORKS = [
  {
    title: "Set up your deal.",
    body: "Create the workspace for your property. The recorded walkthrough shows you every step. One live Q&A session (30 minutes, booked within your first 30 days) covers what the recording does not.",
  },
  {
    title: "Organize your sources.",
    body: "Attach the broker package, public records, and seller statements. Source tracks where every number came from, because you put it there.",
  },
  {
    title: "Walk it with Field.",
    body: "On the site walk you capture what the paper cannot show: utilities, wastewater, metering, roads, site conditions. Every capture is unreviewed evidence until you review it.",
  },
  {
    title: "Work the register.",
    body: "Assign an evidence state to every claim: Verified, Broker-reported, Missing, Assumed, Calculated, or Unresolved. You decide what each label means for your deal. Missing evidence becomes a named request with an owner and a due date. Nothing silently disappears.",
  },
  {
    title: "Underwrite from your inputs.",
    body: "The engine calculates only from assumptions you approve. Models may propose. You confirm. Code calculates.",
  },
  {
    title: "Decide on the record.",
    body: "Generate the ParkProof file from your reviewed evidence, unresolved gates, and approved assumptions. Take it to your partners, your lender, or your own investment committee. The posture is yours: advance, retrade, pause, or walk.",
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

const INCLUDED_SHARED = [
  "Full workspace: Source, Field, and Acquire around one deal record.",
  "Recorded onboarding walkthrough.",
  "One 30-minute live software Q&A per account, booked within the first 30 days.",
  "Email technical support. Target response within two business days.",
  "One named operator account.",
] as const

const NOT_INCLUDED = [
  "Document review or interpretation of your numbers.",
  "Confirmation of your diligence conclusions.",
  "Weekly sessions, ongoing advisory, or a shared channel.",
  "Additional live Q&A sessions with new purchases.",
] as const

const FOR_ITEMS = [
  "Active RV park or manufactured housing buyers with a live or imminent deal and a decision deadline in the next 60 to 90 days.",
  "Independent sponsors, small acquisition shops, and owner-operators who will bring real materials and work the record. You build it; the workflow guides you.",
  "Buyers who want the decision file to show what is verified, what is claimed, what is missing, and what was assumed, so the posture they take is defensible.",
] as const

const NOT_FOR_ITEMS = [
  "Brokers, sellers, and intermediaries. The workspace serves the buyer's side of the table only.",
  "The curious with no live deal. The free resource library is the right door for now.",
  "Buyers who want someone else to run diligence for them. The workflow guides; the buyer builds the record.",
  "Anyone looking for software that issues the verdict. CrosstownOS organizes the record. The buyer owns the decision.",
] as const

const FAQ = [
  {
    q: "What does the Single-Deal Workspace include?",
    a: "One property, 90 calendar days of full access to Source, Field, and Acquire, a recorded onboarding walkthrough, one 30-minute live software Q&A booked within your first 30 days, and email technical support with a two-business-day target response. You operate the workspace.",
  },
  {
    q: "What does the Annual Workspace include?",
    a: "Everything in Single-Deal, for unlimited properties over 12 months from purchase. Same onboarding: one walkthrough, one live Q&A per account. Additional properties do not add sessions. Renewal is manual; we never auto-charge.",
  },
  {
    q: "What do you mean by software Q&A? What is it not?",
    a: "We answer questions about navigation, inputs, documented calculations, and software behavior. What your documents mean and what to do about a property stays with you and your team.",
  },
  {
    q: "What does Verified mean in the evidence states?",
    a: "You assign it. Verified means you confirmed the claim against a primary source document. CrosstownOS does not independently verify anything. The label records your judgment, not ours.",
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
    a: "Everything you share, in the application, the fit call, and the workspace, is treated as confidential. It is never used in content, examples, marketing, or conversation without your written permission.",
  },
  {
    q: "What happens after 90 days, or if my deal ends early?",
    a: "Single-Deal access ends 90 calendar days from purchase. Editing stops at expiration; export your records before then. We retain your data for 30 days after expiration, then schedule deletion. If your deal is still live at day 90 and you want to continue, purchase Annual Workspace as a separate purchase. Annual access runs 12 months from the annual purchase date. If you abandon a deal, single-deal access does not transfer to another property.",
  },
  {
    q: "What is the refund policy?",
    a: "Full refund within seven calendar days of activation. Requesting a refund ends access immediately.",
  },
  {
    q: "What counts as one property?",
    a: "One park or community acquisition, including associated parcels under the same transaction. Separate parks are separate properties, even under one buyer.",
  },
  {
    q: "Can I upgrade from Single-Deal to Annual?",
    a: "Purchase Annual Workspace as a separate purchase at any time. There is no credit, prorating, or conversion discount.",
  },
] as const

export default function DealDeskPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD["/workspace"]) }}
      />
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          {/* Hero */}
          <p className="mono-label mb-4">Available November 2026</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            The Acquisition Workspace. Your deal, on the record.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Seller claims, source evidence, site observations, unresolved
            diligence, and underwriting, connected in one workspace before you
            commit capital. You operate it. You own the decision.
          </p>
          <ToolContextLine />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <a
              href="#plans"
              className="inline-block border border-primary/60 bg-primary px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See the plans
            </a>
            <a
              href="#how-it-works"
              className="inline-block border border-border px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See how the workspace works
            </a>
          </div>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted">
            Not ready for the workspace? The{" "}
            <Link
              href="/tools"
              className="font-semibold text-primary hover:underline"
            >
              Diligence Working Papers
            </Link>{" "}
            are free tools that run in your browser, no account needed.
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
              How the workspace works.
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
              Know it. Take it. Hold it. The Acquisition Workspace opens November 2026:
              Source + Field + Acquire, the first connected loop. The Transition Workspace
              and Operations Workspace are the direction of the system.
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
              When you are ready, you generate the ParkProof decision file
              from inside the workspace: your documented posture, built from
              your reviewed evidence, your unresolved gates, and your approved
              assumptions.
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
          <section id="plans" aria-labelledby="deal-desk-terms" className="mt-20 scroll-mt-24">
            <h2 id="deal-desk-terms" className="serif-display text-2xl tracking-tight sm:text-3xl">
              Two ways in.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Your specialists provide their findings. CrosstownOS is where you
              organize the evidence and record what your acquisition decision rests on.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="theme-cream border border-primary/40 bg-card p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  For the live deal
                </p>
                <p className="serif-display mt-3 text-4xl tracking-tight text-foreground">
                  $1,250
                </p>
                <p className="mt-1 font-sans text-base font-bold text-foreground">
                  Single-Deal Workspace
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  One property. 90 days. The full workspace, from your first
                  document to your decision file.
                </p>
                <a
                  href="#apply"
                  className="mt-6 inline-block border border-primary/60 bg-primary px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary/90"
                >
                  Start with a fit call
                </a>
              </div>
              <div className="theme-cream border border-border bg-card p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
                  For the active buyer
                </p>
                <p className="serif-display mt-3 text-4xl tracking-tight text-foreground">
                  $2,500
                </p>
                <p className="mt-1 font-sans text-base font-bold text-foreground">
                  Annual Workspace
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Unlimited properties. 12 months. Stop rebuilding the record
                  every time you look at a deal.
                </p>
                <a
                  href="#apply"
                  className="mt-6 inline-block border border-border px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
                >
                  Start with a fit call
                </a>
              </div>
            </div>
            <div className="theme-cream mt-4 border border-border bg-card p-6 sm:p-8">
              <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
                Every plan includes
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {INCLUDED_SHARED.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                    <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="mt-8 font-sans text-base font-bold tracking-tight text-foreground">
                The boundary
              </h3>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {NOT_INCLUDED.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                    <span className="mt-2 h-1.5 w-1.5 flex-none bg-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-sm leading-relaxed text-foreground/85">
                Access begins when your credentials and onboarding materials are
                delivered. Renewal is manual; we never auto-charge. One property
                means one park or community acquisition, including associated
                parcels. If you abandon a deal, single-deal access does not
                transfer.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-foreground/85">
                After expiration, editing ends. Export your records before then.
                We retain your data for 30 days, then schedule deletion. Full
                refund within seven calendar days of activation; refund ends access.
              </p>
            </div>
          </section>

          {/* Who it is for / not for */}
          <section aria-labelledby="deal-desk-who" className="mt-20">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="theme-cream border border-border bg-card p-6 sm:p-8">
                <h2 id="deal-desk-who" className="serif-display text-2xl tracking-tight">
                  Who the workspace is for.
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
              , or join the email list in the footer below. Brokers, lenders,
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
              Start with a fit call.
            </h2>
            <p className="theme-cream paper mt-4 max-w-3xl border border-border/60 bg-card/50 p-4 text-sm leading-relaxed text-muted">
              Tell us about your deal. If it is a fit, we will send the booking
              link for a 15-minute conversation about whether the workspace
              matches what you need. We do not sell on the call.
            </p>
            <p className="theme-cream paper mt-4 max-w-3xl border border-border/60 bg-card/50 p-4 text-sm leading-relaxed text-muted">
              Everything you share here is treated as confidential and is never
              used in content, examples, or conversation without your written
              permission.
            </p>
            <div className="theme-cream mt-6 border border-border bg-card p-6 sm:p-8">
              <DealDeskForm />
            </div>
          </section>

          {/* FAQ: fit call questions, below the application */}
          <div className="mt-20">
            <FaqSection faqs={DEAL_DESK_FAQS} />
          </div>
        </div>
      </main>
    </>
  )
}
