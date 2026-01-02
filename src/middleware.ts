// src/middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyAuth } from './lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // List of protected admin paths
  const protectedPaths = ['/super-admin', '/sub-admin'];

  // Check if the path is one of the protected admin routes
  if (protectedPaths.some(path => pathname.startsWith(path))) {
    const token = request.cookies.get('session-token')?.value;

    const verifiedToken = await verifyAuth(token).catch((err) => {
      console.error(err.message);
      return null;
    });
    
    if (!verifiedToken) {
        // If not authenticated, redirect to the login page
        const loginUrl = new URL('/login', request.url);
        loginUrl.searchParams.set('redirect_to', pathname);
        return NextResponse.redirect(loginUrl);
    }
    
    // Check role-based access
    const role = verifiedToken.role;
    if (pathname.startsWith('/super-admin') && role !== 'super-admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (pathname.startsWith('/sub-admin') && role !== 'sub-admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/super-admin/:path*', '/sub-admin/:path*'],
}
