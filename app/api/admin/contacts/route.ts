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

const patchSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(['new', 'contacted', 'proposal', 'won', 'lost']).optional(),
  admin_notes: z.string().optional(),
});

export async function GET(req: NextRequest) {
  const guard = requireAdmin(req);
  if (guard) return guard;
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 500 });
  }

  try {
    const query = req.nextUrl.searchParams.get('q')?.trim().toLowerCase() || '';
    const status = req.nextUrl.searchParams.get('status')?.trim() || 'all';
    const id = req.nextUrl.searchParams.get('id');

    if (id) {
      const row = await safeQuery(
        () => prisma.inquiry.findUnique({
          where: { id },
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            company: true,
            service: true,
            budget: true,
            message: true,
            source: true,
            status: true,
            admin_notes: true,
            created_at: true,
          },
        }),
        null
      );
      return NextResponse.json({ data: row });
    }

    const where = {
      ...(status !== 'all' ? { status: status as 'new' | 'contacted' | 'proposal' | 'won' | 'lost' } : {}),
      ...(query
        ? {
            OR: [
              { name: { contains: query, mode: 'insensitive' as const } },
              { email: { contains: query, mode: 'insensitive' as const } },
              { company: { contains: query, mode: 'insensitive' as const } },
            ],
          }
        : {}),
    };

    const rows = await safeQuery(
      () => prisma.inquiry.findMany({
        where,
        orderBy: { created_at: 'desc' },
        take: 100,
        select: {
          id: true,
          name: true,
          email: true,
          company: true,
          service: true,
          status: true,
          created_at: true,
        },
      }),
      []
    );

    return NextResponse.json({ data: rows });
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : 'Failed to load contacts';
    const message = rawMessage.includes('DATABASE_URL')
      ? 'Service temporarily unavailable.'
      : 'Failed to load contacts.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const guard = requireAdmin(req);
  if (guard) return guard;
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: 'Service temporarily unavailable.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const parsed = patchSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || 'Invalid request';
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const { id, status, admin_notes } = parsed.data;
    await prisma.inquiry.update({
      where: { id },
      data: {
        ...(status ? { status } : {}),
        ...(admin_notes !== undefined ? { admin_notes } : {}),
      },
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : 'Failed to update contact';
    const message = rawMessage.includes('DATABASE_URL')
      ? 'Service temporarily unavailable.'
      : 'Failed to update contact.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
