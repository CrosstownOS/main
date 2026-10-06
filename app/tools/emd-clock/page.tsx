import type { Metadata } from "next"
import EmdClockTool from "./EmdClockTool"

export const metadata: Metadata = {
  title: "EMD Clock and Gate Tracker | CrosstownOS Working Papers",
  description: "Your earnest money, on a clock. Dates move. Gates do not.",
}

export default function Page() {
  return <EmdClockTool />
}
