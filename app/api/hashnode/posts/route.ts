import { NextRequest, NextResponse } from 'next/server';
import { getUserPosts } from '@/app/lib/hashnode';
import { GetUserPostsVariables } from '@/interface/api/hashnode';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const host = searchParams.get('host');
    const first = searchParams.get('first');
    const after = searchParams.get('after');

    // Validate required parameters
    if (!host) {
      return NextResponse.json(
        { error: 'Host parameter is required' },
        { status: 400 }
      );
    }

    // Set default values and validate
    const firstNumber = first ? parseInt(first, 10) : 15;
    if (isNaN(firstNumber) || firstNumber <= 0 || firstNumber > 50) {
      return NextResponse.json(
        { error: 'First parameter must be a number between 1 and 50' },
        { status: 400 }
      );
    }

    // Prepare variables for GraphQL query
    const variables: GetUserPostsVariables = {
      host,
      first: firstNumber,
      after: after || null,
    };

    // Fetch data from Hashnode
    const response = await getUserPosts(variables);

    // Check for GraphQL errors
    if (response.errors && response.errors.length > 0) {
      console.error('Hashnode GraphQL errors:', response.errors);
      return NextResponse.json(
        { 
          error: 'Failed to fetch posts from Hashnode',
          details: response.errors 
        },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      data: response.data,
    });

  } catch (error) {
    console.error('Error fetching Hashnode posts:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Optional: Add POST method for more complex queries
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { host, first = 15, after = null } = body;

    // Validate required parameters
    if (!host) {
      return NextResponse.json(
        { error: 'Host parameter is required' },
        { status: 400 }
      );
    }

    // Validate first parameter
    if (typeof first !== 'number' || first <= 0 || first > 50) {
      return NextResponse.json(
        { error: 'First parameter must be a number between 1 and 50' },
        { status: 400 }
      );
    }

    // Prepare variables for GraphQL query
    const variables: GetUserPostsVariables = {
      host,
      first,
      after,
    };

    // Fetch data from Hashnode
    const response = await getUserPosts(variables);

    // Check for GraphQL errors
    if (response.errors && response.errors.length > 0) {
      console.error('Hashnode GraphQL errors:', response.errors);
      return NextResponse.json(
        { 
          error: 'Failed to fetch posts from Hashnode',
          details: response.errors 
        },
        { status: 500 }
      );
    }

    // Return successful response
    return NextResponse.json({
      success: true,
      data: response.data,
    });

  } catch (error) {
    console.error('Error fetching Hashnode posts:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
