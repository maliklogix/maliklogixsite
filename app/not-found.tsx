'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Smile, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function NotFoundPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // Redirect after 3 seconds
    const redirectTimer = setTimeout(() => {
      router.push('/');
    }, 3000);

    // Update countdown every second
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 1));
    }, 1000);

    return () => {
      clearTimeout(redirectTimer);
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-[#F7F7FA]">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-[#5B3CF5]/20 blur-3xl rounded-full" />
        <div className="relative flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-xl">
          <Smile size={48} className="text-[#5B3CF5]" strokeWidth={1.5} />
        </div>
      </div>
      
      <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-[#0D0D12] mb-3 tracking-tight">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl font-semibold text-[#0D0D12] mb-4">
        Oops! No page found here.
      </h2>
      
      <p className="text-[#6E6E82] text-sm sm:text-base max-w-md mx-auto mb-8 leading-relaxed">
        Don&apos;t worry, you haven&apos;t broken the internet. We&apos;re taking you back to safety in{' '}
        <span className="font-bold text-[#5B3CF5]">{countdown} {countdown === 1 ? 'second' : 'seconds'}</span>.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-xl bg-[#0D0D12] px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0D0D12] focus:ring-offset-2"
      >
        Go Back Now <ArrowRight size={16} />
      </Link>
    </div>
  );
}
