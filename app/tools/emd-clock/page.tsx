import type { Metadata } from "next"
import EmdClockTool from "./EmdClockTool"
import { FAQ_JSON_LD } from "@/lib/tools/faqs"

const TITLE = "EMD Clock and Gate Tracker | CrosstownOS"
const DESCRIPTION = "Track your RV park earnest money deposit against the diligence gates and contingency dates in your purchase agreement. Whether a deposit becomes non-refundable is set by that agreement and applicable law. Free tool."
const PATH = "/tools/emd-clock"
const OG_IMAGE = "/og-logo.png"

export const metadata: Metadata = {
  keywords: ["earnest money deposit tracker", "EMD clock", "diligence gates", "contingency dates", "RV park purchase agreement"],
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
  name: "EMD Clock and Gate Tracker",
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
      <EmdClockTool />
    </>
  )
}
