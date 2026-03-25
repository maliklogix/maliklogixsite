import Link from 'next/link';

export default function ShopifyServicePage() {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <p className="text-xs font-mono tracking-[0.2em] text-[#5B3CF5] uppercase">Shopify & E-commerce</p>
      <h1 className="mt-3 font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
        Shopify Stores That Sell While You Sleep
      </h1>
      <p className="mt-4 text-lg text-[#6E6E82] max-w-2xl">
        We don&apos;t just build Shopify stores—we build conversion-optimized growth engines. From high-performance themes to 
        custom app development and AI-driven personalization, we help you scale your e-commerce brand with efficiency.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">E-commerce Pillars</h2>
          <ol className="mt-4 space-y-3 text-sm text-[#6E6E82] list-decimal pl-4">
            <li>Conversion Optimization: A-B testing and high-performance theme design.</li>
            <li>Custom App Development: Solving complex business needs with custom Shopify apps.</li>
            <li>AI Personalization: Recommending the right product to the right customer.</li>
            <li>Scalability: Ensuring your store can handle 10x traffic during peak seasons.</li>
          </ol>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6">
          <h2 className="font-heading text-xl font-semibold text-[#0D0D12]">What We Deliver</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#6E6E82]">
            <li>• Custom Shopify store design and technical implementation.</li>
            <li>• Seamless migration from other platforms (e.g., WooCommerce, Magento).</li>
            <li>• Post-launch management and continuous conversion rate optimization (CRO).</li>
            <li>• Advanced inventory and fulfillment integrations.</li>
            <li>• 24/7 technical support and site maintenance.</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 rounded-2xl border border-[#E4E4EB] bg-white p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h3 className="font-heading text-lg font-semibold text-[#0D0D12]">Scale your e-commerce brand</h3>
          <p className="mt-2 text-sm text-[#6E6E82]">
            Your store is the heart of your business. Let&apos;s build a foundation that supports your long-term growth.
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex items-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
        >
          Build your Shopify store →
        </Link>
      </div>
    </section>
  );
}
