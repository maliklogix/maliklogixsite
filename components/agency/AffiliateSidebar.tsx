'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  LayoutGrid, 
  Globe, 
  CreditCard, 
  Star, 
  ChevronDown, 
  Filter,
  Zap,
  Shield,
  Coins,
  Cpu,
  ShoppingBag,
  Sparkles,
  SearchIcon,
  X
} from 'lucide-react';

interface Category {
  id: string;
  name: string;
  count: number;
  icon: any;
}

const categories: Category[] = [
  { id: 'Hosting', name: 'Hosting Affiliates', count: 0, icon: LayoutGrid },
  { id: 'Crypto', name: 'Crypto Affiliates', count: 0, icon: Coins },
  { id: 'SaaS', name: 'SaaS Affiliates', count: 0, icon: Cpu },
  { id: 'VPN', name: 'VPN Affiliates', count: 0, icon: Shield },
  { id: 'Finance', name: 'Finance Affiliates', count: 0, icon: CreditCard },
  { id: 'eCommerce', name: 'eCommerce Affiliates', count: 0, icon: ShoppingBag },
  { id: 'AI Tools', name: 'AI Tools Affiliates', count: 0, icon: Sparkles },
  { id: 'Digital Products', name: 'Digital Products Affiliates', count: 0, icon: Zap },
];

const commissionTypes = ['CPA', 'Revenue Share', 'Hybrid'];
const regions = ['Global', 'USA', 'Europe', 'Asia'];
const payoutMethods = ['PayPal', 'Bank Transfer', 'Crypto'];

interface AffiliateSidebarProps {
  onFilterChange: (filters: any) => void;
  activeCategory: string;
  counts: Record<string, number>;
  initialSearch?: string;
}

export default function AffiliateSidebar({ onFilterChange, activeCategory, counts, initialSearch }: AffiliateSidebarProps) {
  const [search, setSearch] = useState(initialSearch ?? '');
  const [selectedCommission, setSelectedCommission] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string[]>([]);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setSearch(initialSearch ?? '');
  }, [initialSearch]);

  const handleCategoryClick = (categoryId: string) => {
    onFilterChange({ category: categoryId === 'all' ? '' : categoryId });
  };

  const toggleFilter = (type: 'commission' | 'region', value: string) => {
    let newFilters: any = {};
    if (type === 'commission') {
      const updated = selectedCommission.includes(value) 
        ? selectedCommission.filter(v => v !== value)
        : [...selectedCommission, value];
      setSelectedCommission(updated);
      newFilters.commission = updated;
    } else {
      const updated = selectedRegion.includes(value) 
        ? selectedRegion.filter(v => v !== value)
        : [...selectedRegion, value];
      setSelectedRegion(updated);
      newFilters.region = updated;
    }
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    setSearch('');
    setSelectedCommission([]);
    setSelectedRegion([]);
    setMinRating(null);
    onFilterChange({ reset: true });
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onFilterChange({ search });
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#00A3FF] text-white p-4 rounded-full shadow-lg flex items-center gap-2 font-bold"
      >
        <Filter size={20} />
        Filters
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-[#F0F0F5] transition-transform duration-300 transform
        md:relative md:translate-x-0 md:z-0 md:bg-transparent md:border-none
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-full flex flex-col md:pt-0 p-6 md:p-0">
          <div className="flex items-center justify-between mb-8 md:hidden">
            <h2 className="text-xl font-bold text-[#0D0D12]">Filters</h2>
            <button onClick={() => setIsMobileOpen(false)} className="p-2 hover:bg-[#F5F5FA] rounded-lg">
              <X size={20} />
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9494A3]" size={18} />
            <input 
              type="text"
              placeholder="Search affiliates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#F5F5FA] border border-transparent focus:border-[#00A3FF] focus:bg-white px-11 py-3 rounded-2xl text-sm outline-none transition-all duration-300"
            />
          </div>

          <div className="space-y-8 sticky top-24">
            {/* All Affiliates Button */}
            <button 
              onClick={handleReset}
              className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transition-all duration-300 border-2
                ${!activeCategory && !search && selectedCommission.length === 0 && selectedRegion.length === 0
                  ? 'bg-[#00A3FF] border-[#00A3FF] text-white shadow-lg shadow-[#00A3FF]/20' 
                  : 'bg-white border-[#F0F0F5] text-[#0D0D12] hover:border-[#00A3FF] hover:text-[#00A3FF]'
                }
              `}
            >
              <LayoutGrid size={18} />
              All Affiliates
            </button>

            {/* Category List */}
            <div>
              <h3 className="text-[11px] font-bold text-[#9494A3] uppercase tracking-[0.15em] mb-4 flex items-center justify-between">
                Categories
                <span className="bg-[#F5F5FA] px-2 py-0.5 rounded text-[10px] lowercase tracking-normal text-[#666680]">{categories.length}</span>
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.id)}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200 group
                      ${activeCategory === cat.id 
                        ? 'bg-[#00A3FF]/10 text-[#00A3FF]' 
                        : 'text-[#666680] hover:bg-[#F5F5FA] hover:text-[#0D0D12]'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <cat.icon size={18} className={activeCategory === cat.id ? 'text-[#00A3FF]' : 'text-[#9494A3] group-hover:text-[#00A3FF]'} />
                      <span className="text-sm font-semibold">{cat.name}</span>
                    </div>
                    {counts[cat.id] > 0 && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full
                        ${activeCategory === cat.id ? 'bg-[#00A3FF] text-white' : 'bg-[#F5F5FA] text-[#9494A3]'}
                      `}>
                        {counts[cat.id]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Filters Section */}
            <div>
              <h3 className="text-[11px] font-bold text-[#9494A3] uppercase tracking-[0.15em] mb-4">
                Advanced Filters
              </h3>
              
              {/* Commission Type */}
              <div className="mb-6">
                <p className="text-xs font-bold text-[#0D0D12] mb-3">Commission Type</p>
                <div className="space-y-2">
                  {commissionTypes.map(type => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <div className="relative flex items-center">
                        <input 
                          type="checkbox"
                          checked={selectedCommission.includes(type)}
                          onChange={() => toggleFilter('commission', type)}
                          className="peer appearance-none w-5 h-5 rounded-lg border-2 border-[#F0F0F5] checked:bg-[#00A3FF] checked:border-[#00A3FF] transition-all cursor-pointer"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform">
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M1 4.5L3.5 7L9 1" /></svg>
                        </div>
                      </div>
                      <span className="text-sm text-[#666680] group-hover:text-[#0D0D12] transition-colors">{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Regions */}
              <div>
                <p className="text-xs font-bold text-[#0D0D12] mb-3">Region</p>
                <div className="flex flex-wrap gap-2">
                  {regions.map(region => (
                    <button
                      key={region}
                      onClick={() => toggleFilter('region', region)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border
                        ${selectedRegion.includes(region)
                          ? 'bg-[#00A3FF] border-[#00A3FF] text-white'
                          : 'bg-white border-[#F0F0F5] text-[#9494A3] hover:border-[#00A3FF] hover:text-[#00A3FF]'
                        }
                      `}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
