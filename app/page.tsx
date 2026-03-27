import Link from 'next/link';
import dynamic from 'next/dynamic';
import { TopBar } from '@/components/agency/TopBar';
import { MegaMenu } from '@/components/agency/MegaMenu';
import { buildWhatsAppPrefilled, getSiteSettings } from '@/lib/site-settings';
import Testimonials from '@/components/Testimonials';

// ✅ Dynamically import components below the fold
const HomeBlogRows = dynamic(() => import('@/components/agency/HomeBlogRows'));
const ToolsWeUse = dynamic(() => import('@/components/agency/ToolsWeUse').then(m => m.ToolsWeUse));
const HomeNewsletterCTA = dynamic(() => import('@/components/agency/HomeNewsletterCTA').then(m => m.HomeNewsletterCTA));
const Footer = dynamic(() => import('@/components/agency/Footer').then(m => m.Footer));
const WhatsAppFAB = dynamic(() => import('@/components/agency/WhatsAppFAB').then(m => m.WhatsAppFAB));

export default async function Home() {
  const settings = await getSiteSettings();
  const whatsAppHref = buildWhatsAppPrefilled(settings.whatsapp);

  return (
    <>
      <MegaMenu settings={settings} whatsappHref={whatsAppHref} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Section: Hero */}
        <section className="mb-24">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold leading-tight text-[#111111] tracking-tight">
            AI-Powered Growth. Built to Scale.
          </h1>
          <p className="mt-6 max-w-2xl text-[#555555] text-lg leading-relaxed">
            MalikLogix builds AI marketing systems that drive measurable results across SEO, automation, content, and Shopify.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-[#4f46e5] px-8 py-4 text-white font-bold hover:bg-[#4338ca] transition-colors"
            >
              Get Free AI Audit →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-md border-[1.5px] border-[#4f46e5] bg-transparent px-8 py-4 text-[#4f46e5] font-bold hover:bg-[#eef2ff] transition-colors"
            >
              Explore Blog →
            </Link>
          </div>
        </section>

        {/* ADD 1 — Social Proof bar */}
        <div className="py-6 border-t border-b border-[#e5e5e5] mb-24 flex items-center justify-center">
           <p className="text-[10px] font-medium uppercase tracking-[0.1em] text-[#888888]">
            Trusted by brands in:  🇺🇸 USA  ·  🇬🇧 UK  ·  🇦🇪 UAE  ·  🇩🇪 Germany  ·  🇨🇦 Canada  ·  🇵🇰 Pakistan
           </p>
        </div>

        <section className="mb-24">
          <div className="max-w-3xl mb-12">
            <h2 className="font-heading text-3xl font-bold text-[#111111]">
              AI Digital Marketing That Drives Revenue, Not Just Reach
            </h2>
            <p className="mt-4 text-[#555555] leading-relaxed">
              We build full-funnel AI systems for modern businesses: SEO strategy, content engines, lead automation,
              conversion optimization, and weekly performance loops. Instead of random campaigns, you get a structured
              growth system that compounds results over time.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-lg border border-[#e5e5e5] bg-white p-8">
               <div className="text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2 text-center md:text-left">Stage 1</div>
               <div className="text-lg font-bold text-[#111111] mb-3">Market + SEO Intelligence</div>
               <div className="text-sm text-[#555555] leading-relaxed mb-4">Find high-intent topics, keyword clusters, and conversion gaps.</div>
               <div className="text-[10px] italic text-[#888888]">Example: 47 keyword clusters identified in week one, 12 quick-win pages prioritised.</div>
            </div>
            <div className="rounded-lg border border-[#e5e5e5] bg-white p-8">
               <div className="text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2 text-center md:text-left">Stage 2</div>
               <div className="text-lg font-bold text-[#111111] mb-3">AI Content + Automation</div>
               <div className="text-sm text-[#555555] leading-relaxed mb-4">Ship optimized content, nurture leads, and automate follow-ups.</div>
               <div className="text-[10px] italic text-[#888888]">Example: 9-step nurture sequence automated end-to-end, zero manual follow-up.</div>
            </div>
            <div className="rounded-lg border border-[#e5e5e5] bg-white p-8">
               <div className="text-[10px] font-bold uppercase tracking-widest text-[#888888] mb-2 text-center md:text-left">Stage 3</div>
               <div className="text-lg font-bold text-[#111111] mb-3">Scale With Weekly KPIs</div>
               <div className="text-sm text-[#555555] leading-relaxed mb-4">Track CAC, conversion, and revenue impact to scale what works.</div>
               <div className="text-[10px] italic text-[#888888]">Example: CAC reduced 34% within 60 days by cutting two underperforming channels.</div>
            </div>
          </div>
        </section>

        {/* ADD 3 — Testimonials shared component */}
        <Testimonials title="Results from real engagements" />

        {/* ADD 4 — Services Overview */}
        <section className="mb-24 py-16">
          <h2 className="font-heading text-3xl font-bold text-[#111111] mb-12 text-center">What we do</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'AI Marketing', desc: 'AI-powered campaigns that learn and improve every week.', link: '/services/ai-marketing' },
              { title: 'Automation', desc: 'n8n and Make.com workflows that replace manual repetitive work.', link: '/services/automation' },
              { title: 'Content AI', desc: 'High-velocity, on-brand content at scale without sacrificing quality.', link: '/services/content-creation' },
              { title: 'SEO & GEO', desc: 'Rank in Google and inside AI-generated answers simultaneously.', link: '/services/seo-geo' },
              { title: 'Shopify AI', desc: 'Upsell flows, bundles, and AOV optimisation running on autopilot.', link: '/services/shopify' },
              { title: 'AI Chatbots', desc: '24/7 customer chat that actually understands your business context.', link: '/services/ai-chatbots' },
            ].map((s, i) => (
              <div key={i} className="bg-white border border-[#e5e5e5] rounded-lg p-8">
                <h3 className="font-bold text-[#111111] mb-3">{s.title}</h3>
                <p className="text-sm text-[#555555] leading-relaxed mb-6">{s.desc}</p>
                <Link href={s.link} className="text-sm font-bold text-[#111111] hover:underline">Learn more →</Link>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <ToolsWeUse />
        </section>

        {/* ADD 5 — Learn about agency cards */}
        <section className="mb-24">
          <p className="text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[#888888] mb-6">Learn more</p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#f9f9f7] border border-[#e5e5e5] rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#111111] mb-2">About MalikLogix</h3>
              <p className="text-sm text-[#555555] mb-6">Pakistan&apos;s AI agency for global brands.</p>
              <Link href="/about" className="text-sm font-bold text-[#111111] hover:underline">Read our story →</Link>
            </div>
            <div className="bg-[#f9f9f7] border border-[#e5e5e5] rounded-lg p-8">
              <h3 className="text-xl font-bold text-[#111111] mb-2">Meet the Founder</h3>
              <p className="text-sm text-[#555555] mb-6">Malik Farooq — AI specialist and digital marketer.</p>
              <Link href="/founder" className="text-sm font-bold text-[#111111] hover:underline">Founder story →</Link>
            </div>
          </div>
        </section>

        <HomeBlogRows />
        <HomeNewsletterCTA />
      </main>
      <Footer settings={settings} />
      <WhatsAppFAB href={whatsAppHref} />
    </>
  );
}

