import Link from 'next/link';

export default function PricingPage() {
  const tiers = [
    {
      name: 'Starter',
      price: '$499/mo',
      description: 'For small businesses validating AI-powered growth.',
      highlight: false,
      features: ['AI marketing fundamentals', 'SEO basics', 'Monthly reporting'],
    },
    {
      name: 'Growth',
      price: '$899/mo',
      description: 'For brands ready to scale with automation.',
      highlight: true,
      features: ['Everything in Starter', 'Automation workflows', 'Shopify AI flows', 'Analytics dashboards', 'Dedicated PM'],
    },
    {
      name: 'Agency',
      price: '$999/mo',
      description: 'For enterprises and white-label partners.',
      highlight: false,
      features: ['Everything in Growth', 'Custom AI chatbots', 'White-label options', 'Strategy workshops'],
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">Simple, Transparent Pricing</h1>
      <p className="mt-4 text-[#6E6E82] max-w-2xl">
        No lock-ins. No hidden fees. We win when your numbers go up.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-2xl border bg-white p-6 ${
              tier.highlight ? 'border-[#5B3CF5] shadow-lg scale-[1.02]' : 'border-[#E4E4EB]'
            }`}
          >
            {tier.highlight && (
              <div className="inline-flex items-center rounded-full bg-[#F0ECFF] px-3 py-1 text-xs font-semibold text-[#5B3CF5]">
                Most Popular
              </div>
            )}
            <h2 className="mt-3 font-heading text-xl font-semibold text-[#0D0D12]">{tier.name}</h2>
            <div className="mt-2 text-2xl font-mono text-[#5B3CF5]">{tier.price}</div>
            <p className="mt-2 text-sm text-[#6E6E82]">{tier.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-[#0D0D12]">
              {tier.features.map((f) => (
                <li key={f}>✓ {f}</li>
              ))}
            </ul>
            <Link 
              href="/contact"
              className="mt-6 flex justify-center w-full rounded-full bg-[#5B3CF5] py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
            >
              {tier.highlight ? 'Get Started' : 'Talk to us'}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

