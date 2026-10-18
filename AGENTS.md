# AGENTS.md — CrosstownOS marketing site (staged 2026-10-18, uncommitted)

Muse Code reads this file as project rules when it runs in this directory.
This file is STAGED: it sits in the working tree so a headless session opened
here wakes up with the site's rules. It has not been committed. Whether it is
ever committed is Jeremy's call.

## What this repo is

The CrosstownOS marketing site: Next.js, `app/` routes, deployed on Vercel
from `master` of CrosstownOS/main. This is the MARKETING site. It is not the
product (the OS lives in CrosstownOS/os) and the two never gate each other.

## Standing state

- The site is CLOSED to changes except at Jeremy's explicit order: the next
  Field Note, a Trail Log update, the official launch, or a defect he orders
  fixed. A session here does not invent work.
- Master tip at staging time: `33f35aa` (2026-10-18).

## Rules that bite

- **Verify in the render.** A page is not verified by its markup, classes, or
  copy. It is verified in the live rendered page, at the width the reader
  uses. Report only what was executed and observed.
- **No copy changes without Jeremy's approval of the exact words.** Layout,
  styling, and code fixes inside an approved scope are build work; words are
  his.
- **No em dashes (U+2014)** in any site copy or user-facing text.
- **Claims discipline.** Every claim on a page must trace to the claims
  ledger (`docs/claims-ledger.md`). Benchmarks without an honest source are
  labeled working assumptions or removed. See
  `docs/content-production-protocol.md`.
- **Fixed reference points:** the /checklist page is never renamed; Field
  Notes count is nine; pricing stays public; the Source card copy on
  /workspace is correct as written and is not an overclaim.
- **Git pushes go through the GitHub API recipe** (this VM has no git push
  credentials). Full 40-character SHAs, raw commit message bytes, original
  timezone offset on rebuilds. Git identity: jeremy2576
  <jeremy@crosstownosrv.camp>, never an assistant identity.
- **Never touch the sealed repo** jeremy2576/crosstown-os.

## Commands

```bash
pnpm build   # must pass before any push
```
