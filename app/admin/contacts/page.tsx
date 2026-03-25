'use client';

import { useEffect, useMemo, useState } from 'react';
import { Search, UserRound, Mail } from 'lucide-react';
import { toast } from 'sonner';

type ContactStatus = 'new' | 'contacted' | 'proposal' | 'won' | 'lost';

type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  source: string | null;
  status: ContactStatus;
  admin_notes: string | null;
  created_at: string | null;
};

const STATUS_OPTIONS: Array<'all' | ContactStatus> = ['all', 'new', 'contacted', 'proposal', 'won', 'lost'];

export default function AdminContactsPage() {
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<(typeof STATUS_OPTIONS)[number]>('all');
  const [rows, setRows] = useState<Inquiry[]>([]);
  const [active, setActive] = useState<Inquiry | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query.trim());
      if (status !== 'all') params.set('status', status);
      const res = await fetch(`/api/admin/contacts?${params.toString()}`);
      if (!res.ok) throw new Error(await res.text());
      const json = await res.json();
      const data = (json?.data ?? []) as Inquiry[];
      setRows(data);
      if (data.length && !active) setActive(data[0]);
      if (!data.length) setActive(null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load contacts';
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
    const fresh = rows.filter((r) => r.status === 'new').length;
    const won = rows.filter((r) => r.status === 'won').length;
    return { total, fresh, won };
  }, [rows]);

  async function saveActive(next: Partial<Inquiry>) {
    if (!active) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: active.id,
          status: next.status ?? active.status,
          admin_notes: next.admin_notes ?? active.admin_notes ?? '',
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success('Contact updated');
      const updated = { ...active, ...next } as Inquiry;
      setActive(updated);
      setRows((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-[#0D0D12]">Contacts</h1>
        <p className="mt-1 text-sm text-[#6E6E82]">All contact submissions appear here. Click any row to view full details and notes.</p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3 mb-5">
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-4">
          <div className="text-xs text-[#6E6E82]">Total Leads</div>
          <div className="mt-1 text-2xl font-heading font-extrabold text-[#0D0D12]">{stats.total}</div>
        </div>
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-4">
          <div className="text-xs text-[#6E6E82]">New</div>
          <div className="mt-1 text-2xl font-heading font-extrabold text-[#0D0D12]">{stats.fresh}</div>
        </div>
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-4">
          <div className="text-xs text-[#6E6E82]">Won</div>
          <div className="mt-1 text-2xl font-heading font-extrabold text-[#0D0D12]">{stats.won}</div>
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
            placeholder="Search name, email, company..."
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
        <button onClick={() => void load()} className="rounded-xl border border-[#E4E4EB] px-4 py-2.5 text-sm font-semibold hover:bg-[#F7F7FA]">
          Apply
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className="rounded-2xl border border-[#E4E4EB] bg-white overflow-hidden">
          <div className="grid grid-cols-[1.2fr_1fr_120px] gap-3 px-4 py-3 border-b border-[#E4E4EB] text-[11px] uppercase font-bold text-[#6E6E82]">
            <div>Contact</div>
            <div>Service</div>
            <div>Status</div>
          </div>

          {loading ? (
            <div className="p-6 text-sm text-[#6E6E82]">Loading contacts...</div>
          ) : rows.length === 0 ? (
            <div className="p-10 text-center text-sm text-[#6E6E82]">No contact submissions yet.</div>
          ) : (
            rows.map((row) => (
              <button
                key={row.id}
                onClick={() => setActive(row)}
                className={`w-full text-left grid grid-cols-[1.2fr_1fr_120px] gap-3 px-4 py-3 border-b border-[#F3F3F8] last:border-b-0 hover:bg-[#F7F7FA] ${
                  active?.id === row.id ? 'bg-[#F0ECFF]' : ''
                }`}
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-[#0D0D12] truncate">{row.name}</div>
                  <div className="text-xs text-[#6E6E82] truncate">{row.email}</div>
                </div>
                <div className="text-xs text-[#6E6E82] truncate">{row.service || 'General Inquiry'}</div>
                <div className="text-xs font-semibold text-[#0D0D12] capitalize">{row.status}</div>
              </button>
            ))
          )}
        </div>

        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-4">
          {!active ? (
            <div className="text-sm text-[#6E6E82]">Select a contact row to view details.</div>
          ) : (
            <div className="space-y-4">
              <h2 className="font-heading text-lg font-bold text-[#0D0D12]">Lead Details</h2>
              <div className="text-sm text-[#0D0D12]"><strong>Name:</strong> {active.name}</div>
              <div className="text-sm text-[#0D0D12]"><strong>Email:</strong> {active.email}</div>
              <div className="text-sm text-[#0D0D12]"><strong>Phone:</strong> {active.phone || '-'}</div>
              <div className="text-sm text-[#0D0D12]"><strong>Company:</strong> {active.company || '-'}</div>
              <div className="text-sm text-[#0D0D12]"><strong>Service:</strong> {active.service || '-'}</div>
              <div className="text-sm text-[#0D0D12]"><strong>Budget:</strong> {active.budget || '-'}</div>
              <div className="text-sm text-[#0D0D12]"><strong>Source:</strong> {active.source || '-'}</div>
              <div className="text-sm text-[#0D0D12]">
                <strong>Submitted:</strong> {active.created_at ? new Date(active.created_at).toLocaleString() : '-'}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6E6E82] mb-1">Status</label>
                <select
                  value={active.status}
                  onChange={(e) => {
                    const next = e.target.value as ContactStatus;
                    setActive((prev) => (prev ? { ...prev, status: next } : prev));
                    void saveActive({ status: next });
                  }}
                  className="w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm"
                >
                  <option value="new">new</option>
                  <option value="contacted">contacted</option>
                  <option value="proposal">proposal</option>
                  <option value="won">won</option>
                  <option value="lost">lost</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#6E6E82] mb-1">Admin notes</label>
                <textarea
                  value={active.admin_notes || ''}
                  onChange={(e) => setActive((prev) => (prev ? { ...prev, admin_notes: e.target.value } : prev))}
                  onBlur={() => void saveActive({ admin_notes: active.admin_notes || '' })}
                  className="w-full min-h-[120px] rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm"
                  placeholder="Add notes for follow-up..."
                />
              </div>

              <a
                href={`mailto:${active.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm font-semibold hover:bg-[#F7F7FA]"
              >
                <Mail size={14} />
                Reply by Email
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
