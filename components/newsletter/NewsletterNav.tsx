import Link from 'next/link';
import Image from 'next/image';
import { SITE_NAME } from '@/lib/constants';

export function NewsletterNav() {
  return (
    <div className="bg-white/95 backdrop-blur border-b border-[#E4E4EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/ml-logo.png?v=4"
            alt={SITE_NAME}
            width={34}
            height={34}
            className="rounded-xl"
            priority
            unoptimized
          />
          <span className="font-heading font-extrabold text-lg hidden sm:inline">{SITE_NAME}</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/newsletter" className="text-[#0D0D12] hover:text-[#5B3CF5] transition-colors">
            Posts
          </Link>
          <Link href="/#about" className="text-[#0D0D12] hover:text-[#5B3CF5] transition-colors">
            About Us
          </Link>
          <Link href="/sponsor" className="text-[#0D0D12] hover:text-[#5B3CF5] transition-colors">
            Sponsor
          </Link>
        </nav>

        <div>
          <Link
            href="/subscribe"
            className="inline-flex items-center rounded-full bg-[#5B3CF5] px-4 py-2 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
          >
            Join Free Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

