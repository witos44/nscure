// frontend/next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

// EKSPOR PAKE COMMONJS (BUKAN ES MODULES)
module.exports = nextConfig;