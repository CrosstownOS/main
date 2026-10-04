import { Resend } from 'resend'

/**
 * Resend segment IDs. Created 2026-09-28 at resend.com/audience → Segments.
 * (Resend deprecated Audiences in 2026; Segments are the replacement.)
 * Free tier caps at 3 segments, so the relationship forms share one.
 */
export const SEGMENT_IDS = {
  /** Gated PDF downloads on /resources and /resources/catalog */
  acquisitionResources: '338f52bd-ea52-4425-b554-380d7023860c',
  /** Design Partner + Field Network + Referral Alliance forms */
  partners: '6722aef0-b6f4-4c43-a8bc-0fa48394b1bc',
  /** Footer "Crosstown Updates" signup */
  updates: 'e4b9c6b1-3131-4a54-b42f-fa9d0db7c23c',
} as const

export type SegmentKey = keyof typeof SEGMENT_IDS

function splitName(fullName: string): { firstName?: string; lastName?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return {}
  return {
    firstName: parts[0],
    ...(parts.length > 1 ? { lastName: parts.slice(1).join(' ') } : {}),
  }
}

/**
 * Best-effort: add the email to a Resend segment. Never throws.
 * Creates the contact with the segment attached; if the contact already
 * exists, ensures the segment membership instead.
 */
export async function addToSegment(
  resend: Resend,
  segment: SegmentKey,
  email: string,
  fullName = '',
): Promise<boolean> {
  const normalized = email.trim().toLowerCase()
  const segmentId = SEGMENT_IDS[segment]
  try {
    const { error } = await resend.contacts.create({
      email: normalized,
      unsubscribed: false,
      ...splitName(fullName),
      segments: [{ id: segmentId }],
    })
    if (error) {
      const { error: addError } = await resend.contacts.segments.add({
        email: normalized,
        segmentId,
      })
      if (addError) {
        console.error(`Resend segments.add (${segment}) error:`, addError)
        return false
      }
    }
    return true
  } catch (err) {
    console.error(`Resend addToSegment (${segment}) threw:`, err)
    return false
  }
}
