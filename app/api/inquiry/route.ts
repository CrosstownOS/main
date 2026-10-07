import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { addToSegment, type SegmentKey } from '@/lib/resend-segments'
import {
  STANDARD_EMAIL_BLOCK,
  TRAIL_LOG_EMAIL_BLOCK,
  WALKTHROUGH_EMAIL_BLOCK,
  renderEmailBlocksHtml,
  renderEmailBlocksText,
  type EmailDestinationBlock,
} from '@/lib/email-template'

export const runtime = 'nodejs'

const FROM_ADDRESS = 'Crosstown <jeremy@crosstownosrv.camp>'
const INTERNAL_RECIPIENT = 'jeremy@crosstownosrv.camp'
const LOGO_URL = 'https://www.crosstownosrv.camp/logo.jpg'
const SITE_URL = 'https://www.crosstownosrv.camp'
const MAX_BODY_SIZE = 25_000
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const HONEYPOT_FIELDS = ['companyWebsite', 'website', 'url', 'faxNumber']

type EmailPalette = {
  background: string
  card: string
  foreground: string
  muted: string
  border: string
  primary: string
  accent: string
  success: string
}

// Internal ops console — dark field, lit royal signal (#3A86F2 from the logo arcs)
const EMAIL_COLORS_DARK: EmailPalette = {
  background: '#12110e',
  card: '#1c1a16',
  foreground: '#eee9df',
  muted: '#a29b8e',
  border: '#3a352b',
  primary: '#3a86f2',
  accent: '#a66a35',
  success: '#4d7658',
}

// Client confirmation — the white record. Mirrors the site's .theme-snow tokens,
// with the deep arc royal (#0B589B) that reads on white.
const EMAIL_COLORS_LIGHT: EmailPalette = {
  background: '#f8f7f4',
  card: '#fefdfc',
  foreground: '#261d15',
  muted: '#62594f',
  border: '#d7d4ce',
  primary: '#0b589b',
  accent: '#a66a35',
  success: '#4d7658',
}

type FormType =
  | 'deal_desk'
  | 'design_partner'
  | 'founding_circle'
  | 'referral_network'
  | 'trail_log'
  | 'not_sure'
  | 'outpost'
  | 'basecamp'
type SubmissionData = Record<string, string>

type FieldDefinition = {
  key: string
  label: string
  required?: boolean
  multiline?: boolean
  maxLength?: number
}

type FormConfig = {
  type: FormType
  routingTag: string
  title: string
  badge: string
  sourceForm: string
  successMessage: string
  failureMessage: string
  confirmationSubject: string
  confirmationTitle: string
  confirmationBlocks: EmailDestinationBlock[]
  confirmationIntroLine?: string
  fields: FieldDefinition[]
  subject: (data: SubmissionData) => string
  subtitle: (data: SubmissionData) => string
}

const DEAL_DESK_FIT_CALL_BLOCK: EmailDestinationBlock = {
  eyebrow: 'NEXT STEP',
  title: 'Book a workspace fit call',
  description: 'Put time on the deal instead of waiting for a reply to land.',
  href: 'https://cal.com/crosstownos/deal-desk-fit-call',
  buttonLabel: 'Book a fit call',
}

const DESIGN_PARTNER_FIT_REVIEW_BLOCK: EmailDestinationBlock = {
  eyebrow: 'NEXT STEP',
  title: 'Book a Design Partner fit review',
  description:
    'Talk through fit, workflow, and the secure document-sharing process.',
  href: 'https://cal.com/crosstownos/design-partner-fit-review',
  buttonLabel: 'Book a fit review',
}

const LIVE_DEAL_BLOCK: EmailDestinationBlock = {
  eyebrow: 'THE DEAL DESK',
  title: 'Bring a live deal',
  description:
    'For buyers with a live or imminent deal and a decision deadline.',
  href: `${SITE_URL}/deal-desk`,
  buttonLabel: 'Bring a live deal',
}

const BROKERS_AND_LENDERS_REFERRAL_BLOCK: EmailDestinationBlock = {
  eyebrow: 'FOR BROKERS AND LENDERS',
  title: 'Know what your buyer is bringing to the table',
  description:
    'One record. Claims with sources and states. Unresolved gates listed instead of buried.',
  href: `${SITE_URL}/for-brokers-lenders`,
  buttonLabel: 'Open the page',
}

const REFERRAL_ALLIANCE_INTRO_BLOCK: EmailDestinationBlock = {
  eyebrow: 'NEXT STEP',
  title: 'Book a Referral Alliance intro call',
  description:
    'Start the standing partner conversation with a time on the calendar.',
  href: 'https://cal.com/crosstownos/referral-alliance-intro',
  buttonLabel: 'Book an intro call',
}

