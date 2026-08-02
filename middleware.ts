import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/app/lib/thoughts/auth';
import { AUTH_COOKIE } from '@/app/lib/thoughts/config';

/** Methods that change state and therefore require a valid session. */
const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);

const isProtectedApi = (pathname: string, method: string): boolean => {
  if (!pathname.startsWith('/api/thoughts/')) return false;
  // Auth endpoints must stay reachable so you can log in at all.
  if (pathname.startsWith('/api/thoughts/auth/')) return false;
  // Admin listing (includes drafts) is opt-in via query param, guarded in the route.
  return MUTATING.has(method) || pathname.startsWith('/api/thoughts/upload');
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const method = request.method;
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const session = await verifySession(token);

  if (isProtectedApi(pathname, method) && !session) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
  }

  // The editor page renders its own login modal, so it is allowed through and
  // handles the unauthenticated state client-side. Everything it can actually
  // do is gated by the API checks above.
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/thoughts/:path*', '/page/thoughts/write'],
};
