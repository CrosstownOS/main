import type { Metadata } from "next"
import Navigation from "@/components/ui/navigation"
import PageBackdrop from "@/components/PageBackdrop"

export const metadata: Metadata = {
  title: "Terms of Use | CrosstownOS",
  description:
    "Terms of use for the CrosstownOS website.",
  alternates: { canonical: "/terms" },
}

const SECTIONS = [
  {
    heading: "What this site is",
    body: [
      "CrosstownOS operates this website to share information about diligence software for RV park and manufactured housing community buyers. The site includes articles, free browser-based working papers, and an application form for the forthcoming Acquisition Workspace.",
      "No product is currently available for purchase through this site. No accounts are created through this site.",
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
    heading: "Acceptable use",
    body: [
      "Do not misuse this site. Do not attempt to disrupt its operation, scrape it aggressively, or submit false information through our forms.",
    ],
  },
  {
    heading: "Intellectual property",
    body: [
      "Site content, including articles, working papers, and the ParkProof Standard, is owned by CrosstownOS. You may share links and quote brief excerpts with attribution. You may not republish substantial portions without permission.",
    ],
  },
  {
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, CrosstownOS is not liable for any damages arising from your use of this site.",
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
    body: ["October 7, 2026."],
  },
]

export default function TermsPage() {
  return (
    <>
      <Navigation />
      <main className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
        <PageBackdrop />
        <div className="relative z-10 mx-auto w-full max-w-3xl px-4 pb-24 pt-28 sm:px-6 sm:pt-32 lg:px-8">
          <p className="mono-label mb-4">CrosstownOS / Terms of use</p>
          <h1 className="serif-display text-4xl tracking-tight sm:text-5xl">
            Terms of Use
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
