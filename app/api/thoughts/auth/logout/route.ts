import { NextResponse } from 'next/server';
import { AUTH_COOKIE } from '@/app/lib/thoughts/config';

export async function POST() {
  const response = NextResponse.json({ success: true, data: { loggedOut: true } });
  response.cookies.set(AUTH_COOKIE, '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  });
  return response;
}
