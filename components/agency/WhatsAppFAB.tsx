'use client';

import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

type Props = {
  href: string;
};

export function WhatsAppFAB({ href }: Props) {
  const [hovered, setHovered] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
      {/* Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className={`w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white shadow-lg
                    hover:bg-black/70 hover:scale-110 transition-all duration-300
                    ${showTop ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-2 pointer-events-none'}`}
      >
        <ArrowUp size={16} strokeWidth={2.5} />
      </button>

      {/* WhatsApp tooltip */}
      <div className="relative flex items-center gap-3">
        {hovered && (
          <div className="absolute right-16 bg-white shadow-xl rounded-xl px-4 py-2 text-sm font-medium text-gray-800 border whitespace-nowrap">
            Chat with us on WhatsApp
          </div>
        )}

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg
                     hover:scale-110 transition-transform duration-200"
          aria-label="Chat on WhatsApp"
        >
          <svg className="w-7 h-7 fill-white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.562 4.14 1.544 5.876L0 24l6.282-1.516A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.805 9.805 0 01-5.032-1.386l-.36-.214-3.733.9.94-3.638-.234-.373A9.818 9.818 0 012.182 12C2.182 6.578 6.578 2.182 12 2.182c5.422 0 9.818 4.396 9.818 9.818 0 5.422-4.396 9.818-9.818 9.818z" />
          </svg>
        </a>
      </div>
    </div>
  );
}
