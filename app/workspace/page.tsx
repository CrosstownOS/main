// 1791676580
import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import DealDeskForm from "@/components/DealDeskForm"
import ToolContextLine from "@/components/ToolContextLine"
import PageBackdrop from "@/components/PageBackdrop"
import { SOURCE_SENTENCE } from "@/lib/source-copy"
import { FAQ_JSON_LD, WORKSPACE_FAQS } from "@/lib/tools/faqs"
import FaqSection from "@/components/tools/FaqSection"
import { EvidenceStateChip } from "@/components/evidence/EvidenceStateChip"
import SignalLine from "@/components/ui/SignalLine"
import {
 PageViewTracker,
 SectionViewTracker,
 TrackedApplyLink,
 TrackedPlansLink,
} from "@/components/analytics/Trackers"

export const metadata: Metadata = {
  keywords: ["due diligence software", "RV park acquisitions", "mobile home park acquisitions", "acquisition workspace", "manufactured housing acquisitions"],
 title: "Due Diligence Software for RV Park and Mobile Home Park Acquisitions | CrosstownOS",
 description:
  "Run your RV park, campground, or manufactured housing acquisition in one workspace. Seller claims, source evidence, site observations, and unresolved diligence stay connected in a single record before you commit capital.",
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
  body: "Create the workspace for your property. The recorded walkthrough explains the core workflow. One live Q&A session (30 minutes, booked within your first 30 days) covers navigation, inputs, documented calculations, and software behavior.",
 },
 {
  title: "Source the lead.",
  body: "Source sees what the outside world says before you arrive. Public records, broker packages, and seller statements enter the record with their origins attached. Organized, never automatically trusted.",
 },
 {
  title: "Walk it with Field.",
  body: "On the site walk you capture what the paper cannot show: utilities, wastewater, metering, roads, site conditions. Every capture is unreviewed evidence until you review it.",
 },
 {
  title: "Work the register.",
  body: "Assign each claim an evidence state using the ParkProof definitions: Verified, Broker-reported, Missing evidence, Underwriting assumption, Calculated, or Unresolved. You supply the supporting evidence and document your review; CrosstownOS does not independently verify the claim.",
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
  body: "Acquire organizes what either stream means. The diligence register turns every claim into an evidence state: Verified, Broker-reported, Missing evidence, Underwriting assumption, Calculated, or Unresolved. Capacity gates flag unresolved utility, wastewater, and access requirements before you record your decision. Deterministic underwriting calculates only from your approved assumptions and feeds the decision file.",
 },
] as const

