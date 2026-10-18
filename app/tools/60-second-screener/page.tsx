import type { Metadata } from "next"
import ScreenerTool from "./ScreenerTool"
import { FAQ_JSON_LD } from "@/lib/tools/faqs"

const TITLE = "60-Second Deal Screener | CrosstownOS"
const DESCRIPTION = "Screen an RV park or manufactured housing deal in about a minute. Six inputs, calculated outputs, and an evidence-readiness posture. Free working paper, runs in your browser."
const PATH = "/tools/60-second-screener"
const OG_IMAGE = "/og-logo.png"

export const metadata: Metadata = {
  keywords: ["RV park deal screener", "manufactured housing deal screening", "60-second screener", "deal screen", "CrosstownOS tools"],
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
  name: "60-Second Deal Screener",
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

export default function SixtySecondScreenerPage() {
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
      <ScreenerTool />
    </>
  )
}
