/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['assets.vercel.com', 'worldwidecode.files.wordpress.com', 'octocat.dev'],
  },
  reactStrictMode: true,
  experimental: {
    legacyBrowsers: false,
    serverActions: true
  },
}

module.exports = nextConfig
