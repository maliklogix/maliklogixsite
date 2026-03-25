import { NextResponse } from 'next/server';
import { getMDXPostBySlug, deleteMDXPost, saveMDXPost } from '@/lib/mdx-store';

export async function GET(request: Request, context: { params: Promise<{ id: string }> }) {
  const params = await context.params;
  const post = await getMDXPostBySlug(params.id);
  if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(post);
}

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const post = await request.json();
    await saveMDXPost(post);
    return NextResponse.json({ success: true, post });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const params = await context.params;
    await deleteMDXPost(params.id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
