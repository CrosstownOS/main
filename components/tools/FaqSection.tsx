"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import type { Faq } from "@/lib/tools/faqs"
import { cn } from "@/lib/utils"
import { SPRING } from "@/components/ui/motion"

/**
 * FAQ accordion, rebuilt from the accordion-solutions specimen in house
 * dress: the answer does not snap in under a hidden flag; the row
 * springs open on the same spring as the site's sheets and stacks, and
 * the plus mark rotates into a close mark. One answer open at a time.
 */
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
                    "shrink-0 font-mono text-lg leading-none text-primary transition-transform duration-300",
                    isOpen && "rotate-45",
                  )}
                >
                  +
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen ? (
                  <motion.div
                    key="answer"
                    id={`faq-answer-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={SPRING}
                    className="overflow-hidden"
                  >
                    <p className="max-w-3xl pb-5 text-sm leading-relaxed text-muted">
                      {faq.answer}
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </section>
  )
}
