import Link from 'next/link';
import { buildWhatsAppPrefilled, getSiteSettings } from '@/lib/site-settings';
import { ContactForm } from '@/components/agency/ContactForm';

export const metadata = {
  title: 'Contact',
  description:
    'Contact MalikLogix for AI digital marketing, SEO, and automation. Simple form—fast replies.',
};

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const whatsAppHref = buildWhatsAppPrefilled(settings.whatsapp);

  const social = [
    { label: 'YouTube @maliklogix', href: settings.youtube_url },
    { label: 'X @maliklogix', href: settings.twitter_url },
    { label: 'GitHub', href: settings.github_url },
    { label: 'LinkedIn', href: settings.linkedin_url },
    { label: 'Instagram', href: settings.instagram_url },
  ].filter((s) => Boolean(s.href));

  return (
    <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <header className="text-center sm:text-left">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#5B3CF5]">Contact</p>
        <h1 className="font-heading mt-2 text-3xl font-extrabold tracking-tight text-[#0D0D12] sm:text-4xl">
          Let&apos;s grow with AI digital marketing
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-sm text-[#6E6E82] sm:mx-0 sm:text-base">
          Share your goal in a few lines. We&apos;ll reply with a clear next step—usually within one business day.
        </p>
      </header>

      <section
        className="mt-10 rounded-2xl border border-[#E4E4EB] bg-[#FAFAFC] p-6 sm:p-8"
        aria-labelledby="ai-dm-heading"
      >
        <h2 id="ai-dm-heading" className="font-heading text-lg font-bold text-[#0D0D12]">
          AI digital marketing that maps to revenue
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-[#6E6E82]">
          MalikLogix helps businesses use AI where it matters: search visibility, content systems, and automation—so
          campaigns tie to leads and sales, not vanity metrics.
        </p>
        <ul className="mt-4 list-inside list-disc space-y-1.5 text-sm text-[#0D0D12] marker:text-[#5B3CF5]">
          <li>SEO and content aligned with how people actually search and buy</li>
          <li>Automation that saves time without sounding robotic</li>
          <li>Clear reporting you can act on week to week</li>
        </ul>
      </section>

      <ContactForm variant="minimal" />

      <section className="mt-14 border-t border-[#E4E4EB] pt-10" aria-labelledby="contact-alt-heading">
        <h2 id="contact-alt-heading" className="text-center text-xs font-semibold uppercase tracking-wider text-[#6E6E82] sm:text-left">
          Other ways to reach us
        </h2>
        <div className="mt-4 flex flex-col items-center gap-3 text-sm sm:flex-row sm:flex-wrap sm:justify-start sm:gap-x-6 sm:gap-y-2">
          <a className="text-[#5B3CF5] hover:underline" href={`mailto:${settings.contact_email}`}>
            {settings.contact_email}
          </a>
          <span className="hidden text-[#E4E4EB] sm:inline" aria-hidden>
            ·
          </span>
          <a href={whatsAppHref} target="_blank" rel="noopener noreferrer" className="text-[#00A884] hover:underline">
            WhatsApp
          </a>
          <span className="hidden text-[#E4E4EB] sm:inline" aria-hidden>
            ·
          </span>
          <span className="text-[#6E6E82]">{settings.phone}</span>
        </div>

        <nav className="mt-6" aria-label="MalikLogix on social media">
          <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm sm:justify-start">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0D0D12] underline-offset-4 hover:text-[#5B3CF5] hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="mt-8 text-center text-xs text-[#6E6E82] sm:text-left">
          Prefer email digests?{' '}
          <Link href="/subscribe" className="font-medium text-[#5B3CF5] hover:underline">
            Join the newsletter
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
