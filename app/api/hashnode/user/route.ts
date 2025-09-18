import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile } from '@/app/lib/hashnode';
import { GetUserVariables } from '@/interface/api/hashnode';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');
    const pageSize = searchParams.get('pageSize');
    const after = searchParams.get('after');

    if (!username) {
      return NextResponse.json({ error: 'username is required' }, { status: 400 });
    }

    const size = pageSize ? parseInt(pageSize, 10) : 5;
    if (isNaN(size) || size <= 0 || size > 50) {
      return NextResponse.json({ error: 'pageSize must be 1-50' }, { status: 400 });
    }

    const variables: GetUserVariables = {
      username,
      pageSize: size,
      after: after || null,
    };

    const response = await getUserProfile(variables);
    if (response.errors && response.errors.length) {
      return NextResponse.json({ error: 'Hashnode error', details: response.errors }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: response.data });
  } catch (e) {
    console.error('Error fetching Hashnode user:', e);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

