"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { HashnodeClient } from '@/app/lib/hashnode-client';
import { HashnodePost } from '@/app/interface/api/hashnode';
import { BlogsGrid } from '@/app/components/pages/blogs';
import { useLoading } from '@/app/contexts/LoadingContext';

const BlogsPage = () => {
    const [posts, setPosts] = useState<HashnodePost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addLoadingTask, removeLoadingTask } = useLoading();

    useEffect(() => {
        const taskId = 'blogs-api';
        (async () => {
            try {
                addLoadingTask(taskId);
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
                removeLoadingTask(taskId);
            }
        })();
    }, [addLoadingTask, removeLoadingTask]);

    const content = useMemo(() => {
        if (loading) {
            return (
                <div className="grid gap-6 animate-pulse px-4 max-w-7xl mx-auto w-full">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 h-80 bg-white/50 border border-gray-200/80 rounded-xl" />
                        <div className="h-80 bg-white/50 border border-gray-200/80 rounded-xl" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="h-80 bg-white/50 border border-gray-200/80 rounded-xl" />
                        ))}
                    </div>
                </div>
            );
        }
        if (error) {
            return (
                <div className="text-center py-20 bg-white/50 border border-gray-200/50 rounded-2xl max-w-7xl mx-auto px-4 shadow-sm">
                    <h4 className="text-xl font-bold text-red-500 mb-1">Failed to load blogs</h4>
                    <p className="text-gray-500 text-sm">{error}</p>
                </div>
            );
        }
        return <BlogsGrid posts={posts} />;
    }, [loading, error, posts]);

    return (
        <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen pt-20">
            <div className="max-w-7xl mx-auto px-4">
                
                {/* Minimalist Typography Hero Header */}
                <div className="pt-16 pb-10">
                    {/* Live Chip Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                        </span>
                        Writings & Thoughts
                    </div>
                    
                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-5 max-w-4xl leading-[1.1]">
                        Writing stories that <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-705 to-teal-900">provoke thought.</span>
                    </h1>
                    
                    {/* Subtitle description */}
                    <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed font-semibold">
                        A curated collection of articles, tutorials, and personal thoughts. Covering software architecture, frontend engineering, database optimization, and the occasional rant on tech life.
                    </p>
                </div>

                {/* Blogs Grid Section */}
                <div className="py-6">
                    {content}
                </div>
            </div>  
        </div>
    );
};

export default BlogsPage;
