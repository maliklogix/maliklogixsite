import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Types
export interface OpenClawSkill {
  name: string;
  author: string;
  description: string;
  clawskills_url: string;
  downloads: number;
  stars: number;
  tags: string[];
  free: boolean;
  long_description?: string;
  categorySlug?: string;
  categoryTitle?: string;
}

export interface OpenClawCategory {
  title: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
  skills: OpenClawSkill[];
}

const CONTENT_DIR = path.join(process.cwd(), 'content/openclaw-skills');

export async function getAllCategories(): Promise<OpenClawCategory[]> {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  
  const files = fs.readdirSync(CONTENT_DIR).filter(file => file.endsWith('.mdx'));
  
  const categories = files.map(file => {
    const rawContent = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf-8');
    const { data } = matter(rawContent);
    return {
      title: data.title || '',
      slug: data.slug || file.replace(/\.mdx$/, ''),
      description: data.description || '',
      icon: data.icon || 'star',
      count: data.count || (data.skills?.length || 0),
      skills: (data.skills || []).map((s: any) => ({
        ...s,
        categorySlug: data.slug || file.replace(/\.mdx$/, ''),
        categoryTitle: data.title || ''
      }))
    } as OpenClawCategory;
  });

  return categories.sort((a, b) => b.count - a.count); // sort by highest skills count
}

export async function getCategoryBySlug(slug: string): Promise<OpenClawCategory | null> {
  const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data } = matter(rawContent);
  return {
    title: data.title || '',
    slug: data.slug || slug,
    description: data.description || '',
    icon: data.icon || 'star',
    count: data.count || (data.skills?.length || 0),
    skills: (data.skills || []).map((s: any) => ({
      ...s,
      categorySlug: data.slug || slug,
      categoryTitle: data.title || ''
    }))
  } as OpenClawCategory;
}

export async function getAllSkills(): Promise<OpenClawSkill[]> {
  const categories = await getAllCategories();
  const allSkills = categories.flatMap(c => c.skills);

  // Deduplicate: a skill may appear in multiple category files.
  // Use composite key "author-name" as the unique identifier.
  const seen = new Set<string>();
  const unique = allSkills.filter(skill => {
    const key = `${skill.author}-${skill.name}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return unique.sort((a, b) => b.downloads - a.downloads);
}

export async function getSkillBySlug(categorySlug: string, skillSlug: string): Promise<OpenClawSkill | null> {
  const category = await getCategoryBySlug(categorySlug);
  if (!category) return null;

  const skill = category.skills.find(s => s.name === skillSlug || `${s.author}-${s.name}` === skillSlug);
  return skill || null;
}