const FIELD_NETWORK_BLOCK: EmailDestinationBlock = {
  eyebrow: 'FIELD NETWORK',
  title: 'Join the Field Network',
  description:
    'Early updates, a voice in what gets built, and first word when the next Deal Desk window opens.',
  href: `${SITE_URL}/#paths`,
  buttonLabel: 'Join the Field Network',
}

const BROKERS_AND_LENDERS_CONVERSATION_BLOCK: EmailDestinationBlock = {
  eyebrow: 'FOR BROKERS AND LENDERS',
  title: 'Start a partner conversation',
  description:
    'For brokers, lenders, operators, and advisers who know the assets and the people.',
  href: `${SITE_URL}/for-brokers-lenders`,
  buttonLabel: 'Start a conversation',
}

const FORM_CONFIG: Record<FormType, FormConfig> = {
  deal_desk: {
    type: 'deal_desk',
    routingTag: 'FOUNDING_DEAL_DESK',
    title: 'New Acquisition Workspace Application',
    badge: 'Acquisition Workspace',
    sourceForm: 'Acquisition Workspace application form',
    successMessage:
      'Received. Expect a reply within two business days.',
    failureMessage:
      'We could not submit your application. Please try again or contact Crosstown directly.',
    confirmationSubject: 'We Received Your Workspace Application: Crosstown',
    confirmationTitle: 'Workspace application received.',
    confirmationBlocks: [
      WALKTHROUGH_EMAIL_BLOCK,
      STANDARD_EMAIL_BLOCK,
      DEAL_DESK_FIT_CALL_BLOCK,
    ],
    fields: [
      { key: 'name', label: 'Name', required: true, maxLength: 160 },
      { key: 'email', label: 'Email', required: true, maxLength: 254 },
      { key: 'phone', label: 'Phone', maxLength: 80 },
      { key: 'company', label: 'Shop or company', maxLength: 180 },
      { key: 'assetType', label: 'Asset type', required: true, maxLength: 80 },
      { key: 'dealStage', label: 'Deal stage', required: true, maxLength: 120 },
      { key: 'decisionDeadline', label: 'Decision deadline', required: true, maxLength: 80 },
      { key: 'purchasePriceRange', label: 'Purchase price range', maxLength: 160 },
      {
        key: 'dealDescription',
        label: 'Deal description',
        required: true,
        multiline: true,
        maxLength: 2000,
      },
      {
        key: 'keepsUpAtNight',
        label: 'What keeps you up at night about this deal',
        multiline: true,
        maxLength: 2000,
      },
      { key: 'howDidYouHear', label: 'How did you hear about CrosstownOS', maxLength: 200 },
    ],
    subject: (data) =>
      `New Acquisition Workspace Application: ${data.company || data.name}`,
    subtitle: (data) =>
      `${data.name} applied for the Acquisition Workspace.`,
  },
  design_partner: {
    type: 'design_partner',
    routingTag: 'PARKPROOF_DESIGN_PARTNER',
    title: 'New ParkProof Design-Partner Request',
    badge: 'Design Partner',
    sourceForm: 'Design Partner access form',
    successMessage:
      'Thank you. Crosstown reviews each request personally. If there is a fit, we will follow up to discuss the opportunity, workflow, and secure document-sharing process.',
    failureMessage:
      'We could not submit your design-partner request. Please try again or contact Crosstown directly.',
    confirmationSubject: 'We Received Your Design Partner Request: Crosstown',
    confirmationTitle: 'Design Partner request received.',
    confirmationBlocks: [
      DESIGN_PARTNER_FIT_REVIEW_BLOCK,
      WALKTHROUGH_EMAIL_BLOCK,
      STANDARD_EMAIL_BLOCK,
    ],
    fields: [
      { key: 'name', label: 'Name', required: true, maxLength: 160 },
      { key: 'company', label: 'Company', required: true, maxLength: 180 },
      { key: 'role', label: 'Role', required: true, maxLength: 160 },
      { key: 'email', label: 'Business email', required: true, maxLength: 254 },
      { key: 'phone', label: 'Phone', maxLength: 80 },
      { key: 'linkedInUrl', label: 'LinkedIn URL', maxLength: 500 },
      { key: 'primaryFocus', label: 'Primary focus', required: true, maxLength: 120 },
      {
        key: 'acquisitionsReviewedAnnually',
        label: 'Approximate acquisitions reviewed annually',
        required: true,
        maxLength: 120,
      },
      { key: 'liveDealWithin90Days', label: 'Live deal within 90 days', required: true, maxLength: 80 },
      {
        key: 'shareBrokerPackage',
        label: 'Open to sharing a broker package after fit review',
        required: true,
        maxLength: 80,
      },
      { key: 'howDidYouHear', label: 'How did you hear about us', maxLength: 200 },
      {
        key: 'diligencePain',
        label: 'Biggest diligence pain today',
        required: true,
        multiline: true,
        maxLength: 2000,
      },
    ],
    subject: (data) =>
      `New ParkProof Design-Partner Request: ${data.company || data.name}`,
    subtitle: (data) =>
      `${data.company || data.name} requested design-partner access.`,
  },
  founding_circle: {
    type: 'founding_circle',
    routingTag: 'FOUNDING_CIRCLE',
    title: 'New Field Network Request',
    badge: 'Field Network',
    sourceForm: 'Field Network invitation form',
    successMessage:
      'Thank you. Crosstown reviews each Field Network request personally. If there is a fit, we will follow up with an invitation and next steps.',
    failureMessage:
      'We could not submit your Field Network request. Please try again or contact Crosstown directly.',
    confirmationSubject: 'We Received Your Field Network Request: Crosstown',
    confirmationTitle: 'Field Network request received.',
    confirmationBlocks: [
      TRAIL_LOG_EMAIL_BLOCK,
      WALKTHROUGH_EMAIL_BLOCK,
      LIVE_DEAL_BLOCK,
    ],
    fields: [
      { key: 'name', label: 'Name', required: true, maxLength: 160 },
      { key: 'email', label: 'Email', required: true, maxLength: 254 },
      { key: 'company', label: 'Company/organization', required: true, maxLength: 180 },
      { key: 'role', label: 'Role', required: true, maxLength: 160 },
      {
        key: 'relationshipToSpace',
        label: 'Relationship to the RV/MHC space',
        required: true,
        maxLength: 160,
      },
      { key: 'howDidYouHear', label: 'How did you hear about us', maxLength: 200 },
      {
        key: 'followOrContribute',
        label: 'What would you want to follow or contribute',
        required: true,
        multiline: true,
        maxLength: 2000,
      },
    ],
    subject: (data) =>
      `New Field Network Request: ${data.company || data.name}`,
    subtitle: (data) =>
      `${data.name} requested a Field Network invitation.`,
  },
  referral_network: {
    type: 'referral_network',
    routingTag: 'REFERRAL_NETWORK',
    title: 'New Referral Alliance Conversation Request',
    badge: 'Referral Alliance',
    sourceForm: 'Referral Alliance conversation form',
    successMessage:
      'Thank you. Crosstown reviews each partner request personally. If there is a fit, we will follow up to start the conversation. No compensation terms are published or implied; any partnership terms are discussed privately.',
    failureMessage:
      'We could not submit your partner conversation request. Please try again or contact Crosstown directly.',
    confirmationSubject: 'We Received Your Referral Alliance Request: Crosstown',
    confirmationTitle: 'Partner conversation request received.',
    confirmationBlocks: [
      BROKERS_AND_LENDERS_REFERRAL_BLOCK,
      WALKTHROUGH_EMAIL_BLOCK,
      REFERRAL_ALLIANCE_INTRO_BLOCK,
    ],
    fields: [
      { key: 'name', label: 'Name', required: true, maxLength: 160 },
      { key: 'email', label: 'Email', required: true, maxLength: 254 },
      { key: 'company', label: 'Company/organization', required: true, maxLength: 180 },
      { key: 'role', label: 'Role', required: true, maxLength: 160 },
      { key: 'partnerType', label: 'Partner type', required: true, maxLength: 120 },
      { key: 'marketsCovered', label: 'Markets you cover', required: true, maxLength: 240 },
      { key: 'howDidYouHear', label: 'How did you hear about us', maxLength: 200 },
      {
        key: 'goodReferral',
        label: 'What does a good referral look like from your seat',
        required: true,
        multiline: true,
        maxLength: 2000,
      },
    ],
    subject: (data) =>
      `New Referral Alliance Conversation Request: ${data.company || data.name}`,
    subtitle: (data) =>
      `${data.name} requested a partner conversation.`,
  },
  trail_log: {
    type: 'trail_log',
    routingTag: 'TRAIL_LOG',
    title: 'New Trail Log Weigh-In',
    badge: 'The Trail Log',
    sourceForm: 'The Trail Log weigh-in form',
    successMessage:
      'Received. Your vote is input for the build conversation. November scope stays the founder\'s call.',
    failureMessage:
      'We could not submit your Trail Log vote. Please try again or contact Crosstown directly.',
    confirmationSubject: 'We Received Your Trail Log Vote: Crosstown',
    confirmationTitle: 'Trail Log vote received.',
    confirmationBlocks: [
      TRAIL_LOG_EMAIL_BLOCK,
      FIELD_NETWORK_BLOCK,
      WALKTHROUGH_EMAIL_BLOCK,
    ],
    fields: [
      { key: 'name', label: 'Name', required: true, maxLength: 160 },
      { key: 'email', label: 'Email', required: true, maxLength: 254 },
      { key: 'focus', label: 'Build area', required: true, maxLength: 120 },
      {
        key: 'vote',
        label: 'What should get attention next',
        required: true,
        maxLength: 240,
      },
      {
        key: 'note',
        label: 'Your note',
        multiline: true,
        maxLength: 2000,
      },
    ],
    subject: (data) =>
      `New Trail Log Weigh-In: ${data.focus || data.name}`,
    subtitle: (data) =>
      `${data.name} weighed in on ${data.focus || 'the build'}.`,
  },
  not_sure: {
    type: 'not_sure',
    routingTag: 'GENERAL_INQUIRY',
    title: 'New General Conversation Request',
    badge: 'General Conversation',
    sourceForm: 'General conversation form',
    successMessage:
      'Thank you. Your note has been received. Crosstown will route it to the right conversation and follow up if there is a fit.',
    failureMessage:
      'We could not submit your note. Please try again or contact Crosstown directly.',
    confirmationSubject: 'We Received Your Note: Crosstown',
    confirmationTitle: 'Conversation request received.',
    confirmationIntroLine:
      'Prefer a time? Book a conversation: https://cal.com/crosstownos/conversation',
    confirmationBlocks: [
      LIVE_DEAL_BLOCK,
      FIELD_NETWORK_BLOCK,
      BROKERS_AND_LENDERS_CONVERSATION_BLOCK,
    ],
    fields: [
      { key: 'name', label: 'Name', required: true, maxLength: 160 },
      { key: 'email', label: 'Email', required: true, maxLength: 254 },
      { key: 'company', label: 'Company/organization', required: true, maxLength: 180 },
      { key: 'role', label: 'Role', required: true, maxLength: 160 },
      { key: 'howDidYouHear', label: 'How did you hear about us', maxLength: 200 },
      {
        key: 'goal',
        label: 'What are you trying to do',
        required: true,
        multiline: true,
        maxLength: 2000,
      },
    ],
    subject: (data) =>
      `New General Conversation Request: ${data.company || data.name}`,
    subtitle: (data) =>
      `${data.name} started a general conversation.`,
  },

  // -------------------------------------------------------------------------
  // Dormant legacy configs — retained for future re-linking. Nothing on the
  // public site dispatches these form types today.
  // -------------------------------------------------------------------------
  outpost: {
    type: 'outpost',
    routingTag: 'OUTPOST_OPPORTUNITY',
    title: 'New Outpost Opportunity Submission',
    badge: 'Outpost Opportunity',
    sourceForm: 'Outpost opportunity form',
    successMessage:
      'Thank you. Crosstown reviews opportunities confidentially. If the submission appears to be a fit, we will follow up regarding next steps and an appropriate secure process for sharing supporting materials.',
    failureMessage:
      'We could not submit your opportunity. Please try again or contact Crosstown directly.',
    confirmationSubject: 'We Received Your Outpost Opportunity: Crosstown',
    confirmationTitle: 'Opportunity received.',
    confirmationBlocks: [],
    fields: [
      { key: 'relationshipToOpportunity', label: 'Relationship to opportunity', required: true, maxLength: 160 },
      { key: 'name', label: 'Name', required: true, maxLength: 160 },
      { key: 'company', label: 'Company', required: true, maxLength: 180 },
      { key: 'email', label: 'Email', required: true, maxLength: 254 },
      { key: 'phone', label: 'Phone', maxLength: 80 },
      { key: 'assetClass', label: 'Asset class', required: true, maxLength: 120 },
      { key: 'propertyName', label: 'Property name', maxLength: 180 },
      { key: 'cityState', label: 'City and state', required: true, maxLength: 180 },
      { key: 'approximateSites', label: 'Approximate pads/sites', required: true, maxLength: 80 },
      { key: 'currentOccupancy', label: 'Current occupancy', maxLength: 120 },
      { key: 'waterSewerConfiguration', label: 'Water/sewer configuration', maxLength: 240 },
      { key: 'askingPrice', label: 'Asking price / expected value', maxLength: 160 },
      {
        key: 'opportunityContext',
        label: 'Brief opportunity/transition context',
        required: true,
        multiline: true,
        maxLength: 2400,
      },
      { key: 'isCurrentlyListed', label: 'Property currently listed', required: true, maxLength: 100 },
      { key: 'authorizedToShare', label: 'Authorized to share this opportunity', required: true, maxLength: 80 },
      { key: 'anticipatedTiming', label: 'Anticipated timing', required: true, maxLength: 120 },
      { key: 'conversationSought', label: 'Conversation sought', required: true, maxLength: 160 },
    ],
    subject: (data) =>
      `New Outpost Opportunity Submission: ${data.propertyName || data.cityState}`,
    subtitle: (data) =>
      `${data.name} submitted an opportunity for confidential review.`,
  },
  basecamp: {
    type: 'basecamp',
    routingTag: 'BASECAMP_STRATEGIC',
    title: 'New Basecamp Strategic Conversation Request',
    badge: 'Basecamp Strategic',
    sourceForm: 'Basecamp strategic conversation form',
    successMessage:
      'Thank you. Crosstown will review your note and follow up if there is a relevant reason to connect.',
    failureMessage:
      'We could not submit your conversation request. Please try again or contact Crosstown directly.',
    confirmationSubject: 'We Received Your Basecamp Conversation Request: Crosstown',
    confirmationTitle: 'Conversation request received.',
    confirmationBlocks: [],
    fields: [
      { key: 'name', label: 'Name', required: true, maxLength: 160 },
      { key: 'company', label: 'Company/entity', required: true, maxLength: 180 },
      { key: 'role', label: 'Role', required: true, maxLength: 160 },
      { key: 'email', label: 'Business email', required: true, maxLength: 254 },
      { key: 'phone', label: 'Phone', maxLength: 80 },
      { key: 'linkedInUrl', label: 'LinkedIn URL', maxLength: 500 },
      { key: 'relationshipType', label: 'Relationship type', required: true, maxLength: 160 },
      {
        key: 'focusAndGeography',
        label: 'RV/MHC focus and geography',
        required: true,
        multiline: true,
        maxLength: 1200,
      },
      {
        key: 'strategyExperience',
        label: 'General strategy or relevant experience',
        required: true,
        multiline: true,
        maxLength: 2000,
      },
      {
        key: 'conversationGoal',
        label: 'What would make a conversation useful',
        required: true,
        multiline: true,
        maxLength: 1600,
      },
    ],
    subject: (data) =>
      `New Basecamp Strategic Conversation Request: ${data.company || data.name}`,
    subtitle: (data) =>
      `${data.company || data.name} requested a strategic conversation.`,
  },
}

