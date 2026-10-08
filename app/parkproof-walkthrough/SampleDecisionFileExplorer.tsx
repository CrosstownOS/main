"use client"

import { useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"

const STEPS = [
  "In the inbox",
  "The package",
  "Source trail",
  "The walk",
  "Acquire",
  "The gates",
  "The decision file",
] as const

const RECORD_STAGES = [
  {
    label: "Package only",
    note: "The asking story is on the table. Nothing has earned a stronger label yet.",
  },
  {
    label: "Records opened",
    note: "Public records and operating records are both on the table now. Each one gets read only for what it can actually prove.",
  },
  {
    label: "Walk reviewed",
    note: "Boots were on the ground. What I saw gets filed beside the paper, not over it.",
  },
  {
    label: "Human review complete",
    note: "A person has reconciled what can be reconciled and named what is still open.",
  },
] as const

type Claim = {
  name: string
  details: readonly string[]
  source: string
  states: readonly string[]
  notes: readonly string[]
}

const CLAIMS: Claim[] = [
  {
    name: "Paying occupancy",
    details: [
      "The package calls it 92 percent occupied: 63 of 68 sites claimed occupied.",
      "63 of 68 sites claimed occupied. The paying count has not been reconciled yet.",
      "63 of 68 sites claimed occupied. The walk can count rigs, not payments.",
      "63 of 68 claimed occupied; 57 of 68 supported as paying after review.",
    ],
    source: "OM p. 8; rent roll; leases; deposit records",
    states: ["Broker-reported", "Unresolved", "Unresolved", "Verified"],
    notes: [
      "The OM and rent roll say 63 of 68 sites are occupied. Nobody has tied that count to deposits yet.",
      "Deposits support fewer paying sites than the rent roll carries. Both records stay on the page, and the gap gets a name.",
      "The walk counts rigs, not payments. A full pad can still be a nonpaying pad.",
      "A reviewer ties leases, collections, and deposits site by site. The verified claim is narrower than the headline: 57 of 68 paying.",
    ],
  },
  {
    name: "Trailing twelve-month NOI",
    details: [
      "Seller P&L story, not yet tested against records.",
      "Provided records do not reconcile every expense line yet.",
      "Condition notes add context, not expense records.",
      "Calculated from reviewed inputs and one labeled assumption. See the worked math in Acquire.",
    ],
    source: "Seller P&L; utility bills; reviewed model inputs",
    states: ["Broker-reported", "Unresolved", "Unresolved", "Calculated"],
    notes: [
      "The seller P&L tells a clean story. Its expense lines have not been tested against records yet.",
      "Two expense categories do not reconcile to what was provided. The output cannot borrow credibility from numbers still in dispute.",
      "The walk adds condition notes. Condition is not an expense record, and it does not close the gap.",
      "The model calculates from reviewed inputs and one labeled assumption. Models may propose. Humans confirm. Code calculates.",
    ],
  },
  {
    name: "Water and sewer capacity",
    details: [
      "Municipal service claimed for all 68 sites. No capacity record attached.",
      "Service district located. Capacity record still not received or located.",
      "Lift station and meter bank observed. Rated capacity remains unproven.",
      "Municipal service claimed for all 68 sites. The capacity record never arrived.",
    ],
    source: "OM site summary; utility district page; field photos; records request",
    states: ["Broker-reported", "Missing evidence", "Missing evidence", "Missing evidence"],
    notes: [
      "The package states municipal water and sewer for every site. No capacity letter or service record is attached.",
      "Source locates the service district. No capacity letter or service record has been received or located.",
      "The walk photographs the lift station and meter bank. Equipment is present. Rated capacity and permit standing are a different question.",
      "The records request remains unanswered. The absence is a finding, and this gating field stays Missing evidence.",
    ],
  },
  {
    name: "Site count",
    details: [
      "The package says 68 sites.",
      "Public context supports the property inquiry, not the governing site count.",
      "The package says 68. The meter bank count says 66. Both stay.",
      "The package says 68. The meter bank count says 66. Both stay.",
    ],
    source: "OM site summary; parcel record; meter bank photo",
    states: ["Broker-reported", "Unresolved", "Unresolved", "Unresolved"],
    notes: [
      "The package carries 68 sites as the operating count.",
      "The public parcel record supports the property inquiry. It does not settle the permitted site count.",
      "The field count finds 66 pedestals at the meter bank. Nobody resolves the difference by averaging it away.",
      "Survey and permit review have not settled which number governs. Both sources remain in the record.",
    ],
  },
  {
    name: "Room for 20 more sites",
    details: [
      "Open acreage presented as room for 20 more sites.",
      "No survey, zoning confirmation, or permit record located.",
      "Open ground is visible. Permission to build on it is not established.",
      "Expansion carried only as a labeled Underwriting assumption.",
    ],
    source: "OM expansion note; permit portal search; field observation",
    states: ["Broker-reported", "Missing evidence", "Missing evidence", "Underwriting assumption"],
    notes: [
      "The package presents open acreage as room to grow. No survey or zoning letter is included.",
      "No survey, zoning confirmation, or permit record has been received or located.",
      "The open ground is real. The right to put 20 more sites on it is a separate claim.",
      "The expansion may be carried only as a labeled Underwriting assumption. It does not enter the verified record.",
    ],
  },
]

const CHANGE_LOG = [
  {
    stage: 0,
    claim: "The file opens",
    movement: "Claims loaded",
    voice:
      "I wrote the claims down before I let the headline settle. A claim with a source is a starting point. It is not a finding.",
  },
  {
    stage: 1,
    claim: "Paying occupancy",
    movement: "Broker-reported to Unresolved",
    voice:
      "This is where the price started resting on a number nobody had checked.",
  },
  {
    stage: 1,
    claim: "Water and sewer capacity",
    movement: "Broker-reported to Missing evidence",
    voice:
      "The file did not get worse. It got more honest. The capacity record was not there.",
  },
  {
    stage: 1,
    claim: "Trailing twelve-month NOI",
    movement: "Broker-reported to Unresolved",
    voice:
      "The seller's clean expense story did not reconcile yet, so the output stayed short of a stronger label.",
  },
  {
    stage: 1,
    claim: "Room for 20 more sites",
    movement: "Broker-reported to Missing evidence",
    voice:
      "Open ground was visible. A right to build on it had not entered the record.",
  },
  {
    stage: 1,
    claim: "Site count",
    movement: "Broker-reported to Unresolved",
    voice:
      "The public trail did not settle whether 68 was the governing count.",
  },
  {
    stage: 2,
    claim: "Site count",
    movement: "Conflict located",
    voice:
      "Boots on gravel did not solve the paper. They gave the disagreement a place to stand.",
  },
  {
    stage: 2,
    claim: "Utility building",
    movement: "Observation filed",
    voice: "The door opened. The answer did not walk out.",
  },
  {
    stage: 3,
    claim: "Paying occupancy",
    movement: "Unresolved to Verified",
    voice:
      "The narrower number is the useful one. I can point to where it came from.",
  },
  {
    stage: 3,
    claim: "Trailing twelve-month NOI",
    movement: "Unresolved to Calculated",
    voice:
      "Calculated has its own label for a reason. It does not get to wear Verified.",
  },
  {
    stage: 3,
    claim: "Water and sewer capacity",
    movement: "Still Missing evidence",
    voice: "Dates moved. The gate did not.",
  },
] as const

const EVIDENCE_PACKETS = [
  {
    title: "The broker package",
    source: "Offering memorandum, rent roll, seller P&L",
    gives: "The claims, the asking story, and where each number says it came from.",
    cannot: "It cannot promote a claim past Broker-reported on its own.",
  },
  {
    title: "The deposit trail",
    source: "Bank deposits, collections report, rent roll extract",
    gives: "A way to test whether occupied also means paying, site by site.",
    cannot: "It cannot settle utility capacity, permits, or physical condition.",
  },
  {
    title: "The field capture set",
    source: "Dated photos, site notes, meter and pedestal counts",
    gives: "What I saw, where I stood, and what the paper did not show.",
    cannot: "Captured is not verified. A photo cannot prove payment or rated capacity.",
  },
  {
    title: "The human review",
    source: "Reviewer reconciliation, model lineage, open-item record",
    gives: "Verified where evidence supports it, Calculated where the model runs, Missing where the record is still absent.",
    cannot: "It cannot manufacture evidence that never arrived.",
  },
] as const

function stateClass(state: string) {
  switch (state) {
    case "Verified":
      return "border-success/60 text-success"
    case "Broker-reported":
      return "border-accent/60 text-accent"
    case "Missing evidence":
      return "border-critical/60 text-critical"
    case "Underwriting assumption":
    case "Calculated":
      return "border-primary/60 text-primary"
    default:
      return "border-border text-muted"
  }
}

function StateBadge({ state }: { state: string }) {
  return (
    <span
      className={cn(
        "inline-flex w-fit shrink-0 border bg-background/40 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em]",
        stateClass(state),
      )}
    >
      {state}
    </span>
  )
}

function ScreenFooter() {
  return (
    <p className="mt-7 border-t border-border/50 pt-4 font-mono text-[8px] uppercase tracking-[0.18em] text-muted">
      Illustrative example / fictional park / not a live deal
    </p>
  )
}

function SceneHeading({
  eyebrow,
  title,
  children,
  headingRef,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
  headingRef?: React.Ref<HTMLHeadingElement>
}) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-primary">
        {eyebrow}
      </p>
      <h3
        ref={headingRef}
        tabIndex={-1}
        className="serif-display mt-3 text-3xl leading-tight tracking-tight text-foreground focus:outline-none"
      >
        {title}
      </h3>
      <div className="mt-4 max-w-3xl space-y-4 text-sm leading-relaxed text-muted sm:text-base">
        {children}
      </div>
    </div>
  )
}

