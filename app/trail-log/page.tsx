import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import TrailLogForm from "./TrailLogForm"
import SignalLine from "@/components/ui/SignalLine"
import StaggerReveal from "@/components/ui/StaggerReveal"

export const metadata: Metadata = {
  keywords: ["Trail Log", "Evidens build log", "product build", "what shipped"],
  title: "The Trail Log | Evidens",
  description: "Follow the Evidens build in the Trail Log. What has shipped, what is being built, and where the Field Network community weighs in on what is next.",
  alternates: { canonical: "/trail-log" },
  openGraph: {
    title: "The Trail Log | Evidens",
    description:
      "Follow the build from the inside. Shipped work, current build, and member input.",
    type: "website",
    url: "/trail-log",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Trail Log | Evidens",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Trail Log | Evidens",
    description: "The Field Network build log for Evidens.",
    images: ["/og-image.jpg"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "The Trail Log",
  description:
    "The Field Network build log: what has shipped, what is being built, and where members can weigh in.",
  url: "https://www.getevidens.com/trail-log",
  isPartOf: {
    "@type": "WebSite",
    name: "Evidens",
    url: "https://www.getevidens.com",
  },
  publisher: {
    "@type": "Organization",
    name: "Evidens",
    logo: {
      "@type": "ImageObject",
      url: "https://www.getevidens.com/icon-512.png",
    },
  },
}

const BUILD_COLUMNS = [
  {
    title: "Now building",
    items: [
      "The finishing line: the last jobs between the built workspace and its acceptance run, closing in job order. The connected Source to Field to Acquire loop is built; the acceptance run that traverses it whole is still ahead, and this log will say so on the day it passes.",
      "In-context help on every surface of the workspace, teaching the software itself: what a control does, what a state means, where a number came from.",
    ],
  },
  {
    title: "Next",
    items: [
      "The acceptance run, then the combined launch: the film, the pilot cohort, and this site in its finished dress, through the door at getevidens.com.",
      "Trail Log entries as work ships, not as promises in advance.",
    ],
  },
  {
    title: "Exploring",
    items: [
      "How true parcel boundaries from the county record should sit beside the aerial on the Lead Brief, so the deed layer reads the way the satellite layer does.",
      "The agent layer: agents a buyer names for themselves, standing on the record and citing its evidence, never originating facts.",
    ],
  },
] as const

const SHIPPED = [
  {
    date: "November 12, 2026",
    title: "This log was brought current",
    body: "The Trail Log went quiet after October 23 while the build did not. The board above and the entries around this one now run through tonight. A public record that stops is worse than none, so the gap is named here rather than papered over: the weeks between are the entries below.",
  },
  {
    date: "November 12, 2026",
    title: "The site moved to getevidens.com",
    body: "The marketing site now lives at its own name. The old addresses redirect to the new one page for page, so a saved link still lands on the page it meant, and the change of address was filed with Google the same day. The company mailbox keeps its old address; only the front door moved.",
  },
  {
    date: "November 12, 2026",
    title: "The site was rebuilt around the product as it stands",
    body: "Every product picture on the site was reshot from the current build, and the pages were redressed to the standard the workspace itself is held to: the same cards, the same type, the same evidence language. If a screen on this site looks like the product, it is because it is the product, captured, not drawn.",
  },
  {
    date: "November 12, 2026",
    title: "Six evidence states now run on every fact in the workspace",
    body: "Verified, Broker-reported, Missing evidence, Underwriting assumption, Calculated, Unresolved: the six states now apply on every surface of the workspace, not just the deal page. Each family of facts carries its own rubric for what earns a state, because a field photo can verify that a pedestal stands and cannot verify what it is rated for. A state change records the rubric, the evidence, and the date.",
  },
  {
    date: "November 11, 2026",
    title: "CrosstownOS became Evidens",
    body: "The product has a new name. The company stays CrosstownOS LLC; the software it makes is Evidens, with Source, Field, and Acquire the tools inside it. The mark is the founder's own: a three-bar E in the colors of the lifecycle, fused into the word. The workspace and this site were rebranded in one move, and no surface carries the old name as the product's anymore.",
  },
  {
    date: "November 2, 2026",
    title: "The map filled in",
    body: "Coordinates were placed on 56,094 of the parks in the library, so the map and the aerial on the Lead Brief have somewhere to stand. A park with no coordinates is not guessed onto the map; it waits in the record until its position is known.",
  },
  {
    date: "October 24, 2026",
    title: "The library loaded: 61,296 facilities on the record",
    body: "Source opened with its registry loaded from public record: 5,202 Florida facilities from the Department of Health file and 56,094 from the archived national inventory, 61,296 in all. 32,307 of them arrived with no name recorded, and the record says exactly that rather than inventing one. The gaps are called out on every park, which is the point: a lead arrives with what is known and what is not, separated.",
  },
  {
    date: "October 23, 2026",
    title: "The homepage offer points at pricing now",
    href: "/pricing",
    body: "The offer panel on the homepage repeated the full price list in prose, on a site that already has a pricing page. The list is cut. The panel now ends on the pilot story and two buttons with different jobs: Apply for a pilot place, and See pricing, which goes to the page where the terms live.",
  },
  {
    date: "October 23, 2026",
    title: "Every page ends the same way now",
    body: "A sitewide pass gave every closing panel one treatment: the cream card, the royal border, the full halo kept for offer, pricing, and call to action panels, and real buttons where links used to sit buried inside paragraphs. The guides, the tools, the library, the Field Notes, and the homepage all close in the same language now, checked in the render on desktop and on a phone.",
  },
  {
    date: "October 22, 2026",
    title: "Hitch returned, reading from the current record",
    body: "Hitch, the guide in the corner of every page, is back and was resynced to the site as it stands: the settled pricing, all eleven Field Notes, and the pricing page itself as a source it can cite. What it quotes is what the pages say.",
  },
  {
    date: "October 22, 2026",
    title: "The offer was settled, and pricing got its own page",
    href: "/pricing",
    body: "The lineup is ruled and published in one place: five free pilot places; Monthly at $299 per 30-day period; Single-Deal at $1,299 for one property over 180 days; Annual at $2,999 for 12 months. ParkProof generation is included per property on every paid plan, and every price anywhere else on the site traces back to this page.",
  },
  {
    date: "October 20, 2026",
    title: "RV Park Cap Rates: How One Park Gets Two Asking Prices published",
    href: "/blog/rv-park-cap-rates-how-one-park-gets-two-asking-prices",
    body: "The eleventh Field Note takes on the park that wears two prices in two rooms, and walks the cap rate math back to the evidence under each number. Same park, same dirt, two asking prices; the note shows where the second one comes from.",
  },
  {
    date: "October 20, 2026",
    title: "Sign-in ran end to end on the bench",
    body: "The desk workspace and the Field app both signed in, start to finish, on a local bench, the first time sign-in has been observed working in this program. The connected Source to Field to Acquire loop has still not been run end to end, and this log will say so on the day it is.",
  },
  {
    date: "October 19, 2026",
    title: "The build was measured before it was believed",
    body: "A full audit graded 28 components of the codebase: 21 committed only, 3 partial, 4 absent, and none called verified without proof behind the label. The environment baseline then ran clean, with install, lint, typecheck, and build green, 977 tests passing, and the migration set running up, down, and up again without an error. What is broken is a list now, not a feeling.",
  },
  {
    date: "October 18, 2026",
    title: "The governance pages now cover the site chat",
    href: "/editorial-standards",
    body: "The Privacy Policy, the Terms, and the Editorial Standards now say what happens in the site chat: what is collected, that conversations are filed and read, that the AI provider does not keep them to train on, and the rules the agent answers under, including what counts as a failure. The standard behind those rules was adopted the same day. The pages state the practices plainly; the authorities behind them stay on file, the way the claims ledger does.",
  },
  {
    date: "October 18, 2026",
    title: "The mobile menu works at the bottom of the page",
    body: "On a phone, opening the menu at the foot of the homepage buried its links under the last section. It opens on top now, the way it was drawn. Found and fixed the same night.",
  },
  {
    date: "October 16, 2026",
    title: "The whole library was checked against its sources",
    href: "/editorial-standards",
    body: "All 72 pages, claim by claim. Numbers that could not be stood behind were labeled as working assumptions or taken out. The comparison pages now say plainly what the other tools do well. Every Field Note prints its sources and its limits at the foot of the page. The ledger behind the audit lives in the repository and stays open.",
  },
  {
    date: "October 16, 2026",
    title: "One set of evidence labels, everywhere",
    href: "/resources/the-evidence-status-standard",
    body: "A claim reads the same on every page now. One chip, one color, one meaning, on the tools, the guides, the resources, and the homepage. Broker-reported is the same orange everywhere it appears.",
  },
  {
    date: "October 16, 2026",
    title: "The Trail Log joined the homepage",
    href: "/trail-log",
    body: "This log has a card on the homepage now, under the lifecycle. The build record is part of the front door, not a page a reader has to already know about.",
  },
  {
    date: "October 16, 2026",
    title: "Pages end inside their cards now",
    href: "/resources",
    body: "The closing lines of the tools, the guides, and the resource library sat bare on the dark background, fine print included. They close inside the cream card now. Not a word changed.",
  },
  {
    date: "October 15, 2026",
    title: "The name now travels with the work",
    body: "Captions, table titles, and framework names across the site now carry CrosstownOS inside the passage itself. When a table or a definition gets lifted and quoted, its source comes with it.",
  },
  {
    date: "October 15, 2026",
    title: "The library's method moved into the open",
    href: "/resources",
    body: "The extraction layer put structured twins beside the prose: evidence tables, worked examples, and Inside this CrosstownOS tool blocks on the resource pages, so each worksheet's method sits on the page in HTML instead of only inside its PDF.",
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
    title: "The short pages got their descriptions",
    body: "All 38 pages whose meta descriptions measured under 100 characters, 36 resource pages plus the privacy and terms pages, now carry a written description of what the page holds, replacing the short placeholders search engines were left to guess from.",
  },
  {
    date: "October 15, 2026",
    title: "Twenty-two links woven through the site",
    body: "Twenty-two internal links were placed across the estate, in the essays, the guides, the catalog, and between the resource pages themselves, so a reader who lands on one page can walk through the next door.",
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
    date: "October 9, 2026",
    title: "Manufactured Housing Diligence Starts With Who Owns the Homes published",
    href: "/blog/manufactured-housing-diligence-starts-with-who-owns-the-homes",
    body: "The ninth Field Note took on who owns the homes in a manufactured housing community, and what that means for what a buyer is actually buying.",
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
    title: "Field capture was seen running",
    body: "Founder review set Source as the start of the record and Field as on-site capture. That night, Field capture was seen running: photos, notes, and observations tied to the deal they belong to. Captured evidence stays unreviewed until a person reviews it. The connected Source to Field to Acquire loop had not been run end to end at this date.",
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
    body: "The resource library grew to 38 PDFs: the 35 coded tools organized across the seven Parts of the deal journey, plus the three spine documents, with the catalog and router tying each tool to the next step.",
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
    body: "Referral Alliance stood as a public partner door alongside the founding-circle door that became Field Network on October 4.",
  },
  {
    date: "September 15, 2026",
    title: "Field Notes opened",
    href: "/blog",
    body: "The buyer-side publication launched with Markdown posts, a blog index, RSS, sitemap support, and related posts. The opening note, dated September 15, took on what must be established before underwriting.",
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
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <SignalLine />
          <h1 className="serif-display max-w-3xl text-4xl tracking-tight sm:text-5xl">
            The Trail Log.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted sm:text-lg">
            Follow the build from the inside. This is the public record of
            what shipped, what is being built, and where Field Network
            members can weigh in before the next piece hardens.
          </p>

          <section aria-labelledby="trail-columns" className="mt-16">
            <h2 id="trail-columns" className="sr-only">
              Current build board
            </h2>
            <StaggerReveal className="grid gap-4 md:grid-cols-3">
              {BUILD_COLUMNS.map((column) => (
                <div key={column.title} className="card-stack card-stack-acquire stack-spring">
                <article data-reveal-item className="h-full sheet-card corners card-lift p-6">
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
                </div>
              ))}
            </StaggerReveal>
          </section>

          <section aria-labelledby="trail-shipped" className="mt-20">
            <h2 id="trail-shipped" className="serif-display scroll-mt-28 text-2xl tracking-tight sm:text-3xl">
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
                <div key={entry.title} className="card-stack card-stack-acquire stack-spring">
                <article data-reveal-item className="record-card corners card-lift p-6 sm:p-7">
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
                </div>
              ))}
            </StaggerReveal>
          </section>

          <section aria-labelledby="trail-vote" className="mt-20">
            <div className="card-stack card-stack-acquire stack-spring">
            <div className="sheet-card corners p-6 sm:p-8">
              <h2 id="trail-vote" className="serif-display scroll-mt-28 text-2xl tracking-tight sm:text-3xl">
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
                className="mx-auto mt-5 block w-fit border border-border px-5 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5"
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