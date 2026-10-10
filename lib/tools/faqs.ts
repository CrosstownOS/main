export type Faq = { question: string; answer: string }

function faqPage(url: string, faqs: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
    url,
  }
}

const SITE = "https://www.crosstownosrv.camp"

export const SCREENER_FAQS: Faq[] = [
  {
    question: "What is an implied cap rate and how is it calculated here?",
    answer:
      "Implied cap rate is net operating income divided by price. This tool computes NOI from your inputs and divides by the asking price, so you see the yield the seller's own numbers imply.",
  },
  {
    question: "What does price per pad tell me?",
    answer:
      "Price per pad divides the asking price by the pad count. It is a comparability check across parks, not a valuation. The record supports comparing like assets; the human decides what counts as like.",
  },
  {
    question: "What is gross potential rent?",
    answer:
      "Gross potential rent is every pad filled at the stated lot rent for twelve months. It is the ceiling, not the forecast. The gap between gross potential and reported revenue is where diligence starts.",
  },
  {
    question: "What if I do not have all six inputs?",
    answer:
      "Leave them blank. Blank inputs are Missing evidence, never zero. The tool computes what the record supports and names what is missing, with an owner and a due date for each gap.",
  },
]

export const RENT_ROLL_FAQS: Faq[] = [
  {
    question: "Why can't I trust the rent roll as income verification?",
    answer:
      "The rent roll is a claim written by the seller. Deposits are the verification. This tool rebuilds occupancy from trailing bank deposits and measures the gap between the two.",
  },
  {
    question: "How does deposit-derived occupancy work?",
    answer:
      "Trailing monthly deposits are divided by gross potential monthly rent, averaged across the months on the record. Blank months are excluded from the average, never treated as zero.",
  },
  {
    question: "What does a variance over 5 points mean?",
    answer:
      "Deposits trail the reported occupancy by more than 5 points. The record supports Pause. That gap is either a retrade or a walk, and the record does not say which yet.",
  },
  {
    question: "What if the OM doesn't report occupancy?",
    answer:
      "Then reported occupancy is Missing evidence and the posture is Pause. The tool never asserts a comparison against a number that is not on the record.",
  },
]

export const EXPENSE_FAQS: Faq[] = [
  {
    question: "What is a normalized NOI?",
    answer:
      "Normalized net operating income is revenue minus the expenses a buyer will actually carry, with one-time and owner-specific costs removed as stated add-backs.",
  },
  {
    question: "What are add-backs and why must they be stated as assumptions?",
    answer:
      "Add-backs are expenses removed from the seller's numbers because a new owner would not incur them. Each one is an underwriting assumption, labeled as such, so the next reader can accept or reject it.",
  },
  {
    question: "What is the 10% retrade band?",
    answer:
      "If normalized NOI lands more than 10 percent below the seller's stated NOI, the record supports Retrade. That delta is the retrade number.",
  },
  {
    question: "What if I don't know whether an expense stays or goes?",
    answer:
      "Mark it Unresolved with an owner and a due date. Unresolved items stay on the record until someone resolves them. The tool never guesses for you.",
  },
]

export const UTILITY_FAQS: Faq[] = [
  {
    question: "What is the Arizona Rule?",
    answer:
      "The deal cannot move toward offer while a capacity-gate risk is unresolved, unless an authorized person waives it with a documented reason. The waiver is the record, not a handshake.",
  },
  {
    question: "What do red, amber, and green mean for water, sewer, and electric?",
    answer:
      "Red means capacity is a deal-level risk. Amber means capacity is constrained and needs verification. Green means capacity supports the park as operated. Each rating carries its reason on the record.",
  },
  {
    question: "Why does utility capacity kill deals?",
    answer:
      "Water, sewer, and electric are the physical ceiling on the asset. Somebody always eats the utilities. If capacity cannot support the pads, no underwriting survives it.",
  },
  {
    question: "What counts as a capacity gate?",
    answer:
      "Any system whose failure stops the park from operating as sold: water source and pressure, sewer treatment or septic capacity, electrical service and metering. If it gates the pads, it is on the register.",
  },
]

export const POH_TOH_FAQS: Faq[] = [
  {
    question: "Why value park-owned homes separately from lot rent?",
    answer:
      "Park-owned homes are depreciating personal property. Lot rent is real estate. Capitalizing home rent as real estate is how buyers overpay. Two businesses, one price tag, valued separately.",
  },
  {
    question: "What is the POH multiple?",
    answer:
      "The multiple of annual POH rent used to value the homes as personal property. It is an underwriting assumption, stated and adjustable, never a verified fact.",
  },
  {
    question: "What is blended gross rent yield?",
    answer:
      "Total annual rent from both businesses divided by the asking price. Context only. The split is the underwriting.",
  },
  {
    question: "What is the 5% split retrade band?",
    answer:
      "If the asking price exceeds the split-implied value by more than 5 percent, the record supports Retrade. That delta is the number you take back to the seller.",
  },
]

