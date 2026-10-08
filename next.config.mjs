/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // NOTE: ignoreBuildErrors is true because the v0 scaffold shipped with
    // type errors. Do not add new type errors. Long-term: fix existing errors
    // and set this to false. See marketing-site-elevation.md P3.
    ignoreBuildErrors: true,
  },
  images: {
    // Image optimization re-enabled 2026-10-08 (logo resized 966KB -> 32KB).
    // Remote patterns pruned: i.postimg.cc had zero usages.
  },
  async redirects() {
    return [
      {
        source: '/sample-decision-file',
        destination: '/parkproof-walkthrough',
        permanent: true,
      },
      {
        source: '/deal-desk',
        destination: '/workspace',
        permanent: true,
      },
      {
        source: '/deal-desk/:path*',
        destination: '/workspace/:path*',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
