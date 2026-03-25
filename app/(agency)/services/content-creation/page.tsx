import Link from 'next/link';

export default function ContentCreationServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-mono tracking-[0.2em] text-[#5B3CF5] uppercase">AI Content Creation</p>
      <h1 className="mt-3 font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
        High-Quality Content at AI Velocity
      </h1>
      <p className="mt-4 text-lg text-[#6E6E82] max-w-2xl">
        We help you produce authoritative, SEO-optimized content that actually sounds like your brand. By combining AI 
        efficiency with human editing and strategic insight, we build your domain authority without breaking the budget.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">Content Capabilities</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6E6E82]">
            <li>• AI-assisted blog posts and whitepapers that rank.</li>
            <li>• High-converting social media copy for all platforms.</li>
            <li>• Automated video shorts and reels using AI voice and editing.</li>
            <li>• Product description generation for large catalogs.</li>
            <li>• Dynamic email marketing sequences with personalized AI hooks.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">The Core Idea</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#6E6E82] list-decimal pl-4">
            <li>Establish your specific Brand Voice through AI fine-tuning.</li>
            <li>Automate the research and outlining phase for high accuracy.</li>
            <li>Generate draft content using high-end models (Claude/GPT).</li>
            <li>Final human review and SEO optimization for maximum impact.</li>
          </ol>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#E4E4EB] bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#0D0D12]">Become a thought leader in your industry</h3>
          <p className="mt-2 text-sm text-[#6E6E82]">
            Consistency is the secret to content success. Our AI systems ensure you&apos;re always publishing high-quality insights.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
        >
          Scale your content →
        </Link>
      </div>
    </section>
  );
}
