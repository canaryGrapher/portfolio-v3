const WORDS_PER_MINUTE = 220;

/** Rough reading-time estimate, ignoring code fences and image syntax. */
export const readingTime = (markdown: string): number => {
  const prose = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1');

  const words = prose.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
};

/** First N characters of prose, used when no excerpt is supplied. */
export const deriveExcerpt = (markdown: string, length = 160): string => {
  const plain = markdown
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/[#>*_`~-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  if (plain.length <= length) return plain;
  return `${plain.slice(0, plain.lastIndexOf(' ', length))}...`;
};
