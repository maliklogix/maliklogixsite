'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu, Mail, MessageSquareText, Search, X } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { useEffect, useRef, useState } from 'react';
import type { SiteSettings } from '@/lib/site-settings';

type Props = {
  settings: SiteSettings;
  whatsappHref: string;
};

export function MegaMenu({ settings, whatsappHref }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<
    Array<{
      type: 'blog' | 'partner';
      title: string;
      description: string;
      href: string;
    }>
  >([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen, searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;

    const t = window.setTimeout(() => searchInputRef.current?.focus(), 0);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError(null);
      return;
    }

    const q = searchQuery.trim();
    if (!q) {
      setSearchResults([]);
      setSearchLoading(false);
      setSearchError(null);
      return;
    }

    setSearchLoading(true);
    setSearchError(null);

    const controller = new AbortController();
    const t = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/site-search?q=${encodeURIComponent(q)}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error('Search request failed');

        const data = (await res.json()) as { results: Array<{
          type: 'blog' | 'partner';
          title: string;
          description: string;
          href: string;
        }> };

        setSearchResults(data.results || []);
      } catch (err) {
        if ((err as any)?.name === 'AbortError') return;
        setSearchError('Could not load search results. Please try again.');
      } finally {
        setSearchLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      window.clearTimeout(t);
    };
  }, [searchOpen, searchQuery]);

  return (
    <>
      <div className={`sticky top-0 z-40 w-full transition-all duration-300
        ${scrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-[#E4E4EB] shadow-lg shadow-black/5'
          : 'bg-white/80 backdrop-blur-lg border-b border-transparent'
        }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="h-16 flex items-center justify-between w-full">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/ml-logo.png?v=4"
                alt={settings.agency_name}
                width={40}
                height={40}
                className="rounded-xl"
                priority
                unoptimized
              />
            </Link>

            <div className="ml-auto flex items-center gap-3">
              <nav className="hidden md:flex items-center gap-6 text-sm">
                {[
                  ['Services', '/services'],
                  ['Solutions', '/solutions'],
                  ['Blog', '/blog'],
                  ['Newsletter', '/newsletter'],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[#0D0D12] hover:text-[#5B3CF5] transition-colors"
                  >
                    {label}
                  </Link>
                ))}

                {/* Resources Dropdown */}
                <div className="relative group grayscale-0">
                  <button className="flex items-center gap-1 text-[#0D0D12] group-hover:text-[#5B3CF5] transition-colors">
                    Resources
                    <svg
                      width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
                      className="group-hover:rotate-180 transition-transform duration-300"
                    >
                      <path d="m6 9 6 6 6-6"/>
                    </svg>
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                    <div className="bg-white border border-[#E4E4EB] rounded-2xl p-2 w-48 shadow-2xl shadow-[#5B3CF5]/10 overflow-hidden">
                      <Link href="/sponsor" className="block px-4 py-2.5 text-sm text-[#6E6E82] hover:text-[#5B3CF5] hover:bg-[#F0ECFF] rounded-xl transition-all">Sponsor</Link>
                      <Link href="/affiliate" className="block px-4 py-2.5 text-sm text-[#6E6E82] hover:text-[#5B3CF5] hover:bg-[#F0ECFF] rounded-xl transition-all">Affiliate</Link>
                      <Link href="/tools" className="block px-4 py-2.5 text-sm text-[#6E6E82] hover:text-[#5B3CF5] hover:bg-[#F0ECFF] rounded-xl transition-all">Free Tools</Link>
                      <Link href="/collaborations" className="block px-4 py-2.5 text-sm text-[#6E6E82] hover:text-[#5B3CF5] hover:bg-[#F0ECFF] rounded-xl transition-all">Collaborations</Link>
                    </div>
                  </div>
                </div>

                {[
                  ['Pricing', '/pricing'],
                  ['Contact', '/contact'],
                ].map(([label, href]) => (
                  <Link
                    key={href}
                    href={href}
                    className="text-[#0D0D12] hover:text-[#5B3CF5] transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>

              {/* Mobile drawer */}
              <div className="md:hidden">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Open search"
                    onClick={() => {
                      setMenuOpen(false);
                      setSearchQuery('');
                      setSearchOpen(true);
                    }}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#E4E4EB] bg-white hover:bg-[#F7F7FA] transition-colors"
                  >
                    <Search size={18} className="text-[#0D0D12]" />
                  </button>

                  <button
                    type="button"
                    aria-label="Open menu"
                    onClick={() => {
                      setMenuOpen(true);
                      setSearchOpen(false);
                    }}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-xl border border-[#E4E4EB] bg-white hover:bg-[#F7F7FA] transition-colors"
                  >
                    <Menu size={18} className="text-[#0D0D12]" />
                  </button>
                </div>

              {menuOpen && (
                <>
                  <button
                    type="button"
                    aria-label="Close menu"
                    onClick={() => setMenuOpen(false)}
                    className="fixed inset-0 z-50 bg-black/10"
                  />

                  <aside
                    className="fixed right-0 top-0 z-50 w-11/12 max-w-sm h-[100dvh] bg-white border-l border-[#E4E4EB] overflow-y-auto overflow-x-hidden"
                    aria-label="Mobile menu"
                  >
                    <div className="p-4 border-b border-[#E4E4EB] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/ml-logo.png?v=4"
                          alt={settings.agency_name}
                          width={32}
                          height={32}
                          className="rounded-xl"
                          priority
                          unoptimized
                        />
                        <div className="leading-tight">
                          <div className="font-heading text-sm font-extrabold text-[#0D0D12]">{settings.agency_name}</div>
                          <div className="text-[10px] text-[#6E6E82]">Menu</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        aria-label="Close"
                        onClick={() => setMenuOpen(false)}
                        className="w-10 h-10 rounded-xl border border-[#E4E4EB] bg-white hover:bg-[#F7F7FA] transition-colors flex items-center justify-center"
                      >
                        <X size={18} className="text-[#0D0D12]" />
                      </button>
                    </div>

                    <div className="p-4 space-y-6">
                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-widest text-[#5B3CF5]">Services</div>
                        <div className="grid grid-cols-1 gap-2 pl-2">
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/services" onClick={() => setMenuOpen(false)}>AI Marketing</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/services/automation" onClick={() => setMenuOpen(false)}>Automation</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/services/seo-geo" onClick={() => setMenuOpen(false)}>SEO & GEO</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/services/shopify" onClick={() => setMenuOpen(false)}>Shopify AI</Link>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-widest text-[#5B3CF5]">Solutions</div>
                        <div className="grid grid-cols-1 gap-2 pl-2">
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/solutions#e-commerce" onClick={() => setMenuOpen(false)}>E-Commerce</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/solutions#saas" onClick={() => setMenuOpen(false)}>SaaS</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/solutions#local" onClick={() => setMenuOpen(false)}>Local Businesses</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/solutions#white-label" onClick={() => setMenuOpen(false)}>Agencies (White Label)</Link>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-widest text-[#5B3CF5]">Resources</div>
                        <div className="grid grid-cols-1 gap-2 pl-2">
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/sponsor" onClick={() => setMenuOpen(false)}>Sponsor</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/affiliate" onClick={() => setMenuOpen(false)}>Affiliate</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/tools" onClick={() => setMenuOpen(false)}>Free Tools</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/collaborations" onClick={() => setMenuOpen(false)}>Collaborations</Link>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="text-xs font-bold uppercase tracking-widest text-[#5B3CF5]">Company</div>
                        <div className="grid grid-cols-1 gap-2 pl-2">
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/about" onClick={() => setMenuOpen(false)}>Our Story</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/newsletter" onClick={() => setMenuOpen(false)}>Newsletter</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link>
                          <Link className="text-sm text-[#0D0D12] hover:text-[#5B3CF5]" href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border-t border-[#E4E4EB] space-y-3">
                      <Link
                        href={`mailto:${settings.contact_email}`}
                        onClick={() => setMenuOpen(false)}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#5B3CF5] px-4 py-3 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-colors"
                      >
                        <Mail size={16} />
                        Email Us
                      </Link>
                      <Link
                        href="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="w-full inline-flex items-center justify-center rounded-xl border border-[#E4E4EB] bg-white px-4 py-3 text-sm font-semibold text-[#0D0D12] hover:bg-[#F7F7FA] transition-colors"
                      >
                        Start OpenClaw →
                      </Link>
                      <Link
                        href={whatsappHref}
                        onClick={() => setMenuOpen(false)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-[#E4E4EB] bg-white px-4 py-3 text-sm font-semibold text-[#0D0D12] hover:bg-[#F7F7FA] transition-colors"
                      >
                        <MessageSquareText size={16} />
                        WhatsApp
                      </Link>

                    </div>
                  </aside>
                </>
              )}
            </div>

            <div className="hidden md:flex items-center gap-3">


              <button
                type="button"
                aria-label="Search"
                onClick={() => {
                  setMenuOpen(false);
                  setSearchQuery('');
                  setSearchOpen(true);
                }}
                className="inline-flex items-center gap-2 text-sm text-[#6E6E82] hover:text-[#0D0D12] transition-colors"
              >
                <Search size={16} />
                Search
              </button>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#5B3CF5] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#7C5CFA] transition-all shadow-lg shadow-[#5B3CF5]/20"
              >
                Get Started →
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>

      {/* Full-screen search overlay (full behavior wired up in later todos) */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/20 backdrop-blur-sm"
          onClick={() => setSearchOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Site search"
        >
          <div
            className="h-full w-full bg-white/95"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-w-3xl mx-auto px-4 pt-24 pb-16">
              <div className="flex items-center gap-3">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9494A3]"
                  />
                  <input
                    ref={searchInputRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search MalikLogix (blog + affiliates)..."
                    className="w-full bg-white border border-[#E4E4EB] focus:border-[#5B3CF5] focus:ring-0 px-12 py-4 rounded-2xl text-sm outline-none transition-colors"
                  />
                </div>

                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() => setSearchOpen(false)}
                  className="w-10 h-10 rounded-xl border border-[#E4E4EB] bg-white hover:bg-[#F7F7FA] transition-colors flex items-center justify-center"
                >
                  <X size={18} className="text-[#0D0D12]" />
                </button>
              </div>

              <div className="mt-6">
                <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#9999AA]">
                  Results
                </div>
                <div className="mt-4 max-h-[60dvh] overflow-y-auto">
                  {!searchQuery.trim() ? (
                    <div className="py-10 text-center text-[#6E6E82]">
                      Type to search blog posts and affiliates.
                    </div>
                  ) : searchLoading ? (
                    <div className="py-10 text-center text-[#6E6E82]">Loading…</div>
                  ) : searchError ? (
                    <div className="py-10 text-center text-[#6E6E82]">{searchError}</div>
                  ) : searchResults.length === 0 ? (
                    <div className="py-10 text-center text-[#6E6E82]">
                      No results for <span className="font-bold text-[#0D0D12]">{searchQuery}</span>.
                    </div>
                  ) : (
                    <div className="space-y-3 py-2">
                      {searchResults.map((r, idx) => (
                        <Link
                          key={`${r.type}-${idx}-${r.href}`}
                          href={r.href}
                          onClick={() => setSearchOpen(false)}
                          className="block rounded-2xl border border-[#E4E4EB] bg-white p-4 hover:border-[#5B3CF5]/40 hover:shadow-lg hover:shadow-[#5B3CF5]/10 transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-[#5B3CF5] bg-[#F0ECFF] px-2 py-1 rounded-full">
                              {r.type === 'blog' ? 'Blog' : 'Affiliate'}
                            </span>
                          </div>
                          <div className="mt-2 font-heading text-[#0D0D12] font-extrabold">
                            {r.title}
                          </div>
                          <div className="mt-1 text-sm text-[#6E6E82] line-clamp-2">
                            {r.description}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}


