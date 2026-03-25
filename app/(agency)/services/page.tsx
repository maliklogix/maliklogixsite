export default function ServicesPage() {
  const services = [
    { href: '/services/ai-marketing', title: 'AI Marketing', description: 'AI-powered campaigns that outlearn your competitors every day.' },
    { href: '/services/automation', title: 'Automation', description: 'Replace 80% of repetitive work with smart workflows and bots.' },
    { href: '/services/content-creation', title: 'Content AI', description: 'High-velocity content that still reads like your brand.' },
    { href: '/services/seo-geo', title: 'SEO & GEO', description: 'Rank in Google, AI Overviews, ChatGPT, Perplexity, and Claude.' },
    { href: '/services/analytics', title: 'Analytics', description: 'One AI growth dashboard instead of 12 disconnected tools.' },
    { href: '/services/ai-chatbots', title: 'AI Chatbots', description: '24/7 chat that actually understands your customers.' },
    { href: '/services/shopify', title: 'Shopify AI', description: 'Upsells, bundles, and flows that grow AOV on autopilot.' },
    { href: '/services/web-development', title: 'Web Development', description: 'Fast, modern funnels and sites built with Next.js.' },
    { href: '/services/paid-ads', title: 'Paid Ads AI', description: 'AI-optimized ad creative and budgets across Meta & Google.' },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
        AI Services Built Around Results
      </h1>
      <p className="mt-4 max-w-2xl text-[#6E6E82]">
        Every engagement starts with a simple question: what business outcome are we optimizing for?
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <a
            key={service.href}
            href={service.href}
            className="group rounded-2xl border border-[#E4E4EB] bg-white p-6 hover:border-[#5B3CF5] hover:-translate-y-1 transition-all"
          >
            <h2 className="font-heading text-xl font-semibold text-[#0D0D12] group-hover:text-[#5B3CF5]">
              {service.title}
            </h2>
            <p className="mt-2 text-sm text-[#6E6E82]">{service.description}</p>
            <div className="mt-4 text-sm font-semibold text-[#5B3CF5]">Learn more →</div>
          </a>
        ))}
      </div>
    </section>
  );
}

