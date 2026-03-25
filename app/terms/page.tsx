import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service | MalikLogix',
  description: 'Terms of service for using MalikLogix website and services.',
};

export default function TermsOfServicePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0D0D12]">Terms of Service</h1>
      <p className="mt-4 text-[#6E6E82]">
        By using MalikLogix (“we”, “us”), you agree to these Terms of Service.
      </p>

      <section className="mt-10 space-y-6 text-sm leading-7 text-[#0D0D12]">
        <div>
          <h2 className="font-heading text-xl font-extrabold">Use of the Site</h2>
          <p className="mt-2 text-[#6E6E82]">
            You agree not to misuse the site, attempt to gain unauthorized access, or disrupt service.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-extrabold">Newsletter & Content</h2>
          <p className="mt-2 text-[#6E6E82]">
            Newsletter content may be subscriber-only. Unsubscribing is always available. Content is provided
            for informational purposes and does not guarantee results.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-extrabold">Limitation of Liability</h2>
          <p className="mt-2 text-[#6E6E82]">
            To the maximum extent permitted by law, MalikLogix is not liable for indirect or consequential
            damages.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-extrabold">Contact</h2>
          <p className="mt-2 text-[#6E6E82]">
            Questions? Email{' '}
            <a className="text-[#5B3CF5] font-semibold" href="mailto:hello@maliklogix.com">
              hello@maliklogix.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}

