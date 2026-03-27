import Link from 'next/link';
import type { Metadata } from 'next';
import Testimonials from '@/components/Testimonials';
import FounderCard from '@/components/FounderCard';

export const metadata: Metadata = {
  title: 'About MalikLogix | AI Digital Agency — Malik Farooq',
  description: 'Based in Lahore, serving global brands with AI-first marketing, automation, and performance engineering.',
};

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
      <section className="mb-20">
        <p className="text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[#888888] mb-4">About MalikLogix</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-[#111111] leading-tight tracking-tight max-w-2xl">
          Pakistan&apos;s AI Digital Agency for Global Brands
        </h1>
        <p className="mt-8 text-lg text-[#555555] max-w-2xl leading-relaxed">
          Based in Lahore. Serving clients across the US, UK, Canada, and Gulf region. 
          We blend deep engineering with practical marketing to build AI systems 
          that ship, learn, and scale.
        </p>
      </section>

      <section className="mb-24">
        <h2 className="font-heading text-2xl font-bold text-[#111111] mb-8">Who We Are</h2>
        <div className="grid md:grid-cols-1 gap-12 items-start mb-12">
          <div className="space-y-6 text-[#555555] leading-relaxed max-w-3xl">
            <p>
              MalikLogix was founded by <span className="text-[#111111] font-bold">Malik Farooq</span> — an AI engineer and digital marketer 
              who got tired of agencies that promised AI but delivered the same old campaigns 
              with a chatbot bolted on. The agency was built from scratch around one idea: 
              AI should be in the foundation of every marketing system, not layered on top.
            </p>
            <p>
              We work with Shopify brands, SaaS companies, local businesses, and agencies 
              looking to scale delivery without scaling headcount. Our clients share a common 
              frustration — marketing that looks busy but doesn&apos;t compound. We fix that.
            </p>
          </div>
        </div>
        
        {/* Founder Card Integration */}
        <FounderCard />
      </section>

      <section className="mb-24 bg-[#f9f9f7] rounded-lg p-8 sm:p-12 border border-[#e5e5e5]">
        <h2 className="font-heading text-2xl font-bold text-[#111111] mb-8">How We Think</h2>
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading text-lg font-bold text-[#111111] mb-3">AI-first thinking</h3>
            <p className="text-[#555555] text-sm leading-relaxed">
              We don&apos;t sprinkle AI on top of old processes — we redesign the process 
              from the AI up. Every workflow we build is designed to learn and improve 
              over time, not just automate static tasks.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-[#111111] mb-3">Engineering-grade execution</h3>
            <p className="text-[#555555] text-sm leading-relaxed">
              Everything we build is versioned, tested, and observable. You get 
              dashboards with real numbers, not monthly PDF reports full of screenshots.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-[#111111] mb-3">Aligned incentives</h3>
            <p className="text-[#555555] text-sm leading-relaxed">
              We care about revenue, leads, and profit — not vanity metrics. 
              If a tactic doesn&apos;t move the needle after 60 days, we kill it 
              and try something that does.
            </p>
          </div>
        </div>
      </section>

      {/* Client Results Section */}
      <section className="mb-24 py-12 border-t border-b border-[#e5e5e5]">
        <h2 className="font-heading text-2xl font-bold text-[#111111] mb-12 text-center">Results from real engagements</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-[#111111] mb-2 tracking-tight">58%</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#888888] leading-tight">Reduction in support tickets using AI triage</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#111111] mb-2 tracking-tight">3.2×</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#888888] leading-tight">Increase in organic traffic within 90 days</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#111111] mb-2 tracking-tight">40%</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#888888] leading-tight">Faster lead response using n8n + Claude</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-[#111111] mb-2 tracking-tight">10k+</div>
            <div className="text-[10px] font-medium uppercase tracking-[0.08em] text-[#888888] leading-tight">Business owners in the newsletter</div>
          </div>
        </div>
        <p className="mt-12 text-center text-[10px] font-medium text-[#888888] italic">
          Numbers from anonymised client engagements. Results vary by business.
        </p>
      </section>

      {/* Testimonials shared component */}
      <Testimonials />

      <section className="bg-[#111111] rounded-lg p-12 text-center text-white mt-12">
        <h2 className="font-heading text-3xl font-bold mb-4">Want to build something with AI?</h2>
        <p className="text-[#888888] mb-8 max-w-xl mx-auto">
          Whether you need a marketing system, an automation pipeline, or a full AI strategy — let&apos;s talk.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-[#111111] px-10 py-4 rounded-md font-bold hover:bg-[#f3f3f0] transition-colors"
        >
          Get in touch →
        </Link>
      </section>
    </main>
  );
}

