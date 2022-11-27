/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/app/:path*',
        destination: 'https://app.pageblox.io/:path*',
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: false,
  images: {
    domains: ['images.unsplash.com']
  }
}

module.exports = nextConfig
