import type { Metadata } from "next"
import RentRollTool from "./RentRollTool"

export const metadata: Metadata = {
  title: "Rent-Roll Truth Check | CrosstownOS Working Papers",
  description:
    "Rebuild reported occupancy from deposits. The rent roll is a claim. Deposits are the verification.",
}

export default function RentRollTruthCheckPage() {
  return <RentRollTool />
}
