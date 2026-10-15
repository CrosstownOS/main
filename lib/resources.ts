export type Tool = {
  code: string
  title: string
  file: string
  part: string
  description: string
}

export type Part = {
  id: string
  name: string
  question: string
}

export const PARTS: Part[] = [
  { id: "A", name: "Before you fall for anything", question: "Is this deal even worth your time?" },
  { id: "B", name: "First contact", question: "Who is the seller, and what do they need?" },
  { id: "C", name: "The package", question: "What did they hand you, and what is missing?" },
  { id: "D", name: "Prove the numbers", question: "Does the income exist on paper you can touch?" },
  { id: "E", name: "Prove the ground", question: "Does the physical asset match the paper?" },
  { id: "F", name: "Decide and structure", question: "Advance, retrade, pause, or walk, and on what terms?" },
  { id: "G", name: "Own it", question: "How do you run it, review it, and keep records the next buyer will pay for?" },
]

const R = "/resources"

export const TOOLS: Tool[] = [
  // Part A
  { code: "AS-01", title: "The Walk-Away Pact", file: `${R}/CrosstownOS-Walk-Away-Pact.pdf`, part: "A", description: "Set your maximum price and your walk-away conditions in writing before you tour the park, while the numbers, not the seller's story, are still running the deal." },
  { code: "AS-02", title: "60-Second Deal Screener", file: `${R}/CrosstownOS-60-Second-Deal-Screener.pdf`, part: "A", description: "Six numbers and one minute: a first-pass screen for an RV park or mobile home park deal, so the listings that cannot work die before they eat your week." },
  { code: "AS-04", title: "5-Minute Mystery Shopper Script", file: `${R}/CrosstownOS-5-Minute-Mystery-Shopper-Script.pdf`, part: "A", description: "Call the park like a tenant. What the office tells a renter is often truer than what the seller tells a buyer." },
  { code: "AS-20", title: "Capital Plan: Sources and Uses", file: `${R}/CrosstownOS-Capital-Plan-Sources-and-Uses.pdf`, part: "A", description: "Lay out where the money for a park acquisition comes from and where it goes: purchase price, capital repairs, closing costs, and the reserve you keep." },
  { code: "AS-23", title: "Off-Market Sourcing System", file: `${R}/CrosstownOS-Off-Market-Sourcing-System.pdf`, part: "A", description: "Find park owners who never listed: a sourcing system built on county records, state license lists, and direct outreach, so your deals are not only broker deals." },
  { code: "AS-29", title: "Local Market Benchmark Builder", file: `${R}/CrosstownOS-Local-Market-Benchmark-Builder.pdf`, part: "A", description: "Build your own market baseline for a park deal: ten structured calls to competing parks turn into the local rates and occupancy you screen every offer against." },
  // Part B
  { code: "AS-03", title: "27-Question Seller Call Script", file: `${R}/CrosstownOS-27-Question-Seller-Call-Script.pdf`, part: "B", description: "Twenty-seven questions for your first call with a park seller, covering price, tenants, systems, and why he is selling, in the order that gets straight answers." },
  { code: "AS-21", title: "Seller Motivation Map", file: `${R}/CrosstownOS-Seller-Motivation-Map.pdf`, part: "B", description: "Map what a park seller needs and fears: retirement, debt, family pressure, tax timing, so the offer you structure answers their problem, not just price." },
  { code: "AS-27", title: "The Team Roster", file: `${R}/CrosstownOS-The-Team-Roster.pdf`, part: "B", description: "Build your acquisition team roster before you are under contract: who you need, what each professional verifies, and the stage of the deal where they step in." },
  // Part C
  { code: "AS-05", title: "Broker-Package Intake Sheet", file: `${R}/CrosstownOS-Broker-Package-Intake-Sheet.pdf`, part: "C", description: "An intake sheet for broker packages: log every document that arrived, flag what the memorandum claims but does not include, and label each item's status." },
  { code: "AS-06", title: "Evidence-Request List", file: `${R}/CrosstownOS-Evidence-Request-List.pdf`, part: "C", description: "The full evidence request list for a park acquisition: every document to ask the seller or broker for, who owes it, and how to mark what still has not arrived." },
  { code: "AS-28", title: "Insurance and Property-Tax Preflight", file: `${R}/CrosstownOS-Insurance-and-Property-Tax-Preflight.pdf`, part: "C", description: "Price a park's insurance and property taxes before you offer: start with the address and the assessor's record, and underwrite the bill you will actually get." },
  // Part D
  { code: "AS-08", title: "Mom-and-Pop Expense Normalizer", file: `${R}/CrosstownOS-Mom-and-Pop-Expense-Normalizer.pdf`, part: "D", description: "Restates a mom-and-pop seller's expenses at the cost of running the park yourself: labor, management, insurance, and the lines sellers leave out." },
  { code: "AS-08R", title: "The RV Expense Normalizer", file: `${R}/CrosstownOS-RV-Expense-Normalizer.pdf`, part: "D", description: "Restate an RV park seller's expenses with the lines RV deals hide: booking platform commissions, amenity costs, seasonal labor, and the true cost of each site." },
  { code: "AS-09", title: "POH/TOH Split-Valuation Worksheet", file: `${R}/CrosstownOS-POH-TOH-Split-Valuation-Worksheet.pdf`, part: "D", description: "Value park-owned homes and tenant-owned homes as the two separate businesses they are: a split worksheet for pricing each side of a manufactured housing deal." },
  { code: "AS-09R", title: "The Park-Owned Rental Valuation", file: `${R}/CrosstownOS-Park-Owned-Rental-Valuation.pdf`, part: "D", description: "Value the cabins and park-owned rentals inside an RV park or campground as rental businesses, with their own rates, seasons, and upkeep, not as padded lot rent." },
  { code: "AS-10", title: "Vacant-Pad Fill Calculator", file: `${R}/CrosstownOS-Vacant-Pad-Fill-Calculator.pdf`, part: "D", description: "Run the real math on vacant pads in a mobile home park: what it costs to fill one, how long it takes, and what a filled pad returns against the projection." },
  { code: "AS-10R", title: "The Transient-Site Fill Calculator", file: `${R}/CrosstownOS-Transient-Site-Fill-Calculator.pdf`, part: "D", description: "Model what filling transient RV sites actually earns across a season: nightly rates, occupancy swings, and turnover costs, instead of the seller's best month." },
  { code: "AS-12", title: "Manager Tell-All Interview", file: `${R}/CrosstownOS-Manager-Tell-All-Interview.pdf`, part: "D", description: "Interview questions for the on-site park manager: occupancy truth, problem tenants, deferred repairs, and what the seller never puts in writing." },
  { code: "AS-15", title: "The Rent-Roll Truth Check", file: `${R}/CrosstownOS-Rent-Roll-Truth-Check.pdf`, part: "D", description: "A worksheet for testing a seller's rent roll against bank deposits, leases, and the tax return, so the occupancy you underwrite is income you can point to." },
  { code: "AS-15R", title: "Rent-Roll Truth Check: RV Edition", file: `${R}/CrosstownOS-Rent-Roll-Truth-Check-RV-Edition.pdf`, part: "D", description: "The RV park edition of the rent-roll test: rebuild claimed revenue from the reservation system export, deposits, and sales tax filings, not the rate card." },
  { code: "AS-24", title: "RV Revenue Reality Check", file: `${R}/CrosstownOS-RV-Revenue-Reality-Check.pdf`, part: "D", description: "Find the revenue an RV park actually stabilizes at: separate the verified months from the seller's projections and underwrite the number that repeats." },
  // Part E
  { code: "AS-11", title: "Lot-by-Lot Walkthrough", file: `${R}/CrosstownOS-Lot-by-Lot-Walkthrough.pdf`, part: "E", description: "A pad-by-pad walkthrough for the site visit: condition, hookups, occupancy signs, and problems at every lot, recorded on the ground instead of from memory." },
  { code: "AS-13", title: "Utility and Wastewater Diligence Sheet", file: `${R}/CrosstownOS-Utility-and-Wastewater-Diligence-Sheet.pdf`, part: "E", description: "A diligence sheet for the water, sewer, and electric systems under a park: capacity, permits, age, and repair history, before they become your emergency." },
  // Part F
  { code: "AS-07", title: "The Offer Term-Sheet Builder", file: `${R}/CrosstownOS-Offer-Term-Sheet-Builder.pdf`, part: "F", description: "Build your offer term sheet before the broker builds it for you: price, earnest money, diligence period, contingencies, and seller financing terms." },
  { code: "AS-14", title: "Red-Flag Triage Board", file: `${R}/CrosstownOS-Red-Flag-Triage-Board.pdf`, part: "F", description: "A board for sorting every problem diligence surfaces on a park deal into watch, verify, or walk, so no red flag sits unlabeled while the contract clock runs." },
  { code: "AS-16", title: "Lender One-Pager", file: `${R}/CrosstownOS-Lender-One-Pager.pdf`, part: "F", description: "Put your park acquisition on one page the way a lender reads it: the asset, the verified numbers, the loan request, and the risks you have already priced in." },
  { code: "AS-17", title: "The EMD Countdown Tracker", file: `${R}/CrosstownOS-EMD-Countdown-Tracker.pdf`, part: "F", description: "Track every date in your purchase contract that touches earnest money: diligence deadlines, contingency expirations, and closing, on one countdown sheet." },
  { code: "AS-19", title: "The Decision File", file: `${R}/CrosstownOS-The-Decision-File.pdf`, part: "F", description: "One record where every worksheet, verification, and open question on a deal lands, ending in your decision on the record: advance, retrade, pause, or walk away." },
  { code: "AS-22", title: "Seller Note Anatomy", file: `${R}/CrosstownOS-Seller-Note-Anatomy.pdf`, part: "F", description: "Take a seller financing note apart piece by piece: rate, term, amortization, balloon, and default terms, and see how each one answers what the seller fears." },
  // Part G
  { code: "AS-18", title: "First-30-Days Takeover Sheet", file: `${R}/CrosstownOS-First-30-Days-Takeover-Sheet.pdf`, part: "G", description: "The first thirty days of owning a park, sequenced: accounts, utilities, tenant introductions, staff, and records, in the order a new owner actually has to move." },
  { code: "AS-25", title: "Deals I Walked Ledger and Post-Mortem", file: `${R}/CrosstownOS-Deals-I-Walked-Ledger.pdf`, part: "G", description: "Log every park deal you pass on and what killed it, price, numbers, or ground truth, so each walked deal sharpens the judgment you bring to the next one." },
  { code: "AS-26", title: "Tenant Communication and Rent Playbook", file: `${R}/CrosstownOS-Tenant-Communication-and-Rent-Playbook.pdf`, part: "G", description: "Plan what tenants hear when a park changes owners: what changes, what does not, who hears it first, and how rent conversations are handled in the first weeks." },
  { code: "AS-30", title: "Day-90 / Day-365 Operating Review", file: `${R}/CrosstownOS-Day-90-Day-365-Operating-Review.pdf`, part: "G", description: "Review your park at day 90 and day 365 against the baseline you set at closing: income, expenses, occupancy, and repairs, so drift shows up while it is cheap." },
  { code: "AS-31", title: "Buy It So You Can Sell It", file: `${R}/CrosstownOS-Buy-It-So-You-Can-Sell-It.pdf`, part: "G", description: "Keep the records the next buyer will pay for. You are always holding someone's future diligence file." },
]