function signatureBlock(colors: EmailPalette) {
  return `
<div class="signature-block" style="margin-top:28px; padding-top:24px; border-top:1px solid ${colors.border}; border-radius:0;">
  <p style="font-family:'Playfair Display', Georgia, serif; font-size:16px; color:${colors.foreground}; margin:0 0 6px 0; font-weight:700; letter-spacing:-0.01em;">
    CrosstownOS
  </p>
  <p style="font-family:'Inter', sans-serif; font-size:11px; color:${colors.muted}; margin:0 0 18px 0; line-height:1.5;">
    Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities.
  </p>
  <p style="font-family:'JetBrains Mono', monospace; font-size:10px; color:${colors.muted}; margin:0 0 3px 0; text-transform:uppercase; letter-spacing:0.15em;">
    Phone: (972) 914-9046
  </p>
  <p style="font-family:'JetBrains Mono', monospace; font-size:10px; color:${colors.muted}; margin:0; text-transform:uppercase; letter-spacing:0.15em;">
    Email: jeremy@crosstownosrv.camp
  </p>
</div>
`
}

function emailStyles(colors: EmailPalette) {
  return `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: ${colors.background};
    font-family: 'Inter', system-ui, sans-serif;
    color: ${colors.foreground};
  }

  .container {
    max-width: 640px;
    margin: 0 auto;
    background-color: ${colors.card};
    border: 1px solid ${colors.border};
    border-radius: 0;
  }

  .header {
    padding: 40px 32px;
    border-bottom: 1px solid ${colors.border};
    text-align: center;
    border-radius: 0;
  }

  .logo {
    width: 48px;
    height: 48px;
    margin-bottom: 16px;
    border-radius: 50%;
  }

  .header h1 {
    font-family: 'Playfair Display', Georgia, serif;
    font-size: 25px;
    font-weight: 700;
    color: ${colors.foreground};
    margin: 0 0 10px 0;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  .header p {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: ${colors.muted};
    margin: 0;
    line-height: 1.5;
  }

  .content {
    padding: 32px;
  }

  .badge {
    display: inline-block;
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: ${colors.primary};
    border: 1px solid ${colors.primary};
    padding: 5px 12px;
    margin-bottom: 24px;
    border-radius: 0;
  }

  .section-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    color: ${colors.muted};
    margin: 28px 0 16px 0;
  }

  .field {
    margin-bottom: 18px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${colors.border};
  }

  .field-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: ${colors.muted};
    margin-bottom: 6px;
    display: block;
  }

  .field-value {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${colors.foreground};
    font-weight: 500;
    line-height: 1.55;
    overflow-wrap: anywhere;
  }

  .metadata {
    margin-top: 28px;
    border: 1px solid ${colors.border};
    border-left: 3px solid ${colors.accent};
    padding: 18px;
    background: ${colors.background};
  }

  .metadata .field {
    margin-bottom: 12px;
    padding-bottom: 10px;
  }

  .metadata .field:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: 0;
  }

  .message {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${colors.foreground};
    line-height: 1.65;
    margin: 0 0 20px 0;
  }

  .note {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: ${colors.muted};
    line-height: 1.6;
    margin: 20px 0 0 0;
  }

  .divider {
    height: 1px;
    background: ${colors.border};
    margin: 30px 0;
  }

  .footer {
    padding: 28px 32px;
    text-align: center;
    border-top: 1px solid ${colors.border};
    border-radius: 0;
  }

  .footer-brand {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: ${colors.foreground};
    margin-bottom: 4px;
  }

  .footer-location {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: ${colors.muted};
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  .signature-block {
    border-radius: 0;
  }
`
}

