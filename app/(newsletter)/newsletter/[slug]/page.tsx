import { notFound } from 'next/navigation';

export default function NewsletterPostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  if (!slug) notFound();

  // Placeholder until Supabase-backed single post page is implemented.
  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="font-heading text-4xl font-extrabold text-[#0D0D12]">{slug}</h1>
      <p className="mt-3 text-[#6E6E82]">Single post content will be fetched from Supabase.</p>
    </article>
  );
}

