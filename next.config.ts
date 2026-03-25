import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  
  async rewrites() {
    return [
      {
        source: '/blog-thumbnails/:slug*',
        destination: '/default-blog-thumbnail.webp',
      },
    ];
  },
};

export default nextConfig;
