// Server-only: reads GITHUB_TOKEN. Never import this from a "use client" file.
import { ThoughtPost, ThoughtSummary, ThoughtDraftInput } from '@/app/interface/thoughts';
import { listFiles, readFile, statFile, writeFile, deleteFile } from './github';
import { filenameFor, slugFromFilename, isSafeSlug, uniqueSlug } from './slug';
import { parsePost, serializePost } from './serialize';
import { readingTime, deriveExcerpt } from './reading-time';

type Cache = 'revalidate' | 'none';

const newestFirst = (a: ThoughtSummary, b: ThoughtSummary) =>
  new Date(b.date).getTime() - new Date(a.date).getTime();

/**
 * Loads every post. `includeDrafts` is only ever true behind auth.
 * Files are fetched in parallel; at personal-blog scale this is a handful of
 * requests and stays well inside GitHub's rate limit.
 */
export const getAllPosts = async (
  includeDrafts = false,
  cache: Cache = 'revalidate'
): Promise<ThoughtPost[]> => {
  const files = await listFiles(cache);

  const posts = await Promise.all(
    files.map(async (file) => {
      if (!file.download_url) return null;
      try {
        const raw = await readFile(file.download_url, cache);
        return parsePost(raw, slugFromFilename(file.name), file.sha);
      } catch {
        // One malformed file should not take down the whole listing.
        return null;
      }
    })
  );

  return posts
    .filter((p): p is ThoughtPost => p !== null)
    .filter((p) => includeDrafts || p.status === 'published')
    .sort(newestFirst);
};

/** Listing view: same as getAllPosts but without the body, to keep payloads small. */
export const getPostSummaries = async (
  includeDrafts = false,
  cache: Cache = 'revalidate'
): Promise<ThoughtSummary[]> => {
  const posts = await getAllPosts(includeDrafts, cache);
  return posts.map(({ content, ...summary }) => summary);
};

export const getPost = async (
  slug: string,
  includeDrafts = false,
  cache: Cache = 'revalidate'
): Promise<ThoughtPost | null> => {
  if (!isSafeSlug(slug)) return null;

  const file = await statFile(filenameFor(slug));
  if (!file?.download_url) return null;

  const raw = await readFile(file.download_url, cache);
  const post = parsePost(raw, slug, file.sha);

  if (post.status === 'draft' && !includeDrafts) return null;
  return post;
};

export const getAllTags = async (): Promise<string[]> => {
  const posts = await getPostSummaries();
  return [...new Set(posts.flatMap((p) => p.tags))].sort();
};

export interface SaveResult {
  slug: string;
  sha: string;
  commitUrl: string;
}

/** Creates a new post, or updates an existing one when `input.sha` is present. */
export const savePost = async (input: ThoughtDraftInput): Promise<SaveResult> => {
  const isUpdate = Boolean(input.sha && input.slug);
  const now = new Date().toISOString();

  let slug: string;
  if (isUpdate) {
    if (!isSafeSlug(input.slug!)) throw new Error('Invalid slug');
    slug = input.slug!;
  } else {
    const existing = (await listFiles('none')).map((f) => slugFromFilename(f.name));
    slug = uniqueSlug(input.slug || input.title, existing);
  }

  const body = serializePost(
    {
      title: input.title.trim(),
      subtitle: input.subtitle?.trim() || '',
      date: input.date || now,
      updated: now,
      tags: (input.tags || []).map((t) => t.trim()).filter(Boolean),
      featureImage: input.featureImage || '',
      excerpt: input.excerpt?.trim() || deriveExcerpt(input.content),
      status: input.status,
      readingTime: readingTime(input.content),
    },
    input.content
  );

  const verb = isUpdate ? 'update' : 'add';
  const message = `thoughts: ${verb} "${input.title.trim()}" [${input.status}]`;
  const { sha, commitUrl } = await writeFile(filenameFor(slug), body, message, input.sha);

  return { slug, sha, commitUrl };
};

export const removePost = async (slug: string): Promise<void> => {
  if (!isSafeSlug(slug)) throw new Error('Invalid slug');

  const file = await statFile(filenameFor(slug));
  if (!file) throw new Error('Post not found');

  await deleteFile(filenameFor(slug), file.sha, `thoughts: delete "${slug}"`);
};