function sanitizeText(value: unknown, maxLength = 500, multiline = false) {
  if (typeof value !== 'string') return ''

  const withoutControls = multiline
    ? value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, ' ')
    : value.replace(/[\u0000-\u001F\u007F]/g, ' ')

  return withoutControls
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength)
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function renderFieldValue(value: string) {
  return escapeHtml(value).replace(/\n/g, '<br />')
}

function isValidEmail(value: string) {
  return value.length <= 254 && EMAIL_PATTERN.test(value)
}

function isValidOptionalUrl(value: string) {
  if (!value) return true

  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function hasConsent(value: unknown) {
  return value === true || value === 'true' || value === 'on' || value === 'yes' || value === '1'
}

function getFormType(value: unknown): FormType | null {
  const formType = sanitizeText(value, 40)
  return formType === 'deal_desk' ||
    formType === 'design_partner' ||
    formType === 'founding_circle' ||
    formType === 'referral_network' ||
    formType === 'trail_log' ||
    formType === 'not_sure' ||
    formType === 'outpost' ||
    formType === 'basecamp'
    ? formType
    : null
}

function collectSubmission(body: Record<string, unknown>, config: FormConfig) {
  const data: SubmissionData = {}

  config.fields.forEach((field) => {
    data[field.key] = sanitizeText(
      body[field.key],
      field.maxLength ?? (field.multiline ? 2000 : 500),
      field.multiline,
    )
  })

  data.sourcePage = sanitizeText(body.sourcePage, 500)
  data.sourcePath = sanitizeText(body.sourcePath, 200)
  data.utmSource = sanitizeText(body.utmSource, 200)
  data.utmMedium = sanitizeText(body.utmMedium, 200)
  data.utmCampaign = sanitizeText(body.utmCampaign, 200)
  return data
}

function validateSubmission(body: Record<string, unknown>, config: FormConfig, data: SubmissionData) {
  for (const field of config.fields) {
    if (field.required && !data[field.key]) {
      return `Missing required field: ${field.label}`
    }
  }

  if (!isValidEmail(data.email)) {
    return 'A valid email is required.'
  }

  if (!isValidOptionalUrl(data.linkedInUrl || '')) {
    return 'LinkedIn URL must be a valid http or https URL.'
  }

  if (!hasConsent(body.consent)) {
    return 'Privacy notice acknowledgement is required.'
  }

  return null
}

function renderSubmittedFields(config: FormConfig, data: SubmissionData) {
  return config.fields
    .filter((field) => data[field.key])
    .map(
      (field) => `
      <div class="field">
        <span class="field-label">${escapeHtml(field.label)}</span>
        <div class="field-value">${renderFieldValue(data[field.key])}</div>
      </div>
      `,
    )
    .join('')
}

function renderMetadata({
  config,
  data,
  sourcePage,
  timestamp,
}: {
  config: FormConfig
  data: SubmissionData
  sourcePage: string
  timestamp: string
}) {
  const rows = [
    ['Submitted at', timestamp],
    ['Source form', config.sourceForm],
    ['Source page', sourcePage || 'Crosstown single-page site'],
    ['Source path', data.sourcePath || 'direct'],
  ]

  if (data.utmSource) rows.push(['UTM source', data.utmSource])
  if (data.utmMedium) rows.push(['UTM medium', data.utmMedium])
  if (data.utmCampaign) rows.push(['UTM campaign', data.utmCampaign])

  rows.push(
    ['Privacy consent', 'Acknowledged'],
    ['Internal routing tag', config.routingTag],
  )

  return `
    <div class="metadata">
      ${rows
        .map(
          ([label, value]) => `
          <div class="field">
            <span class="field-label">${escapeHtml(label)}</span>
            <div class="field-value">${escapeHtml(value)}</div>
          </div>
          `,
        )
        .join('')}
    </div>
  `
}

function generateAdminTemplate({
  config,
  data,
  sourcePage,
  timestamp,
}: {
  config: FormConfig
  data: SubmissionData
  sourcePage: string
  timestamp: string
}) {
  const title = escapeHtml(config.title)
  const subtitle = escapeHtml(config.subtitle(data))

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>${emailStyles(EMAIL_COLORS_DARK)}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" alt="Crosstown" class="logo" style="border-radius:50%;" />
      <h1>${title}</h1>
      <p>${subtitle}</p>
    </div>

    <div class="content">
      <div class="badge">${escapeHtml(config.badge)}</div>
      ${renderSubmittedFields(config, data)}
      ${renderMetadata({ config, data, sourcePage, timestamp })}
      <div class="divider"></div>
      ${signatureBlock(EMAIL_COLORS_DARK)}
    </div>

    <div class="footer">
      <div class="footer-brand">CrosstownOS</div>
    </div>
  </div>
</body>
</html>
  `
}

function generateConfirmationTemplate({
  config,
  data,
}: {
  config: FormConfig
  data: SubmissionData
}) {
  const name = escapeHtml(data.name || 'there')
  const confirmationIntro = config.confirmationIntroLine
    ? `<p class="message">Prefer a time? Book a conversation: <a href="https://cal.com/crosstownos/conversation">https://cal.com/crosstownos/conversation</a></p>`
    : ''
  const confirmationBlocks = renderEmailBlocksHtml(
    config.confirmationBlocks,
    'light',
  )

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(config.confirmationTitle)}</title>
  <style>${emailStyles(EMAIL_COLORS_LIGHT)}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" alt="Crosstown" class="logo" style="border-radius:50%;" />
      <h1>${escapeHtml(config.confirmationTitle)}</h1>
      <p>Crosstown has received your submission.</p>
    </div>

    <div class="content">
      <div class="badge">${escapeHtml(config.badge)}</div>
      <p class="message">Hi ${name},</p>
      <p class="message">${escapeHtml(config.successMessage)}</p>
      ${confirmationIntro}
      ${confirmationBlocks}
      <p class="section-title">A copy of what you submitted</p>
      ${renderSubmittedFields(config, data)}
      <p class="note">
        This confirmation records receipt only. It does not create an advisory, agency, investment,
        financing, brokerage, partnership, or transaction relationship.
      </p>
      <div class="divider"></div>
      ${signatureBlock(EMAIL_COLORS_LIGHT)}
    </div>

    <div class="footer">
      <div class="footer-brand">CrosstownOS</div>
    </div>
  </div>
</body>
</html>
  `
}

function generatePlainText({
  config,
  data,
  sourcePage,
  timestamp,
  confirmation = false,
}: {
  config: FormConfig
  data: SubmissionData
  sourcePage: string
  timestamp: string
  confirmation?: boolean
}) {
  const lines = [
    confirmation ? config.confirmationTitle : config.title,
    '',
  ]

  if (confirmation) {
    lines.push(
      `Hi ${data.name || 'there'},`,
      '',
      config.successMessage,
      '',
    )

    if (config.confirmationIntroLine) {
      lines.push(config.confirmationIntroLine, '')
    }

    lines.push(...renderEmailBlocksText(config.confirmationBlocks))
    lines.push('A copy of what you submitted:')
  } else {
    lines.push(config.subtitle(data), '')
  }

  config.fields.forEach((field) => {
    if (data[field.key]) lines.push(`${field.label}: ${data[field.key]}`)
  })
  lines.push('')

  if (confirmation) {
    lines.push(
      'This confirmation records receipt only. It does not create an advisory, agency, investment, financing, brokerage, partnership, or transaction relationship.',
      '',
    )
  }

  if (!confirmation) {
    lines.push(
      `Submitted at: ${timestamp}`,
      `Source form: ${config.sourceForm}`,
      `Source page: ${sourcePage || 'Crosstown single-page site'}`,
      `Source path: ${data.sourcePath || 'direct'}`,
    )

    if (data.utmSource) lines.push(`UTM source: ${data.utmSource}`)
    if (data.utmMedium) lines.push(`UTM medium: ${data.utmMedium}`)
    if (data.utmCampaign) lines.push(`UTM campaign: ${data.utmCampaign}`)

    lines.push(
      'Privacy consent: Acknowledged',
      `Internal routing tag: ${config.routingTag}`,
      '',
    )
  }

  lines.push(
    'CrosstownOS',
    'Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities.',
    'Phone: (972) 914-9046',
    'Email: jeremy@crosstownosrv.camp',
  )

  return lines.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.error('Resend API key is not configured')
      return NextResponse.json(
        { error: 'Email service is not configured.' },
        { status: 500 },
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)
    let body: Record<string, unknown>

    try {
      body = await request.json()
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON request body.' },
        { status: 400 },
      )
    }

    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json(
        { error: 'Invalid submission payload.' },
        { status: 400 },
      )
    }

    if (JSON.stringify(body).length > MAX_BODY_SIZE) {
      return NextResponse.json(
        { error: 'Submission is too large.' },
        { status: 413 },
      )
    }

    const hasHoneypotValue = HONEYPOT_FIELDS.some(
      (field) => sanitizeText(body[field], 500).length > 0,
    )

    if (hasHoneypotValue) {
      return NextResponse.json(
        { error: 'Submission could not be processed.' },
        { status: 400 },
      )
    }

    const formType = getFormType(body.formType)

    if (!formType) {
      return NextResponse.json(
        { error: 'Unsupported form type.' },
        { status: 400 },
      )
    }

    const config = FORM_CONFIG[formType]
    const data = collectSubmission(body, config)
    const validationError = validateSubmission(body, config, data)

    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 },
      )
    }

    const timestamp = new Date().toISOString()
    const sourcePage =
      data.sourcePage || sanitizeText(request.headers.get('referer'), 500) || 'Crosstown single-page site'


    const adminEmail = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [INTERNAL_RECIPIENT],
      replyTo: [data.email],
      subject: config.subject(data),
      html: generateAdminTemplate({ config, data, sourcePage, timestamp }),
      text: generatePlainText({ config, data, sourcePage, timestamp }),
    })

    if (adminEmail.error) {
      console.error('Resend admin notification error:', adminEmail.error)
      return NextResponse.json(
        { error: config.failureMessage },
        { status: 500 },
      )
    }

    const confirmationEmail = await resend.emails.send({
      from: FROM_ADDRESS,
      to: [data.email],
      replyTo: [INTERNAL_RECIPIENT],
      subject: config.confirmationSubject,
      html: generateConfirmationTemplate({ config, data }),
      text: generatePlainText({ config, data, sourcePage, timestamp, confirmation: true }),
    })

    if (confirmationEmail.error) {
      console.error('Resend confirmation error:', confirmationEmail.error)
      return NextResponse.json(
        { error: config.failureMessage },
        { status: 500 },
      )
    }

    // Best-effort: land the contact in the matching Resend segment.
    // Never blocks the submission — the notification emails above are the
    // critical path. Design Partner, Field Network,
    // Referral Alliance, and Founding Deal Desk share one segment
    // (free-tier limit).
    const segmentForType: Record<string, SegmentKey | null> = {
      design_partner: 'partners',
      founding_circle: 'partners',
      referral_network: 'partners',
      deal_desk: 'partners',
    }
    const segment = segmentForType[formType] ?? null
    if (segment && data.email) {
      await addToSegment(resend, segment, data.email, data.name ?? '')
    }

    return NextResponse.json({
      success: true,
      formType,
      message: config.successMessage,
      id: adminEmail.data?.id,
    })
  } catch (error) {
    console.error('Inquiry API error:', error)
    return NextResponse.json(
      { error: 'Internal server error.' },
      { status: 500 },
    )
  }
}
