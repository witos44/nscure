import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // tetap pakai webpack
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
