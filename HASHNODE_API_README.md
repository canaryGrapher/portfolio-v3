# Hashnode API Integration

This project includes a complete API route structure for consuming Hashnode's GraphQL APIs. The integration provides both server-side API routes and client-side utilities for easy consumption in React components.

## 📁 File Structure

```
app/
├── types/
│   └── hashnode.ts              # TypeScript types for Hashnode API
├── lib/
│   ├── hashnode.ts              # Server-side GraphQL utilities
│   └── hashnode-client.ts       # Client-side API consumption utilities
├── api/
│   └── hashnode/
│       ├── posts/
│       │   └── route.ts         # API route for fetching blog posts
│       └── subscribe/
│           └── route.ts         # API route for newsletter subscription
└── components/
    └── examples/
        └── HashnodeExample.tsx  # Example component demonstrating usage
```

## 🚀 API Endpoints

### 1. Fetch Blog Posts

**Endpoint:** `GET /api/hashnode/posts`

**Query Parameters:**
- `host` (required): Hashnode publication host (e.g., 'canary.hashnode.dev')
- `first` (optional): Number of posts to fetch (1-50, default: 15)
- `after` (optional): Pagination cursor for fetching more posts

**Example:**
```bash
GET /api/hashnode/posts?host=canary.hashnode.dev&first=10
```

**Response:**
```json
{
  "success": true,
  "data": {
    "publication": {
      "id": "...",
      "title": "...",
      "posts": {
        "pageInfo": {
          "hasNextPage": true,
          "endCursor": "..."
        },
        "edges": [
          {
            "node": {
              "title": "Post Title",
              "publishedAt": "2024-01-01T00:00:00Z",
              "brief": "Post brief...",
              "url": "https://...",
              "coverImage": {
                "url": "https://..."
              },
              "tags": [
                { "name": "react" },
                { "name": "typescript" }
              ]
            }
          }
        ]
      }
    }
  }
}
```

### 2. Newsletter Subscription

**Endpoint:** `POST /api/hashnode/subscribe`

**Request Body:**
```json
{
  "publicationId": "5fc14563f1207e5b3cdeffd5",
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully subscribed to newsletter",
  "status": "SUCCESS"
}
```

## 💻 Client-Side Usage

### Using the HashnodeClient Class

```typescript
import { HashnodeClient } from '@/app/lib/hashnode-client';

// Fetch blog posts
const result = await HashnodeClient.getPosts('canary.hashnode.dev', 15);
if (result.success) {
  console.log('Posts:', result.data);
}

// Subscribe to newsletter
const subscription = await HashnodeClient.subscribeToNewsletter({
  publicationId: '5fc14563f1207e5b3cdeffd5',
  email: 'user@example.com'
});
if (subscription.success) {
  console.log('Subscription successful:', subscription.message);
}
```

### Using Convenience Functions

```typescript
import { getHashnodePosts, subscribeToHashnodeNewsletter } from '@/app/lib/hashnode-client';

// Fetch posts
const posts = await getHashnodePosts('canary.hashnode.dev', 10);

// Subscribe to newsletter
const subscription = await subscribeToHashnodeNewsletter({
  publicationId: '5fc14563f1207e5b3cdeffd5',
  email: 'user@example.com'
});
```

## 🎯 React Component Example

```typescript
'use client';

import React, { useState, useEffect } from 'react';
import { HashnodeClient } from '@/app/lib/hashnode-client';

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const result = await HashnodeClient.getPosts('canary.hashnode.dev', 15);
      if (result.success) {
        setPosts(result.data?.publication?.posts.edges.map(edge => edge.node) || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {posts.map((post, index) => (
        <article key={index}>
          <h2>{post.title}</h2>
          <p>{post.brief}</p>
          <a href={post.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </article>
      ))}
    </div>
  );
}
```

## 🔧 Configuration

### Environment Variables

You may want to add these to your `.env.local` file:

```env
HASHNODE_API_URL=https://gql.hashnode.com
HASHNODE_PUBLICATION_ID=5fc14563f1207e5b3cdeffd5
HASHNODE_HOST=canary.hashnode.dev
```

### Customizing the Publication

To use with your own Hashnode publication:

1. Update the `publicationId` in the subscription API calls
2. Change the `host` parameter to your publication's host
3. Update the default values in the example component

## 🛡️ Error Handling

The API routes include comprehensive error handling:

- **Validation errors**: Invalid parameters return 400 status
- **GraphQL errors**: Hashnode API errors are caught and returned with details
- **Network errors**: Connection issues are handled gracefully
- **Rate limiting**: Consider implementing rate limiting for production use

## 📝 TypeScript Support

All APIs are fully typed with TypeScript interfaces:

- `HashnodePost`: Individual blog post structure
- `HashnodeGetUserPostsResponse`: Response from posts API
- `SubscribeToNewsletterInput`: Newsletter subscription input
- `HashnodeApiResponse<T>`: Generic API response wrapper

## 🚀 Production Considerations

1. **Rate Limiting**: Implement rate limiting to prevent abuse
2. **Caching**: Add caching for blog posts to improve performance
3. **Error Monitoring**: Set up error monitoring for production
4. **Security**: Validate and sanitize all inputs
5. **Environment Variables**: Use environment variables for sensitive data

## 📚 GraphQL Queries

The integration uses these GraphQL queries:

### Get User Posts
```graphql
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
```

### Subscribe to Newsletter
```graphql
mutation SubscribeToPublication($input: SubscribeToNewsletterInput!) {
  subscribeToNewsletter(input: $input) {
    status
  }
}
```

## 🤝 Contributing

When extending this integration:

1. Update TypeScript types in `app/types/hashnode.ts`
2. Add new GraphQL queries to `app/lib/hashnode.ts`
3. Create corresponding API routes in `app/api/hashnode/`
4. Update client utilities in `app/lib/hashnode-client.ts`å

## 📄 License

This integration is part of your portfolio project and follows the same license terms.
