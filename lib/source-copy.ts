// Source module copy, shared by the homepage ProductLoop and the Deal Desk
// November-product block so the claim can never drift between pages.
//
// SAFE: the section 8 product-status matrix phrasing. No enrichment,
// scoring, or monitoring claim.
// FOUNDER (shipped default): the founder-directed sentence, with "sourcing
// and enrichment around it".
//
// Victor confirmed the Source scope in writing on 2026-10-02 (founder-
// reported): Source stays the front of the system, finding parks from
// public pages, listings, and public records with provenance attached.
// THE SWITCH: Jeremy flips SOURCE_SENTENCE back to SOURCE_SENTENCE_SAFE if
// that confirmation is ever withdrawn.

export const SOURCE_SENTENCE_SAFE =
  "Your deal starts in a canonical record. If the lead does not survive screening, the record says why, with the evidence attached."

export const SOURCE_SENTENCE_FOUNDER =
  "Source sees what the outside world says before you arrive. Public listings, public records, broker packages, and seller statements enter the record with their origins attached. Source builds the lead record with sourcing and enrichment around it. Source material is organized, never automatically trusted."

export const SOURCE_SENTENCE = SOURCE_SENTENCE_FOUNDER
