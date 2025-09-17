"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { HashnodeClient } from '@/app/lib/hashnode-client';
import { HashnodePost } from '@/app/interface/api/hashnode';
import { PostsGrid, HeaderSection } from '@/app/components/pages/blogs';

const BlogsPage = () => {
    const [posts, setPosts] = useState<HashnodePost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const subscribe = async (email: string) => {
        const result = await HashnodeClient.subscribeToNewsletter({ publicationId: '5fc14563f1207e5b3cdeffd5', email });
        if (result.success) return { status: 'success' as const, message: result.message || '' };
        // detect already subscribed based on error extensions
        const already = (result.details?.[0]?.extensions?.code === 'BAD_USER_INPUT') || (result.error?.toLowerCase().includes('already') ?? false);
        return { status: already ? ('already' as const) : ('error' as const), message: result.error || '' };
    };

    useEffect(() => {
        (async () => {
            try {
                const res = await HashnodeClient.getPosts('canary.hashnode.dev', 15);
                if (res.success && res.data?.publication) {
                    setPosts(res.data.publication.posts.edges.map(e => e.node));
                } else if (!res.success) {
                    setError(res.error || 'Failed to load posts');
                }
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Unknown error');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const content = useMemo(() => {
        if (loading) {
            return (
                <div className="grid gap-6 animate-pulse">
                    <div className="grid grid-cols-3 gap-6">
                        <div className="col-span-2 h-72 bg-white/10 rounded-md" />
                        <div className="grid gap-6">
                            <div className="h-48 bg-white/10 rounded-md" />
                            <div className="h-48 bg-white/10 rounded-md" />
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                        {Array.from({ length: 9 }).map((_, i) => (
                            <div key={i} className="h-48 bg-white/10 rounded-md" />
                        ))}
                    </div>
                </div>
            );
        }
        if (error) return <div className="text-red-400">{error}</div>;
        return <PostsGrid posts={posts} />;
    }, [loading, error, posts]);

    return (
        <div className="min-h-screen bg-[#e5e5e5] text-black">
            <div className="container mx-auto px-4 py-10 grid gap-10">
                <HeaderSection
                    title="Stories and chronicles"
                    subtitle="Subscribe to keep up with the latest stories that I publish"
                    onSubscribe={subscribe}
                />

                <div className="grid gap-4 mt-10">
                    <h2 className="font-bold text-2xl">Recent blog posts</h2>
                    {content}
                </div>
            </div>
        </div>
    );
};

export default BlogsPage;
