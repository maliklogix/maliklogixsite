'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Props = {
  topbar_active: boolean;
  topbar_text: string;
  topbar_cta_text: string;
  topbar_cta_link: string;
};

// Use sessionStorage so the banner stays visible until the user closes it
// (it won't instantly disappear due to an old localStorage value).
const STORAGE_KEY = 'ml_topbar_v1_session';

export function TopBar({ topbar_active, topbar_text, topbar_cta_text, topbar_cta_link }: Props) {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
 
  useEffect(() => {
    setMounted(true);
    const val = window.sessionStorage.getItem(STORAGE_KEY);
    if (val === '1') {
      setDismissed(true);
    }
  }, []);
 
  if (!topbar_active || !mounted || dismissed) return null;

  return (
    <div className="bg-[#5B3CF5] text-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div className="text-sm font-medium leading-snug truncate sm:whitespace-normal max-w-[180px] sm:max-w-none">
            {topbar_text}
          </div>

          <div className="hidden sm:block">
            <Link
              href={topbar_cta_link}
              className="inline-flex items-center rounded-full bg-[#0D0D12] px-5 py-2 text-sm font-bold text-white hover:bg-[#2C2C35] transition-all shadow-lg shadow-[#0D0D12]/20"
            >
              {topbar_cta_text}
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <Link
                href={topbar_cta_link}
                className="inline-flex items-center rounded-full bg-[#0D0D12] px-4 py-2 text-xs font-bold text-white hover:bg-[#2C2C35] transition-all"
              >
                {topbar_cta_text}
              </Link>
            </div>

            <button
              type="button"
              aria-label="Dismiss top bar"
              onClick={() => {
                window.sessionStorage.setItem(STORAGE_KEY, '1');
                setDismissed(true);
              }}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center"
            >
              <span className="text-base leading-none">×</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

