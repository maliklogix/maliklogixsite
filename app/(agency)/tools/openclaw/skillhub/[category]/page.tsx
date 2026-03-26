import { Metadata } from 'next'; // force-hmr-v2
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getAllCategories } from '@/lib/openclaw';
import { 
  ChevronRight, ArrowLeft, Download, Star, ExternalLink, Search,
  GitMerge, Code, Globe, Layout, Cloud, Image as ImageIcon, 
  Apple, Bot, Terminal, TrendingUp, CheckSquare, Brain, 
  BarChart2, Calendar, Play, Book, Smartphone, MessageCircle, 
  Mic, Home, ShoppingCart, Heart, Shield, User, FileText, 
  Server, Truck, Gamepad2, BookOpen
} from 'lucide-react';

const ICON_MAP: Record<string, any> = {
  'git-merge': GitMerge, 'code': Code, 'globe': Globe, 'layout': Layout, 'cloud': Cloud,
  'image': ImageIcon, 'apple': Apple, 'search': Search, 'bot': Bot, 'terminal': Terminal,
  'trending-up': TrendingUp, 'check-square': CheckSquare, 'brain': Brain, 'bar-chart-2': BarChart2,
  'calendar': Calendar, 'play': Play, 'book': Book, 'smartphone': Smartphone, 
  'message-circle': MessageCircle, 'mic': Mic, 'home': Home, 'shopping-cart': ShoppingCart,
  'heart': Heart, 'shield': Shield, 'user': User, 'file-text': FileText, 'server': Server,
  'truck': Truck, 'gamepad-2': Gamepad2, 'book-open': BookOpen, 'star': Star
};

export async function generateMetadata(props: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: slug } = await props.params;
  const category = await getCategoryBySlug(slug);
  if (!category) return {};
  return {
    title: `${category.title} Skills - OpenClaw SkillHub`,
    description: category.description,
  };
}