export const TOOL_BY_CODE: Record<string, Tool> = Object.fromEntries(
  TOOLS.map((t) => [t.code, t])
)

export function resourceTitleSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
}

export function resourceSlug(tool: Tool): string {
  return resourceTitleSlug(tool.title)
}

export const TOOL_BY_SLUG: Record<string, Tool> = Object.fromEntries(
  TOOLS.map((tool) => [resourceSlug(tool), tool])
)

export const PART_BY_ID: Record<string, Part> = Object.fromEntries(
  PARTS.map((part) => [part.id, part])
)

export type Spine = {
  title: string
  file: string
  description: string
}

export const SPINES: Spine[] = [
  {
    title: "Start Here",
    file: `${R}/CrosstownOS-Start-Here.pdf`,
    description: "New to the CrosstownOS working papers? Start here: how the 35 diligence worksheets fit together, which part matches your deal stage, and what to print first.",
  },
  {
    title: "The Journey Map",
    file: `${R}/CrosstownOS-Journey-Map.pdf`,
    description: "The map of all 35 CrosstownOS working papers in deal order, from first look to first year of ownership, so you can find the worksheet your stage calls for.",
  },
  {
    title: "The Evidence Status Standard",
    file: `${R}/CrosstownOS-Evidence-Status-Standard.pdf`,
    description: "The CrosstownOS standard that labels every claim in a deal with one status letter, so a verified number never sits in your file looking like a seller's guess.",
  },
]

