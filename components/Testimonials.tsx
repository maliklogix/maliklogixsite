import Image from 'next/image';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
};

const testimonials: Testimonial[] = [
  {
    avatar: 'https://i.pravatar.cc/48?u=sarah-k',
    name: 'Sarah K.',
    role: 'DTC Brand Founder, USA',
    quote: '"MalikLogix rebuilt our entire content system with AI. Organic traffic tripled in under three months. The reporting dashboard alone is worth the retainer."',
  },
  {
    avatar: 'https://i.pravatar.cc/48?u=james-r',
    name: 'James R.',
    role: 'Growth Lead, SaaS Startup, UK',
    quote: '"Their n8n automation cut our lead response time from four hours to under fifteen minutes. That change alone closed two enterprise deals we would have lost."',
  },
  {
    avatar: 'https://i.pravatar.cc/48?u=aisha-m',
    name: 'Aisha M.',
    role: 'Agency Owner, UAE',
    quote: '"Finding a team that speaks both engineering and marketing is rare. Malik built us a lead scoring system that tells us exactly which prospects to call first."',
  },
  {
    avatar: 'https://i.pravatar.cc/48?u=omar-t',
    name: 'Omar T.',
    role: 'E-commerce Director, Canada',
    quote: '"Shopify AOV went up 28% after the AI upsell flow went live. The whole thing was set up in two weeks. I wish I had found them a year earlier."',
  },
  {
    avatar: 'https://i.pravatar.cc/48?u=lena-w',
    name: 'Lena W.',
    role: 'Marketing Manager, Germany',
    quote: '"We now appear in ChatGPT answers and Google AI Overviews for our core keywords. Their SEO and GEO approach is genuinely ahead of what most agencies are doing."',
  },
  {
    avatar: 'https://i.pravatar.cc/48?u=bilal-s',
    name: 'Bilal S.',
    role: 'Startup Founder, Pakistan',
    quote: '"As a Pakistani startup we needed an agency that understood both global standards and our market. MalikLogix delivered. ROI was visible within the first 30 days."',
  },
];

export default function Testimonials({ title = "What clients say" }: { title?: string }) {
  return (
    <section className="py-16">
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#111111] mb-12 text-center">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div 
            key={i} 
            className="bg-white border border-[#e5e5e5] rounded-lg p-8 flex flex-col h-full"
          >
            <div className="flex mb-4 text-[#111111]">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <p className="text-[#555555] italic leading-relaxed mb-8 flex-1">
              {t.quote}
            </p>
            <div className="flex items-center gap-4 mt-auto">
              <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-[#f3f3f0]">
                <img 
                  src={t.avatar} 
                  alt={t.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="min-w-0">
                <div className="font-bold text-[#111111] truncate">{t.name}</div>
                <div className="text-xs text-[#888888] truncate">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
