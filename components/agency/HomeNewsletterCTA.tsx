'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';
import { NEWSLETTER_TAGLINE } from '@/lib/constants';

/**
 * Minimal newsletter signup for the home page (above footer). SEO: single section + labelled form.
 */
export function HomeNewsletterCTA() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'home-page' }),
      });
      const json = await res.json().catch(() => ({} as { error?: string }));
      if (!res.ok) throw new Error(json?.error || 'Subscription failed. Please try again.');
      toast.success('You are subscribed. Check your inbox soon.');
      setEmail('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Subscription failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      className="mt-16 sm:mt-20 rounded-2xl border border-[#E4E4EB] bg-[#FAFAFC] px-5 py-8 sm:px-8 sm:py-10"
      aria-label="Learn AI digital marketing and newsletter"
    >
      <div className="mx-auto max-w-2xl">
        {/* Self-serve learning + docs */}
        <div className="text-center sm:text-left">
          <h2
            id="home-learn-docs-heading"
            className="font-heading text-xl font-extrabold text-[#0D0D12] sm:text-2xl"
          >
            Want to learn AI digital marketing on your own?
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#6E6E82] sm:text-base">
            AI digital marketing blends search intent, helpful content, and smart automation—without replacing strategy.
            Our docs walk through the ideas we use with clients so you can study at your pace, then apply what fits your
            business.
          </p>
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/docs"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-[#0D0D12] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#2a2a35] sm:w-auto"
            >
              Open Docs →
            </Link>
            <Link
              href="/blog"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border border-[#E4E4EB] bg-white px-6 text-sm font-semibold text-[#0D0D12] transition-colors hover:bg-white/80 sm:w-auto"
            >
              Read the blog
            </Link>
          </div>
        </div>

        <div className="my-8 border-t border-[#E4E4EB]" role="presentation" />

        {/* Newsletter */}
        <div className="text-center">
          <h3 id="home-newsletter-heading" className="font-heading text-lg font-extrabold text-[#0D0D12] sm:text-xl">
            Newsletter
          </h3>
          <p className="mt-2 text-sm text-[#6E6E82] sm:text-base">{NEWSLETTER_TAGLINE}</p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 sm:mx-auto sm:max-w-md sm:flex-row sm:items-stretch"
            aria-labelledby="home-newsletter-heading"
          >
            <label htmlFor="home-newsletter-email" className="sr-only">
              Email for newsletter
            </label>
            <input
              id="home-newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="min-h-11 flex-1 rounded-full border border-[#E4E4EB] bg-white px-4 text-sm text-[#0D0D12] outline-none placeholder:text-[#9B9BB0] focus:ring-2 focus:ring-[#5B3CF5]/30"
            />
            <button
              type="submit"
              disabled={loading}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-[#5B3CF5] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#7C5CFA] disabled:opacity-60"
            >
              {loading ? 'Joining…' : 'Subscribe'}
            </button>
          </form>

          <p className="mt-4 text-xs text-[#6E6E82]">
            No spam. Unsubscribe anytime.{' '}
            <Link href="/subscribe" className="font-medium text-[#5B3CF5] underline-offset-2 hover:underline">
              Full signup page
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
