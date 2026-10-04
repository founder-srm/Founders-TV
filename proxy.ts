import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from '@/lib/auth/server';

// Origins allowed to call /api/* from a browser (e.g. the CMS).
const allowedOrigins = ['https://fc-os.tech'];

const corsHeaders = {
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
  Vary: 'Origin',
};

const authProxy = auth.middleware({
  // Redirects unauthenticated users to sign-in page
  loginUrl: '/auth/sign-in',
});

function withCors(request: NextRequest) {
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  const response =
    request.method === 'OPTIONS'
      ? new NextResponse(null, { status: 204 })
      : NextResponse.next();

  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
  }

  for (const [key, value] of Object.entries(corsHeaders)) {
    response.headers.set(key, value);
  }

  return response;
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The auth handler manages its own cookies/origins; keep it out of CORS.
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/auth')) {
    return withCors(request);
  }

  return authProxy(request);
}

export const config = {
  matcher: [
    // Protected routes requiring authentication
    '/account/:path*',
    // CORS for the public API
    '/api/:path*',
  ],
};
