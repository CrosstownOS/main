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

**Coordinator correction (2026-10-16, full-handoff reconciliation):** this section originally carried rows written from an interim summary that the builder's full report and the shipped diff do not support, including two citation rows (Washington DOC recording guidance; North Carolina GS 143-129) for claims and citations that never existed on /checklist, a homepage Field Notes preview replacement that never occurred, and a /workspace "vesting sentence" deletion that never occurred. GS 143-129 is a public-procurement statute and corroborates nothing here; it was never on the site, only in the interim narrative. The section below is the builder's actual report, reconciled to the diff.

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| / (Thesis) | "Crosstown makes the record disciplined before capital is committed, and for the life of the asset" | Present-tense capability claim spanning planned workspaces | OVERCLAIMED, qualified in Batch 7: "Crosstown is built to make the record disciplined before capital is committed, and to keep it for the life of the asset" |
| / (FieldReality) | "The costliest surprises sit in the gap between what was reported and what can actually be verified" | Superlative, no provenance | OVERCLAIMED, qualified: "The costly surprises sit in the gap..." |
| / (BuyingGuides) | "the verification framework that protects your capital" | Outcome guarantee as written | OVERCLAIMED, qualified: "the verification framework buyers run before capital commits" |
| / (all other surfaces) | Hero, ProductLoop (incl. the Source sentence, correct per the 2026-10-15 founder correction), ParkProof demo (labeled "Conceptual example"), DealDeskPromo offer terms, LifecycleVision November/Direction split | Product doctrine and the live offer; demo labeling verified present | GROUNDED-INTERNAL, no action |
| /workspace | Pilot card: "The file you build is the file your lender reads... in the order a reviewer asks for them" | Asserted lender behavior, no source | UNGROUNDED, qualified in Batch 7: "The file you build is built for a lender's or partner's read: claims, evidence, and open items in one place, each carrying its evidence state" |
| /workspace | Who-it-is-for: "A deal worked on the record reaches closing with its open items already decided, not discovered" | Read as a guaranteed outcome | OVERCLAIMED, qualified: "...is built to reach closing..." |
| /workspace | Offer terms, scope items, evidence-states table, FAQs | Live offer; definitions match /parkproof-standard; limits stated in the copy itself | GROUNDED-INTERNAL, no action |
| /parkproof-standard | The whole page | The Standard defining its own terms; no claim about lender, legal, or market behavior appears outside the does-not-replace disclaimer | GROUNDED-INTERNAL, no edits. One flag: the boundary paragraph invokes a "governing variance test" that is defined nowhere on the site; left as written (defining it would invent doctrine), Jeremy's call |
| /parkproof-walkthrough | Closing: "a file like this one is what lets a closing proceed on evidence instead of on the seller's summary" | Outcome framing without a built-to qualifier | OVERCLAIMED, qualified: "...is built to let a closing proceed..." Story numbers not re-audited (accuracy audit 2026-10-15, fix e0c8f69) |
| /checklist | HowTo JSON-LD totalTime "P1D" | A one-day duration asserted in schema only, no basis; real duration varies by deal | UNGROUNDED, deleted in Batch 7 (no honest replacement exists) |
| /checklist | Item 4: "the fastest way to blow up a pro forma"; Item 8: "the silent deal killer"; closing protection claim | Superlatives and a causal protection claim, no provenance | OVERCLAIMED, qualified in Batch 7 ("can blow up a pro forma"; "a silent deal killer"; "built to keep a buyer's capital behind proof") |
| /checklist | The 15 items themselves (incl. items 6, 9, 10) | Buyer actions and prescriptions naming the authorities/sources to check (county, FEMA maps); no jurisdiction-free statement of law | UNCITED-BUT-CONSISTENT, no action |
| components/zone1/ArizonaRule.tsx | First-person anecdote with specific unverifiable figures ($500,000 assignment, cancelled contract) | No source exists; the component is imported nowhere and renders on no page | BLOCKED (dormant, not live). If ever wired into a page it needs an illustrative/composite label or removal of the figures; Jeremy's call |

