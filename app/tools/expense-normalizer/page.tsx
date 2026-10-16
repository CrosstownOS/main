import type { Metadata } from "next"
import ExpenseNormalizerTool from "./ExpenseNormalizerTool"
import { FAQ_JSON_LD } from "@/lib/tools/faqs"

const TITLE = "Expense Normalizer | CrosstownOS"
const DESCRIPTION = "Restate a seller's P&L with your own expense lines and stated assumptions, and compare the normalized NOI to the seller's stated NOI. Free working paper, runs in your browser."
const PATH = "/tools/expense-normalizer"
const OG_IMAGE = "/og-logo.png"

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
  name: "Expense Normalizer",
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

export default function ExpenseNormalizerPage() {
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
      <ExpenseNormalizerTool />
    </>
  )
}
