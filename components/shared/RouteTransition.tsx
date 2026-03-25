'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <AnimatePresence mode="wait">
        {/* Rolling circle transition bar only (no content move) */}
        <motion.div
          key={`transition-bar-${pathname}`}
          aria-hidden="true"
          className="fixed left-0 right-0 top-0 z-[60] h-1 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >
          <div className="absolute inset-0 bg-[#5B3CF5]/20" />
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#5B3CF5] shadow-[0_0_18px_rgba(91,60,245,0.35)]"
            initial={{ left: '-2%', x: -12 }}
            animate={{ left: '102%', x: 12 }}
            transition={{ duration: 0.34, ease: 'easeInOut' }}
          />
        </motion.div>
      </AnimatePresence>

      {children}
    </>
  );
}