## Batch 8: landing + hubs (/for-brokers-lenders, /trail-log, /editorial-standards, /tools, /resources, /resources/catalog, /blog)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| /editorial-standards | The house disclosure standard | Updated in Batch 8 to state the committed protocol (dossier, claims ledger, Sources and Limits, AI footer): docs/content-production-protocol.md | GROUNDED-INTERNAL |
| /trail-log | Entry dates and shipped-work counts (51 pages in the validation queue, 22 internal links, 38 pages with rewritten meta descriptions) | The company's own Oct 15 session records (Search Console actions leave no repo commit, as expected); counts match the page's own text. Batch 8 corrected the Oct 2 Field entry title/body, the Sept 28 library count (35 coded tools + 3 spines), the Sept 15 opening-note date, qualified the November scope line, and added the Oct 9 ninth-note entry. An interim qualification of the 51/11 entry was reverted when the session records reconciled it | GROUNDED-INTERNAL |
| /resources | (No "Sample:" label exists on the hub; an earlier interim record claiming one was summary contamination and is withdrawn) | Verified against source, live page, and diff by the expansion verifier | NO SUCH EDIT (record corrected) |
| /resources, /resources/catalog, /tools, /blog | Counts (38 resources, 9 Field Notes, 6 tools) | Live site inventory, verified in Batch 8 | GROUNDED-INTERNAL |
| /for-brokers-lenders | What the workspace does for brokers and lenders | Aligned to /workspace's supported claims; two universals about broker behavior softened in Batch 8 | GROUNDED-INTERNAL / UNCITED-BUT-CONSISTENT |
| /privacy, /terms | (glance only) | Batch 8 glance: pure policy surfaces, no claims of the audited classes. Skip stands | NOT AUDITED (skip logged) |

## Batch 9: tools (ToolShell + six tool pages; copy and labels only, no logic or threshold values changed)

