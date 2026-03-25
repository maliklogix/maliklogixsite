import Link from 'next/link';

export default function NewsletterArchivePage() {
  // Placeholder until Supabase-backed archive grid + pagination is implemented.
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-3xl font-extrabold text-[#0D0D12]">MalikLogix AI Newsletter</h1>
      <p className="mt-2 text-[#6E6E82] max-w-2xl">
        Learn AI marketing in 4 minutes/day. Get easy, actionable tips to 10x your growth with AI.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {['xAI Got It Wrong', 'AI SEO That Wins', 'Automation for Growth'].map((title, idx) => {
          const slug = ['xai-got-it-wrong', 'ai-seo-that-wins', 'automation-for-growth'][idx] ?? `post-${idx + 1}`;
          return (
            <div key={slug} className="rounded-2xl border border-[#E4E4EB] p-5 bg-white">
              <div className="text-xs text-[#6E6E82]">Mar {idx + 17}, 2026</div>
              <h2 className="mt-2 font-heading font-bold text-lg">
                <Link href={`/newsletter/${slug}`} className="hover:text-[#5B3CF5] transition-colors">
                  {title}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-[#6E6E82]">Subtitle/excerpt preview goes here.</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <Link href="/subscribe" className="inline-flex items-center rounded-full bg-[#5B3CF5] px-5 py-2 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors">
          Join Free Now →
        </Link>
      </div>
    </div>
  );
}

