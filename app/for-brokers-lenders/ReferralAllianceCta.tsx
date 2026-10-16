"use client"

import Chapter5 from "@/components/chapters/chapter5"
import { OPEN_REFERRAL_NETWORK_EVENT } from "@/components/zone1/PlatformLinks"

export default function ReferralAllianceCta() {
  const openReferralAlliance = () => {
    window.dispatchEvent(
      new CustomEvent(OPEN_REFERRAL_NETWORK_EVENT, {
        detail: { source: "for-brokers-lenders" },
      }),
    )
  }

  return (
    <>
      <button
        type="button"
        onClick={openReferralAlliance}
        aria-haspopup="dialog"
        className="mx-auto block w-fit border border-primary/60 bg-primary-deep px-5 py-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-primary-deep/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        Start a Partner Conversation
      </button>
      <Chapter5 />
    </>
  )
}
