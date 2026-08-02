import { SignJWT, jwtVerify } from 'jose';
import { SESSION_DAYS } from './config';

export interface SessionPayload {
  sub: string;
  exp?: number;
}

const secretKey = (): Uint8Array => {
  const secret = process.env.THOUGHTS_JWT_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error('THOUGHTS_JWT_SECRET is missing or too short');
  }
  return new TextEncoder().encode(secret);
};

export const signSession = async (username: string): Promise<string> =>
  new SignJWT({ sub: username })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DAYS}d`)
    .sign(secretKey());

/**
 * Verifies a session token. Returns null rather than throwing so callers can
 * treat "no session" and "bad session" identically.
 * Uses jose (not jsonwebtoken) because this also runs in the Edge middleware.
 */
export const verifySession = async (token?: string): Promise<SessionPayload | null> => {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ['HS256'] });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
};
