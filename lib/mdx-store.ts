import { cache } from 'react';
import { prisma } from '@/lib/prisma';
import { safeQuery } from './db-query';
import type { Post } from './post-store';
import type { Post as PrismaPostModel, Prisma } from '@prisma/client';

const publishedWhere: Prisma.PostWhereInput = { status: 'published' };

/** List / cards / search: no body HTML — keeps MySQL payload small */
const postListSelect = {
  id: true,
  slug: true,
  title: true,
  subtitle: true,
  cover_image_url: true,
  tags: true,
  category: true,
  read_time_mins: true,
  status: true,
  author_name: true,
  seo_title: true,
  seo_description: true,
  published_at: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.PostSelect;

type PostListRow = Prisma.PostGetPayload<{ select: typeof postListSelect }>;

/** Single article: one query, skip unused heavy columns (sponsors, counters, etc.) */
const postArticleSelect = {
  id: true,
  title: true,
  subtitle: true,
  slug: true,
  content_html: true,
  cover_image_url: true,
  author_name: true,
  author_avatar: true,
  category: true,
  tags: true,
  read_time_mins: true,
  status: true,
  seo_title: true,
  seo_description: true,
  og_image: true,
  published_at: true,
  created_at: true,
  updated_at: true,
} satisfies Prisma.PostSelect;

type PostArticleRow = Prisma.PostGetPayload<{ select: typeof postArticleSelect }>;

function mapListRow(p: PostListRow): Post {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.subtitle || '',
    coverImage: p.cover_image_url || '/default-blog-thumbnail.webp',
    content: '',
    contentFormat: 'markdown',
    tags: p.tags ? (p.tags as string[]) : [],
    category: p.category || 'AI',
    readTimeMins: p.read_time_mins || 5,
    status: p.status as Post['status'],
    createdAt: p.created_at?.toISOString() || new Date().toISOString(),
    updatedAt: p.updated_at?.toISOString() || new Date().toISOString(),
    publishedAt: p.published_at?.toISOString() || p.created_at?.toISOString() || new Date().toISOString(),
    authorName: p.author_name || 'Malik Farooq',
    seoTitle: p.seo_title || p.title,
    seoDescription: p.seo_description || p.subtitle || '',
  };
}

function mapArticleRow(p: PostArticleRow): Post {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.subtitle || '',
    coverImage: p.cover_image_url || '/default-blog-thumbnail.webp',
    content: p.content_html || '',
    contentFormat: 'markdown',
    tags: p.tags ? (p.tags as string[]) : [],
    category: p.category || 'AI',
    readTimeMins: p.read_time_mins || 5,
    status: p.status as Post['status'],
    createdAt: p.created_at?.toISOString() || new Date().toISOString(),
    updatedAt: p.updated_at?.toISOString() || new Date().toISOString(),
    publishedAt: p.published_at?.toISOString() || p.created_at?.toISOString() || new Date().toISOString(),
    authorName: p.author_name || 'Malik Farooq',
    seoTitle: p.seo_title || p.title,
    seoDescription: p.seo_description || p.subtitle || '',
  };
}

function mapFullDbPost(p: PrismaPostModel): Post {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    excerpt: p.subtitle || '',
    coverImage: p.cover_image_url || '/default-blog-thumbnail.webp',
    content: p.content_html || '',
    contentFormat: 'markdown',
    tags: p.tags ? (p.tags as string[]) : [],
    category: p.category || 'AI',
    readTimeMins: p.read_time_mins || 5,
    status: p.status as Post['status'],
    createdAt: p.created_at?.toISOString() || new Date().toISOString(),
    updatedAt: p.updated_at?.toISOString() || new Date().toISOString(),
    publishedAt: p.published_at?.toISOString() || p.created_at?.toISOString() || new Date().toISOString(),
    authorName: p.author_name || 'Malik Farooq',
    seoTitle: p.seo_title || p.title,
    seoDescription: p.seo_description || p.subtitle || '',
  };
}

const postListOrderBy: Prisma.PostOrderByWithRelationInput[] = [
  { published_at: 'desc' },
  { created_at: 'desc' },
];

/** Public blog index & search: published rows only, no post body */
export async function getPublishedPostSummaries(): Promise<Post[]> {
  const rows = await safeQuery(
    () =>
      prisma.post.findMany({
        where: publishedWhere,
        orderBy: postListOrderBy,
        select: postListSelect,
      }),
    [] as PostListRow[]
  );
  return rows.map(mapListRow);
}

