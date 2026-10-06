import { describe, it, expect } from "vitest"
import {
  decideRentRollPosture,
  depositDerivedOccupancy,
  occupancyVariance,
  parseNum,
} from "./calc"

describe("decideRentRollPosture", () => {
  it("advances when deposits reconcile within tolerance", () => {
    const result = decideRentRollPosture({
      reported: 0.9,
      variancePoints: 2.5,
      monthsUsed: 3,
      derived: 0.875,
    })
    expect(result.label).toBe("advance")
    expect(result.statement).toContain("within 5 points")
  })

  it("advances when deposits exceed the rent roll within tolerance (negative variance)", () => {
    const result = decideRentRollPosture({
      reported: 0.9,
      variancePoints: -3.0,
      monthsUsed: 4,
      derived: 0.93,
    })
    expect(result.label).toBe("advance")
  })

  it("pauses when deposits trail beyond tolerance (positive variance)", () => {
    const result = decideRentRollPosture({
      reported: 0.9,
      variancePoints: 12.0,
      monthsUsed: 3,
      derived: 0.78,
    })
    expect(result.label).toBe("pause")
    expect(result.statement).toContain("12.0 points apart")
  })

  it("pauses when deposits wildly exceed the rent roll (large negative variance)", () => {
    // Regression: the guard used `variancePoints > 5`, which never fired on
    // negative variance. A 2,910-point gap posted Advance.
    const result = decideRentRollPosture({
      reported: 0.9,
      variancePoints: -2910.0,
      monthsUsed: 3,
      derived: 30.0,
    })
    expect(result.label).toBe("pause")
    expect(result.statement).toContain("2,910.0 points apart")
  })

  it("advances at exactly 5 points (boundary, inclusive)", () => {
    expect(
      decideRentRollPosture({ reported: 0.9, variancePoints: 5.0, monthsUsed: 3, derived: 0.85 })
        .label,
    ).toBe("advance")
    expect(
      decideRentRollPosture({ reported: 0.9, variancePoints: -5.0, monthsUsed: 3, derived: 0.95 })
        .label,
    ).toBe("advance")
  })

  it("pauses just beyond 5 points in either direction", () => {
    expect(
      decideRentRollPosture({ reported: 0.9, variancePoints: 5.1, monthsUsed: 3, derived: 0.849 })
        .label,
    ).toBe("pause")
    expect(
      decideRentRollPosture({ reported: 0.9, variancePoints: -5.1, monthsUsed: 3, derived: 0.951 })
        .label,
    ).toBe("pause")
  })

  it("pauses when reported occupancy is missing", () => {
    const result = decideRentRollPosture({
      reported: null,
      variancePoints: null,
      monthsUsed: 3,
      derived: 0.88,
    })
    expect(result.label).toBe("pause")
    expect(result.statement).toContain("Missing evidence")
  })

  it("pauses when fewer than 3 deposit months are on the record", () => {
    const result = decideRentRollPosture({
      reported: 0.9,
      variancePoints: 1.0,
      monthsUsed: 2,
      derived: 0.89,
    })
    expect(result.label).toBe("pause")
    expect(result.statement).toContain("fewer than 3 deposit months")
  })

  it("pauses when no rent rows are on the record (derived null)", () => {
    const result = decideRentRollPosture({
      reported: 0.9,
      variancePoints: null,
      monthsUsed: 3,
      derived: null,
    })
    expect(result.label).toBe("pause")
    expect(result.statement).toContain("no rent rows")
  })
})

describe("depositDerivedOccupancy", () => {
  it("returns null occupancy when gross potential rent is zero (zero denominator)", () => {
    const { occupancy, monthsUsed } = depositDerivedOccupancy([45000, 46000, 44000], 0)
    expect(occupancy).toBeNull()
    expect(monthsUsed).toBe(0)
  })

  it("returns null occupancy when gross potential rent is null", () => {
    const { occupancy, monthsUsed } = depositDerivedOccupancy([45000], null)
    expect(occupancy).toBeNull()
    expect(monthsUsed).toBe(0)
  })

  it("ignores null and negative deposit months", () => {
    const { occupancy, monthsUsed } = depositDerivedOccupancy([45000, null, -100], 50000)
    expect(monthsUsed).toBe(1)
    expect(occupancy).toBeCloseTo(0.9, 5)
  })

  it("averages across valid months", () => {
    const { occupancy, monthsUsed } = depositDerivedOccupancy([45000, 46000, 44000], 50000)
    expect(monthsUsed).toBe(3)
    expect(occupancy).toBeCloseTo(0.9, 5)
  })
})

describe("occupancyVariance", () => {
  it("returns reported minus derived", () => {
    expect(occupancyVariance(0.9, 0.85)).toBeCloseTo(0.05, 5)
    expect(occupancyVariance(0.9, 30.0)).toBeCloseTo(-29.1, 5)
  })

  it("returns null when either side is missing", () => {
    expect(occupancyVariance(null, 0.85)).toBeNull()
    expect(occupancyVariance(0.9, null)).toBeNull()
  })
})

describe("parseNum (shared numeric parsing)", () => {
  it("rejects negative numbers", () => {
    expect(parseNum("-2000000")).toBeNull()
    expect(parseNum("-1")).toBeNull()
  })

  it("rejects garbage input", () => {
    expect(parseNum("168,000x")).toBeNull()
    expect(parseNum("abc")).toBeNull()
  })

  it("accepts valid positives, zero, commas, and decimals", () => {
    expect(parseNum("2000000")).toBe(2000000)
    expect(parseNum("0")).toBe(0)
    expect(parseNum("1,680,000")).toBe(1680000)
    expect(parseNum("4.5")).toBe(4.5)
  })

  it("treats blank as null", () => {
    expect(parseNum("")).toBeNull()
    expect(parseNum("   ")).toBeNull()
  })
})
