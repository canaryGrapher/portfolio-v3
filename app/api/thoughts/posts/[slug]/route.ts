import { NextRequest, NextResponse } from 'next/server';
import { getPost, savePost, removePost } from '@/app/lib/thoughts/posts';
import { verifySession } from '@/app/lib/thoughts/auth';
import { AUTH_COOKIE } from '@/app/lib/thoughts/config';
import { ThoughtDraftInput } from '@/app/interface/thoughts';

export const runtime = 'nodejs';

type Params = { params: Promise<{ slug: string }> };

const isAuthed = async (request: NextRequest) =>
  Boolean(await verifySession(request.cookies.get(AUTH_COOKIE)?.value));

const failure = (error: unknown, fallback: string, status = 500) => {
  const message = error instanceof Error ? error.message : fallback;
  return NextResponse.json({ success: false, error: message }, { status });
};

export async function GET(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  try {
    const authed = await isAuthed(request);
    const post = await getPost(slug, authed, authed ? 'none' : 'revalidate');

    if (!post) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    return failure(error, 'Failed to load post');
  }
}

/** PUT — update an existing post. Auth enforced by middleware. */
export async function PUT(request: NextRequest, { params }: Params) {
  const { slug } = await params;

  let input: ThoughtDraftInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  if (!input.title?.trim() || !input.content?.trim()) {
    return NextResponse.json(
      { success: false, error: 'Title and content are required' },
      { status: 400 }
    );
  }

  try {
    // Always resolve the current sha server-side: a stale sha from the client
    // would fail the commit, and silently overwriting is worse than a clear error.
    const existing = await getPost(slug, true, 'none');
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Post not found' }, { status: 404 });
    }

    const result = await savePost({
      ...input,
      slug,
      sha: existing.sha,
      date: existing.date,
    });
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    return failure(error, 'Failed to update post');
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const { slug } = await params;
  try {
    await removePost(slug);
    return NextResponse.json({ success: true, data: { slug, deleted: true } });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to delete post';
    const status = message.includes('not found') ? 404 : 500;
    return NextResponse.json({ success: false, error: message }, { status });
  }
}
