import type { Metadata } from "next"
import PohTohTool from "./PohTohTool"

export const metadata: Metadata = {
  title: "POH/TOH Split Valuation | CrosstownOS Working Papers",
  description:
    "Park-owned and tenant-owned homes are two businesses wearing one price tag. Value them separately.",
}

export default function Page() {
  return <PohTohTool />
}
