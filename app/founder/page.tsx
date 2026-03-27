import Link from 'next/link';
import Image from 'next/image';
import { TopBar } from '@/components/agency/TopBar';
import { MegaMenu } from '@/components/agency/MegaMenu';
import { Footer } from '@/components/agency/Footer';
import { buildWhatsAppPrefilled, getSiteSettings } from '@/lib/site-settings';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Malik Farooq — Founder | MalikLogix',
  description: 'Malik Farooq is an AI specialist and digital marketer. Founder of MalikLogix. Builds agentic AI systems, RAG pipelines, and AI-powered marketing infrastructure.',
};

export default async function FounderPage() {
  const settings = await getSiteSettings();
  const whatsAppHref = buildWhatsAppPrefilled(settings.whatsapp);

  const expertise = [
    {
      id: '01',
      title: 'Agentic AI Systems & LLM Orchestration',
      description: 'Builds multi-agent pipelines where AI models plan, route decisions, and execute multi-step tasks with minimal human input. Uses OpenAI, Claude, and open-source LLMs.'
    },
    {
      id: '02',
      title: 'RAG Pipelines (Retrieval-Augmented Generation)',
      description: 'Connects AI to real business data — product catalogues, support docs, CRM records — so responses are grounded in facts, not hallucinations.'
    },
    {
      id: '03',
      title: 'AI Digital Marketing',
      description: 'Full-funnel marketing systems powered by AI: SEO strategy, content engines, lead automation, conversion optimisation, and weekly performance tracking loops.'
    },
    {
      id: '04',
      title: 'SEO & GEO (Generative Engine Optimisation)',
      description: 'Rank in Google search and inside AI-generated answers — ChatGPT, Perplexity, Claude, and Google AI Overviews. Search is no longer one channel.'
    },
    {
      id: '05',
      title: 'n8n & Marketing Automation',
      description: 'Workflow pipelines that replace 80% of repetitive marketing and ops work. Built, versioned, tested, and observable — not black-box automations.'
    },
    {
      id: '06',
      title: 'E-commerce AI (Shopify)',
      description: 'Lead scoring models, product recommendation engines, upsell flows, and customer analytics that grow AOV and repeat purchase rate automatically.'
    },
    {
      id: '07',
      title: 'Predictive Analytics & ML Pipelines',
      description: 'Machine learning models that forecast churn, predict LTV, and surface which customers to prioritise — connected to real dashboards.'
    },
    {
      id: '08',
      title: 'Data Engineering & Dashboard Development',
      description: 'Custom analytics infrastructure built on Supabase + Next.js that replaces 12 disconnected tools with one source of truth.'
    },
    {
      id: '09',
      title: 'Prompt Engineering & AI R&D',
      description: 'Systematic prompt design for production use cases — not one-off prompts. Builds reusable prompt libraries, evaluation frameworks, and AI testing pipelines.'
    }
  ];

  return (
    <>
      <TopBar
        topbar_active={settings.topbar_active}
        topbar_text={settings.topbar_text}
        topbar_cta_text={settings.topbar_cta_text}
        topbar_cta_link={settings.topbar_cta_link}
      />
      <MegaMenu settings={settings} whatsappHref={whatsAppHref} />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        {/* Section 1 — Intro */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24 items-center">
          <div className="relative aspect-square w-full rounded-full overflow-hidden bg-[#f3f3f0] border border-[#e5e5e5]">
          <Image
            src="/malik-farooq-founder-ai-digital-marketing.jpg"
            alt="Malik Farooq — Founder of MalikLogix"
            fill
            className="object-cover"
            priority
            unoptimized
          />
        </div>
        <div>
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.08em] text-[#888888] block mb-4">
            FOUNDER · AI SPECIALIST · DIGITAL MARKETER
          </span>
          <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#111111] mb-4 tracking-tight">
            Malik Farooq
          </h1>
          <p className="text-[#555555] font-medium mb-6">
            Lahore, Pakistan · BS Computer Science, University of Sargodha
          </p>
          <p className="text-[#555555] text-lg leading-relaxed mb-8">
            Malik Farooq is the founder of MalikLogix and an AI specialist working at the intersection of artificial intelligence and digital marketing. He builds intelligent marketing systems — from LLM-powered automation to AI-driven SEO — that help businesses grow without scaling headcount.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <Link
              href="/contact"
              className="bg-[#111111] text-white px-8 py-3 rounded-md font-bold text-sm hover:bg-[#333333] transition-colors"
            >
              Work with Malik →
            </Link>
            <Link
              href="https://github.com/maliklogix"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[#111111] font-bold text-sm hover:underline"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              github.com/maliklogix
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2 — About Malik */}
      <section className="mb-24">
        <h2 className="font-heading text-3xl font-bold text-[#111111] mb-12">
          AI Specialist. Digital Marketer. Builder.
        </h2>
        <div className="space-y-12 max-w-3xl">
          <div>
            <h3 className="font-heading text-xl font-bold text-[#111111] mb-4">The background</h3>
            <p className="text-[#555555] leading-relaxed mb-6">
              Malik Farooq founded MalikLogix with a straightforward mission: bring engineering-grade AI to digital marketing. Based in Lahore, Pakistan, with a BS in Computer Science from the University of Sargodha, Malik sits at a rare crossroads — deep technical AI knowledge combined with hands-on digital marketing execution.
            </p>
            <p className="text-[#555555] leading-relaxed">
              Most agencies talk about AI. Malik builds it. His day-to-day involves designing agentic AI systems, building RAG pipelines that ground AI responses in real business data, engineering e-commerce automation flows that run 24/7, and developing the kind of LLM-powered marketing infrastructure that most agencies are still calling "the future."
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-[#111111] mb-4">As an AI Specialist</h3>
            <p className="text-[#555555] leading-relaxed">
              Malik designs and builds production-grade AI systems — not demos, not experiments. This includes agentic AI pipelines where LLMs plan and execute multi-step tasks autonomously, RAG systems that connect AI to proprietary business knowledge, prompt engineering for specific business outcomes, ML pipelines for predictive analytics, and multi-modal AI integrations. He works with OpenAI, Anthropic Claude, and open-source models, and uses n8n and Make.com to connect AI to real business workflows.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-[#111111] mb-4">As an AI Digital Marketer</h3>
            <p className="text-[#555555] leading-relaxed">
              Malik applies AI across the full marketing funnel — AI-assisted SEO that targets high-intent keywords and optimises for AI Overviews and GEO (Generative Engine Optimisation), content engines that produce on-brand content at scale, lead scoring systems that rank prospects by conversion likelihood, e-commerce personalisation flows that increase AOV automatically, and marketing automation that reduces response time from hours to minutes.
            </p>
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-[#111111] mb-4">The combination</h3>
            <p className="text-[#555555] leading-relaxed">
              Most AI specialists can't run a marketing campaign. Most marketers can't build an AI pipeline. Malik does both — which is why MalikLogix delivers systems that actually ship, not just decks that propose them.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3 — Expertise */}
      <section className="mb-24">
        <h2 className="font-heading text-3xl font-bold text-[#111111] mb-12">What I build</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertise.map((item) => (
            <div key={item.id} className="bg-white border border-[#e5e5e5] rounded-lg p-8">
              <div className="text-[0.7rem] font-medium text-[#888888] mb-4 tracking-widest">{item.id}</div>
              <h4 className="font-heading font-bold text-[#111111] mb-4 leading-tight">{item.title}</h4>
              <p className="text-sm text-[#555555] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4 — Currently */}
      <section className="mb-24">
        <h2 className="font-heading text-3xl font-bold text-[#111111] mb-12">Right now</h2>
        <div className="space-y-4 max-w-3xl">
          {[
            { icon: '🔨', label: 'Currently building:', value: 'Agentic AI systems and e-commerce automation for global brands' },
            { icon: '📚', label: 'Currently learning:', value: 'Advanced multi-agent architectures and multi-modal AI applications' },
            { icon: '🤝', label: 'Open to:', value: 'Collaborations on AI systems, e-commerce automation, and agentic AI projects' }
          ].map((item, i) => (
            <div key={i} className="flex gap-4 p-6 border border-[#e5e5e5] rounded-lg bg-[#f9f9f7]">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">{item.label}</span>
                <p className="text-[#555555] text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5 — GitHub strip */}
      <section className="border-t border-b border-[#e5e5e5] py-12 mb-24 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-xl font-bold text-[#111111] mb-1">See what I'm building in public.</h2>
          <p className="text-sm text-[#888888]">Open-source tools, automation templates, and AI experiments on GitHub.</p>
        </div>
        <Link 
          href="https://github.com/maliklogix" 
          target="_blank" 
          rel="noopener noreferrer"
          className="border border-[#111111] text-[#111111] px-6 py-2.5 rounded-md font-bold text-sm hover:bg-[#111111] hover:text-white transition-all flex items-center gap-2"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          github.com/maliklogix
        </Link>
      </section>

      {/* Section 6 — CTA */}
      <section className="bg-[#f9f9f7] rounded-lg p-12 text-center border border-[#e5e5e5]">
        <h2 className="font-heading text-3xl font-bold text-[#111111] mb-4">Want to build something with AI?</h2>
        <p className="text-[#555555] mb-8 max-w-xl mx-auto">
          Whether you need a marketing system, an automation pipeline, or a full AI strategy — let's talk.
        </p>
        <Link
          href="/contact"
          className="bg-[#111111] text-white px-10 py-4 rounded-md font-bold hover:bg-[#333333] transition-colors inline-block"
        >
          Get in touch →
        </Link>
      </section>
    </main>
      <Footer settings={settings} />
    </>
  );
}
