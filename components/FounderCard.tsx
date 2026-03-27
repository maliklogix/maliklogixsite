import Link from 'next/link';
import Image from 'next/image';

type Props = {
  photo: string;
  name: string;
  role: string;
  bio: string;
  githubUrl: string;
};

export default function FounderCard({ 
  photo = "/malik-farooq-founder-ai-digital-marketing.jpg", 
  name = "Malik Farooq", 
  role = "Founder & AI Specialist", 
  bio = "Malik Farooq is the founder of MalikLogix and an AI specialist working at the intersection of artificial intelligence and digital marketing. He builds intelligent marketing systems — from LLM-powered automation to AI-driven SEO — that help businesses grow without scaling headcount.",
  githubUrl = "https://github.com/maliklogix"
}: Partial<Props>) {
  return (
    <div className="bg-white border border-[#e5e5e5] rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row gap-6 sm:gap-8 items-start">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden flex-shrink-0 bg-[#f3f3f0] border border-[#e5e5e5]">
        <Image
          src={photo}
          alt={`${name} — Founder of MalikLogix`}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="font-heading text-xl font-bold text-[#111111]">{name}</h3>
          <p className="text-sm font-medium text-[#888888] uppercase tracking-wider">{role}</p>
        </div>
        <p className="text-[#555555] text-sm leading-relaxed mb-6">
          {bio}
        </p>
        <div className="flex items-center gap-6">
          <Link 
            href="/founder" 
            className="text-sm font-bold text-[#111111] hover:underline flex items-center gap-1"
          >
            Full story →
          </Link>
          <Link 
            href={githubUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#111111] hover:text-[#555555] transition-colors"
            aria-label="GitHub Profile"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
