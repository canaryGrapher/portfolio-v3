import { getPostSummaries } from '@/app/lib/thoughts/posts';

export const revalidate = 3600;

const SITE = 'https://yasharyan.dev';

const escape = (s: string) =>
    s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');

export async function GET() {
    let items = '';

    try {
        const posts = await getPostSummaries();
        items = posts
            .map((post) => {
                const url = `${SITE}/page/thoughts/${post.slug}`;
                return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escape(post.excerpt || '')}</description>
${post.tags.map((t) => `      <category>${escape(t)}</category>`).join('\n')}
    </item>`;
            })
            .join('\n');
    } catch {
        // An empty but valid feed beats a 500 in someone's reader.
        items = '';
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Thoughts | Yash Aryan</title>
    <link>${SITE}/page/thoughts</link>
    <description>Short personal entries. Opinions are my own.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE}/page/thoughts/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

    return new Response(xml, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, max-age=3600',
        },
    });
}
