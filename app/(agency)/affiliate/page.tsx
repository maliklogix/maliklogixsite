import { prisma } from '@/lib/prisma';
import PartnerDirectory from '@/components/agency/PartnerDirectory';
import AffiliateExplained from '@/components/agency/AffiliateExplained';
import Link from 'next/link';
import { Sparkles, ArrowRight, Trophy } from 'lucide-react';
import type { Metadata } from 'next';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Affiliate | MalikLogix',
  description:
    'Explore verified affiliate partners in the MalikLogix network. Find the right marketing stack and earn recurring commissions.',
  openGraph: {
    title: 'Affiliate | MalikLogix',
    description:
      'Explore verified affiliate partners in the MalikLogix network. Find the right marketing stack and earn recurring commissions.',
    images: [{ url: '/ml-logo.png?v=4', alt: 'MalikLogix' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Affiliate | MalikLogix',
    description:
      'Explore verified affiliate partners in the MalikLogix network. Find the right marketing stack and earn recurring commissions.',
    images: ['/ml-logo.png?v=4'],
  },
};

export default async function AffiliatePage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string | string[] }>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const rawQ = resolvedSearchParams?.q;
  const q = Array.isArray(rawQ) ? rawQ[0] : rawQ;
  const initialSearch = typeof q === 'string' ? q : '';

  let partners: any[] = [];
  try {
    partners = await prisma.partner.findMany({
      where: { active: true },
      orderBy: [
        { rank: 'asc' },
        { rating: 'desc' },
      ],
    });
  } catch (err) {
    console.error('Failed to fetch partners:', err);
  }

  return (
    <div className="bg-[#F7F7FA] min-h-screen pb-24 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00A3FF]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3 animate-pulse" />
      <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-[#5B3CF5]/5 blur-[100px] rounded-full -translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <header className="relative pt-16 pb-12 text-center">
          <div className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E4E4EB] shadow-sm text-[#00A3FF] text-[10px] font-black uppercase tracking-[0.25em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <Sparkles size={12} strokeWidth={3} className="animate-pulse" />
            Verified Partner Ecosystem
          </div>
          
          <h1 className="font-heading text-6xl md:text-8xl font-black text-[#0D0D12] tracking-tighter leading-[0.9] mb-8">
            The Ultimate <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00A3FF] via-[#5B3CF5] to-[#00A3FF] bg-[length:200%_auto] animate-gradient-x">
              Marketing Stack
            </span>
          </h1>
          
          <p className="mt-8 text-xl md:text-2xl text-[#6E6E82] max-w-2xl mx-auto leading-relaxed font-medium">
            Hand-picked tools used by <span className="text-[#0D0D12] font-bold underline decoration-[#00A3FF]/30 decoration-4 underline-offset-4">MalikLogix</span> engineers to automate growth. 
            Vetted for reliability and ROI.
          </p>
        </header>

        <PartnerDirectory initialPartners={partners as any} initialSearch={initialSearch} />

        <AffiliateExplained />

        {/* Affiliate Program Section - Professional Glassmorphism Redesign */}
        <section className="mt-32 pb-24">
          <div className="relative overflow-hidden rounded-[4rem] bg-white/40 backdrop-blur-xl border border-white p-8 md:p-20 shadow-2xl shadow-[#00A3FF]/5 text-center group">
            {/* Inner Glows */}
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-[#00A3FF]/20 blur-[100px] rounded-full opacity-50 transition-all duration-1000 group-hover:scale-150" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#5B3CF5]/20 blur-[100px] rounded-full opacity-50 transition-all duration-1000 group-hover:scale-150" />
            
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="w-20 h-20 bg-[#00A3FF] rounded-3xl flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-[#00A3FF]/40 rotate-12 group-hover:rotate-0 transition-transform duration-500">
                <Trophy size={40} className="text-white" />
              </div>

              <h2 className="font-heading text-5xl md:text-6xl font-black text-[#0D0D12] tracking-tight leading-tight mb-6">
                Ready to Scale <br className="hidden md:block"/>
                With <span className="text-[#00A3FF]">MalikLogix?</span>
              </h2>

              <p className="mt-6 text-[#6E6E82] text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto">
                Join our exclusive network and earn <span className="text-[#0D0D12] font-bold">20% recurring monthly rewards</span> 
                for helping businesses solve AI challenges.
              </p>
              
              <div className="mt-20 grid gap-6 md:grid-cols-3 text-left">
                {[
                  { step: '01', title: 'Apply Now', desc: 'Secure your spot in our high-tier affiliate network.', highlight: 'Instant Setup' },
                  { step: '02', title: 'Generate', desc: 'Get custom tracking links and battle-tested assets.', highlight: 'Ready to Use' },
                  { step: '03', title: 'Recurring', desc: 'Withdraw earnings monthly with no minimum caps.', highlight: '20% Reward' },
                ].map((s) => (
                  <div key={s.step} className="relative p-8 rounded-[2.5rem] bg-white/70 border border-white shadow-xl shadow-[#00A3FF]/5 hover:shadow-2xl hover:shadow-[#00A3FF]/10 transition-all duration-500 hover:-translate-y-2 group/card">
                    <div className="text-xs font-black text-[#00A3FF] uppercase tracking-widest mb-6 px-3 py-1 bg-[#00A3FF]/5 rounded-full inline-block">
                      {s.highlight}
                    </div>
                    <h3 className="font-black text-[#0D0D12] text-xl mb-3 flex items-center gap-2">
                       <span className="text-[#0D0D12]/10 tracking-tighter">{s.step}</span> {s.title}
                    </h3>
                    <p className="text-sm text-[#6E6E82] font-semibold leading-relaxed">{s.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-20 flex flex-col items-center gap-8">
                <Link 
                  href="/contact"
                  className="group relative inline-flex items-center gap-4 bg-[#0D0D12] text-white px-14 py-6 rounded-[2rem] font-black text-lg transition-all duration-500 hover:bg-[#00A3FF] hover:shadow-2xl hover:shadow-[#00A3FF]/40 hover:scale-105 active:scale-95 overflow-hidden"
                >
                  <span className="relative z-10">Apply to Partnership Program</span>
                  <ArrowRight size={22} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00A3FF] to-[#5B3CF5] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
                
                <div className="flex items-center gap-6">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-[#E4E4EB]" />
                    ))}
                  </div>
                  <p className="text-sm font-bold text-[#9494A3] uppercase tracking-widest">
                    Joined by <span className="text-[#0D0D12]">250+</span> industry partners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
