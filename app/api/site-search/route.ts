import { NextResponse } from 'next/server';
import { getPublishedPostSummaries } from '@/lib/mdx-store';
import { prisma } from '@/lib/prisma';

type BlogResult = {
  type: 'blog';
  title: string;
  description: string;
  href: string;
};

type PartnerResult = {
  type: 'partner';
  title: string;
  description: string;
  href: string;
};

type SearchResult = BlogResult | PartnerResult;

function normalizeQuery(q: string) {
  return q.trim().toLowerCase();
}

function tokenizeQuery(q: string) {
  return normalizeQuery(q)
    .split(/\s+/)
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 8);
}

function scoreText(text: string | null | undefined, terms: string[]) {
  const haystack = (text || '').toLowerCase();
  let score = 0;

  for (const term of terms) {
    if (!term) continue;
    if (haystack === term) score += 50;
    else if (haystack.includes(term)) score += 12;
  }

  return score;
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').trim();
    const terms = tokenizeQuery(q);

    if (!q || terms.length === 0) {
      return NextResponse.json({ results: [] as SearchResult[] });
    }

    const allPosts = await getPublishedPostSummaries();

    // Partners come from Prisma.
    const partners = await prisma.partner.findMany({
      where: { active: true },
      orderBy: [{ rank: 'asc' }, { rating: 'desc' }],
      take: 100,
      select: {
        id: true,
        name: true,
        logo_url: true,
        category: true,
        region: true,
        commission_type: true,
        active: true,
      },
    });

    const blogResults: BlogResult[] = allPosts
      .map((p: any) => {
        const score =
          scoreText(p.title, terms) * 2 +
          scoreText(p.excerpt, terms) +
          scoreText(p.category, terms) * 1.5 +
          scoreText((p.tags || []).join(' '), terms) * 2;

        return { post: p, score };
      })
      .filter((x: { score: number }) => x.score > 0)
      .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
      .slice(0, 8)
      .map(({ post }: { post: any }) => ({
        type: 'blog',
        title: post.title,
        description: post.excerpt,
        href: `/blog/${post.slug}`,
      }));

    const partnerResults: PartnerResult[] = partners
      .map((p: {
        id: string;
        name: string;
        logo_url: string;
        category: string | null;
        region: string | null;
        commission_type: string | null;
        active: boolean | null;
      }) => {
        const score =
          scoreText(p.name, terms) * 2 +
          scoreText(p.category, terms) * 1.5 +
          scoreText(p.region, terms) * 1 +
          scoreText(p.commission_type, terms) * 1;

        return { partner: p, score };
      })
      .filter((x: { score: number }) => x.score > 0)
      .sort((a: { score: number }, b: { score: number }) => b.score - a.score)
      .slice(0, 8)
      .map(({ partner }: { partner: any }) => ({
        type: 'partner',
        title: partner.name,
        description: `${partner.category || 'Affiliate'} • ${partner.region || 'Global'}`,
        href: `/affiliate?q=${encodeURIComponent(q)}`,
      }));

    const results: SearchResult[] = [...blogResults, ...partnerResults].slice(0, 12);
    return NextResponse.json({ results });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}

