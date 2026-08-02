// Node runtime only: bcryptjs is not Edge-compatible.
import bcrypt from 'bcryptjs';

/**
 * Length-independent comparison so response timing does not reveal whether the
 * username was correct.
 */
const timingSafeEqual = (a: string, b: string): boolean => {
  const len = Math.max(a.length, b.length);
  let diff = a.length ^ b.length;
  for (let i = 0; i < len; i += 1) {
    diff |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return diff === 0;
};

export const verifyCredentials = async (
  username: string,
  password: string
): Promise<boolean> => {
  const expectedUser = process.env.THOUGHTS_ADMIN_USERNAME;
  const expectedHash = process.env.THOUGHTS_ADMIN_PASSWORD_HASH;

  const missing = [
    !expectedUser && 'THOUGHTS_ADMIN_USERNAME',
    !expectedHash && 'THOUGHTS_ADMIN_PASSWORD_HASH',
    !process.env.THOUGHTS_JWT_SECRET && 'THOUGHTS_JWT_SECRET',
  ].filter(Boolean);

  if (missing.length) {
    throw new Error(
      `Missing env vars: ${missing.join(', ')}. Run "pnpm hash-password" and paste the output into .env, then restart the dev server.`
    );
  }

  // A bcrypt hash is exactly 60 chars and starts with $2. Anything else almost
  // always means dotenv-expand ate the $ signs, because Next expands .env values
  // and "$2b$12$..." looks like three variable references.
  if (!expectedHash!.startsWith('$2') || expectedHash!.length !== 60) {
    throw new Error(
      'THOUGHTS_ADMIN_PASSWORD_HASH looks mangled. Escape every $ in .env as \\$ ' +
      '(e.g. "\\$2b\\$12\\$...") and restart the dev server. Single quotes will not work.'
    );
  }

  const userMatches = timingSafeEqual(username, expectedUser);

  // Always run bcrypt, even on a username miss, so both failure modes cost the same.
  const passwordMatches = await bcrypt.compare(password, expectedHash);

  return userMatches && passwordMatches;
};
