import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import { EVIDENCE_STATES, type EvidenceState } from "@/lib/tools/evidence"
import { FAQ_JSON_LD } from "@/lib/tools/faqs"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Live Diligence Working Papers | CrosstownOS",
  description:
    "Free diligence tools that run in your browser. Run the math on your live deal, keep the record, export the file.",
  alternates: { canonical: "/tools" },
  openGraph: {
    title: "Live Diligence Working Papers | CrosstownOS",
    description:
      "Six working papers that run in your browser. Every number carries an evidence state. Nothing tells you whether to buy.",
    type: "website",
    url: "/tools",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "Live Diligence Working Papers | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Diligence Working Papers | CrosstownOS",
    description:
      "Six working papers that run in your browser. Every number carries an evidence state.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

type ToolCard = {
  slug: string
  sourceCode: string
  name: string
  job: string
  time: string
  inputs: string
  pdfHref: string
}

type ToolGroup = {
  stage: string
  question: string
  tools: ToolCard[]
}

const GROUPS: ToolGroup[] = [
  {
    stage: "Before Offer",
    question: "Is this deal even worth your time?",
    tools: [
      {
        slug: "60-second-screener",
        sourceCode: "AS-02",
        name: "60-Second Deal Screener",
        job: "Six numbers, one posture.",
        time: "60 seconds",
        inputs: "8 inputs",
        pdfHref: "/resources/60-second-deal-screener",
      },
      {
        slug: "poh-toh-split",
        sourceCode: "AS-09",
        name: "POH/TOH Split Valuation",
        job: "What the blended price hides.",
        time: "5 minutes",
        inputs: "7 inputs",
        pdfHref: "/resources/poh-toh-split-valuation-worksheet",
      },
    ],
  },
  {
    stage: "In Diligence",
    question: "Does the income exist, and does the ground match the paper?",
    tools: [
      {
        slug: "rent-roll-truth-check",
        sourceCode: "AS-15",
        name: "Rent-Roll Truth Check",
        job: "Deposits versus the OM.",
        time: "10 minutes",
        inputs: "3 sections",
        pdfHref: "/resources/the-rent-roll-truth-check",
      },
      {
        slug: "expense-normalizer",
        sourceCode: "AS-08",
        name: "Expense Normalizer",
        job: "Turn the seller's P&L into underwriting.",
        time: "15 minutes",
        inputs: "Variable inputs",
        pdfHref: "/resources/mom-and-pop-expense-normalizer",
      },
      {
        slug: "utility-capacity-triage",
        sourceCode: "AS-13",
        name: "Utility Capacity Risk Triage",
        job: "The gates that can stop the deal.",
        time: "10 minutes",
        inputs: "13 inputs",
        pdfHref: "/resources/utility-and-wastewater-diligence-sheet",
      },
    ],
  },
  {
    stage: "Closing / Takeover",
    question: "What must hold true before money moves?",
    tools: [
      {
        slug: "emd-clock",
        sourceCode: "AS-17",
        name: "EMD Clock and Gate Tracker",
        job: "Your earnest money, on a clock.",
        time: "5 minutes to set up",
        inputs: "3 inputs + gate register",
        pdfHref: "/resources/the-emd-countdown-tracker",
      },
    ],
  },
]

const FAQS: { q: string; a: string }[] = [
  {
    q: "Is this investment advice?",
    a: "No. These are educational working papers. They calculate from your inputs and label what the record supports. They never tell you whether to buy. The boundary is the whole product: code calculates, people confirm, humans decide.",
  },
  {
    q: "Do you keep my numbers?",
    a: "No. Everything runs in your browser and saves to your browser's local storage. Nothing leaves your machine until you choose to download the JSON or save via email.",
  },
  {
    q: "Do I need an account?",
    a: "No. The tools are free to use with no account. An email is only asked when you want to save a working paper and pick it up anywhere.",
  },
  {
    q: "What is a ParkProof draft?",
    a: "The decision-file format: numbers, evidence states, open items, and assumptions in one record. Every tool exports JSON in one shared schema.",
  },
  {
    q: "Why do my inputs say Broker-reported?",
    a: "Because they came from the seller's paper until you verify them. Tap any chip to mark an input Verified with a source note, or leave it. The tool never upgrades an input on its own.",
  },
]

function WorkingPaperCard({ tool }: { tool: ToolCard }) {
  return (
    <div className="theme-cream flex flex-col border border-border bg-card p-6 sm:p-8">
      <div className="flex flex-wrap items-center gap-3">
        <span className="bg-primary px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
          {tool.sourceCode}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
          Live Diligence Working Paper
        </span>
      </div>
      <h3 className="serif-display mt-4 text-2xl tracking-tight sm:text-3xl">
        <Link href={`/tools/${tool.slug}`} className="transition-colors hover:text-primary">
          {tool.name}
        </Link>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">{tool.job}</p>
      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
        {tool.inputs} &middot; about {tool.time}
      </p>
      <div className="mt-6 flex flex-wrap gap-3 pt-2">
        <Link
          href={`/tools/${tool.slug}`}
          className="bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        >
          Open tool
        </Link>
        <Link
          href={tool.pdfHref}
          className="border border-border px-5 py-2.5 text-sm font-semibold text-muted transition-colors hover:border-primary hover:text-primary"
        >
          Get the PDF
        </Link>
      </div>
    </div>
  )
}

const toolsJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Live Diligence Working Papers",
  description:
    "Six interactive diligence working papers for RV park and manufactured-housing buyers. Every number carries an evidence state.",
  url: "https://www.crosstownosrv.camp/tools",
  numberOfItems: 6,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "SoftwareApplication",
        name: "60-Second Deal Screener",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://www.crosstownosrv.camp/tools/60-second-screener",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "SoftwareApplication",
        name: "Rent-Roll Truth Check",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://www.crosstownosrv.camp/tools/rent-roll-truth-check",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "SoftwareApplication",
        name: "Expense Normalizer",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://www.crosstownosrv.camp/tools/expense-normalizer",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "SoftwareApplication",
        name: "Utility Capacity Risk Triage",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://www.crosstownosrv.camp/tools/utility-capacity-triage",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "SoftwareApplication",
        name: "POH/TOH Split Valuation",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://www.crosstownosrv.camp/tools/poh-toh-split",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "SoftwareApplication",
        name: "EMD Clock and Gate Tracker",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://www.crosstownosrv.camp/tools/emd-clock",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
    },
  ],
}

