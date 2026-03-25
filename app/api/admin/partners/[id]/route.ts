import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const partner = await prisma.partner.findUnique({
      where: { id }
    });
    if (!partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }
    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch partner' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name: data.name,
        logo_url: data.logo_url,
        rating: data.rating,
        features: data.features,
        starting_price: data.starting_price,
        cta_link: data.cta_link,
        coupon_code: data.coupon_code,
        show_deal: data.show_deal,
        category: data.category,
        commission_type: data.commission_type,
        region: data.region,
        payout_method: data.payout_method,
        rank: data.rank,
        active: data.active,
        updated_at: new Date(),
      }
    });
    return NextResponse.json(partner);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update partner' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.partner.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
