import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  poweredByHeader: false,
  compress: true,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.maliklogix.com',
          },
        ],
        destination: 'https://maliklogix.com/:path*',
        permanent: true,
      },
    ];
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
