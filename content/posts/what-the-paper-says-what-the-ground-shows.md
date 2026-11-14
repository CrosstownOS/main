---
title: "What the Paper Says, What the Ground Shows"
date: "2026-11-14"
excerpt: "Diligence in 2026 is not less verification than diligence was. It is the same verification with the transcription removed and the evidence attached."
tags: ["diligence", "verification", "field notes"]
seoTitle: "What the Paper Says, What the Ground Shows | Evidens"
---

A park arrives as paper. Before a buyer sees a single site, the deal exists as a stack of documents: a rent roll, monthly statements, a purchase agreement, utility and tax records, whatever the broker's package holds. The package looks like evidence. This series has taught from its first note that it is better understood as a set of claims. The rent roll claims what should have been collected. The statements claim what the books recorded. The agreement claims the terms both sides accepted. A document received is a claim until it is reconciled against independent records, and the reconciliation is the diligence.

For as long as this work has been done by hand, diligence has meant transcription before judgment. The buyer, or someone the buyer pays, re-types the seller's paper into the buyer's own spreadsheets, line by line, and only then is the buyer allowed to think about what the paper says. The judgment is the valuable part. The typing is not, and the typing is where the hours went. In many transactions it still runs that way, because the alternative asked the buyer to trust a summary somebody else prepared, and a summary is just one more claim.

## What changes when a field carries its evidence

Extraction changes the order of the work. A document is read once, and its fields are lifted into the record in structured form: the site, the rate, the period, the total, the term. Each extracted field can carry its source location with it, a page and a bounding region for a document page, or the cell range for a spreadsheet file. That citation is the difference between a number you were handed and a number you can check. The value no longer asks to be believed. It points at where it came from, and a buyer can go and look.

The machinery around the value matters as much as the value. An extraction run returns the fields and, beside them, per-field detail that can include confidence scores, so a weak read can announce itself as weak instead of blending into the strong ones. And when a human reviews the output and corrects a field, the reviewed output is kept as a distinct record beside the original, with the correction visible. The machine's first answer is not silently overwritten. That is the same discipline the evidence labels teach, applied to the tool itself: what was reported, what was checked, and what changed stay three separate things.

## We graded it, on real paper

Claims about extraction are easy to make and hard to check, so we checked one the only way that counts: we graded it. The grading was an internal grading of one park's real document set, run in November 2026. The park is not named here, and it is not described in any way that identifies it. The set held six documents, a rent roll, monthly statements, a purchase agreement, and an electric file among them, and the grading ran four extractors over 38 fields and 8,408 field values.

The ground truth was fixed before any extractor ran. It was produced by hand on October 26, 2026, frozen, and never edited afterward to match a run. Against that frozen record, 8,405 of the 8,408 graded values came back exact: 99.96 percent, with zero money mismatches, zero missing values, zero invented values, and zero row count mismatches. An independent re-grade of a 209-value sample agreed with the grading on every value sampled. The whole pass took 179 seconds of machine time across ten runs, and 541 credits of the 768-credit allowance the pass was run under.

The set was not a friendly one. It mixed forms the way real packages do: a scanned image with no text layer beside born-digital PDFs and CSV files, leading zeros that had to survive as text, and printed totals that did not agree with their own rows. A grading on clean demonstration documents would have proven less.

