import { Footer } from '@/components/agency/Footer';
import { MegaMenu } from '@/components/agency/MegaMenu';
import { TopBar } from '@/components/agency/TopBar';
import { WhatsAppFAB } from '@/components/agency/WhatsAppFAB';
import { buildWhatsAppPrefilled, getSiteSettings } from '@/lib/site-settings';

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

