import Link from "next/link"
import Navigation from "@/components/ui/navigation"

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="mx-auto w-full max-w-3xl px-4 pb-24 pt-32 sm:px-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
          CrosstownOS
        </p>
        <h1 className="serif-display mt-5 text-4xl tracking-tight sm:text-5xl">
          This page is missing evidence.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
          The address does not resolve to a record. If you followed a link here,
          the record may have moved. Start from a place that exists.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="bg-primary-deep px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Back to the homepage
          </Link>
          <Link
            href="/tools"
            className="border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            Browse the working papers
          </Link>
        </div>
      </main>
    </>
  )
}
