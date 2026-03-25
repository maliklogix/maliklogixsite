import type { Metadata } from 'next';
import Link from 'next/link';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Solutions | MalikLogix',
  description:
    'Explore MalikLogix solutions for E-commerce, SaaS, local businesses, and white-label agencies—built around automation, SEO, and measurable growth.',
};

export default function SolutionsPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <header>
        <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">
          Solutions Built for Real Businesses
        </h1>
        <p className="mt-4 text-[#6E6E82] text-lg max-w-2xl">
          We don&apos;t sell generic “AI marketing”. We build systems that automate lead capture, content
          publishing, and reporting—so you can grow faster with fewer manual hours.
        </p>
      </header>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-6">
          <h2 className="font-heading text-xl font-extrabold text-[#0D0D12]">How we automate</h2>
          <p className="mt-2 text-sm text-[#6E6E82] leading-relaxed">
            The approach is straightforward: connect your funnel, automate the repeatable steps, and measure the outcome. Each solution follows the same growth loop:
          </p>
          <ol className="mt-4 space-y-3 text-sm text-[#0D0D12] list-decimal pl-5">
            <li>
              Discover your bottlenecks (traffic, conversion, retention).
            </li>
            <li>
              Automate content + outreach + follow-ups.
            </li>
            <li>
              Optimize weekly using live KPI reporting.
            </li>
          </ol>
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-6">
          <h2 className="font-heading text-xl font-extrabold text-[#0D0D12]">What you get</h2>
          <ul className="mt-4 space-y-2 text-sm text-[#0D0D12]">
            <li>✓ AI content pipeline (newsletter + blog issues)</li>
            <li>✓ SEO &amp; GEO foundations (rank + appear in AI answers)</li>
            <li>✓ Automation flows (leads, follow-ups, reporting)</li>
            <li>✓ Dashboards (visibility you can act on)</li>
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
            >
              Book a Free AI Audit →
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-full border border-[#E4E4EB] bg-white px-6 py-3 text-sm font-semibold text-[#0D0D12] hover:bg-white/70 transition-colors"
            >
              See Pricing
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-8">
        <SolutionBlock
          id="e-commerce"
          title="E-commerce"
          eyebrow="For Shopify & modern storefronts"
          body={
            <>
              Your sales are only as good as your product discovery + follow-up. We help you automate
              the full loop: traffic → product education → intent capture → personalized messaging →
              conversion-focused reporting.
            </>
          }
          points={[
            'Product feed optimization + AI landing page content',
            'Shopify AI flows for reviews, FAQs, and support deflection',
            'Newsletter issues designed to move shoppers toward purchase',
            'Conversion dashboards so your weekly decisions are data-driven',
          ]}
        />

        <SolutionBlock
          id="saas"
          title="SaaS"
          eyebrow="For teams who need predictable pipeline"
          body={
            <>
              In B2B, the hard part is consistency. We automate lead scoring, nurture sequences, SEO
              publishing, and analytics reporting—so your product marketing stays steady even when the team is busy.
            </>
          }
          points={[
            'Automated lead routing + AI follow-up sequences',
            'SEO &amp; GEO content strategy mapped to your ICP',
            'Weekly KPI loop with clear “what to do next” insights',
            'Case-study style posts built for conversion',
          ]}
        />

        <SolutionBlock
          id="local"
          title="Local Businesses"
          eyebrow="For calls, bookings, and fast growth"
          body={
            <>
              Local growth is about being found and being chosen. We optimize your website content and automate
              messaging so customers see value fast—then convert into calls or bookings.
            </>
          }
          points={[
            'Local SEO foundations + AI-generated service pages',
            'WhatsApp-ready conversations with guided next steps',
            'Newsletter issues that build trust and repeat demand',
            'Lead capture + automated follow-up tracking',
          ]}
        />

        <SolutionBlock
          id="white-label"
          title="Agencies (White Label)"
          eyebrow="For scaling your delivery without scaling headcount"
          body={
            <>
              If you already sell marketing but want better delivery, we provide a white-label system:
              content + automation + reporting packaged for your clients.
            </>
          }
          points={[
            'White-label newsletters and blog issue production',
            'Automation workflows you can reuse across client projects',
            'SEO &amp; GEO packages with reporting templates',
            'Dedicated onboarding so delivery stays consistent',
          ]}
        />
      </section>
    </main>
  );
}

function SolutionBlock({
  id,
  eyebrow,
  title,
  body,
  points,
}: {
  id: string;
  eyebrow: string;
  title: string;
  body: ReactNode;
  points: string[];
}) {
  return (
    <article id={id} className="rounded-2xl border border-[#E4E4EB] bg-white p-6 md:p-8">
      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="text-xs font-bold uppercase tracking-widest text-[#5B3CF5]">{eyebrow}</div>
          <h2 className="mt-2 font-heading text-2xl font-extrabold text-[#0D0D12]">{title}</h2>
        </div>
      </div>
      <p className="mt-3 text-sm text-[#6E6E82] leading-relaxed max-w-3xl">{body}</p>
      <ul className="mt-5 grid gap-3 md:grid-cols-2">
        {points.map((p) => (
          <li key={p} className="flex gap-3 text-sm text-[#0D0D12]">
            <span className="mt-0.5 inline-flex h-5 w-5 rounded-full bg-[#F0ECFF] text-[#5B3CF5] items-center justify-center text-xs font-bold">
              ✓
            </span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