export default function ToolsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD["/tools"]) }}
      />
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          {/* 3.1 Header */}
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              The interactive suite
            </p>
            <h1 className="serif-display mt-4 text-4xl tracking-tight sm:text-6xl">
              Live Diligence Working Papers.
            </h1>
            <p className="serif-display mt-4 text-xl tracking-tight text-foreground/90 sm:text-2xl">
              Free tools that run in your browser. Run the math on your live
              deal, keep the record, export the file.
            </p>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
              These are the working papers behind the Field Notes, rebuilt to run in your
              browser. Every number you enter carries an evidence state. Every output shows
              its lineage. Nothing here tells you whether to buy; it shows you what the
              record supports, so your call is defensible. Your numbers stay in your browser
              until you choose to export them.
            </p>
          </div>

          {/* Trust strip */}
          <div className="mt-10 border border-border bg-card/60 p-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
              The standard, in six chips
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(Object.keys(EVIDENCE_STATES) as EvidenceState[]).map((s) => (
                <Link
                  key={s}
                  href="/parkproof-standard"
                  title={EVIDENCE_STATES[s].definition}
                  className={cn(
                    "inline-flex items-center gap-1.5 border bg-background px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em] transition-opacity hover:opacity-80",
                    EVIDENCE_STATES[s].chipClass,
                  )}
                >
                  <span aria-hidden="true">{EVIDENCE_STATES[s].code}</span>
                  <span>{EVIDENCE_STATES[s].title}</span>
                </Link>
              ))}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted">
              The full definitions live on the{" "}
              <Link href="/parkproof-standard" className="text-primary hover:underline">
                ParkProof Standard
              </Link>
              . Every tool below speaks this language.
            </p>
          </div>

          {/* 3.2 Groups */}
          {GROUPS.map((group) => (
            <section key={group.stage} className="mt-16" aria-label={group.stage}>
              <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                {group.stage}
              </p>
              <h2 className="serif-display mt-2 text-2xl tracking-tight sm:text-3xl">
                {group.question}
              </h2>
              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {group.tools.map((tool) => (
                  <WorkingPaperCard key={tool.slug} tool={tool} />
                ))}
              </div>
            </section>
          ))}

          {/* 3.3 Connect band */}
          <section className="theme-cream mt-16 border border-primary/40 bg-primary/5 p-8" aria-label="How the working papers connect">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              How the working papers connect
            </p>
            <p className="serif-display mt-3 max-w-2xl text-2xl tracking-tight">
              Run a tool. Keep the record.
            </p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              Every tool exports your numbers, your evidence states, and
              your open items in one file. Free, no account, yours to keep.
            </p>
          </section>

          {/* FAQ */}
          <section className="mt-16" aria-label="Frequently asked questions">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              Questions
            </p>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {FAQS.map((faq) => (
                <div key={faq.q} className="py-5">
                  <h3 className="text-base font-semibold text-foreground">{faq.q}</h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 3.5 Conversion band */}
          <section className="theme-cream mt-16 border border-border bg-card p-8 sm:p-10" aria-label="Work your deal in the workspace">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
              The Acquisition Workspace
            </p>
            <h2 className="serif-display mt-3 max-w-2xl text-3xl tracking-tight">
              Work your real acquisition inside CrosstownOS.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              Running a live deal and want the full record? The Acquisition Workspace
              connects source evidence, field observations, and underwriting
              in one deal record. Single-deal $1,250, annual $2,500.
            </p>
            <Link
              href="/workspace#apply"
              className="mt-6 inline-block border border-primary/60 bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Book the fit call
            </Link>
          </section>
        </div>
      </main>
    </>
  )
}
