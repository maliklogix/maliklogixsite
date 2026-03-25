import {
  SITE_NAME,
  SITE_URL,
} from '@/lib/constants';
import { getSiteSettings } from '@/lib/site-settings';

export default async function Head() {
  const adsenseClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID; // e.g. ca-pub-xxxxxxxxxxxxxxxx
  const googleSiteVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION; // optional
  const settings = await getSiteSettings();

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: settings.contact_email,
    logo: `${SITE_URL}/ml-logo.png?v=4`,
    sameAs: [settings.twitter_url, settings.linkedin_url, settings.github_url].filter(Boolean),
  };

  return (
    <>
      {adsenseClient ? <meta name="google-adsense-account" content={adsenseClient} /> : null}
      {googleSiteVerification ? (
        <meta name="google-site-verification" content={googleSiteVerification} />
      ) : null}
      <meta name="author" content={SITE_NAME} />
      <meta name="theme-color" content="#5B3CF5" />
      <script
        type="application/ld+json"
        // JSON-LD is required for SEO crawlers; keep it small and stable.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
    </>
  );
}

