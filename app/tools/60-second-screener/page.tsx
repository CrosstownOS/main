import type { Metadata } from "next"
import ScreenerTool from "./ScreenerTool"

export const metadata: Metadata = {
  title: "60-Second Deal Screener | CrosstownOS Working Papers",
  description:
    "Six numbers, one posture. If a deal cannot survive this page, it does not deserve a phone call.",
}

export default function SixtySecondScreenerPage() {
  return <ScreenerTool />
}
