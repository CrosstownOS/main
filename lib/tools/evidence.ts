/**
 * Evidence states and readiness labels for the CrosstownOS interactive tools.
 * Titles, definitions, and chip classes match /parkproof-standard exactly.
 * A standard is byte-identical everywhere it appears.
 */

export type EvidenceState =
  | "verified"
  | "broker-reported"
  | "missing"
  | "assumption"
  | "calculated"
  | "unresolved"

export type ReadinessLabel = "walk" | "pause" | "retrade" | "advance"

/**
 * Chip colors are pinned to literal values (the :root token values, with the
 * /60 border expressed as the color-mix Tailwind compiles it to) so the six
 * states keep their exact colors in every token scope, cream included.
 * Calculated is the exception: it carries the --calculated token, whose
 * scopes are tuned per surface like its siblings.
 */
export const EVIDENCE_STATES: Record<
  EvidenceState,
  { code: string; title: string; definition: string; chipClass: string }
> = {
  verified: {
    code: "V",
    title: "Verified",
    definition: "Backed by evidence you can point to, and reviewed by a person.",
    chipClass:
      "border-[color-mix(in_oklab,oklch(0.60_0.13_148)_60%,transparent)] text-[oklch(0.60_0.13_148)]",
  },
  "broker-reported": {
    code: "B",
    title: "Broker-reported",
    definition:
      "Reported in an OM, call, model, or broker package; not independently checked yet.",
    chipClass:
      "border-[color-mix(in_oklab,oklch(0.65_0.12_55)_60%,transparent)] text-[oklch(0.65_0.12_55)]",
  },
  missing: {
    code: "M",
    title: "Missing evidence",
    definition: "Material information has not been received or located yet.",
    chipClass:
      "border-[color-mix(in_oklab,oklch(0.62_0.16_25)_60%,transparent)] text-[oklch(0.62_0.16_25)]",
  },
  assumption: {
    code: "A",
    title: "Underwriting assumption",
    definition: "A stated input in the investment case; not a verified fact.",
    chipClass:
      "border-[color-mix(in_oklab,oklch(0.628_0.179_258)_60%,transparent)] text-[oklch(0.628_0.179_258)]",
  },
  calculated: {
    code: "C",
    title: "Calculated",
    definition:
      "An output calculated from stated inputs. The calculation is only as reliable as the inputs behind it.",
    chipClass: "border-calculated/60 text-calculated",
  },
  unresolved: {
    code: "U",
    title: "Unresolved",
    definition:
      "A material claim remains open because sources conflict, a review is incomplete, or the answer has not been established.",
    chipClass: "border-[oklch(0.20_0.02_80)] text-[oklch(0.72_0.02_80)]",
  },
}

/** States a user can assign to their own inputs. Assumption and Calculated are set by the tool, not the user. */
export const INPUT_STATES: EvidenceState[] = [
  "broker-reported",
  "verified",
  "missing",
  "unresolved",
]

export const READINESS_LABELS: Record<
  ReadinessLabel,
  { title: string; body: string }
> = {
  walk: {
    title: "Walk",
    body: "The buyer's stated walk conditions are met on the record. Walk has the highest precedence when more than one label is triggered.",
  },
  pause: {
    title: "Pause",
    body: "A material gate is missing, sources conflict on a gating field, or the evidence is not yet sufficient. Pause is also the fall-through when no label can be supported.",
  },
  retrade: {
    title: "Retrade",
    body: "The evidence is sufficient, but price or terms sit outside the modeled range produced from approved inputs.",
  },
  advance: {
    title: "Advance",
    body: "The evidence is sufficient, the gates are clear, and price and terms sit within the modeled range. Advance records readiness. It does not tell the buyer to transact.",
  },
}

export const READINESS_DISCLAIMER =
  "Advance, Retrade, Pause, and Walk are evidence-readiness labels. They are not recommendations, approvals, or advice."

/** Doctrine line every tool prints under its posture. */
export const POSTURE_FOOTER =
  "Calculated from your inputs. Nothing here is verified until you verify it. The human decides."
