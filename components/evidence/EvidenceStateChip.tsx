import { EVIDENCE_STATES, type EvidenceState } from "@/lib/tools/evidence"
import { cn } from "@/lib/utils"

/**
 * The one evidence-state chip, matching the /tools hub reference card:
 * near-black fill, mono uppercase letter + full canonical name, colors
 * from lib/tools/evidence.ts chipClass (pinned literals, one system).
 * Every surface that presents a state identity renders this chip.
 */
export const EVIDENCE_CHIP_CLASS =
  "inline-flex items-center gap-1.5 border bg-[oklch(0.06_0.005_80)] px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.18em]"

export function EvidenceStateChip({
  state,
  className,
}: {
  state: EvidenceState
  className?: string
}) {
  const info = EVIDENCE_STATES[state]
  return (
    <span
      title={info.definition}
      className={cn(EVIDENCE_CHIP_CLASS, info.chipClass, className)}
    >
      <span aria-hidden="true">{info.code}</span>
      <span>{info.title}</span>
    </span>
  )
}

const KEY_BY_TITLE: Record<string, EvidenceState> = Object.fromEntries(
  (Object.keys(EVIDENCE_STATES) as EvidenceState[]).map((key) => [
    EVIDENCE_STATES[key].title,
    key,
  ]),
)

/** Map a canonical state title ("Missing evidence") to its evidence key. */
export function evidenceStateKey(title: string): EvidenceState {
  return KEY_BY_TITLE[title] ?? "unresolved"
}
