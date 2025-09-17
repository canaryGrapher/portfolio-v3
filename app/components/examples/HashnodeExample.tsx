'use client';

import React, { useState, useEffect } from 'react';
import { HashnodeClient } from '@/app/lib/hashnode-client';
import { HashnodePost } from '@/app/types/hashnode';

interface HashnodeExampleProps {
  host?: string;
}

export default function HashnodeExample({ host = 'canary.hashnode.dev' }: HashnodeExampleProps) {
  const [posts, setPosts] = useState<HashnodePost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState<string | null>(null);

  // Newsletter subscription state
  const [email, setEmail] = useState('');
  const [subscribing, setSubscribing] = useState(false);
  const [subscriptionMessage, setSubscriptionMessage] = useState<string | null>(null);

  // Fetch posts
  const fetchPosts = async (after?: string | null) => {
    setLoading(true);
    setError(null);

    try {
      const result = await HashnodeClient.getPosts(host, 15, after);
      
      if (result.success && result.data) {
        const newPosts = result.data.publication?.posts.edges.map(edge => edge.node) || [];
        
        if (after) {
          // Append to existing posts for pagination
          setPosts(prev => [...prev, ...newPosts]);
        } else {
          // Replace posts for initial load
          setPosts(newPosts);
        }
        
        setHasNextPage(result.data.publication?.posts.pageInfo.hasNextPage || false);
        setEndCursor(result.data.publication?.posts.pageInfo.endCursor || null);
      } else {
        setError(result.error || 'Failed to fetch posts');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  // Load more posts (pagination)
  const loadMorePosts = () => {
    if (hasNextPage && endCursor && !loading) {
      fetchPosts(endCursor);
    }
  };

  // Subscribe to newsletter
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribing(true);
    setSubscriptionMessage(null);

    try {
      const result = await HashnodeClient.subscribeToNewsletter({
        publicationId: '5fc14563f1207e5b3cdeffd5', // Replace with actual publication ID
        email,
      });

      if (result.success) {
        setSubscriptionMessage(result.message || 'Successfully subscribed!');
        setEmail('');
      } else {
        setSubscriptionMessage(result.error || 'Failed to subscribe');
      }
    } catch (err) {
      setSubscriptionMessage(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setSubscribing(false);
    }
  };

  // Load initial posts
  useEffect(() => {
    fetchPosts();
  }, [host]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">Hashnode API Integration</h1>
      
      {/* Newsletter Subscription */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Subscribe to Newsletter</h2>
        <form onSubmit={handleSubscribe} className="space-y-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={subscribing}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {subscribing ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {subscriptionMessage && (
          <p className={`mt-2 text-sm ${subscriptionMessage.includes('Success') ? 'text-green-600' : 'text-red-600'}`}>
            {subscriptionMessage}
          </p>
        )}
      </div>

      {/* Blog Posts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Latest Blog Posts</h2>
        
        {loading && posts.length === 0 && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading posts...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">Error: {error}</p>
            <button
              onClick={() => fetchPosts()}
              className="mt-2 text-red-600 hover:text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {posts.length > 0 && (
          <div className="space-y-6">
            {posts.map((post, index) => (
              <article key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                {post.coverImage && (
                  <img
                    src={post.coverImage.url}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-xl font-semibold mb-2">
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    {post.title}
                  </a>
                </h3>
                <p className="text-gray-600 mb-3">{post.brief}</p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm"
                    >
                      #{tag.name}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Published: {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </article>
            ))}

            {/* Load More Button */}
            {hasNextPage && (
              <div className="text-center">
                <button
                  onClick={loadMorePosts}
                  disabled={loading}
                  className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                  {loading ? 'Loading...' : 'Load More Posts'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
