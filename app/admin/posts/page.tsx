'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Eye, Clock, FileText, Search, TrendingUp, CopyPlus } from 'lucide-react';
import { getPosts, deletePost, deletePosts, Post } from '@/lib/post-store';
import { format } from 'date-fns';

const STATUS_CONFIG = {
  published: { label: 'Published', bg: 'bg-emerald-500/15', text: 'text-emerald-400', icon: Eye },
  draft: { label: 'Draft', bg: 'bg-amber-500/15', text: 'text-amber-400', icon: FileText },
  scheduled: { label: 'Scheduled', bg: 'bg-sky-500/15', text: 'text-sky-400', icon: Clock },
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | Post['status']>('all');
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState<'updatedAt' | 'title' | 'status'>('updatedAt');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [currentPage, setCurrentPage] = useState(1);
  const POSTS_PER_PAGE = 30;

  const load = async () => {
    setIsLoading(true);
    setPosts(await getPosts());
    setSelectedIds(new Set());
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await deletePost(id);
    load();
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected posts? This cannot be undone.`)) return;
    await deletePosts(Array.from(selectedIds));
    load();
  }

  function toggleSelection(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  const displayed = useMemo(() => {
    const filtered = posts.filter((p) => {
      if (filter !== 'all' && p.status !== filter) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q)
      );
    });

    const sorted = [...filtered];
    if (sortBy === 'title') sorted.sort((a, b) => a.title.localeCompare(b.title));
    else if (sortBy === 'status') sorted.sort((a, b) => a.status.localeCompare(b.status));
    else sorted.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return sorted;
  }, [posts, filter, query, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter, query, sortBy]);

  const totalPages = Math.ceil(displayed.length / POSTS_PER_PAGE);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    return displayed.slice(start, start + POSTS_PER_PAGE);
  }, [displayed, currentPage]);

  function toggleAll() {
    if (selectedIds.size === paginated.length && paginated.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginated.map((p) => p.id)));
    }
  }

  const tabCounts = {
    all: posts.length,
    published: posts.filter((p) => p.status === 'published').length,
    draft: posts.filter((p) => p.status === 'draft').length,
    scheduled: posts.filter((p) => p.status === 'scheduled').length,
  };

  const allSelected = paginated.length > 0 && selectedIds.size >= paginated.length;
  const publishedRatio = posts.length ? Math.round((tabCounts.published / posts.length) * 100) : 0;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Content Dashboard</h1>
          <p className="mt-0.5 text-xs text-[#9999AA]">Full control over post creation, updates, scheduling, and publishing quality.</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 size={16} />
              Delete Selected ({selectedIds.size})
            </button>
          )}
          <Link
            href="/admin/posts/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B3CF5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
          >
            <Plus size={16} />
            New Post
          </Link>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid gap-3 md:grid-cols-4 mb-5">
        <div className="rounded-2xl border border-white/10 bg-[#14141C] p-4">
          <div className="text-[11px] text-[#9999AA]">Total posts</div>
          <div className="text-2xl font-heading font-extrabold text-white mt-1">{tabCounts.all}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#14141C] p-4">
          <div className="text-[11px] text-[#9999AA]">Published ratio</div>
          <div className="text-2xl font-heading font-extrabold text-white mt-1">{publishedRatio}%</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#14141C] p-4">
          <div className="text-[11px] text-[#9999AA]">Draft backlog</div>
          <div className="text-2xl font-heading font-extrabold text-white mt-1">{tabCounts.draft}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#14141C] p-4">
          <div className="text-[11px] text-[#9999AA]">Scheduled queue</div>
          <div className="text-2xl font-heading font-extrabold text-white mt-1">{tabCounts.scheduled}</div>
        </div>
      </div>

      {/* Search + sort */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[260px] flex-1 max-w-xl">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666680]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, slug, category..."
            className="w-full rounded-xl border border-white/10 bg-[#14141C] pl-9 pr-3 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5]"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'updatedAt' | 'title' | 'status')}
          className="rounded-xl border border-white/10 bg-[#14141C] px-3 py-2.5 text-xs text-white"
        >
          <option value="updatedAt">Sort: Recently updated</option>
          <option value="title">Sort: Title (A-Z)</option>
          <option value="status">Sort: Status</option>
        </select>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-white/10 pb-0">
        {(['all', 'published', 'draft', 'scheduled'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setFilter(tab);
              setSelectedIds(new Set());
            }}
            className={`px-4 py-2 text-xs font-medium capitalize border-b-2 -mb-px transition-all ${
              filter === tab
                ? 'border-[#5B3CF5] text-white'
                : 'border-transparent text-[#9999AA] hover:text-white'
            }`}
          >
            {tab === 'all' ? 'All' : STATUS_CONFIG[tab].label}
            <span className="ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full bg-white/10">
              {tabCounts[tab]}
            </span>
          </button>
        ))}
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
            <p className="text-sm text-[#9999AA] mt-4">Loading posts...</p>
        </div>
      ) : displayed.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#14141C] border border-white/10 flex items-center justify-center mb-4">
            <FileText size={24} className="text-[#555568]" />
          </div>
          <p className="text-sm text-[#9999AA]">No matching posts found.</p>
          <Link
            href="/admin/posts/new"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5B3CF5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
          >
            <Plus size={14} />
            Create your first post
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#14141C] overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[40px_1.2fr_120px_160px_120px] gap-4 px-5 py-3 border-b border-white/10 text-[10px] font-semibold text-[#666680] uppercase tracking-wider items-center">
            <div>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="w-4 h-4 rounded appearance-none border border-white/20 bg-white/5 checked:bg-[#5B3CF5] checked:border-[#5B3CF5] transition-colors relative after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[9px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white checked:after:rotate-45 cursor-pointer"
              />
            </div>
            <div>Title</div>
            <div>Status</div>
            <div>Date</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Rows */}
          {paginated.map((post) => {
            const sc = STATUS_CONFIG[post.status];
            const StatusIcon = sc.icon;
            const isSelected = selectedIds.has(post.id);
            const dateStr = post.status === 'scheduled' && post.scheduledAt
              ? `Scheduled: ${format(new Date(post.scheduledAt), 'MMM d, yyyy HH:mm')}`
              : post.publishedAt
              ? format(new Date(post.publishedAt), 'MMM d, yyyy')
              : format(new Date(post.createdAt), 'MMM d, yyyy');

            return (
              <div
                key={post.id}
                className={`grid grid-cols-[40px_1.2fr_120px_160px_120px] gap-4 px-5 py-4 border-b border-white/5 last:border-b-0 items-center transition-colors ${
                  isSelected ? 'bg-[#5B3CF5]/10' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Checkbox */}
                <div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelection(post.id)}
                    className="w-4 h-4 rounded appearance-none border border-white/20 bg-white/5 checked:bg-[#5B3CF5] checked:border-[#5B3CF5] transition-colors relative after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[9px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white checked:after:rotate-45 cursor-pointer"
                  />
                </div>

                {/* Title */}
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{post.title}</div>
                  <div className="text-xs text-[#666680] truncate mt-0.5">/{post.slug}</div>
                  <div className="text-[11px] text-[#9999AA] mt-1 truncate">
                    {post.category || 'Uncategorized'} · Updated {format(new Date(post.updatedAt), 'MMM d, HH:mm')}
                  </div>
                </div>

                {/* Status */}
                <div>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold ${sc.bg} ${sc.text}`}>
                    <StatusIcon size={10} />
                    {sc.label}
                  </span>
                </div>

                {/* Date */}
                <div className="text-xs text-[#9999AA]">{dateStr}</div>

                {/* Actions */}
                <div className="flex items-center gap-2 justify-end">
                  {post.status === 'published' && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="p-1.5 rounded-lg text-[#9999AA] hover:text-white hover:bg-white/10 transition-all"
                      title="View on site"
                    >
                      <Eye size={14} />
                    </Link>
                  )}
                  <Link
                    href={`/admin/posts/${post.id}/edit`}
                    className="p-1.5 rounded-lg text-[#9999AA] hover:text-white hover:bg-white/10 transition-all"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </Link>
                  <Link
                    href={`/admin/posts/new?clone=${post.id}`}
                    className="p-1.5 rounded-lg text-[#9999AA] hover:text-white hover:bg-white/10 transition-all"
                    title="Duplicate"
                  >
                    <CopyPlus size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post.id, post.title)}
                    className="p-1.5 rounded-lg text-[#9999AA] hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
          
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-white/5 bg-[#14141C] p-4">
              <div className="text-xs text-[#9999AA]">
                Showing {(currentPage - 1) * POSTS_PER_PAGE + 1} to {Math.min(currentPage * POSTS_PER_PAGE, displayed.length)} of {displayed.length} posts
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-white disabled:opacity-30 transition-colors hover:bg-white/10"
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).filter(p => p === 1 || p === totalPages || Math.abs(currentPage - p) <= 2).map((page, i, arr) => {
                    const isGap = i > 0 && page - arr[i - 1] > 1;
                    return (
                      <div key={page} className="flex items-center">
                        {isGap && <span className="text-[#666680] px-1 text-xs">...</span>}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`min-w-[28px] h-[28px] rounded-lg text-xs font-semibold transition-colors ${
                            currentPage === page 
                              ? 'bg-[#5B3CF5] text-white border border-[#5B3CF5]' 
                              : 'text-[#9999AA] hover:text-white hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-xs font-semibold text-white disabled:opacity-30 transition-colors hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
