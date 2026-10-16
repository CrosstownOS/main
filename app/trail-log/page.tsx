import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import TrailLogForm from "./TrailLogForm"
import SignalLine from "@/components/ui/SignalLine"
import StaggerReveal from "@/components/ui/StaggerReveal"

export const metadata: Metadata = {
  title: "The Trail Log | CrosstownOS",
  description: "Follow the CrosstownOS build in the Trail Log. What has shipped, what is being built, and where the Field Network community weighs in on what is next.",
  alternates: { canonical: "/trail-log" },
  openGraph: {
    title: "The Trail Log | CrosstownOS",
    description:
      "Follow the build from the inside. Shipped work, current build, and member input.",
    type: "website",
    url: "/trail-log",
    images: [
      {
        url: "/og-logo.png",
        width: 1024,
        height: 1024,
        alt: "The Trail Log | CrosstownOS",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Trail Log | CrosstownOS",
    description: "The Field Network build log for CrosstownOS.",
    images: ["/og-logo.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The Trail Log",
  description:
    "The Field Network build log: what has shipped, what is being built, and where members can weigh in.",
  url: "https://www.crosstownosrv.camp/trail-log",
  isPartOf: {
    "@type": "WebSite",
    name: "CrosstownOS",
    url: "https://www.crosstownosrv.camp",
  },
  publisher: {
    "@type": "Organization",
    name: "CrosstownOS",
    logo: {
      "@type": "ImageObject",
      url: "https://www.crosstownosrv.camp/logo.jpg",
    },
  },
}

const BUILD_COLUMNS = [
  {
    title: "Now building",
    items: [
      "Source + Field + Acquire, the first connected loop across Know it and Take it.",
      "The record that starts with public sources, gets tested on the site walk, and is organized before capital is committed.",
    ],
  },
  {
    title: "Next",
    items: [
      "More worked language around the ParkProof standard, so a claim can be read the same way by buyer, broker, lender, and reviewer.",
      "Trail Log entries as work ships, not as promises in advance.",
    ],
  },
  {
    title: "Exploring",
    items: [
      "How a Field capture moves from unreviewed evidence to a reviewed record inside Acquire.",
      "What Source should show about where a fact came from, and what it should leave unresolved.",
    ],
  },
] as const

const SHIPPED = [
  {
    date: "October 15, 2026",
    title: "The name now travels with the work",
    body: "Captions, table titles, and framework names across the site now carry CrosstownOS inside the passage itself. When a table or a definition gets lifted and quoted, its source comes with it.",
  },
  {
    date: "October 15, 2026",
    title: "The library's method moved into the open",
    href: "/resources",
    body: "The extraction layer put structured twins beside the prose: evidence tables, worked examples, and Inside this tool blocks on the resource pages, so each worksheet's method sits on the page in HTML instead of only inside its PDF.",
  },
  {
    date: "October 15, 2026",
    title: "The library was handed to Google, page by page",
    body: "Fifty-one pages went into Google's validation queue and the eleven priority pages were hand requested for indexing, so the library the audit found waiting can finally be crawled.",
  },
  {
    date: "October 15, 2026",
    title: "Legacy addresses retired",
    body: "The old deck subdomains now redirect to the main site, and the retired underwriter app was taken off the domain. One front door, kept clean.",
  },
  {
    date: "October 15, 2026",
    title: "Manufactured housing found its vocabulary on the site",
    href: "/mobile-home-park-investing",
    body: "The workspace page, the checklist title, and the mobile home park guide now speak in the terms manufactured housing buyers use, and the guide gained a section on what due diligence looks like on a manufactured housing community.",
  },
  {
    date: "October 15, 2026",
    title: "Every resource page got its description",
    body: "All 38 resource pages now carry a written meta description of what the tool does and where it hands off, replacing the short placeholders search engines were left to guess from.",
  },
  {
    date: "October 15, 2026",
    title: "Twenty-two links woven through the Field Notes",
    body: "The essays and guides now point to the resource and tool pages their arguments build toward, so a reader who lands on one page can walk through the next door.",
  },
  {
    date: "October 15, 2026",
    title: "The two investing guides got separate arguments",
    href: "/rv-park-investing",
    body: "The mobile home park guide and the RV park guide were differentiated so each argues its own case, and the checklist page was differentiated with them, name kept, doing its own job in the sequence.",
  },
  {
    date: "October 13, 2026",
    title: "Structured data completed across the site",
    body: "Schema was added to the pages still missing it and to the resource detail template, so every page states what it is in the language search engines read first.",
  },
  {
    date: "October 13, 2026",
    title: "The privacy page was corrected to match the tools in use",
    href: "/privacy",
    body: "The advertising cookies line on the privacy page now matches the Meta Pixel the site actually runs.",
  },
  {
    date: "October 11, 2026",
    title: "The workspace page was corrected to what is actually built",
    href: "/workspace",
    body: "Source copy on the workspace page was cut back to the locked, built scope, and the ParkProof Walkthrough was given its own card on the page.",
  },
  {
    date: "October 10, 2026",
    title: "Site language aligned to the free pilot",
    body: "Trial wording across the site became the five-place free pilot: calls to action, FAQs, terms, and emails, with the Meta Pixel disclosed in the privacy policy the same night.",
  },
  {
    date: "October 10, 2026",
    title: "The workspace Product schema was completed",
    href: "/workspace",
    body: "The Product schema on the workspace page gained the merchant listings fields Google requires, the fix the later Search Console flag turned out to predate.",
  },
  {
    date: "October 7, 2026",
    title: "The offer became the Acquisition Workspace",
    href: "/workspace",
    body: "The Founding Deal Desk engagement retired. The offer is now software: Single-Deal Workspace at $1,250 and Annual Workspace at $2,500. Every human-service promise removed across the site, email, and booking. The buyer operates the workspace.",
  },
  {
    date: "October 4, 2026",
    title: "ParkProof Walkthrough joined the site",
    href: "/parkproof-walkthrough",
    body: "The explorable walk-through follows one fictional park from broker package to documented posture, with every screen labeled illustrative and fictional.",
  },
  {
    date: "October 4, 2026",
    title: "Anatomy of a Broker Package published",
    href: "/blog/anatomy-of-a-broker-package",
    body: "The Field Notes installment reads a synthetic offering package claim by claim and lands each claim on an evidence state.",
  },
  {
    date: "October 4, 2026",
    title: "The Brokers and Lenders page went live",
    href: "/for-brokers-lenders",
    body: "The page shows what a buyer brings when the deal was worked in CrosstownOS, what a sample decision file contains, and where the Referral Alliance door opens.",
  },
  {
    date: "October 4, 2026",
    title: "The ParkProof Standard was published",
    href: "/parkproof-standard",
    body: "The standard states the evidence states, what counts as evidence, how gates work, and why Advance, Retrade, Pause, and Walk are evidence-readiness labels.",
  },
  {
    date: "October 4, 2026",
    title: "Module tiles carry their colors",
    body: "Lifecycle tiles took on solid module-color bands, deeper November washes, and a color spine, while the November opening set stayed legible at a glance.",
  },
  {
    date: "October 4, 2026",
    title: "The announcement strip went cream",
    body: "The thin workspace announcement now sits in warm cream so it reads as a headline above the dark site header.",
  },
  {
    date: "October 4, 2026",
    title: "Field Notes articles got a reading surface",
    body: "Article pages keep the header video bleed, then move to cream below it for reading. The Field Notes index kept its card layout.",
  },
  {
    date: "October 4, 2026",
    title: "Cream surfaces learned to float",
    body: "Cards and information surfaces moved to warm parchment cream while the background video and charcoal haze stayed untouched underneath.",
  },
  {
    date: "October 4, 2026",
    title: "Cal.com booking doors were wired in",
    body: "Deal Desk, Field Network, Referral Alliance, and general conversation doors now offer a booking path alongside the write-first form.",
  },
  {
    date: "October 4, 2026",
    title: "Field Network became the public name",
    body: "The older Founding Network and Founding Circle labels were retired across the public site. The people door and the Field module no longer compete for the same word.",
  },
  {
    date: "October 4, 2026",
    title: "Lifecycle module blurbs landed",
    body: "Each module in the lifecycle grid received a short public description, with Source, Field, and Acquire illuminated as the November opening set.",
  },
  {
    date: "October 3, 2026",
    title: "Field Notes reached seven buyer-side notes",
    href: "/blog/the-rent-roll-is-a-claim-not-income-verification",
    body: "The Rent Roll Is a Claim, Not Income Verification joined the catalog as the seventh published note.",
  },
  {
    date: "October 3, 2026",
    title: "The ParkProof section was rebuilt around the decision file",
    body: "The homepage section was rebuilt in plain language around one idea: ParkProof turns a deal file into a decision file.",
  },
  {
    date: "October 2, 2026",
    title: "Founder review confirmed the loop as Field went live",
    body: "The founder review confirmed Source as the start of the record and Field as on-site capture. That night, Field was seen running for site-walk capture: photos, notes, and observations tied to the deal they belong to. Captured evidence stays unreviewed until a person reviews it.",
  },
  {
    date: "October 2, 2026",
    title: "Calculated and Unresolved joined the public evidence language",
    body: "The product loop added Calculated and Unresolved alongside Verified, Broker-reported, Missing evidence, and Underwriting assumption.",
  },
  {
    date: "October 2, 2026",
    title: "The Acquisition Workspace page and application flow went live",
    href: "/workspace",
    body: "The public workspace page, terms, FAQ, and application flow were aligned and verified live as one door for a live deal.",
  },
  {
    date: "October 1, 2026",
    title: "The November scope was set",
    body: "Source + Field + Acquire were set as the November build scope: one connected loop from public record, to site walk, to the record used before capital is committed.",
  },
  {
    date: "September 30, 2026",
    title: "The nine module colors were locked",
    body: "The module palette was locked with Victor across the lifecycle: Know it. Take it. Hold it. The colors later carried onto the site tiles.",
  },
  {
    date: "September 30, 2026",
    title: "The Permits Buyers Skip published",
    href: "/blog/the-permits-buyers-skip",
    body: "The sixth Field Note took on zoning, permits, legal site count, and the difference between a package claim and the county record.",
  },
  {
    date: "September 28, 2026",
    title: "The Acquisition Signal library reached 38 resources",
    href: "/resources/catalog",
    body: "The resource library grew to 38 PDFs organized across the seven Parts of the deal journey, with the catalog and router tying each tool to the next step.",
  },
  {
    date: "September 27, 2026",
    title: "The Acquisition Signal storefront opened",
    href: "/resources",
    body: "The public resource storefront went live at /resources, with the first resource set organized on public shelves and PDF downloads from the site.",
  },
  {
    date: "September 27, 2026",
    title: "Read the P&L Like the Other Side Wrote It published",
    href: "/blog/read-the-pl-like-the-other-side-wrote-it",
    body: "The fifth Field Note treated the seller P&L as a set of claims to normalize, not a neutral record.",
  },
  {
    date: "September 24, 2026",
    title: "Speed Is a Strategy for Sellers, Not Buyers published",
    href: "/blog/speed-is-a-strategy-for-sellers-not-buyers",
    body: "The fourth Field Note argued that the seller's clock is not the buyer's strategy, and that verification is how a buyer takes the clock back.",
  },
  {
    date: "September 23, 2026",
    title: "The evidence labels were locked",
    body: "Founder review locked Verified, Broker-reported, Missing evidence, and Underwriting assumption as the top-level language on the deal record.",
  },
  {
    date: "September 21, 2026",
    title: "Evidence states became the center of the product",
    body: "Founder review put evidence states at the center of the product: every material claim would carry where it came from and what state it was in.",
  },
  {
    date: "September 18, 2026",
    title: "The partner doors took shape",
    body: "Design Partner and Referral Alliance stood as public partner doors alongside the founding-circle door that became Field Network on October 4.",
  },
  {
    date: "September 15, 2026",
    title: "Field Notes opened",
    href: "/blog",
    body: "The buyer-side publication launched with Markdown posts, a blog index, RSS, sitemap support, and related posts. The first notes took on reported occupancy, utility systems, and what must be established before underwriting.",
  },
] as const

export default function TrailLogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">Field Network / Build Log</p>
          <SignalLine />
          <h1 className="serif-display max-w-3xl text-4xl tracking-tight sm:text-5xl">
            The Trail Log.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            Follow the build from the inside. This is the public record of
            what shipped, what is being built, and where Field Network
            members can weigh in before the next piece hardens.
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-foreground/80 sm:text-base">
            Opens November 2026: Source + Field + Acquire.
          </p>

          <section aria-labelledby="trail-columns" className="mt-16">
            <h2 id="trail-columns" className="sr-only">
              Current build board
            </h2>
            <StaggerReveal className="grid gap-4 md:grid-cols-3">
              {BUILD_COLUMNS.map((column) => (
                <article key={column.title} data-reveal-item className="theme-cream paper card-lift border border-border p-6">
                  <h3 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
                    {column.title}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {column.items.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
                        <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </StaggerReveal>
          </section>

          <section aria-labelledby="trail-shipped" className="mt-20">
            <h2 id="trail-shipped" className="serif-display text-2xl tracking-tight sm:text-3xl">
              Shipped, on the record.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
              Entries are dated by ship date, newest first. The same habit
              applies on the deal side. Every deal you pass on gets logged
              and reviewed in the{" "}
              <Link
                href="/resources/deals-i-walked-ledger-and-post-mortem"
                className="font-semibold text-primary hover:underline"
              >
                Deals I Walked Ledger and Post-Mortem
              </Link>
              , so the reasons stay on the record. The trail runs back
              through the build, not just tonight.
            </p>
            <StaggerReveal className="mt-6 space-y-4">
              {SHIPPED.map((entry) => (
                <article key={entry.title} data-reveal-item className="theme-cream card-lift border border-border bg-card p-6 sm:p-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                    {entry.date}
                  </p>
                  <h3 className="mt-2 font-sans text-lg font-bold tracking-tight text-foreground">
                    {"href" in entry ? (
                      <Link
                        href={entry.href}
                        className="transition-colors hover:text-primary hover:underline hover:underline-offset-4"
                      >
                        {entry.title}
                      </Link>
                    ) : (
                      entry.title
                    )}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                    {entry.body}
                  </p>
                </article>
              ))}
            </StaggerReveal>
          </section>

          <section aria-labelledby="trail-vote" className="mt-20">
            <div className="theme-cream paper border border-primary/40 p-6 sm:p-8">
              <h2 id="trail-vote" className="serif-display text-2xl tracking-tight sm:text-3xl">
                Weigh in.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                Votes are input. They help decide what gets attention and
                what questions need better answers. November scope is the
                founder's call, and a vote is not a product commitment.
              </p>
              <div className="mt-7">
                <TrailLogForm />
              </div>
            </div>
          </section>

          <section aria-labelledby="trail-network" className="mt-20">
            <div className="border-l-2 border-primary pl-4">
              <h2 id="trail-network" className="serif-display text-2xl tracking-tight sm:text-3xl">
                The room behind the log.
              </h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                Field Network is for operators, owners, and industry people
                who want early updates, a voice in what gets built, and first
                word when the Acquisition Workspace opens. While you wait,
                the{" "}
                <Link href="/tools" className="font-semibold text-primary hover:underline">
                  working papers
                </Link>
                , the{" "}
                <Link href="/checklist" className="font-semibold text-primary hover:underline">
                  diligence checklist
                </Link>
                , and the{" "}
                <Link href="/blog" className="font-semibold text-primary hover:underline">
                  Field Notes
                </Link>{" "}
                are all live now.
              </p>
              <Link
                href="/#paths"
                className="mt-5 inline-block border border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
              >
                Join the Field Network
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}