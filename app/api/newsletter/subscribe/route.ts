import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isDatabaseConfigured, prisma } from '@/lib/prisma';

const subscribeSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  firstName: z.string().optional(),
  source: z.string().optional(),
});

export async function POST(req: NextRequest) {
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: 'Subscription service is temporarily unavailable.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const parsed = subscribeSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || 'Please check your email';
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const { email, firstName, source } = parsed.data;
    const normalizedEmail = email.trim().toLowerCase();

    await prisma.subscriber.upsert({
      where: { email: normalizedEmail },
      update: {
        status: 'active',
        unsubscribed_at: null,
        first_name: firstName || undefined,
        source: source || 'website',
      },
      create: {
        email: normalizedEmail,
        first_name: firstName || undefined,
        source: source || 'website',
        status: 'active',
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : 'Failed to subscribe';
    const message = rawMessage.includes('DATABASE_URL')
      ? 'Subscription service is temporarily unavailable.'
      : 'Could not subscribe right now. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
