import { getMDXPostBySlug, getPublishedPostSlugs, getRecentPublishedSummaries } from '@/lib/mdx-store';
import { format } from 'date-fns';
import { ArrowLeft, Calendar, User, Twitter, Linkedin, Link as LinkIcon, Github, Youtube } from 'lucide-react';
import { getSiteSettings } from '@/lib/site-settings';
import Link from 'next/link';
import { marked } from 'marked';
import NewsletterSignup from './NewsletterSignup';
import { getSEOImageUrl, getSEOImageAlt } from '@/lib/seo-utils';
import type { Metadata } from 'next';

export const revalidate = 120;

export async function generateStaticParams() {
  const slugs = await getPublishedPostSlugs();
  return slugs.map((row) => ({
    slug: row.slug,
  }));
}

export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const post = await getMDXPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found | MalikLogix',
      description: 'The blog post you are looking for does not exist.',
    };
  }

  const titleBase = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt || '';
  const ogImage = post.coverImage ? getSEOImageUrl(post.coverImage, post.slug) : '/ml-logo.png?v=4';
  const ogAlt = getSEOImageAlt(post.title, post.category);

  const title = `${titleBase} | MalikLogix`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: ogImage, alt: ogAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

// Next.js server component parameters
export default async function BlogPostDetailPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await getMDXPostBySlug(params.slug);
  const settings = await getSiteSettings();

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Post Not Found</h1>
        <p className="text-[#6E6E82] mb-8">The post you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        <Link 
          href="/blog"
          className="px-6 py-3 rounded-xl bg-[#5B3CF5] text-white font-bold hover:bg-[#7C5CFA] transition-all"
        >
          Back to Blog
        </Link>
      </div>
    );
  }

  // Parse markdown content
  const raw = post.content || '';
  const contentHtml = post.contentFormat === 'html' ? raw : (marked.parse(raw) as string);

  const recentPosts = await getRecentPublishedSummaries(post.slug, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-16 lg:pt-8 lg:pb-24">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-bold text-[#6E6E82] mb-4" aria-label="Breadcrumb">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-1 hover:text-[#5B3CF5] transition-colors group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>
        <span className="text-[#E4E4EB]">/</span>
        <span className="text-[#0D0D12] uppercase tracking-wider">{post.category}</span>
        <span className="text-[#E4E4EB]">/</span>
        <span>{post.readTimeMins || 4} min read</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0D0D12] mb-6 leading-tight tracking-tight">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-6 py-5 border-y border-[#F3F3F8]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#5B3CF5] border-2 border-white shadow-lg overflow-hidden flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0D0D12]">{post.authorName || 'Malik Farooq'}</div>
              <div className="text-xs text-[#6E6E82]">Founder & AI Engineer</div>
            </div>
          </div>

          <div className="h-8 w-px bg-[#F3F3F8] hidden sm:block" />

          <div className="flex items-center gap-4 text-xs text-[#6E6E82]">
            <div className="flex items-center gap-1.5">
              <Calendar size={14} />
              {format(new Date(post.publishedAt || post.createdAt), 'MMMM d, yyyy')}
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.coverImage && (
        <div className="mb-12 rounded-[2rem] overflow-hidden border border-[#E4E4EB] shadow-2xl shadow-[#5B3CF5]/5">
          <img 
            src={getSEOImageUrl(post.coverImage, post.slug)} 
            alt={getSEOImageAlt(post.title, post.category)} 
            title={post.title}
            className="w-full h-auto" 
          />
        </div>
      )}

      {/* Content Body */}
      <div className="flex flex-col lg:flex-row gap-12 relative">
        {/* Follow Sidebar (Floating on Desktop) */}
        <aside className="lg:w-16 flex lg:flex-col items-center gap-4 py-8 lg:sticky lg:top-32 h-fit">
          <div className="text-[10px] font-bold text-[#9999AA] uppercase tracking-widest lg:rotate-180 lg:[writing-mode:vertical-lr] mb-2 hidden lg:block">
            Follow
          </div>
          {settings.twitter_url && (
            <a href={settings.twitter_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#E4E4EB] flex items-center justify-center text-[#6E6E82] hover:bg-[#5B3CF5] hover:text-white hover:border-[#5B3CF5] transition-all">
              <Twitter size={16} />
            </a>
          )}
          {settings.linkedin_url && (
            <a href={settings.linkedin_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#E4E4EB] flex items-center justify-center text-[#6E6E82] hover:bg-[#5B3CF5] hover:text-white hover:border-[#5B3CF5] transition-all">
              <Linkedin size={16} />
            </a>
          )}
          {settings.github_url && (
            <a href={settings.github_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#E4E4EB] flex items-center justify-center text-[#6E6E82] hover:bg-[#5B3CF5] hover:text-white hover:border-[#5B3CF5] transition-all">
              <Github size={16} />
            </a>
          )}
          {settings.youtube_url && (
            <a href={settings.youtube_url} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#E4E4EB] flex items-center justify-center text-[#6E6E82] hover:bg-[#5B3CF5] hover:text-white hover:border-[#5B3CF5] transition-all">
              <Youtube size={16} />
            </a>
          )}
          <button className="w-10 h-10 rounded-full border border-[#E4E4EB] flex items-center justify-center text-[#6E6E82] hover:bg-[#00C896] hover:text-white hover:border-[#00C896] transition-all" aria-label="Copy Link">
            <LinkIcon size={16} />
          </button>
        </aside>

        {/* Article Text */}
        <div className="flex-1 rounded-[2.5rem] border border-[#E4E4EB] bg-white p-6 sm:p-10 lg:p-16 shadow-2xl shadow-[#5B3CF5]/5 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#5B3CF5] via-[#00C896] to-[#5B3CF5] opacity-80" />
          <div className="prose prose-lg prose-slate max-w-none 
            prose-headings:font-heading prose-headings:font-extrabold prose-headings:text-[#0D0D12] prose-headings:tracking-tight 
            prose-p:text-[#6E6E82] prose-p:leading-relaxed 
            prose-a:text-[#5B3CF5] hover:prose-a:text-[#7C5CFA] prose-a:font-bold prose-a:transition-colors prose-a:underline-offset-4 
            prose-blockquote:border-l-4 prose-blockquote:border-[#5B3CF5] prose-blockquote:bg-[#F7F7FA] prose-blockquote:p-6 prose-blockquote:rounded-r-2xl prose-blockquote:text-[#0D0D12] prose-blockquote:font-medium prose-blockquote:italic 
            prose-img:rounded-3xl prose-img:shadow-xl prose-img:border prose-img:border-[#E4E4EB] 
            prose-ul:list-none prose-ul:pl-0
            prose-ol:list-decimal prose-ol:marker:text-[#5B3CF5] prose-ol:marker:font-bold
            prose-li:text-[#6E6E82] prose-li:my-2 prose-li:relative prose-li:pl-10
            prose-ul:prose-li:before:content-[''] prose-ul:prose-li:before:absolute prose-ul:prose-li:before:left-0 prose-ul:prose-li:before:top-[0.2em] prose-ul:prose-li:before:w-6 prose-ul:prose-li:before:h-6 prose-ul:prose-li:before:rounded-lg prose-ul:prose-li:before:bg-[#5B3CF5]/10 prose-ul:prose-li:before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNUIzQ0Y1IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PHBvbHlsaW5lIHBvaW50cz0iMjAgNiA5IDE3IDQgMTIiPjwvcG9seWxpbmU+PC9zdmc+')] prose-ul:prose-li:before:bg-[length:14px_14px] prose-ul:prose-li:before:bg-center prose-ul:prose-li:before:bg-no-repeat
            prose-li:hover:before:bg-[#5B3CF5]/20 prose-li:before:transition-all
            prose-strong:text-[#0D0D12] 
            prose-table:border prose-table:border-[#E4E4EB] prose-table:rounded-xl prose-th:bg-[#F7F7FA] prose-th:p-4 prose-td:p-4
            prose-code:text-[#5B3CF5] prose-code:bg-[#F0ECFF] prose-code:px-2 prose-code:py-1 prose-code:rounded-lg prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none 
            prose-pre:bg-[#0D0D12] prose-pre:border prose-pre:border-[#2C2C35] prose-pre:shadow-2xl prose-pre:rounded-2xl">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </div>
        </div>
      </div>

      <NewsletterSignup />

      {/* Recent Posts Section */}
      {recentPosts.length > 0 && (
        <section className="mt-20 pt-12 border-t border-[#E4E4EB]">
          <h2 className="text-2xl font-extrabold text-[#0D0D12] mb-8">Recent Posts</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {recentPosts.map((recentPost) => (
              <article
                key={recentPost.id}
                className="group rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-4 hover:bg-white hover:shadow-xl hover:shadow-[#5B3CF5]/5 transition-all duration-300 flex flex-col"
              >
                <Link href={`/blog/${recentPost.slug}`} className="block aspect-[16/9] w-full overflow-hidden rounded-xl bg-white mb-4">
                  {recentPost.coverImage ? (
                    <img 
                      src={getSEOImageUrl(recentPost.coverImage, recentPost.slug)} 
                      alt={getSEOImageAlt(recentPost.title, recentPost.category)} 
                      title={recentPost.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#E4E4EB] bg-white">
                      <Calendar size={24} />
                    </div>
                  )}
                </Link>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#5B3CF5] uppercase tracking-widest mb-2">
                  <span>{recentPost.category}</span>
                  <span className="w-1 h-1 rounded-full bg-[#E4E4EB]" />
                  <span className="text-[#6E6E82]">{recentPost.readTimeMins || 4} min</span>
                </div>
                <h3 className="font-heading text-lg font-bold text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors line-clamp-2">
                  <Link href={`/blog/${recentPost.slug}`}>
                    {recentPost.title}
                  </Link>
                </h3>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