| Page | Claim | Basis / Source | Status |
|---|---|---|---|
| All tools (shared FAQs, lib/tools/faqs.ts) | Limiting language across the six tools' FAQ arrays | Edited in Batch 9 for accuracy and consistency (incl. the rent-roll variance correction below); ToolShell itself verified clean, no edits (readiness disclaimer already in banner, posture, and print root) | GROUNDED-INTERNAL |
| /tools/emd-clock | Deposit mechanics stated as universals ("goes hard in N days," "the full EMD is at risk") | Refundability is set by the purchase agreement, escrow instructions, and state law | UNGROUNDED as written, qualified in Batch 9 everywhere it appears (meta, hero, posture, exposure copy, print, export) plus a "How to read this tool" qualifier: "This tool does not interpret your contract." No 30/45/60 defaults exist in the tool (blank date inputs); an earlier interim record claiming they were relabeled is withdrawn |
| /tools/poh-toh-split | "POH homes are depreciating personal property, not dirt. Capitalizing their rent as real estate is how buyers overpay" (tool + FAQ) | Title/tax treatment varies by state and conversion status | UNGROUNDED legal universal, qualified in Batch 9 ("In many states... confirm it on the record"); advice-drift CTA lines rewritten to record framing |
| /tools/rent-roll-truth-check | FAQ variance statement ("deposits trail reported occupancy by more than 5 points") | Wrong vs the tool's own logic: posture pauses on a variance over 5 points in EITHER direction (lib/tools/calc.ts) | INACCURATE, corrected in Batch 9. Meta and CTA overclaims also fixed. The tool ships with blank rows, so no example values exist to datestamp; an earlier interim record claiming a January 2025 datestamp is withdrawn |
| /tools/utility-capacity-triage | FAQ scoring meaning ("Green means capacity supports the park as operated") | The tool scores recorded system type + permit status only; it measures no capacity | OVERCLAIMED, corrected in Batch 9 in the FAQ and the on-page scoring paragraph; "electrical is advisory and never gates the deal" qualified to this tool's design; an "always" universal deleted. No groundwater citations were added; an earlier interim record claiming two is withdrawn |
| /tools/60-second-screener | Expense bands MHP 35-45%, RV 45-60% (hardcoded) | No source in the repo; values are also comparison logic | UNGROUNDED benchmark values, NOT changed; relabeled in Batch 9 in UI, print, and export as "illustrative sanity band... a tool assumption, not a market benchmark or verified data." Values are Jeremy's call (see Open flags) |
| /tools/expense-normalizer | Management rate default 8%, prefilled | No source in the repo | UNGROUNDED default, NOT changed; labeled "Illustrative default; set your own" in Batch 9. Jeremy's call |
| /tools/poh-toh-split | POH multiple default 3, prefilled | No source in the repo | UNGROUNDED default, NOT changed; labeled an illustrative default in Batch 9. Jeremy's call |
| lib/tools/evidence.ts | Six state definitions | ParkProof Standard taxonomy; NOT edited in Batch 9. One wording note from Batch 9: the Retrade body describes a "modeled range," while the Expense and POH tools trigger Retrade off variance/delta tolerances; wording is the Standard's, left untouched | GROUNDED-INTERNAL (note open) |
| components/tools/ToolShell.tsx | Uses `triggerRef` at lines 288, 305, 318 without declaring it | Present verbatim at the base commit; confirmed by tsc | PRE-EXISTING CODE DEFECT (not a claims issue); flagged for a code task, not fixed in content scope |

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
| 11 resources (descriptions in lib/resources.ts) | Outcome and universality wording, each fixed in Batch 11: AS-24 revenue "actually stabilizes at / number that repeats" (prediction removed); AS-21 seller needs/fears reframed as possibilities to test on the call; AS-22 "answers what the seller fears" to "can address a concern the seller raises"; AS-07 "before the broker builds it for you" deleted; AS-09R "not as padded lot rent" (seller implication) removed; AS-08R "the lines RV deals hide / the true cost" qualified; AS-27 "who you need, what each professional verifies" qualified; AS-10 and AS-10R fill calculators reframed as models on entered working assumptions ("could earn/cost," not "actually earns / the real math"); AS-13 "before they become your emergency" qualified; the-evidence-status-standard spine description corrected to the Standard's own terms ("every material claim," "evidence state," "broker-reported one") | Batch 11 edits, verified in the shipped diff for fecbd98. Key figure finding: none of the 19 descriptions contains a numeric figure except the verified library count (35 tools + 3 spines = 38); all figures live inside the PDFs | UNCITED-BUT-CONSISTENT (qualified) / GROUNDED-INTERNAL |
| /resources/the-evidence-status-standard (template EVIDENCE_LETTERS + three rules) | Batch 11 blocked flag: the template's short definitions DRIFTED from the Standard: C said "from verified inputs" (Standard: from stated inputs, only as reliable as the inputs); U said "not produced by the deadline becomes U, and the silence is data" (Standard: no state is assigned or resolved by silence; Missing is its own state); Rule 1 "Unverified is worth $0" swept against the Standard's Missing rule ("never treated as zero"); A omitted "not a verified fact"; V omitted the reviewer | /parkproof-standard and lib/tools/evidence.ts (byte-identical definitions) | DRIFT, FIXED in the post-verification follow-up commit: all six meanings replaced with the Standard's verbatim definitions; Rule 1 rewritten ("A broker-reported claim earns nothing in the price until it becomes Verified. Missing evidence is a finding, not a zero, and not a blank"); Rules 2 and 3 verified consistent and kept. The related-resource note for seller-note-anatomy ("what the seller fears... say yes to") was fixed in the same commit |
| /resources/the-rent-roll-truth-check (FAQ schema) | Batch 11's live check reported an FAQJsonLd "simple rule" answer stronger than the page's narrowed visible answer | NOT REPRODUCED on coordinator re-check (2026-10-16): a dedicated follow-up audited lib/resource-inside.ts in full (no FAQPage JSON-LD exists in the file; it was never modified in this remediation), and the string "simple rule" exists nowhere in the codebase or on the live page. The page's FAQ answers as shipped match its narrowed visible text. Recorded here so the flag and its resolution both stay on the record | NO DRIFT FOUND (flag closed) |
| Remaining Batch 11 resources (bodies) | Worked figures and method content inside the resource bodies | Bodies live in lib/resource-inside.ts and the downloadable PDFs. The Batch 11 family verdict as originally reported (labels handled in template furniture) is corrected: the shipped family treatment is the template's Basis and limits paragraph (Batch 10), and the Inside content itself is covered by the corrective batch below. The PDFs' internal figures were not audited in this program; that limit is recorded plainly | SEE CORRECTIVE BATCH (web content); PDFs NOT AUDITED (recorded limit) |