The extraction graded for this note ran on [Extend](https://www.extend.ai).

A note about trust that hides its own misses fails on its face, so here are the three. Two were the same small failure twice: on the April 2025 and December 2025 monthly statements, the extractor read the period label and dropped its first word, returning the period without the word From. Both are recorded as model errors. The third stands unresolved by design. On the scanned rent roll, one resident surname came back with its capitalization altered. The preserved evidence cannot distinguish a scan that defeated a correct read from a model that misread a clear value, so the register records the cause as unresolved rather than guess. Three misses, named, out of 8,408 values. That register, not the headline percentage, is what a grading is for.

## Extraction is not verification

Extraction answers one question: what does the document say. It does not answer the second question, the one diligence actually turns on: should the document be believed. A fabricated statement extracts beautifully. Its fields lift, its totals cite their pages, and every value in it is false. The cleaner the extraction, the more dangerous the forgery, because the forgery now arrives organized.

That is why a second discipline has formed beside extraction: checking the document itself for signs it was made or altered. Extend announced its entry in that discipline, a product it calls Verify, on October 19, 2026, at Money20/20. In Extend's own terms, Verify checks a document for signs of AI-generated fabrication, for localized tampering down to single-character edits in an otherwise genuine document, for conventional digital editing such as patched text and image overlays, and for changes made after a document was digitally signed. Extend states that it examines the visual content, the file structure and metadata, and the PDF internals, including signatures, revision history, hidden layers, and fonts, and that it returns a risk level of LOW, MEDIUM, or HIGH with a plain-language summary and the signals it found, each with locatable evidence. It also checks content reconciliation, such as totals that do not add up. It takes a single PDF, JPEG, or PNG, and access to it requires Extend's approval.

Extend's stated limits deserve the same print as its capabilities, because the limits are what keep the tool honest. Extend states that Verify does not perform identity verification, does not compare documents to each other, and does not claim that a document is genuine, and that a LOW risk level means the checks that ran found nothing, not that the document is authentic. Hold any tool in this category to that standard of candor. And one boundary for this note: the grading above tested extraction only. It did not run Verify, and none of its counts should be read as a Verify result.

## Paper still has to meet the ground

None of this retires the older discipline; it shortens the paper half of it. The reconciliation order stands exactly as this series has taught it: bank deposits first, then collections, then the rent roll, then the leases or other source records, with deposit records obtained from the source institution where possible. What the seller's documents say, even extracted and checked, is scheduled rent and reported collections. What reached the bank is behavior. Mobile Home University's doctrine, which this series has cited since its early notes, is to verify every number and condition from scratch rather than trust seller-supplied information, and extraction does not amend that doctrine. It enforces it faster.

And the paper still has to meet the ground. Walk the park. Verify a sample of sites against the roll for occupancy, for who is actually there, and for whether the name, rate, and status on the ground match the name, rate, and status on the page. Where the size and structure of the deal support them, estoppel certificates add a second, tenant-signed check. A roll that ties to deposits but not to the ground, or to the ground but not to deposits, is only half verified. No extractor walks a park.

## What to demand from any tool, including ours

So the buyer's questions change less than the headlines suggest. The tools are faster. The standard is the same, and a buyer should test any extraction or verification tool, including ours, against it before it touches a live deal.

- **Show the citation.** A field that cannot point at its page, its region, or its cell range is a claim wearing a costume. Demand the source location on every value that matters.
- **State the misses.** A grading that reports a percentage and hides its error register is marketing. The misses should be named, classified, and few enough to list.
- **Keep the correction visible.** When a human fixes a machine's value, the original and the correction should stand as two records. A silent overwrite destroys the audit trail the tool was bought to create.
- **Print the limits.** A verification tool that will not say what it does not check is asking for trust it has not earned. The limits belong on the page, in the vendor's own words.
- **Grade it on your own paper.** Freeze ground truth by hand, before the run, and never edit it to match. A tool that performs on its maker's demonstration set has proven it can perform on its maker's demonstration set.

Diligence in 2026 is not less verification than diligence was. It is the same verification with the transcription removed and the evidence attached, and it holds only if the buyer keeps the discipline the slow way used to enforce by accident. Nothing is true because a document says so. Nothing is true because a machine read it, either. The record is what survives both questions, and building it is still the buyer's work.

Next in Field Notes: the lender's version of your deal, underwritten on history instead of the story.

## Sources and Limits

- **Internal grounding:** the graded counts, the three misses, the corpus description, the cost, and the latency in this note come from an internal grading of one park's real document set, run in November 2026, with the park unnamed. The ground truth was produced by hand and frozen on October 26, 2026, before any extraction run, and was never edited to match a run; an independent sample re-grade of 209 named values agreed with the grading on every sampled value. The reconciliation order, the three numbers, and the field check come from the CrosstownOS [ParkProof Standard](/parkproof-standard) and this series' earlier note, [The Rent Roll Is a Claim, Not Income Verification](/field-notes/the-rent-roll-is-a-claim-not-income-verification).
- **Extend:** the citation, confidence, and review mechanics are as Extend documents them in its extraction response format and workflow review documentation (docs.extend.ai, accessed November 13, 2026). Verify's capabilities, method, access requirement, and limits are Extend's own statements, from its Verify overview documentation (accessed November 13, 2026) and its launch release of October 19, 2026 (BusinessWire, from Money20/20 USA). They are printed as vendor statements, not as CrosstownOS findings. The grading in this note did not run Verify.
- **Mobile Home University:** its due diligence doctrine, in [The Truth About Mobile Home Park Due Diligence](https://www.mobilehomeuniversity.com/articles/the-truth-about-mobile-home-park-due-diligence), is to verify every number and condition from scratch rather than trust seller-supplied information, including whether occupancy is as promised; its forum discussion of confirming the rent roll against gross receipts deposited to the bank applies the same point to income, as the rent roll note above cites. **Primior:** its [Commercial Real Estate Rent Roll Analysis](https://primior.com/commercial-real-estate-rent-roll-analysis/) sets out the same reconciliation bridge, from contractual rent to billed rent to collected rent to bank deposits.
- **Limits:** the graded result covers one document set from one park: six documents, graded once, in November 2026. It is not a market benchmark, and it does not predict results on another set, another park, or another configuration. Extend publishes a fraud-detection benchmark figure for Verify whose corpus and scoring it keeps private; this note does not use it, because a number a reader cannot check does not meet the standard this note teaches. Extend's own materials state Verify's price in two incompatible ways; this note quotes no price for it. This note makes no statement of law and gives no legal, tax, engineering, or investment advice; fact-specific legal questions belong to qualified counsel in the relevant jurisdiction.

*Put it to work: run the [Rent-Roll Truth Check](/tools/rent-roll-truth-check) on your deal, or start with the [free RV park due diligence checklist](/checklist). When the deal gets real, the [Acquisition Workspace](/workspace) carries the full record.*

*This note may use AI-assisted research and drafting. Sources, claims, and final editorial judgment remain subject to human review.*
