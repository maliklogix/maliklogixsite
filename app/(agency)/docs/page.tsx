import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Docs — Learn AI Digital Marketing',
  description:
    'Free guides and starting points to learn AI digital marketing on your own: SEO, content, automation, and measurement—with links to our blog, tools, and newsletter.',
  openGraph: {
    title: 'Learn AI Digital Marketing | MalikLogix Docs',
    description:
      'Self-serve resources to understand AI digital marketing, from search to automation and reporting.',
  },
};

const topics = [
  {
    title: 'Search & intent',
    body: 'Learn how modern SEO connects to buyer intent, topical authority, and content that ranks for the right queries—not just traffic.',
  },
  {
    title: 'AI-assisted content',
    body: 'Use AI to speed up research, outlines, and drafts while keeping brand voice, accuracy, and editorial standards.',
  },
  {
    title: 'Automation & nurture',
    body: 'Map simple automations (email, CRM, chat) so leads get timely follow-up without losing a human touch.',
  },
  {
    title: 'Measurement',
    body: 'Focus on metrics that tie to revenue: conversions, pipeline, and channel efficiency—not vanity alone.',
  },
] as const;

export default function DocsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header>
        <p className="text-xs font-semibold uppercase tracking-wider text-[#5B3CF5]">Docs</p>
        <h1 className="mt-2 font-heading text-3xl font-extrabold tracking-tight text-[#0D0D12] sm:text-4xl">
          Want to learn AI digital marketing on your own?
        </h1>
        <p className="mt-4 text-base leading-relaxed text-[#6E6E82]">
          This page is your starting point: clear concepts, practical focus, and links to deeper reading on our blog,
          free tools, and newsletter. No login required.
        </p>
      </header>

      <section className="mt-12" aria-labelledby="docs-courses-heading">
        <h2 id="docs-courses-heading" className="font-heading text-xl font-bold text-[#0D0D12]">
          Courses & Paths
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/docs/ai-digital-marketing" className="group flex flex-col justify-between rounded-2xl border border-[#E4E4EB] bg-white p-5 shadow-sm hover:border-[#5B3CF5]/50 hover:shadow-md transition-all">
            <div>
              <div className="mb-3 inline-flex items-center rounded-lg bg-[#5B3CF5]/10 px-2 py-1 text-xs font-semibold text-[#5B3CF5]">
                Full Course
              </div>
              <h3 className="font-heading text-lg font-bold text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors">AI Digital Marketing</h3>
              <p className="mt-2 text-sm text-[#6E6E82]">Learn how AI reshapes digital marketing strategies, from segmentation to predictive analytics.</p>
            </div>
            <div className="mt-6 text-sm font-semibold text-[#5B3CF5]">View Outline →</div>
          </Link>
          
          <Link href="/docs/openclaw-ai" className="group flex flex-col justify-between rounded-2xl border border-[#E4E4EB] bg-[#FAFAFC] p-5 shadow-sm hover:border-[#5B3CF5]/50 hover:shadow-md transition-all">
            <div>
              <div className="mb-3 inline-flex items-center rounded-lg border border-[#E4E4EB] bg-white px-2 py-1 text-xs font-semibold text-[#0D0D12] gap-1.5">
                <span className="text-sm">🦞</span> OpenClaw
              </div>
              <h3 className="font-heading text-lg font-bold text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors">OpenClaw AI Gateway</h3>
              <p className="mt-2 text-sm text-[#6E6E82]">Deploy self-hosted, multi-channel AI agents across WhatsApp, Telegram, and Discord from your pocket.</p>
            </div>
            <div className="mt-6 text-sm font-semibold text-[#5B3CF5]">View Outline →</div>
          </Link>

          <div className="group flex flex-col justify-between rounded-2xl border border-[#E4E4EB] bg-white p-5 shadow-sm opacity-70 cursor-not-allowed">
            <div>
              <div className="mb-3 inline-flex items-center rounded-lg bg-[#E4E4EB] px-2 py-1 text-xs font-semibold text-[#6E6E82]">
                Coming Soon
              </div>
              <h3 className="font-heading text-lg font-bold text-[#0D0D12]">Vibe Coding</h3>
              <p className="mt-2 text-sm text-[#6E6E82]">Mastering the art of prompt engineering and agentic coding for rapid application development.</p>
            </div>
            <div className="mt-6 text-sm font-semibold text-[#6E6E82]">In Production</div>
          </div>
        </div>
      </section>

      <section className="mt-12" aria-labelledby="docs-topics-heading">
        <h2 id="docs-topics-heading" className="font-heading text-xl font-bold text-[#0D0D12]">
          Core topics
        </h2>
        <ul className="mt-6 space-y-4">
          {topics.map((topic) => (
            <li
              key={topic.title}
              className="rounded-2xl border border-[#E4E4EB] bg-white p-5 shadow-sm"
            >
              <h3 className="font-heading text-base font-semibold text-[#0D0D12]">{topic.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6E6E82]">{topic.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 rounded-2xl border border-[#E4E4EB] bg-[#FAFAFC] p-6 sm:p-8" aria-labelledby="docs-next-heading">
        <h2 id="docs-next-heading" className="font-heading text-lg font-bold text-[#0D0D12]">
          Go deeper
        </h2>
        <p className="mt-2 text-sm text-[#6E6E82]">
          Use these alongside this overview—they stay updated as we publish new guides and experiments.
        </p>
        <nav className="mt-5 flex flex-col gap-3 text-sm" aria-label="Related MalikLogix resources">
          <Link href="/blog" className="font-medium text-[#5B3CF5] underline-offset-4 hover:underline">
            Blog — articles & tutorials
          </Link>
          <Link href="/tools" className="font-medium text-[#5B3CF5] underline-offset-4 hover:underline">
            Free tools — calculators & analyzers
          </Link>
          <Link href="/subscribe" className="font-medium text-[#5B3CF5] underline-offset-4 hover:underline">
            Newsletter — short weekly insights
          </Link>
          <Link href="/contact" className="font-medium text-[#5B3CF5] underline-offset-4 hover:underline">
            Contact — work with MalikLogix directly
          </Link>
        </nav>
      </section>

      <p className="mt-10 text-center text-xs text-[#6E6E82] sm:text-left">
        <Link href="/" className="text-[#5B3CF5] hover:underline">
          ← Back to home
        </Link>
      </p>
    </article>
  );
}