---

## Corrective batch: RESOURCE_INSIDE bodies + report reconciliation (commit 4a1ad47)

| Page / surface | Claim | Basis / Source | Status |
|---|---|---|---|
| Resource Inside content, all 38 (lib/resource-inside.ts) | Full-file claim audit (corrective): content is worksheet method (internal doctrine); no external claims and no market benchmarks anywhere in the file; every number is a dimension of the worksheet itself | Audit read the whole file against source (full classification in the corrective builder's report). Three web-only qualifications shipped in 4a1ad47 (AS-21 "structures that win," AS-08R "why RV expenses lie," AS-22 seller-fear phrases) were REVERTED in the post-verification follow-up commit: Batch 10 and Batch 11 both establish that these strings are verbatim section inventories from the resources' own PDFs (the file header states the provenance), so softening them on the web would make the page misquote the document it offers. The PDF headings themselves are a PDF-pass item for Jeremy (see Open flags) | GROUNDED-INTERNAL (method); PDF headings flagged, not web-edited |
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
3. Tool default values with no source (Batch 9 blocked, labeled, values unchanged): Expense Normalizer management rate prefilled at 8%; POH/TOH multiple prefilled at 3; Screener expense bands 35-45% (MHP) and 45-60% (RV). Change, blank, or keep labeled: Jeremy's call.
4. Resource PDF contents: figures and section headings inside the 38 PDFs were not audited or relabeled in this program (web pages carry the family basis-and-limits label). A PDF pass is Jeremy's call. Includes the Inside-inventory headings (e.g. "why RV expenses lie") that mirror the PDFs verbatim.
5. ArizonaRule.tsx dormant anecdote (Batch 7 blocked) and the /parkproof-standard "governing variance test" undefined term: both Jeremy's call if ever activated or revised.
6. Protocol adoption: takes effect on founder confirmation (protocol Section 8).
7. CLOSED (not reproduced): Batch 11's reported FAQ-schema drift on the-rent-roll-truth-check. Full-file follow-up audit plus coordinator grep of source and live page found no such text; see the Batch 11 ledger row for the full record.
8. CLOSED (interim-record contamination, reconciled 2026-10-16): several Batch 7 to 9 ledger rows were originally written from an interim summary rather than the builders' full reports, and described edits that never shipped (two /checklist citations, a /resources "Sample:" label, EMD day-length relabeling, a rent-roll datestamp, utility groundwater citations, a /workspace sentence deletion, a homepage preview replacement). The expansion verifier's diff-based checks exposed the pattern; the affected sections have been rewritten to the builders' actual reports and the shipped diffs. No phantom edit ever reached the site; the contamination lived in the ledger and interim reports only.

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

---

## Publication update (2026-10-22, commit 55be825addb199b76307c08af8e3b713f76ddbdc)

| Page | Change | Basis | Status |
|---|---|---|---|
| /blog | Two new Field Notes published: "RV Park Cap Rates: How One Park Gets Two Asking Prices" (dated 2026-10-20) and "RV Park Due Diligence: Why the Site Walk Decides the Deal" (dated 2026-10-15). Published count is now 11 Field Notes; the Batch 8 count row above (9) stands as its historical record. Index hero slimmed in the same commit: headline one size down, intro paragraph removed (its terms already carried in the page meta description), count and standards text and RSS link folded into one meta line with a computed count, closing block moved below the list | Founder order and approval of the exact plan, 2026-10-22. Each note carries its research dossier and claims ledger on file with seat two, a Sources and Limits section with named sources, and the AI-assistance footer, per the content production protocol | PUBLISHED, verified live on the index and both article pages 2026-10-22 |
