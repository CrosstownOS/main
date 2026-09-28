import type { Metadata } from "next"
import Navigation from "@/components/ui/navigation"
import { PARTS, TOOLS } from "@/lib/resources"

export const metadata: Metadata = {
  title: "Resource Catalog | CrosstownOS // Acquire",
  description:
    "All 35 Acquisition Signal Resources, organized by the seven Parts of the deal journey, in order. Free PDF downloads, no signup.",
  alternates: { canonical: "/resources/catalog" },
  openGraph: {
    title: "Resource Catalog | CrosstownOS // Acquire",
    description:
      "All 35 Acquisition Signal Resources, organized by the seven Parts of the deal journey, in order.",
    type: "website",
    url: "/resources/catalog",
    images: [
      {
        url: "/images/opengraph.jpg?v=2",
        width: 1024,
        height: 1024,
        alt: "Resource Catalog | CrosstownOS // Acquire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resource Catalog | CrosstownOS // Acquire",
    description:
      "All 35 Acquisition Signal Resources, organized by the seven Parts of the deal journey.",
    images: ["/images/opengraph.jpg?v=2"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Acquisition Signal Resource Library",
  description:
    "Thirty-five free diligence tools for RV park and manufactured-housing buyers from CrosstownOS // Acquire.",
  numberOfItems: 35,
  itemListElement: TOOLS.map((t, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: `${t.code}: ${t.title}`,
    description: t.description,
  })),
}

export default function CatalogPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen w-full bg-background text-foreground">
        <div className="w-full bg-black text-white">
          <div className="mx-auto flex w-full max-w-5xl items-center gap-5 px-4 pb-10 pt-28 sm:px-6 sm:pt-32 lg:px-8">
            <img
              src="/images/badge.png"
              alt="CrosstownOS badge"
              className="h-16 w-16 shrink-0 rounded-full sm:h-20 sm:w-20"
            />
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] sm:text-sm">
                CrosstownOS // Acquire
              </p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70 sm:text-xs">
                Acquisition Signal Resource
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-5xl px-4 pb-24 sm:px-6 lg:px-8">
          <p className="mono-label mb-4 mt-12 text-primary">
            <a href="/resources" className="hover:underline">
              Resources
            </a>{" "}
            / Catalog
          </p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            All 35 tools, in journey order.
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Seven Parts, one order. Each Part answers one question about your
            deal. Run the tools in a Part in order; each tool&apos;s Hands to
            line tells you the next one. No signup. Tap a download and take it
            to the truck.
          </p>

          <div className="mt-14 space-y-14">
            {PARTS.map((part) => {
              const tools = TOOLS.filter((t) => t.part === part.id)
              return (
                <section key={part.id} aria-label={`Part ${part.id}: ${part.name}`}>
                  <div className="border-l-2 border-primary pl-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
                      Part {part.id}
                    </p>
                    <h2 className="serif-display mt-1 text-2xl tracking-tight sm:text-3xl">
                      {part.name}
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-muted">
                      {part.question}
                    </p>
                  </div>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    {tools.map((tool) => (
                      <div
                        key={tool.code}
                        className="flex flex-col border border-border bg-card p-6"
                      >
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="bg-primary px-2 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                            {tool.code}
                          </span>
                          <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-primary">
                            Acquisition Signal Resource
                          </span>
                        </div>
                        <h3 className="serif-display mt-2 text-xl tracking-tight">
                          {tool.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                          {tool.description}
                        </p>
                        <a
                          href={tool.file}
                          download
                          className="mt-5 inline-flex w-fit items-center gap-2 bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        >
                          Download PDF
                        </a>
                      </div>
                    ))}
                  </div>
                </section>
              )
            })}
          </div>

          <div className="mt-20 border border-border bg-card p-8 text-center">
            <p className="serif-display text-2xl tracking-tight">
              Know what is true before you buy.
            </p>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
              These are the working papers behind the Field Notes. Read the
              thinking, then use the tools.
            </p>
            <a
              href="/blog"
              className="mt-5 inline-block border border-primary px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Read Field Notes
            </a>
          </div>
        </div>
      </main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  )
}
