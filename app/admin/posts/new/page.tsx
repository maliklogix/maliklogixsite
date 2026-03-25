'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Save, Send, Clock, Eye, Trash2, Image as ImageIcon, Link as LinkIcon, Settings2 } from 'lucide-react';
import Link from 'next/link';
import { generateId, getPost, savePost, slugify, Post, PostStatus, PostContentFormat } from '@/lib/post-store';
import { toast } from 'sonner';

// Dynamically import the MD editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

export default function AdminNewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [content, setContent] = useState<string | undefined>('## Start writing...');
  const [contentFormat, setContentFormat] = useState<PostContentFormat>('markdown');
  const [category, setCategory] = useState('AI Automation');
  const [authorName, setAuthorName] = useState('Malik Farooq');
  const [readTimeMins, setReadTimeMins] = useState(4);
  const [tagsInput, setTagsInput] = useState('');
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [status, setStatus] = useState<PostStatus>('draft');
  const [scheduledAt, setScheduledAt] = useState('');
  const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 16));
  const [isSaving, setIsSaving] = useState(false);

  const BLOG_CATEGORIES = [
    'AI Automation',
    'AI Business',
    'AI Coding',
    'AI Development',
    'AI E-Commerce',
    'AI Future',
    'AI News',
    'AI Resources',
    'AI SEO',
    'AI Tools',
    'Business Mastery',
    'Case Studies',
    'Content Creation',
    'Digital Strategy',
    'Growth Marketing',
    'LLMs',
    'Marketing',
    'OpenAI',
    'Productivity',
    'Technology'
  ];

  async function handleCoverUpload(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === 'string') {
        setCoverImage(result);
        toast.success('Thumbnail selected');
      }
    };
    reader.readAsDataURL(file);
  }

  // Auto-generate slug from title
  useEffect(() => {
    if (title) {
      setSlug(slugify(title));
    }
  }, [title]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const cloneId = new URLSearchParams(window.location.search).get('clone');
    if (!cloneId) return;
    getPost(cloneId).then(original => {
      if (!original) return;

      setTitle(`${original.title} (Copy)`);
      setSlug(slugify(`${original.title}-copy`));
      setExcerpt(original.excerpt);
      setCoverImage(original.coverImage);
      setContent(original.content);
      setCategory(original.category);
      setAuthorName(original.authorName || 'Malik Farooq');
      setReadTimeMins(original.readTimeMins || 4);
      setTagsInput((original.tags || []).join(', '));
      setSeoTitle(original.seoTitle || '');
      setSeoDescription(original.seoDescription || '');
      setContentFormat(original.contentFormat || 'markdown');
      setStatus('draft');
      toast.success('Post cloned. Update details and save.');
    });
  }, []);

  async function handleSave(newStatus?: PostStatus) {
    if (!title) {
      toast.error('Please enter a title');
      return;
    }

    setIsSaving(true);
    const finalStatus = newStatus || status;

    const post: Post = {
      id: generateId(),
      title,
      slug: slug || slugify(title),
      excerpt,
      coverImage,
      content: content || '',
      contentFormat,
      authorName,
      readTimeMins,
      seoTitle: seoTitle || undefined,
      seoDescription: seoDescription || undefined,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean),
      category,
      status: finalStatus,
      scheduledAt: finalStatus === 'scheduled' ? scheduledAt : undefined,
      publishedAt: finalStatus === 'published' ? new Date(publishedAt).toISOString() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      // Small artificial delay for UX
      await new Promise(r => setTimeout(r, 400));
      await savePost(post);
      toast.success(
        finalStatus === 'published' ? 'Post published!' : 
        finalStatus === 'scheduled' ? 'Post scheduled!' : 'Draft saved'
      );
      // After publishing, jump to the public blog page.
      if (finalStatus === 'published') {
        router.push(`/blog/${post.slug}`);
      } else {
        router.push('/admin/posts');
      }
    } catch (e) {
      toast.error('Failed to save post');
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-[#0D0D12] overflow-hidden">
      {/* Editor Header */}
      <header className="flex-none z-50 bg-[#0E0E18]/80 backdrop-blur-md border-b border-white/10 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href="/admin/posts" 
            className="p-2 rounded-xl text-[#9999AA] hover:text-white hover:bg-white/5 transition-all"
          >
            <ChevronLeft size={20} />
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <div>
            <span className="text-[10px] font-bold text-[#5B3CF5] uppercase tracking-widest block leading-none mb-1">
              New Post
            </span>
            <h1 className="text-sm font-semibold text-white truncate max-w-[200px]">
              {title || 'Untitled Post'}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave('draft')}
            disabled={isSaving}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-[#9999AA] hover:text-white hover:bg-white/5 transition-all flex items-center gap-2"
          >
            <Save size={14} />
            Save Draft
          </button>
          
          <button
            onClick={() => handleSave('published')}
            disabled={isSaving}
            className="px-6 py-2 rounded-xl bg-[#5B3CF5] text-white text-sm font-bold shadow-lg shadow-[#5B3CF5]/20 hover:bg-[#7C5CFA] transition-all flex items-center gap-2"
          >
            <Send size={14} />
            Publish
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Main Editor Area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-10 hide-scrollbar bg-[#0D0D12]">
          <div className="max-w-4xl mx-auto space-y-8 pb-32">
            {/* Cover Image Placeholder */}
            {coverImage ? (
              <div className="relative aspect-[21/9] rounded-3xl overflow-hidden group shadow-2xl border border-white/5">
                <img src={coverImage} alt="Cover" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                   <button 
                    onClick={() => setCoverImage('')}
                    className="p-3 bg-red-500 rounded-2xl text-white shadow-xl hover:scale-110 transition-transform"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <label className="w-full aspect-[21/9] rounded-3xl border-2 border-dashed border-white/5 bg-white/[0.02] flex flex-col items-center justify-center text-[#666680] hover:border-[#5B3CF5]/50 hover:bg-[#5B3CF5]/5 transition-all cursor-pointer group">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) void handleCoverUpload(file);
                  }}
                />
                <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon size={32} className="text-[#5B3CF5]" />
                </div>
                <span className="text-sm font-bold text-white mb-1">Select Thumbnail</span>
                <span className="text-xs text-[#666680]">Recommended: 1200x630 (PNG, JPG)</span>
              </label>
            )}

            {/* Title Input */}
            <input
              type="text"
              placeholder="Enter a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent border-none text-4xl md:text-5xl font-extrabold text-white placeholder-white/10 focus:ring-0 px-0 selection:bg-[#5B3CF5]/30 mt-4 outline-none"
            />

            {/* Subtitle / Excerpt */}
            <textarea
              placeholder="What's this post about? (Short summary)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-transparent border-none text-xl text-[#9999AA] placeholder-white/5 focus:ring-0 px-0 resize-none h-16 outline-none"
            />

            <div className="h-px bg-white/10" />

            {/* Content Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
                  <button
                    type="button"
                    onClick={() => setContentFormat('markdown')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${contentFormat === 'markdown' ? 'bg-[#5B3CF5] text-white shadow-lg' : 'text-[#666680] hover:text-[#9999AA]'}`}
                  >
                    Markdown
                  </button>
                  <button
                    type="button"
                    onClick={() => setContentFormat('html')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${contentFormat === 'html' ? 'bg-[#5B3CF5] text-white shadow-lg' : 'text-[#666680] hover:text-[#9999AA]'}`}
                  >
                    HTML
                  </button>
                </div>
                <div className="text-[10px] font-bold text-[#666680] uppercase tracking-widest flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Preview Active
                </div>
              </div>

              {contentFormat === 'markdown' ? (
                <div className="markdown-editor rounded-2xl overflow-hidden border border-white/5" data-color-mode="dark">
                  <MDEditor
                    value={content}
                    onChange={setContent}
                    preview="edit"
                    height={600}
                    style={{ backgroundColor: '#11111A', border: 'none' }}
                    textareaProps={{
                      placeholder: 'Start writing your story in Markdown...'
                    }}
                  />
                </div>
              ) : (
                <textarea
                  value={content || ''}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full min-h-[600px] rounded-2xl border border-white/10 bg-[#11111A] px-6 py-6 text-sm text-white font-mono outline-none focus:border-[#5B3CF5] transition-all"
                  placeholder="<h1>Your heading</h1>
<p>Your paragraph...</p>"
                />
              )}
            </div>
          </div>
        </main>

        {/* Desktop Permanent Right Sidebar */}
        <aside className="w-80 flex-none border-l border-white/10 bg-[#0E0E18] overflow-y-auto hide-scrollbar p-6">
          <h2 className="text-xs font-bold text-white mb-6 flex items-center gap-2">
            <Settings2 size={16} className="text-[#5B3CF5]" />
            POST METADATA
          </h2>

          <div className="space-y-8">
            {/* Status & Schedule */}
            <div className="space-y-4">
              <label className="text-[10px] font-bold text-[#666680] uppercase tracking-wider block">Visibility Status</label>
              
              <div className="grid grid-cols-2 gap-2 p-1 bg-white/5 rounded-2xl border border-white/5">
                <button
                  onClick={() => setStatus('published')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${status === 'published' ? 'bg-[#5B3CF5] text-white shadow-lg' : 'text-[#666680] hover:text-[#9999AA]'}`}
                >
                  <Eye size={14} />
                  <span className="text-[10px] font-bold uppercase">Public</span>
                </button>
                <button
                  onClick={() => setStatus('scheduled')}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl transition-all ${status === 'scheduled' ? 'bg-sky-500 text-white shadow-lg' : 'text-[#666680] hover:text-[#9999AA]'}`}
                >
                  <Clock size={14} />
                  <span className="text-[10px] font-bold uppercase">Schedule</span>
                </button>
              </div>

              {status === 'scheduled' ? (
                <div className="space-y-2 animate-in fade-in slide-in-from-top-2">
                  <label className="text-[9px] font-bold text-[#666680] uppercase tracking-tighter">Scheduled Date</label>
                  <input
                    type="datetime-local"
                    value={scheduledAt}
                    onChange={(e) => setScheduledAt(e.target.value)}
                    className="w-full bg-[#14141C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#5B3CF5] transition-all outline-none"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label className="text-[9px] font-bold text-[#666680] uppercase tracking-tighter">Publication Date</label>
                   <input
                    type="datetime-local"
                    value={publishedAt}
                    onChange={(e) => setPublishedAt(e.target.value)}
                    className="w-full bg-[#14141C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#5B3CF5] transition-all outline-none"
                  />
                </div>
              )}
            </div>

             {/* Category */}
             <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#666680] uppercase tracking-wider block">Content Category</label>
              <select 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#14141C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#5B3CF5] transition-all appearance-none cursor-pointer outline-none"
              >
                {BLOG_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Author */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#666680] uppercase tracking-wider block">Author Handle</label>
              <div className="relative">
                 <input
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-[#14141C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#5B3CF5] transition-all outline-none"
                />
              </div>
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#666680] uppercase tracking-wider block">Permalink Slug</label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666680]">
                  <LinkIcon size={12} />
                </div>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full bg-[#14141C] border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-[11px] text-[#9999AA] focus:border-[#5B3CF5] transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#666680] uppercase tracking-wider block">Estimated Read Time</label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min={1}
                  value={readTimeMins}
                  onChange={(e) => setReadTimeMins(Math.max(1, Number(e.target.value) || 1))}
                  className="w-20 bg-[#14141C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#5B3CF5] transition-all outline-none"
                />
                <span className="text-xs text-[#666680]">minutes</span>
              </div>
            </div>

            <div className="h-px bg-white/5" />

            <div className="space-y-4">
              <h3 className="text-[9px] font-extrabold text-[#5B3CF5] uppercase tracking-widest">Search Optimization</h3>
              
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#666680] uppercase tracking-wider block">SEO Title</label>
                <input
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title}
                  className="w-full bg-[#14141C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#5B3CF5] transition-all outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-[#666680] uppercase tracking-wider block">SEO Meta Meta</label>
                <textarea
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder={excerpt}
                  className="w-full bg-[#14141C] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:border-[#5B3CF5] transition-all min-h-[100px] outline-none resize-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-[#666680] uppercase tracking-wider block">Keywords (Tags)</label>
              <input
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-[#14141C] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:border-[#5B3CF5] transition-all outline-none"
                placeholder="ai, viral, tech..."
              />
            </div>

            {/* Delete/Discard */}
            <div className="pt-6 border-t border-white/5">
              <button 
                onClick={() => {
                  if(confirm('Discard this draft?')) router.push('/admin/posts');
                }}
                className="w-full py-3 rounded-2xl text-xs font-bold text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={14} />
                Discard Post
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
