import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Case Studies | MalikLogix',
  description: 'Detailed case studies documenting the exact systems built and results achieved.',
};

export default function CaseStudiesPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0D12] mb-6">
        Case Studies
      </h1>
      <p className="text-lg text-[#6E6E82] mb-10 max-w-2xl mx-auto">
        Detailed case studies are being prepared. Each one documents 
        the exact systems built, results achieved, and timeline to ROI 
        for real client engagements.
      </p>
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-8 py-4 text-white font-bold hover:bg-[#7C5CFA] transition-all shadow-lg shadow-[#5B3CF5]/20"
      >
        Discuss your project →
      </Link>
    </main>
  );
}
