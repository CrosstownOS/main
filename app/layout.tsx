import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { Playfair_Display, Inter, JetBrains_Mono } from 'next/font/google'
import AnalyticsClient from '@/components/analytics/AnalyticsClient'
import SiteFooter from '@/components/SiteFooter'
import QuietCta from '@/components/QuietCta'
import SiteAgent from '@/components/SiteAgent'
import ScrollExperience from '@/components/ScrollExperience'
import BrandLoader from '@/components/BrandLoader'
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
  'Diligence software for RV park and manufactured housing (MHP) buyers. Verified facts, broker claims, and missing evidence, separated before you buy.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.crosstownosrv.camp'),
  title: 'CrosstownOS | RV Park Due Diligence Software',
  description: siteDescription,
  applicationName: 'CrosstownOS',
  authors: [{ name: 'CrosstownOS' }],
  creator: 'CrosstownOS',
  publisher: 'CrosstownOS',
  alternates: {
    canonical: '/',
    types: {
      'application/rss+xml': 'https://www.crosstownosrv.camp/blog/rss.xml',
    },
  },
  openGraph: {
    title: 'CrosstownOS',
    description:
      'Evidence-backed acquisition intelligence for RV parks and manufactured-housing communities. Know what is true before you buy.',
    type: 'website',
    url: '/',
    siteName: 'CrosstownOS',
    locale: 'en_US',
    images: [
      {
        url: '/og-logo.png',
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
    images: ['/og-logo.png'],
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
    icon: '/favicon.png?v=2',
    apple: '/apple-touch-icon.png?v=2',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen selection:bg-primary/20 selection:text-foreground`}
      >
        {/* ── BRAND LOADER ANTI-FLASH: runs synchronously before first paint.
            Adds brand-loader-seen to <html> when this session already saw the
            loader or reduced motion is preferred, so the server-rendered
            loader hides instantly — no flash on repeat visits. The
            suppressHydrationWarning on <html> keeps this intentional class
            difference from tripping hydration. ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var s=false;try{s=!!window.sessionStorage.getItem("brand-loader-seen")}catch(e){}var r=false;try{r=!!(window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches)}catch(e){}if(s||r){document.documentElement.classList.add("brand-loader-seen")}}catch(e){}})();`,
          }}
        />
        <noscript>
          <style>{`.brand-loader-root{display:none!important}`}</style>
        </noscript>
        {/* ── META PIXEL: website visitor tracking for the Facebook ad campaign.
            Base code on every page; PageView fires on load. ── */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','28686812230975621');fbq('track','PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=28686812230975621&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.2em] focus:text-foreground"
        >
          Skip to content
        </a>
        {children}
        <SiteFooter />
        {/* ── QUIET CTA: fixed bottom bar. Lives here (direct child of <body>,
            outside app/template.tsx) so the .page-enter transform can't break
            its position: fixed. Mounted globally: appears on every page. ── */}
        <QuietCta />
        {/* ── SITE AGENT: the Front Door. Same mounting rule as QuietCta
            (direct child of <body>, outside app/template.tsx) so its
            position: fixed survives the page-enter transform. ── */}
        <SiteAgent />
        <AnalyticsClient />
        <ScrollExperience />
        <BrandLoader />
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