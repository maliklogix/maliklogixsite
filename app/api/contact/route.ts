import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';
import { isDatabaseConfigured, prisma } from '@/lib/prisma';

const contactSchema = z.object({
  name: z.string().min(2, 'Please enter your name'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  company: z.string().optional(),
  service: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().optional(),
});

const TARGET_EMAIL = 'maliklogix@gmail.com';

export async function POST(req: NextRequest) {
  if (!isDatabaseConfigured) {
    return NextResponse.json({ error: 'Service temporarily unavailable. Please try again shortly.' }, { status: 500 });
  }

  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || 'Please check your form inputs';
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const payload = parsed.data;

    await prisma.inquiry.create({
      data: {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || undefined,
        company: payload.company || undefined,
        service: payload.service || undefined,
        budget: payload.budget || undefined,
        message: payload.message || '',
        source: 'contact-page',
        status: 'new',
      },
    });

    // Best-effort email delivery. Submission still succeeds if provider isn't configured.
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: 'MalikLogix Contact <onboarding@resend.dev>',
        to: [TARGET_EMAIL],
        replyTo: payload.email,
        subject: `New Contact Message from ${payload.name}`,
        html: `
          <h2>New Contact Submission</h2>
          <p><strong>Name:</strong> ${payload.name}</p>
          <p><strong>Email:</strong> ${payload.email}</p>
          <p><strong>Phone:</strong> ${payload.phone || '-'}</p>
          <p><strong>Company:</strong> ${payload.company || '-'}</p>
          <p><strong>Service:</strong> ${payload.service || '-'}</p>
          <p><strong>Budget:</strong> ${payload.budget || '-'}</p>
          <hr />
          <p>${(payload.message || '').replace(/\n/g, '<br/>')}</p>
        `,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const rawMessage = error instanceof Error ? error.message : 'Failed to submit contact form';
    const message = rawMessage.includes('DATABASE_URL')
      ? 'Service temporarily unavailable. Please try again shortly.'
      : 'Could not submit your message right now. Please try again.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
