import { Resend } from 'resend'

/**
 * Resend audience IDs. Jeremy creates these at resend.com → Audiences and
 * pastes the IDs here. Until an ID is set, its form keeps working (emails
 * still send) but no contact is added — see addToAudience.
 */
export const AUDIENCE_IDS = {
  /** Gated PDF downloads on /resources and /resources/catalog */
  resources: 'REPLACE_WITH_RESOURCES_AUDIENCE_ID',
  /** "Request Design Partner Access" form */
  designPartners: 'REPLACE_WITH_DESIGN_PARTNERS_AUDIENCE_ID',
  /** "Request an Invitation" (Field Network / Founding Circle) form */
  fieldNetwork: 'REPLACE_WITH_FIELD_NETWORK_AUDIENCE_ID',
  /** Footer "Crosstown Updates" signup */
  updates: 'REPLACE_WITH_UPDATES_AUDIENCE_ID',
} as const

export type AudienceKey = keyof typeof AUDIENCE_IDS

function isConfigured(id: string): boolean {
  return !!id && !id.startsWith('REPLACE_WITH')
}

function splitName(fullName: string): { firstName?: string; lastName?: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return {}
  return {
    firstName: parts[0],
    ...(parts.length > 1 ? { lastName: parts.slice(1).join(' ') } : {}),
  }
}

export async function addToAudience(
  resend: Resend,
  audience: AudienceKey,
  email: string,
  fullName = '',
): Promise<boolean> {
  const audienceId = AUDIENCE_IDS[audience]
  if (!isConfigured(audienceId)) {
    console.error(`Resend audience not configured: ${audience}`)
    return false
  }
  const { error } = await resend.contacts.create({
    email: email.trim().toLowerCase(),
    audienceId,
    unsubscribed: false,
    ...splitName(fullName),
  })
  if (error) {
    console.error(`Resend contacts.create (${audience}) error:`, error)
    return false
  }
  return true
}
