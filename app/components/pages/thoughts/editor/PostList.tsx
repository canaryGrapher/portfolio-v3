"use client";

import React, { useState, useMemo } from 'react';
import { ThoughtSummary } from '@/app/interface/thoughts';

interface PostListProps {
    posts: ThoughtSummary[];
    activeSlug: string | null;
    loading: boolean;
    onSelect: (slug: string) => void;
    onDelete: (slug: string) => void;
    onNew: () => void;
}

type Filter = 'all' | 'draft' | 'published';

const shortDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const PostList: React.FC<PostListProps> = ({
    posts, activeSlug, loading, onSelect, onDelete, onNew,
}) => {
    // Two-step delete: the first click arms it, the second confirms.
    const [confirming, setConfirming] = useState<string | null>(null);
    const [filter, setFilter] = useState<Filter>('all');

    const counts = useMemo(
        () => ({
            all: posts.length,
            draft: posts.filter((p) => p.status === 'draft').length,
            published: posts.filter((p) => p.status === 'published').length,
        }),
        [posts]
    );

    const visible = useMemo(
        () => (filter === 'all' ? posts : posts.filter((p) => p.status === filter)),
        [posts, filter]
    );

    return (
        <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-3">
                <h2 className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                    Your entries
                </h2>
                <button
                    type="button"
                    onClick={onNew}
                    className="text-[11px] font-bold text-green-800 hover:text-green-600 cursor-pointer"
                >
                    + New
                </button>
            </div>

            <div className="flex gap-1 mb-3 bg-gray-100/80 rounded-lg p-0.5">
                {(['all', 'draft', 'published'] as const).map((f) => (
                    <button
                        key={f}
                        type="button"
                        onClick={() => setFilter(f)}
                        className={`flex-1 py-1.5 text-[10px] font-bold rounded-md capitalize cursor-pointer transition-all ${filter === f ? 'bg-white text-green-800 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        {f} {counts[f] > 0 && <span className="opacity-60">{counts[f]}</span>}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex flex-col gap-2">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className="h-16 bg-gray-100 rounded-lg animate-pulse" />
                    ))}
                </div>
            ) : visible.length === 0 ? (
                <p className="text-xs text-gray-400 italic py-4 text-center">
                    {filter === 'all' ? 'Nothing written yet.' : `No ${filter} entries.`}
                </p>
            ) : (
                <div className="flex flex-col gap-1.5 overflow-y-auto flex-1 -mr-1 pr-1">
                    {visible.map((post) => {
                        const active = post.slug === activeSlug;
                        const isDraft = post.status === 'draft';

                        return (
                            <div
                                key={post.slug}
                                className={`group rounded-xl border transition-all ${active
                                    ? 'bg-green-50/70 border-green-300'
                                    : 'bg-white border-gray-200 hover:border-green-800/30 hover:shadow-sm'
                                    }`}
                            >
                                <button
                                    type="button"
                                    onClick={() => onSelect(post.slug)}
                                    className="w-full text-left px-3 py-2.5 cursor-pointer"
                                >
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <span
                                            className={`text-[9px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded ${isDraft
                                                ? 'bg-amber-100 text-amber-800 border border-amber-200'
                                                : 'bg-green-100 text-green-800 border border-green-200'
                                                }`}
                                        >
                                            {post.status}
                                        </span>
                                        {post.readingTime ? (
                                            <span className="text-[10px] text-gray-400 font-semibold">
                                                {post.readingTime} min
                                            </span>
                                        ) : null}
                                    </div>

                                    <p className={`text-[13px] font-bold leading-snug line-clamp-2 mb-1 ${active ? 'text-green-900' : 'text-gray-800'}`}>
                                        {post.title}
                                    </p>

                                    <p className="text-[10px] text-gray-400 font-semibold">
                                        {isDraft
                                            ? `Edited ${shortDate(post.updated || post.date)}`
                                            : `Published ${shortDate(post.date)}`}
                                    </p>
                                </button>

                                <div className="px-3 pb-2.5">
                                    {confirming === post.slug ? (
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    onDelete(post.slug);
                                                    setConfirming(null);
                                                }}
                                                className="text-[10px] font-bold text-white bg-red-600 px-2 py-1 rounded cursor-pointer hover:bg-red-700"
                                            >
                                                Delete for good
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setConfirming(null)}
                                                className="text-[10px] font-bold text-gray-500 cursor-pointer hover:text-gray-700"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                type="button"
                                                onClick={() => onSelect(post.slug)}
                                                className="text-[10px] font-bold text-green-800 hover:text-green-600 cursor-pointer"
                                            >
                                                {isDraft ? 'Continue writing' : 'Edit'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setConfirming(post.slug)}
                                                className="text-[10px] font-bold text-gray-400 hover:text-red-600 cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PostList;
