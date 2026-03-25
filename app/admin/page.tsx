import Link from 'next/link';
import { FileText, Settings, PenSquare, Zap, Users, BarChart3 } from 'lucide-react';
import { prisma, isDatabaseConfigured } from '@/lib/prisma';

export default async function AdminDashboardPage() {
  let counts = { total: 0, published: 0, draft: 0, scheduled: 0 };
  if (isDatabaseConfigured) {
    try {
      // Single query (GROUP BY) reduces total DB time + pool contention.
      const grouped = await prisma.post.groupBy({
        by: ['status'],
        _count: { _all: true },
      });

      const get = (status: string) => grouped.find((g) => g.status === status)?._count._all ?? 0;
      const published = get('published');
      const draft = get('draft');
      const total = grouped.reduce((sum, g) => sum + (g._count._all ?? 0), 0);

      counts = { total, published, draft, scheduled: 0 };
    } catch {
      counts = { total: 0, published: 0, draft: 0, scheduled: 0 };
    }
  }

  return (
    <div className="px-6 py-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section>
        <h1 className="font-heading text-3xl font-extrabold text-[#0D0D12]">Control Center</h1>
        <p className="mt-1 text-sm text-[#6E6E82]">
          Manage posts, settings, and your AI agency from one place.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Posts', value: counts.total, color: '#5B3CF5', icon: FileText },
          { label: 'Published', value: counts.published, color: '#00C896', icon: BarChart3 },
          { label: 'Drafts', value: counts.draft, color: '#F59E0B', icon: PenSquare },
          { label: 'Partners', value: 20, color: '#60A5FA', icon: Zap },
        ].map(({ label, value, color, icon: Icon }) => (
          <div
            key={label}
            className="rounded-2xl border border-[#E4E4EB] bg-white p-5 flex items-center gap-4"
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: `${color}22` }}
            >
              <Icon size={18} style={{ color }} />
            </div>
            <div>
              <div className="text-2xl font-extrabold text-[#0D0D12] font-heading">{value}</div>
              <div className="text-xs text-[#6E6E82]">{label}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-sm font-semibold text-[#6E6E82] mb-4 uppercase tracking-wider">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link
            href="/admin/posts/new"
            className="group rounded-2xl border border-[#E4E4EB] bg-white p-5 hover:border-[#5B3CF5]/40 hover:bg-[#F0ECFF]/60 transition-all"
          >
            <PenSquare size={20} className="text-[#5B3CF5] mb-3" />
            <h3 className="font-heading text-base font-semibold text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors">Write New Post</h3>
            <p className="mt-1 text-xs text-[#6E6E82]">Create, draft, schedule or publish a new blog post.</p>
          </Link>

          <Link
            href="/admin/posts"
            className="group rounded-2xl border border-[#E4E4EB] bg-white p-5 hover:border-[#5B3CF5]/40 hover:bg-[#F0ECFF]/60 transition-all"
          >
            <FileText size={20} className="text-[#5B3CF5] mb-3" />
            <h3 className="font-heading text-base font-semibold text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors">Manage Posts</h3>
            <p className="mt-1 text-xs text-[#6E6E82]">View, edit, or delete all published and draft posts.</p>
          </Link>

          <Link
            href="/admin/partners"
            className="group rounded-2xl border border-[#E4E4EB] bg-white p-5 hover:border-[#5B3CF5]/40 hover:bg-[#F0ECFF]/60 transition-all"
          >
            <Zap size={20} className="text-[#5B3CF5] mb-3" />
            <h3 className="font-heading text-base font-semibold text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors">Affiliate Partners</h3>
            <p className="mt-1 text-xs text-[#6E6E82]">Manage hosting companies, deals, and affiliate links.</p>
          </Link>

          <Link
            href="/admin/settings"
            className="group rounded-2xl border border-[#E4E4EB] bg-white p-5 hover:border-[#5B3CF5]/40 hover:bg-[#F0ECFF]/60 transition-all"
          >
            <Settings size={20} className="text-[#5B3CF5] mb-3" />
            <h3 className="font-heading text-base font-semibold text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors">Site Settings</h3>
            <p className="mt-1 text-xs text-[#6E6E82]">Update top bar, contact info, SEO and affiliate settings.</p>
          </Link>
        </div>
      </section>

      {/* About section */}
      <section className="rounded-2xl border border-[#E4E4EB] bg-white p-5">
        <div className="flex items-center gap-3 mb-3">
          <Users size={16} className="text-[#5B3CF5]" />
          <h3 className="font-heading text-sm font-semibold text-[#0D0D12]">AI Automation Overview</h3>
        </div>
        <p className="text-xs text-[#6E6E82] leading-relaxed">
          Run your AI growth system end-to-end: capture leads, automate follow-ups, publish newsletter issues,
          and track results in a weekly KPI loop. Update your site-wide copy and SEO from Settings—no code changes needed.
        </p>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-3">
            <div className="text-[10px] font-bold text-[#5B3CF5] uppercase tracking-wider">Step 1</div>
            <div className="mt-1 font-semibold text-sm">Audit & Strategy</div>
            <div className="mt-1 text-[11px] text-[#6E6E82]">Find gaps in SEO, content, and conversions.</div>
          </div>
          <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-3">
            <div className="text-[10px] font-bold text-[#5B3CF5] uppercase tracking-wider">Step 2</div>
            <div className="mt-1 font-semibold text-sm">Automate the Pipeline</div>
            <div className="mt-1 text-[11px] text-[#6E6E82]">Newsletter + follow-ups + lead routing, fully connected.</div>
          </div>
          <div className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-3">
            <div className="text-[10px] font-bold text-[#5B3CF5] uppercase tracking-wider">Step 3</div>
            <div className="mt-1 font-semibold text-sm">KPI Reporting</div>
            <div className="mt-1 text-[11px] text-[#6E6E82]">Measure results weekly, then iterate what works.</div>
          </div>
        </div>
      </section>
    </div>
  );
}
