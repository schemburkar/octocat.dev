/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'assets.vercel.com', 'worldwidecode.files.wordpress.com', 'octocat.dev'],
  },
  reactStrictMode: true,
  concurrentFeatures: true,
  experimental:{
    reactRoot: true,  
    reactMode: 'concurrent',
    legacyBrowsers: false,
  },
}

module.exports = nextConfig
