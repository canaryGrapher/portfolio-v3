import { NextRequest, NextResponse } from 'next/server';
import { subscribeToNewsletter } from '@/app/lib/hashnode';
import { SubscribeToNewsletterVariables } from '@/interface/api/hashnode';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { publicationId, email } = body;

    // Validate required parameters
    if (!publicationId) {
      return NextResponse.json(
        { error: 'Publication ID is required' },
        { status: 400 }
      );
    }

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare variables for GraphQL mutation
    const variables: SubscribeToNewsletterVariables = {
      input: {
        publicationId,
        email,
      },
    };

    // Subscribe to newsletter via Hashnode
    const response = await subscribeToNewsletter(variables);

    // Check for GraphQL errors
    if (response.errors && response.errors.length > 0) {
      console.error('Hashnode GraphQL errors:', response.errors);
      return NextResponse.json(
        { 
          error: 'Failed to subscribe to newsletter',
          details: response.errors 
        },
        { status: 500 }
      );
    }

    // Check subscription status
    const subscriptionStatus = response.data?.subscribeToNewsletter?.status;
    
    if (subscriptionStatus === 'SUCCESS') {
      return NextResponse.json({
        success: true,
        message: 'Successfully subscribed to newsletter',
        status: subscriptionStatus,
      });
    } else {
      return NextResponse.json(
        { 
          error: 'Failed to subscribe to newsletter',
          status: subscriptionStatus,
          details: response.errors
        },
        { status: 400 }
      );
    }

  } catch (error) {
    console.error('Error subscribing to newsletter:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}