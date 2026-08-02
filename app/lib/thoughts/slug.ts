/** Slug helpers. Slugs double as filenames, so they must be filesystem-safe. */

export const slugify = (input: string): string =>
  input
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '') // strip accents
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/^-|-$/g, '');

/**
 * Rejects anything that could escape the content directory.
 * Called on every slug arriving from a request, including the public [slug] route.
 */
export const isSafeSlug = (slug: string): boolean =>
  /^[a-z0-9][a-z0-9-]{0,79}$/.test(slug);

export const filenameFor = (slug: string): string => `${slug}.md`;

export const slugFromFilename = (filename: string): string => filename.replace(/\.md$/, '');

/** Appends -2, -3, ... until the slug is free. */
export const uniqueSlug = (base: string, taken: string[]): string => {
  const slug = slugify(base) || 'untitled';
  if (!taken.includes(slug)) return slug;

  let n = 2;
  while (taken.includes(`${slug}-${n}`)) n += 1;
  return `${slug}-${n}`;
};
