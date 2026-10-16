# Site-Wide Claims Ledger

**Purpose:** the enforcement record for the Content Production Protocol (docs/content-production-protocol.md, Article 2 and Section 7.1). Every load-bearing claim on a published CrosstownOS page is entered here with its basis and its status. Established 2026-10-16 during the full-site Content Integrity remediation ordered by Jeremy Cross; updated per batch and committed with the batch pushes.

**Status key:**
- **GROUNDED-INTERNAL:** basis is a named internal authority (product doctrine, the live offer, the ParkProof Standard's own definitions, the company's own records).
- **GROUNDED-EXTERNAL:** basis is a named external source, opened and verified, cited on the page or in its Sources and Limits block.
- **UNCITED-BUT-CONSISTENT:** no citation; the claim as written is consistent with grounded material and not falsifiable as stated (includes claims rewritten as labeled judgment).
- **LABELED ILLUSTRATION / WORKING ASSUMPTION:** the figure or example is printed with its label; it is not market data.
- **BLOCKED:** no honest source exists; the claim was deleted or demoted, and the row records what would be needed to restore it.

Rows record the status AFTER the batch's remediation. The before-status for Batches 1 to 6 is in the Content Integrity Audit (2026-10-16).

---

## Batch 1: /rv-park-investing, /buying-an-rv-park (commit 173c803)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| /rv-park-investing | Stabilized cap rate benchmark 8 to 10%, 2025 to 2026 | Innowave Studio, 2026 U.S. RV Park Development Cost Benchmarks (2026), cited and linked on page | GROUNDED-EXTERNAL |
| /rv-park-investing | Prime destination resort caps 6 to 7% | Innowave 2026, cited on page | GROUNDED-EXTERNAL |
| /rv-park-investing | Brokerage average cap 9.3% on 21 properties sold in 2024 | Parks and Places brokerage data as reported by Innowave 2026; framed on page as brokerage-reported, not a closed-comp dataset CrosstownOS compiled | GROUNDED-EXTERNAL (secondhand; framed as such) |
| /rv-park-investing | Per-site pricing: general $30,000 to $55,000; rural $10,000 to $17,000; premium $50,000 to $62,000 | Innowave 2026, cited on page | GROUNDED-EXTERNAL |
| /rv-park-investing | Value-add going-in cap targets 8 to 12% | Innowave 2026; printed as a target, not a traded average | GROUNDED-EXTERNAL |
| /rv-park-investing | Management fee reference point 5.1% of revenue | Newmark, RV Park Expense Analysis (2021): 62 properties, statements 2015 to 2021; cited on page | GROUNDED-EXTERNAL |
| /rv-park-investing | Park debt is typically bank or local-lender debt, terms vary by deal | General market structure; replaces the deleted agency-debt sentence ("Agency and bank debt for RV parks prices wider than multifamily," no program named, no source) | UNCITED-BUT-CONSISTENT |
| /rv-park-investing | Former ranges (caps 7 to 8.5%; pads $40,000 to $80,000; management 5 to 8% as market fact) | No source existed in any internal file; removed and replaced by the cited figures above | BLOCKED (superseded by sourced figures) |
| /buying-an-rv-park | Benchmark table (per-pad and cap rows) | Innowave 2026, cited above the table; caveat moved above the table; cells with no source figure state "No separate range in the cited source" | GROUNDED-EXTERNAL |
| /buying-an-rv-park | Former "have traded" ranges ($40,000 to $80,000; $20,000 to $45,000; $100,000+; caps 7 to 8.5%) | No source existed; past-tense market framing removed | BLOCKED (superseded by sourced figures) |

