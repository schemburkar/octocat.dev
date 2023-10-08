/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['assets.vercel.com', 'worldwidecode.files.wordpress.com', 'octocat.dev'],
    unoptimized:true
  },
  reactStrictMode: true,
}

module.exports = nextConfig
