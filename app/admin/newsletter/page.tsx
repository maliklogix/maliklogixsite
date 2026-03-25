'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, Mail, Search, Users } from 'lucide-react';
import { toast } from 'sonner';

type Subscriber = {
  id: string;
  email: string;
  first_name: string | null;
  source: string | null;
  status: 'active' | 'unsubscribed' | 'bounced';
  subscribed_at: string | null;
  unsubscribed_at: string | null;
};

const STATUS_OPTIONS = ['all', 'active', 'unsubscribed', 'bounced'] as const;

export default function AdminNewsletterPage() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>('all');
  const [rows, setRows] = useState<Subscriber[]>([]);
  const [savingId, setSavingId] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (status !== 'all') params.set('status', status);

      const res = await fetch(`/api/admin/newsletter?${params.toString()}`);
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      setRows(json?.data ?? []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load subscribers';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const stats = useMemo(() => {
    const total = rows.length;
    const active = rows.filter((r) => r.status === 'active').length;
    const unsubscribed = rows.filter((r) => r.status === 'unsubscribed').length;
    return { total, active, unsubscribed };
  }, [rows]);

  async function updateStatus(id: string, nextStatus: Subscriber['status']) {
    setSavingId(id);
    try {
      const res = await fetch('/api/admin/newsletter', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: nextStatus }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Subscriber updated');
      await load();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update subscriber';
      toast.error(message);
    } finally {
      setSavingId(null);
    }
  }

  const exportHref = `/api/admin/newsletter?export=csv${query ? `&q=${encodeURIComponent(query)}` : ''}${status !== 'all' ? `&status=${status}` : ''}`;

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-heading text-2xl font-extrabold text-[#0D0D12]">Newsletter</h1>
          <p className="mt-1 text-sm text-[#6E6E82]">Manage all subscriber emails and export your audience list anytime.</p>
        </div>
        <a
          href={exportHref}
          className="inline-flex items-center gap-2 rounded-xl bg-[#5B3CF5] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
        >
          <Download size={16} />
          Export CSV
        </a>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 mb-5">
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-4">
          <div className="text-xs text-[#6E6E82]">Total</div>
          <div className="mt-1 text-2xl font-heading font-extrabold text-[#0D0D12]">{stats.total}</div>
        </div>
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-4">
          <div className="text-xs text-[#6E6E82]">Active</div>
          <div className="mt-1 text-2xl font-heading font-extrabold text-[#0D0D12]">{stats.active}</div>
        </div>
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-4">
          <div className="text-xs text-[#6E6E82]">Unsubscribed</div>
          <div className="mt-1 text-2xl font-heading font-extrabold text-[#0D0D12]">{stats.unsubscribed}</div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E4E4EB] bg-white p-4 mb-4 flex flex-wrap gap-3 items-center">
        <div className="relative min-w-[260px] flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9999AA]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void load();
            }}
            placeholder="Search by email or name..."
            className="w-full rounded-xl border border-[#E4E4EB] pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as (typeof STATUS_OPTIONS)[number])}
          className="rounded-xl border border-[#E4E4EB] px-3 py-2.5 text-sm outline-none"
        >
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <button
          onClick={() => void load()}
          className="rounded-xl border border-[#E4E4EB] px-4 py-2.5 text-sm font-semibold hover:bg-[#F7F7FA]"
        >
          Apply
        </button>
      </div>

      <div className="rounded-2xl border border-[#E4E4EB] bg-white overflow-hidden">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 px-4 py-3 border-b border-[#E4E4EB] text-[11px] uppercase font-bold text-[#6E6E82]">
          <div>Email</div>
          <div>Status</div>
          <div>Source</div>
          <div>Subscribed</div>
        </div>

        {loading ? (
          <div className="p-6 text-sm text-[#6E6E82]">Loading subscribers...</div>
        ) : rows.length === 0 ? (
          <div className="p-10 text-center text-sm text-[#6E6E82]">No subscribers yet.</div>
        ) : (
          rows.map((row) => (
            <div key={row.id} className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-3 px-4 py-3 border-b border-[#F3F3F8] last:border-b-0 items-center">
              <div className="min-w-0">
                <div className="text-sm font-semibold text-[#0D0D12] truncate">{row.email}</div>
                <div className="text-xs text-[#6E6E82] truncate">{row.first_name || 'No name'}</div>
              </div>

              <div>
                <select
                  value={row.status}
                  disabled={savingId === row.id}
                  onChange={(e) => void updateStatus(row.id, e.target.value as Subscriber['status'])}
                  className="rounded-lg border border-[#E4E4EB] px-2 py-1 text-xs"
                >
                  <option value="active">active</option>
                  <option value="unsubscribed">unsubscribed</option>
                  <option value="bounced">bounced</option>
                </select>
              </div>

              <div className="text-xs text-[#6E6E82]">{row.source || 'website'}</div>
              <div className="text-xs text-[#6E6E82]">{row.subscribed_at ? new Date(row.subscribed_at).toLocaleDateString() : '-'}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
