/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'assets.vercel.com', 'worldwidecode.files.wordpress.com', 'octocat.dev'],
  },
  reactStrictMode: true,
  experimental:{
    legacyBrowsers: false,
  },
}

module.exports = nextConfig
