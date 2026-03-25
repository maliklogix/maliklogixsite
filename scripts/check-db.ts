import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkPosts() {
  try {
    const total = await prisma.post.count();
    const published = await prisma.post.count({ where: { status: 'published' } });
    const drafts = await prisma.post.count({ where: { status: 'draft' } });
    
    console.log('Total posts:', total);
    console.log('Published posts:', published);
    console.log('Draft posts:', drafts);

    const sample = await prisma.post.findMany({
      take: 5,
      select: { title: true, status: true, published_at: true }
    });
    console.log('Sample posts:', JSON.stringify(sample, null, 2));

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await prisma.$disconnect();
  }
}

checkPosts();
