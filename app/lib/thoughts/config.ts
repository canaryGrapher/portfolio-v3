/** Central place for the env-backed config so missing vars fail loudly and early. */

const required = (name: string): string => {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
};

export const githubConfig = () => ({
  token: required('GITHUB_TOKEN'),
  owner: process.env.GITHUB_OWNER || 'canaryGrapher',
  repo: process.env.GITHUB_REPO || 'portfolio-v3',
  branch: process.env.GITHUB_BRANCH || 'main',
  contentPath: process.env.GITHUB_CONTENT_PATH || 'content/thoughts',
});

/** Seconds the public pages cache GitHub responses for. */
export const REVALIDATE_SECONDS = 60;

export const AUTH_COOKIE = 'thoughts_session';
export const SESSION_DAYS = 7;
