export interface Partner {
  id: string;
  name: string;
  logo_url: string;
  rating?: string;
  features: string[];
  starting_price?: string;
  cta_link: string;
  coupon_code?: string;
  show_deal?: boolean;
  category?: string;
  commission_type?: string;
  region?: string;
  payout_method?: string;
  rank?: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export async function getPartners(): Promise<Partner[]> {
  try {
    const res = await fetch('/api/admin/partners', { cache: 'no-store' });
    if (!res.ok) return [];
    return res.json();
  } catch (err) {
    return [];
  }
}

export async function getPartner(id: string): Promise<Partner | undefined> {
  try {
    const res = await fetch(`/api/admin/partners/${id}`, { cache: 'no-store' });
    if (!res.ok) return undefined;
    return res.json();
  } catch (err) {
    return undefined;
  }
}

export async function savePartner(partner: Partial<Partner>): Promise<Partner | undefined> {
  const method = partner.id ? 'PATCH' : 'POST';
  const url = partner.id ? `/api/admin/partners/${partner.id}` : '/api/admin/partners';
  
  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner),
    });
    if (!res.ok) return undefined;
    return res.json();
  } catch (err) {
    return undefined;
  }
}

export async function deletePartner(id: string): Promise<boolean> {
  try {
    const res = await fetch(`/api/admin/partners/${id}`, { method: 'DELETE', cache: 'no-store' });
    return res.ok;
  } catch (err) {
    return false;
  }
}
