import type { Metadata } from "next"

// SKELETON ONLY. Every section below is an [ATTORNEY TEXT] slot. Do not link
// this page from the footer, the forms, or the sitemap, and do not remove the
// noindex metadata, until an attorney has written and approved the text and
// Jeremy signs off on going live.

export const metadata: Metadata = {
  title: "Privacy Policy | CrosstownOS",
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacy" },
}

const SLOTS = [
  {
    heading: "Data we collect",
    slot: "[ATTORNEY TEXT: name, email, phone, company, and deal details submitted through site forms]",
  },
  {
    heading: "How we use it",
    slot: "[ATTORNEY TEXT: purposes for collecting and using submitted information]",
  },
  {
    heading: "Service providers",
    slot: "[ATTORNEY TEXT: processor disclosure, including the email delivery provider]",
  },
  {
    heading: "How long we keep it",
    slot: "[ATTORNEY TEXT: retention periods for submissions and correspondence]",
  },
  {
    heading: "Your requests",
    slot: "[ATTORNEY TEXT: how to request access to, correction of, or deletion of your information]",
  },
  {
    heading: "Contact",
    slot: "[ATTORNEY TEXT: contact method for privacy questions]",
  },
  {
    heading: "Governing law",
    slot: "[ATTORNEY TEXT: governing law for this policy]",
  },
  {
    heading: "Effective date",
    slot: "[ATTORNEY TEXT: effective date of this policy]",
  },
] as const

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen w-full bg-background text-foreground">
      <div className="mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
        <p className="mono-label mb-4">Draft. Awaiting attorney text.</p>
        <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
          Privacy Policy
        </h1>

        {SLOTS.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="font-sans text-lg font-bold tracking-tight text-foreground">
              {section.heading}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              {section.slot}
            </p>
          </section>
        ))}
      </div>
    </main>
  )
}
