import dynamic from 'next/dynamic';
import { TopBar } from '@/components/agency/TopBar';
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
      <TopBar
        topbar_active={settings.topbar_active}
        topbar_text={settings.topbar_text}
        topbar_cta_text={settings.topbar_cta_text}
        topbar_cta_link={settings.topbar_cta_link}
      />
      <MegaMenu settings={settings} whatsappHref={whatsAppHref} />
      <main>{children}</main>
      <Footer settings={settings} />
      <WhatsAppFAB href={whatsAppHref} />
    </>
  );
}

