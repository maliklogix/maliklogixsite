// Client-side API wrapper for the server-side mdx-store.

export type PostStatus = 'draft' | 'published' | 'scheduled';
export type PostContentFormat = 'markdown' | 'html';

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: string;
  contentFormat?: PostContentFormat;
  tags: string[];
  category: string;
  authorName?: string;
  readTimeMins?: number;
  seoTitle?: string;
  seoDescription?: string;
  status: PostStatus;
  scheduledAt?: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export async function getPosts(): Promise<Post[]> {
  if (typeof window === 'undefined') return [];
  try {
    const res = await fetch('/api/posts');
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    return [];
  }
}

export async function getPost(id: string): Promise<Post | undefined> {
  if (typeof window === 'undefined') return undefined;
  try {
    const res = await fetch(`/api/posts/${id}`);
    if (!res.ok) return undefined;
    return res.json();
  } catch (err) {
    return undefined;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | undefined> {
  return getPost(slug); // slug and id are the same for our MDX implementation
}

export async function getPublishedPosts(): Promise<Post[]> {
  const posts = await getPosts();
  const now = new Date().toISOString();
  return posts.filter(
    (p) =>
      p.status === 'published' ||
      (p.status === 'scheduled' && p.scheduledAt && p.scheduledAt <= now)
  );
}

export async function savePost(post: Post): Promise<void> {
  await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(post)
  });
}

export async function deletePost(id: string): Promise<void> {
  await fetch(`/api/posts/${id}`, { method: 'DELETE' });
}

export async function deletePosts(ids: string[]): Promise<void> {
  for (const id of ids) {
    await deletePost(id);
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}
