import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SiteFooter from '@/components/SiteFooter'
import ScrollExperience from '@/components/ScrollExperience'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

const siteDescription =
  'Diligence software for RV park and manufactured housing buyers. Verified facts, broker claims, and missing evidence, separated before you buy.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.crosstownosrv.camp'),
  title: 'CrosstownOS | RV Park Due Diligence Software',
  description: siteDescription,
  applicationName: 'CrosstownOS',
  authors: [{ name: 'Crosstown' }],
  creator: 'Crosstown',
  publisher: 'Crosstown',
  keywords: [
    'RV park due diligence software',
    'RV park due diligence',
    'manufactured housing due diligence',
    'MHC due diligence',
    'RV park acquisition intelligence',
    'manufactured housing community due diligence',
    'MHC acquisition workflow',
    'RV park underwriting',
    'diligence register',
    'acquisition decision record',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CrosstownOS',
    description:
      'Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities. Know what is true before you buy.',
    type: 'website',
    url: '/',
    siteName: 'Crosstown',
    locale: 'en_US',
    images: [
      {
        url: '/images/opengraph.jpg?v=2',
        width: 1024,
        height: 1024,
        alt: 'CrosstownOS: evidence-backed acquisition intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrosstownOS',
    description:
      'Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities. Know what is true before you buy.',
    images: ['/images/opengraph.jpg?v=2'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/logo.jpg?v=1',
    apple: '/logo.jpg?v=1',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen selection:bg-primary/20 selection:text-foreground`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-foreground"
        >
          Skip to content
        </a>
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <ScrollExperience />
        {/* NATIVE DOM EXECUTOR (dev only): Wipes out runtime attribution tags.
            Skipped in production, so no MutationObserver ever runs there. */}
        {process.env.NODE_ENV !== 'production' && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  function purgeWatermarks() {
                    const items = document.querySelectorAll('[class*="v0"], [id*="v0"], [data-v0-badge], a[href*="v0.dev"], a[href*="v0.app"]');
                    items.forEach(el => el.remove());
                  }
                  purgeWatermarks();
                  const obs = new MutationObserver(purgeWatermarks);
                  obs.observe(document.body, { childList: true, subtree: true });
                })();
              `,
            }}
          />
        )}
      </body>
    </html>
  )
}