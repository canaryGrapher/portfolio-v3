import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials } from '@/app/lib/thoughts/credentials';
import { signSession } from '@/app/lib/thoughts/auth';
import { checkRateLimit, recordFailure, clearAttempts, clientKey } from '@/app/lib/thoughts/rate-limit';
import { AUTH_COOKIE, SESSION_DAYS } from '@/app/lib/thoughts/config';

// bcryptjs needs the Node runtime.
export const runtime = 'nodejs';

const GENERIC_ERROR = 'Invalid username or password';

export async function POST(request: NextRequest) {
  const key = clientKey(request.headers);
  const limit = checkRateLimit(key);

  if (!limit.allowed) {
    return NextResponse.json(
      { success: false, error: `Too many attempts. Try again in ${Math.ceil(limit.retryAfterSeconds / 60)} minutes.` },
      { status: 429, headers: { 'Retry-After': String(limit.retryAfterSeconds) } }
    );
  }

  let username = '';
  let password = '';
  try {
    const body = await request.json();
    username = String(body.username ?? '');
    password = String(body.password ?? '');
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  if (!username || !password) {
    return NextResponse.json({ success: false, error: GENERIC_ERROR }, { status: 401 });
  }

  let valid = false;
  try {
    valid = await verifyCredentials(username, password);
  } catch (error) {
    // Config errors are shown verbatim: they name a missing env var, which is
    // useful to you and useless to an attacker.
    const detail = error instanceof Error ? error.message : 'Server auth is not configured';
    console.error('[thoughts/login]', detail);
    return NextResponse.json({ success: false, error: detail }, { status: 500 });
  }

  if (!valid) {
    recordFailure(key);
    const after = checkRateLimit(key);
    return NextResponse.json(
      { success: false, error: GENERIC_ERROR, attemptsRemaining: after.remaining },
      { status: 401 }
    );
  }

  clearAttempts(key);
  const token = await signSession(username);

  const response = NextResponse.json({ success: true, data: { username } });
  response.cookies.set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });

  return response;
}
