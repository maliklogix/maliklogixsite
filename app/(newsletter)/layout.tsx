import { NewsletterNav } from '@/components/newsletter/NewsletterNav';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

export default function NewsletterLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NewsletterNav />
      <main>{children}</main>
      <footer className="bg-[#F7F7FA] border-t border-[#E4E4EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-sm text-[#6E6E82]">
          <div className="font-heading font-extrabold text-[#0D0D12]">{SITE_NAME}</div>
          <div className="mt-2 flex items-center gap-4">
            <Link href="/privacy" className="hover:text-[#0D0D12]">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-[#0D0D12]">
              Terms
            </Link>
            <Link href="/newsletter" className="hover:text-[#0D0D12]">
              Archive
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}

