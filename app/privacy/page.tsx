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
    heading: "What we collect",
    body: [
      "When you use our application form, we collect the information you provide: name, email, phone, company, website, asset type, deal stage, deadline, price range, deal description, and referral source.",
      "When you subscribe to Crosstown Updates, we collect your email address.",
      "When you book a fit call, our scheduling provider (Cal.com) collects the information you enter to arrange the meeting.",
    ],
  },
  {
    heading: "What we do not collect",
    body: [
      "The free working papers at crosstownosrv.camp/tools run entirely in your browser. Your inputs are stored in your browser's local storage on your own device. We do not receive, store, or have access to your working paper inputs.",
      "We do not use analytics, advertising pixels, or cross-site tracking on this site.",
    ],
  },
  {
    heading: "How we use what you share",
    body: [
      "Application form submissions: to review your fit for the Acquisition Workspace and to contact you about it.",
      "Newsletter subscriptions: to send you Crosstown Updates. Every email includes an unsubscribe link.",
      "Scheduling information: to arrange and conduct your fit call.",
      "We do not sell your information. We do not share it with third parties except the service providers needed to operate these functions (email delivery, scheduling), who are bound to use it only for that purpose.",
    ],
  },
  {
    heading: "How long we keep it",
    body: [
      "We keep application and correspondence records for as long as needed to serve you and meet legal obligations. Newsletter subscriptions are kept until you unsubscribe.",
    ],
  },
  {
    heading: "Your requests",
    body: [
      "To access, correct, or delete the personal information we hold about you, or to unsubscribe from emails, contact jeremy@crosstownosrv.camp. We will verify your identity before fulfilling requests.",
    ],
  },
  {
    heading: "Security",
    body: [
      "We take reasonable steps to protect your information. No method of electronic transmission or storage is completely secure.",
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
    body: ["October 7, 2026."],
  },
]

export default function PrivacyPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS / Privacy policy</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Privacy Policy
          </h1>

          {SECTIONS.map((section) => (
            <section key={section.heading} className="mt-12">
              <h2 className="font-sans text-lg font-bold tracking-tight text-foreground">
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
