import type { Metadata } from "next"
import EmdClockTool from "./EmdClockTool"
import { FAQ_JSON_LD } from "@/lib/tools/faqs"

const TITLE = "EMD Clock and Gate Tracker | CrosstownOS"
const DESCRIPTION = "Your earnest money, on a clock. Dates move. Gates do not."
const PATH = "/tools/emd-clock"
const OG_IMAGE = "/images/opengraph.jpg?v=2"

export const metadata: Metadata = {
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
