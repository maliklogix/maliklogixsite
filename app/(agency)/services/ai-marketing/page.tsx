import Link from 'next/link';

export default function AIMarketingServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-mono tracking-[0.2em] text-[#5B3CF5] uppercase">AI Marketing & Strategy</p>
      <h1 className="mt-3 font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
        Marketing That Scales with Data, Not Guesswork
      </h1>
      <p className="mt-4 text-lg text-[#6E6E82] max-w-2xl">
        We move your marketing from gut feeling to algorithmic precision. Using AI for audience segmentation, media buying, 
        and predictive analytics, we find your best customers before your competitors even know they exist.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">Strategic Pillars</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6E6E82]">
            <li>• AI-powered audience discovery and lookalike modeling.</li>
            <li>• Predictive churn analysis and retention strategies.</li>
            <li>• Dynamic creative optimization across ad networks.</li>
            <li>• Multi-touch attribution modeling to prove ROI.</li>
            <li>• Competitor monitoring via automated AI scraping and analysis.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">The Process</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#6E6E82] list-decimal pl-4">
            <li>We audit your historical data to find hidden growth levers.</li>
            <li>We identify high-value customer segments using machine learning.</li>
            <li>We deploy automated campaigns that self-optimize every hour.</li>
            <li>You receive a real-time dashboard tracking CAC, LTV, and ROAS.</li>
          </ol>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#E4E4EB] bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#0D0D12]">Future-proof your growth</h3>
          <p className="mt-2 text-sm text-[#6E6E82]">
            As cookies disappear and privacy laws tighten, AI-driven marketing is the only way to maintain a competitive edge.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
        >
          Scale your marketing →
        </Link>
      </div>
    </section>
  );
}
