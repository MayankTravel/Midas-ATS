/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
  serverRuntimeConfig: {
    headers: {
      "Content-Security-Policy": "frame-ancestors 'none';",
    },
  },
};

module.exports = nextConfig;
