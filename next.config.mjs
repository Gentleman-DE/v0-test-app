/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static generation for now to avoid window not defined errors
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable image optimization to avoid deployment issues
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
