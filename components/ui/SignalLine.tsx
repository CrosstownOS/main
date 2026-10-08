import { cn } from "@/lib/utils"

/**
 * SignalLine — standalone royal signal line for section headings.
 * A 2px royal (#3a86f2) rule, 3rem wide.
 *
 * Server-safe (no client JS): renders statically with the armed + visible
 * classes applied, so it can be used directly in server components without
 * tripping SSR prerendering. The scroll-triggered draw animation lives in
 * the useReveal system; this standalone line renders in its final state.
 * Respects prefers-reduced-motion via the global CSS rule.
 */
export default function SignalLine({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      data-signal-line
      className={cn("signal-line-armed is-visible mb-4", className)}
    />
  )
}
