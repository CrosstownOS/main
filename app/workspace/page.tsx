import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import DealDeskForm from "@/components/DealDeskForm"
import ToolContextLine from "@/components/ToolContextLine"
import PageBackdrop from "@/components/PageBackdrop"
import { SOURCE_SENTENCE } from "@/lib/source-copy"
import { FAQ_JSON_LD, WORKSPACE_FAQS } from "@/lib/tools/faqs"
import FaqSection from "@/components/tools/FaqSection"
import SignalLine from "@/components/ui/SignalLine"
import {
  PageViewTracker,
  SectionViewTracker,
  TrackedApplyLink,
  TrackedPlansLink,
} from "@/components/analytics/Trackers"

export const metadata: Metadata = {
  title: "RV Park Due Diligence Workspace | CrosstownOS",
  description:
    "Run your RV park or manufactured housing acquisition in one workspace. Seller claims, evidence, and underwriting connected before you commit capital.",
  alternates: { canonical: "/workspace" },
  openGraph: {
    title: "CrosstownOS Acquisition Workspace",
    description:
      "Your acquisition decision record: seller claims, source evidence, site observations, unresolved diligence, and underwriting connected in one workspace before you commit capital.",
    type: "website",
    url: "/workspace",
    images: [
      {
        url: "/og-logo.png",
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
      "Single-deal or annual.",
    images: ["/og-logo.png"],
  },
}

function boldBrand(text: string) {
  return text.split("CrosstownOS").flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <strong key={`b${i}`} className="font-semibold text-foreground">
            CrosstownOS
          </strong>,
          part,
        ],
  )
}

const PAINS = [
  {
    title: "The numbers do not tie.",
    body: "The rent roll, the P&L, and the bank deposits tell three different stories, and nobody owns the reconciliation.",
    linkText: "The rent roll is a claim, not income verification",
    linkHref: "/blog/the-rent-roll-is-a-claim-not-income-verification",
  },
  {
    title: "The package does not establish infrastructure condition or capacity.",
    body: "Water, sewer, electrical, and roads carry the real risk. A package may mention them without establishing permits, responsibility, or operating condition.",
    linkText: "The permits buyers skip",
    linkHref: "/blog/the-permits-buyers-skip",
  },
  {
    title: "There is no authoritative record.",
    body: "Diligence lives in inboxes, photo folders, and memory. When the deadline moves, the truth moves with it.",
    linkText: "Before you underwrite the deal, establish what is true",
    linkHref: "/blog/before-you-underwrite-establish-what-is-true",
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
    body: "Assign an evidence state to every claim: Verified, Broker-reported, Missing evidence, Underwriting assumption, Calculated, or Unresolved. You decide what each label means for your deal. Missing evidence becomes a named request with an owner and a due date. Nothing silently disappears.",
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
    family: "Know it · Take it",
    body: "Field captures what you see when you get there. Photos, notes, and observations enter the record as unreviewed evidence until a person reviews them. On the site walk you record what the paper cannot show: utilities, wastewater, metering, roads, and site conditions. Captured is not verified.",
  },
  {
    name: "Acquire",
    color: "#00468B",
    family: "Know it",
    body: "Acquire organizes what either stream means. The diligence register turns every claim into an evidence state you assign: Verified, Broker-reported, Missing, Assumption, Calculated, or Unresolved. Capacity gates hold the deal until utilities, wastewater, and access check out. Deterministic underwriting calculates only from your approved assumptions and feeds the decision file.",
  },
] as const

const INCLUDED_SHARED = [
  "Full workspace: Source, Field, and Acquire around one deal record.",
  "Recorded onboarding walkthrough.",
  "One 30-minute live software Q&A per account, booked within the first 30 days.",
  "Email technical support. Target response within two business days.",
  "One named operator account.",
] as const

