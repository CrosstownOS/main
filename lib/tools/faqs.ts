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
      "Reported occupancy and deposit-derived occupancy are more than 5 points apart in either direction. The record supports Pause. That gap is either a retrade or a walk, and the record does not say which yet.",
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
      "Normalized net operating income is revenue minus the expenses you keep on the record, with costs you mark as add-backs excluded and labeled as underwriting assumptions.",
  },
  {
    question: "What are add-backs and why must they be stated as assumptions?",
    answer:
      "Add-backs are expenses removed from the seller's numbers because a new owner would not incur them. Each one is an underwriting assumption, labeled as such, so the next reader can accept or reject it.",
  },
  {
    question: "What is the 10% retrade band?",
    answer:
      "A tolerance set by this tool, not a market rule. If normalized NOI lands more than 10 percent below the seller's stated NOI, the record supports Retrade. That delta is the amount behind the Retrade label.",
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
      "In this tool, Green (Clear) means only that the system is recorded as municipal and permitted; it is not a measurement of capacity and does not verify that capacity supports the park. Amber (Caution) means the recorded type or permit status leaves a capacity question open on the record. Red (Gate risk) means the system is recorded as unpermitted or its type is unknown. Each rating carries its reason on the record.",
  },
  {
    question: "Why does utility capacity kill deals?",
    answer:
      "Water, sewer, and electric set a physical ceiling on the asset. If capacity cannot support the pads as operated, underwriting built on those pads does not hold. That is why this tool gates on the record before an offer.",
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
      "Park-owned homes are commonly treated as depreciating personal property, though title and tax treatment vary by state and by whether a home has been converted to real property. Lot rent is rent for the real estate. This tool values the two separately so home rent is not capitalized at the lot-rent cap rate. Two businesses, one price tag, valued separately.",
  },
  {
    question: "What is the POH multiple?",
    answer:
      "The multiple of annual POH rent used to value the homes as personal property. It is an underwriting assumption, stated and adjustable, never a verified fact. The prefilled value is an illustrative default; set your own.",
  },
  {
    question: "What is blended gross rent yield?",
    answer:
      "Total annual rent from both businesses divided by the asking price. Context only. The split is the underwriting.",
  },
  {
    question: "What is the 5% split retrade band?",
    answer:
      "This tool's stated tolerance. If the asking price exceeds the split-implied value by more than 5 percent, the record supports Retrade. That delta is the amount behind the Retrade label.",
  },
]

