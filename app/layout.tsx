import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import SiteFooter from '@/components/SiteFooter'
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
  'CrosstownOS is diligence software for RV park and manufactured housing buyers. One record carries your deal from the broker package, through the site walk, to the signed decision: verified facts, broker-reported claims, missing evidence, and stated assumptions, separated and visible.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.crosstownosrv.camp'),
  title: 'CrosstownOS | RV Park Due Diligence Software: Know What Is True Before You Buy',
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
    'ParkProof Report',
    'acquisition decision record',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'CrosstownOS // Acquire',
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
        alt: 'CrosstownOS // Acquire: evidence-backed acquisition intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CrosstownOS // Acquire',
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
        {children}
        <SiteFooter />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        {/* NATIVE DOM EXECUTOR: Wipes out runtime attribution tags instantly */}
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
      </body>
    </html>
  )
}