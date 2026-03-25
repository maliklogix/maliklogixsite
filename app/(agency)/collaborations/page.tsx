import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collaborations | MalikLogix',
  description: 'Work with us on AI and automation projects.',
};

export default function CollaborationsPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-24 text-center">
      <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0D0D12] mb-6">
        Collaborate With Us
      </h1>
      <p className="text-lg text-[#6E6E82] mb-10 max-w-2xl mx-auto">
        We love working with creators, developers, and other agencies 
        on innovative AI and automation projects. Let&apos;s build something 
        incredible together.
      </p>
      <a
        href="mailto:maliklogix@gmail.com"
        className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-8 py-4 text-white font-bold hover:bg-[#7C5CFA] transition-all shadow-lg shadow-[#5B3CF5]/20"
      >
        Start a Collaboration →
      </a>
    </main>
  );
}