export default function SampleDecisionFileExplorer() {
  const [activeStep, setActiveStep] = useState(0)
  const [recordStage, setRecordStage] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const activeClaimRows = useMemo(
    () =>
      CLAIMS.map((claim) => ({
        ...claim,
        detail: claim.details[recordStage],
        state: claim.states[recordStage],
        note: claim.notes[recordStage],
      })),
    [recordStage],
  )

  const visibleChanges = useMemo(
    () => CHANGE_LOG.filter((entry) => entry.stage <= recordStage),
    [recordStage],
  )

  const goToStep = (index: number) => {
    const next = Math.min(Math.max(index, 0), STEPS.length - 1)
    setActiveStep(next)
    if (next <= 1) setRecordStage(0)
    if (next === 2) setRecordStage(1)
    if (next === 3) setRecordStage(2)
    if (next >= 5) setRecordStage(3)
    requestAnimationFrame(() => {
      sceneHeadingRef.current?.focus()
    })
  }

  const sceneHeadingRef = useRef<HTMLHeadingElement>(null)

  const openEvidence = (index: number) => {
    setRecordStage(index)
  }

  return (
    <section
      aria-labelledby="sample-explorer-heading"
      className="theme-cream paper border border-primary/40 p-5 sm:p-7"
    >
      <div className="flex flex-col gap-5 border-b border-border/60 pb-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">
            ParkProof Walkthrough / Harbor Pines
          </p>
          <h2
            id="sample-explorer-heading"
            className="serif-display mt-3 text-3xl tracking-tight text-foreground sm:text-4xl"
          >
            One deal, walked all the way down.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
            Harbor Pines is fictional. The habit is not. Follow the claims as
            records open, the walk pushes back, and one gate refuses to close.
          </p>
        </div>
        <p className="w-fit shrink-0 border border-critical/60 bg-critical/5 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.18em] text-critical">
          Illustrative example / fictional park
        </p>
      </div>

      <nav aria-label="ParkProof Walkthrough steps" className="mt-6">
        <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {STEPS.map((step, index) => (
            <li key={step}>
              <button
                type="button"
                onClick={() => goToStep(index)}
                aria-current={activeStep === index ? "step" : undefined}
                className={cn(
                  "h-full w-full border px-3 py-3 text-left font-mono text-[9px] uppercase tracking-[0.15em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                  activeStep === index
                    ? "border-primary bg-primary-deep text-white shadow-[0_14px_30px_-18px_rgba(41,34,25,0.65)]"
                    : "border-border bg-card text-muted hover:border-primary/50 hover:text-foreground",
                )}
              >
                <span className="block text-[8px] opacity-75">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block leading-snug">{step}</span>
              </button>
            </li>
          ))}
        </ol>
        <div className="mt-3 h-px bg-border/70" aria-hidden="true">
          <div
            className="h-full bg-primary transition-all duration-500"
            style={{ width: `${((activeStep + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </nav>

      <div className="mt-6 grid gap-5 xl:grid-cols-[minmax(0,1fr)_25rem] xl:items-start">
        <div className="relative min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0, y: -12 }}
              transition={{ duration: 0.38, ease: "easeOut" }}
              className="border border-border bg-card p-5 text-card-foreground shadow-[0_22px_50px_-34px_rgba(41,34,25,0.55)] sm:p-7"
            >
              {activeStep === 0 && (
                <div>
                  <SceneHeading
                    headingRef={sceneHeadingRef}
                    eyebrow="Day 1 / The inbox"
                    title="It lands clean, confident, and easy to believe."
                  >
                    <p>
                      The email arrives with a polished package, a confident
                      cap rate, and photos taken on the kind of afternoon that
                      makes every park look inevitable. I open it grateful for
                      the starting point and unwilling to mistake it for proof.
                    </p>
                    <p>
                      My first job is not to value the park. My first job is to
                      separate what has been checked from what has merely been
                      said well.
                    </p>
                  </SceneHeading>

                  <blockquote className="mt-7 border-l-2 border-primary bg-primary/5 px-5 py-5">
                    <p className="serif-display text-3xl leading-tight text-foreground">
                      The package is not the decision.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      It is the first stack of claims. The decision file is
                      what those claims become after the record has had its say.
                    </p>
                  </blockquote>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {[
                      [
                        "Start with claims",
                        "Every number gets a source before it gets my trust.",
                      ],
                      [
                        "Let evidence move it",
                        "An upload changes nothing. A reviewed record can.",
                      ],
                      [
                        "Name what is missing",
                        "A blank is not zero, and silence is not support.",
                      ],
                    ].map(([title, body]) => (
                      <article
                        key={title}
                        className="border border-border bg-background/40 p-4"
                      >
                        <h4 className="font-sans text-base font-bold text-foreground">
                          {title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {body}
                        </p>
                      </article>
                    ))}
                  </div>
                  <ScreenFooter />
                </div>
              )}

              {activeStep === 1 && (
                <div>
                  <SceneHeading
                    headingRef={sceneHeadingRef}
                    eyebrow="Scene 1 / The broker package"
                    title="The package is confident. That is its job."
                  >
                    <p>
                      Sixty-eight sites. The package calls it ninety-two
                      percent occupied. Municipal water and sewer. Room for
                      twenty more out back. The pages are clean, the photos
                      are bright, and the numbers line up because nobody has
                      asked them to reconcile yet.
                    </p>
                    <p>
                      Broker-reported is not an accusation. It means the claim
                      is in the file, the source is named, and nobody has
                      independently checked it yet.
                    </p>
                  </SceneHeading>

                  <blockquote className="mt-7 border border-accent/50 bg-accent/5 px-5 py-5">
                    <p className="serif-display text-2xl leading-tight text-foreground sm:text-3xl">
                      Reported occupancy is not paying occupancy.
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted">
                      That is not suspicion. It is bookkeeping.
                    </p>
                  </blockquote>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {CLAIMS.map((claim) => (
                      <article
                        key={claim.name}
                        className="border border-border bg-background/30 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-sans text-base font-bold text-foreground">
                            {claim.name}
                          </h4>
                          <StateBadge state="Broker-reported" />
                        </div>
                        <p className="mt-3 text-sm font-semibold leading-relaxed text-foreground">
                          {claim.details[0]}
                        </p>
                        <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-primary">
                          Source / {claim.source}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {claim.notes[0]}
                        </p>
                      </article>
                    ))}
                  </div>
                  <ScreenFooter />
                </div>
              )}

              {activeStep === 2 && (
                <div>
                  <SceneHeading
                    headingRef={sceneHeadingRef}
                    eyebrow="Scene 2 / Source trail"
                    title="Source finds the park. It does not bless the story."
                  >
                    <p>
                      Before I drive out, I want the public trail: the listing,
                      the parcel, the service district, the permit portal. I
                      want to know where each fact came from and when it entered
                      the file.
                    </p>
                    <p>
                      A found record is a place to start asking. It is not the
                      answer, and it is never a substitute for the seller
                      producing the operating record.
                    </p>
                  </SceneHeading>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {[
                      [
                        "Listing matched to the package",
                        "The park, the asking presentation, and the package now point at the same deal record.",
                        "Identity and presentation. It does not establish operating truth.",
                      ],
                      [
                        "Parcel record located",
                        "The address and acreage inquiry now have a public record behind them.",
                        "Property context. It does not settle the permitted site count.",
                      ],
                      [
                        "Utility district page found",
                        "The service area is identified, and the district becomes a named source to pursue.",
                        "A service area. It does not establish rated capacity for 68 sites.",
                      ],
                      [
                        "Permit portal searched",
                        "No expansion permit is located in the material provided. The absence is recorded, not smoothed over.",
                        "An open item. Missing evidence is a finding, not a blank.",
                      ],
                    ].map(([title, gives, limit]) => (
                      <article
                        key={title}
                        className="border border-border bg-background/30 p-4"
                      >
                        <h4 className="font-sans text-base font-bold text-foreground">
                          {title}
                        </h4>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          <span className="font-semibold text-foreground">
                            What it gives me:{" "}
                          </span>
                          {gives}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          <span className="font-semibold text-foreground">
                            What it cannot give me:{" "}
                          </span>
                          {limit}
                        </p>
                      </article>
                    ))}
                  </div>

                  <p className="mt-6 border-l-2 border-primary bg-primary/5 px-5 py-4 text-sm font-semibold leading-relaxed text-foreground">
                    Source keeps the receipts. Acquire still has to decide what
                    the receipts prove.
                  </p>
                  <ScreenFooter />
                </div>
              )}

              {activeStep === 3 && (
                <div>
                  <SceneHeading
                    headingRef={sceneHeadingRef}
                    eyebrow="Scene 3 / The walk"
                    title="Then I go stand in it."
                  >
                    <p>
                      The park is quieter than the photographs and older up
                      close. Heat comes off the gravel. Paint peels where the
                      brochure cropped it out. Rigs sit under awnings with hoses
                      connected and chairs turned toward the shade.
                    </p>
                    <p>
                      It looks occupied. Looking occupied and paying are two
                      different claims, and only one of them can be seen from
                      the road.
                    </p>
                  </SceneHeading>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {[
                      [
                        "09:18 / First row",
                        "Pedestals and pads",
                        "The pedestals are here, weathered and in service. The photo records what I saw at that hour. It does not tell me which sites produced income last month.",
                      ],
                      [
                        "10:04 / Meter bank",
                        "66 pedestals counted",
                        "The package says 68 sites. I count 66 pedestals at the meter bank. The conflict goes in the file exactly as found.",
                      ],
                      [
                        "10:31 / Back field",
                        "Open ground, no answer",
                        "Grass, tree line, room to imagine. I can see land. I cannot see zoning, setbacks, permits, or capacity.",
                      ],
                    ].map(([stamp, title, body]) => (
                      <article
                        key={stamp}
                        className="border border-border bg-background/30 p-4"
                      >
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                          {stamp}
                        </p>
                        <div className="mt-3">
                          <StateBadge state="Unresolved" />
                        </div>
                        <h4 className="mt-3 font-sans text-base font-bold text-foreground">
                          {title}
                        </h4>
                        <p className="mt-2 text-sm leading-relaxed text-muted">
                          {body}
                        </p>
                      </article>
                    ))}
                  </div>

                  <article className="mt-4 border border-primary/40 bg-primary/5 p-5">
                    <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                      10:47 / Utility building
                    </p>
                    <h4 className="mt-3 font-sans text-lg font-bold text-foreground">
                      The door nobody wants to open.
                    </h4>
                    <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
                      The latch sticks. Inside are the pump panel, stained
                      concrete, and a service tag too faded to settle anything.
                      The lift station is present and running. Presence is not
                      capacity, condition is not a service history, and a photo
                      is not a permit.
                    </p>
                    <p className="mt-4 text-sm font-semibold leading-relaxed text-foreground">
                      Captured is not verified.
                    </p>
                  </article>
                  <ScreenFooter />
                </div>
              )}

              {activeStep === 4 && (
                <div>
                  <SceneHeading
                    headingRef={sceneHeadingRef}
                    eyebrow="Scene 4 / Acquire"
                    title="This is where I stop collecting paper and start naming truth."
                  >
                    <p>
                      Acquire holds the claims still while the evidence either
                      earns a stronger label or stays honestly short of one.
                      Open each packet. The ledger follows what the record can
                      support at that moment.
                    </p>
                  </SceneHeading>

                  <div
                    className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-4"
                    role="group"
                    aria-label="Evidence packets"
                  >
                    {EVIDENCE_PACKETS.map((packet, index) => (
                      <button
                        key={packet.title}
                        type="button"
                        onClick={() => openEvidence(index)}
                        aria-pressed={recordStage === index}
                        className={cn(
                          "border px-3 py-3 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary",
                          recordStage === index
                            ? "border-primary bg-primary-deep text-white shadow-[0_14px_30px_-18px_rgba(41,34,25,0.65)]"
                            : "border-border bg-background/40 text-muted hover:border-primary/50 hover:text-foreground",
                        )}
                      >
                        <span className="block font-mono text-[8px] uppercase tracking-[0.16em] opacity-80">
                          Packet {index + 1}
                        </span>
                        <span className="mt-1 block font-sans text-sm font-bold leading-snug">
                          {packet.title}
                        </span>
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.article
                      key={recordStage}
                      initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                      transition={{ duration: 0.28, ease: "easeOut" }}
                      className="mt-4 border border-primary/40 bg-primary/5 p-5"
                      aria-live="polite"
                    >
                      <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                        Opened / {EVIDENCE_PACKETS[recordStage].source}
                      </p>
                      <h4 className="mt-3 font-sans text-lg font-bold text-foreground">
                        {EVIDENCE_PACKETS[recordStage].title}
                      </h4>
                      <div className="mt-3 grid gap-4 md:grid-cols-2">
                        <p className="text-sm leading-relaxed text-muted">
                          <span className="font-semibold text-foreground">
                            What it can establish:{" "}
                          </span>
                          {EVIDENCE_PACKETS[recordStage].gives}
                        </p>
                        <p className="text-sm leading-relaxed text-muted">
                          <span className="font-semibold text-foreground">
                            What it cannot establish:{" "}
                          </span>
                          {EVIDENCE_PACKETS[recordStage].cannot}
                        </p>
                      </div>
                    </motion.article>
                  </AnimatePresence>

                  <blockquote className="mt-6 border-l-2 border-primary px-5 py-1">
                    <p className="serif-display text-2xl leading-tight text-foreground">
                      A claim does not change because a document was uploaded.
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      It changes when evidence arrives and a person reviews it.
                    </p>
                  </blockquote>

                  <article className="mt-6 border border-border bg-background/40 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                          Worked example / Harbor Pines
                        </p>
                        <h4 className="mt-2 font-sans text-lg font-bold text-foreground">
                          NOI, with the math showing.
                        </h4>
                      </div>
                      <StateBadge state="Calculated" />
                    </div>

                    <div className="mt-5 grid gap-6 md:grid-cols-2">
                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                          Income inputs
                        </p>
                        <dl className="mt-3 space-y-2 text-sm leading-relaxed">
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-muted">Collections supported by deposits</dt>
                            <dd className="font-semibold text-foreground">$612,480</dd>
                          </div>
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-muted">Other income</dt>
                            <dd className="font-semibold text-foreground">$18,240</dd>
                          </div>
                          <div className="flex items-baseline justify-between gap-4 border-t border-border/60 pt-2">
                            <dt className="text-foreground">Gross operating income</dt>
                            <dd className="font-semibold text-foreground">$630,720</dd>
                          </div>
                        </dl>
                        <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                          $612,480 + $18,240 = $630,720
                        </p>
                      </div>

                      <div>
                        <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                          Expense inputs
                        </p>
                        <dl className="mt-3 space-y-2 text-sm leading-relaxed">
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-muted">Payroll</dt>
                            <dd className="font-semibold text-foreground">$96,000</dd>
                          </div>
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-muted">Utilities</dt>
                            <dd className="font-semibold text-foreground">$118,500</dd>
                          </div>
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-muted">Repairs and maintenance</dt>
                            <dd className="font-semibold text-foreground">$42,300</dd>
                          </div>
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-muted">Insurance</dt>
                            <dd className="font-semibold text-foreground">$36,800</dd>
                          </div>
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-muted">Property taxes</dt>
                            <dd className="font-semibold text-foreground">$51,200</dd>
                          </div>
                          <div className="flex items-baseline justify-between gap-4">
                            <dt className="text-muted">
                              Management fee
                              <span className="mt-1 block text-xs">
                                Underwriting assumption: 5% of gross operating income
                              </span>
                            </dt>
                            <dd className="font-semibold text-foreground">$31,536</dd>
                          </div>
                          <div className="flex items-baseline justify-between gap-4 border-t border-border/60 pt-2">
                            <dt className="text-foreground">Total expenses</dt>
                            <dd className="font-semibold text-foreground">$376,336</dd>
                          </div>
                        </dl>
                        <p className="mt-3 font-mono text-[9px] uppercase leading-relaxed tracking-[0.12em] text-muted">
                          $96,000 + $118,500 + $42,300 + $36,800 + $51,200 + $31,536 = $376,336
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-primary/40 pt-4">
                      <p className="text-sm font-semibold text-foreground">
                        Calculated NOI: $630,720 - $376,336 = $254,384
                      </p>
                      <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">
                        Calculated, not Verified
                      </p>
                    </div>
                  </article>
                  <ScreenFooter />
                </div>
              )}

              {activeStep === 5 && (
                <div>
                  <SceneHeading
                    headingRef={sceneHeadingRef}
                    eyebrow="Scene 5 / The gates"
                    title="Dates move. Gates don't."
                  >
                    <p>
                      The closing calendar can slide with a phone call. A
                      missing capacity record does not fill itself in because
                      everyone is tired of waiting on it.
                    </p>
                    <p>
                      On day 19, the utility records request is still open. No
                      accusation. No villain. Just a blank where a gating
                      record ought to be.
                    </p>
                  </SceneHeading>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    {[
                      [
                        "Water and sewer capacity",
                        "Missing evidence",
                        "The capacity letter and service records still have not arrived. This is a gating field, so the record fails closed.",
                      ],
                      [
                        "Site count",
                        "Unresolved",
                        "The package says 68 and the meter bank count says 66. Both sources stay in the record until new evidence settles the difference.",
                      ],
                      [
                        "Paying occupancy",
                        "Verified",
                        "The supported paying count is tied to leases, collections, and deposits a person reviewed. This claim can carry weight.",
                      ],
                      [
                        "Trailing twelve-month NOI",
                        "Calculated",
                        "The output carries its inputs and its one labeled assumption with it. It is usable only with that lineage showing.",
                      ],
                      [
                        "Room for 20 more sites",
                        "Underwriting assumption",
                        "The expansion stays outside the verified record. It may be modeled, named, and priced as an assumption. It may not pose as entitlement.",
                      ],
                    ].map(([title, state, body]) => (
                      <article
                        key={title}
                        className="border border-border bg-background/30 p-4"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <h4 className="font-sans text-base font-bold text-foreground">
                            {title}
                          </h4>
                          <StateBadge state={state} />
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {body}
                        </p>
                      </article>
                    ))}
                  </div>

                  <p className="mt-6 border border-critical/50 bg-critical/5 px-5 py-4 text-sm font-semibold leading-relaxed text-foreground">
                    An open gate is not buried in an appendix. It sits on the
                    record where the buyer has to look at it.
                  </p>
                  <ScreenFooter />
                </div>
              )}

              {activeStep === 6 && (
                <div>
                  <SceneHeading
                    headingRef={sceneHeadingRef}
                    eyebrow="Scene 6 / The decision file"
                    title="The file does not tell me what to do. It tells me where I stand."
                  >
                    <p>
                      This is not a failed deal. It is an unfinished record.
                      The label keeps me from pretending the choice in front of
                      me is better informed than it actually is.
                    </p>
                  </SceneHeading>

                  <div className="mt-7 grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="border border-critical/60 bg-critical/5 p-6">
                      <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-critical">
                        Documented posture / evidence-readiness label
                      </p>
                      <p className="serif-display mt-4 text-6xl tracking-tight text-foreground">
                        Pause
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">
                        A gating field, water and sewer capacity, sits in
                        Missing evidence. Under the ParkProof Standard, the
                        record holds at Pause.
                      </p>
                      <p className="mt-4 border-t border-critical/30 pt-4 text-sm font-semibold leading-relaxed text-foreground">
                        Pause is not a recommendation, approval, or advice. The
                        buyer owns the decision.
                      </p>
                    </div>

                    <div className="border border-border bg-background/30 p-5">
                      <h4 className="font-sans text-base font-bold text-foreground">
                        The same park, stated honestly
                      </h4>
                      <div className="mt-4 grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-accent">
                            The package said
                          </p>
                          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                            <li>The package calls it 92 percent occupancy.</li>
                            <li>Municipal capacity for every site.</li>
                            <li>68 sites, settled.</li>
                            <li>20 more sites out back.</li>
                          </ul>
                        </div>
                        <div>
                          <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                            The record says
                          </p>
                          <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                            <li>57 of 68 paying, Verified.</li>
                            <li>Capacity, Missing evidence.</li>
                            <li>Site count, Unresolved.</li>
                            <li>Expansion, Underwriting assumption.</li>
                          </ul>
                        </div>
                      </div>
                      <p className="mt-5 border-t border-border/50 pt-4 text-sm leading-relaxed text-muted">
                        One claim earned Verified. One output is Calculated with
                        its lineage showing. One conflict remains Unresolved.
                        One gating absence remains Missing. Nothing was rounded
                        into certainty to make the ending feel better.
                      </p>
                    </div>
                  </div>
                  <ScreenFooter />
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => goToStep(activeStep - 1)}
              disabled={activeStep === 0}
              className="border border-border bg-card px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:bg-primary/5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <p
              className="text-center font-mono text-[9px] uppercase tracking-[0.18em] text-muted"
              aria-live="polite"
            >
              {activeStep === 0 ? "Day 1 / illustrative" : `Scene ${activeStep} of 6 / illustrative`}
            </p>
            <button
              type="button"
              onClick={() => goToStep(activeStep + 1)}
              disabled={activeStep === STEPS.length - 1}
              className="border border-primary/60 bg-primary-deep px-4 py-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary-deep/90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>

        <aside
          aria-labelledby="claim-ledger-heading"
          className="border border-primary/50 bg-card shadow-[0_24px_60px_-34px_rgba(41,34,25,0.65)] xl:sticky xl:top-24 xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto"
        >
          <div className="border-b border-border/60 p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                  Harbor Pines / claim ledger
                </p>
                <h3
                  id="claim-ledger-heading"
                  className="serif-display mt-2 text-2xl tracking-tight text-foreground"
                >
                  The record, as it stands.
                </h3>
              </div>
              <span className="border border-critical/60 px-2 py-1 font-mono text-[8px] uppercase tracking-[0.14em] text-critical">
                Fictional
              </span>
            </div>
            <div className="mt-4 border border-border bg-background/40 p-3" aria-live="polite">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-primary">
                Record moment {recordStage + 1} of {RECORD_STAGES.length}
              </p>
              <p className="mt-1 font-sans text-sm font-bold text-foreground">
                {RECORD_STAGES[recordStage].label}
              </p>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {RECORD_STAGES[recordStage].note}
              </p>
            </div>
          </div>

          <div>
            {activeClaimRows.map((claim) => (
              <article
                key={claim.name}
                className="border-b border-border/50 p-5 last:border-b-0"
              >
                <div className="flex items-start justify-between gap-3">
                  <h4 className="font-sans text-sm font-bold leading-snug text-foreground">
                    {claim.name}
                  </h4>
                  <StateBadge state={claim.state} />
                </div>
                <p className="mt-3 text-sm font-semibold leading-relaxed text-foreground">
                  {claim.detail}
                </p>
                <p className="mt-2 font-mono text-[8px] uppercase leading-relaxed tracking-[0.13em] text-primary">
                  {claim.source}
                </p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`${claim.name}-${recordStage}`}
                    initial={shouldReduceMotion ? false : { opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={shouldReduceMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="mt-3 text-sm leading-relaxed text-muted"
                  >
                    {claim.note}
                  </motion.p>
                </AnimatePresence>
              </article>
            ))}
          </div>

          <div className="border-t border-primary/40 bg-primary/5 p-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
              What changed
            </p>
            <div className="mt-4 space-y-4">
              {visibleChanges.map((entry) => (
                <article
                  key={`${entry.stage}-${entry.claim}-${entry.movement}`}
                  className="border-l border-primary/50 pl-4"
                >
                  <p className="font-mono text-[8px] uppercase leading-relaxed tracking-[0.14em] text-primary">
                    {entry.claim} / {entry.movement}
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">
                    {entry.voice}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-5 border-t border-border/50 pt-4 font-mono text-[8px] uppercase leading-relaxed tracking-[0.16em] text-muted">
              Every state is named in words. Color never carries the meaning alone.
            </p>
          </div>
        </aside>
      </div>
    </section>
  )
}
