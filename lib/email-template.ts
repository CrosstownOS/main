/**
 * Shared branded email chrome for CrosstownOS transactional emails.
 *
 * The palette, styles, signature block, and footer are mirrored verbatim
 * from the subscribe route's email templates so every email Jeremy sends
 * reads as one system. If the brand email style ever changes, change it
 * here and in app/api/subscribe/route.ts together.
 */

export const FROM_ADDRESS = 'Crosstown <jeremy@crosstownosrv.camp>'
export const INTERNAL_RECIPIENT = 'jeremy@crosstownosrv.camp'
export const LOGO_URL = 'https://www.crosstownosrv.camp/logo.jpg'
export const SITE_URL = 'https://www.crosstownosrv.camp'

const EMAIL_COLORS = {
  background: '#12110e',
  card: '#1c1a16',
  foreground: '#eee9df',
  muted: '#a29b8e',
  border: '#3a352b',
  primary: '#466b96',
  accent: '#a66a35',
}

const EMAIL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

  body {
    margin: 0;
    padding: 0;
    background-color: ${EMAIL_COLORS.background};
    font-family: 'Inter', system-ui, sans-serif;
    color: ${EMAIL_COLORS.foreground};
  }

  .container {
    max-width: 640px;
    margin: 0 auto;
    background-color: ${EMAIL_COLORS.card};
    border: 1px solid ${EMAIL_COLORS.border};
    border-radius: 0;
  }

  .header {
    padding: 40px 32px;
    border-bottom: 1px solid ${EMAIL_COLORS.border};
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
    color: ${EMAIL_COLORS.foreground};
    margin: 0 0 10px 0;
    letter-spacing: -0.01em;
    line-height: 1.2;
  }

  .header p {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: ${EMAIL_COLORS.muted};
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
    color: ${EMAIL_COLORS.primary};
    border: 1px solid ${EMAIL_COLORS.primary};
    padding: 5px 12px;
    margin-bottom: 24px;
    border-radius: 0;
  }

  .field {
    margin-bottom: 18px;
    padding-bottom: 16px;
    border-bottom: 1px solid ${EMAIL_COLORS.border};
  }

  .field-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    text-transform: uppercase;
    letter-spacing: 0.16em;
    color: ${EMAIL_COLORS.muted};
    margin-bottom: 6px;
    display: block;
  }

  .field-value {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${EMAIL_COLORS.foreground};
    font-weight: 500;
    line-height: 1.55;
    overflow-wrap: anywhere;
  }

  .message {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: ${EMAIL_COLORS.foreground};
    line-height: 1.65;
    margin: 20px 0 0 0;
  }

  .message a {
    color: ${EMAIL_COLORS.primary};
    font-weight: 600;
  }

  .note {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: ${EMAIL_COLORS.muted};
    line-height: 1.6;
    margin: 20px 0 0 0;
  }

  .divider {
    height: 1px;
    background: ${EMAIL_COLORS.border};
    margin: 30px 0;
  }

  .footer {
    padding: 28px 32px;
    text-align: center;
    border-top: 1px solid ${EMAIL_COLORS.border};
    border-radius: 0;
  }

  .footer-brand {
    font-family: 'Playfair Display', serif;
    font-size: 16px;
    color: ${EMAIL_COLORS.foreground};
    margin-bottom: 4px;
  }

  .footer-location {
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    color: ${EMAIL_COLORS.muted};
    text-transform: uppercase;
    letter-spacing: 0.2em;
  }

  .signature-block {
    border-radius: 0;
  }
`

const SIGNATURE_BLOCK = `
<div class="signature-block" style="margin-top:28px; padding-top:24px; border-top:1px solid ${EMAIL_COLORS.border}; border-radius:0;">
  <p style="font-family:'Playfair Display', Georgia, serif; font-size:16px; color:${EMAIL_COLORS.foreground}; margin:0 0 6px 0; font-weight:700; letter-spacing:-0.01em;">
    Crosstown
  </p>
  <p style="font-family:'Inter', sans-serif; font-size:11px; color:${EMAIL_COLORS.muted}; margin:0 0 18px 0; line-height:1.5;">
    Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities.
  </p>
  <p style="font-family:'Playfair Display', Georgia, serif; font-size:14px; color:${EMAIL_COLORS.foreground}; margin:0 0 4px 0; font-weight:700;">
    Jeremy Cross
  </p>
  <p style="font-family:'JetBrains Mono', monospace; font-size:10px; color:${EMAIL_COLORS.muted}; margin:0 0 3px 0; text-transform:uppercase; letter-spacing:0.15em;">
    Phone: (972) 914-9046
  </p>
  <p style="font-family:'JetBrains Mono', monospace; font-size:10px; color:${EMAIL_COLORS.muted}; margin:0; text-transform:uppercase; letter-spacing:0.15em;">
    Email: jeremy@crosstownosrv.camp
  </p>
</div>
`

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export function buildBrandedEmail({
  pageTitle,
  headerTitle,
  headerSubtitle,
  badge,
  bodyHtml,
}: {
  pageTitle: string
  headerTitle: string
  headerSubtitle: string
  badge: string
  bodyHtml: string
}): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(pageTitle)}</title>
  <style>${EMAIL_STYLES}</style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="${LOGO_URL}" alt="Crosstown" class="logo" style="border-radius:50%;" />
      <h1>${escapeHtml(headerTitle)}</h1>
      <p>${escapeHtml(headerSubtitle)}</p>
    </div>

    <div class="content">
      <div class="badge">${escapeHtml(badge)}</div>
      ${bodyHtml}
      <div class="divider"></div>
      ${SIGNATURE_BLOCK}
    </div>

    <div class="footer">
      <div class="footer-brand">Crosstown</div>
      <div class="footer-location">CrosstownOS // Acquire</div>
    </div>
  </div>
</body>
</html>
  `
}
