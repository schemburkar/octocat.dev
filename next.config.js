/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    unoptimized:true,
    remotePatterns:[
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'worldwidecode.files.wordpress.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'octocat.dev',
        port: '',
        pathname: '/**',
      },
    ]
  },
  output:'export',
  reactStrictMode: true,
}

module.exports = nextConfig
