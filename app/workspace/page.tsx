// 1791676580
import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import DealDeskForm from "@/components/DealDeskForm"
import { SOURCE_SENTENCE } from "@/lib/source-copy"
import { FAQ_JSON_LD, WORKSPACE_FAQS } from "@/lib/tools/faqs"
import FaqSection from "@/components/tools/FaqSection"
import { SteppedProgress } from "@/components/ui/motion"
import SignalLine from "@/components/ui/SignalLine"
import {
  EvidenceChip,
  RoomStack,
} from "@/components/ui/primitives"
import {
 PageViewTracker,
 SectionViewTracker,
 TrackedApplyLink,
} from "@/components/analytics/Trackers"

export const metadata: Metadata = {
  keywords: ["due diligence software", "RV park acquisitions", "mobile home park acquisitions", "acquisition workspace", "manufactured housing acquisitions"],
 title: "Due Diligence Software for RV Park and Mobile Home Park Acquisitions | Evidens",
 description:
  "Run your RV park, campground, or manufactured housing acquisition in one workspace. Seller claims, source evidence, site observations, and unresolved diligence stay connected in a single record before you commit capital.",
 alternates: { canonical: "/workspace" },
 openGraph: {
  title: "Evidens Acquisition Workspace",
  description:
   "Your acquisition decision record: seller claims, source evidence, site observations, unresolved diligence, and underwriting connected in one workspace before you commit capital.",
  type: "website",
  url: "/workspace",
  images: [
   {
    url: "/og-image.jpg",
    width: 1200,
    height: 630,
    alt: "Evidens Acquisition Workspace",
   },
  ],
 },
 twitter: {
  card: "summary_large_image",
  title: "Evidens Acquisition Workspace",
  description:
   "Monthly, single-deal, or annual.",
  images: ["/og-image.jpg"],
 },
}

