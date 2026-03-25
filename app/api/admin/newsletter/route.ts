import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isDatabaseConfigured, prisma } from '@/lib/prisma';

const adminCookieName = 'ml_admin';

function requireAdmin(req: NextRequest) {
  const cookie = req.cookies.get(adminCookieName);
  if (!cookie || cookie.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['active', 'unsubscribed', 'bounced']),
});

function toCsv(rows: Array<Record<string, string | number | null>>) {
  if (!rows.length) return 'email,first_name,source,status,subscribed_at,unsubscribed_at\n';
  const headers = Object.keys(rows[0]);
  const escape = (v: string | number | null) => {
    const s = String(v ?? '');
    if (s.includes(',') || s.includes('"') || s.includes('\n')) return `"${s.replace(/"/g, '""')}"`;
    return s;
  };
  const lines = rows.map((row) => headers.map((h) => escape(row[h] ?? '')).join(','));
  return `${headers.join(',')}\n${lines.join('\n')}\n`;
}

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if (guard) return guard;
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: 'DATABASE_URL is not configured' }, { status: 500 });
  }

  try {
    const query = req.nextUrl.searchParams.get('q')?.trim().toLowerCase() || '';
    const status = req.nextUrl.searchParams.get('status')?.trim() || 'all';
    const exportType = req.nextUrl.searchParams.get('export');

    const where = {
      ...(status !== 'all' ? { status: status as 'active' | 'unsubscribed' | 'bounced' } : {}),
      ...(query
        ? {
            OR: [
              { email: { contains: query, mode: 'insensitive' as const } },
              { first_name: { contains: query, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const subscribers = await prisma.subscriber.findMany({
      where,
      orderBy: { subscribed_at: 'desc' },
      take: 500,
      select: {
        id: true,
        email: true,
        first_name: true,
        source: true,
        status: true,
        subscribed_at: true,
        unsubscribed_at: true,
      },
    });

    if (exportType === 'csv') {
      const csv = toCsv(
        subscribers.map((s: { 
          email: string; 
          first_name: string | null; 
          source: string | null; 
          status: string; 
          subscribed_at: Date | null; 
          unsubscribed_at: Date | null; 
        }) => ({
          email: s.email,
          first_name: s.first_name,
          source: s.source,
          status: s.status,
          subscribed_at: s.subscribed_at?.toISOString() ?? null,
          unsubscribed_at: s.unsubscribed_at?.toISOString() ?? null,
        }))
      );
      return new NextResponse(csv, {
        status: 200,
        headers: {
          'Content-Type': 'text/csv; charset=utf-8',
          'Content-Disposition': 'attachment; filename="newsletter-subscribers.csv"',
        },
      });
    }

    return NextResponse.json({ data: subscribers });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load subscribers';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const guard = requireAdmin(req);
  if (guard) return guard;
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: 'DATABASE_URL is not configured' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { id, status } = parsed.data;
    await prisma.subscriber.update({
      where: { id },
      data: {
        status,
        unsubscribed_at: status === 'unsubscribed' ? new Date() : null,
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to update subscriber';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
