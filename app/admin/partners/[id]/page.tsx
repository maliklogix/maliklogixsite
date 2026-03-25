'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Save, X, Upload, Loader2, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { savePartner, getPartner, Partner } from '@/lib/partner-store';

export default function EditPartnerPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [features, setFeatures] = useState<string[]>(['']);
  
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    logo_url: '',
    rating: '5.0',
    starting_price: '',
    cta_link: '',
    coupon_code: '',
    show_deal: false,
    category: 'Hosting',
    commission_type: 'CPA',
    region: 'Global',
    payout_method: 'Bank Transfer',
    rank: 0,
    active: true,
  });

  useEffect(() => {
    async function load() {
      const data = await getPartner(id);
      if (data) {
        setFormData({
          id: data.id,
          name: data.name,
          logo_url: data.logo_url,
          rating: data.rating || '5.0',
          starting_price: data.starting_price || '',
          cta_link: data.cta_link,
          coupon_code: data.coupon_code || '',
          show_deal: data.show_deal || false,
          category: data.category || 'Hosting',
          commission_type: data.commission_type || 'CPA',
          region: data.region || 'Global',
          payout_method: data.payout_method || 'Bank Transfer',
          rank: data.rank || 0,
          active: data.active ?? true,
        });
        setFeatures(data.features.length ? data.features : ['']);
      }
      setIsLoading(false);
    }
    load();
  }, [id]);

  const addFeature = () => setFeatures([...features, '']);
  const removeFeature = (index: number) => setFeatures(features.filter((_, i) => i !== index));
  const updateFeature = (index: number, val: string) => {
    const next = [...features];
    next[index] = val;
    setFeatures(next);
  };
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'partners');

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const data = await res.json();
      setFormData(prev => ({ ...prev, logo_url: data.url }));
      toast.success('Logo uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    
    const res = await savePartner({
      ...formData,
      features: features.filter(f => f.trim() !== '')
    });

    if (res) {
      router.push('/admin/partners');
    } else {
      alert('Failed to save partner');
      setIsSaving(false);
    }
  }

  if (isLoading) return <div className="p-8 text-white">Loading...</div>;

  return (
    <div className="px-6 py-8 max-w-4xl mx-auto">
      <Link 
        href="/admin/partners"
        className="inline-flex items-center gap-2 text-sm text-[#9999AA] hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={16} />
        Back to Partners
      </Link>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="font-heading text-2xl font-extrabold text-white">Edit Partner</h1>
          <button
            type="submit"
            disabled={isSaving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#5B3CF5] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors disabled:opacity-50"
          >
            <Save size={18} />
            {isSaving ? 'Saving...' : 'Update Partner'}
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Info */}
          <div className="space-y-6 rounded-2xl border border-white/10 bg-[#14141C] p-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Basic Information</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#666680] uppercase mb-1.5">Company Name</label>
                <input
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#666680] uppercase mb-1.5">Company Logo</label>
                <div className="space-y-3">
                  {/* Preview & Upload */}
                  <div className="flex items-center gap-4">
                    <div className="h-16 w-16 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center overflow-hidden">
                      {formData.logo_url ? (
                        <img src={formData.logo_url} alt="Logo" className="h-full w-full object-contain" />
                      ) : (
                        <Upload size={20} className="text-[#666680]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <label className="relative cursor-pointer inline-flex items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors">
                        {isUploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                        {isUploading ? 'Uploading...' : 'Upload Logo'}
                        <input type="file" className="hidden" accept="image/*" onChange={handleFileUpload} disabled={isUploading} />
                      </label>
                      <p className="mt-1 text-[10px] text-[#666680]">Recommended: Square PNG/SVG, max 1MB</p>
                    </div>
                  </div>

                  {/* URL Input */}
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666680]">
                      <LinkIcon size={14} />
                    </div>
                    <input
                      required
                      placeholder="Or paste Logo URL here..."
                      value={formData.logo_url}
                      onChange={e => setFormData({...formData, logo_url: e.target.value})}
                      className="w-full rounded-xl border border-white/10 bg-white/5 pl-9 pr-4 py-2 text-xs text-white outline-none focus:border-[#5B3CF5]"
                    />
                  </div>
                </div>
              </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#666680] uppercase mb-1.5 tracking-wider">Rating</label>
                    <input
                      value={formData.rating}
                      onChange={e => setFormData({...formData, rating: e.target.value})}
                      placeholder="e.g. 5.0"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#666680] uppercase mb-1.5 tracking-wider">Starting Price</label>
                    <input
                      value={formData.starting_price}
                      onChange={e => setFormData({...formData, starting_price: e.target.value})}
                      placeholder="e.g. $1.99/mo"
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5]"
                    />
                  </div>
                </div>

              <div>
                <label className="block text-xs font-bold text-[#666680] uppercase mb-1.5 tracking-wider">Category</label>
                <select
                  value={formData.category}
                  onChange={e => setFormData({...formData, category: e.target.value})}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5] appearance-none"
                >
                  <option value="Hosting">Hosting Affiliates</option>
                  <option value="Crypto">Crypto Affiliates</option>
                  <option value="SaaS">SaaS Affiliates</option>
                  <option value="VPN">VPN Affiliates</option>
                  <option value="Finance">Finance Affiliates</option>
                  <option value="eCommerce">eCommerce Affiliates</option>
                  <option value="AI Tools">AI Tools Affiliates</option>
                  <option value="Digital Products">Digital Products Affiliates</option>
                </select>
              </div>
            </div>
          </div>

          {/* Affiliate Info */}
          <div className="space-y-6 rounded-2xl border border-white/10 bg-[#14141C] p-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Affiliate Settings</h2>
            
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#666680] uppercase mb-1.5 tracking-wider">Affiliate Link</label>
                  <input
                    required
                    value={formData.cta_link}
                    onChange={e => setFormData({...formData, cta_link: e.target.value})}
                    placeholder="https://hostinger.com?ref=maliklogix"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#666680] uppercase mb-1.5 tracking-wider">Commission Type</label>
                    <select
                      value={formData.commission_type}
                      onChange={e => setFormData({...formData, commission_type: e.target.value})}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5] appearance-none"
                    >
                      <option value="CPA">CPA</option>
                      <option value="Revenue Share">Revenue Share</option>
                      <option value="Hybrid">Hybrid</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#666680] uppercase mb-1.5 tracking-wider">Region</label>
                    <select
                      value={formData.region}
                      onChange={e => setFormData({...formData, region: e.target.value})}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5] appearance-none"
                    >
                      <option value="Global">Global</option>
                      <option value="USA">USA</option>
                      <option value="Europe">Europe</option>
                      <option value="Asia">Asia</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 border-t border-white/5 space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-emerald-500/80 uppercase mb-1.5 tracking-wider">Promo Coupon Code</label>
                    <input
                      value={formData.coupon_code}
                      onChange={e => setFormData({...formData, coupon_code: e.target.value})}
                      placeholder="e.g. MALIKLOGIX"
                      className="w-full rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-2.5 text-sm text-white outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                    <div>
                      <span className="block text-sm font-semibold text-white">Enable Deal Badge</span>
                      <span className="text-[10px] text-emerald-400/80 leading-none">Shows the coupon box on UI</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={formData.show_deal}
                      onChange={e => setFormData({...formData, show_deal: e.target.checked})}
                      className="w-5 h-5 rounded border-emerald-500/30 bg-emerald-500/10 checked:bg-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
          </div>

          {/* Features */}
          <div className="md:col-span-2 space-y-6 rounded-2xl border border-white/10 bg-[#14141C] p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">Key Features</h2>
              <button
                type="button"
                onClick={addFeature}
                className="text-[10px] font-bold text-[#5B3CF5] uppercase hover:underline"
              >
                + Add Feature
              </button>
            </div>
            
            <div className="grid gap-3 md:grid-cols-2">
              {features.map((feat, idx) => (
                <div key={idx} className="relative">
                  <input
                    value={feat}
                    onChange={e => updateFeature(idx, e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 pl-4 pr-10 py-2.5 text-sm text-white outline-none focus:border-[#5B3CF5]"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#666680] hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