const INCLUDED_SHARED = [
 "Full access to Source, Field, and Acquire. Single-deal access covers one property; annual access covers unlimited properties during the term.",
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
   price: "1299",
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
   price: "2999",
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
     <p className="mono-label mb-4">Five free pilot places. Target opening: November 2026.</p>
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
     <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
      <TrackedApplyLink plan="pilot"
       className="inline-block border border-primary/60 bg-primary-deep px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
       Apply for a free pilot place
      </TrackedApplyLink>
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
      <div className="theme-cream mt-6 border border-border border-l-2 border-l-primary bg-card px-5 py-4 sm:px-6">
       <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
        Capital commits only against what the record supports. What the record cannot prove does not get priced, and does not get paid for.
       </p>
      </div>
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
      <div className="theme-cream mt-6 border border-border bg-card p-5 sm:p-6">
       <p className="mb-4 text-sm font-bold text-foreground">
        The six evidence states (the CrosstownOS ParkProof Standard):
       </p>
       <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm leading-relaxed text-foreground/85">
         <thead>
          <tr className="border-b-2 border-border">
           <th className="px-3 py-2 font-bold text-foreground">Evidence state</th>
           <th className="px-3 py-2 font-bold text-foreground">On this page, it means</th>
          </tr>
         </thead>
         <tbody>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top"><EvidenceStateChip state="verified" /></td>
           <td className="px-3 py-2 align-top">Evidence you can point to, reviewed by a person.</td>
          </tr>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top"><EvidenceStateChip state="broker-reported" /></td>
           <td className="px-3 py-2 align-top">Claimed in the package or on a call; not checked yet.</td>
          </tr>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top"><EvidenceStateChip state="missing" /></td>
           <td className="px-3 py-2 align-top">Material information not received or located yet.</td>
          </tr>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top"><EvidenceStateChip state="assumption" /></td>
           <td className="px-3 py-2 align-top">A stated input in your case; not a verified fact.</td>
          </tr>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top"><EvidenceStateChip state="calculated" /></td>
           <td className="px-3 py-2 align-top">Output from stated inputs; only as reliable as they are.</td>
          </tr>
          <tr>
           <td className="px-3 py-2 align-top"><EvidenceStateChip state="unresolved" /></td>
           <td className="px-3 py-2 align-top">Sources conflict, or the answer is not established yet.</td>
          </tr>
         </tbody>
        </table>
       </div>
       <p className="mt-4 text-sm leading-relaxed text-muted">
        CrosstownOS does not assign these for you and does not independently verify a claim. You supply the evidence, you document the review, the record keeps both.
       </p>
      </div>
     </section>

     {/* Manufactured housing */}
     <section aria-labelledby="manufactured-housing" className="mt-20">
      <SignalLine />
      <h2 id="manufactured-housing" className="serif-display text-2xl tracking-tight sm:text-3xl">
       Manufactured housing.
      </h2>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/85 sm:text-base">
       <strong className="font-semibold text-foreground">
        Buying a mobile home park?
       </strong>{" "}
       The record works the same way. The
       homes get counted the way a manufactured housing deal demands:
       home by home, tenant-owned and park-owned separated, lot rent
       verified against deposits, utility systems priced before they
       become your emergency. Whether the sign out front says RV park,
       campground, or manufactured housing community (MHP), the
       standard does not change: claims are labeled, evidence is
       attached, and nothing counts as proven until the record proves
       it.
      </p>
      <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/85 sm:text-base">
       A manufactured housing acquisition runs two records at once.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
       <div className="theme-cream border border-border bg-card p-6">
        <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
         The land record
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
         The first record is the land: permitted sites, utility capacity, the
         age of the lines.
        </p>
       </div>
       <div className="theme-cream border border-border bg-card p-6">
        <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
         The homes record
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
         The second record is the homes: who holds each title, which homes are
         tenant-owned and which are park-owned, and what the lot rent actually
         deposits.
        </p>
       </div>
      </div>
      <p className="mt-6 max-w-3xl text-sm leading-relaxed text-foreground/85 sm:text-base">
       CrosstownOS keeps both records in the one workspace, so seller claims,
       source evidence, site observations, and unresolved diligence stay
       connected across the land and the homes before capital commits.
      </p>
      <div className="theme-cream mt-6 border border-border bg-card p-5 sm:p-6">
       <p className="mb-4 text-sm font-bold text-foreground">
        Manufactured housing: the claims that carry an evidence state (CrosstownOS Acquisition Workspace):
       </p>
       <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left text-sm leading-relaxed text-foreground/85">
         <thead>
          <tr className="border-b-2 border-border">
           <th className="px-3 py-2 font-bold text-foreground">The claim</th>
           <th className="px-3 py-2 font-bold text-foreground">What the record holds</th>
          </tr>
         </thead>
         <tbody>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top font-bold text-foreground">Home title status</td>
           <td className="px-3 py-2 align-top">Every home counted from its title: park-owned outright, park-owned with a lien, or resident-owned. A home whose title cannot be located is missing evidence, not a rounding error.</td>
          </tr>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top font-bold text-foreground">Tenant-owned vs park-owned split</td>
           <td className="px-3 py-2 align-top">The mix stated home by home, each side priced on its own evidence. Until the titles are counted, the split is broker-reported.</td>
          </tr>
          <tr>
           <td className="px-3 py-2 align-top font-bold text-foreground">Utility ownership and metering</td>
           <td className="px-3 py-2 align-top">Who owns each system, who pays for it, and how it is metered: master meter, sub-meter, or resident account. Capacity claims stay unresolved until permits or bills establish them.</td>
          </tr>
         </tbody>
        </table>
       </div>
       <p className="mt-4 text-sm leading-relaxed text-muted">
        The states are the same six. What changes in manufactured housing is which claims carry the deal.
       </p>
      </div>
      <div className="theme-cream mt-6 border border-border border-l-2 border-l-primary bg-card px-5 py-4 sm:px-6">
       <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
        The deal does not advance on open gates. It advances on verification, or on a waiver somebody signed their name to.
       </p>
      </div>
     </section>

     {/* The November product, compact */}
     <section aria-labelledby="deal-desk-product" className="mt-20">
      <h2 id="deal-desk-product" className="serif-display text-2xl tracking-tight sm:text-3xl">
       The November product, in one view.
      </h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
       <strong className="font-semibold text-foreground">Source</strong> + <strong className="font-semibold text-foreground">Field</strong> + <strong className="font-semibold text-foreground">Acquire</strong> is the <strong className="font-semibold text-foreground">Acquisition Workspace&apos;s</strong> first connected loop, targeting <strong className="font-semibold text-foreground">November 2026</strong> access. The <strong className="font-semibold text-foreground">Transition Workspace</strong> and <strong className="font-semibold text-foreground">Operations Workspace</strong> are planned system direction.
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
      <div className="theme-cream mt-6 border border-border border-l-2 border-l-primary bg-card px-5 py-4 sm:px-6">
       <p className="text-sm font-medium leading-relaxed text-foreground sm:text-base">
        A spreadsheet holds the numbers typed into it; the CrosstownOS
        Acquisition Workspace holds each claim next to its evidence state
        and the review behind it.
       </p>
      </div>
     </section>

     {/* Free pilot */}
     {/* Pilot: the offer */}
     <section aria-labelledby="deal-desk-pilot" className="mt-20">
      <SignalLine />
      <h2 id="deal-desk-pilot" className="serif-display text-3xl tracking-tight sm:text-4xl">
       Five free pilot places. Target opening: November 2026.
      </h2>
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
       I&apos;m opening five free pilot places before charging for access. I need active buyers to use the workspace on real acquisitions and tell me where the workflow fails.
      </p>
      <div className="theme-cream mt-8 border border-primary/40 bg-card p-6 sm:p-10">
       <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
        The trade
       </p>
       <p className="mt-4 text-base leading-relaxed text-foreground/90 sm:text-lg">
        Run one live acquisition through Source, Field, and Acquire for 90 days from activation. No payment required and no automatic conversion.

In exchange, use the workspace and give candid feedback about what works, what breaks, and what is confusing. I troubleshoot software behavior, not your deal. Testimonials are optional and require separate written permission.

Five qualified participants will receive free access. Paid access is available separately at $1,299 single-deal or $2,999 annual.
       </p>
       <p className="mt-6 border-t border-primary/30 pt-5 text-base font-semibold leading-relaxed text-foreground sm:text-lg">
        The file you build is built for a lender's or partner's read: claims, evidence, and open items in one place, each carrying its evidence state.
       </p>
       <TrackedApplyLink
        plan="pilot"
        className="mx-auto mt-8 block w-fit border border-primary/60 bg-primary-deep px-8 py-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90"
       >
        Apply for a free pilot place
       </TrackedApplyLink>
       <p className="mt-4 text-xs leading-relaxed text-muted">
        Acceptance reserves a place. Your 90-day term begins when access and onboarding materials are delivered. Your acquisition timeline must allow you to begin using the workspace after your confirmed activation date.
       </p>
      </div>
     </section>

     {/* After the pilot */}
     <section id="plans" className="mt-20 scroll-mt-24">
     <SectionViewTracker event="pricing_view" />
      
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
        <p className="mt-5 border-t border-border/60 pt-4 text-sm font-medium leading-relaxed text-foreground">
         A deal worked on the record is built to reach closing with its open items already decided, not discovered.
        </p>
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
        <p className="mt-5 text-sm leading-relaxed text-foreground/85">
         Weighing the workspace against the data room your deal team
         already uses? The comparison is direct,{" "}
         <Link
          href="/data-room-vs-diligence-software"
          className="font-semibold text-primary hover:underline"
         >
          data room vs due diligence software
         </Link>
         , side by side: what each one does with a claim.
        </p>
       </div>
      </div>
     </section>

     {/* Application */}
     <section id="apply" aria-labelledby="deal-desk-apply" className="mt-20 scroll-mt-24">
     <SignalLine />
      <h2 id="deal-desk-apply" className="serif-display text-2xl tracking-tight sm:text-3xl">
       Apply for a free pilot place.
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Tell me your asset type, deal stage, and decision deadline. No documents or call required to submit. If the fit looks right, we&apos;ll arrange the next step.
      </p>
      <div className="theme-cream mt-6 border border-border bg-card p-6 sm:p-8">
       <DealDeskForm />
       <p className="mt-4 text-xs leading-relaxed text-muted">
        Submitting an application does not reserve a place or begin access. We&apos;ll confirm acceptance and your activation date separately.
       </p>
      </div>
      <div className="theme-cream mt-4 border border-[#3a86f2] bg-card p-6 shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] sm:p-8">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
          ParkProof Walkthrough / Illustrative record
        </p>
        <p className="serif-display mt-3 text-2xl tracking-tight text-foreground sm:text-3xl">
          One deal, walked all the way down.
        </p>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
          Harbor Pines is fictional. The habit is not. Walk the deal claim
          by claim, source by source, every claim carrying its evidence
          state, until the record says what it can support and names what
          it cannot. One gate refuses to close, and the record holds at
          Pause.
        </p>
        <Link
          href="/parkproof-walkthrough"
          className="mx-auto mt-6 block w-fit border border-primary/60 bg-primary-deep px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          See an illustrative ParkProof decision record
        </Link>
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
