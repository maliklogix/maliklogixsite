import { isDatabaseConfigured, prisma } from '@/lib/prisma';
import {
  CONTACT_EMAIL,
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE,
  SITE_NAME,
  TWITTER_URL,
  WHATSAPP_NUMBER,
  YOUTUBE_URL,
} from '@/lib/constants';

export type SiteSettings = {
  agency_name: string;
  contact_email: string;
  phone: string;
  whatsapp: string;
  twitter_url: string;
  linkedin_url: string;
  instagram_url: string;
  github_url: string;
  youtube_url: string;
  facebook_url: string;
  tiktok_url: string;
  topbar_active: boolean;
  topbar_text: string;
  topbar_cta_text: string;
  topbar_cta_link: string;
};

export const defaultSiteSettings: SiteSettings = {
  agency_name: SITE_NAME,
  contact_email: CONTACT_EMAIL,
  phone: PHONE,
  whatsapp: WHATSAPP_NUMBER,
  twitter_url: TWITTER_URL,
  linkedin_url: LINKEDIN_URL,
  instagram_url: INSTAGRAM_URL,
  github_url: GITHUB_URL,
  youtube_url: YOUTUBE_URL,
  facebook_url: '',
  tiktok_url: '',
  topbar_active: true,
  topbar_text: "Pakistan's First AI Digital Agency — We automate OpenClaw, let's start",
  topbar_cta_text: 'Start OpenClaw',
  topbar_cta_link: '/docs/openclaw-ai',
};

function cleanUrl(value: string | null | undefined, fallback = '') {
  return value?.trim() || fallback;
}

export function buildWhatsAppPrefilled(whatsAppNumber: string) {
  const number = whatsAppNumber.replace(/\D/g, '');
  return `https://wa.me/${number}?text=Hi%20MalikLogix%2C%20I%27m%20interested%20in%20your%20AI%20services!`;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isDatabaseConfigured) return defaultSiteSettings;

  try {
    const row = await prisma.setting.findUnique({
      where: { id: 1 },
      select: {
        agency_name: true,
        contact_email: true,
        phone: true,
        whatsapp: true,
        twitter_url: true,
        linkedin_url: true,
        instagram_url: true,
        github_url: true,
        youtube_url: true,
        facebook_url: true,
        tiktok_url: true,
        topbar_active: true,
        topbar_text: true,
        topbar_cta_text: true,
        topbar_cta_link: true,
      },
    });
    if (!row) return defaultSiteSettings;

    return {
      agency_name: cleanUrl(row.agency_name, defaultSiteSettings.agency_name),
      contact_email: cleanUrl(row.contact_email, defaultSiteSettings.contact_email),
      phone: cleanUrl(row.phone, defaultSiteSettings.phone),
      whatsapp: cleanUrl(row.whatsapp, defaultSiteSettings.whatsapp),
      twitter_url: cleanUrl(row.twitter_url, defaultSiteSettings.twitter_url),
      linkedin_url: cleanUrl(row.linkedin_url, defaultSiteSettings.linkedin_url),
      instagram_url: cleanUrl(row.instagram_url, defaultSiteSettings.instagram_url),
      github_url: cleanUrl(row.github_url, defaultSiteSettings.github_url),
      youtube_url: cleanUrl(row.youtube_url, defaultSiteSettings.youtube_url),
      facebook_url: cleanUrl(row.facebook_url, ''),
      tiktok_url: cleanUrl(row.tiktok_url, ''),
      topbar_active: row.topbar_active ?? defaultSiteSettings.topbar_active,
      topbar_text: cleanUrl(row.topbar_text, defaultSiteSettings.topbar_text),
      topbar_cta_text: cleanUrl(row.topbar_cta_text, defaultSiteSettings.topbar_cta_text),
      topbar_cta_link: cleanUrl(row.topbar_cta_link, defaultSiteSettings.topbar_cta_link),
    };
  } catch {
    return defaultSiteSettings;
  }
}
