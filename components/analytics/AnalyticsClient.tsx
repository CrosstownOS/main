"use client"
import { Analytics } from "@vercel/analytics/next"
export default function AnalyticsClient() {
  if (process.env.NODE_ENV !== "production") return null
  return <Analytics />
}
