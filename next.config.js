/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'centrosante.com.ar',
        pathname: '/api/**',
      },
    ],
  },
}

module.exports = nextConfig
