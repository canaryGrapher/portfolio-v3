/**
 * In-memory login throttle.
 *
 * Deliberately simple: state is per serverless instance, so a determined
 * attacker hitting cold instances can get more attempts than the nominal limit.
 * It stops casual brute force, which is the actual threat to a personal blog.
 * Swap for Upstash Redis if this ever needs to be authoritative.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

interface Entry {
  count: number;
  resetAt: number;
}

const attempts = new Map<string, Entry>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds: number;
}

export const checkRateLimit = (key: string): RateLimitResult => {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    return { allowed: true, remaining: MAX_ATTEMPTS, retryAfterSeconds: 0 };
  }

  const allowed = entry.count < MAX_ATTEMPTS;
  return {
    allowed,
    remaining: Math.max(0, MAX_ATTEMPTS - entry.count),
    retryAfterSeconds: allowed ? 0 : Math.ceil((entry.resetAt - now) / 1000),
  };
};

export const recordFailure = (key: string): void => {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || now > entry.resetAt) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
};

export const clearAttempts = (key: string): void => {
  attempts.delete(key);
};

/** Best-effort client IP from the usual proxy headers. */
export const clientKey = (headers: Headers): string =>
  headers.get('x-forwarded-for')?.split(',')[0].trim() ||
  headers.get('x-real-ip') ||
  'unknown';
