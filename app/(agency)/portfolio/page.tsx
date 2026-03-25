import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio | MalikLogix',
  description: 'Explore our portfolio of AI digital marketing and automation projects.',
};

export default function PortfolioPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0D12] mb-6">
        Portfolio
      </h1>
      <p className="text-lg text-[#6E6E82] mb-10 max-w-2xl mx-auto">
        We&apos;re building out detailed case studies for each client engagement. 
        In the meantime, reach out directly and we&apos;ll walk you through 
        relevant work for your industry.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-8 py-4 text-white font-bold hover:bg-[#7C5CFA] transition-all shadow-lg shadow-[#5B3CF5]/20"
      >
        Talk to us →
      </Link>
    </main>
  );
}
