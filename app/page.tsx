import Link from 'next/link';
import { Footer } from '@/components/agency/Footer';
import { MegaMenu } from '@/components/agency/MegaMenu';
import { TopBar } from '@/components/agency/TopBar';
import { WhatsAppFAB } from '@/components/agency/WhatsAppFAB';
import HomeBlogRows from '@/components/agency/HomeBlogRows';
import { HomeNewsletterCTA } from '@/components/agency/HomeNewsletterCTA';
import { ToolsWeUse } from '@/components/agency/ToolsWeUse';
import { buildWhatsAppPrefilled, getSiteSettings } from '@/lib/site-settings';

export default async function Home() {
  const settings = await getSiteSettings();
  const whatsAppHref = buildWhatsAppPrefilled(settings.whatsapp);

  return (
    <>
      <TopBar
        topbar_active={settings.topbar_active}
        topbar_text={settings.topbar_text}
        topbar_cta_text={settings.topbar_cta_text}
        topbar_cta_link={settings.topbar_cta_link}
      />
      <MegaMenu settings={settings} whatsappHref={whatsAppHref} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-16 w-full overflow-x-hidden">
        <section className="w-full max-w-full overflow-hidden">
          <h1 className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight text-[#0D0D12] break-words max-w-full">
            AI-Powered Growth. Built to Scale.
          </h1>
          <p className="mt-4 max-w-2xl text-[#6E6E82] text-md sm:text-lg break-words">
            MalikLogix builds AI marketing systems that drive measurable results across SEO, automation, content, and Shopify.
          </p>
 
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-6 py-3 text-white font-semibold hover:bg-[#7C5CFA] transition-colors shadow-lg shadow-[#5B3CF5]/20"
            >
              Get Free AI Audit →
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center justify-center rounded-full border border-[#E4E4EB] bg-white px-6 py-3 text-[#0D0D12] font-semibold hover:bg-[#F7F7FA] transition-colors"
            >
              Explore Blog →
            </Link>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-[#E4E4EB] bg-white p-6 sm:p-8">
          <div className="max-w-4xl">
            <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#0D0D12]">
              AI Digital Marketing That Drives Revenue, Not Just Reach
            </h2>
            <p className="mt-3 text-[#6E6E82] text-sm sm:text-base">
              We build full-funnel AI systems for modern businesses: SEO strategy, content engines, lead automation,
              conversion optimization, and weekly performance loops. Instead of random campaigns, you get a structured
              growth system that compounds results over time.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-4">
               <div className="text-[10px] font-bold uppercase tracking-wider text-[#5B3CF5]">Stage 1</div>
               <div className="mt-1 text-sm font-semibold text-[#0D0D12]">Market + SEO Intelligence</div>
               <div className="mt-1 text-xs text-[#6E6E82]">Find high-intent topics, keyword clusters, and conversion gaps.</div>
            </div>
            <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-4">
               <div className="text-[10px] font-bold uppercase tracking-wider text-[#5B3CF5]">Stage 2</div>
               <div className="mt-1 text-sm font-semibold text-[#0D0D12]">AI Content + Automation</div>
               <div className="mt-1 text-xs text-[#6E6E82]">Ship optimized content, nurture leads, and automate follow-ups.</div>
            </div>
            <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-4">
               <div className="text-[10px] font-bold uppercase tracking-wider text-[#5B3CF5]">Stage 3</div>
               <div className="mt-1 text-sm font-semibold text-[#0D0D12]">Scale With Weekly KPIs</div>
               <div className="mt-1 text-xs text-[#6E6E82]">Track CAC, conversion, and revenue impact to scale what works.</div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        <section className="py-16 border-t border-[#F3F3F8]">
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-[10px] font-bold text-[#5B3CF5] uppercase tracking-[0.2em] mb-10">
              Results from real engagements
            </p>
            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div>
                <div className="text-4xl lg:text-5xl font-extrabold text-[#0D0D12] mb-3">58%</div>
                <div className="text-[#6E6E82] text-xs leading-relaxed uppercase tracking-wider font-bold">reduction in support tickets using AI triage</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-extrabold text-[#0D0D12] mb-3">3.2×</div>
                <div className="text-[#6E6E82] text-xs leading-relaxed uppercase tracking-wider font-bold">increase in organic traffic within 90 days</div>
              </div>
              <div>
                <div className="text-4xl lg:text-5xl font-extrabold text-[#0D0D12] mb-3">40%</div>
                <div className="text-[#6E6E82] text-xs leading-relaxed uppercase tracking-wider font-bold">faster lead response time using n8n + Claude</div>
              </div>
            </div>
            <p className="text-center text-[10px] text-[#9999AA] mt-10 font-medium">
              Numbers from anonymised client engagements. Results vary by business.
            </p>
          </div>
        </section>

        <HomeBlogRows />

        <ToolsWeUse />

        <HomeNewsletterCTA />
      </main>
      <Footer settings={settings} />
      <WhatsAppFAB href={whatsAppHref} />
    </>
  );
}

