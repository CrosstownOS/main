"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"

/**
 * Root template: page transition keyed on pathname.
 * The wrapper remounts on route change, replaying the pure-CSS enter
 * animation (220ms fade in + 12px rise, see .page-enter in app/globals.css).
 * prefers-reduced-motion disables it via the global rule.
 */
export default function Template({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  return (
    <div key={pathname} className="page-enter">
      {children}
    </div>
  )
}
