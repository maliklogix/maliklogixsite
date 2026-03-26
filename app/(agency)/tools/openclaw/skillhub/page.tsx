import { Metadata } from 'next'; // force-hmr-v2
import { getAllCategories, getAllSkills } from '@/lib/openclaw';
import SkillHubClient from './SkillHubClient';

export const metadata: Metadata = {
  title: 'OpenClaw SkillHub — MalikLogix',
  description: 'Browse 5,000+ curated OpenClaw skills for marketing, automation, SEO, and AI workflows',
};

export default async function SkillHubPage() {
  const categories = await getAllCategories();
  const allSkills = await getAllSkills();

  return (
    <div className="bg-[#f0f2f5] min-h-screen font-body w-full overflow-x-hidden pt-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <SkillHubClient initialCategories={categories} allSkills={allSkills} />
      </div>
    </div>
  );
}
