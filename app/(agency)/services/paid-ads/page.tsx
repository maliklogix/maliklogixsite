import Link from 'next/link';

export default function PaidAdsServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-mono tracking-[0.2em] text-[#5B3CF5] uppercase">Performance Paid Ads</p>
      <h1 className="mt-3 font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
        Ads That Work While You Sleep
      </h1>
      <p className="mt-4 text-lg text-[#6E6E82] max-w-2xl">
        We manage your Google, Meta, and LinkedIn ad spend with a focus on one thing: ROI. By combining high-impact 
        creative with AI-managed bidding and audience refined, we ensure every dollar spent is an investment in growth.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">Our Methodology</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#6E6E82] list-decimal pl-4">
            <li>Testing at Scale: High-velocity creative testing to find winners fast.</li>
            <li>AI-Driven Bidding: Algorithmic budget management for maximum efficiency.</li>
            <li>Hyper-Targeting: Deep audience research and narrow demographic focus.</li>
            <li>Conversion Focus: Landing page optimization to maximize every click.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">What We Manage</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6E6E82]">
            <li>• Meta Ads (Facebook & Instagram) with Advantage+ optimization.</li>
            <li>• Google Search, Performance Max, and YouTube Ads.</li>
            <li>• LinkedIn Ads for B2B lead generation and brand awareness.</li>
            <li>• Re-targeting campaigns that bring back lost visitors.</li>
            <li>• Detailed weekly reporting on CPA, ROAS, and profit.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#E4E4EB] bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#0D0D12]">Maximize your marketing budget</h3>
          <p className="mt-2 text-sm text-[#6E6E82]">
            Stop burning money on ineffective campaigns. Let&apos;s build a paid strategy that scales predictably.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
        >
          Talk about your ads →
        </Link>
      </div>
    </section>
  );
}
