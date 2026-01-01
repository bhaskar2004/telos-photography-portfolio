import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Serve images at original quality without optimization
    qualities: [100],
  },
};

export default nextConfig;
