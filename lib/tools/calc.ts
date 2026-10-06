/**
 * Deterministic calculation core for the CrosstownOS interactive tools.
 * Pure functions only. Every formula is visible here, and each tool shows
 * its lineage in the UI. Code calculates; people confirm.
 */

/** Implied cap rate = NOI / price. Returns null when inputs are missing or price is zero. */
export function impliedCapRate(noi: number | null, price: number | null): number | null {
  if (noi == null || price == null || price === 0) return null
  return noi / price
}

/** Price per pad/site = price / count. */
export function pricePerPad(price: number | null, pads: number | null): number | null {
  if (price == null || pads == null || pads === 0) return null
  return price / pads
}

/** Gross potential annual rent = pads * avg monthly rent * 12. */
export function grossPotentialAnnual(pads: number | null, avgRent: number | null): number | null {
  if (pads == null || avgRent == null) return null
  return pads * avgRent * 12
}

/** Expense ratio = annual expenses / gross potential annual revenue. */
export function expenseRatio(expenses: number | null, grossPotential: number | null): number | null {
  if (expenses == null || grossPotential == null || grossPotential === 0) return null
  return expenses / grossPotential
}

/**
 * Deposit-derived paying occupancy for one month = deposits / gross potential monthly rent.
 * Averaged across the months provided. Missing months are never averaged in.
 */
export function depositDerivedOccupancy(
  deposits: (number | null)[],
  grossPotentialMonthly: number | null,
): { occupancy: number | null; monthsUsed: number } {
  const valid = deposits.filter((d): d is number => d != null && d >= 0)
  if (valid.length === 0 || grossPotentialMonthly == null || grossPotentialMonthly === 0) {
    return { occupancy: null, monthsUsed: 0 }
  }
  const sum = valid.reduce((a, b) => a + b, 0)
  return { occupancy: sum / valid.length / grossPotentialMonthly, monthsUsed: valid.length }
}

/** Variance = reported - derived. Positive means the OM overstates. */
export function occupancyVariance(reported: number | null, derived: number | null): number | null {
  if (reported == null || derived == null) return null
  return reported - derived
}

/** Normalized NOI = revenue - normalized expenses. All inputs explicit. */
export function normalizedNoi(revenue: number | null, expenses: number | null): number | null {
  if (revenue == null || expenses == null) return null
  return revenue - expenses
}

/** Management normalization = effective gross income * rate. Rate is a stated, adjustable assumption. */
export function managementNormalization(egi: number | null, rate: number): number | null {
  if (egi == null) return null
  return egi * rate
}

/**
 * Split valuation: lot rent capitalized as real estate, POH rent valued
 * as personal-property income at a stated multiple. Returns nulls when inputs are missing.
 */
export function splitValuation(args: {
  tenantOwnedCount: number | null
  lotRent: number | null
  capRate: number | null
  parkOwnedCount: number | null
  pohRent: number | null
  pohMultiple: number | null
}): { lotValue: number | null; pohValue: number | null; splitValue: number | null } {
  const { tenantOwnedCount, lotRent, capRate, parkOwnedCount, pohRent, pohMultiple } = args
  const lotValue =
    tenantOwnedCount != null && lotRent != null && capRate != null && capRate > 0
      ? ((tenantOwnedCount * lotRent * 12) / capRate)
      : null
  const pohValue =
    parkOwnedCount === 0
      ? 0
      : parkOwnedCount != null && pohRent != null && pohMultiple != null && pohMultiple > 0
        ? parkOwnedCount * pohRent * 12 * pohMultiple
        : null
  const splitValue = lotValue != null && pohValue != null ? lotValue + pohValue : null
  return { lotValue, pohValue, splitValue }
}

/** Whole calendar days from today until a date string (YYYY-MM-DD). 0 when the date is today. Negative when past. */
export function daysUntil(dateStr: string | null): number | null {
  if (!dateStr) return null
  const target = new Date(dateStr + "T12:00:00")
  if (Number.isNaN(target.getTime())) return null
  const now = new Date()
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  const startOfTarget = new Date(target.getFullYear(), target.getMonth(), target.getDate())
  const ms = startOfTarget.getTime() - startOfToday.getTime()
  return Math.round(ms / 86_400_000)
}

/** True when the input is non-blank but not a valid non-negative number. */
export function isInvalidNum(raw: string): boolean {
  const cleaned = raw.replace(/[$,%\s]/g, "")
  if (cleaned === "") return false
  const n = Number(cleaned)
  return !Number.isFinite(n) || n < 0
}

/** Parse a user-typed number. Returns null for blank, unparseable, or negative. Never coerces blank to zero. */
export function parseNum(raw: string): number | null {
  const cleaned = raw.replace(/[$,%\s]/g, "")
  if (cleaned === "") return null
  const n = Number(cleaned)
  if (!Number.isFinite(n)) return null
  if (n < 0) return null
  return n
}

export function fmtMoney(n: number | null, digits = 0): string {
  if (n == null) return "n/a"
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  })
}

export function fmtPct(n: number | null, digits = 1): string {
  if (n == null) return "n/a"
  return `${(n * 100).toFixed(digits)}%`
}

export function fmtNum(n: number | null, digits = 0): string {
  if (n == null) return "n/a"
  return n.toLocaleString("en-US", { maximumFractionDigits: digits, minimumFractionDigits: digits })
}

/**
 * Rent-roll truth check posture decision. Pure function for testability.
 * Variance tolerance is two-sided: |variance| > 5 points pauses in either direction.
 */
export type RentRollPostureInput = {
  reported: number | null
  variancePoints: number | null
  monthsUsed: number
  derived: number | null
}

export function decideRentRollPosture(input: RentRollPostureInput): {
  label: "pause" | "advance"
  statement: string
} {
  const { reported, variancePoints, monthsUsed, derived } = input
  if (reported == null) {
    return {
      label: "pause",
      statement:
        "The record supports Pause: reported occupancy is Missing evidence. The truth check needs the OM's number to measure the deposits against. Pull it from the broker package.",
    }
  }
  if (variancePoints != null && Math.abs(variancePoints) > 5) {
    return {
      label: "pause",
      statement: `The record supports Pause: deposits and the OM are ${fmtNum(
        Math.abs(variancePoints),
        1,
      )} points apart. The rent roll is a claim. Deposits are the verification. That gap is either a retrade or a walk, and the record does not say which yet.`,
    }
  }
  if (monthsUsed < 3) {
    return {
      label: "pause",
      statement:
        "The record supports Pause: fewer than 3 deposit months are on the record. The rent roll is a claim. Deposits are the verification. Name who pulls the statements and when.",
    }
  }
  if (derived == null) {
    return {
      label: "pause",
      statement:
        "The record supports Pause: no rent rows are on the record, so deposits cannot be measured against the rent roll's monthly total. Add the rows before the truth check can run.",
    }
  }
  return {
    label: "advance",
    statement: `The record supports Advance: deposits back the reported occupancy within 5 points across ${monthsUsed} months. The rent roll is a claim. Deposits are the verification. Advance means proceed to full diligence, never proceed to buy.`,
  }
}
