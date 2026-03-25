import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | MalikLogix',
  description: 'Privacy policy for MalikLogix. Learn how we collect, use, and protect your information.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="font-heading text-3xl md:text-4xl font-extrabold text-[#0D0D12]">Privacy Policy</h1>
      <p className="mt-4 text-[#6E6E82]">
        This Privacy Policy explains how MalikLogix (“we”, “us”) collects, uses, and protects information when you
        visit our website and use our services.
      </p>

      <section className="mt-10 space-y-6 text-sm leading-7 text-[#0D0D12]">
        <div>
          <h2 className="font-heading text-xl font-extrabold">Information We Collect</h2>
          <p className="mt-2 text-[#6E6E82]">
            We may collect information you provide directly (such as name and email when contacting us) and usage
            information (such as pages viewed).
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-extrabold">Cookies & Local Storage</h2>
          <p className="mt-2 text-[#6E6E82]">
            We use cookies and/or local storage for basic site functionality (for example: keeping you logged in to
            admin/client portals and remembering newsletter subscription status).
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-extrabold">How We Use Information</h2>
          <p className="mt-2 text-[#6E6E82]">
            We use information to respond to inquiries, deliver content, improve the site, and communicate with
            subscribers when they opt in.
          </p>
        </div>

        <div>
          <h2 className="font-heading text-xl font-extrabold">Contact</h2>
          <p className="mt-2 text-[#6E6E82]">
            If you have questions, contact us at{' '}
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

