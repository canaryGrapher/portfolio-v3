import { githubConfig, REVALIDATE_SECONDS } from './config';

const API = 'https://api.github.com';

export interface GitHubFile {
  name: string;
  path: string;
  sha: string;
  size: number;
  download_url: string | null;
  type: 'file' | 'dir';
}

export interface CommitResult {
  sha: string;
  commitUrl: string;
}

const headers = (token: string) => ({
  Authorization: `Bearer ${token}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
});

const fail = async (res: Response, action: string): Promise<never> => {
  const body = await res.text().catch(() => '');
  throw new Error(`GitHub ${action} failed (${res.status}): ${body.slice(0, 300)}`);
};

/**
 * Lists files in the content directory.
 * `cache` is 'revalidate' for public reads and 'none' for admin reads that must
 * reflect a commit made moments ago.
 */
export const listFiles = async (cache: 'revalidate' | 'none' = 'revalidate'): Promise<GitHubFile[]> => {
  const { token, owner, repo, branch, contentPath } = githubConfig();
  const url = `${API}/repos/${owner}/${repo}/contents/${contentPath}?ref=${branch}`;

  const res = await fetch(url, {
    headers: headers(token),
    ...(cache === 'none'
      ? { cache: 'no-store' as const }
      : { next: { revalidate: REVALIDATE_SECONDS, tags: ['thoughts'] } }),
  });

  // An empty or not-yet-created directory is a valid state, not an error.
  if (res.status === 404) return [];
  if (!res.ok) await fail(res, 'list');

  const files = (await res.json()) as GitHubFile[];
  return files.filter((f) => f.type === 'file' && f.name.endsWith('.md'));
};

/** Fetches raw file contents. Uses download_url so we skip base64 round-tripping. */
export const readFile = async (
  downloadUrl: string,
  cache: 'revalidate' | 'none' = 'revalidate'
): Promise<string> => {
  const res = await fetch(downloadUrl, {
    ...(cache === 'none'
      ? { cache: 'no-store' as const }
      : { next: { revalidate: REVALIDATE_SECONDS, tags: ['thoughts'] } }),
  });
  if (!res.ok) await fail(res, 'read');
  return res.text();
};

/** Fetches a single file's metadata by name, or null if it does not exist. */
export const statFile = async (filename: string): Promise<GitHubFile | null> => {
  const { token, owner, repo, branch, contentPath } = githubConfig();
  const url = `${API}/repos/${owner}/${repo}/contents/${contentPath}/${filename}?ref=${branch}`;

  const res = await fetch(url, { headers: headers(token), cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) await fail(res, 'stat');
  return (await res.json()) as GitHubFile;
};

/** Creates or updates a file. Pass `sha` when updating an existing file. */
export const writeFile = async (
  filename: string,
  content: string,
  message: string,
  sha?: string
): Promise<CommitResult> => {
  const { token, owner, repo, branch, contentPath } = githubConfig();
  const url = `${API}/repos/${owner}/${repo}/contents/${contentPath}/${filename}`;

  const res = await fetch(url, {
    method: 'PUT',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message,
      content: Buffer.from(content, 'utf-8').toString('base64'),
      branch,
      ...(sha ? { sha } : {}),
    }),
  });

  if (!res.ok) await fail(res, 'write');

  const json = await res.json();
  return { sha: json.content.sha, commitUrl: json.commit.html_url };
};

export const deleteFile = async (
  filename: string,
  sha: string,
  message: string
): Promise<void> => {
  const { token, owner, repo, branch, contentPath } = githubConfig();
  const url = `${API}/repos/${owner}/${repo}/contents/${contentPath}/${filename}`;

  const res = await fetch(url, {
    method: 'DELETE',
    headers: { ...headers(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sha, branch }),
  });

  if (!res.ok) await fail(res, 'delete');
};
