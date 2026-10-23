import type { Metadata } from "next"
import Link from "next/link"
import Navigation from "@/components/ui/navigation"
import Breadcrumb from "@/components/ui/breadcrumb"
import PageBackdrop from "@/components/PageBackdrop"
import SignalLine from "@/components/ui/SignalLine"
import { PageViewTracker } from "@/components/analytics/Trackers"
import { FAQ_JSON_LD, PRICING_FAQS } from "@/lib/tools/faqs"
import FaqSection from "@/components/tools/FaqSection"

export const metadata: Metadata = {
 keywords: ["RV park software pricing", "mobile home park software pricing", "due diligence software pricing", "acquisition workspace pricing"],
 title: "Pricing | CrosstownOS",
 description:
  "Public pricing for the CrosstownOS Acquisition Workspace: $299 monthly, $1,299 single-deal, $2,999 annual, and five free pilot places. The same for everyone.",
 alternates: { canonical: "/pricing" },
 openGraph: {
  title: "CrosstownOS Pricing",
  description:
   "Rent the workspace by the period, the deal, or the year. Public pricing, the same for everyone.",
  type: "website",
  url: "/pricing",
  images: [{ url: "/og-logo.png", width: 1024, height: 1024, alt: "CrosstownOS Pricing" }],
 },
 twitter: {
  card: "summary_large_image",
  title: "CrosstownOS Pricing",
  description: "Public pricing, the same for everyone.",
  images: ["/og-logo.png"],
 },
}

const PRICING_JSON_LD = {
 "@context": "https://schema.org",
 "@type": "Product",
 name: "CrosstownOS Acquisition Workspace",
 description:
  "Run your RV park or manufactured housing acquisition inside the CrosstownOS Acquisition Workspace. Source, Field, and Acquire connect your evidence into a ParkProof decision file. You operate it.",
 url: "https://www.crosstownosrv.camp/pricing",
 brand: { "@type": "Brand", name: "CrosstownOS" },
 offers: [
  {
   "@type": "Offer",
   name: "Monthly Workspace",
   description: "The full workspace for one purchased 30-day period. Each additional period is a separate manual purchase.",
   url: "https://www.crosstownosrv.camp/pricing#plans",
   price: "299",
   priceCurrency: "USD",
   availability: "https://schema.org/PreOrder",
  },
  {
   "@type": "Offer",
   name: "Single-Deal Workspace",
   description: "One property. 180 days. The full workspace, including ParkProof generation for the property.",
   url: "https://www.crosstownosrv.camp/pricing#plans",
   price: "1299",
   priceCurrency: "USD",
   availability: "https://schema.org/PreOrder",
  },
  {
   "@type": "Offer",
   name: "Annual Workspace",
   description: "Unlimited properties. 12 months.",
   url: "https://www.crosstownosrv.camp/pricing#plans",
   price: "2999",
   priceCurrency: "USD",
   availability: "https://schema.org/PreOrder",
  },
 ],
} as const

const PRICING_BREADCRUMB_JSON_LD = {
 "@context": "https://schema.org",
 "@type": "BreadcrumbList",
 itemListElement: [
  {
   "@type": "ListItem",
   position: 1,
   name: "Home",
   item: "https://www.crosstownosrv.camp/",
  },
  {
   "@type": "ListItem",
   position: 2,
   name: "Pricing",
   item: "https://www.crosstownosrv.camp/pricing",
  },
 ],
} as const

const PLANS = [
 {
  name: "Monthly Workspace",
  price: "$299",
  per: "per 30 days",
  body: "The full workspace for one 30-day period. Work unlimited properties while the period is active. Each additional period is a separate manual purchase; your records stay readable and downloadable.",
 },
 {
  name: "Single-Deal Workspace",
  price: "$1,299",
  per: "one property, 180 days",
  body: "One property and 180 days of full access to Source, Field, and Acquire. Includes ParkProof generation for the property, the recorded onboarding walkthrough, one 30-minute live software Q&A booked within your first 30 days, email support, and one named operator account.",
 },
 {
  name: "Annual Workspace",
  price: "$2,999",
  per: "12 months",
  body: "Everything in Single-Deal, for unlimited properties over 12 months. Stop rebuilding the record every time you look at a deal.",
 },
] as const

const INCLUDED = [
 "Full access to Source, Field, and Acquire.",
 "ParkProof generation for each property you work.",
 "Recorded onboarding walkthrough.",
 "One 30-minute live software Q&A per purchase (on Annual, per annual purchase or renewal; on Monthly, once, at your first activation), booked within 30 days of activation.",
 "Email technical support. Target response within two business days.",
 "One named operator account.",
] as const

