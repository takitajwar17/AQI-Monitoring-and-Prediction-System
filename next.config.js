/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_OPENWEATHER_API_KEY: process.env.OPENWEATHER_API_KEY,
    NEXT_PUBLIC_TOMORROW_API_KEY: process.env.TOMORROW_API_KEY,
  },
};

module.exports = nextConfig;