const FOR_ITEMS = [
  "Active RV park, MHP, or manufactured housing buyers with a live or imminent deal and a decision deadline in the next 60 to 90 days.",
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
    a: "One property, 90 calendar days of full access to Source, Field, and Acquire, a recorded onboarding walkthrough, one 30-minute live software Q&A booked within your first 30 days, and email technical support with a two-business-day target response.",
  },
  {
    q: "What does the Annual Workspace include?",
    a: "Everything in Single-Deal, for unlimited properties over 12 months from activation. Same onboarding: one walkthrough, one live Q&A per account. Additional properties do not add sessions. Renewal is manual. CrosstownOS does not enroll accounts in automatic renewal and does not charge cards on file without a new, explicit purchase.",
  },
  {
    q: "What do you mean by software Q&A? What is it not?",
    a: "We answer questions about navigation, inputs, documented calculations, and software behavior. What your documents mean and what to do about a property stays with you and your team.",
  },
  {
    q: "What does Verified mean in the evidence states?",
    a: "You assign it. Verified means you confirmed the claim against a cited source, with the page or record it came from, how it was obtained, and a named human review. CrosstownOS does not independently verify anything. The label records your judgment, not ours.",
  },
  {
    q: "What does CrosstownOS not do?",
    a: "It does not tell you whether to buy, certify the deal, verify the property, or guarantee any investment outcome. It does not replace your attorney, engineer, inspector, environmental consultant, title company, appraiser, lender, tax professional, insurance professional, utility or wastewater specialist, or your own investment judgment. It organizes the record.",
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
    a: "Single-Deal access ends 90 calendar days from activation. Editing stops at expiration; export your records before then. We retain your data for 30 days after expiration, then schedule deletion. If your deal is still live at day 90 and you want to continue, purchase Annual Workspace as a separate purchase. Annual access runs 12 months from the annual activation date. If you abandon a deal, single-deal access does not transfer to another property.",
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

const WORKSPACE_PRODUCT_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "CrosstownOS Acquisition Workspace",
  description:
    "Run your RV park or manufactured housing acquisition inside the CrosstownOS Acquisition Workspace. Source, Field, and Acquire connect your evidence into a ParkProof decision file. Single-deal or annual plans. You operate it.",
  url: "https://www.crosstownosrv.camp/workspace",
  image: "https://www.crosstownosrv.camp/og-logo.png",
  brand: {
    "@type": "Brand",
    name: "CrosstownOS",
  },
  offers: [
    {
      "@type": "Offer",
      name: "Single-Deal Workspace",
      description:
        "One property. 90 days. The full workspace, from your first document to your decision file.",
      url: "https://www.crosstownosrv.camp/workspace#plans",
      price: "1250",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
      },
    },
    {
      "@type": "Offer",
      name: "Annual Workspace",
      description:
        "Unlimited properties. 12 months. Stop rebuilding the record every time you look at a deal.",
      url: "https://www.crosstownosrv.camp/workspace#plans",
      price: "2500",
      priceCurrency: "USD",
      availability: "https://schema.org/PreOrder",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "0",
          currency: "USD",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        returnPolicyCategory:
          "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 7,
      },
    },
  ],
} as const

