'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { Loader2, CheckCircle2 } from 'lucide-react';

type ContactFormProps = {
  /** Full fields for detailed inquiries; minimal keeps only essentials for a cleaner page. */
  variant?: 'full' | 'minimal';
};

export function ContactForm({ variant = 'full' }: ContactFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState('');
  const [budget, setBudget] = useState('');
  const [message, setMessage] = useState('');
  const maxMessageLength = 1200;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          service,
          budget,
          message,
        }),
      });
      const json = await res.json().catch(() => ({} as { error?: string }));
      if (!res.ok) throw new Error(json?.error || 'Could not send message right now.');
      
      setSuccess(true);
      toast.success('Message sent! We will be in touch shortly.');
      
      setName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setService('');
      setBudget('');
      setMessage('');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Could not send message right now.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  const isMinimal = variant === 'minimal';

  if (success) {
    return (
      <div className={isMinimal ? 'mt-10 py-12 text-center' : 'mt-8 flex flex-col items-center justify-center rounded-2xl border border-[#E4E4EB] bg-white p-12 text-center shadow-sm'}>
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#10B981]/10 text-[#10B981] mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-heading text-xl font-bold text-[#0D0D12]">Message Sent!</h3>
        <p className="mt-2 text-[#6E6E82]">We have received your message and will be in touch shortly.</p>
        <button 
          onClick={() => setSuccess(false)}
          className="mt-8 text-sm font-semibold text-[#5B3CF5] hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={
        isMinimal
          ? 'mt-10 space-y-5'
          : 'mt-8 space-y-4 rounded-2xl border border-[#E4E4EB] bg-white p-6'
      }
      aria-labelledby={isMinimal ? 'contact-form-heading' : undefined}
    >
      <div className={isMinimal ? '' : 'mb-1'}>
        <h2
          id={isMinimal ? 'contact-form-heading' : undefined}
          className="font-heading text-lg font-bold text-[#0D0D12]"
        >
          {isMinimal ? 'Send a message' : 'Send us a message'}
        </h2>
        <p className="mt-1 text-xs text-[#6E6E82]">
          {isMinimal
            ? 'We usually reply within one business day.'
            : 'Share your goals and we will reply with a practical AI digital marketing action plan.'}
        </p>
      </div>

      <div>
        <label className="block text-sm font-semibold text-[#0D0D12]">Name *</label>
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="name"
          placeholder="John Doe"
          className="mt-2 w-full rounded-xl border border-[#E4E4EB] bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B3CF5] focus:bg-white focus:ring-4 focus:ring-[#5B3CF5]/10"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold text-[#0D0D12]">Email *</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="john@example.com"
            className="mt-2 w-full rounded-xl border border-[#E4E4EB] bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B3CF5] focus:bg-white focus:ring-4 focus:ring-[#5B3CF5]/10"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-[#0D0D12]">Phone / WhatsApp</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            autoComplete="tel"
            placeholder="+1 (555) 000-0000"
            className="mt-2 w-full rounded-xl border border-[#E4E4EB] bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B3CF5] focus:bg-white focus:ring-4 focus:ring-[#5B3CF5]/10"
          />
        </div>
      </div>

      {!isMinimal && (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-semibold text-[#0D0D12]">Company</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Acme Corp"
                className="mt-2 w-full rounded-xl border border-[#E4E4EB] bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B3CF5] focus:bg-white focus:ring-4 focus:ring-[#5B3CF5]/10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#0D0D12]">Interested Service</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[#E4E4EB] bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B3CF5] focus:bg-white focus:ring-4 focus:ring-[#5B3CF5]/10"
              >
                <option value="">Select a service</option>
                <option value="AI Marketing">AI Marketing</option>
                <option value="SEO & GEO">SEO & GEO</option>
                <option value="Automation">Automation</option>
                <option value="Content Creation">Content Creation</option>
                <option value="Shopify AI">Shopify AI</option>
                <option value="Analytics">Analytics</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#0D0D12]">Budget</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="mt-2 w-full rounded-xl border border-[#E4E4EB] bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B3CF5] focus:bg-white focus:ring-4 focus:ring-[#5B3CF5]/10"
            >
              <option value="">Select budget range</option>
              <option value="Under $500">Under $500</option>
              <option value="$500 - $2,000">$500 - $2,000</option>
              <option value="$2,000 - $5,000">$2,000 - $5,000</option>
              <option value="$5,000 - $10,000">$5,000 - $10,000</option>
              <option value="$10,000+">$10,000+</option>
            </select>
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-semibold text-[#0D0D12]">Message</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, maxMessageLength))}
          className={
            isMinimal
              ? 'mt-2 w-full rounded-xl border border-[#E4E4EB] bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B3CF5] focus:bg-white focus:ring-4 focus:ring-[#5B3CF5]/10 min-h-[100px]'
              : 'mt-2 w-full rounded-xl border border-[#E4E4EB] bg-[#FAFAFC] px-4 py-3 text-sm outline-none transition-colors focus:border-[#5B3CF5] focus:bg-white focus:ring-4 focus:ring-[#5B3CF5]/10 min-h-[120px]'
          }
          placeholder={
            isMinimal ? 'What would you like help with?' : 'Tell us your current challenge, timeline, and target results...'
          }
        />
        <div className="mt-1 text-[11px] text-[#6E6E82]">{message.length}/{maxMessageLength}</div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className={
          isMinimal
            ? 'w-full rounded-full bg-[#5B3CF5] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#7C5CFA] hover:shadow-lg hover:shadow-[#5B3CF5]/20 disabled:opacity-60 flex items-center justify-center gap-2 sm:w-auto sm:px-8'
            : 'mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#5B3CF5] px-6 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] hover:shadow-lg hover:shadow-[#5B3CF5]/20 transition-all disabled:opacity-60'
        }
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? 'Sending…' : 'Send message'}
      </button>
      <p className="text-[11px] text-[#6E6E82]">By submitting, you agree we may contact you by email or WhatsApp.</p>
    </form>
  );
}
