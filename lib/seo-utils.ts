/**
 * SEO Utilities for Blog Thumbnails
 */

/**
 * Appends an SEO-friendly hint (slug or title) to an image URL.
 * Even if multiple posts use the same default thumbnail, unique query parameters
 * hint to search engines that they are distinct assets for those pages.
 */
export function getSEOImageUrl(url: string, slug: string): string {
  if (!url) return url;
  if (url.startsWith('data:')) return url;
  
  // Standardize the slug for URL safety
  const safeSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  // If we're using the default thumbnail, we use the "pretty" rewrite path
  if (url.includes('default-blog-thumbnail.webp')) {
      return `/blog-thumbnails/${safeSlug}.webp`;
  }

  // Fallback for other images: use the query param approach as a fallback SEO hint
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}seo-hint=${safeSlug}`;
}

/**
 * Generates a clean, descriptive alt tag for a blog post image.
 */
export function getSEOImageAlt(title: string, category?: string): string {
  const prefix = category ? `${category}: ` : '';
  return `${prefix}${title} - MalikLogix AI Marketing Blog`;
}