export default function AcquisitionWorkspacePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD["/workspace"]) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(WORKSPACE_PRODUCT_JSON_LD) }}
      />
      <Navigation />
      <PageViewTracker event="workspace_view" />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          {/* Hero */}
          <p className="mono-label mb-4">Available November 2026</p>
          <SignalLine />
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            The Acquisition Workspace. Your deal, on the record.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Seller claims, source evidence, site observations, unresolved
            diligence, and underwriting, connected in one workspace before you
            commit capital.
          </p>
          <ToolContextLine />
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <TrackedPlansLink
              className="inline-block border border-primary/60 bg-primary-deep px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See the plans
            </TrackedPlansLink>
            <a
              href="#how-it-works"
              className="inline-block border border-border px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              See how it works
            </a>
          </div>

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
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {pain.body}{" "}
                    <a
                      href={pain.linkHref}
                      className="text-primary underline underline-offset-2 hover:no-underline"
                    >
                      {pain.linkText}
                    </a>
                    .
                  </p>
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
              Exclusions: <strong className="font-semibold text-foreground">CrosstownOS</strong> does not replace your attorney, engineer,
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
              <strong className="font-semibold text-foreground">Know it. Take it. Hold it.</strong>{' '}
              The{' '}<strong className="font-semibold text-foreground">Acquisition Workspace</strong>{' '}
              opens{' '}<strong className="font-semibold text-foreground">November 2026</strong>:{' '}
              <strong className="font-semibold text-foreground">Source</strong> + <strong className="font-semibold text-foreground">Field</strong> + <strong className="font-semibold text-foreground">Acquire</strong>, the first connected loop.{' '}
              The{' '}<strong className="font-semibold text-foreground">Transition Workspace</strong> and{' '}
              <strong className="font-semibold text-foreground">Operations Workspace</strong> are the direction of the system.
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

          {/* Terms */}
          <section id="plans" aria-labelledby="deal-desk-terms" className="mt-20 scroll-mt-24">
          <SignalLine />
          <SectionViewTracker event="pricing_view" />
            <h2 id="deal-desk-terms" className="serif-display text-2xl tracking-tight sm:text-3xl">
              Two ways in.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Your specialists provide their findings. <strong className="font-semibold text-foreground">CrosstownOS</strong> is where you
              organize the evidence and record what your acquisition decision rests on.
            </p>
            <div className="theme-cream mt-8 border border-primary/40 bg-card md:flex md:items-stretch">
              <div className="flex-1 p-6 sm:p-10">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  For the live deal
                </p>
                <p className="serif-display mt-4 text-6xl tracking-tight text-foreground sm:text-7xl">
                  $1,250
                </p>
                <p className="mt-2 font-sans text-xl font-bold text-foreground">
                  Single-Deal Workspace
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  One property. 90 days. The full workspace, from your first
                  document to your decision file.
                </p>
                <TrackedApplyLink
                  plan="single-deal"
                  className="mt-6 inline-block border border-primary/60 bg-primary-deep px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90"
                >
                  Start with a fit call
                </TrackedApplyLink>
              </div>
              <div
                className="hidden w-px shrink-0 bg-primary/40 md:block"
                aria-hidden="true"
              />
              <div className="flex-1 border-t border-primary/25 p-6 sm:p-10 md:border-t-0">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                  For the active buyer
                </p>
                <p className="serif-display mt-4 text-6xl tracking-tight text-foreground sm:text-7xl">
                  $2,500
                </p>
                <p className="mt-2 font-sans text-xl font-bold text-foreground">
                  Annual Workspace
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted">
                  Unlimited properties. 12 months. Stop rebuilding the record
                  every time you look at a deal.
                </p>
                <TrackedApplyLink
                  plan="annual"
                  className="mt-6 inline-block border border-primary/60 bg-primary-deep px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90"
                >
                  Start with a fit call
                </TrackedApplyLink>
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
              <div className="mt-8">
                <h4 className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-foreground">
                  Terms of access
                </h4>
                <ol className="mt-4 space-y-3 text-sm leading-relaxed text-foreground/85">
                  <li>
                    <span className="font-bold text-foreground">Activation.</span>{" "}
                    Access commences upon delivery of your account credentials
                    and onboarding materials. The date of delivery is your
                    activation date.
                  </li>
                  <li>
                    <span className="font-bold text-foreground">Renewal.</span>{" "}
                    Renewal is manual. <strong className="font-semibold text-foreground">CrosstownOS</strong> does not enroll accounts in
                    automatic renewal and does not charge cards on file without
                    a new, explicit purchase.
                  </li>
                  <li>
                    <span className="font-bold text-foreground">License scope.</span>{" "}
                    A Single-Deal Workspace license covers one property: one
                    park or community acquisition, including associated parcels
                    transacted under a single purchase agreement. The license is
                    non-transferable. If the transaction is abandoned or does
                    not close, it does not transfer to another property.
                  </li>
                  <li>
                    <span className="font-bold text-foreground">Expiration.</span>{" "}
                    Single-Deal access ends 90 calendar days from activation.
                    Annual access ends 12 months from activation. Editing
                    privileges end at expiration, so export your records before
                    then.
                  </li>
                  <li>
                    <span className="font-bold text-foreground">Data retention.</span>{" "}
                    Account data is retained for thirty (30) calendar days
                    following expiration, after which deletion is scheduled and
                    carried out.
                  </li>
                  <li>
                    <span className="font-bold text-foreground">Refunds.</span>{" "}
                    A full refund is available within seven (7) calendar days of
                    activation. Requesting a refund terminates access
                    immediately.
                  </li>
                </ol>
                <Link
                  href="/terms"
                  className="mt-4 inline-block text-sm text-primary underline underline-offset-2 transition-colors hover:text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Read the full Terms of Use
                </Link>
              </div>
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
                      <span>{boldBrand(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
                    {boldBrand(item.a)}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* Application */}
          <section id="apply" aria-labelledby="deal-desk-apply" className="mt-20 scroll-mt-24">
          <SignalLine />
            <h2 id="deal-desk-apply" className="serif-display text-2xl tracking-tight sm:text-3xl">
              Start with a fit call.
            </h2>

            <div className="theme-cream mt-6 border border-border bg-card p-6 sm:p-8">
              <DealDeskForm />
            </div>
          </section>

          {/* FAQ: fit call questions, below the application */}
          <div className="mt-20">
            <FaqSection faqs={WORKSPACE_FAQS} />
          </div>
        </div>
      </main>
    </>
  )
}

