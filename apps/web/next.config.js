/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@multi-ai-dashboard/shared'],
  output: 'standalone',
}

module.exports = nextConfig
