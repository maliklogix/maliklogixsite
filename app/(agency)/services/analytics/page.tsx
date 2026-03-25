import Link from 'next/link';

export default function AnalyticsServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-mono tracking-[0.2em] text-[#5B3CF5] uppercase">Analytics & Intelligence</p>
      <h1 className="mt-3 font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
        See Your Data Clearly, Act Faster
      </h1>
      <p className="mt-4 text-lg text-[#6E6E82] max-w-2xl">
        Most companies are drowning in data but starving for insights. We help you build a source of truth that 
        tells you exactly what&apos;s happening in your business and why.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">Our Data Pillars</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#6E6E82] list-decimal pl-4">
            <li>Standardization: Unify data from Google Ads, Shopify, CRM, and Stripe.</li>
            <li>Visualization: Custom dashboards that filter out noise and emphasize KPIs.</li>
            <li>Attribution: Modeling the customer journey to identify your best channels.</li>
            <li>Intelligence: AI-generated reports that provide context and next steps.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">What You&apos;ll Know</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6E6E82]">
            <li>• True Customer Acquisition Cost (CAC) by channel.</li>
            <li>• Lifetime Value (LTV) cohorts and predictive behavior.</li>
            <li>• Inventory and supply chain forecasting using AI.</li>
            <li>• Website engagement and conversion funnel leakage points.</li>
            <li>• Real-time profitability after all costs and shipping.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#E4E4EB] bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#0D0D12]">Get a 360-degree view of your business</h3>
          <p className="mt-2 text-sm text-[#6E6E82]">
            Stop making decisions on incomplete data. Build a dashboard that reflects your reality.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
        >
          Build your dashboard →
        </Link>
      </div>
    </section>
  );
}
