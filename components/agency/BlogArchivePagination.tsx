'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { getPublishedPosts } from '@/lib/post-store';
import Image from 'next/image';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';
import { getSEOImageUrl, getSEOImageAlt } from '@/lib/seo-utils';

export default function BlogArchivePagination() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page') || '1') || 1;
  const pageSize = 12; // matches 80/20 AI style (archive pages show ~12)

  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let active = true;
    getPublishedPosts().then((data) => {
      if (active) {
        setAllPosts(data);
        setMounted(true);
      }
    });
    return () => { active = false; };
  }, []);

  const { pagePosts, totalPages, safePage } = useMemo(() => {
    if (!mounted) {
      return { pagePosts: [], totalPages: 1, safePage: 1 };
    }

    const total = Math.max(1, Math.ceil(allPosts.length / pageSize));
    const calculatedSafePage = Math.min(Math.max(1, page), total);
    const start = (calculatedSafePage - 1) * pageSize;
    const currentPosts = allPosts.slice(start, start + pageSize);
    return { pagePosts: currentPosts, totalPages: total, safePage: calculatedSafePage };
  }, [mounted, page, allPosts]);

  if (!mounted) {
    return <section className="mt-8" />;
  }

  return (
    <section className="mt-8">
      {pagePosts.length === 0 ? (
        <div className="py-20 text-center border rounded-3xl bg-white/50 border-[#E4E4EB]">
          <p className="text-[#6E6E82]">No published posts yet. Create one in the admin panel.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {pagePosts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-[#E4E4EB] bg-white overflow-hidden hover:bg-[#F3F3F8] transition-colors"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#F7F7FA] m-4">
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

              <div className="px-5 pb-5">
                <div className="text-xs text-[#6E6E82]">{format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}</div>
                <h3 className="mt-1 font-heading text-lg font-extrabold text-[#0D0D12] line-clamp-2 hover:text-[#5B3CF5] transition-colors">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="mt-2 text-sm text-[#6E6E82] line-clamp-2">{post.excerpt}</p>

                <div className="mt-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full overflow-hidden">
                    <Image
                      src="/ml-logo.png?v=4"
                      alt="ML"
                      width={24}
                      height={24}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  </div>
                  <div className="text-xs font-semibold text-[#0D0D12]">Malik Farooq</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {pagePosts.length > 0 && (
        <div className="mt-8 flex items-center justify-center gap-2 text-sm text-[#6E6E82]">
          <Link href={`/?page=1`} className="px-3 py-1 rounded-full border border-[#E4E4EB] hover:bg-[#F7F7FA]">
            First
          </Link>
          <Link
            href={`/?page=${Math.max(1, safePage - 1)}`}
            className="px-3 py-1 rounded-full border border-[#E4E4EB] hover:bg-[#F7F7FA]"
          >
            Back
          </Link>

          {Array.from({ length: totalPages }).map((_, i) => {
            const p = i + 1;
            const active = p === safePage;
            return (
              <Link
                key={p}
                href={`/?page=${p}`}
                className={`h-8 w-8 flex items-center justify-center rounded-full border text-xs ${
                  active ? 'border-[#5B3CF5] bg-[#F0ECFF] text-[#5B3CF5]' : 'border-[#E4E4EB] hover:bg-[#F7F7FA]'
                }`}
              >
                {p}
              </Link>
            );
          })}

          <Link
            href={`/?page=${Math.min(totalPages, safePage + 1)}`}
            className="px-3 py-1 rounded-full border border-[#E4E4EB] hover:bg-[#F7F7FA]"
          >
            Next
          </Link>
          <Link
            href={`/?page=${totalPages}`}
            className={`px-3 py-1 rounded-full border ${
              safePage === totalPages ? 'border-[#5B3CF5]' : 'border-[#E4E4EB]'
            } hover:bg-[#F7F7FA]`}
          >
            Last
          </Link>
        </div>
      )}
    </section>
  );
}

