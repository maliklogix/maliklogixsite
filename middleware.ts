import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const cookie = request.cookies.get('ml_admin');
    if (!cookie || cookie.value !== '1') {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
    }
  }

  if (pathname.startsWith('/client') && !pathname.startsWith('/client/login')) {
    const cookie = request.cookies.get('ml_client');
    if (!cookie || cookie.value !== '1') {
      const url = request.nextUrl.clone();
      url.pathname = '/client/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/client/:path*'],
};

