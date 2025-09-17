// Hashnode GraphQL API utilities

import { 
  HashnodeApiResponse, 
  GetUserPostsVariables, 
  HashnodeGetUserPostsResponse,
  SubscribeToNewsletterVariables,
  SubscribeToNewsletterResponse,
  GetUserVariables,
  HashnodeGetUserResponse
} from '@/interface/api/hashnode';

const HASHNODE_API_URL = 'https://gql.hashnode.com';

// GraphQL queries and mutations
export const GET_USER_POSTS_QUERY = `
  query GetUserPosts($host: String!, $first: Int!, $after: String) {
    publication(host: $host) {
      id
      title
      posts(first: $first, after: $after) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            title
            publishedAt
            brief
            url
            publication {
              title
              displayTitle
              about {
                text
              }
            }
            coverImage {
              url
            }
            tags {
              name
            }
          }
        }
      }
    }
  }
`;

export const SUBSCRIBE_TO_NEWSLETTER_MUTATION = `
  mutation SubscribeToPublication($input: SubscribeToNewsletterInput!) {
    subscribeToNewsletter(input: $input) {
      status
    }
  }
`;

export const GET_USER_QUERY = `
  query User($username: String!, $pageSize: Int!, $after: String) {
    user(username: $username) {
      username
      profilePicture
      bio {
        text
      }
      publications(first: $pageSize, after: $after) {
        edges {
          node {
            url
          }
        }
      }
    }
  }
`;

// Generic GraphQL request function
async function makeGraphQLRequest<T>(
  query: string,
  variables: Record<string, any>
): Promise<HashnodeApiResponse<T>> {
  try {
    const response = await fetch(HASHNODE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache: 'force-cache',
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    throw error;
  }
}

// Specific API functions
export async function getUserPosts(
  variables: GetUserPostsVariables
): Promise<HashnodeApiResponse<HashnodeGetUserPostsResponse>> {
  return makeGraphQLRequest<HashnodeGetUserPostsResponse>(
    GET_USER_POSTS_QUERY,
    variables
  );
}

export async function subscribeToNewsletter(
  variables: SubscribeToNewsletterVariables
): Promise<HashnodeApiResponse<SubscribeToNewsletterResponse>> {
  return makeGraphQLRequest<SubscribeToNewsletterResponse>(
    SUBSCRIBE_TO_NEWSLETTER_MUTATION,
    variables
  );
}

export async function getUserProfile(
  variables: GetUserVariables
): Promise<HashnodeApiResponse<HashnodeGetUserResponse>> {
  return makeGraphQLRequest<HashnodeGetUserResponse>(
    GET_USER_QUERY,
    variables
  );
}
