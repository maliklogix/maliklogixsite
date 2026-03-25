import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { safeQuery } from '@/lib/db-query';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const partners = await safeQuery(
      () => prisma.partner.findMany({
        orderBy: [
          { rank: 'asc' },
          { name: 'asc' }
        ],
        take: 100,
        select: {
          id: true,
          name: true,
          logo_url: true,
          category: true,
          region: true,
          active: true,
          rank: true,
          rating: true,
        }
      }),
      []
    );
    return NextResponse.json(partners);
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const partner = await prisma.partner.create({
      data: {
        name: data.name,
        logo_url: data.logo_url,
        rating: data.rating || '5.0',
        features: data.features || [],
        starting_price: data.starting_price,
        cta_link: data.cta_link,
        coupon_code: data.coupon_code,
        show_deal: data.show_deal ?? false,
        category: data.category || 'Hosting',
        commission_type: data.commission_type || 'CPA',
        region: data.region || 'Global',
        payout_method: data.payout_method || 'Bank Transfer',
        rank: data.rank || 0,
        active: data.active ?? true,
      }
    });
    return NextResponse.json(partner);
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}
