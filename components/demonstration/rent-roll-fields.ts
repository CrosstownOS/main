/**
 * rent-roll-fields.ts: the field dataset for the home page's data room
 * demonstration (J-342). Structure and citation form come from the J-303
 * grading package (jobs/j-303-grading-output/raw/april-rent-roll.pdf
 * .extract.json): field paths, citation pages, and the place on the page
 * as the extract's citation polygons carry them.
 *
 * The displayed rows are an anonymized reconstruction, per the brief:
 * tenant and operator names are replaced with neutral tokens (Site 4,
 * Site 5, in the extract's row order), the park is never named, no
 * address appears, resident entries never display, and monetary values
 * are specimen values altered from the record's. Region boxes are
 * percentages of public/images/demonstration/rent-roll-anonymized.png,
 * computed through the page's rotation when the visual was rendered.
 */

export type RegionKey = "date" | "row4" | "row5" | "totals"

export interface RegionBox {
  x: number
  y: number
  w: number
  h: number
}

export const RENT_ROLL_REGIONS: Record<RegionKey, RegionBox> = {
  date: { x: 8.26, y: 14.44, w: 10.93, h: 3.66 },
  row4: { x: 7.65, y: 38.13, w: 84.9, h: 5.68 },
  row5: { x: 7.6, y: 42.32, w: 84.9, h: 5.68 },
  totals: { x: 7.57, y: 75.99, w: 70.57, h: 5.43 },
}

export interface RentRollField {
  id: string
  field: string
  value: string
  document: string
  page: number
  place: string
  region: RegionKey
}

export const RENT_ROLL_FIELDS: RentRollField[] = [
  {
    id: "document-date",
    field: "Document date",
    value: "4/30/2026",
    document: "Rent roll",
    page: 1,
    place: "Head of page, date line",
    region: "date",
  },
  {
    id: "site-4-status",
    field: "Site 4 status",
    value: "RO - RV",
    document: "Rent roll",
    page: 1,
    place: "Row 4, status column",
    region: "row4",
  },
  {
    id: "site-4-rent",
    field: "Site 4 site rent",
    value: "$612.00",
    document: "Rent roll",
    page: 1,
    place: "Row 4, site rent column",
    region: "row4",
  },
  {
    id: "site-4-stay",
    field: "Site 4 length of stay",
    value: "MONTHLY",
    document: "Rent roll",
    page: 1,
    place: "Row 4, length of stay column",
    region: "row4",
  },
  {
    id: "site-5-status",
    field: "Site 5 status",
    value: "POH - Rental",
    document: "Rent roll",
    page: 1,
    place: "Row 5, status column",
    region: "row5",
  },
  {
    id: "site-5-rent",
    field: "Site 5 site rent",
    value: "$588.00",
    document: "Rent roll",
    page: 1,
    place: "Row 5, site rent column",
    region: "row5",
  },
  {
    id: "site-5-stay",
    field: "Site 5 length of stay",
    value: "DAILY",
    document: "Rent roll",
    page: 1,
    place: "Row 5, length of stay column",
    region: "row5",
  },
  {
    id: "totals-count",
    field: "Printed total, sites counted",
    value: "58",
    document: "Rent roll",
    page: 3,
    place: "Totals line, site count",
    region: "totals",
  },
  {
    id: "totals-rent",
    field: "Printed total, site rent",
    value: "$41,208.44",
    document: "Rent roll",
    page: 3,
    place: "Totals line, total site rent",
    region: "totals",
  },
]
