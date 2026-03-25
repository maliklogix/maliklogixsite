'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Clock } from 'lucide-react';

export default function NewsletterSignup() {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submittingNewsletter, setSubmittingNewsletter] = useState(false);

  async function handleNewsletterSubscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubmittingNewsletter(true);
    try {
      const res = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail, source: 'blog-post' }),
      });
      const json = await res.json().catch(() => ({} as { error?: string }));
      if (!res.ok) throw new Error(json?.error || 'Subscription failed. Please try again.');
      toast.success('Subscribed successfully');
      setNewsletterEmail('');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Subscription failed. Please try again.';
      toast.error(message);
    } finally {
      setSubmittingNewsletter(false);
    }
  }

  return (
    <section className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-white border border-[#E4E4EB] relative overflow-hidden text-center">
      {/* Subtle background accents (keep it clean for AdSense/SEO) */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#5B3CF5]/10 blur-[100px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#7C5CFA]/10 blur-[100px] translate-x-1/2 translate-y-1/2" />

      <div className="relative z-10 max-w-xl mx-auto">
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#0D0D12] mb-4">
              Liked this article? Join the newsletter.
          </h3>
          <p className="text-[#6E6E82] mb-8 text-sm">
              Get weekly AI marketing breakdowns and automation playbooks delivered straight to your inbox.
          </p>
          <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row gap-3">
              <input 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  type="email" 
                  required
                  placeholder="your@email.com"
                  className="flex-1 bg-white border border-[#E4E4EB] rounded-full px-6 py-4 text-[#0D0D12] text-sm outline-none focus:border-[#5B3CF5] transition-all"
              />
              <button
                  type="submit"
                  disabled={submittingNewsletter}
                  className="bg-[#5B3CF5] hover:bg-[#7C5CFA] text-white font-bold px-8 py-4 rounded-full text-sm transition-all shadow-xl shadow-[#5B3CF5]/20 disabled:opacity-60"
              >
                  {submittingNewsletter ? 'Joining...' : 'Join Now'}
              </button>
          </form>
          <div className="mt-4 text-[10px] text-[#6E6E82] flex items-center justify-center gap-2">
              <span className="flex items-center gap-1"><Clock size={10} /> No spam.</span>
              <span className="w-1 h-1 rounded-full bg-[#E4E4EB]" />
              <span>Unsubscribe anytime.</span>
          </div>
      </div>
    </section>
  );
}