export const EMD_FAQS: Faq[] = [
  {
    question: "What is an EMD contingency clock?",
    answer:
      "A register of the contingencies and deadlines you enter from your purchase agreement, tracked against your earnest money deposit. What each deadline does to the deposit is set by that agreement and applicable law. Dates move. Gates do not.",
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
      "Five qualified participants receive Acquisition Workspace access without charge for one live acquisition. In exchange, you use the software and give candid feedback about what works, what breaks, and what is confusing. Testimonials are optional and require separate written permission. Applications are open; November 2026 is the target opening, and access dates will be confirmed before activation.",
  },
  {
    question: "How long is the free pilot?",
    answer:
      "90 calendar days from activation. Activation begins when your account access and onboarding materials are delivered, not when you apply, are accepted, or upload your first document. Acceptance reserves a place.",
  },
  {
    question: "What is included in the free pilot?",
    answer:
      "The planned pilot includes Source, Field, and Acquire for one property, a recorded onboarding walkthrough, one 30-minute live software Q&A booked within your first 30 days, and email technical support targeting an initial response within two business days. You operate the workspace. Document review, financial interpretation, and diligence services are not included.",
  },
  {
    question: "What happens after the free pilot?",
    answer:
      "Your free access ends 90 calendar days after activation. Editing ends at expiration, so export your records beforehand. Data is retained for 30 days after expiration, then scheduled for deletion under the published retention policy. Nothing is charged automatically. Further access requires a separate purchase: currently $1,299 for Single-Deal Workspace or $2,999 for Annual Workspace. Pilot participation provides no credit or conversion discount.",
  },
  {
    question: "What is the workspace fit call?",
    answer:
      "A 30-minute conversation to determine whether your acquisition, timeline, and intended use fit the pilot. We discuss software fit and participation requirements, not your financial conclusions or whether you should buy the property. Acceptance reserves a place; it does not begin access.",
  },
  {
    question: "What should I bring to the fit call?",
    answer:
      "Be ready to describe the asset type, acquisition stage, decision deadline, and how you currently organize diligence. No documents are required. Do not submit or share confidential deal documents for the fit call. Your timeline must allow you to begin using the workspace after your confirmed activation date.",
  },
  {
    question: "Is there a refund on the free pilot?",
    answer:
      "No payment is required, so there is nothing to refund. Pilot access does not automatically become a paid subscription. Separate paid purchases have a seven-calendar-day refund window from activation; requesting a refund ends paid access immediately.",
  },
  {
    question: "What does the Single-Deal Workspace include?",
    answer:
      "One property, 90 calendar days of full access to Source, Field, and Acquire, a recorded onboarding walkthrough, one 30-minute live software Q&A booked within your first 30 days, and email technical support with a two-business-day target response.",
  },
  {
    question: "What does the Annual Workspace include?",
    answer:
      "Everything in Single-Deal, for unlimited properties over 12 months from activation. Same onboarding: one walkthrough, one live Q&A per account. Additional properties do not add sessions. Renewal is manual. CrosstownOS does not enroll accounts in automatic renewal and does not charge cards on file without a new, explicit purchase.",
  },
  {
    question: "What do you mean by software Q&A? What is it not?",
    answer:
      "We answer questions about navigation, inputs, documented calculations, and software behavior. What your documents mean and what to do about a property stays with you and your team.",
  },
  {
    question: "What does Verified mean in the evidence states?",
    answer:
      "You assign the state using the ParkProof definitions. Verified means your documented review meets the applicable evidence requirements, with the supporting source, page or record reference, how it was obtained, and a named human reviewer. CrosstownOS does not independently verify your deal claims. The label records your documented review, not certification by CrosstownOS.",
  },
  {
    question: "What does CrosstownOS not do?",
    answer:
      "It does not tell you whether to buy, certify the deal, verify the property, or guarantee any investment outcome. It does not replace your attorney, engineer, inspector, environmental consultant, title company, appraiser, lender, tax professional, insurance professional, utility or wastewater specialist, or your own investment judgment. It organizes the record.",
  },
  {
    question: "Does CrosstownOS replace my professional team?",
    answer:
      "No. Obtain qualified professional review appropriate to the legal, financial, physical, and regulatory issues in your acquisition. CrosstownOS organizes the sources, evidence states, unresolved issues, and assumptions for that review. It does not replace professional judgment.",
  },
  {
    question: "Who makes the final call on my deal?",
    answer:
      "You do. The decision file organizes your documented posture from reviewed evidence, unresolved gates, and approved assumptions. It is decision support, not a verdict from software.",
  },
  {
    question: "How is my deal data handled?",
    answer:
      "Information you provide through the application, fit call, or workspace is handled under our Privacy Policy and applicable confidentiality terms. We do not publish your deal materials or use them in public examples, marketing, or testimonials without separate written permission. The Privacy Policy explains operational processing, provider access, retention, and deletion.",
  },
  {
    question: "What happens after 90 days, or if my deal ends early?",
    answer:
      "Single-Deal access ends 90 calendar days from activation. Editing stops at expiration; export your records before then. We retain your data for 30 days after expiration, then schedule deletion. If your deal is still live at day 90 and you want to continue, purchase Annual Workspace as a separate purchase. Annual access runs 12 months from the annual activation date. If you abandon a deal, single-deal access does not transfer to another property.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "Full refund within seven calendar days of activation. Requesting a refund ends access immediately.",
  },
  {
    question: "What counts as one property?",
    answer:
      "One property means one distinct real estate asset covered by the same transaction. If you are acquiring multiple properties in separate transactions, each requires separate Single-Deal access or Annual access.",
  },
  {
    question: "Can I purchase Annual after Single-Deal?",
    answer:
      "Purchase Annual Workspace as a separate purchase at any time. There is no credit, prorating, or conversion discount.",
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
