import type { Metadata } from "next"
import RentRollTool from "./RentRollTool"
import { FAQ_JSON_LD } from "@/lib/tools/faqs"

const TITLE = "Rent-Roll Truth Check | CrosstownOS"
const DESCRIPTION = "Compare reported occupancy to occupancy derived from the bank deposit totals and rent rows you enter, and flag rows over 60 days overdue. Free working paper included."
const PATH = "/tools/rent-roll-truth-check"
const OG_IMAGE = "/og-logo.png"

export const metadata: Metadata = {
  keywords: ["rent roll truth check", "reported occupancy", "bank deposit totals", "rent roll verification", "CrosstownOS tools"],
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
    siteName: "CrosstownOS",
    images: [{ url: OG_IMAGE, width: 1024, height: 1024, alt: TITLE }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rent-Roll Truth Check",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: DESCRIPTION,
  url: `https://www.crosstownosrv.camp${PATH}`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isPartOf: {
    "@type": "ItemList",
    name: "Live Diligence Working Papers",
    url: "https://www.crosstownosrv.camp/tools",
  },
}

export default function RentRollTruthCheckPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD[PATH]) }}
      />
      <RentRollTool />
    </>
  )
}
