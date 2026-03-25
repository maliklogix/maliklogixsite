import type { MetadataRoute } from 'next';
import { getPublishedPostsForSitemap } from '@/lib/mdx-store';

const BASE_URL = 'https://maliklogix.com';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts = await getPublishedPostsForSitemap();
  const blogDetailEntries = blogPosts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.35,
    lastModified: p.publishedAt,
  }));

  return [
    { url: `${BASE_URL}/`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/services`, changeFrequency: 'weekly', priority: 0.8, lastModified: new Date() },
    { url: `${BASE_URL}/pricing`, changeFrequency: 'monthly', priority: 0.7, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, changeFrequency: 'monthly', priority: 0.7, lastModified: new Date() },
    { url: `${BASE_URL}/affiliate`, changeFrequency: 'monthly', priority: 0.6, lastModified: new Date() },
    { url: `${BASE_URL}/tools`, changeFrequency: 'monthly', priority: 0.6, lastModified: new Date() },
    { url: `${BASE_URL}/tools/roi-calculator`, changeFrequency: 'monthly', priority: 0.5, lastModified: new Date() },
    { url: `${BASE_URL}/tools/seo-analyzer`, changeFrequency: 'monthly', priority: 0.5, lastModified: new Date() },
    { url: `${BASE_URL}/tools/ai-copy-generator`, changeFrequency: 'monthly', priority: 0.5, lastModified: new Date() },
    { url: `${BASE_URL}/faq`, changeFrequency: 'monthly', priority: 0.4, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, changeFrequency: 'weekly', priority: 0.7, lastModified: new Date() },
    { url: `${BASE_URL}/docs`, changeFrequency: 'weekly', priority: 0.75, lastModified: new Date() },
    { url: `${BASE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.4, lastModified: new Date() },
    { url: `${BASE_URL}/terms`, changeFrequency: 'yearly', priority: 0.4, lastModified: new Date() },
    { url: `${BASE_URL}/newsletter`, changeFrequency: 'weekly', priority: 0.6, lastModified: new Date() },
    { url: `${BASE_URL}/subscribe`, changeFrequency: 'monthly', priority: 0.6, lastModified: new Date() },
    ...blogDetailEntries,
  ];
}

