'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search, ExternalLink, Star } from 'lucide-react';
import { getPartners, deletePartner, Partner } from '@/lib/partner-store';

export default function AdminPartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const load = async () => {
    setIsLoading(true);
    const data = await getPartners();
    setPartners(data);
    setSelectedIds(new Set());
    setIsLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    const ok = await deletePartner(id);
    if (ok) load();
    else alert('Failed to delete partner');
  }

  async function handleBulkDelete() {
    if (selectedIds.size === 0) return;
    if (!confirm(`Delete ${selectedIds.size} selected partner(s)? This cannot be undone.`)) return;
    const ids = Array.from(selectedIds);
    let failed = 0;
    for (const id of ids) {
      const ok = await deletePartner(id);
      if (!ok) failed++;
    }
    if (failed > 0) alert(`${failed} partner(s) failed to delete.`);
    load();
  }

  function toggleSelection(id: string) {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  }

  function toggleAll() {
    if (selectedIds.size === displayed.length && displayed.length > 0) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(displayed.map((p) => p.id)));
    }
  }

  const displayed = useMemo(() => {
    return partners.filter((p) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        (p.category || '').toLowerCase().includes(q) ||
        (p.coupon_code || '').toLowerCase().includes(q)
      );
    });
  }, [partners, query]);

  const allSelected = displayed.length > 0 && selectedIds.size === displayed.length;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-white">Affiliate Partners</h1>
          <p className="mt-0.5 text-xs text-[#9999AA]">Manage hosting companies, affiliate links, and coupons.</p>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="inline-flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm font-semibold text-red-400 hover:bg-red-500/20 transition-colors"
            >
              <Trash2 size={16} />
              Delete Selected ({selectedIds.size})
            </button>
          )}
          <Link
            href="/admin/partners/new"
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B3CF5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
          >
            <Plus size={16} />
            Add Partner
          </Link>
        </div>
      </div>

      {/* KPI strip */}
      <div className="grid gap-3 md:grid-cols-3 mb-5">
        <div className="rounded-2xl border border-white/10 bg-[#14141C] p-4">
          <div className="text-[11px] text-[#9999AA]">Total partners</div>
          <div className="text-2xl font-heading font-extrabold text-white mt-1">{partners.length}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#14141C] p-4">
          <div className="text-[11px] text-[#9999AA]">Active</div>
          <div className="text-2xl font-heading font-extrabold text-white mt-1">{partners.filter(p => p.active !== false).length}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-[#14141C] p-4">
          <div className="text-[11px] text-[#9999AA]">With coupons</div>
          <div className="text-2xl font-heading font-extrabold text-white mt-1">{partners.filter(p => p.coupon_code).length}</div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-5 relative max-w-xl">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666680]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, category, or coupon code..."
          className="w-full rounded-xl border border-white/10 bg-[#14141C] pl-9 pr-3 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5]"
        />
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="mt-16 text-center text-[#9999AA]">Loading partners...</div>
      ) : displayed.length === 0 ? (
        <div className="mt-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#14141C] border border-white/10 flex items-center justify-center mb-4">
            <Star size={24} className="text-[#555568]" />
          </div>
          <p className="text-sm text-[#9999AA]">No partners found.</p>
          <Link
            href="/admin/partners/new"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#5B3CF5] px-4 py-2 text-xs font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
          >
            <Plus size={14} />
            Add your first partner
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl border border-white/10 bg-[#14141C] overflow-hidden">
          {/* Table header */}
          <div className="grid grid-cols-[40px_60px_1fr_80px_100px_100px_100px] gap-4 px-5 py-3 border-b border-white/10 text-[10px] font-semibold text-[#666680] uppercase tracking-wider items-center">
            <div>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="w-4 h-4 rounded appearance-none border border-white/20 bg-white/5 checked:bg-[#5B3CF5] checked:border-[#5B3CF5] transition-colors relative after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[9px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white checked:after:rotate-45 cursor-pointer"
              />
            </div>
            <div>Logo</div>
            <div>Name</div>
            <div>Rating</div>
            <div>Price</div>
            <div>Coupon</div>
            <div className="text-right">Actions</div>
          </div>

          {/* Rows */}
          {displayed.map((p) => {
            const isSelected = selectedIds.has(p.id);
            return (
              <div
                key={p.id}
                className={`grid grid-cols-[40px_60px_1fr_80px_100px_100px_100px] gap-4 px-5 py-4 border-b border-white/5 last:border-b-0 items-center transition-colors ${
                  isSelected ? 'bg-[#5B3CF5]/10' : 'hover:bg-white/[0.02]'
                }`}
              >
                {/* Checkbox */}
                <div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelection(p.id)}
                    className="w-4 h-4 rounded appearance-none border border-white/20 bg-white/5 checked:bg-[#5B3CF5] checked:border-[#5B3CF5] transition-colors relative after:content-[''] checked:after:absolute checked:after:left-[5px] checked:after:top-[2px] checked:after:w-[5px] checked:after:h-[9px] checked:after:border-r-2 checked:after:border-b-2 checked:after:border-white checked:after:rotate-45 cursor-pointer"
                  />
                </div>

                {/* Logo */}
                <div>
                  <img src={p.logo_url} alt={p.name} className="h-8 w-auto object-contain grayscale opacity-70" />
                </div>

                {/* Name */}
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{p.name}</div>
                  <div className="text-[11px] text-[#666680] truncate">{p.category || 'Uncategorized'}</div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  <Star size={12} fill="currentColor" />
                  <span className="text-sm font-bold">{p.rating || '5.0'}</span>
                </div>

                {/* Price */}
                <div className="text-sm text-white">{p.starting_price || 'N/A'}</div>

                {/* Coupon */}
                <div>
                  {p.coupon_code ? (
                    <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold">
                      {p.coupon_code}
                    </span>
                  ) : (
                    <span className="text-[#666680] text-[10px]">None</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 justify-end">
                  <Link
                    href={p.cta_link}
                    target="_blank"
                    className="p-1.5 rounded-lg text-[#9999AA] hover:text-white hover:bg-white/10 transition-all"
                    title="Visit"
                  >
                    <ExternalLink size={14} />
                  </Link>
                  <Link
                    href={`/admin/partners/${p.id}`}
                    className="p-1.5 rounded-lg text-[#9999AA] hover:text-white hover:bg-white/10 transition-all"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.name)}
                    className="p-1.5 rounded-lg text-[#9999AA] hover:text-red-400 hover:bg-red-500/10 transition-all"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