function boldBrand(text: string) {
 return text.split("Evidens").flatMap((part, i) =>
  i === 0
   ? [part]
   : [
     <strong key={`b${i}`} className="font-semibold text-foreground">
      Evidens
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

const INCLUDED_SHARED = [
 "Full access to the whole system: Source, Field, Acquire, and the Feed. Monthly access covers unlimited concurrent properties during each purchased 30-day period; single-deal access covers one property; annual access covers unlimited properties during the term.",
 "Recorded onboarding walkthrough.",
 "One 30-minute live software Q&A under the plan entitlement: per Single-Deal purchase, per Annual purchase or renewal, and on Monthly only at first activation, booked within 30 days of the qualifying activation.",
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
 "Anyone looking for software that issues the verdict. Evidens organizes the record. The buyer owns the decision.",
] as const

const WORKFLOW_STEPS = [
 { name: "Find it", room: "Source", detail: "Doors and the Feed" },
 { name: "Screen it", room: "Source", detail: "The Library" },
 { name: "Work it", room: "Acquire", detail: "Tray and Lead Brief" },
 { name: "Walk it", room: "Field", detail: "The site walk" },
 { name: "Close it", room: "Acquire", detail: "Deal Desk and register" },
] as const

const INDEX_CARDS = [
 {
  name: "The Source map",
  body: "The registry on a map: every park in your hunt, placed, with the record one click behind each pin.",
 },
 {
  name: "Triage",
  body: "The Lead Brief before promotion: the brief renders against the candidate, so the promote decision is made on the record, not on the listing.",
 },
 {
  name: "Claim My Park",
  body: "An operator claims their park's record and corrects its face. A claim grants standing, not verification; corrections stand as owner-reported until the evidence moves them.",
 },
 {
  name: "The ParkProof decision file",
  body: "The generated file: documented posture, the evidence register, open gates, and calculation lineage, in the order a lender or partner reads.",
 },
] as const

const WORKSPACE_PRODUCT_JSON_LD = {
 "@context": "https://schema.org",
 "@type": "Product",
 name: "Evidens Acquisition Workspace",
 description:
  "Run your RV park or manufactured housing acquisition inside the Evidens Acquisition Workspace. Source, Field, and Acquire connect your evidence into a ParkProof decision file. Monthly, single-deal, or annual plans. You operate it.",
 url: "https://www.getevidens.com/workspace",
 image: "https://www.getevidens.com/og-image.jpg",
 brand: {
  "@type": "Brand",
  name: "Evidens",
 },
 offers: [
  {
   "@type": "Offer",
   name: "Monthly Workspace",
   description: "The full workspace for one purchased 30-day period. Each additional period is a separate manual purchase.",
   url: "https://www.getevidens.com/pricing#plans",
   price: "299",
   priceCurrency: "USD",
   availability: "https://schema.org/InStock",
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
   name: "Single-Deal Workspace",
   description:
    "One property. 180 days. The full workspace, from your first document to your decision file.",
   url: "https://www.getevidens.com/pricing#plans",
   price: "1299",
   priceCurrency: "USD",
   availability: "https://schema.org/InStock",
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
   url: "https://www.getevidens.com/pricing#plans",
   price: "2999",
   priceCurrency: "USD",
   availability: "https://schema.org/InStock",
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

function ShotFigure({
 src,
 phoneSrc,
 alt,
 caption,
 eager = false,
 className = "",
 room = "source",
}: {
 src: string
 phoneSrc?: string
 alt: string
 caption: ReactNode
 eager?: boolean
 className?: string
 room?: "source" | "field" | "acquire"
}) {
 return (
  <figure className={className}>
   <div className={`card-stack card-stack-${room} stack-sheets`}>
   <div className="sheet-card p-2 sm:p-3">
    <picture>
     {phoneSrc ? (
      <source media="(max-width: 640px)" srcSet={phoneSrc} />
     ) : null}
     <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" as const } : {})}
      className="h-auto w-full"
     />
    </picture>
    <figcaption className="px-2 pb-1 pt-3 text-sm leading-relaxed text-foreground/85 sm:px-3">
     {caption}
    </figcaption>
   </div>
   </div>

  </figure>
 )
}

function ChapterHead({
 id,
 index,
 title,
 room,
 roomClass,
 standfirst,
}: {
 id: string
 index: string
 title: string
 room: string
 roomClass: string
 standfirst: string
}) {
 return (
  <div className="max-w-3xl">
   <p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
    <span
     className={`h-2.5 w-2.5 flex-none ${roomClass}`}
     aria-hidden="true"
    />
    Chapter {index} · {room}
   </p>
   <h2 id={id} className="serif-display mt-3 text-3xl tracking-tight sm:text-4xl">
    {title}
   </h2>
   <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
    {standfirst}
   </p>
  </div>
 )
}

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
    <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
     {/* Section 01: Hero, one screenshot, one promise */}
     <p className="mono-label mb-4">Five free pilot places.</p>
     <SignalLine />
     <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
      The Acquisition Workspace. Your deal, on the record.
     </h1>
     <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
      Seller claims, source evidence, site observations, unresolved
      diligence, and underwriting, connected in one workspace before you
      commit capital.
     </p>
     <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <a
       href="#apply"
       className="inline-block btn-plate border border-primary/60 bg-primary-deep px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
       Book a walkthrough
      </a>
      <a
       href="#find-it"
       className="btn-signal inline-block px-2 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
       See the workspace
      </a>
     </div>
     <ShotFigure
      eager
      className="mt-12"
      room="acquire" src="/images/product/hero-tray-desktop.jpg"
      phoneSrc="/images/product/hero-tray-phone.jpg"
      alt="The Tray in the Acquisition Workspace: the deals a buyer is working, each carrying its evidence state and its next action. It shows the record being worked, not a folder being stored."
      caption={
       <>
        The Tray: the deals you are working, in one queue. Look at any row:
        the claim, its evidence state, and the next action travel together,
        so the deal is worked from the record, not from memory.
       </>
      }
     />

     {/* Section 02: Orientation, the workflow in five steps */}
     <section id="how-it-works" aria-label="The workflow in five steps" className="mt-20 scroll-mt-24">
      <div className="sheet-card p-5 sm:p-7">
       <SteppedProgress
        steps={WORKFLOW_STEPS.map((step) => ({
         label: step.name,
         detail: `${step.room}: ${step.detail}`,
        }))}
        current={WORKFLOW_STEPS.length}
        room="acquire"
       />
      </div>
     </section>

     {/* The problem */}
     <section aria-labelledby="deal-desk-problem" className="mt-20">
      <h2 id="deal-desk-problem" className="serif-display text-center text-2xl tracking-tight sm:text-3xl">
       The problem, briefly.
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
       {PAINS.map((pain) => (
        <div key={pain.title} className="card-stack card-stack-field stack-spring">
        <div className="sheet-card h-full p-6 text-center">
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
        </div>
       ))}
      </div>
      <div className="record-card corners mt-6 border-l-2 border-l-primary px-5 py-4 sm:px-6">
       <p className="text-center text-sm font-medium leading-relaxed text-foreground sm:text-base">
        Capital commits only against what the record supports. What the record cannot prove does not get priced, and does not get paid for.
       </p>
      </div>
     </section>

     {/* Section 03, Chapter 1: Find it */}
     <section id="find-it" aria-labelledby="chapter-find-it" className="mt-24 scroll-mt-24">
      <ChapterHead
       id="chapter-find-it"
       index="1"
       title="Find it."
       room="Source · Know it"
       roomClass="bg-source"
       standfirst="Never miss a park that fits. The doors open on the record, and the Feed keeps the hunt current while you work."
      />
      <div className="mt-8">
       <RoomStack room="source" className="stack-spring stack-sheets">
        <div className="sheet-card p-6 sm:p-8">
         <p className="text-base leading-relaxed text-foreground/90">
          {SOURCE_SENTENCE}
         </p>
         <p className="mt-4 text-sm leading-relaxed text-muted">
          Over it, the Feed: arrivals that match your hunt land on the
          record with their source attached, so a new park reaches you as
          a record, not as a rumor in an inbox.
         </p>
        </div>
       </RoomStack>
      </div>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-5">
       <ShotFigure
        className="lg:col-span-3"
        src="/images/product/doors-desktop.jpg"
        phoneSrc="/images/product/doors-phone.jpg"
        alt="The landing doors in Source: the ways a park enters the record, from the registry, a listing, or a broker package, each with its origin attached. It shows every lead arriving with provenance."
        caption={
         <>
          The doors: every way a park enters the record. Look at the
          origin line on each one: a lead never arrives without where it
          came from, so the first question a record answers is what it is
          built on.
         </>
        }
       />
       <ShotFigure
        className="lg:col-span-2"
        src="/images/product/feed-desktop.jpg"
        alt="The Feed in the Acquisition Workspace: new arrivals matching a buyer's hunt, each carrying its source and evidence state. It shows the hunt being served, not a timeline being scrolled."
        caption={
         <>
          The Feed, smaller and beside: what changed on your hunt since
          you last looked. It supports the doors; it does not lead them.
         </>
        }
       />
      </div>
     </section>

     {/* Section 04, Chapter 2: Screen it */}
     <section aria-labelledby="chapter-screen-it" className="mt-24">
      <ChapterHead
       id="chapter-screen-it"
       index="2"
       title="Screen it."
       room="Source · Know it"
       roomClass="bg-source"
       standfirst="The Library is where a lead earns its morning. A table is the proof the product handles real volume."
      />
      <div className="mt-8">
       <RoomStack room="source" className="stack-spring stack-sheets">
        <div className="sheet-card p-6 sm:p-8">
         <p className="text-base leading-relaxed text-foreground/90">
          Source organizes your broker packages, public records, and seller
          statements with provenance on every document you attach. Source sees
          what the outside world says before you arrive: organized, never
          automatically trusted. A lead that does not survive screening stays
          in the record with the reason attached.
         </p>
        </div>
       </RoomStack>
      </div>
      <ShotFigure
       className="mt-8"
       src="/images/product/library-desktop.jpg"
       phoneSrc="/images/product/library-phone.jpg"
       alt="The Library in Source: the full lead table, one row per park, each row carrying its source and evidence state. It shows volume handled without the claims being flattened."
       caption={
        <>
         The Library, full width: one row per park. Look at a single row:
         what the claim is, where it came from, and what state it is in,
         before you spend a morning on it.
        </>
       }
      />
      <ShotFigure
       className="mt-8 mx-auto max-w-3xl"
       src="/images/product/library-detail-desktop.jpg"
       alt="A detail crop of one Library record at full size: a single park's claims, each beside its source and evidence state. It shows one record read closely, the way a buyer reads it."
       caption={
        <>
         One record, read closely. The detail crop is shown at the size
         you will actually read it: nothing in the row is decoration.
        </>
       }
      />
     </section>

     {/* Section 05, Chapter 3: Work it */}
     <section aria-labelledby="chapter-work-it" className="mt-24">
      <ChapterHead
       id="chapter-work-it"
       index="3"
       title="Work it."
       room="Acquire · Know it"
       roomClass="bg-acquire"
       standfirst="The Tray and the Lead Brief are the centrepiece: judgement and workflow, not storage. This is the longest chapter because it is the surface the decision is made from."
      />
      <div className="mt-8">
       <RoomStack room="acquire" className="stack-spring stack-sheets">
        <div className="sheet-card p-6 sm:p-8">
         <p className="text-base leading-relaxed text-foreground/90">
          Assign each claim an evidence state using the ParkProof definitions:
          Verified, Broker-reported, Missing evidence, Underwriting assumption,
          Calculated, or Unresolved. You supply the supporting evidence and
          document your review; Evidens does not independently verify the
          claim.
         </p>
         <p className="mt-4 text-base leading-relaxed text-foreground/90">
          The Lead Brief is the deal on one page: the claims, their states,
          the open gates, and the next action, rendered from the record
          itself. It is the page the decision gets made from, and it carries
          the park&apos;s aerial snapshot whenever it is opened.
         </p>
        </div>
       </RoomStack>
      </div>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-5">
       <ShotFigure
        className="lg:col-span-3"
        room="acquire" src="/images/product/tray-desktop.jpg"
        phoneSrc="/images/product/tray-phone.jpg"
        alt="The Tray at working size: the queue of deals, each with its stage, its evidence posture, and its next action. It shows the work being queued by the record, not by memory."
        caption={
         <>
          The Tray: the queue itself. Look at the next-action column:
          every deal in the tray knows what happens to it next, and who
          decided that.
         </>
        }
       />
       <ShotFigure
        className="lg:col-span-2"
        room="acquire" src="/images/product/lead-brief-desktop.jpg"
        phoneSrc="/images/product/lead-brief-phone.jpg"
        alt="The Lead Brief at full size: one deal's claims, evidence states, open gates, and aerial snapshot on a single page. It shows the whole deal readable in one sitting."
        caption={
         <>
          The Lead Brief, at the size it is read: one deal, one page,
          nothing behind a tab. What it replaces is the folder, the
          thread, and the call to ask what is still open.
         </>
        }
       />
      </div>
      <div className="card-stack card-stack-acquire stack-spring mt-10">
      <div className="record-card p-5 sm:p-6">
       <p className="mb-4 text-center text-sm font-bold text-foreground">
        The six evidence states (the Evidens ParkProof Standard):
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
           <td className="px-3 py-2 align-top"><EvidenceChip state="verified" /></td>
           <td className="px-3 py-2 align-top">Evidence you can point to, reviewed by a person.</td>
          </tr>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top"><EvidenceChip state="broker-reported" /></td>
           <td className="px-3 py-2 align-top">Claimed in the package or on a call; not checked yet.</td>
          </tr>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top"><EvidenceChip state="missing-evidence" /></td>
           <td className="px-3 py-2 align-top">Material information not received or located yet.</td>
          </tr>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top"><EvidenceChip state="underwriting-assumption" /></td>
           <td className="px-3 py-2 align-top">A stated input in your case; not a verified fact.</td>
          </tr>
          <tr className="border-b border-border/60">
           <td className="px-3 py-2 align-top"><EvidenceChip state="calculated" /></td>
           <td className="px-3 py-2 align-top">Output from stated inputs; only as reliable as they are.</td>
          </tr>
          <tr>
           <td className="px-3 py-2 align-top"><EvidenceChip state="unresolved" /></td>
           <td className="px-3 py-2 align-top">Sources conflict, or the answer is not established yet.</td>
          </tr>
         </tbody>
        </table>
       </div>
       <p className="mt-4 text-center text-sm leading-relaxed text-muted">
        Evidens does not assign these for you and does not independently verify a claim. You supply the evidence, you document the review, the record keeps both.
       </p>
      </div>
      </div>
     </section>

     {/* Section 06: Proof break */}
     <section aria-label="The standard the record is held to" className="mt-24">
      <div className="card-stack card-stack-acquire stack-spring">
      <div className="record-card px-6 py-10 text-center sm:px-10">
       <p className="serif-display mx-auto max-w-3xl text-2xl leading-snug tracking-tight text-foreground sm:text-3xl">
        Capital commits only against what the record supports. What the
        record cannot prove does not get priced, and does not get paid for.
       </p>
       <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
        The standard every chapter on this page is held to
       </p>
      </div>
      </div>
     </section>

     {/* Section 07, Chapter 4: Walk it */}
     <section aria-labelledby="chapter-walk-it" className="mt-24">
      <ChapterHead
       id="chapter-walk-it"
       index="4"
       title="Walk it."
       room="Field · Take it"
       roomClass="bg-field"
       standfirst="Field captures what you see when you get there. These are the screens used on site at a park, shown smaller, because that is the size they are worked at."
      />
      <div className="mt-8">
       <RoomStack room="field" className="stack-spring stack-sheets">
        <div className="sheet-card p-6 sm:p-8">
         <p className="text-base leading-relaxed text-foreground/90">
          Photos, notes, and observations enter the record as unreviewed
          evidence until a person reviews them. On the site walk you record
          what the paper cannot show: utilities, wastewater, metering,
          roads, and site conditions. Captured is not verified.
         </p>
         <p className="mt-4 text-sm leading-relaxed text-muted">
          Every capture is unreviewed evidence until you review it, and
          field evidence supersedes contradicted paper on the record,
          with the paper staying visible rather than deleted.
         </p>
        </div>
       </RoomStack>
      </div>
      <div className="mt-10 grid items-start gap-8 lg:grid-cols-5">
       <ShotFigure
        className="lg:col-span-3"
        room="field" src="/images/product/field-desktop.jpg"
        alt="The Field desk: a deal's site-walk captures, photos and observations laid against the claims they speak to. It shows ground truth entering the same record the paper lives in."
        caption={
         <>
          The Field desk: the walk, back on the record. Look at a
          capture beside the claim it answers: the photo and the package
          now have to agree, or the disagreement is the finding.
         </>
        }
       />
       <ShotFigure
        className="lg:col-span-2"
        room="field" src="/images/product/field-phone.jpg"
        alt="Field on the phone, at the park: the capture screen a buyer works standing on the site. It shows the walk being recorded where it happens, not reconstructed at a desk."
        caption={
         <>
          Field in the hand, framed narrower on purpose: this screen is
          worked standing on gravel, and it is designed for that, not
          for a desk.
         </>
        }
       />
      </div>
     </section>

     {/* Section 08, Chapter 5: Close it */}
     <section aria-labelledby="chapter-close-it" className="mt-24">
      <ChapterHead
       id="chapter-close-it"
       index="5"
       title="Close it."
       room="Acquire · Know it"
       roomClass="bg-acquire"
       standfirst="Acquire organizes what either stream means. The Deal Desk prices only what the record supports; the register holds the decision to the standard."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2">
       <RoomStack room="acquire" className="stack-spring h-full">
       <div className="sheet-card h-full p-6">
        <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
         Underwrite from your inputs.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
         The engine calculates only from assumptions you approve. Models
         may propose. You confirm. Code calculates.
        </p>
       </div>
       </RoomStack>
       <RoomStack room="acquire" className="stack-spring h-full">
       <div className="sheet-card h-full p-6">
        <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
         Decide on the record.
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
         Generate the ParkProof file from your reviewed evidence,
         unresolved gates, and approved assumptions. Take it to your
         partners, your lender, or your own investment committee. The
         posture is yours: advance, retrade, pause, or walk.
        </p>
       </div>
       </RoomStack>
      </div>
      <ShotFigure
       className="mt-10"
       room="acquire" src="/images/product/deal-desk-desktop.jpg"
       phoneSrc="/images/product/deal-desk-phone.jpg"
       alt="The Deal Desk: underwriting built from the record's own claims and approved assumptions, with each figure's lineage visible. It shows the price being argued from evidence, not typed over it."
       caption={
        <>
         The Deal Desk: the numbers, with their papers. Look at any
         figure: its inputs and their states are one click behind it,
         because a number that cannot show where it came from is a claim.
        </>
       }
      />
      <ShotFigure
       className="mt-10"
       room="acquire" src="/images/product/register-desktop.jpg"
       phoneSrc="/images/product/register-phone.jpg"
       alt="The diligence register, full width: every claim on the deal with its source, its evidence state, and its gate posture. It shows the checklist a lender reads, kept as a record instead of a spreadsheet."
       caption={
        <>
         The register, full width: the diligence checklist as a record.
         What it replaces is the spreadsheet and the email thread: the
         gates stay named until they are resolved or consciously accepted.
        </>
       }
      />
      <div className="mt-10 text-center">
       <a
        href="#apply"
        className="inline-block btn-plate border border-primary/60 bg-primary-deep px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
       >
        Book a walkthrough
       </a>
      </div>
     </section>

     {/* Manufactured housing */}
     <section aria-labelledby="manufactured-housing" className="mt-24">
      <SignalLine className="mx-auto" />
      <h2 id="manufactured-housing" className="serif-display text-center text-2xl tracking-tight sm:text-3xl">
       Manufactured housing.
      </h2>
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-foreground/85 sm:text-base">
       <strong className="font-semibold text-foreground">
        Buying a mobile home park?
       </strong>{" "}
       The record works the same way. Whether the sign out front says RV park,
       campground, or manufactured housing community (MHP), the
       standard does not change: claims are labeled, evidence is
       attached, and nothing counts as proven until the record proves
       it.
      </p>
      <p className="mx-auto mt-4 max-w-3xl text-center text-sm leading-relaxed text-foreground/85 sm:text-base">
       A manufactured housing acquisition runs two records at once.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
       <div className="card-stack card-stack-acquire stack-spring">
        <div className="sheet-card h-full p-6 text-center">
         <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
          The land record
         </h3>
         <p className="mt-2 text-sm leading-relaxed text-foreground/85">
          The first record is the land: permitted sites, utility capacity, the
          age of the lines.
         </p>
        </div>
       </div>
       <div className="card-stack card-stack-acquire stack-spring">
        <div className="sheet-card h-full p-6 text-center">
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
      </div>
      <p className="mx-auto mt-6 max-w-3xl text-center text-sm leading-relaxed text-foreground/85 sm:text-base">
       Evidens keeps both records in the one workspace, so seller claims,
       source evidence, site observations, and unresolved diligence stay
       connected across the land and the homes before capital commits.
      </p>
      <div className="card-stack card-stack-acquire stack-spring mt-6">
       <div className="sheet-card p-5 sm:p-6">
       <p className="mb-4 text-center text-sm font-bold text-foreground">
        Manufactured housing: the claims that carry an evidence state (Evidens Acquisition Workspace):
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
       <p className="mt-4 text-center text-sm leading-relaxed text-muted">
        The states are the same six. What changes in manufactured housing is which claims carry the deal.
       </p>
       </div>
      </div>
      <div className="sheet-card mt-6 border-l-2 border-l-primary px-5 py-4 sm:px-6">
       <p className="text-center text-sm font-medium leading-relaxed text-foreground sm:text-base">
        The deal does not advance on open gates. It advances on verification, or on a waiver somebody signed their name to.
       </p>
      </div>
     </section>

     {/* Section 09: Everything else, indexed */}
     <section aria-labelledby="workspace-index" className="mt-24">
      <h2 id="workspace-index" className="serif-display text-2xl tracking-tight sm:text-3xl">
       Everything else, on the record.
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
       The chapters above are the loop. These are the surfaces around it,
       named by the job they do.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
       {INDEX_CARDS.map((card) => (
        <div
         key={card.name}
         className={`card-stack stack-spring ${card.name === "The ParkProof decision file" ? "card-stack-acquire" : card.name === "Claim My Park" ? "card-stack-field" : "card-stack-source"}`}
        >
        <article className="record-card h-full p-5">
         <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
          {card.name}
         </h3>
         <p className="mt-2 text-sm leading-relaxed text-muted">
          {card.body}
         </p>
        </article>
        </div>
       ))}
      </div>
     </section>

     {/* Free pilot */}
     <section aria-labelledby="deal-desk-pilot" className="mt-24">
      <SignalLine className="mx-auto" />
      <h2 id="deal-desk-pilot" className="serif-display text-center text-3xl tracking-tight sm:text-4xl">
       Five free pilot places.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-muted sm:text-lg">
       I&apos;m opening five free pilot places before charging for access. I need active buyers to use the workspace on real acquisitions and tell me where the workflow fails.
      </p>
      <div className="card-stack card-stack-acquire stack-spring mt-8">
      <div className="sheet-card p-6 text-center sm:p-10">
       <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
        The trade
       </p>
       <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-foreground/90 sm:text-lg">
        Run one live acquisition through Source, Field, and Acquire for 90 days from activation. No payment required and no automatic conversion.
       </p>
       <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-foreground/90 sm:text-lg">
        In exchange, use the workspace and give candid feedback about what works, what breaks, and what is confusing. I troubleshoot software behavior, not your deal. Testimonials are optional and require separate written permission.
       </p>
       <p className="mt-6 border-t border-primary/30 pt-5 text-base font-semibold leading-relaxed text-foreground sm:text-lg">
        The file you build is built for a lender's or partner's read: claims, evidence, and open items in one place, each carrying its evidence state.
       </p>
       <TrackedApplyLink
        plan="pilot"
        className="btn-plate mx-auto mt-8 block w-fit border border-primary/60 bg-primary-deep px-8 py-4 text-center font-mono text-xs uppercase tracking-[0.2em] text-white hover:bg-primary-deep/90"
       >
        Apply for a free pilot place
       </TrackedApplyLink>
       <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Acceptance reserves a place. Your 90-day term begins when access and onboarding materials are delivered. Your acquisition timeline must allow you to begin using the workspace after your confirmed activation date.
       </p>
      </div>
      </div>
     </section>

     {/* What access buys, and the price strip */}
     <section id="plans" aria-labelledby="workspace-access" className="mt-24 scroll-mt-24">
      <SectionViewTracker event="pricing_view" />
      <h2 id="workspace-access" className="serif-display text-center text-2xl tracking-tight sm:text-3xl">
       What access buys.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
       Monthly buys the whole system, not a piece of it: Source, Field,
       Acquire, and the Feed, connected around one deal record.
      </p>
      <div className="record-card corners mt-6 p-6 sm:p-8">
       <ul className="mx-auto grid w-fit gap-3 text-left sm:grid-cols-2">
        {INCLUDED_SHARED.map((item) => (
         <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
          <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
          <span>{item}</span>
         </li>
        ))}
       </ul>
      </div>
      <div className="card-stack card-stack-acquire stack-spring mt-4">
      <div className="sheet-card p-6 text-center sm:p-8">
       <h3 className="serif-display text-center text-2xl tracking-tight">
        Pricing.
       </h3>
       <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-foreground/85">
        <span className="font-semibold text-foreground">Monthly Workspace</span>{" "}
        <span className="font-semibold text-acquire">$299</span>{" "}
        <span className="text-muted">|</span>{" "}
        <span className="font-semibold text-foreground">Single-Deal</span>{" "}
        <span className="font-semibold text-acquire">$1,299</span>{" "}
        <span className="text-muted">|</span>{" "}
        <span className="font-semibold text-foreground">Annual</span>{" "}
        <span className="font-semibold text-acquire">$2,999</span>
        <br />
        and five free pilot places.
       </p>
       <Link
        href="/pricing"
        className="btn-plate mt-5 inline-block border border-primary/60 bg-primary-deep px-6 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
       >
        See pricing
       </Link>
      </div>
      </div>
     </section>

     {/* Who it is for / not for */}
     <section aria-labelledby="deal-desk-who" className="mt-24">
      <div className="grid gap-4 md:grid-cols-2">
       <div className="card-stack card-stack-source stack-spring">
       <div className="sheet-card h-full p-6 text-center sm:p-8">
        <h2 id="deal-desk-who" className="serif-display text-center text-2xl tracking-tight">
         Who the workspace is for.
        </h2>
        <ul className="mx-auto mt-5 w-fit space-y-3">
         {FOR_ITEMS.map((item) => (
          <li key={item} className="flex gap-3 text-left text-sm leading-relaxed text-foreground/85">
           <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
           <span>{item}</span>
          </li>
         ))}
        </ul>
        <p className="mt-5 border-t border-border/60 pt-4 text-sm font-medium leading-relaxed text-foreground">
         A deal worked on the record is built to reach closing with its open items already decided, not discovered.
        </p>
       </div>
       </div>
       <div className="card-stack card-stack-field stack-spring">
       <div className="sheet-card h-full p-6 text-center sm:p-8">
        <h2 className="serif-display text-center text-2xl tracking-tight">
         Who it is not for.
        </h2>
        <ul className="mx-auto mt-5 w-fit space-y-3">
         {NOT_FOR_ITEMS.map((item) => (
          <li key={item} className="flex gap-3 text-left text-sm leading-relaxed text-foreground/85">
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
      </div>
     </section>

     {/* Section 12: Closing CTA, the same words as the hero */}
     <section id="apply" aria-labelledby="deal-desk-apply" className="mt-24 scroll-mt-24">
      <SignalLine className="mx-auto" />
      <h2 id="deal-desk-apply" className="serif-display text-center text-2xl tracking-tight sm:text-3xl">
       Book a walkthrough.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-muted sm:text-base">
       Tell me your asset type, deal stage, and decision deadline. No documents or call required to submit. If the fit looks right, we&apos;ll arrange the next step.
      </p>
      <div className="card-stack card-stack-acquire stack-spring mt-6">
      <div className="sheet-card p-6 sm:p-8">
       <DealDeskForm />
       <p className="mt-4 text-center text-xs leading-relaxed text-muted">
        Submitting an application does not reserve a place or begin access. We&apos;ll confirm acceptance and your activation date separately.
       </p>
      </div>
      </div>
      <div className="card-stack card-stack-acquire stack-spring mt-4">
      <div className="record-card p-6 text-center sm:p-8">
       <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
        ParkProof Walkthrough / Illustrative record
       </p>
       <p className="serif-display mt-3 text-2xl tracking-tight text-foreground sm:text-3xl">
        One deal, walked all the way down.
       </p>
       <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
        Harbor Pines is fictional. The habit is not. Walk the deal claim
        by claim, source by source, every claim carrying its evidence
        state, until the record says what it can support and names what
        it cannot. One gate refuses to close, and the record holds at
        Pause.
       </p>
       <Link
        href="/parkproof-walkthrough"
        className="btn-plate mx-auto mt-6 block w-fit border border-primary/60 bg-primary-deep px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
       >
        See an illustrative ParkProof decision record
       </Link>
      </div>
      </div>
     </section>

     {/* Section 11: FAQ */}
     <div className="mt-24">
      <FaqSection faqs={WORKSPACE_FAQS} />
     </div>
    </div>
   </main>
  </>
 )
}
