'use client';

import { useState } from 'react';
import { toast } from 'sonner';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, source: 'subscribe-page' }),
      });
      const json = await res.json().catch(() => ({} as { error?: string }));
      if (!res.ok) throw new Error(json?.error || 'Subscription failed. Please try again.');
      toast.success('Subscribed successfully!');
      setEmail('');
      setFirstName('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Subscription failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-heading text-3xl font-extrabold text-[#0D0D12]">Join 10,000+ AI Marketing Professionals</h1>
      <p className="mt-3 text-[#6E6E82]">
        Get 4-minute AI marketing insights every week. Used by founders, marketers, and growth hackers worldwide.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-[#E4E4EB] bg-white p-6">
        <label className="block text-sm font-semibold text-[#0D0D12]">First Name (optional)</label>
        <input
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[#E4E4EB] px-4 py-3 outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
          type="text"
          placeholder="Your first name"
        />

        <label className="block text-sm font-semibold text-[#0D0D12] mt-4">Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full rounded-xl border border-[#E4E4EB] px-4 py-3 outline-none focus:ring-2 focus:ring-[#5B3CF5]/30"
          type="email"
          required
          placeholder="you@company.com"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-5 w-full rounded-full bg-[#5B3CF5] py-3 text-white font-semibold hover:bg-[#7C5CFA] transition-colors disabled:opacity-60"
        >
          {loading ? 'Subscribing...' : 'Subscribe for Free →'}
        </button>

        <p className="mt-3 text-xs text-[#6E6E82]">No spam. Unsubscribe anytime.</p>
      </form>
    </div>
  );
}

