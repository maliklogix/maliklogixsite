'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Fuse from 'fuse.js';
import { 
  Search, ExternalLink, Download, Star, X, Command
} from 'lucide-react';
import type { OpenClawCategory, OpenClawSkill } from '@/lib/openclaw';

type SortKey = 'downloads' | 'stars' | 'newest';

export default function SkillHubClient({ 
  initialCategories, 
  allSkills 
}: { 
  initialCategories: OpenClawCategory[], 
  allSkills: OpenClawSkill[] 
}) {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('downloads');
  const [freeOnly, setFreeOnly] = useState(false);
  const [visibleCount, setVisibleCount] = useState(50);

  const fuse = useMemo(() => new Fuse(allSkills, {
    keys: ['name', 'description', 'author', 'tags'],
    threshold: 0.3,
    includeScore: true,
  }), [allSkills]);

  const displayedSkills = useMemo(() => {
    let results = allSkills;

    if (query.trim() !== '') {
      const searchRes = fuse.search(query);
      results = searchRes.map(r => r.item);
    }
    
    if (activeCategory) {
      results = results.filter(s => s.categorySlug === activeCategory);
    }

    if (freeOnly) {
      results = results.filter(s => s.free);
    }

    results = [...results].sort((a, b) => {
      if (sortKey === 'downloads') return b.downloads - a.downloads;
      if (sortKey === 'stars') return b.stars - a.stars;
      return b.downloads - a.downloads; 
    });

    return results;
  }, [query, allSkills, fuse, activeCategory, freeOnly, sortKey]);

  const handleCopy = (e: React.MouseEvent, text: string) => {
    e.preventDefault();
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 animate-in fade-in duration-500 font-body">
      
      {/* ── MINIMAL HERO ── */}
      <div className="mb-8 border-b border-[#E4E4EB] pb-5">
        <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0D0D12] tracking-tight mb-2">
          Find Skills
        </h1>
        <p className="text-[#6E6E82] text-base md:text-lg max-w-2xl">
          Discover {allSkills.length.toLocaleString()} community-built OpenClaw skills to extend your agent's capabilities.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start">
        
        {/* ── LEFT SIDEBAR (CATEGORIES) ── */}
        <aside className="w-full md:w-64 lg:w-72 shrink-0 md:sticky md:top-24 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-hide">
          <h2 className="text-sm font-bold text-[#0D0D12] uppercase tracking-wider mb-4 px-2">Categories</h2>
          <nav className="flex flex-col gap-1">
            <button
              onClick={() => { setActiveCategory(null); setVisibleCount(50); }}
              className={`flex items-center justify-between text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                activeCategory === null 
                  ? 'bg-[#5B3CF5]/10 text-[#5B3CF5] font-bold' 
                  : 'text-[#6E6E82] hover:bg-[#E4E4EB]/40 font-medium'
              }`}
            >
              <span>All Skills</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCategory === null ? 'bg-[#5B3CF5]/20 text-[#5B3CF5]' : 'bg-[#E4E4EB] text-[#9494A3]'}`}>
                {allSkills.length}
              </span>
            </button>
            
            {initialCategories.map(c => (
              <button
                key={c.slug}
                onClick={() => { setActiveCategory(c.slug); setVisibleCount(50); }}
                className={`flex items-center justify-between text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeCategory === c.slug 
                    ? 'bg-[#5B3CF5]/10 text-[#5B3CF5] font-bold' 
                    : 'text-[#6E6E82] hover:bg-[#E4E4EB]/40 font-medium'
                }`}
              >
                <span className="truncate pr-2">{c.title}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${activeCategory === c.slug ? 'bg-[#5B3CF5]/20 text-[#5B3CF5]' : 'bg-[#E4E4EB] text-[#9494A3]'}`}>
                  {c.count}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── RIGHT MAIN CONTENT ── */}
        <main className="flex-1 min-w-0 w-full">
          
          {/* ── SEARCH & FILTERS ── */}
          <div className="sticky top-0 md:top-20 z-30 py-6 mb-8 backdrop-blur-md bg-[#f0f2f5]/80">
            <div className="relative group flex items-center gap-4 border-b-2 border-[#E4E4EB] focus-within:border-[#5B3CF5] transition-all duration-500 pb-3">
              <Search className="text-[#9494A3] group-focus-within:text-[#0D0D12] transition-colors" size={24} />
              <input 
                type="text" 
                value={query}
                onChange={e => { setQuery(e.target.value); setVisibleCount(50); }}
                placeholder="Search skills, integrations, or authors..."
                className="flex-1 bg-transparent border-none py-1 text-2xl font-heading font-bold text-[#0D0D12] outline-none placeholder:text-[#9494A3]/40 placeholder:font-medium"
              />
              {query && (
                <button 
                  onClick={() => setQuery('')}
                  className="text-[#9494A3] hover:text-[#0D0D12] p-2 hover:bg-black/5 rounded-full transition-all"
                  aria-label="Clear search"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div className="text-sm font-bold text-[#6E6E82] flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5B3CF5]" />
                {displayedSkills.length.toLocaleString()} Skills Found
                {activeCategory && <span className="text-[#9494A3] px-2 py-0.5 bg-[#E4E4EB]/50 rounded text-[11px] uppercase ml-2 tracking-wider">{activeCategory.replace(/-/g, ' ')}</span>}
              </div>

              <div className="flex items-center gap-4">
                <div className="relative">
                  <select 
                    value={sortKey} 
                    onChange={(e) => setSortKey(e.target.value as SortKey)}
                    className="bg-transparent text-sm font-bold text-[#0D0D12] py-1 pl-1 pr-6 outline-none cursor-pointer appearance-none border-none hover:text-[#5B3CF5] transition-colors"
                    style={{ backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right center', backgroundSize: '0.8em' }}
                  >
                    <option value="downloads">Most Downloaded</option>
                    <option value="stars">Highest Stars</option>
                    <option value="newest">Latest Release</option>
                  </select>
                </div>
                
                <div className="w-px h-4 bg-[#E4E4EB]" />

                <label className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      checked={freeOnly}
                      onChange={e => { setFreeOnly(e.target.checked); setVisibleCount(50); }}
                      className="peer sr-only"
                    />
                    <div className="w-9 h-5 bg-[#E4E4EB] rounded-full peer peer-checked:bg-[#10b981] transition-all after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:after:translate-x-4"></div>
                  </div>
                  <span className="text-sm font-bold text-[#6E6E82] group-hover:text-[#0D0D12] transition-colors">Free</span>
                </label>
              </div>
            </div>
          </div>

          {/* Skill List */}
          {displayedSkills.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#f8fafc] border border-[#E4E4EB] mb-4">
                <Search className="text-[#9494A3]" size={24} />
              </div>
              <h3 className="text-lg font-bold text-[#0D0D12] mb-1">No skills found</h3>
              <p className="text-sm text-[#6E6E82]">We couldn't find any skills matching your criteria.</p>
              <button 
                onClick={() => { setQuery(''); setActiveCategory(null); setFreeOnly(false); }}
                className="mt-6 text-sm font-bold text-[#5B3CF5] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="flex flex-col border border-[#E4E4EB] rounded-2xl bg-white overflow-hidden shadow-sm">
              {displayedSkills.slice(0, visibleCount).map((skill, i) => (
                <div key={`${skill.author}-${skill.name}`} className={`group flex flex-col sm:flex-row sm:items-center p-4 hover:bg-[#f8fafc] transition-colors ${i !== 0 ? 'border-t border-[#E4E4EB]' : ''}`}>
                  
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0D0D12] to-[#3a3a4a] text-white flex items-center justify-center font-bold text-sm shadow-sm shrink-0 mr-4 mb-3 sm:mb-0">
                    {skill.name.substring(0, 2).toUpperCase()}
                  </div>
                  
                  {/* Name & Desc */}
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-0.5">
                      <Link href={`/tools/openclaw/skillhub/${skill.categorySlug || 'all'}/${skill.author}-${skill.name}`} className="font-heading font-bold text-[#0D0D12] hover:text-[#5B3CF5] hover:underline truncate">
                        {skill.name}
                      </Link>
                      {skill.free && (
                        <span className="text-[#10b981] font-bold uppercase tracking-wider text-[9px] px-1.5 py-0.5 bg-[#10b981]/10 rounded-sm">Free</span>
                      )}
                      <Link href={skill.clawskills_url} target="_blank" rel="noopener noreferrer" className="text-[#E4E4EB] hover:text-[#5B3CF5] ml-1 shrink-0 transition-colors" title="Source">
                        <ExternalLink size={14} />
                      </Link>
                    </div>
                    <p className="text-sm text-[#6E6E82] truncate">
                      {skill.description}
                    </p>
                  </div>
                  
                  {/* Stats & Actions */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-3 sm:mt-0 shrink-0">
                    <div className="w-24 text-xs font-semibold text-[#6E6E82] truncate hidden md:block">
                      by <span className="text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors">{skill.author}</span>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs font-semibold text-[#9494A3] w-auto sm:w-32 justify-end">
                      <span className="flex items-center gap-1.5 text-[#0D0D12]"><Download size={14} className="text-[#9494A3]"/> {(skill.downloads/1000).toFixed(1)}k</span>
                      <span className="flex items-center gap-1.5"><Star size={14} className="text-[#f59e0b]"/> {skill.stars}</span>
                    </div>

                    <button 
                      onClick={(e) => handleCopy(e, `clawhub install ${skill.author}-${skill.name}`)}
                      className="opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all w-8 h-8 flex items-center justify-center bg-white border border-[#E4E4EB] text-[#0D0D12] rounded-lg shadow-sm hover:border-[#5B3CF5] hover:text-[#5B3CF5] shrink-0"
                      title="Copy install command"
                    >
                      <Command size={14} />
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}

          {visibleCount < displayedSkills.length && (
            <div className="mt-8 text-center">
              <button 
                onClick={() => setVisibleCount(v => v + 50)}
                className="px-6 py-2.5 bg-white border border-[#E4E4EB] hover:border-[#5B3CF5] text-[#0D0D12] hover:text-[#5B3CF5] rounded-xl text-sm font-bold shadow-sm transition-all hover:shadow-md"
              >
                Load More Skills
              </button>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
