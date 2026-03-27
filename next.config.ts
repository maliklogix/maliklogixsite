import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  
  // ✅ Critical for 2GB/2CPU VPS: prevents Out of Memory crashes during `npm run build`
  experimental: {
    memoryBasedWorkersCount: true,
    optimizeCss: true, // Inlines critical CSS to fix Lighthouse render-blocking/chaining penalties
  },

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
