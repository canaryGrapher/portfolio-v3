import matter from 'gray-matter';
import { ThoughtFrontmatter, ThoughtPost } from '@/app/interface/thoughts';
import { readingTime, deriveExcerpt } from './reading-time';

/** Parses a raw .md file into a post. Missing fields get safe defaults. */
export const parsePost = (raw: string, slug: string, sha?: string): ThoughtPost => {
  const { data, content } = matter(raw);
  const fm = data as Partial<ThoughtFrontmatter>;

  return {
    slug,
    sha,
    title: fm.title || slug,
    subtitle: fm.subtitle || '',
    date: fm.date || new Date(0).toISOString(),
    updated: fm.updated,
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    featureImage: fm.featureImage || '',
    excerpt: fm.excerpt || deriveExcerpt(content),
    status: fm.status === 'draft' ? 'draft' : 'published',
    readingTime: fm.readingTime || readingTime(content),
    content,
  };
};

/**
 * Builds the .md file body. Written by hand rather than via gray-matter's
 * stringify so the field order stays stable and diffs stay readable.
 */
export const serializePost = (fm: ThoughtFrontmatter, content: string): string => {
  const esc = (s: string) => s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
  const lines = [
    '---',
    `title: "${esc(fm.title)}"`,
    `subtitle: "${esc(fm.subtitle || '')}"`,
    `date: "${fm.date}"`,
    `updated: "${fm.updated || fm.date}"`,
    `tags: [${fm.tags.map((t) => `"${esc(t)}"`).join(', ')}]`,
    `featureImage: "${esc(fm.featureImage || '')}"`,
    `excerpt: "${esc(fm.excerpt || '')}"`,
    `status: "${fm.status}"`,
    `readingTime: ${fm.readingTime ?? readingTime(content)}`,
    '---',
    '',
    content.trim(),
    '',
  ];

  return lines.join('\n');
};