/** Paginated blog index — count + page in DB, not in memory */
export async function getPublishedPostsPage(
  page: number,
  pageSize: number
): Promise<{ total: number; posts: Post[] }> {
  const skip = Math.max(0, page - 1) * pageSize;
  const result = await safeQuery(
    () =>
      prisma.$transaction([
        prisma.post.count({ where: publishedWhere }),
        prisma.post.findMany({
          where: publishedWhere,
          orderBy: postListOrderBy,
          skip,
          take: pageSize,
          select: postListSelect,
        }),
      ]),
    [0, []] as [number, PostListRow[]]
  );
  const [total, rows] = result;
  return { total, posts: rows.map(mapListRow) };
}

/** Static generation + sitemap: slugs only */
export async function getPublishedPostSlugs(): Promise<{ slug: string }[]> {
  return safeQuery(
    () =>
      prisma.post.findMany({
        where: publishedWhere,
        select: { slug: true },
      }),
    []
  );
}

export type SitemapPostEntry = { slug: string; publishedAt: Date; createdAt: Date };

export async function getPublishedPostsForSitemap(): Promise<SitemapPostEntry[]> {
  const rows = await safeQuery(
    () =>
      prisma.post.findMany({
        where: publishedWhere,
        select: {
          slug: true,
          published_at: true,
          created_at: true,
        },
      }),
    [] as { slug: string; published_at: Date | null; created_at: Date | null }[]
  );
  return rows.map((r) => ({
    slug: r.slug,
    publishedAt: r.published_at ?? r.created_at ?? new Date(),
    createdAt: r.created_at ?? new Date(),
  }));
}

/** Recent posts strip on article page — small LIMIT query, no full table scan of HTML */
export async function getRecentPublishedSummaries(
  excludeSlug: string,
  take: number
): Promise<Post[]> {
  const rows = await safeQuery(
    () =>
      prisma.post.findMany({
        where: {
          ...publishedWhere,
          slug: { not: excludeSlug },
        },
        orderBy: postListOrderBy,
        take,
        select: postListSelect,
      }),
    [] as PostListRow[]
  );
  return rows.map(mapListRow);
}

/**
 * All posts with full HTML for admin API & editor.
 * Prefer getPublishedPostSummaries / getPublishedPostsPage on public routes.
 */
export async function getAllMDXPosts(): Promise<Post[]> {
  const posts = await safeQuery(
    () =>
      prisma.post.findMany({
        orderBy: postListOrderBy,
      }),
    [] as PrismaPostModel[]
  );
  return posts.map(mapFullDbPost);
}

async function loadMDXPostBySlug(idOrSlug: string): Promise<Post | null> {
  try {
    const p = await prisma.post.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      select: postArticleSelect,
    });
    if (!p) return null;
    return mapArticleRow(p);
  } catch (error) {
    console.error('Error fetching post by slug or ID from MySQL:', error);
    return null;
  }
}

/** Dedupes within the same RSC request (metadata + page + layout siblings). */
export const getMDXPostBySlug = cache(loadMDXPostBySlug);

export async function saveMDXPost(post: Post): Promise<void> {
  const publishedAtDate = post.publishedAt ? new Date(post.publishedAt) : new Date();
  try {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        subtitle: post.excerpt,
        content_html: post.content,
        cover_image_url: post.coverImage,
        author_name: post.authorName,
        category: post.category,
        tags: post.tags,
        read_time_mins: post.readTimeMins,
        status: post.status === 'published' ? 'published' : 'draft',
        seo_title: post.seoTitle || post.title,
        seo_description: post.seoDescription || post.excerpt,
        updated_at: new Date(),
        published_at: publishedAtDate,
      },
      create: {
        title: post.title,
        subtitle: post.excerpt,
        slug: post.slug,
        content_html: post.content,
        cover_image_url: post.coverImage,
        author_name: post.authorName,
        category: post.category,
        tags: post.tags,
        read_time_mins: post.readTimeMins,
        status: post.status === 'published' ? 'published' : 'draft',
        seo_title: post.seoTitle || post.title,
        seo_description: post.seoDescription || post.excerpt,
        published_at: publishedAtDate,
      },
    });
  } catch (error) {
    console.error('Error saving post to MySQL:', error);
    throw error;
  }
}

export async function deleteMDXPost(idOrSlug: string): Promise<void> {
  try {
    const p = await prisma.post.findFirst({
      where: { OR: [{ id: idOrSlug }, { slug: idOrSlug }] },
      select: { id: true },
    });
    if (p) {
      await prisma.post.delete({ where: { id: p.id } });
    }
  } catch (error) {
    console.error('Error deleting post from MySQL:', error);
  }
}
