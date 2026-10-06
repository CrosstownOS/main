import type { Metadata } from "next"
import ScreenerTool from "./ScreenerTool"

const TITLE = "60-Second Deal Screener | CrosstownOS"
const DESCRIPTION =
  "Six numbers, one posture. If a deal cannot survive this page, it does not deserve a phone call."
const PATH = "/tools/60-second-screener"
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
      <ScreenerTool />
    </>
  )
}
