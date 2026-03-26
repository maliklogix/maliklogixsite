import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getSkillBySlug } from '@/lib/openclaw';
import { ChevronRight, ExternalLink, Download, Star, Command, ShieldCheck, Tag } from 'lucide-react';
import InstallCommandClient from './InstallCommandClient';
import { marked } from 'marked';

export async function generateMetadata(
  props: { params: Promise<{ category: string, skill: string }> }
): Promise<Metadata> {
  const { category: catSlug, skill: skillSlug } = await props.params;
  const skill = await getSkillBySlug(catSlug, skillSlug);
  
  if (!skill) return {};
  
  return {
    title: `${skill.name} by ${skill.author} - OpenClaw SkillHub`,
    description: skill.description,
  };
}

export default async function SkillPage(
  props: { params: Promise<{ category: string, skill: string }> }
) {
  const { category: catSlug, skill: skillSlug } = await props.params;
  
  const category = await getCategoryBySlug(catSlug);
  const skill = await getSkillBySlug(catSlug, skillSlug);
  
  if (!category || !skill) notFound();

  // Get 3 related skills from same category
  const relatedSkills = category.skills
    .filter(s => s.name !== skill.name)
    .sort((a, b) => b.downloads - a.downloads)
    .slice(0, 3);

  const installCommand = `clawhub install ${skill.author}-${skill.name}`;

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-body w-full pb-20">
      
      {/* ── BREADCRUMB ── */}
      <div className="bg-white border-b border-[#E4E4EB] pt-24 pb-4 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-2 text-sm text-[#9494A3] font-medium overflow-x-auto whitespace-nowrap scrollbar-hide">
          <Link href="/tools/openclaw/skillhub" className="hover:text-[#0D0D12] transition-colors shrink-0">SkillHub</Link>
          <ChevronRight size={14} className="shrink-0" />
          <Link href={`/tools/openclaw/skillhub/${category.slug}`} className="hover:text-[#0D0D12] transition-colors shrink-0">{category.title}</Link>
          <ChevronRight size={14} className="shrink-0" />
          <span className="text-[#0D0D12] truncate">{skill.name}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10">
          
          {/* ── MAIN CONTENT (LEFT) ── */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="bg-white rounded-3xl border border-[#E4E4EB] p-8 md:p-10 shadow-sm mb-10 overflow-hidden relative">
              {/* Background decorative blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#5B3CF5]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#0D0D12] to-[#3a3a4a] text-white flex items-center justify-center font-bold text-2xl shadow-lg border-2 border-white shrink-0">
                  {skill.name.substring(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-1">
                    <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0D0D12] tracking-tight truncate">
                      {skill.name}
                    </h1>
                    {skill.free && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] font-black uppercase text-[10px] tracking-widest shadow-sm">
                        Free
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6E6E82]">
                    <span>Published by</span>
                    <span className="font-bold text-[#5B3CF5]">{skill.author}</span>
                  </div>
                </div>
              </div>

              <div 
                className="prose prose-slate prose-lg max-w-none text-[#6E6E82] 
                  prose-headings:font-heading prose-headings:text-[#0D0D12] prose-headings:mb-4 prose-headings:mt-8
                  prose-p:leading-relaxed prose-p:mb-5
                  prose-li:my-1 prose-ul:list-disc prose-ul:pl-5
                  prose-strong:text-[#0D0D12] prose-strong:font-bold
                  prose-code:text-[#5B3CF5] prose-code:bg-[#F0ECFF] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                  prose-blockquote:border-l-4 prose-blockquote:border-[#5B3CF5] prose-blockquote:bg-[#F0ECFF]/50 prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:text-[#6E6E82] prose-blockquote:my-8"
                dangerouslySetInnerHTML={{ __html: await marked.parse(skill.long_description || skill.description, { gfm: true, breaks: true }) }}
              />
            </div>

            {/* Tags area (now inside and below main content) */}
            <div className="mb-12">
              <h3 className="font-heading text-lg font-bold text-[#0D0D12] mb-4 flex items-center gap-2 px-2">
                <Tag size={16} className="text-[#9494A3]" /> Related Tags
              </h3>
              <div className="flex flex-wrap gap-2 text-sm font-medium">
                {skill.tags.map(t => (
                  <span key={t} className="px-4 py-2 bg-white text-[#6E6E82] rounded-lg border border-[#E4E4EB] uppercase text-[10px] font-bold tracking-widest shadow-sm hover:border-[#5B3CF5] transition-colors cursor-default">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── SIDEBAR (RIGHT) ── */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Installation Box */}
            <div className="bg-white rounded-3xl border border-[#E4E4EB] p-8 shadow-sm flex flex-col gap-6 sticky top-24">
              <h2 className="font-heading text-xl font-extrabold text-[#0D0D12] flex items-center gap-3">
                <Command className="text-[#5B3CF5]" size={20} /> Installation
              </h2>
              
              <div>
                <p className="text-[#6E6E82] text-xs mb-3 font-bold uppercase tracking-wider">Standard Method</p>
                <InstallCommandClient installCommand={installCommand} />
              </div>

              <div>
                <p className="text-[#6E6E82] text-xs mb-3 font-bold uppercase tracking-wider">Latest Method (npx)</p>
                <InstallCommandClient installCommand={`npx @openclaw/v1-client install ${skill.author}-${skill.name}`} />
              </div>

              <div className="pt-6 border-t border-[#E4E4EB]/60">
                <Link 
                  href={skill.clawskills_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#0D0D12] text-white hover:bg-[#1a1a24] px-6 py-3.5 rounded-2xl text-sm font-bold shadow-lg shadow-[#0D0D12]/10 transition-all hover:scale-[1.02] active:scale-95"
                >
                  View on Official Registry <ExternalLink size={16} />
                </Link>
              </div>

              {/* Sidebar Stats */}
              <div className="grid grid-cols-2 gap-3 mt-4">
                <div className="p-4 bg-[#f8fafc] rounded-2xl border border-[#E4E4EB]">
                  <div className="flex items-center gap-2 mb-1 text-[#5B3CF5]">
                    <Download size={14} />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9494A3]">Downloads</span>
                  </div>
                  <div className="text-xl font-black text-[#0D0D12]">{(skill.downloads/1000).toFixed(1)}k</div>
                </div>
                <div className="p-4 bg-[#f8fafc] rounded-2xl border border-[#E4E4EB]">
                  <div className="flex items-center gap-2 mb-1 text-[#f59e0b]">
                    <Star size={14} className="fill-current" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#9494A3]">Stars</span>
                  </div>
                  <div className="text-xl font-black text-[#0D0D12]">{skill.stars}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[#f0fff4] rounded-2xl border border-[#c6f6d5]">
                <ShieldCheck size={20} className="text-[#10b981] shrink-0" />
                <span className="text-xs font-bold text-[#22543d]">Security Verified</span>
              </div>
            </div>
          </aside>
        </div>

        {/* ── RELATED SKILLS ── */}
        {relatedSkills.length > 0 && (
          <div className="mt-20 pt-16 border-t border-[#E4E4EB]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-extrabold text-[#0D0D12]">More from {category.title}</h2>
              <Link href={`/tools/openclaw/skillhub/${category.slug}`} className="text-[#5B3CF5] font-bold text-sm hover:underline">
                View all →
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedSkills.map(s => (
                <Link 
                  key={`${s.author}-${s.name}`} 
                  href={`/tools/openclaw/skillhub/${category.slug}/${s.author}-${s.name}`}
                  className="group bg-white rounded-2xl border border-[#E4E4EB] p-6 hover:border-[#5B3CF5]/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#5B3CF5]/5 transition-all flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D0D12] to-[#3a3a4a] text-white flex items-center justify-center font-bold text-sm shadow-sm">
                      {s.name.substring(0, 2).toUpperCase()}
                    </div>
                    {s.free && <span className="text-[10px] font-black uppercase text-[#10b981] tracking-widest">Free</span>}
                  </div>
                  <h3 className="font-heading font-bold text-[#0D0D12] group-hover:text-[#5B3CF5] text-lg mb-1 truncate">
                    {s.name}
                  </h3>
                  <p className="text-xs text-[#9494A3] mb-3 truncate">by {s.author}</p>
                  <div className="text-xs font-semibold text-[#6E6E82] flex items-center gap-1 mt-auto pt-4 border-t border-[#E4E4EB]/60">
                    <Download size={14} className="text-[#5B3CF5]"/> {(s.downloads/1000).toFixed(1)}k downloads
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
