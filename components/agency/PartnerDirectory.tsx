'use client';

import { useState, useMemo, useEffect } from 'react';
import { Partner } from '@/lib/partner-store';
import AffiliateSidebar from './AffiliateSidebar';
import PartnerCoupon from './PartnerCoupon';
import { ExternalLink, Star, Trophy, TrendingUp, Check, Search, Hourglass } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface PartnerDirectoryProps {
  initialPartners: Partner[];
  initialSearch?: string;
}

export default function PartnerDirectory({ initialPartners, initialSearch }: PartnerDirectoryProps) {
  const [filters, setFilters] = useState({
    category: '',
    search: initialSearch ?? '',
    commission: [] as string[],
    region: [] as string[],
  });

  useEffect(() => {
    setFilters((prev) => ({ ...prev, search: initialSearch ?? '' }));
  }, [initialSearch]);

  const handleFilterChange = (newFilters: any) => {
    if (newFilters.reset) {
      setFilters({
        category: '',
        search: '',
        commission: [],
        region: [],
      });
    } else {
      setFilters((prev) => ({ ...prev, ...newFilters }));
    }
  };

  const filteredPartners = useMemo(() => {
    return initialPartners.filter(partner => {
      // Category Filter
      if (filters.category && partner.category !== filters.category) return false;
      
      // Search Filter
      if (filters.search && !partner.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      
      // Commission Filter
      if (filters.commission.length > 0 && partner.commission_type && !filters.commission.includes(partner.commission_type)) return false;
      
      // Region Filter
      if (filters.region.length > 0 && partner.region && !filters.region.includes(partner.region)) return false;
      
      return true;
    });
  }, [initialPartners, filters]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    initialPartners.forEach(p => {
      if (p.category) {
        counts[p.category] = (counts[p.category] || 0) + 1;
      }
    });
    return counts;
  }, [initialPartners]);

  return (
    <div className="flex flex-col md:flex-row gap-12">
      {/* Sidebar */}
      <div className="md:w-72 flex-shrink-0">
        <AffiliateSidebar 
          onFilterChange={handleFilterChange} 
          activeCategory={filters.category}
          counts={categoryCounts}
          initialSearch={initialSearch ?? ''}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 min-w-0">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-[#0D0D12]">
              {filters.category ? `${filters.category} Affiliates` : 'Top Rated Affiliates'}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-sm text-[#9494A3]">
              <span>Verified & Scale-Ready</span>
              <span className="w-1 h-1 rounded-full bg-[#E4E4EB]" />
              <span>{filteredPartners.length} {filteredPartners.length === 1 ? 'Partner' : 'Partners'} Listed</span>
            </div>
          </div>
        </div>

        <div className="grid gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPartners.map((item, index) => (
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                key={item.id}
                className="group relative bg-white border border-[#E4E4EB] rounded-3xl p-6 md:p-8 flex flex-col md:grid md:grid-cols-12 gap-8 items-center hover:border-[#00A3FF]/40 hover:shadow-2xl hover:shadow-[#00A3FF]/10 transition-all duration-500"
              >
                {/* Rank Badge */}
                <div className={`absolute top-0 left-0 -translate-x-1 -translate-y-1 px-4 py-2 text-[10px] font-black uppercase tracking-widest rounded-tl-2xl rounded-br-2xl shadow-xl z-20 flex items-center gap-2
                  ${index === 0 ? 'bg-gradient-to-r from-[#F59E0B] to-[#D97706] text-white' : 
                    index === 1 ? 'bg-gradient-to-r from-[#9494A3] to-[#6E6E82] text-white' :
                    index === 2 ? 'bg-gradient-to-r from-[#B45309] to-[#78350F] text-white' :
                    'bg-[#0D0D12] text-white'}
                `}>
                  {index < 3 && <Trophy size={12} />}
                  #{index + 1} {index === 0 ? 'Best Overall' : index === 1 ? 'Editor\'s Choice' : index === 2 ? 'Recommended' : 'Partner'}
                </div>

                {/* Column 1: Logo (md:col-span-2) */}
                <div className="md:col-span-2 w-full flex justify-center border-b md:border-b-0 md:border-r border-[#F0F0F5] pb-8 md:pb-0 md:pr-8">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center p-2 rounded-2xl bg-[#F9FAFB] group-hover:bg-white transition-colors duration-500">
                    <img 
                      src={item.logo_url} 
                      alt={item.name} 
                      className="max-h-full max-w-full object-contain grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                    />
                  </div>
                </div>

                {/* Column 2: Offer & Features (md:col-span-4) */}
                <div className="md:col-span-4 w-full flex flex-col">
                  <div className="flex items-center gap-2 flex-wrap mb-2">
                    <h3 className="text-2xl font-black text-[#0D0D12] tracking-tight">
                      {item.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1.5 bg-[#00A3FF]/10 text-[#00A3FF] px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                      <TrendingUp size={10} /> {item.category || 'Hosting'}
                    </div>
                    <span className="text-xs font-bold text-[#E4E4EB]">|</span>
                    <span className="text-[10px] font-bold text-[#9494A3] uppercase tracking-widest">{item.commission_type || 'CPA'}</span>
                  </div>
                  <ul className="space-y-3">
                    {(item.features || []).slice(0, 3).map((f) => (
                      <li key={f} className="flex items-center gap-2.5 text-sm font-medium text-[#666680]">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        {f}
                      </li>
                    ))}
                    {(!item.features || item.features.length === 0) && (
                      <li className="flex items-center gap-2.5 text-sm font-medium text-[#666680]">
                        <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 shrink-0">
                          <Check size={12} strokeWidth={3} />
                        </div>
                        Professional Grade Reliability
                      </li>
                    )}
                  </ul>
                </div>

                {/* Column 3: Rating (md:col-span-3) */}
                <div className="md:col-span-3 w-full flex flex-col items-center md:items-start justify-center border-y md:border-y-0 md:border-x border-[#F0F0F5] py-8 md:py-0 md:px-8 text-center md:text-left">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-4xl font-black text-[#0D0D12] tracking-tighter">{item.rating || '5.0'}</div>
                    <div className="flex flex-col items-start">
                      <span className="text-[9px] uppercase tracking-[0.2em] text-[#9494A3] font-black leading-none mb-1.5">Expert Score</span>
                      <div className="flex text-[#F59E0B] gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={14} fill={i < Math.floor(parseFloat(item.rating || '5')) ? 'currentColor' : 'none'} strokeWidth={2.5} />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Visual Score Bar */}
                  <div className="w-full h-1.5 bg-[#F5F5FA] rounded-full overflow-hidden mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${(parseFloat(item.rating || '5') / 5) * 100}%` }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-[#00A3FF] to-[#5B3CF5]"
                    />
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-black text-[#0D0D12] uppercase tracking-widest bg-[#F5F5FA] px-3 py-1.5 rounded-full border border-[#F0F0F5] group-hover:bg-[#00A3FF]/5 group-hover:border-[#00A3FF]/20 transition-all duration-500">
                    <Trophy size={14} className="text-[#F59E0B]" /> High ROI Service
                  </div>
                </div>

                {/* Column 4: Price & CTA (md:col-span-3) */}
                <div className="md:col-span-3 w-full flex flex-col items-center justify-center">
                  <div className="text-center mb-6">
                    <span className="block text-[10px] uppercase font-black text-[#9494A3] tracking-[0.2em] mb-1">Starting From</span>
                    <div className="flex items-baseline justify-center gap-0.5">
                      <span className="text-4xl font-black text-[#00A3FF] tracking-tighter">{item.starting_price || 'Varies'}</span>
                      <span className="text-xs font-bold text-[#9494A3]">/mo</span>
                    </div>
                  </div>
                  
                  {item.show_deal && item.coupon_code && (
                    <PartnerCoupon code={item.coupon_code} />
                  )}

                  <Link 
                    href={item.cta_link}
                    target="_blank"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#00A3FF] text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#008BDB] hover:shadow-2xl hover:shadow-[#00A3FF]/30 transition-all duration-500 active:scale-95"
                  >
                    Visit Site <ExternalLink size={18} />
                  </Link>
                  <p className="mt-3 text-[9px] font-bold text-[#9494A3] uppercase tracking-[0.1em]">Verified Partner Link</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredPartners.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-32 bg-white border border-dashed border-[#E4E4EB] rounded-3xl text-center"
            >
              <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#F5F5FA] text-[#00A3FF] mb-8 animate-pulse">
                <Hourglass size={40} />
              </div>
              <h3 className="text-3xl font-black text-[#0D0D12] tracking-tight uppercase">Coming Soon</h3>
              <p className="mt-3 text-[#6E6E82] max-w-sm mx-auto text-lg leading-relaxed">
                We're currently vetting the best {filters.category || ''} tools for our network. Check back shortly!
              </p>
              <button 
                onClick={() => handleFilterChange({ reset: true })}
                className="mt-10 bg-[#00A3FF]/10 text-[#00A3FF] px-8 py-3 rounded-full font-bold hover:bg-[#00A3FF] hover:text-white transition-all duration-300"
              >
                Explore Available Partners
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
