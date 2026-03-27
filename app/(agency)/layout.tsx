import dynamic from 'next/dynamic';
import { MegaMenu } from '@/components/agency/MegaMenu';
import { buildWhatsAppPrefilled, getSiteSettings } from '@/lib/site-settings';

// ✅ Defer loading below-the-fold global components to slash Unused JS scores
const Footer = dynamic(() => import('@/components/agency/Footer').then(m => m.Footer));
const WhatsAppFAB = dynamic(() => import('@/components/agency/WhatsAppFAB').then(m => m.WhatsAppFAB));

export default async function AgencyLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  const whatsAppHref = buildWhatsAppPrefilled(settings.whatsapp);

  return (
    <>
      <MegaMenu settings={settings} whatsappHref={whatsAppHref} />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppFAB href={whatsAppHref} />
    </>
  );
}