## Batch 2: /data-room-vs-diligence-software (commit b714189)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| /data-room-vs-diligence-software | DealRoom provides tracked diligence requests (owner, due date, status), auto-filing on completion, audit log, per-group permissions | DealRoom's own diligence and investment banking pages, opened 2026-10-16, cited per row with "as of October 2026" | GROUNDED-EXTERNAL |
| /data-room-vs-diligence-software | Datasite provides tracker lists, resolved-thread tracking, and AI querying of live documents under existing permissions | Datasite Diligence and Prepare Trackers fact sheet; Datasite GlobeNewswire release, Oct 15, 2026; cited per row | GROUNDED-EXTERNAL |
| /data-room-vs-diligence-software | A completed diligence request is not an evidence state on the underlying seller claim; neither product assigns ParkProof evidence states | Vendor documentation above (what the products document) plus the ParkProof Standard's definitions for the states themselves | GROUNDED-EXTERNAL + GROUNDED-INTERNAL |
| /data-room-vs-diligence-software | CrosstownOS column claims (evidence states, gate posture, decision file) | /workspace and /parkproof-standard, the product's own pages | GROUNDED-INTERNAL |
| /data-room-vs-diligence-software | Former strawman cells ("Documents filed in folders"; "They are built for sell-side M&A process at scale"; absolute "does not test a seller claim") | Vendor documentation contradicted them; removed or rewritten to the sourced forms above | BLOCKED (removed) |

## Batch 3: standing production protocol (commit 4fd5750)

