import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

const adminCookieName = 'ml_admin';

function requireAdmin(req: NextRequest) {
  const cookie = req.cookies.get(adminCookieName);
  if (!cookie || cookie.value !== '1') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function POST(req: NextRequest) {
  const guard = requireAdmin(req);
  if (guard) return guard;

  try {
    const data = await req.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const ext = file.name.split('.').pop();
    const filename = `${randomUUID()}.${ext}`;
    
    // Determine path based on type if provided
    const type = data.get('type') || 'partners';
    const uploadDir = join(process.cwd(), 'public', 'uploads', type as string);
    
    // Ensure directory exists
    await mkdir(uploadDir, { recursive: true });

    const path = join(uploadDir, filename);
    await writeFile(path, buffer);

    const publicUrl = `/uploads/${type}/${filename}`;
    
    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
