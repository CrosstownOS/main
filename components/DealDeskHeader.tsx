import Link from "next/link"

export default function DealDeskHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-[1600px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex min-w-fit items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="Return to the CrosstownOS homepage"
        >
          <span className="font-serif text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-primary">
            Crosstown<span className="align-super text-[0.58em] text-primary">™</span>
          </span>
          <span className="hidden border-l border-border pl-3 font-mono text-[9px] uppercase tracking-[0.24em] text-muted sm:block">
            Founding Deal Desk
          </span>
        </Link>

        <a
          href="#apply"
          className="min-w-fit border border-primary/60 bg-primary px-4 py-2.5 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Bring a live deal
        </a>
      </div>
    </header>
  )
}
