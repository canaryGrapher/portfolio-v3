import { NextRequest, NextResponse } from 'next/server';
import { getPostSummaries, savePost } from '@/app/lib/thoughts/posts';
import { verifySession } from '@/app/lib/thoughts/auth';
import { AUTH_COOKIE } from '@/app/lib/thoughts/config';
import { ThoughtDraftInput } from '@/app/interface/thoughts';

export const runtime = 'nodejs';

const isAuthed = async (request: NextRequest) =>
  Boolean(await verifySession(request.cookies.get(AUTH_COOKIE)?.value));

/** GET /api/thoughts/posts — published only, unless authenticated. */
export async function GET(request: NextRequest) {
  try {
    const authed = await isAuthed(request);
    const posts = await getPostSummaries(authed, authed ? 'none' : 'revalidate');
    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to load posts';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/** POST /api/thoughts/posts — create. Auth enforced by middleware. */
export async function POST(request: NextRequest) {
  let input: ThoughtDraftInput;
  try {
    input = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid request body' }, { status: 400 });
  }

  if (!input.title?.trim()) {
    return NextResponse.json({ success: false, error: 'Title is required' }, { status: 400 });
  }
  if (!input.content?.trim()) {
    return NextResponse.json({ success: false, error: 'Content is required' }, { status: 400 });
  }

  try {
    const result = await savePost({ ...input, sha: undefined });
    return NextResponse.json({ success: true, data: result }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to save post';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
