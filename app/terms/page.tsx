// Build trigger
import type { Metadata } from "next"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "Terms of Use | CrosstownOS",
  description:
    "Terms of use for the CrosstownOS website, including purchase terms for the Acquisition Workspace.",
  alternates: { canonical: "/terms" },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Terms of Use",
  description: "Terms of use for the CrosstownOS website.",
  url: "https://www.crosstownosrv.camp/terms",
  isPartOf: {
    "@type": "WebSite",
    name: "CrosstownOS",
    url: "https://www.crosstownosrv.camp",
  },
  publisher: {
    "@type": "Organization",
    name: "CrosstownOS",
    logo: {
      "@type": "ImageObject",
      url: "https://www.crosstownosrv.camp/logo.jpg",
    },
  },
}

const SECTIONS = [
  {
    heading: "Agreement",
    body: [
      "By accessing crosstownosrv.camp, using the free working papers, or purchasing the Acquisition Workspace, you agree to these Terms of Use. If you do not agree, do not use the site or the workspace.",
      "CrosstownOS is operated by Jeremy Cross, based in Kaufman, Texas. References to CrosstownOS, we, or us mean the operator of this site and the Acquisition Workspace.",
    ],
  },
  {
    heading: "What this site is",
    body: [
      "CrosstownOS operates this website to share information about diligence software for RV park and manufactured housing community buyers. The site includes articles, free browser-based working papers, a resource library, and purchase pages for the Acquisition Workspace, which opens November 2026.",
    ],
  },
  {
    heading: "Definitions",
    body: [
      "Site means crosstownosrv.camp and its pages, tools, and content. Workspace means the Acquisition Workspace software, including its Source, Field, and Acquire modules. Operator means the named person on a workspace account. Activation means the date we deliver your account credentials and onboarding materials.",
    ],
  },
  {
    heading: "No professional advice",
    body: [
      "Nothing on this site is legal, investment, tax, engineering, environmental, appraisal, title, lending, or insurance advice. Content here is educational. You are responsible for your own investment decisions and for engaging qualified professionals appropriate to your transaction.",
    ],
  },
  {
    heading: "No reliance",
    body: [
      "Site content is not a basis for reliance in any transaction. We work to keep information accurate, but we make no warranties about completeness or correctness.",
    ],
  },
  {
    heading: "Free working papers",
    body: [
      "The free working papers at crosstownosrv.camp/tools run entirely in your browser. Your inputs are saved to your browser's local storage on your own device. Nothing is transmitted to us. You can download your work as JSON at any time.",
    ],
  },
  {
    heading: "Accounts and credentials",
    body: [
      "Each workspace purchase includes one named operator account. You are responsible for keeping your credentials confidential and for all activity under your account. We are not responsible for activity resulting from credentials you shared or failed to protect. Tell us promptly if you suspect unauthorized use.",
    ],
  },
  {
    heading: "License and permitted use",
    body: [
      "Your purchase gives you a limited, non-exclusive, non-transferable license to use the workspace for the licensed property and term, for your own acquisition diligence. You may not resell, sublicense, rent, or share your account. You may not copy, modify, reverse engineer, or extract the software, its models, or its underlying code.",
    ],
  },
  {
    heading: "Your deal data",
    body: [
      "Everything you enter into the workspace remains yours: your documents, numbers, notes, and records. We do not sell it, do not use it in content or examples, and do not disclose it without your written permission except as required by law. We store it only to operate the workspace, and we delete it under the retention terms below.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "Do not misuse the site or the workspace. That includes attempting to disrupt operation, scraping aggressively, submitting false information through our forms, uploading unlawful content, or using the workspace for any purpose other than your own acquisition diligence.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "The site, the workspace, and their content, including articles, working papers, the ParkProof Standard, and the software itself, are owned by CrosstownOS and protected by intellectual property law. You may share links and quote brief excerpts with attribution. You may not republish substantial portions without permission.",
    ],
  },
  {
    heading: "Support",
    body: [
      "Every plan includes a recorded onboarding walkthrough, one 30-minute live software Q&A per account booked within the first 30 days, and email technical support with a two-business-day target response. Support covers software operation: navigation, inputs, documented calculations, and software behavior. It does not cover interpretation of your documents or numbers, your diligence conclusions, or what to do about a property.",
    ],
  },
  {
    heading: "Acquisition Workspace: what you are buying",
    body: [
      "Single-Deal Workspace, $1,250: one property and 90 calendar days of full access to Source, Field, and Acquire from activation. Includes a recorded onboarding walkthrough, one 30-minute live software Q&A booked within your first 30 days, email technical support with a two-business-day target response, and one named operator account.",
      "Annual Workspace, $2,500: everything in Single-Deal, for unlimited properties over 12 months from activation. Same onboarding: one walkthrough and one live Q&A per account. Additional properties do not add sessions.",
      "One property means one park or community acquisition, including associated parcels under the same transaction. Separate parks are separate properties, even under one buyer.",
      "This is software you operate. It does not include document review or interpretation of your numbers, confirmation of your diligence conclusions, or ongoing advisory. You build the record, the workflow guides you, and the decision stays yours.",
    ],
  },
  {
    heading: "Free Pilot Program",
    body: [
      "CrosstownOS offers a limited free pilot program for the Acquisition Workspace. Participation requires approval through our application process, including a fit call to confirm your acquisition qualifies. Approval reserves a place; it does not guarantee immediate access.",
      "If approved, your 90-day pilot term begins when we deliver access credentials and onboarding materials. The term runs for 90 consecutive calendar days.",
      "The pilot includes full access to Source, Field, and Acquire for one property acquisition. It includes a recorded onboarding walkthrough and one 30-minute software Q&A session per account.",
      "The pilot is free. No payment is required. No payment method is collected.",
      "Your pilot access ends automatically at the end of the 90-day term. Nothing is charged. Continued access requires a separate purchase at the then-current price. Pilot participation does not provide a credit toward paid access.",
      "You operate the software yourself. You supply all evidence, document your review, and make your own acquisition decisions. CrosstownOS provides software support, not deal analysis, document review, or investment advice.",
      "In exchange for free access, you agree to provide candid feedback about usability, errors, and confusing workflows. You are not required to provide a testimonial or favorable review.",
      "Any testimonial is optional. We will request your separate written permission before publishing any quote, result, or identifying information. If you received free pilot access, we will disclose that in any published testimonial.",
      "All other provisions of these Terms apply to pilot participants, including license scope, acceptable use, confidentiality, account security, and termination provisions.",
    ],
  },
  {
    heading: "Payment",
    body: [
      "Payment is due in full when you purchase, charged through the checkout on this site. Access begins when your credentials and onboarding materials are delivered. That delivery date is your activation date.",
      "Renewal is manual. CrosstownOS does not enroll accounts in automatic renewal and does not charge cards on file without a new, explicit purchase.",
    ],
  },
  {
    heading: "Refunds",
    body: [
      "Full refund within seven calendar days of activation. To request one, email jeremy@crosstownosrv.camp. Requesting a refund ends your access immediately.",
    ],
  },
  {
    heading: "Expiration, cancellation, and termination",
    body: [
      "Single-Deal access ends 90 calendar days from activation. Annual access runs 12 months from the annual activation date. Editing stops at expiration. You may export your records during the 30-day retention period after expiration. then. We keep your data for 30 days after expiration, then schedule deletion.",
      "If you abandon a deal, Single-Deal access does not transfer to another property. Moving from Single-Deal to Annual is a separate purchase at any time. There is no credit, prorating, or conversion discount.",
      "You can cancel by not renewing, or by telling us you are done. Refunds are only available within the seven-day window above.",
      "We may suspend or terminate access for misuse of the workspace or violation of these terms. Termination does not extend the refund window.",
    ],
  },
  {
    heading: "Warranty disclaimer",
    body: [
      "The site and the workspace are provided as is and as available, without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the service will be uninterrupted or error-free.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, CrosstownOS will not be liable for indirect, incidental, special, consequential, or punitive damages, including lost profits, lost data, or lost opportunities, even if advised of the possibility.",
      "Total liability for any claim arising from the site or the workspace is limited to the amount you paid for the workspace in the twelve months before the claim.",
    ],
  },
  {
    heading: "Indemnification",
    body: [
      "You agree to indemnify and hold harmless CrosstownOS against claims, damages, and expenses, including reasonable legal fees, arising from your use of the site or workspace, your deal data, or your violation of these terms.",
    ],
  },
  {
    heading: "Governing law and disputes",
    body: [
      "These terms are governed by the laws of the State of Texas. Disputes will be resolved in courts of competent jurisdiction in Texas. If any provision is found unenforceable, the remaining provisions continue in effect.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "We may update these terms. Material changes will be noted by updating the effective date below. Continued use of the site after changes constitutes acceptance.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Questions about these terms: jeremy@crosstownosrv.camp",
    ],
  },
  {
    heading: "Effective date",
    body: ["October 8, 2026."],
  },
]

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS / Terms of use</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Terms of Use
          </h1>

          {SECTIONS.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="font-serif text-lg font-bold tracking-tight text-foreground">
                {section.heading}
              </h2>
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-3 text-sm leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
        </div>
      </main>
    </>
  )
}