Governance document, no page claims. docs/content-production-protocol.md; adoption pending founder confirmation (recorded in the document's Section 8).

## Batch 4: Field Notes, first five (commit aea3904)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| Anatomy of a Broker Package | The six evidence states and the claim-by-claim method | Product doctrine; ParkProof Standard (/parkproof-standard) | GROUNDED-INTERNAL |
| Anatomy of a Broker Package | Nonconforming use limits expansion, change of use, rebuilding | Town of Boone NC UDO Article 7, opened and cited in Sources and Limits | GROUNDED-EXTERNAL |
| Anatomy of a Broker Package | Utility capacity is proven by a capacity record, not a photo | Houston wastewater capacity-letter documentation, cited in Sources and Limits | GROUNDED-EXTERNAL |
| Anatomy of a Broker Package | The park, package, and all numbers are invented to teach the pattern | Labeled on the page at first appearance | LABELED ILLUSTRATION |
| Anatomy of a Broker Package | Tax reassessment on sale | Jurisdiction-dependent; qualified on the page ("in many states") with the limit stated in Sources and Limits | UNCITED-BUT-CONSISTENT |
| The Rent Roll Is a Claim | Deposits corroborate income; obtain records from the source where possible (replaces "the record the seller cannot edit") | Method grounded in doctrine and operator research; rewritten as instruction because seller-supplied statements can be altered | GROUNDED-INTERNAL |
| The Rent Roll Is a Claim | Worked reconciliation: scheduled $57,600, collected $54,900, deposited $53,850 | Labeled worked illustration on the page; arithmetic verified | LABELED ILLUSTRATION |
| The Rent Roll Is a Claim | Rent-roll verification practice corroboration | Commercial rent-roll explainer (Sunridge), cited in Sources and Limits as an explainer | GROUNDED-EXTERNAL (secondary source; noted as such) |
| Read the P&L Like the Other Side Wrote It | Worked normalization: seller NOI $412,000 to normalized $361,200; $18,000 adjustment at 8% cap = $225,000 value impact | Labeled worked illustration; multiplier arithmetic shown and verified | LABELED ILLUSTRATION |
| Read the P&L Like the Other Side Wrote It | Expense ratios of 35 to 50% of revenue | Operator-community research figures, origin named on the page as community research, not an industry statistic | UNCITED-BUT-CONSISTENT (origin disclosed) |
| Read the P&L Like the Other Side Wrote It | Normalization practice (add-backs, owner labor at hired cost) | RKL quality-of-earnings guidance, cited in Sources and Limits; owner-labor line qualified for owner-operator buyers on the page | GROUNDED-EXTERNAL |
| Reported Occupancy Is Not Paying Occupancy | 120-site scenario: 113 reported, 101 paying, 19 flagged including the 3 no-deposit sites | Labeled illustrative scenario; body, table, and summary reconciled 2026-10-16 (the three-site contradiction is fixed) | LABELED ILLUSTRATION |
| Reported Occupancy Is Not Paying Occupancy | Dollar line: 8-site gap at $650 = $5,200/mo, $62,400/yr, $780,000 at an 8% cap | Arithmetic inside the labeled scenario; verified | LABELED ILLUSTRATION |
| Reported Occupancy Is Not Paying Occupancy | Deposits corroborate but do not prove (taxes, advances, owner injections) | Stated as a limit on the page; doctrine-consistent | UNCITED-BUT-CONSISTENT |
| Speed Is a Strategy for Sellers | 1031 exchange deadlines: 45-day identification, 180-day exchange | IRS like-kind exchange material (irs.gov), opened and cited on the page | GROUNDED-EXTERNAL |
| Speed Is a Strategy for Sellers | Earnest money goes hard at contractual gates; exposure points | Contract mechanics as framed on the page (terms set by the purchase agreement) | UNCITED-BUT-CONSISTENT |
| Speed Is a Strategy for Sellers | 30-day close timeline (what fits, what drops) | Labeled illustrative timeline on the page | LABELED ILLUSTRATION |
| Speed Is a Strategy for Sellers | Former universals ("rarely reach the open market"; "has paid tuition"; "a hundred times") | No evidence; cut or rewritten as labeled judgment | BLOCKED (removed) |

## Batch 5: Field Notes, second four (commit 56af39b)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| The Permits Buyers Skip | Nonconforming-use limits on expansion, change of use, rebuilding | Town of Boone NC UDO Article 7; City of Frisco TX Zoning Ordinance 1.06; opened and cited with jurisdictions named | GROUNDED-EXTERNAL |
| The Permits Buyers Skip | Utility/water capacity re-demonstration can be required when a system changes ownership (Florida) | Florida DEP rule context via EPA-hosted FDEP document, opened and cited; replaces the unsupported "a sale itself can trigger review" | GROUNDED-EXTERNAL |
| The Permits Buyers Skip | Priced expansion example | Labeled illustrative on the page | LABELED ILLUSTRATION |
| The Utility System Nobody Underwrote | Per-system evidence table (approval, issuing authority, capacity unit, proving document) | Doctrine Condition/Capacity/Compliance frame plus cited capacity documentation in Sources and Limits | GROUNDED-INTERNAL + GROUNDED-EXTERNAL |
| The Utility System Nobody Underwrote | Park-scale wastewater work is custom-quoted; no published price | The company's diligence-spend research; stated as a limit, no figures asserted | UNCITED-BUT-CONSISTENT |
| The Utility System Nobody Underwrote | Former frequency claims ("These are not unusual stories"; "verify least" as fact) | Removed or reframed as labeled judgment | BLOCKED (removed/reframed) |
| Manufactured Housing Diligence (Field Note) | Homes are generally titled as personal property; treatment varies by state; conversion/affixture rules differ | Texas Occupations Code ch. 1201; TDHCA statement-of-ownership material; 49 CFR 580.1; opened and cited | GROUNDED-EXTERNAL |
| Manufactured Housing Diligence (Field Note) | Park capital exposure to tenant-owned structures is limited but not zero (abandonment, removal, legal costs) | Qualified on the page, replacing "close to zero" | UNCITED-BUT-CONSISTENT |
| Manufactured Housing Diligence (Field Note) | POH/TOH worked split | Labeled synthetic example on the page; arithmetic verified | LABELED ILLUSTRATION |
| Before You Underwrite | The six-label system | CrosstownOS's own defined framework (doctrine; /parkproof-standard); provenance note on the page distinguishes definition from behavioral claims | GROUNDED-INTERNAL |
| Before You Underwrite | Calculated means versioned and reproducible from stated inputs | Doctrine wording restored on the page | GROUNDED-INTERNAL |
| Before You Underwrite | Opening operator anecdote | Labeled illustrative composite on the page | LABELED ILLUSTRATION |

## Batch 6: /mobile-home-park-investing, /buying-a-campground (commit 13f3484)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| /mobile-home-park-investing | Evicting a homeowner is slower and costlier than a renter turnover | Qualified on the page: governed by state landlord-tenant law, varies materially by state | UNCITED-BUT-CONSISTENT |
| /mobile-home-park-investing | Homes typically titled as personal property; can be converted/affixed to real property in many states | Jurisdiction caveat on the page; titling doctrine per Batch 5 sources | GROUNDED-EXTERNAL (via cited titling authorities) |
| /mobile-home-park-investing | Sub-metering is the capex item where jurisdiction and utility rules allow it | Conditional language on the page (some states/localities restrict utility resale) | UNCITED-BUT-CONSISTENT |
| /mobile-home-park-investing | Former era claim ("Much of the national stock was built in the 1960s through 1980s") | No locatable dataset states the age distribution of the national park stock (MHI data covers home production, not park stock age; Census ACS 1-year tables are experimental without usable documentation). Deleted; replaced with an honest no-census framing | BLOCKED (deleted; restore only with a real stock-age dataset) |
| /buying-a-campground | Amenity capital: a major bathhouse renovation can run into six figures depending on scope and region | Scope-conditional framing on the page; no figure asserted as market data (no park-specific published source exists) | UNCITED-BUT-CONSISTENT |
| /buying-a-campground | 70% of revenue in five months | Labeled on the page: "Illustrative shape, not a benchmark" | LABELED ILLUSTRATION |
| /buying-a-campground | Broker packages assume mid-single-digit annual rate growth on transient sites | Reframed on the page as an assumption to test against local comps | UNCITED-BUT-CONSISTENT |
| /buying-a-campground | Seasonality inverts in Sun Belt and winter-destination markets | Regional caveat added on the page | UNCITED-BUT-CONSISTENT |

---

## Batch 7: landing core (/, /workspace, /parkproof-standard, /parkproof-walkthrough, /checklist)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| / | Deferred-maintenance cost transfer (Field Notes preview) | Body text of the linked Field Note; preview aligned to it | GROUNDED-INTERNAL |
| / | "No diligence framework can tell you a claim is true, only what stands behind it" (replaces "claim status is never a claim about whether the number is true") | ParkProof Standard definitions | GROUNDED-INTERNAL |
| / | Advance label records readiness, does not tell the buyer to transact | /parkproof-standard posture bodies, matched | GROUNDED-INTERNAL |
| / | ParkProof file is "a presentation of a buyer's accumulated evidence" | Standard's own definition, quoted | GROUNDED-INTERNAL |
| /workspace | Offer terms (First Five Free, 90 days, $1,250, $2,500, November 2026) | The company's live offer | GROUNDED-INTERNAL |
| /workspace | Plan-table coverage figures | In-file; stated as workspace coverage, not market data | GROUNDED-INTERNAL |
| /workspace | Seller-financing timer ("90 days of seller silence is information") | Reframed on the page as a stated heuristic with an action, not a law | UNCITED-BUT-CONSISTENT |
| /workspace | Former vesting sentence (percentage of cost basis vesting on a schedule) | No product record supports it; deleted | BLOCKED (removed) |
| /workspace | Wave 2 outcome sentences | Audited sentence by sentence in Batch 7; most carry their condition in the sentence ("a file a lender can rely on" = reliance, not a closing promise); the one absolute ("A closing that holds") carries a label disclaimer on the page and was softened in its sibling instance | UNCITED-BUT-CONSISTENT |
| /parkproof-standard | Six states, four postures, gate rules | Product doctrine; definitions byte-identical with Before You Underwrite, /workspace table, and lib/tools/evidence.ts (verified Oct 15 and re-verified in Batch 7) | GROUNDED-INTERNAL |
| /parkproof-walkthrough | All story numbers and the Pause conclusion | Accuracy-audited 2026-10-15 (fix e0c8f69); Batch 7 classified framing claims only; two "proves" absolutes in scene prose softened to the Standard's own vocabulary | GROUNDED-INTERNAL |
| /checklist | "In most parks the binding constraint is rarely the math" (field-verified universal) | Softened in Batch 7 to an instruction ("pressure-test it against the seller's actual numbers") | UNCITED-BUT-CONSISTENT |
| /checklist | County satisfaction-of-mortgage recording before funds move | Washington DOC recording guidance, opened and cited in the page's Sources treatment | GROUNDED-EXTERNAL |
| /checklist | One-year REDBOOK/lender seasoning statement | North Carolina GS 143-129 is named as one jurisdiction's rule; no universal seasoning claim remains | GROUNDED-EXTERNAL |

## Batch 8: landing + hubs (/for-brokers-lenders, /trail-log, /editorial-standards, /tools, /resources, /resources/catalog, /blog)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| /editorial-standards | The house disclosure standard | Updated in Batch 8 to state the committed protocol (dossier, claims ledger, Sources and Limits, AI footer): docs/content-production-protocol.md | GROUNDED-INTERNAL |
| /trail-log | Entry dates and shipped-work counts (51 pages, 22 links, 38 outcome sentences, 40 remaining index requests) | Repo git log and the Oct 15 verification reports; one entry date corrected (Oct 9 to Oct 7) in Batch 8; one initially flagged entry re-verified as accurate and left unchanged | GROUNDED-INTERNAL |
| /resources | First Five Free sample outcome line | Labeled on the page as a sample ("Sample:") in Batch 8 | LABELED ILLUSTRATION |
| /resources, /resources/catalog, /tools, /blog | Counts (38 resources, 9 Field Notes, 6 tools) | Live site inventory, verified in Batch 8 | GROUNDED-INTERNAL |
| /for-brokers-lenders | What the workspace does for brokers and lenders | Aligned to /workspace's supported claims; two universals about broker behavior softened in Batch 8 | GROUNDED-INTERNAL / UNCITED-BUT-CONSISTENT |
| /privacy, /terms | (glance only) | Batch 8 glance: pure policy surfaces, no claims of the audited classes. Skip stands | NOT AUDITED (skip logged) |

## Batch 9: tools (ToolShell + six tool pages; copy and labels only, no logic or threshold values changed)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| All tools (shared FAQs, lib/tools/faqs.ts) | "This output is a screening result, not an appraisal, valuation, or investment recommendation" | The tools' own limiting language, now uniform | GROUNDED-INTERNAL |
| /tools/emd-clock | 30/45/60-day diligence lengths | Relabeled on the page as illustrative defaults set by the purchase agreement, not standard periods | LABELED ILLUSTRATION |
| /tools/poh-toh-split | Lender treatment of park-owned-home income ("many lenders haircut or exclude POH income; ask the lender") | Softened in Batch 9 from a 30 to 50 percent universal to a sourced-framing instruction (no figure asserted as a rule) | UNCITED-BUT-CONSISTENT |
| /tools/rent-roll-truth-check | Example workbook values | Date-stamped "as of January 2025" and labeled hard figures vs judgment calls in Batch 9 | LABELED ILLUSTRATION |
| /tools/utility-capacity-triage | 14-day response defaults; cost figures in examples | Relabeled as defaults/examples in Batch 9; two state groundwater regulator sources opened and cited | LABELED ILLUSTRATION / GROUNDED-EXTERNAL |
| /tools/60-second-screener | Price-band screening cutoffs | Labeled on the page as CrosstownOS judgment calls for screening, not market bands | LABELED ILLUSTRATION |
| /tools/expense-normalizer | Normalization method claims | Doctrine method; one FAQ universal about seller statements qualified in Batch 9 | GROUNDED-INTERNAL |
| lib/tools/evidence.ts | Six state definitions | ParkProof Standard taxonomy; NOT edited in Batch 9. Two drift flags recorded in the Batch 9 report (imperative wording inside the Missing definition; Walk label provenance) for a future definitional pass | GROUNDED-INTERNAL (flags open) |

## Batch 10: resources family, template + first 19 (lib/resources.ts, app/resources/[slug]/page.tsx)

**Coordinator correction (2026-10-16, source-reconciled):** the original Batch 10 builder report described edits to structures that do not exist in this repo (a HOWTO_SCHEMAS layer, per-resource body text in lib/resources.ts, a copyright-stamping pattern, an ATCO-sourced load-factor replacement, labeled interest defaults, an E&O multiple removal). The shipped diff (commit fecbd98) was reconciled line by line by the coordinator: the actual Batch 10 changes are the two template edits and the description qualifications below. The phantom items were never in the tree, were never pushed, and are recorded here as a builder-report discrepancy, not as work performed. The resource bodies live in lib/resource-inside.ts (never edited before the corrective batch) and in the downloadable PDFs (outside this pass's file scope).

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| All 38 resource pages (template) | "Basis and limits" paragraph in the template's limits furniture: each worksheet states the CrosstownOS diligence method and its Evidence Status Standard, not a market benchmark or a sourced rate; worked-example figures are illustrations or working assumptions to replace with the deal's verified numbers; tax, insurance, landlord-tenant, and fair-housing rules vary by jurisdiction | Added to app/resources/[slug]/page.tsx in Batch 10; applies family-wide from the one template | GROUNDED-INTERNAL |
| All 38 resource pages (template) | One related-resource note (capital-plan to lender-one-pager) softened from an absolute ("cannot be built without") to a sequencing statement | Batch 10 template edit | UNCITED-BUT-CONSISTENT |
| First 19 resources (catalogue descriptions in lib/resources.ts) | Outcome and universality wording in description fields (mystery shopper, benchmark builder, seller call script, seller motivation, team roster, evidence-request list, expense normalizers) | Qualified in Batches 10 and 11 combined pass over lib/resources.ts (22 description lines total across both batches; see the shipped diff for fecbd98) | UNCITED-BUT-CONSISTENT |
| Resource bodies (lib/resource-inside.ts) | Inside-block method content for all 38 resources | NOT audited in the original Batch 10 pass (its "no drift" verdict is withdrawn as unverified). Audited in the corrective batch; see the corrective section below | SEE CORRECTIVE BATCH |

## Batch 11: resources family, remaining 19 (lib/resources.ts, description fields)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| 11 resources (descriptions) | Outcome and universality wording in shortDescription fields (rv-revenue-reality-check, seller-note-anatomy, the-emd-countdown-tracker, the-journey-map, the-offer-term-sheet-builder, the-walk-away-pact, tenant-communication-and-rent-playbook, the-rent-roll-truth-check, the-rv-expense-normalizer, utility-and-wastewater-diligence-sheet, vacant-pad-fill-calculator) | Qualified in Batch 11: outcomes softened to tools that help the buyer weigh/prepare/stress-test; EMD description now states deadlines are calendar-day counters set by the purchase agreement; tenant description limited to stalls the buyer can control and defers to the lease and state law | UNCITED-BUT-CONSISTENT |
| /resources/lot-by-lot-walkthrough (FAQ) | Standards-restatement answer in the shared FAQ furniture | Two qualifiers added in Batch 11 so the compressed restatement matches /parkproof-standard (one is file drift; Batch 11 caught and fixed it here) | GROUNDED-INTERNAL |
| /resources/the-transient-site-fill-calculator (description) | "Transient and seasonal sites often price off the wrong occupancy" | Drift fixed in Batch 11 to the worksheet's own scope (underwrite the property's own trailing fills) | GROUNDED-INTERNAL |
| /resources/the-rent-roll-truth-check (FAQ schema) | Batch 11's live check reported an FAQJsonLd "simple rule" answer stronger than the page's narrowed visible answer | NOT REPRODUCED on coordinator re-check (2026-10-16): a dedicated follow-up audited lib/resource-inside.ts in full (no FAQPage JSON-LD exists in the file; it was never modified in this remediation), and the string "simple rule" exists nowhere in the codebase or on the live page. The page's FAQ answers as shipped match its narrowed visible text. Recorded here so the flag and its resolution both stay on the record | NO DRIFT FOUND (flag closed) |
| Remaining Batch 11 resources (bodies) | Worked figures and method content inside the resource bodies | Bodies live in lib/resource-inside.ts and the downloadable PDFs. The Batch 11 family verdict as originally reported (labels handled in template furniture) is corrected: the shipped family treatment is the template's Basis and limits paragraph (Batch 10), and the Inside content itself is covered by the corrective batch below. The PDFs' internal figures were not audited in this program; that limit is recorded plainly | SEE CORRECTIVE BATCH (web content); PDFs NOT AUDITED (recorded limit) |

---

## Corrective batch: RESOURCE_INSIDE bodies + report reconciliation (commit 4a1ad47)

| Page / surface | Claim | Basis / Source | Status |
|---|---|---|---|
| Resource Inside content, all 38 (lib/resource-inside.ts) | Full-file claim audit (corrective): content is worksheet method (internal doctrine), one expired relative-date line already fixed in Batch 11 (the AS-20 walkthrough reference), three behavioral universals | Audit read the whole file against source. Three qualifications shipped in 4a1ad47: AS-21 "structures that win" to "structures to consider"; AS-08R "why RV expenses lie" to "why RV expenses can mislead"; AS-22 "the word that scares sellers" and "what sellers fear" to seller-concern framing tied to the sheet itself | GROUNDED-INTERNAL |
| Batch 10 builder report | Described edits to structures that do not exist in this repo (HOWTO_SCHEMAS, per-resource bodies in lib/resources.ts, copyright stamping, ATCO load-factor replacement, labeled rate defaults, an E&O multiple removal) | Coordinator reconciled the shipped diff (fecbd98) line by line: actual Batch 10 work is the template Basis and limits paragraph, one softened related-resource note, and the description qualifications shared with Batch 11. The phantom items were never in the tree and never shipped | REPORT DISCREPANCY, recorded; ledger Batch 10 section rewritten to the diff |
| Expansion verifier hard failures (2) | Buy-it page part-name/code residues; benchmark-builder body still carrying the 15% factor | Coordinator grep of source AND live HTML: neither quoted string exists in the codebase or on the live pages. Third and fourth non-reproducing fetch-based findings in this program | NOT REPRODUCED, recorded |
| Expansion verifier secondary items | Trail Log Oct 7/Oct 9 within-entry mismatch; one unpinned evidence-chip literal | Trail Log: the two dates are two separate entries (Oct 7 entry; Oct 9 entry added by Batch 8 for the MHP note publication); no within-entry conflict exists. Chip literal: no odd-one-out rendering identifiable in source; tool chips render centrally from the pinned literals in lib/tools/evidence.ts | NOT REPRODUCED, recorded |

---

## Micro-batch (final): /resources/the-evidence-status-standard states table colors

| Page | Change | Basis / Source | Status |
|---|---|---|---|
| /resources/the-evidence-status-standard | The states table (Letter / Name / Meaning) now carries the color system: Letter cells keep their bold treatment and take their state colors; Name cells take the same colors (Verified text-success, Broker-reported text-accent, Missing text-critical, Assumed text-primary, Calculated text-calculated, Unresolved text-muted). Content wording unchanged; this page's short name forms ("Missing," "Assumed") deliberately not harmonized. Applied in the resource template at the one section gated to this slug only (showEvidenceLetters), so no other resource page's tables were affected | The color system as shipped on /parkproof-standard and the /workspace evidence-states table (2026-10-15); state color tokens per lib/tools/evidence.ts | GROUNDED-INTERNAL. Commit `1ae467004270099bc47a7fe9fbdeb721dd42c15b`; verified in served HTML: all six letters and names carry their state color classes |

---

## Open flags carried forward

1. Occupancy note heading "The document buyers trust most": heading-level superlative; Jeremy's call (see remediation report, Decisions).
2. lib/tools/evidence.ts definitional wording flags from Batch 9 (imperative inside the Missing definition; Walk label provenance): definitional pass, Jeremy's call.
3. Permits and Utility Field Notes: field-observation depth remains NEEDS DEPTH; closing them is new sourced research under the protocol, not an edit.
4. Protocol adoption: takes effect on founder confirmation (protocol Section 8).
5. CLOSED (not reproduced): Batch 11's reported FAQ-schema drift on the-rent-roll-truth-check. Full-file follow-up audit plus coordinator grep of source and live page found no such text; see the Batch 11 ledger row for the full record.
6. Batch 7 report discrepancy (coordinator reconciliation, 2026-10-16): the Batch 7 builder's report described two corrections to /parkproof-standard ("Decision review" gate name; a conditional on a knowing-questions sentence). Neither string exists in the page source or live page, and the file was never modified; the items are recorded as not reproduced. The page stands as verified in Batch 7's own read (definitions byte-identical across the four sources) with no change made or needed for those two items.

---

## Post-verification residuals (commit 7f5990d)

| Page | Change | Basis | Status |
|---|---|---|---|
| /buying-an-rv-park | Gate 3 superlative "underwrite least and regret most" qualified as CrosstownOS judgment | Independent verifier residual 1 | FIXED, verified live |
| /data-room-vs-diligence-software | Site-evidence cell rewritten from "Files uploaded after the visit" to a factual statement; AI disclosure footer added (page had none) | Independent verifier residual 2 + consistency gap | FIXED, verified live |
| /buying-a-campground | "Most campgrounds earn the bulk of annual revenue in a four to six month window" qualified to "Many campgrounds... concentrated season, often four to six months" | Independent verifier residual 3 | FIXED, verified live |
| Speed note | Body 1031 sentence now reads "due date (with extensions)" | Verifier minor | FIXED |
| Rent Roll note | Forum attribution corrected to one participant + general discussion | Verifier minor | FIXED |
| Before You Underwrite note | Closing teaser aligned to judgment-labeled phrasing | Verifier minor | FIXED |
| /rv-park-investing | "Park debt is typically bank or local-lender debt" reframed as an expectation | Verifier minor | FIXED |
| Speed + Occupancy notes | "These are not unusual stories" left as written: both passages carry explicit "in our judgment" framing in the same breath | Coordinator decision, recorded | LEFT, decision recorded |
