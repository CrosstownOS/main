import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export type SuccessDoor = {
  href: string
  label: string
}

type SuccessStateProps = {
  /** Mono eyebrow naming the completion, e.g. "Application received". */
  eyebrow: string
  /** Serif headline confirming what just happened, naming the specific thing. */
  title: string
  /** What happens next, or that nothing is pending. */
  body?: ReactNode
  /** The one contextual next door for this surface. */
  door?: SuccessDoor
  /** Extra actions rendered under the door (e.g. a modal Close button). */
  children?: ReactNode
  className?: string
}

/**
 * The site-wide success / thank-you pattern. Every completion point
 * (form submit, download, email save, subscribe) lands on this shape:
 * a plain confirmation naming what happened, what happens next where a
 * next step exists, and one contextual next door. Cream surface, serif
 * display title, module-blue eyebrow: the site's existing card language.
 */
export default function SuccessState({
  eyebrow,
  title,
  body,
  door,
  children,
  className,
}: SuccessStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "theme-cream border border-primary/40 bg-primary/5 p-6 sm:p-8",
        className,
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary">
        {eyebrow}
      </p>
      <p className="serif-display mt-3 text-2xl tracking-tight text-foreground sm:text-3xl">
        {title}
      </p>
      {body ? (
        <div className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
          {body}
        </div>
      ) : null}
      {door ? (
        <Link
          href={door.href}
          className="mx-auto mt-6 block w-fit border border-primary/60 bg-primary-deep px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {door.label}
        </Link>
      ) : null}
      {children}
    </div>
  )
}
