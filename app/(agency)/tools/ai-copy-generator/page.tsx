'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

type Tone = 'Professional' | 'Casual' | 'Urgent' | 'Friendly' | 'Bold';
type OutputType =
  | 'Facebook Ad'
  | 'Google Ad'
  | 'Email Subject'
  | 'Headline'
  | 'CTA Button'
  | 'Product Description'
  | 'Tweet';

export default function AiCopyGeneratorPage() {
  const [product, setProduct] = useState('');
  const [audience, setAudience] = useState('');
  const [benefit, setBenefit] = useState('');
  const [tone, setTone] = useState<Tone>('Professional');
  const [type, setType] = useState<OutputType>('Headline');
  const [loading, setLoading] = useState(false);
  const [variations, setVariations] = useState<string[]>([]);

  const canGenerate = useMemo(() => {
    return product.trim() && audience.trim() && benefit.trim();
  }, [product, audience, benefit]);

  async function onGenerate() {
    if (!canGenerate) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));

    const p = product.trim();
    const a = audience.trim();
    const b = benefit.trim();

    const t = tone;
    const base = [
      `${t === 'Urgent' ? 'Act now:' : 'Discover:'} ${p} for ${a} — ${b}`,
      `Get ${b} with ${p}. Built for ${a}.`,
      `${p}: ${b}. Designed for ${a}.`,
    ];

    const formatted = base.map((x) => {
      if (type === 'CTA Button') return x.includes('—') ? x.split('—')[0].trim() : x;
      if (type === 'Email Subject') return `Re: ${x.replace(/—.*/, '').trim()}`;
      if (type === 'Tweet') return x.replace(/for /, '').slice(0, 120);
      return x;
    });

    setVariations(formatted.slice(0, 3));
    setLoading(false);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-[#0D0D12]">AI Copy Generator</h1>
      <p className="mt-4 text-[#6E6E82] max-w-2xl">
        Generate copy variations quickly (mock generator for now). For production-grade outputs, wire up the Claude API later.
      </p>

      <section className="mt-10 rounded-2xl border border-[#E4E4EB] bg-white p-6 md:p-7">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Product/Service" value={product} onChange={setProduct} placeholder="AI SEO Audit" />
          <Field label="Target audience" value={audience} onChange={setAudience} placeholder="Shopify owners" />
          <Field label="Unique benefit" value={benefit} onChange={setBenefit} placeholder="Increase traffic in 30 days" />

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#6E6E82]">Tone</label>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as Tone)}
              className="w-full rounded-xl border border-[#E4E4EB] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
            >
              {['Professional', 'Casual', 'Urgent', 'Friendly', 'Bold'].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-[#6E6E82]">Output type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as OutputType)}
              className="w-full rounded-xl border border-[#E4E4EB] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
            >
              {[
                'Facebook Ad',
                'Google Ad',
                'Email Subject',
                'Headline',
                'CTA Button',
                'Product Description',
                'Tweet',
              ].map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            type="button"
            disabled={!canGenerate || loading}
            onClick={onGenerate}
            className="rounded-full bg-[#5B3CF5] hover:bg-[#7C5CFA] disabled:opacity-60 disabled:cursor-not-allowed px-6 py-3 text-sm font-semibold text-white transition-colors"
          >
            {loading ? 'Generating…' : 'Generate 3 Variations →'}
          </button>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full border border-[#E4E4EB] bg-white px-6 py-3 text-sm font-semibold text-[#0D0D12] hover:bg-[#F7F7FA] transition-colors"
          >
            Need full strategy? →
          </Link>
        </div>

        {variations.length > 0 && (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {variations.map((v, idx) => (
              <div key={idx} className="rounded-2xl border border-[#E4E4EB] bg-[#F7F7FA] p-4 space-y-3">
                <div className="text-xs font-bold uppercase tracking-widest text-[#5B3CF5]">Variation {idx + 1}</div>
                <div className="text-sm text-[#0D0D12] leading-relaxed font-heading">{v}</div>
                <button
                  type="button"
                  className="w-full rounded-xl bg-white border border-[#E4E4EB] px-4 py-2 text-sm font-semibold text-[#0D0D12] hover:bg-white/70 transition-colors"
                  onClick={() => {
                    navigator.clipboard?.writeText(v);
                  }}
                >
                  Copy to clipboard
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-[#6E6E82]">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E4E4EB] px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
      />
    </div>
  );
}

