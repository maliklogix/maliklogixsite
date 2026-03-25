'use client';

import { useState } from 'react';
import { Tag, Copy, Check } from 'lucide-react';

interface PartnerCouponProps {
  code: string;
}

export default function PartnerCoupon({ code }: PartnerCouponProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative w-full mb-4">
      <div 
        onClick={copyToClipboard}
        className="flex items-center justify-between gap-3 bg-emerald-50 border-2 border-dashed border-emerald-200 hover:border-emerald-400 hover:bg-emerald-100/50 px-4 py-3 rounded-2xl cursor-pointer transition-all duration-300"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <Tag size={16} className="rotate-90" />
          </div>
          <div>
            <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest leading-none mb-1">
              {copied ? 'Copied!' : 'Click to Copy'}
            </div>
            <div className="text-sm font-black text-[#0D0D12] font-mono tracking-wider">
              {code}
            </div>
          </div>
        </div>
        <div className={`p-2 rounded-lg transition-colors ${copied ? 'bg-emerald-500 text-white' : 'bg-white text-emerald-600'}`}>
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </div>
      </div>
      
      {/* Visual flair: side cutouts to look like a coupon */}
      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-white border-r border-[#E4E4EB] rounded-full hidden md:block" />
      <div className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 bg-white border-l border-[#E4E4EB] rounded-full hidden md:block" />
    </div>
  );
}
