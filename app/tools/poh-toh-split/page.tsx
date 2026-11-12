import type { Metadata } from "next"
import PohTohTool from "./PohTohTool"
import { FAQ_JSON_LD } from "@/lib/tools/faqs"

const TITLE = "POH/TOH Split Valuation | Evidens"
const DESCRIPTION = "Split park-owned and tenant-owned home values in any manufactured housing deal. Two businesses wearing one price tag. Value them separately with this tool."
const PATH = "/tools/poh-toh-split"
const OG_IMAGE = "/og-image.jpg"

export const metadata: Metadata = {
  keywords: ["POH TOH split", "park-owned homes", "tenant-owned homes", "manufactured housing valuation", "Evidens tools"],
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: PATH },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: "website",
    url: PATH,
    siteName: "Evidens",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
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
  name: "POH/TOH Split Valuation",
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  description: DESCRIPTION,
  url: `https://www.getevidens.com${PATH}`,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  isPartOf: {
    "@type": "ItemList",
    name: "Live Diligence Working Papers",
    url: "https://www.getevidens.com/tools",
  },
}

export default function Page() {
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
      <PohTohTool />
    </>
  )
}
