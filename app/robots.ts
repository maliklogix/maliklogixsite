import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/client', '/client/', '/api', '/api/'],
      },
    ],
    sitemap: 'https://maliklogix.com/sitemap.xml',
  };
}

