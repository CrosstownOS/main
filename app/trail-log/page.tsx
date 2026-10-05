import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"
import TrailLogForm from "./TrailLogForm"

export const metadata: Metadata = {
  title: "The Trail Log | CrosstownOS // Acquire",
  description:
    "The Field Network build log: what has shipped, what is being built, and where members can weigh in.",
  alternates: { canonical: "/trail-log" },
  openGraph: {
    title: "The Trail Log | CrosstownOS // Acquire",
    description:
      "Follow the build from the inside. Shipped work, current build, and member input.",
    type: "website",
    url: "/trail-log",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "The Trail Log | CrosstownOS // Acquire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Trail Log | CrosstownOS // Acquire",
    description: "The Field Network build log for CrosstownOS.",
    images: ["/images/opengraph.jpg?v=2"],
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
    date: "October 2026",
    title: "Field is live",
    body: "Field is up and running for site-walk capture: photos, notes, and observations tied to the deal they belong to. Captured evidence stays unreviewed until a person reviews it.",
  },
  {
    date: "October 2026",
    title: "Booking became the front door",
    body: "Cal.com booking is wired into the Deal Desk, Design Partner, Field Network, Referral Alliance, and general conversation doors. The write-first form remains below the booking option.",
  },
  {
    date: "October 2026",
    title: "The public door has one name",
    body: "The people door is now Field Network across the site. Field remains the site-walk module. The names no longer compete with each other.",
  },
  {
    date: "October 2026",
    title: "The November modules got their colors",
    body: "Source, Acquire, and Field carry their module colors into the November opening set. The other modules stay visible as Direction, not as hidden roadmap.",
  },
  {
    date: "October 2026",
    title: "Cream moved onto the surfaces",
    body: "The warm cream treatment now sits on cards and reading surfaces while the background video and charcoal haze stay untouched. The video carries the mood. The surfaces carry the work.",
  },
] as const

export default function TrailLogPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">Field Network / Build Log</p>
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
            <div className="grid gap-4 md:grid-cols-3">
              {BUILD_COLUMNS.map((column) => (
                <article key={column.title} className="theme-cream paper border border-border p-6">
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
            </div>
          </section>

          <section aria-labelledby="trail-shipped" className="mt-20">
            <h2 id="trail-shipped" className="serif-display text-2xl tracking-tight sm:text-3xl">
              Shipped, on the record.
            </h2>
            <div className="mt-6 space-y-4">
              {SHIPPED.map((entry) => (
                <article key={entry.title} className="theme-cream border border-border bg-card p-6 sm:p-7">
                  <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
                    {entry.date}
                  </p>
                  <h3 className="mt-2 font-sans text-lg font-bold tracking-tight text-foreground">
                    {entry.title}
                  </h3>
                  <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
                    {entry.body}
                  </p>
                </article>
              ))}
            </div>
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
                word when the next Deal Desk window opens.
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
