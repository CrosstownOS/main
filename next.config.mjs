/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/sample-decision-file',
        destination: '/parkproof-walkthrough',
        permanent: true,
      },
    ]
  },
}

export default nextConfig