'use client';

import { useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import { Upload, Loader2, Link as LinkIcon } from 'lucide-react';

type Settings = {
  agency_name?: string | null;
  tagline?: string | null;
  nl_tagline?: string | null;
  logo_url?: string | null;
  favicon_url?: string | null;
  contact_email?: string | null;
  phone?: string | null;
  whatsapp?: string | null;
  address?: string | null;

  twitter_url?: string | null;
  linkedin_url?: string | null;
  instagram_url?: string | null;
  github_url?: string | null;
  facebook_url?: string | null;
  tiktok_url?: string | null;
  youtube_url?: string | null;

  meta_title?: string | null;
  meta_description?: string | null;
  og_image?: string | null;
  ga_id?: string | null;

  topbar_active?: boolean | null;
  topbar_text?: string | null;
  topbar_cta_text?: string | null;
  topbar_cta_link?: string | null;

  affiliate_commission?: number | null;
  subscriber_count_text?: string | null;
};

const empty: Settings = {};

export default function AdminSettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const [settings, setSettings] = useState<Settings>(empty);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch('/api/admin/settings', { method: 'GET' });
        if (!res.ok) throw new Error(await res.text());
        const json = await res.json();
        if (!mounted) return;
        setSettings(json?.data ?? {});
      } catch (e: unknown) {
        const message = e instanceof Error ? e.message : 'Failed to load settings';
        toast.error(message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const topbarActive = useMemo(() => {
    return settings.topbar_active ?? true;
  }, [settings.topbar_active]);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'favicon') {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === 'logo') setIsUploadingLogo(true);
    else setIsUploadingFavicon(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'site'); // Store site assets in uploads/site

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setSettings(prev => ({
        ...prev,
        [type === 'logo' ? 'logo_url' : 'favicon_url']: data.url
      }));
      toast.success(`${type === 'logo' ? 'Logo' : 'Favicon'} uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload ${type}`);
    } finally {
      if (type === 'logo') setIsUploadingLogo(false);
      else setIsUploadingFavicon(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload: Settings = {
        ...settings,
        // Ensure types are sane for booleans/numbers.
        topbar_active: Boolean(settings.topbar_active ?? true),
        affiliate_commission:
          settings.affiliate_commission === undefined || settings.affiliate_commission === null
            ? undefined
            : Number(settings.affiliate_commission),
      };

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to save settings');
      }

      toast.success('Settings saved');
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : 'Failed to save settings';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="px-6 py-10">
        <div className="text-sm text-[#6E6E82]">Loading settings…</div>
      </div>
    );
  }

  return (
    <div className="px-6 py-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="font-heading text-2xl font-extrabold text-[#0D0D12]">Site Controls</h1>
        <p className="mt-1 text-sm text-[#6E6E82]">
          Update your global agency branding, top bar, contact/social links, and SEO defaults.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {/* Branding */}
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[#0D0D12]">Branding</h2>

          <div>
            <label className="block text-xs font-semibold text-[#6E6E82]">Agency name</label>
            <input
              value={settings.agency_name ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, agency_name: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6E6E82]">Tagline</label>
            <input
              value={settings.tagline ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, tagline: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6E6E82]">Newsletter tagline</label>
            <input
              value={settings.nl_tagline ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, nl_tagline: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#6E6E82]">Company Logo</label>
              
              {/* Logo Preview & Upload */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl border border-[#E4E4EB] bg-[#F8F8FA] flex items-center justify-center overflow-hidden">
                  {settings.logo_url ? (
                    <img src={settings.logo_url} alt="Logo" className="h-full w-full object-contain" />
                  ) : (
                    <Upload size={18} className="text-[#6E6E82]" />
                  )}
                </div>
                <label className="relative cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#F0ECFF] border border-[#5B3CF5]/20 px-3 py-1.5 text-xs font-semibold text-[#5B3CF5] hover:bg-[#EAE4FF] transition-colors">
                  {isUploadingLogo ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                  {isUploadingLogo ? 'Uploading...' : 'Upload'}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'logo')} disabled={isUploadingLogo} />
                </label>
              </div>

              {/* Logo URL Input */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E82]">
                  <LinkIcon size={12} />
                </div>
                <input
                  value={settings.logo_url ?? ''}
                  onChange={(e) => setSettings((s) => ({ ...s, logo_url: e.target.value }))}
                  className="w-full rounded-xl border border-[#E4E4EB] pl-8 pr-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
                  placeholder="Or Logo URL..."
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-semibold text-[#6E6E82]">Favicon</label>
              
              {/* Favicon Preview & Upload */}
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl border border-[#E4E4EB] bg-[#F8F8FA] flex items-center justify-center overflow-hidden">
                  {settings.favicon_url ? (
                    <img src={settings.favicon_url} alt="Favicon" className="h-6 w-6 object-contain" />
                  ) : (
                    <Upload size={18} className="text-[#6E6E82]" />
                  )}
                </div>
                <label className="relative cursor-pointer inline-flex items-center gap-2 rounded-xl bg-[#F0ECFF] border border-[#5B3CF5]/20 px-3 py-1.5 text-xs font-semibold text-[#5B3CF5] hover:bg-[#EAE4FF] transition-colors">
                  {isUploadingFavicon ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                  {isUploadingFavicon ? 'Uploading...' : 'Upload'}
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'favicon')} disabled={isUploadingFavicon} />
                </label>
              </div>

              {/* Favicon URL Input */}
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E6E82]">
                  <LinkIcon size={12} />
                </div>
                <input
                  value={settings.favicon_url ?? ''}
                  onChange={(e) => setSettings((s) => ({ ...s, favicon_url: e.target.value }))}
                  className="w-full rounded-xl border border-[#E4E4EB] pl-8 pr-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
                  placeholder="Or Favicon URL..."
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact & Social */}
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-5 space-y-4">
          <h2 className="text-sm font-semibold text-[#0D0D12]">Contact & Social</h2>

          <div>
            <label className="block text-xs font-semibold text-[#6E6E82]">Contact email</label>
            <input
              value={settings.contact_email ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, contact_email: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              placeholder="hello@maliklogix.com"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">Phone</label>
              <input
                value={settings.phone ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, phone: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">WhatsApp</label>
              <input
                value={settings.whatsapp ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, whatsapp: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6E6E82]">Address</label>
            <input
              value={settings.address ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, address: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">Twitter URL</label>
              <input
                value={settings.twitter_url ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, twitter_url: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">LinkedIn URL</label>
              <input
                value={settings.linkedin_url ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, linkedin_url: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">Instagram URL</label>
              <input
                value={settings.instagram_url ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, instagram_url: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">Facebook URL</label>
              <input
                value={settings.facebook_url ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, facebook_url: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">GitHub URL</label>
              <input
                value={settings.github_url ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, github_url: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">TikTok URL</label>
              <input
                value={settings.tiktok_url ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, tiktok_url: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6E6E82]">YouTube URL</label>
            <input
              value={settings.youtube_url ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, youtube_url: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
            />
          </div>
        </div>

        {/* Top Bar */}
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-5 space-y-4 md:col-span-2">
          <h2 className="text-sm font-semibold text-[#0D0D12]">Announcement Top Bar</h2>

          <div className="flex items-center justify-between gap-4">
            <label className="text-xs font-semibold text-[#6E6E82]">Active</label>
            <button
              type="button"
              onClick={() => setSettings((s) => ({ ...s, topbar_active: !topbarActive }))}
              className={`px-4 py-2 rounded-full text-xs font-semibold border transition-colors ${
                topbarActive ? 'bg-[#F0ECFF] border-[#5B3CF5]/30 text-[#5B3CF5]' : 'bg-white border-[#E4E4EB] text-[#6E6E82]'
              }`}
            >
              {topbarActive ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">Top bar text</label>
              <input
                value={settings.topbar_text ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, topbar_text: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">CTA text</label>
              <input
                value={settings.topbar_cta_text ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, topbar_cta_text: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6E6E82]">CTA link</label>
            <input
              value={settings.topbar_cta_link ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, topbar_cta_link: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              placeholder="/contact"
            />
          </div>
        </div>

        {/* SEO & Analytics */}
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-5 space-y-4 md:col-span-2">
          <h2 className="text-sm font-semibold text-[#0D0D12]">SEO & Analytics</h2>

          <div>
            <label className="block text-xs font-semibold text-[#6E6E82]">Meta title</label>
            <input
              value={settings.meta_title ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, meta_title: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#6E6E82]">Meta description</label>
            <textarea
              value={settings.meta_description ?? ''}
              onChange={(e) => setSettings((s) => ({ ...s, meta_description: e.target.value }))}
              className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30 min-h-[90px]"
            />
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">OG image URL</label>
              <input
                value={settings.og_image ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, og_image: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">GA ID</label>
              <input
                value={settings.ga_id ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, ga_id: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
                placeholder="G-XXXXXXXXXX"
              />
            </div>
          </div>
        </div>

        {/* Newsletter & Affiliates */}
        <div className="rounded-2xl border border-[#E4E4EB] bg-white p-5 space-y-4 md:col-span-2">
          <h2 className="text-sm font-semibold text-[#0D0D12]">Newsletter & Affiliates</h2>

          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">Subscriber count text</label>
              <input
                value={settings.subscriber_count_text ?? ''}
                onChange={(e) => setSettings((s) => ({ ...s, subscriber_count_text: e.target.value }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6E6E82]">Affiliate commission (%)</label>
              <input
                type="number"
                value={settings.affiliate_commission ?? 0}
                onChange={(e) => setSettings((s) => ({ ...s, affiliate_commission: Number(e.target.value) }))}
                className="mt-1 w-full rounded-xl border border-[#E4E4EB] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="rounded-full bg-[#5B3CF5] px-6 py-3 text-xs font-semibold text-white hover:bg-[#7C5CFA] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
      </div>
    </div>
  );
}

