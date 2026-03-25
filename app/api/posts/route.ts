import { NextResponse } from 'next/server';
import { getAllMDXPosts, saveMDXPost } from '@/lib/mdx-store';

export async function GET() {
  try {
    const posts = await Promise.race([
      getAllMDXPosts(),
      new Promise<any[]>((resolve) => setTimeout(() => resolve([]), 10000))
    ]);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Fetch posts error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const post = await request.json();
    await saveMDXPost(post);
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}