export default async function CategoryPage(props: { params: Promise<{ category: string }> }) {
  const { category: slug } = await props.params;
  
  const category = await getCategoryBySlug(slug);
  const allCategories = await getAllCategories();
  
  if (!category) notFound();

  const IconComp = ICON_MAP[category.icon] || Star;

  // Sort skills by downloads desc
  const sortedSkills = [...category.skills].sort((a, b) => b.downloads - a.downloads);
  const popularSkills = sortedSkills.slice(0, 5);

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-body w-full pb-20">
      
      {/* ── BREADCRUMB HEADER ── */}
      <div className="bg-white border-b border-[#E4E4EB] pt-24 pb-6 px-4 sm:px-6 lg:px-8 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <nav className="flex items-center gap-2 text-sm text-[#9494A3] font-medium">
            <Link href="/tools/openclaw/skillhub" className="hover:text-[#0D0D12] transition-colors">SkillHub</Link>
            <ChevronRight size={14} />
            <span className="text-[#0D0D12]">{category.title}</span>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#5B3CF5]/5 border border-[#5B3CF5]/10 flex items-center justify-center text-[#5B3CF5]">
              <IconComp size={24} />
            </div>
            <div>
              <h1 className="font-heading text-3xl font-extrabold text-[#0D0D12] tracking-tight">{category.title}</h1>
              <p className="text-[#6E6E82] text-sm mt-1">{category.description} • {category.count} skills</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ── MAIN LIST ── */}
          <main className="flex-1 w-full flex flex-col gap-4">
            {sortedSkills.map((skill, index) => (
              <div key={`${skill.author}-${skill.name}`} className="group bg-white rounded-2xl border border-[#E4E4EB] p-5 hover:border-[#5B3CF5]/40 hover:shadow-lg hover:shadow-[#5B3CF5]/5 transition-all flex flex-col sm:flex-row sm:items-center gap-5 relative overflow-hidden">
                <div className="hidden sm:flex items-center justify-center w-12 font-heading font-black text-2xl text-[#E4E4EB] group-hover:text-[#5B3CF5]/20 transition-colors">
                  #{index + 1}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0D0D12] to-[#3a3a4a] text-white flex items-center justify-center font-bold text-xl shadow-md shrink-0">
                  {skill.name.substring(0, 2).toUpperCase()}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <Link href={`/tools/openclaw/skillhub/${category.slug}/${skill.name}`} className="font-heading font-bold text-lg text-[#0D0D12] hover:text-[#5B3CF5] hover:underline truncate">
                      {skill.name}
                    </Link>
                    {skill.free && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/20 text-[#10b981] font-black uppercase text-[10px] tracking-widest shrink-0 shadow-sm">
                        Free
                      </span>
                    )}
                    <Link href={skill.clawskills_url} target="_blank" rel="noopener noreferrer" className="text-[#9494A3] hover:text-[#5B3CF5] ml-auto shrink-0 z-10 p-2" title="Source on ClawSkills.sh">
                      <ExternalLink size={16} />
                    </Link>
                  </div>
                  
                  <div className="text-xs font-semibold text-[#9494A3] mb-2 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="text-[#5B3CF5] bg-[#F0ECFF] px-2 py-0.5 border border-[#5B3CF5]/10 rounded shadow-sm">by {skill.author}</span>
                    <span className="flex items-center gap-1"><Download size={12}/> {(skill.downloads/1000).toFixed(1)}k <span className="hidden sm:inline">downloads</span></span>
                    <span className="flex items-center gap-1 w-px h-3 bg-[#E4E4EB]"></span>
                    <span className="flex items-center gap-1 text-[#f59e0b]"><Star size={12} className="fill-current"/> {skill.stars} <span className="hidden sm:inline">stars</span></span>
                  </div>

                  <p className="text-sm text-[#6E6E82] leading-relaxed line-clamp-1 mb-3">
                    {skill.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {skill.tags.slice(0, 4).map(t => (
                      <span key={t} className="text-[10px] uppercase font-bold tracking-wider text-[#6E6E82] bg-[#f8fafc] border border-[#E4E4EB] px-2 py-1 rounded shadow-sm">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </main>

          {/* ── SIDEBAR ── */}
          <aside className="w-full lg:w-72 lg:sticky top-[80px] shrink-0 space-y-6">
            
            {/* Top 5 Box */}
            <div className="bg-white rounded-2xl border border-[#E4E4EB] p-5 shadow-sm">
              <h3 className="font-heading font-extrabold text-[#0D0D12] text-sm tracking-wide uppercase mb-4 flex items-center gap-2">
                <TrendingUp size={16} className="text-[#5B3CF5]" /> Popular this week
              </h3>
              <div className="space-y-4">
                {popularSkills.map((s, i) => (
                  <Link href={`/tools/openclaw/skillhub/${category.slug}/${s.name}`} key={s.name} className="flex gap-3 group">
                    <div className="w-6 h-6 rounded bg-[#f8fafc] border border-[#E4E4EB] text-[10px] font-bold text-[#9494A3] flex items-center justify-center shrink-0">
                      {i + 1}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-[#0D0D12] text-sm truncate group-hover:text-[#5B3CF5] transition-colors">{s.name}</div>
                      <div className="text-xs text-[#6E6E82] truncate mt-0.5">{s.downloads.toLocaleString()} down</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Other Categories */}
            <div className="bg-white rounded-2xl border border-[#E4E4EB] p-5 shadow-sm">
              <h3 className="font-heading font-extrabold text-[#0D0D12] text-sm tracking-wide uppercase mb-3">Categories</h3>
              <div className="flex flex-col max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {allCategories.map(c => (
                  <Link 
                    key={c.slug} 
                    href={`/tools/openclaw/skillhub/${c.slug}`}
                    className={`py-2 text-sm font-medium border-l-[3px] pl-3 transition-colors ${c.slug === category.slug ? 'border-[#5B3CF5] text-[#5B3CF5] bg-[#5B3CF5]/5' : 'border-transparent text-[#6E6E82] hover:text-[#0D0D12] hover:border-[#E4E4EB]'}`}
                  >
                    {c.title} <span className="text-[10px] text-[#9494A3] ml-1">({c.count})</span>
                  </Link>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}
