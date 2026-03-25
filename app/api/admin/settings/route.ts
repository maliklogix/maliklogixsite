import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isDatabaseConfigured, prisma } from '@/lib/prisma';
import { safeQuery } from '@/lib/db-query';

const adminCookieName = 'ml_admin';

function requireAdmin(req: NextRequest) {
  const cookie = req.cookies.get(adminCookieName);
  if (!cookie || cookie.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

const settingsSchema = z
  .object({
    agency_name: z.string().nullable().optional(),
    tagline: z.string().nullable().optional(),
    nl_tagline: z.string().nullable().optional(),
    logo_url: z.string().nullable().optional(),
    favicon_url: z.string().nullable().optional(),
    contact_email: z.string().email().nullable().optional().or(z.literal('')),
    phone: z.string().nullable().optional(),
    whatsapp: z.string().nullable().optional(),
    address: z.string().nullable().optional(),

    twitter_url: z.string().nullable().optional(),
    linkedin_url: z.string().nullable().optional(),
    instagram_url: z.string().nullable().optional(),
    github_url: z.string().nullable().optional(),
    facebook_url: z.string().nullable().optional(),
    tiktok_url: z.string().nullable().optional(),
    youtube_url: z.string().nullable().optional(),

    meta_title: z.string().nullable().optional(),
    meta_description: z.string().nullable().optional(),
    og_image: z.string().nullable().optional(),

    ga_id: z.string().nullable().optional(),

    topbar_active: z.boolean().nullable().optional(),
    topbar_text: z.string().nullable().optional(),
    topbar_cta_text: z.string().nullable().optional(),
    topbar_cta_link: z.string().nullable().optional(),

    affiliate_commission: z.coerce.number().int().nullable().optional(),
    subscriber_count_text: z.string().nullable().optional(),
  })
  // allow partial updates
  .partial();

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if (guard) return guard;
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: 'DATABASE_URL is not configured' }, { status: 500 });
  }

  try {
    const data = await safeQuery(
      () => prisma.setting.findUnique({
        where: { id: 1 },
        select: {
          agency_name: true,
          tagline: true,
          nl_tagline: true,
          logo_url: true,
          favicon_url: true,
          contact_email: true,
          phone: true,
          whatsapp: true,
          address: true,
          twitter_url: true,
          linkedin_url: true,
          instagram_url: true,
          github_url: true,
          facebook_url: true,
          tiktok_url: true,
          youtube_url: true,
          meta_title: true,
          meta_description: true,
          og_image: true,
          ga_id: true,
          topbar_active: true,
          topbar_text: true,
          topbar_cta_text: true,
          topbar_cta_link: true,
          affiliate_commission: true,
          subscriber_count_text: true,
          updated_at: true,
        }
      }),
      null
    );
    return NextResponse.json({ data });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to fetch settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if (guard) return guard;
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: 'DATABASE_URL is not configured' }, { status: 500 });
  }

  const body = await req.json();
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const payload = {
    ...parsed.data,
    // Always refresh updated_at so the UI can treat it as a real update.
    updated_at: new Date().toISOString(),
  };

  try {
    await prisma.setting.upsert({
      where: { id: 1 },
      update: payload,
      create: { id: 1, ...payload },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update settings';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
