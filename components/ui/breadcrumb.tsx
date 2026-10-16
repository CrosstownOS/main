import { Fragment } from "react"
import Link from "next/link"

export type BreadcrumbItem = {
  label: string
  href?: string
}

// Visible breadcrumb trail. Markup and styling mirror the trails already
// rendered inline by the resource detail template and ToolShell, so every
// surface reads as one pattern: mono 9px uppercase, "/" separators, the
// current page in primary with aria-current.
export default function Breadcrumb({
  items,
  className,
}: {
  items: BreadcrumbItem[]
  className?: string
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[9px] uppercase tracking-[0.22em] text-muted">
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 ? <li aria-hidden="true">/</li> : null}
              {isCurrent || !item.href ? (
                <li aria-current="page" className="text-primary">
                  {item.label}
                </li>
              ) : (
                <li>
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              )}
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
