import type { Metadata } from "next"
import UtilityTriageTool from "./UtilityTriageTool"

export const metadata: Metadata = {
  title: "Utility Capacity Risk Triage | CrosstownOS Working Papers",
  description:
    "Water, sewer, electric. The systems nobody underwrites until they become the emergency. The Arizona Rule, live.",
}

export default function Page() {
  return <UtilityTriageTool />
}
