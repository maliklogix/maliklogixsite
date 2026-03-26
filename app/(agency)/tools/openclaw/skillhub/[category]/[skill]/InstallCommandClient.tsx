'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function InstallCommandClient({ installCommand }: { installCommand: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0D0D12] rounded-2xl p-4 flex flex-col gap-3 border border-[#3a3a4a] shadow-lg relative overflow-hidden group">
      <div className="absolute top-0 left-0 w-1 h-full bg-[#5B3CF5]" />
      
      <div className="flex items-center justify-between mb-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
        </div>
        <button 
          onClick={handleCopy}
          className={`shrink-0 w-8 h-8 flex items-center justify-center rounded-lg transition-all ${
            copied 
              ? 'bg-[#10b981] text-white' 
              : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white border border-white/5'
          }`}
          title={copied ? "Copied!" : "Copy command"}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </button>
      </div>
      
      <code className="font-mono text-[13px] text-white/90 leading-relaxed break-all">
        <span className="text-[#5B3CF5] select-none mr-2 font-bold">$</span>
        {installCommand}
      </code>
    </div>
  );
}
