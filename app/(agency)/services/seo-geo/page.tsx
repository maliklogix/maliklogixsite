import Link from 'next/link';

export default function SEOGeoServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-mono tracking-[0.2em] text-[#5B3CF5] uppercase">Technical SEO & Geo-Targeting</p>
      <h1 className="mt-3 font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
        Dominate Search and Your Local Market
      </h1>
      <p className="mt-4 text-lg text-[#6E6E82] max-w-2xl">
        We help you rank for the keywords that actually convert. By combining technical SEO with local/map-based strategies 
        and AI-driven content clusters, we ensure your business is the first thing customers see when they search.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">SEO Focus Areas</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6E6E82]">
            <li>• Technical SEO audits and Core Web Vital optimization.</li>
            <li>• AI-driven content clustering and keyword research.</li>
            <li>• Local SEO and GMB/Map-based visibility strategies.</li>
            <li>• High-quality backlink building through authoritative PR.</li>
            <li>• Detailed rank tracking and competitor movement analysis.</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">Our Process</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#6E6E82] list-decimal pl-4">
            <li>We audit your site&apos;s technical structure and search visibility.</li>
            <li>We research your competitors and find lucrative keyword gaps.</li>
            <li>We create an &quot;AI-first&quot; content roadmap for continuous growth.</li>
            <li>We track every ranking, click, and conversion to prove ROI.</li>
          </ol>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#E4E4EB] bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#0D0D12]">Stop hiding on page two</h3>
          <p className="mt-2 text-sm text-[#6E6E82]">
            Search is the most efficient way to capture intent. Let&apos;s build a presence that customers can&apos;t miss.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
        >
          Talk about SEO →
        </Link>
      </div>
    </section>
  );
}
