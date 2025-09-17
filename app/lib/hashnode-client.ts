// Client-side utilities for consuming Hashnode API routes

import { 
  HashnodeGetUserPostsResponse, 
  SubscribeToNewsletterInput,
  HashnodeGetUserResponse
} from '@/app/interface/api/hashnode';

const API_BASE_URL = '/api/hashnode';

// Client-side API functions
export class HashnodeClient {
  /**
   * Fetch blog posts from Hashnode
   * @param host - The Hashnode publication host (e.g., 'canary.hashnode.dev')
   * @param first - Number of posts to fetch (1-50, default: 15)
   * @param after - Pagination cursor for fetching more posts
   */
  static async getPosts(
    host: string,
    first: number = 15,
    after?: string | null
  ): Promise<{
    success: boolean;
    data?: HashnodeGetUserPostsResponse;
    error?: string;
    details?: any;
  }> {
    try {
      const params = new URLSearchParams({
        host: host || 'canary.hashnode.dev',
        first: first.toString(),
        ...(after && { after }),
      });

      const response = await fetch(`${API_BASE_URL}/posts?${params}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'force-cache'
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Failed to fetch posts',
          details: result.details,
        };
      }

      return {
        success: true,
        data: result.data,
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Subscribe to Hashnode newsletter
   * @param input - Subscription input with publicationId and email
   * @hardcoded publicationId: '5fc14563f1207e5b3cdeffd5'
   */
  static async subscribeToNewsletter(
    input: SubscribeToNewsletterInput,
    publicationId: string = '5fc14563f1207e5b3cdeffd5'
  ): Promise<{
    success: boolean;
    message?: string;
    status?: string;
    error?: string;
    details?: any;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...input, publicationId }),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: result.error || 'Failed to subscribe to newsletter',
          details: result.details,
        };
      }

      return {
        success: true,
        message: result.message,
        status: result.status,
      };
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Fetch user profile info for CTA (blog link, profile picture, bio)
   */
  static async getUserProfile(
    username: string,
    pageSize: number = 5,
    after?: string | null
  ): Promise<{
    success: boolean;
    data?: HashnodeGetUserResponse;
    error?: string;
    details?: any;
  }> {
    try {
      const params = new URLSearchParams({
        username,
        pageSize: pageSize.toString(),
        ...(after && { after }),
      });

      const response = await fetch(`/api/hashnode/user?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'force-cache',
      });

      const result = await response.json();
      if (!response.ok) {
        return { success: false, error: result.error || 'Failed to fetch user', details: result.details };
      }

      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }
}

// Convenience functions for direct usage
export const getHashnodePosts = HashnodeClient.getPosts;
export const subscribeToHashnodeNewsletter = HashnodeClient.subscribeToNewsletter;
