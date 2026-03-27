import Link from 'next/link';
import { getPublishedPostsPage } from '@/lib/mdx-store';
import { format } from 'date-fns';
import { ArrowRight, User, ChevronLeft, ChevronRight } from 'lucide-react';
import { getSEOImageUrl, getSEOImageAlt } from '@/lib/seo-utils';
import type { Metadata } from 'next';
import type { Post } from '@/lib/post-store';

const POSTS_PER_PAGE = 9;

export const metadata: Metadata = {
  title: 'Blog | MalikLogix',
  description:
    'Insights on AI automation, growth marketing, and building scalable digital agencies with SEO, content systems, and conversion-focused workflows.',
  openGraph: {
    title: 'Blog | MalikLogix',
    description:
      'Insights on AI automation, growth marketing, and building scalable digital agencies with SEO, content systems, and conversion-focused workflows.',
    images: [{ url: '/ml-logo.png?v=4', alt: 'MalikLogix' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog | MalikLogix',
    description:
      'Insights on AI automation, growth marketing, and building scalable digital agencies with SEO, content systems, and conversion-focused workflows.',
    images: ['/ml-logo.png?v=4'],
  },
};

/** ISR: fewer DB hits on Hostinger; tune seconds as you like */
export const revalidate = 120;

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const params = await searchParams;
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));

  const { total, posts } = await Promise.race([
    getPublishedPostsPage(currentPage, POSTS_PER_PAGE),
    new Promise<{ total: number; posts: Post[] }>((resolve) =>
      setTimeout(() => resolve({ total: 0, posts: [] }), 10000)
    ),
  ]);
  const totalPages = total <= 0 ? 0 : Math.ceil(total / POSTS_PER_PAGE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header className="mb-12">
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0D12] mb-4">
          MalikLogix Blog
        </h1>
        <p className="text-lg text-[#6E6E82] max-w-2xl">
          Insights on AI automation, growth marketing, and building the future of digital agencies.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="py-20 text-center border rounded-3xl bg-white/50 border-[#E4E4EB]">
          <p className="text-[#6E6E82] mb-2">No posts published yet. Check back soon!</p>
          <p className="text-[10px] text-[#767676]">
            Published count: {total}. DB env: {process.env.DATABASE_URL ? 'Yes' : 'No'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group flex flex-col bg-white rounded-3xl border border-[#E4E4EB] overflow-hidden hover:shadow-xl hover:shadow-[#5B3CF5]/5 transition-all duration-300"
              >
                <Link href={`/blog/${post.slug}`} className="block aspect-[16/9] overflow-hidden bg-[#F7F7FA]">
                  {post.coverImage ? (
                    <img
                      src={getSEOImageUrl(post.coverImage, post.slug)}
                      alt={getSEOImageAlt(post.title, post.category)}
                      title={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#E4E4EB]">
                      <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                      </svg>
                    </div>
                  )}
                </Link>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-[10px] font-bold text-[#5B3CF5] uppercase tracking-widest mb-3">
                    <span>{post.category}</span>
                    <span className="w-1 h-1 rounded-full bg-[#E4E4EB]" />
                    <span className="text-[#6E6E82]">{format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}</span>
                  </div>

                  <h2 className="text-xl font-extrabold text-[#0D0D12] mb-3 group-hover:text-[#5B3CF5] transition-colors line-clamp-2">
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>

                  <p className="text-sm text-[#6E6E82] line-clamp-3 mb-6">
                    {post.excerpt}
                  </p>

                  <div className="mt-auto pt-4 border-t border-[#F3F3F8] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-[#5B3CF5]/10 flex items-center justify-center">
                        <User size={12} className="text-[#5B3CF5]" />
                      </div>
                      <span className="text-xs font-semibold text-[#0D0D12]">{post.authorName || 'Malik Farooq'}</span>
                    </div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-bold text-[#5B3CF5] flex items-center gap-1 group/btn"
                    >
                      Read More
                      <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && total > 0 && (
            <div className="mt-16 flex items-center justify-center gap-2">
              {/* Prev */}
              {currentPage > 1 ? (
                <Link
                  href={`/blog?page=${currentPage - 1}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E4E4EB] bg-white text-sm font-semibold text-[#0D0D12] hover:border-[#5B3CF5]/40 hover:text-[#5B3CF5] transition-all"
                >
                  <ChevronLeft size={16} />
                  Prev
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E4E4EB] bg-[#F7F7FA] text-sm font-semibold text-[#C0C0CC] cursor-not-allowed">
                  <ChevronLeft size={16} />
                  Prev
                </span>
              )}

              {/* Page Numbers */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Link
                    key={page}
                    href={`/blog?page=${page}`}
                    className={`w-10 h-10 flex items-center justify-center rounded-xl text-sm font-bold transition-all ${
                      page === currentPage
                        ? 'bg-[#5B3CF5] text-white shadow-lg shadow-[#5B3CF5]/25'
                        : 'border border-[#E4E4EB] bg-white text-[#6E6E82] hover:border-[#5B3CF5]/40 hover:text-[#5B3CF5]'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </div>

              {/* Next */}
              {currentPage < totalPages ? (
                <Link
                  href={`/blog?page=${currentPage + 1}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E4E4EB] bg-white text-sm font-semibold text-[#0D0D12] hover:border-[#5B3CF5]/40 hover:text-[#5B3CF5] transition-all"
                >
                  Next
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#E4E4EB] bg-[#F7F7FA] text-sm font-semibold text-[#C0C0CC] cursor-not-allowed">
                  Next
                  <ChevronRight size={16} />
                </span>
              )}
            </div>
          )}

          {/* Post count */}
          <p className="mt-6 text-center text-xs text-[#767676] font-medium">
            Showing {(currentPage - 1) * POSTS_PER_PAGE + 1}–{Math.min(currentPage * POSTS_PER_PAGE, total)} of {total} articles
          </p>
        </>
      )}
    </div>
  );
}
