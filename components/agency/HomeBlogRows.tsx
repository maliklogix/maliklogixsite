'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getSEOImageUrl, getSEOImageAlt } from '@/lib/seo-utils';
import { getPublishedPosts, type Post } from '@/lib/post-store';

const POSTS_PER_PAGE = 6;

export default function HomeBlogRows() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPublishedPosts().then((data) => {
      setPosts(data || []);
    });
  }, []);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const currentPosts = useMemo(() => {
    const start = (page - 1) * POSTS_PER_PAGE;
    return posts.slice(start, start + POSTS_PER_PAGE);
  }, [posts, page]);

  if (!posts.length) return null;

  const goTo = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPaginationGroup = () => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (page <= 3) return [1, 2, 3, 4, 5, '...', totalPages];
    if (page >= totalPages - 2) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  return (
    <section className="mt-16 border-t border-[#E4E4EB] pt-10">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 mb-6 flex-wrap">
        <div>
          <h2 className="font-heading text-xl sm:text-2xl font-extrabold text-[#0D0D12]">
            Latest from MalikLogix AI
          </h2>
          <p className="mt-1 text-sm text-[#6E6E82]">
            {posts.length} posts · Page {page} of {totalPages}
          </p>
        </div>
        <Link href="/blog" className="text-xs font-bold text-[#5B3CF5] hover:underline whitespace-nowrap">
          View All Posts →
        </Link>
      </div>

      {/* Responsive grid: 1 col → 2 col → 3 col */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentPosts.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-[#E4E4EB] bg-white overflow-hidden hover:bg-[#F3F3F8] transition-colors flex flex-col"
          >
            <Link href={`/blog/${post.slug}`} className="block w-full">
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#F7F7FA]">
                {post.coverImage ? (
                  <img 
                    src={getSEOImageUrl(post.coverImage, post.slug)} 
                    alt={getSEOImageAlt(post.title, post.category)}
                    title={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-[#E4E4EB]">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </div>
                )}
              </div>
            </Link>

            <div className="px-5 py-4 flex flex-col flex-1">
              <div className="text-xs text-[#6E6E82]">
                {format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}
              </div>
              <h3 className="mt-1 font-heading text-base sm:text-lg font-extrabold text-[#0D0D12] line-clamp-2 hover:text-[#5B3CF5] transition-colors flex-1">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h3>
              <p className="mt-2 text-sm text-[#6E6E82] line-clamp-2">{post.excerpt}</p>

              <div className="mt-4 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src="/logo.webp"
                    alt="ML"
                    width={24}
                    height={24}
                    className="h-full w-full object-cover"
                    unoptimized
                  />
                </div>
                <div className="text-xs font-semibold text-[#0D0D12]">{post.authorName || 'Malik Farooq'}</div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Pagination — shown even on mobile */}
      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">
          {/* Prev */}
          <button
            onClick={() => goTo(page - 1)}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#E4E4EB] text-sm font-semibold text-[#0D0D12] hover:bg-[#F7F7FA] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline">Prev</span>
          </button>

          {/* Page numbers */}
          {getPaginationGroup().map((p, index) => {
            if (p === '...') {
              return <span key={`ellipsis-${index}`} className="px-2 text-[#9999AA] font-semibold">...</span>;
            }
            return (
              <button
                key={p}
                onClick={() => goTo(p as number)}
                className={`w-9 h-9 rounded-full text-sm font-semibold transition-colors ${
                  p === page
                    ? 'bg-[#5B3CF5] text-white shadow-md shadow-[#5B3CF5]/20'
                    : 'border border-[#E4E4EB] text-[#0D0D12] hover:bg-[#F7F7FA]'
                }`}
                aria-label={`Page ${p}`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            );
          })}

          {/* Next */}
          <button
            onClick={() => goTo(page + 1)}
            disabled={page === totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-full border border-[#E4E4EB] text-sm font-semibold text-[#0D0D12] hover:bg-[#F7F7FA] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </section>
  );
}
