import { NextRequest, NextResponse } from 'next/server';
import { verifySession } from '@/app/lib/thoughts/auth';
import { AUTH_COOKIE } from '@/app/lib/thoughts/config';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const session = await verifySession(token);

  if (!session) {
    return NextResponse.json({ success: true, data: { authenticated: false } });
  }

  return NextResponse.json({
    success: true,
    data: { authenticated: true, username: session.sub, expiresAt: session.exp },
  });
}
