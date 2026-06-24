import { NextRequest, NextResponse } from 'next/server';

// Fallback Mock Blog Posts in case Medium feed fails entirely
const MOCK_PUBLICATION_DATA = {
  publication: {
    id: "mock-publication-id",
    title: "canaryGrapher's Blog",
    posts: {
      pageInfo: {
        hasNextPage: false,
        endCursor: ""
      },
      edges: [
        {
          node: {
            title: "Mastering Next.js Turbopack: Under the Hood of Next-Gen Bundling",
            publishedAt: "2026-06-15T08:00:00Z",
            brief: "An in-depth look at Turbopack's architecture, its Rust-based engine, and how it accelerates Next.js local development feedback loops.",
            url: "https://nextjs.org/docs/app/api-reference/turbopack",
            publication: {
              title: "canaryGrapher's Blog",
              displayTitle: "canaryGrapher's Blog",
              about: {
                text: "Software Engineering & Architecture Blog"
              }
            },
            coverImage: {
              url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60"
            },
            tags: [
              { name: "React" },
              { name: "Next.js" },
              { name: "Rust" },
              { name: "Tooling" }
            ]
          }
        }
      ]
    }
  }
};

function extractImage(description: string): string {
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = description.match(imgRegex);
  if (match) {
    return match[1];
  }
  return "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60";
}

function cleanSnippet(html: string): string {
  const snippetRegex = /<p class="medium-feed-snippet">([\s\S]*?)<\/p>/;
  const snippetMatch = html.match(snippetRegex);
  if (snippetMatch) {
    return snippetMatch[1].replace(/<[^>]+>/g, '').trim();
  }
  
  const cleaned = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/(p|div|h1|h2|h3|h4|h5|h6|li|tr)>/gi, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
    
  if (cleaned.length > 185) {
    return cleaned.substring(0, 180) + '...';
  }
  return cleaned;
}

export async function GET(_request: NextRequest) {
  try {
    const feedRes = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40theprogrammersrant', {
      cache: 'no-store'
    });
    const data = await feedRes.json();
    
    if (data.status === 'ok') {
      const feedEdges = data.items.map((item: any) => {
        const coverImageUrl = extractImage(item.description);
        const brief = cleanSnippet(item.description);
        
        let pubDateStr = item.pubDate;
        if (pubDateStr && !pubDateStr.includes('T')) {
          pubDateStr = pubDateStr.replace(' ', 'T');
        }
        
        return {
          node: {
            title: item.title,
            publishedAt: new Date(pubDateStr).toISOString(),
            brief: brief,
            url: item.link,
            publication: {
              title: data.feed.title || "The Programmer's Rant",
              displayTitle: data.feed.title || "The Programmer's Rant",
              about: {
                text: data.feed.description || "Stories by Yash Aryan on Medium"
              }
            },
            coverImage: {
              url: coverImageUrl
            },
            tags: (item.categories || []).map((cat: string) => ({ name: cat }))
          }
        };
      });

      // Sort posts chronologically (newest first)
      feedEdges.sort((a: any, b: any) => new Date(b.node.publishedAt).getTime() - new Date(a.node.publishedAt).getTime());

      return NextResponse.json({
        success: true,
        data: {
          publication: {
            id: "medium-feed",
            title: data.feed.title || "The Programmer's Rant",
            posts: {
              pageInfo: {
                hasNextPage: false,
                endCursor: ""
              },
              edges: feedEdges
            }
          }
        }
      });
    }

    throw new Error('Medium feed status not ok');
  } catch (error) {
    console.warn('Failed to fetch/parse Medium feed. Returning mock posts:', error);
    return NextResponse.json({
      success: true,
      data: MOCK_PUBLICATION_DATA,
      isFallback: true
    });
  }
}

export async function POST(_request: NextRequest) {
  return GET(_request);
}
