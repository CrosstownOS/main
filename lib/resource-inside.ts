/**
 * "Inside the tool" data for resource detail pages (extraction-layer Draft 8).
 * Every string is taken from the resource's own PDF: its Takes in line, its
 * Hands to line, and its named sections. Code references are expanded to
 * "Title (CODE)" following the pattern drafted for AS-13. No contents are
 * invented for any worksheet. The three spine documents state no Takes in /
 * Hands to lines in their PDFs, so they have no entry here.
 */
export type ResourceInside = {
  takesIn: string
  handsTo: string
  holds: string
  standard?: string
}

export const RESOURCE_INSIDE: Record<string, ResourceInside> = {
  "the-walk-away-pact": {
    takesIn: "nothing. Your nerve comes first",
    handsTo:
      "the 60-Second Deal Screener (AS-02), the Offer Term-Sheet Builder (AS-07), the Red-Flag Triage Board (AS-14)",
    holds:
      "temperament: circle the one that owns you on a hot deal; the money I am willing to lose; three deal-killers; a named accountability partner",
  },
  "60-second-deal-screener": {
    takesIn: "a listing or a broker whisper",
    handsTo: "the 27-Question Seller Call Script (AS-03), the Walk-Away Pact (AS-01)",
    holds:
      "two tracks, MHC lot-rent and RV, each with its inputs and its math lines: gross potential rent, effective income, the expense ratio, NOI, max offer, and the gap to asking; the sensitivity strip, three cap rates times two expense ratios; the RV track, the reverse solve, and the verdict stamp; the 20-row screen log",
  },
  "5-minute-mystery-shopper-script": {
    takesIn: "the package's claims",
    handsTo:
      "the Broker-Package Intake Sheet (AS-05), the Rent-Roll Truth Check (AS-15) or the Rent-Roll Truth Check: RV Edition (AS-15R)",
    holds:
      "before you dial: circle your track; the script: run your track, all eight questions; the scoring box; what a mismatch means",
  },
  "capital-plan-sources-and-uses": {
    takesIn: "price, capex bids, reserve target",
    handsTo: "the Lender One-Pager (AS-16), the Decision File (AS-19)",
    holds:
      "sources: where the money comes from; uses: where the money goes; first-year cash runway; stress tests: run all four before you sign",
  },
  "off-market-sourcing-system": {
    takesIn: "county records and license lists",
    handsTo: "the 27-Question Seller Call Script (AS-03)",
    holds:
      "where the names come from; score the list before you mail; the owner letter: one page, no wholesaler energy; the follow-up cadence tracker",
  },
  "local-market-benchmark-builder": {
    takesIn: "ten 5-Minute Mystery Shopper Script (AS-04) calls",
    handsTo: "the 60-Second Deal Screener (AS-02), the Decision File (AS-19)",
    holds:
      "the ten calls; rent comps; how to read the table; fee comps; competition and demand; the number",
  },
  "27-question-seller-call-script": {
    takesIn: "a passing 60-Second Deal Screener (AS-02) screen",
    handsTo:
      "the Broker-Package Intake Sheet (AS-05), the Evidence-Request List (AS-06), the Offer Term-Sheet Builder (AS-07)",
    holds:
      "six question groups: the owner, the park, the numbers, infrastructure and regulators, the homes, and the deal",
  },
  "seller-motivation-map": {
    takesIn: "the first call",
    handsTo: "the Offer Term-Sheet Builder (AS-07), Seller Note Anatomy (AS-22)",
    holds:
      "the six seller types: listen, do not label; first-call emphasis: the first call maps, it does not negotiate; structures to consider, matched to needs; from map to offer",
  },
  "the-team-roster": {
    takesIn: "the deal timeline",
    handsTo: "the right pro at the right time",
    holds:
      "the roster table: who to hire, when to hire them, what to ask, and the answer that should worry you, for the real estate attorney, the CPA, the insurance broker, the inspector, the engineer, the lender, and the manager; how to run the roster; a worked example",
  },
  "broker-package-intake-sheet": {
    takesIn: "the broker package and your call notes",
    handsTo: "the Evidence-Request List (AS-06)",
    holds:
      "the Critical 12: the twelve documents that must reach V before an LOI, scored with the Evidence Score; beyond the Critical 12: the rest of the intake, with status, source, and date; package-quality flags; counts and the call",
  },
  "evidence-request-list": {
    takesIn: "the M and U items from the Broker-Package Intake Sheet (AS-05)",
    handsTo:
      "the Rent-Roll Truth Check (AS-15) or the Rent-Roll Truth Check: RV Edition (AS-15R), the Mom-and-Pop Expense Normalizer (AS-08) or the RV Expense Normalizer (AS-08R), the EMD Countdown Tracker (AS-17)",
    holds:
      "the cover email, ready to paste; Tier 1: gates further spend; Tier 2: must be in before EMD hardens; Tier 3: before close; the request log and the response scorecard",
  },
  "insurance-and-property-tax-preflight": {
    takesIn: "the address and the assessor",
    handsTo:
      "the Capital Plan: Sources and Uses (AS-20), the Offer Term-Sheet Builder (AS-07)",
    holds:
      "insurance quotes before the offer; the quote sheet; the property-tax reassessment estimate; the rule",
  },
  "mom-and-pop-expense-normalizer": {
    takesIn: "verified revenue, 12 months of bills",
    handsTo:
      "the POH/TOH Split-Valuation Worksheet (AS-09), the Offer Term-Sheet Builder (AS-07), the Lender One-Pager (AS-16)",
    holds:
      "the worksheet; the owner-labor test; the Bridge: deposit-basis NOI to normalized NOI; lender view vs. operator view",
  },
  "the-rv-expense-normalizer": {
    takesIn: "RV P and L with OTA and amenity lines",
    handsTo:
      "the Offer Term-Sheet Builder (AS-07), the Lender One-Pager (AS-16), the Decision File (AS-19)",
    holds: "why RV expenses can mislead; the normalize worksheet; normalized NOI",
  },
  "poh-toh-split-valuation-worksheet": {
    takesIn: "verified rent and the home inventory",
    handsTo: "the Offer Term-Sheet Builder (AS-07), the Red-Flag Triage Board (AS-14)",
    holds:
      "the home ledger: one row per park-owned home; View 1: in-place income value; View 2: liquidation value; the POH policy: decide before the walk; the TOH exposure log; a worked example",
  },
  "the-park-owned-rental-valuation": {
    takesIn: "cabin and park-model inventory",
    handsTo: "the RV Expense Normalizer (AS-08R), the Offer Term-Sheet Builder (AS-07)",
    holds:
      "the unit ledger (one row per unit); two views of value; separate the two incomes; the policy decision",
  },
  "vacant-pad-fill-calculator": {
    takesIn: "your walk counts and verified rent",
    handsTo: "the Offer Term-Sheet Builder (AS-07), the Lender One-Pager (AS-16)",
    holds:
      "the upside credit rule: the seller gets zero credit for unrealized upside; three fill paths, with what you pay, the time, and the risk; per-path math: plan cost, likely cost, and bad cost, then yield on cost, value created, and payback; the lease-up curve and the stall check",
  },
  "the-transient-site-fill-calculator": {
    takesIn: "transient site count and seasonality",
    handsTo: "the RV Expense Normalizer (AS-08R), the Offer Term-Sheet Builder (AS-07)",
    holds:
      "per-site fill cost build; the overrun stress test; stabilized upside; the lease-up curve; fund it from where",
  },
  "manager-tell-all-interview": {
    takesIn: "your 27-Question Seller Call Script (AS-03) notes and the rent roll",
    handsTo:
      "the Red-Flag Triage Board (AS-14), the First-30-Days Takeover Sheet (AS-18)",
    holds:
      "the fair housing box: read before you ask anything; the manager as an asset: size up the person, not just the facts; the interview: ask, then shut up; the Verify One rule; the second interview: the vendors; the decision: retain, transition, or replace",
  },
  "the-rent-roll-truth-check": {
    takesIn: "rent roll, leases, bank deposits, tax return",
    handsTo: "the Mom-and-Pop Expense Normalizer (AS-08), the Red-Flag Triage Board (AS-14)",
    holds:
      "the Gap Bridge; the sampling protocol: under 40 lots, verify every lot, 40 lots and up, sample about 30% plus every anomaly; the cash test; the fourth document; anomaly flags to work; what the gap means",
  },
  "rent-roll-truth-check-rv-edition": {
    takesIn: "reservation export, deposits, tax filings",
    handsTo: "the RV Revenue Reality Check (AS-24), the Decision File (AS-19)",
    holds:
      "sort the sites first; get the raw export, run the report yourself; the 12-month tie-out; site-night math; the reservation trace; the RV Gap Bridge; the outside checks; RV anomaly flags; what the gap means and how to work it; the boundary with M4",
  },
  "rv-revenue-reality-check": {
    takesIn: "the verified months from the Rent-Roll Truth Check: RV Edition (AS-15R)",
    handsTo: "the RV Expense Normalizer (AS-08R), the Decision File (AS-19)",
    holds:
      "the mix: where the revenue actually comes from; occupancy and ADR by month: fill from the reservation export; pull these before you believe any revenue number; strip the peak-season story down to a stabilized number",
  },
  "lot-by-lot-walkthrough": {
    takesIn: "the rent roll's lot list",
    handsTo:
      "the Vacant-Pad Fill Calculator (AS-10) or the Transient-Site Fill Calculator (AS-10R), the Red-Flag Triage Board (AS-14), the First-30-Days Takeover Sheet (AS-18)",
    holds:
      "the 1 to 3 scale, defined; the walk protocols: walk alone first, then with the manager, the dusk walk, the after-rain walk, winter if you can; the lot grid: about 30 seconds per lot; page 2: RV systems, the tally, the map, and the truck kit",
  },
  "utility-and-wastewater-diligence-sheet": {
    takesIn: "the utility documents from the Evidence-Request List (AS-06)",
    handsTo:
      "the Red-Flag Triage Board (AS-14), the Offer Term-Sheet Builder (AS-07), the EMD Countdown Tracker (AS-17)",
    holds:
      "what the seller said vs what you found, side by side; the Utility Exposure Register across water, wastewater, electric, gas and propane, and stormwater and roads, each with permit status, permitted vs actual capacity, age and condition, and a low, base, and high price; the one-page Specialist Brief you hand the engineer",
    standard:
      "every line carries an evidence state, V, B, M, A, C, or U, and ends in a decision: price, escrow holdback, cure before close, or walk",
  },
  "the-offer-term-sheet-builder": {
    takesIn:
      "the Seller Motivation Map (AS-21), the Mom-and-Pop Expense Normalizer (AS-08), the POH/TOH Split-Valuation Worksheet (AS-09), the Red-Flag Triage Board (AS-14), the Walk-Away Pact (AS-01)",
    handsTo: "your attorney, then the EMD Countdown Tracker (AS-17)",
    holds:
      "what the seller actually needs; the offer ladder; give / need; three pre-built structures; the missing terms (short fields)",
  },
  "red-flag-triage-board": {
    takesIn: "findings from every tool",
    handsTo: "the Offer Term-Sheet Builder (AS-07), the Walk-Away Pact (AS-01)",
    holds:
      "the three dials; the board; your custom flags; the three outputs; the upside list; post-deal log: which flags were real",
  },
  "lender-one-pager": {
    takesIn:
      "the Mom-and-Pop Expense Normalizer (AS-08), the POH/TOH Split-Valuation Worksheet (AS-09), the Vacant-Pad Fill Calculator (AS-10), the Utility and Wastewater Diligence Sheet (AS-13)",
    handsTo: "the EMD Countdown Tracker (AS-17), the Offer Term-Sheet Builder (AS-07)",
    holds:
      "the loan summary; DSCR three ways; stress rows; the borrower block; the 12 questions, one answer line each; the first-timer answer guide; the lender tracker",
  },
  "the-emd-countdown-tracker": {
    takesIn: "the signed contract's dates",
    handsTo: "the Walk-Away Pact (AS-01)",
    holds:
      "the hard date and the back-schedule; the milestone tracker; the buyer-filled lead-time table; the extension request (plain language; your attorney adapts it); the no-waiver ladder; the ten-minute weekly clock review",
  },
  "the-decision-file": {
    takesIn: "every tool's output",
    handsTo: "your decision: advance, retrade, pause, walk",
    holds:
      "what is verified; the Bridge, in dollars; what is claimed but not proven; what is still missing; the price the evidence supports; walk triggers; the decision",
  },
  "seller-note-anatomy": {
    takesIn: "the Seller Motivation Map (AS-21)",
    handsTo: "the Offer Term-Sheet Builder (AS-07)",
    holds:
      "the terms that matter; security: what the seller holds; subordination: how to explain the term to the seller; balloon risk: the refinance plan is dated before you sign; default and cure; the seller concerns this sheet lists, and how the paper answers them; the attorney line",
  },
  "first-30-days-takeover-sheet": {
    takesIn: "the closed deal and your diligence file",
    handsTo:
      "the Tenant Communication and Rent Playbook (AS-26), the Day-90 / Day-365 Operating Review (AS-30)",
    holds:
      "Day 0: before the money moves; Days 1 to 7: money, insurance, rent flow; Days 8 to 30: set the culture; Days 31 to 90: the first quarter; Days 91 to 365: the first-year rhythm; the tenant communication kit; the Baseline Sheet: ten numbers, captured at close; the Day-30 review: underwriting vs reality",
  },
  "deals-i-walked-ledger-and-post-mortem": {
    takesIn: "every deal you pass on",
    handsTo: "your calibration",
    holds:
      "the ledger; what a good walk reason looks like; post-mortem: one deal per quarter, minimum; the calibration engine",
  },
  "tenant-communication-and-rent-playbook": {
    takesIn: "closing and the rent roll",
    handsTo: "the Day-90 / Day-365 Operating Review (AS-30)",
    holds:
      "the new-owner letter: send in week one; rules reissue; rent-increase logic; delinquency escalation; resident relations",
  },
  "day-90-day-365-operating-review": {
    takesIn: "your day-one baseline",
    handsTo: "Buy It So You Can Sell It (AS-31)",
    holds:
      "baseline vs now; the quarterly walk; the deposit check; reserve refresh; value-add sequencing: first, second, third",
  },
  "buy-it-so-you-can-sell-it": {
    takesIn: "everything the next buyer will demand",
    handsTo: "the eventual sale",
    holds:
      "the exit sheet: what the next buyer will demand; what makes a buyer able to finance it; your exit targets, written at purchase; the one missing item that matters most",
  },
}
