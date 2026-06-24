import { NextRequest, NextResponse } from 'next/server';

export async function GET(_request: NextRequest) {
  try {
    const feedRes = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40theprogrammersrant', {
      cache: 'force-cache',
      next: { revalidate: 3600 }
    });
    const data = await feedRes.json();
    
    if (data.status === 'ok') {
      return NextResponse.json({
        success: true,
        data: {
          user: {
            username: "theprogrammersrant",
            profilePicture: data.feed.image || "https://cdn-images-1.medium.com/fit/c/150/150/1*7uT8wcAOgrcq0kProc6doQ.jpeg",
            bio: {
              text: "Software Engineer & Creator. Writing about software engineering, frontend architecture, and system design."
            },
            publications: {
              edges: [
                {
                  node: {
                    url: data.feed.link || "https://medium.com/@theprogrammersrant"
                  }
                }
              ]
            }
          }
        }
      });
    }
    
    throw new Error('Medium feed status not ok');
  } catch (error) {
    console.warn('Failed to fetch Medium user details. Returning fallback user profile:', error);
    return NextResponse.json({
      success: true,
      data: {
        user: {
          username: "theprogrammersrant",
          profilePicture: "https://cdn-images-1.medium.com/fit/c/150/150/1*7uT8wcAOgrcq0kProc6doQ.jpeg",
          bio: {
            text: "Software Engineer & Creator. Writing about software engineering, frontend architecture, and system design."
          },
          publications: {
            edges: [
              {
                node: {
                  url: "https://medium.com/@theprogrammersrant"
                }
              }
            ]
          }
        }
      }
    });
  }
}