export const EMD_FAQS: Faq[] = [
  {
    question: "What is an EMD contingency clock?",
    answer:
      "A register of every contingency and deadline attached to your earnest money deposit. Dates move. Gates do not.",
  },
  {
    question: "Why does this tool never overstate time left?",
    answer:
      "It computes whole calendar days, so a gate expiring today reads today, not tomorrow. A deadline tool must err toward understating time, never overstating it.",
  },
  {
    question: "What happens when a gate goes past due?",
    answer:
      "It moves to past due and the posture updates. Past-due gates are named on the record with their exposure, not hidden.",
  },
  {
    question: "What if I have no contingencies entered?",
    answer:
      "Then nothing is tracked and the posture is Pause. The tool never declares Advance on a blank register.",
  },
]

export const TOOLS_INDEX_FAQS: Faq[] = [
  {
    question: "What are Live Diligence Working Papers?",
    answer:
      "Interactive diligence tools that run in your browser on your deal's numbers. Every input carries an evidence state. Every output shows its formula lineage. They are working papers, not calculators.",
  },
  {
    question: "Are the tools free?",
    answer:
      "Yes. The tools are free to use. Email is requested only when you save or export a working paper.",
  },
  {
    question: "What are evidence states?",
    answer:
      "Every number is labeled: Verified, Broker-reported, Missing evidence, Underwriting assumption, Calculated, or Unresolved. Captured is not verified. Missing is named, never zeroed.",
  },
  {
    question: "Do the tools tell me whether to buy?",
    answer:
      "No. The tools present what the record supports: Walk, Pause, Retrade, or Advance. The human decides.",
  },
]

export const WORKSPACE_FAQS: Faq[] = [
  {
    question: "What is the free pilot?",
    answer:
      "The first five buyers get the full Acquisition Workspace free. You run one live deal through it for 90 days. In exchange, you use it on a real deal, give feedback as you go, and if it works, let us quote you on the result.",
  },
  {
    question: "How long is the free pilot?",
    answer:
      "90 days. One live deal, from your first document to your decision file. Same length as the paid Single-Deal Workspace.",
  },
  {
    question: "What is included in the free pilot?",
    answer:
      "The full workspace: Source, Field, and Acquire. Not a demo or a limited version. You get the same product a paying buyer gets.",
  },
  {
    question: "What happens after the free pilot?",
    answer:
      "After the five pilot places fill, the price is 1,250 dollars for a Single-Deal Workspace (one property, 90 days) or 2,500 dollars for an Annual Workspace (unlimited properties, 12 months).",
  },
  {
    question: "What is the workspace fit call?",
    answer:
      "A 30-minute conversation about whether the CrosstownOS Acquisition Workspace matches what you need for your deal. For the free pilot, the fit call is how you qualify for one of the five spots. The call is about fit, not a sales pitch.",
  },
  {
    question: "What should I bring to the fit call?",
    answer:
      "Nothing required. If you have a broker package, your notes, or just the property address, bring that. For the trial, it helps if you have a live deal you are actively evaluating.",
  },
  {
    question: "Is there a refund on the free pilot?",
    answer:
      "There is nothing to refund. The pilot is free. The paid workspaces carry a 7-day money-back guarantee from activation.",
  },
]

export const FAQ_JSON_LD: Record<string, ReturnType<typeof faqPage>> = {
  "/tools/60-second-screener": faqPage(
    `${SITE}/tools/60-second-screener`,
    SCREENER_FAQS,
  ),
  "/tools/rent-roll-truth-check": faqPage(
    `${SITE}/tools/rent-roll-truth-check`,
    RENT_ROLL_FAQS,
  ),
  "/tools/expense-normalizer": faqPage(
    `${SITE}/tools/expense-normalizer`,
    EXPENSE_FAQS,
  ),
  "/tools/utility-capacity-triage": faqPage(
    `${SITE}/tools/utility-capacity-triage`,
    UTILITY_FAQS,
  ),
  "/tools/poh-toh-split": faqPage(`${SITE}/tools/poh-toh-split`, POH_TOH_FAQS),
  "/tools/emd-clock": faqPage(`${SITE}/tools/emd-clock`, EMD_FAQS),
  "/tools": faqPage(`${SITE}/tools`, TOOLS_INDEX_FAQS),
  "/workspace": faqPage(`${SITE}/workspace`, WORKSPACE_FAQS),
}

export const FAQ_LISTS: Record<string, Faq[]> = {
  "/tools/60-second-screener": SCREENER_FAQS,
  "/tools/rent-roll-truth-check": RENT_ROLL_FAQS,
  "/tools/expense-normalizer": EXPENSE_FAQS,
  "/tools/utility-capacity-triage": UTILITY_FAQS,
  "/tools/poh-toh-split": POH_TOH_FAQS,
  "/tools/emd-clock": EMD_FAQS,
  "/tools": TOOLS_INDEX_FAQS,
  "/workspace": WORKSPACE_FAQS,
}

// Deploy trigger 1791675106
