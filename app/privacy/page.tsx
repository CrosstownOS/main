import type { Metadata } from "next"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "Privacy Policy | CrosstownOS",
  description:
    "How CrosstownOS handles information you share with us.",
  alternates: { canonical: "/privacy" },
}

const SECTIONS = [
  {
    heading: "Who we are",
    body: [
      "CrosstownOS is operated by Jeremy Cross, based in Kaufman, Texas. This policy covers crosstownosrv.camp and the Acquisition Workspace. Contact for privacy questions: jeremy@crosstownosrv.camp.",
    ],
  },
  {
    heading: "What we collect",
    body: [
      "Identity and contact information: when you use our application form, book a fit call, or buy the workspace, we collect the information you provide, such as name, email, phone, company, and website.",
      "Deal context: asset type, deal stage, deadline, price range, deal description, and referral source, so we can assess fit and serve you.",
      "Newsletter subscriptions: when you subscribe to Crosstown Updates, we collect your email address.",
      "Workspace data: your account information, credentials activity, and everything you enter into the workspace, including documents, numbers, notes, and records. Your deal data remains yours at all times.",
      "Payment information: payments are processed by our checkout provider. We do not store your full card number.",
      "Technical data: browser type, pages visited, and approximate region, collected through privacy-friendly analytics to understand site usage. We do not use advertising pixels or cross-site tracking.",
    ],
  },
  {
    heading: "What we do not collect",
    body: [
      "The free working papers at crosstownosrv.camp/tools run entirely in your browser. Your inputs are stored in your browser's local storage on your own device. We do not receive, store, or have access to your working paper inputs.",
    ],
  },
  {
    heading: "Cookies and similar technologies",
    body: [
      "We use a minimal set. Session storage powers the site's loading-screen preference. Embedded scheduling (Cal.com) may set its own cookies to run the booking flow, governed by Cal.com's privacy policy, not this one. Our analytics are cookieless and do not track you across sites. We use no advertising cookies.",
    ],
  },
  {
    heading: "How we use what you share",
    body: [
      "Application form submissions: to review your fit for the Acquisition Workspace and to contact you about it.",
      "Newsletter subscriptions: to send you Crosstown Updates. Every email includes an unsubscribe link.",
      "Scheduling information: to arrange and conduct your fit call.",
      "Workspace data: solely to operate the workspace for you. Your deal data is never used in content, examples, or marketing, and never disclosed, without your written permission.",
      "We do not sell your information. We do not share it with third parties except the service providers needed to operate these functions, who are bound to use it only for that purpose.",
    ],
  },
  {
    heading: "Deal data confidentiality",
    body: [
      "Your deal documents, numbers, notes, and records are treated as confidential. Access is limited to what is necessary to operate the workspace, and anyone with access is bound to keep it confidential. We will not disclose your deal data without your written permission except as required by law, in which case we will notify you if the law permits.",
    ],
  },
  {
    heading: "Third-party providers",
    body: [
      "We rely on a small set of providers to operate the site and workspace: Vercel (hosting and analytics), Cal.com (scheduling), our email delivery provider (newsletters and workspace communications), and our checkout provider (payments). Each provider processes only the information needed for its function and is bound to use it only for that purpose.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "Workspace account data is kept for the life of your subscription. After expiration, we retain it for 30 days so you can export your records, then schedule deletion.",
      "Newsletter subscriptions are kept until you unsubscribe. Application and correspondence records are kept as long as needed to serve you and meet legal obligations.",
    ],
  },
  {
    heading: "Your rights",
    body: [
      "You may ask to access, correct, export, or delete the personal information we hold about you. Residents of the EU and UK have the rights granted by the GDPR, including erasure, portability, restriction, and objection. California residents have the rights granted by the CCPA, including the right to know what we collect and the right to deletion. We do not sell personal information.",
      "To exercise any of these rights, contact jeremy@crosstownosrv.camp. We will verify your identity before fulfilling requests.",
    ],
  },
  {
    heading: "Children",
    body: [
      "This site is not directed to children under 16, and we do not knowingly collect their information. If you believe a child has provided information, contact us and we will delete it.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We take reasonable technical and organizational steps to protect your information, including limiting access and using established infrastructure providers. No method of electronic transmission or storage is completely secure.",
    ],
  },
  {
    heading: "International transfers",
    body: [
      "Your information is processed in the United States. Our providers may process data in other locations under contractual safeguards. By using the site, you consent to that transfer.",
    ],
  },
  {
    heading: "Changes",
    body: [
      "We may update this policy. Material changes will be noted by updating the effective date below.",
    ],
  },
  {
    heading: "Contact",
    body: [
      "Privacy questions: jeremy@crosstownosrv.camp",
    ],
  },
  {
    heading: "Effective date",
    body: ["October 8, 2026."],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main id="main" className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS / Privacy policy</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Privacy Policy
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
