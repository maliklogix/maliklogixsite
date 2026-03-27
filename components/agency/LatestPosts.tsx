'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPublishedPosts, Post } from '@/lib/post-store';
import { getSEOImageUrl, getSEOImageAlt } from '@/lib/seo-utils';
import { format } from 'date-fns';
import { ArrowRight, Calendar } from 'lucide-react';

export function LatestPosts() {
  // Compute once in the browser; avoids setState inside useEffect.
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPublishedPosts().then((data) => {
      setPosts(data.slice(0, 6));
      setLoading(false);
    });
  }, []);

  if (loading) return null;

  if (posts.length === 0) {
    return (
      <div className="py-20 text-center border rounded-3xl bg-white/50 border-[#E4E4EB]">
        <p className="text-[#6E6E82]">No posts published yet. Start writing in the admin area!</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <article
          key={post.id}
          className="group rounded-2xl border border-[#E4E4EB] bg-white p-4 hover:bg-[#F3F3F8] hover:shadow-xl hover:shadow-[#5B3CF5]/5 transition-all duration-300"
        >
          <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-[#F7F7FA] mb-4 border border-[#F3F3F8]">
            {post.coverImage ? (
              <img 
                src={getSEOImageUrl(post.coverImage, post.slug)} 
                alt={getSEOImageAlt(post.title, post.category)} 
                title={post.title}
                className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
            ) : (
                <div className="w-full h-full flex items-center justify-center text-[#E4E4EB]">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                        <circle cx="8.5" cy="8.5" r="1.5"/>
                        <polyline points="21 15 16 10 5 21"/>
                    </svg>
                </div>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#5B3CF5] uppercase tracking-widest mb-2">
            <span>{post.category}</span>
            <span className="w-1 h-1 rounded-full bg-[#E4E4EB]" />
            <span className="text-[#6E6E82]">{format(new Date(post.publishedAt || post.createdAt), 'MMM d, yyyy')}</span>
          </div>

          <h3 className="font-heading text-lg font-extrabold text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors line-clamp-2 min-h-[3.5rem]">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h3>
          
          <p className="mt-2 text-sm text-[#6E6E82] line-clamp-2 h-10">
            {post.excerpt}
          </p>

          <div className="mt-4 pt-4 border-t border-[#F3F3F8] flex items-center justify-between">
            <span className="text-[10px] font-bold text-[#767676]">{post.authorName || 'Malik Farooq'}</span>
            <Link 
              href={`/blog/${post.slug}`}
              className="text-xs font-bold text-[#5B3CF5] flex items-center gap-1 group/btn"
            >
              Read More
              <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
