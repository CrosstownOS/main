"use client"

import { useState } from "react"
import type { Faq } from "@/lib/tools/faqs"
import { cn } from "@/lib/utils"

export default function FaqSection({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState<number | null>(null)

  if (!faqs.length) return null

  return (
    <section className="mt-10" aria-label="Frequently asked questions">
      <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
        Questions
      </p>
      <div className="mt-4 divide-y divide-border border-y border-border">
        {faqs.map((faq, i) => {
          const isOpen = open === i
          return (
            <div key={faq.question} className="py-1">
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${i}`}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              >
                <span className="text-base font-semibold text-foreground">
                  {faq.question}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "shrink-0 font-mono text-lg leading-none text-primary transition-transform",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
              <div
                id={`faq-answer-${i}`}
                hidden={!isOpen}
                className="pb-5"
              >
                <p className="max-w-3xl text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