export default function PricingPage() {
 return (
  <>
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_JSON_LD) }}
   />
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD["/pricing"]) }}
   />
   <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(PRICING_BREADCRUMB_JSON_LD) }}
   />
   <Navigation />
   <PageViewTracker event="pricing_view" />
   <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
    <PageBackdrop />
    <div className="relative z-10 mx-auto w-full max-w-5xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
     <Breadcrumb
      className="mb-6"
      items={[{ label: "Home", href: "/" }, { label: "Pricing" }]}
     />
     <div className="max-w-3xl">
      <SignalLine />
      <h1 className="serif-display mt-4 text-4xl tracking-tight sm:text-5xl">
       Pricing, on the record.
      </h1>
     </div>

     {/* Pilot */}
     <section aria-labelledby="pricing-pilot" className="mt-16">
      <div className="theme-cream border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] bg-card p-6 sm:p-10 text-center">
       <h2 id="pricing-pilot" className="serif-display text-2xl tracking-tight sm:text-3xl">
        Start free: five pilot places.
       </h2>
       <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-foreground/90">
        Five qualified buyers get the full workspace free for 90 days on
        one live acquisition. No payment required, no payment method
        collected, and no automatic conversion when the term ends.
       </p>
       <a
        href="/workspace#apply"
        className="mt-6 inline-block border border-primary/60 bg-primary-deep px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
       >
        Apply for a free pilot place
       </a>
      </div>
     </section>

     {/* Plans */}
     <section id="plans" aria-labelledby="pricing-plans" className="mt-20 scroll-mt-24">
      <SignalLine className="mx-auto" />
      <h2 id="pricing-plans" className="serif-display mt-4 text-center text-3xl tracking-tight sm:text-4xl">
       The workspace, three ways in.
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
       {PLANS.map((plan) => (
        <div key={plan.name} className="theme-cream flex flex-col items-center border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] bg-card p-6 text-center">
         <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
          {plan.name}
         </h3>
         <p className="mt-4">
          <span className="serif-display text-4xl tracking-tight text-[#00468B]" style={{ textShadow: "0 0 16px rgba(0, 70, 139, 0.45), 0 0 44px rgba(0, 70, 139, 0.22)" }}>{plan.price}</span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
           {plan.per}
          </span>
         </p>
         <p className="mt-4 text-sm leading-relaxed text-foreground/85">{plan.body}</p>
         <div className="mt-auto pt-6">
          <a
           href="/workspace#apply"
           className="inline-block border border-primary/60 bg-primary-deep px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
           Apply for a free pilot place
          </a>
         </div>
        </div>
       ))}
      </div>
      <div className="theme-cream mt-8 border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] bg-card p-6 text-center sm:p-8">
       <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
        The three doors, side by side.
       </h3>
       <div className="mx-auto mt-4 max-w-2xl space-y-3 text-sm leading-relaxed text-foreground/85">
        <p>
         <span className="font-semibold text-foreground">Monthly:</span> $299 per
         30-day period. Unlimited concurrent properties. Manual purchase of each
         additional period.
        </p>
        <p>
         <span className="font-semibold text-foreground">Single-Deal:</span>{" "}
         $1,299 for one property over 180 consecutive calendar days. One
         purchase for the fixed term.
        </p>
        <p>
         <span className="font-semibold text-foreground">Annual:</span> $2,999
         for unlimited properties over 12 months from activation. One purchase
         for the annual term.
        </p>
        <p>
         All workspace plans include ParkProof under the adopted per-property
         entitlement and versioning rules.
        </p>
       </div>
      </div>
      <div className="theme-cream mt-4 border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] bg-card p-6 sm:p-8 text-center">
       <h3 className="font-sans text-base font-bold tracking-tight text-foreground">
        Every workspace plan includes
       </h3>
       <ul className="mx-auto mt-4 grid w-fit gap-3 text-left sm:grid-cols-2">
        {INCLUDED.map((item) => (
         <li key={item} className="flex gap-3 text-sm leading-relaxed text-foreground/85">
          <span className="mt-2 h-1.5 w-1.5 flex-none bg-primary" aria-hidden="true" />
          <span>{item}</span>
         </li>
        ))}
       </ul>
       <Link
        href="/terms"
        className="mt-6 inline-block text-sm text-primary underline underline-offset-2 transition-colors hover:text-foreground hover:no-underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
       >
        Read the full Terms of Use
       </Link>
      </div>
     </section>

     {/* Questions */}
     <div className="mt-20">
      <FaqSection faqs={PRICING_FAQS} />
     </div>

     {/* The close */}
     <section aria-labelledby="pricing-next-step" className="mt-20">
      <SignalLine className="mx-auto" />
      <div className="theme-cream mt-10 border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_24px_2px_rgba(58,134,242,0.30),0_0_72px_10px_rgba(58,134,242,0.16)] bg-card p-6 sm:p-10 text-center">
       <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
        The next step
       </p>
       <h3 id="pricing-next-step" className="serif-display mt-3 text-2xl tracking-tight text-foreground sm:text-3xl">
        Come see what it does.
       </h3>
       <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <Link
         href="/workspace"
         className="inline-block border border-primary/60 bg-primary-deep px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
         See the Workspace
        </Link>
        <a
         href="/workspace#apply"
         className="inline-block border border-[#3a86f2] shadow-[0_0_0_1px_rgba(58,134,242,0.45),0_0_14px_1px_rgba(58,134,242,0.18)] px-6 py-3.5 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
         Apply for a free pilot place
        </a>
       </div>
      </div>
     </section>
    </div>
   </main>
  </>
 )
}
