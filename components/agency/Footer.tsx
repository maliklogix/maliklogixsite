import Link from 'next/link';
import Image from 'next/image';
import type { SiteSettings } from '@/lib/site-settings';

type Props = {
  settings: SiteSettings;
};

export function Footer({ settings }: Props) {
  const socialLinks = [
    { label: 'YouTube', href: settings.youtube_url, title: 'MalikLogix on YouTube @maliklogix' },
    { label: 'X', href: settings.twitter_url, title: 'MalikLogix on X @maliklogix' },
    { label: 'GitHub', href: settings.github_url, title: 'MalikLogix on GitHub' },
    { label: 'LinkedIn', href: settings.linkedin_url, title: 'MalikLogix on LinkedIn' },
    { label: 'Instagram', href: settings.instagram_url, title: 'MalikLogix on Instagram' },
    ...(settings.facebook_url
      ? [{ label: 'Facebook', href: settings.facebook_url, title: 'MalikLogix on Facebook' as const }]
      : []),
    ...(settings.tiktok_url ? [{ label: 'TikTok', href: settings.tiktok_url, title: 'MalikLogix on TikTok' as const }] : []),
  ].filter((item) => Boolean(item.href));

  return (
    <footer className="bg-[#F7F7FA] border-t border-[#E4E4EB] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <Image
                src="/ml-logo.png?v=4"
                alt={settings.agency_name}
                width={42}
                height={42}
                className="rounded-xl"
                priority
                unoptimized
              />
              <div className="font-heading font-extrabold text-lg">{settings.agency_name}</div>
            </div>
            <p className="text-sm text-[#6E6E82] mt-2 max-w-xs">
              AI digital marketing, SEO, and automation—built for measurable growth.
            </p>
            <nav className="mt-5" aria-label="Social links">
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {socialLinks.map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-[#0D0D12] underline-offset-4 hover:text-[#5B3CF5] hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                      title={item.title}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div>
            <div className="text-sm font-semibold">Services</div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/services/ai-marketing" className="text-[#6E6E82] hover:text-[#0D0D12]">
                AI Marketing
              </Link>
              <Link href="/services/automation" className="text-[#6E6E82] hover:text-[#0D0D12]">
                Automation
              </Link>
              <Link href="/services/content-creation" className="text-[#6E6E82] hover:text-[#0D0D12]">
                Content AI
              </Link>
              <Link href="/services/seo-geo" className="text-[#6E6E82] hover:text-[#0D0D12]">
                SEO & GEO
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Company</div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <Link href="/about" className="text-[#6E6E82] hover:text-[#0D0D12]">
                About Us
              </Link>
              <Link href="/portfolio" className="text-[#6E6E82] hover:text-[#0D0D12]">
                Portfolio
              </Link>
              <Link href="/case-studies" className="text-[#6E6E82] hover:text-[#0D0D12]">
                Case Studies
              </Link>
              <Link href="/docs" className="text-[#6E6E82] hover:text-[#0D0D12]">
                Docs — learn AI marketing
              </Link>
              <Link href="/newsletter" className="text-[#6E6E82] hover:text-[#0D0D12]">
                Blog / Newsletter
              </Link>
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold">Contact</div>
            <div className="mt-3 flex flex-col gap-2 text-sm">
              <a className="text-[#6E6E82] hover:text-[#0D0D12]" href={`mailto:${settings.contact_email}`}>
                {settings.contact_email}
              </a>
              <Link href="/contact" className="text-[#6E6E82] hover:text-[#0D0D12]">
                Contact page →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[#E4E4EB] pt-6 text-xs text-[#6E6E82]">
          © 2026 MalikLogix. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

