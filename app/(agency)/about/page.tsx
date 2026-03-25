import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About MalikLogix | Pakistan\'s Leading AI Digital Agency',
  description: 'Based in Lahore, serving global brands with AI-first marketing, automation, and performance engineering.',
};

export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <section className="mb-16">
        <p className="text-xs font-mono tracking-[0.2em] text-[#5B3CF5] uppercase mb-4">About MalikLogix</p>
        <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#0D0D12] leading-tight max-w-4xl">
          Pakistan&apos;s AI Digital Agency for Global Brands
        </h1>
        <p className="mt-6 text-xl text-[#6E6E82] max-w-3xl leading-relaxed">
          Based in Lahore. Serving clients across the US, UK, Canada, and Gulf region. 
          We blend deep engineering with practical marketing to build AI systems 
          that ship, learn, and scale.
        </p>
      </section>

      <section className="mb-20 grid md:grid-cols-2 gap-12 items-start">
        <div>
          <h2 className="font-heading text-3xl font-extrabold text-[#0D0D12] mb-6 border-l-4 border-[#5B3CF5] pl-6">Who We Are</h2>
          <div className="space-y-4 text-[#6E6E82] leading-relaxed">
            <p>
              MalikLogix was founded by <span className="text-[#0D0D12] font-bold">Malik Farooq</span> — an AI engineer and digital marketer 
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
        <div className="bg-[#F7F7FA] rounded-3xl p-8 border border-[#E4E4EB]">
          <h2 className="font-heading text-2xl font-extrabold text-[#0D0D12] mb-6">Our Stack</h2>
          <p className="text-[#6E6E82] mb-6 text-sm leading-relaxed">
            We build on whatever gives clients the best reliability-to-cost ratio. Our core infrastructure includes:
          </p>
          <div className="flex flex-wrap gap-2">
            {['n8n', 'Make.com', 'Claude API', 'OpenAI', 'Next.js', 'Supabase', 'Vercel', 'Shopify'].map((tech) => (
              <span key={tech} className="px-4 py-2 rounded-full bg-white border border-[#E4E4EB] text-xs font-bold text-[#0D0D12]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-20">
        <h2 className="font-heading text-3xl font-extrabold text-[#0D0D12] mb-10 text-center">How We Think</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-3xl p-8 border border-[#E4E4EB] hover:shadow-xl transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#F0ECFF] flex items-center justify-center mb-6 text-[#5B3CF5]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-[#0D0D12] mb-3">AI-first thinking</h3>
            <p className="text-[#6E6E82] text-sm leading-relaxed">
              We don&apos;t sprinkle AI on top of old processes — we redesign the process 
              from the AI up. Every workflow we build is designed to learn and improve 
              over time, not just automate static tasks.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-[#E4E4EB] hover:shadow-xl transition-all duration-300 text-center md:translate-y-4">
             <div className="w-12 h-12 rounded-2xl bg-[#F0ECFF] flex items-center justify-center mb-6 mx-auto text-[#5B3CF5]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-[#0D0D12] mb-3">Engineering-grade execution</h3>
            <p className="text-[#6E6E82] text-sm leading-relaxed">
              Everything we build is versioned, tested, and observable. You get 
              dashboards with real numbers, not monthly PDF reports full of screenshots.
            </p>
          </div>
          <div className="bg-white rounded-3xl p-8 border border-[#E4E4EB] hover:shadow-xl transition-all duration-300 text-right">
             <div className="w-12 h-12 rounded-2xl bg-[#F0ECFF] flex items-center justify-center mb-6 ml-auto text-[#5B3CF5]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <h3 className="font-heading text-xl font-bold text-[#0D0D12] mb-3">Aligned incentives</h3>
            <p className="text-[#6E6E82] text-sm leading-relaxed">
              We care about revenue, leads, and profit — not vanity metrics. 
              If a tactic doesn&apos;t move the needle after 60 days, we kill it 
              and try something that does.
            </p>
          </div>
        </div>
      </section>

      <section className="text-center bg-[#0D0D12] rounded-[3rem] p-12 md:p-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B3CF5] opacity-20 blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00C896] opacity-10 blur-[100px]" />
        
        <h2 className="font-heading text-3xl md:text-5xl font-extrabold mb-8 relative z-10">Ready to scale with AI?</h2>
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center bg-[#5B3CF5] text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-[#7C5CFA] transition-all relative z-10 shadow-2xl shadow-[#5B3CF5]/40"
        >
          Work with us →
        </Link>
      </section>
    </main>
  );
}