export type ResourceDetail = {
  slug: string
  title: string
  description: string
  file: string
  code?: string
  part?: string
}

export const RESOURCE_DETAILS: ResourceDetail[] = [
  ...TOOLS.map((tool) => ({
    slug: resourceSlug(tool),
    title: tool.title,
    description: tool.description,
    file: tool.file,
    code: tool.code,
    part: tool.part,
  })),
  ...SPINES.map((spine) => ({
    slug: resourceTitleSlug(spine.title),
    title: spine.title,
    description: spine.description,
    file: spine.file,
  })),
]

export const RESOURCE_DETAIL_BY_SLUG: Record<string, ResourceDetail> =
  Object.fromEntries(RESOURCE_DETAILS.map((resource) => [resource.slug, resource]))

export type NextStep = { code: string; why: string }

export type Situation = {
  id: string
  label: string
  question: string
  starts: { code: string; note: string }[]
  next: NextStep[]
}

export const SITUATIONS: Situation[] = [
  {
    id: "a",
    label: "I just received a broker package.",
    question: "Start with the intake. Log what they handed you before you believe any of it.",
    starts: [{ code: "AS-05", note: "Log what the package claims and flag what is missing." }],
    next: [
      { code: "AS-06", why: "AS-05 hands you the missing items. AS-06 turns them into the ask list." },
      { code: "AS-15", why: "AS-06 hands the income claim to AS-15. Prove it against deposits, leases, and the tax return." },
      { code: "AS-08", why: "AS-15 hands verified revenue to AS-08. Restate the expenses against real income." },
    ],
  },
  {
    id: "b",
    label: "I have a package but I do not trust the numbers.",
    question: "Pick your park type. Both paths rebuild the income from paper you can touch.",
    starts: [
      { code: "AS-15", note: "MHC: rebuild the income from deposits, leases, and the tax return." },
      { code: "AS-15R", note: "RV park: rebuild the revenue from the reservation export, deposits, and tax filings." },
    ],
    next: [],
  },
  {
    id: "c",
    label: "I am preparing for a site visit.",
    question: "Start with the walk. The ground truth comes before the spreadsheet.",
    starts: [{ code: "AS-11", note: "Walk every pad and write down what you see." }],
    next: [
      { code: "AS-10", why: "AS-11 hands your walk counts to AS-10. Price what filling the vacant pads actually returns." },
      { code: "AS-07", why: "AS-10 hands the fill math to AS-07. Structure the offer on walked numbers." },
      { code: "AS-17", why: "AS-07 hands the signed terms to AS-17. The clock starts at contract." },
    ],
  },
  {
    id: "d",
    label: "I am under contract or nearing an offer deadline.",
    question: "Start with the clock. Then re-lock what makes you walk before time pressure decides.",
    starts: [{ code: "AS-17", note: "Every date in the signed contract, tracked. The clock is the deal now." }],
    next: [
      { code: "AS-01", why: "AS-17 hands the deadline pressure to AS-01. Re-lock your walk-away price before the clock decides for you." },
      { code: "AS-14", why: "AS-01 hands your walk conditions to AS-14. Triage every open flag against them." },
      { code: "AS-07", why: "AS-14 hands the structured flags to AS-07. Retrade or hold your terms with evidence." },
    ],
  },
  {
    id: "e",
    label: "I am closing or preparing to operate the asset.",
    question: "Start with the first thirty days. Ownership is a sequence, not a moment.",
    starts: [{ code: "AS-18", note: "The first thirty days of ownership, sequenced." }],
    next: [
      { code: "AS-26", why: "AS-18 hands the takeover to AS-26. Tell tenants what is changing before rumors do." },
      { code: "AS-30", why: "AS-26 hands the stabilized operation to AS-30. Review it against your day-one baseline." },
      { code: "AS-31", why: "AS-30 hands the reviewed record to AS-31. Keep every record the next buyer will pay for." },
    ],
  },
]

export const SITUATION_B_BRANCHES: Record<string, NextStep[]> = {
  "AS-15": [
    { code: "AS-08", why: "AS-15 hands verified revenue to AS-08. Restate what the place actually costs to run." },
    { code: "AS-09", why: "AS-08 hands the cleaned numbers to AS-09. Split the homes from the dirt and value them separately." },
    { code: "AS-07", why: "AS-09 hands the split valuation to AS-07. Structure the offer on separated numbers." },
  ],
  "AS-15R": [
    { code: "AS-24", why: "AS-15R hands verified months to AS-24. Find what the revenue really stabilizes at." },
    { code: "AS-08R", why: "AS-24 hands stabilized revenue to AS-08R. Restate the RV expenses with OTA and amenity lines." },
    { code: "AS-07", why: "AS-08R hands the real NOI to AS-07. Structure the offer on it." },
  ],
}
