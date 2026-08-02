"use client";

import React, { useState, useMemo } from 'react';
import ThoughtCard from './ThoughtCard';
import TagFilter from './TagFilter';
import { ThoughtSummary } from '@/app/interface/thoughts';

interface ThoughtsGridProps {
    posts: ThoughtSummary[];
}

const ThoughtsGrid: React.FC<ThoughtsGridProps> = ({ posts }) => {
    const [query, setQuery] = useState('');
    const [tag, setTag] = useState<string | null>(null);

    const tags = useMemo(
        () => [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b)),
        [posts]
    );

    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        return posts.filter((post) => {
            const matchesTag = !tag || post.tags.includes(tag);
            const matchesQuery =
                !q ||
                post.title.toLowerCase().includes(q) ||
                (post.subtitle || '').toLowerCase().includes(q) ||
                (post.excerpt || '').toLowerCase().includes(q) ||
                post.tags.some((t) => t.toLowerCase().includes(q));
            return matchesTag && matchesQuery;
        });
    }, [posts, query, tag]);

    if (posts.length === 0) {
        return (
            <div className="text-center py-20 bg-white/50 border border-gray-200/50 rounded-2xl shadow-sm">
                <div className="w-16 h-16 bg-gray-200/60 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-1">Nothing here yet</h4>
                <p className="text-gray-500 max-w-md mx-auto text-sm">
                    The first entry has not been written. Check back soon.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-6">
                <div className="relative w-full sm:flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search entries..."
                        className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-800/40 focus:border-green-800 transition-all text-gray-800 shadow-sm"
                    />
                    {query && (
                        <button
                            onClick={() => setQuery('')}
                            aria-label="Clear search"
                            className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                <div className="text-xs font-semibold text-gray-500 bg-white/70 px-3.5 py-1.5 rounded-lg border border-gray-200 shadow-sm whitespace-nowrap">
                    Showing <span className="text-green-800 font-bold">{filtered.length}</span> of {posts.length}
                </div>
            </div>

            <TagFilter tags={tags} selected={tag} onSelect={setTag} />

            {filtered.length === 0 ? (
                <div className="text-center py-20 bg-white/50 border border-gray-200/50 rounded-2xl shadow-sm">
                    <h4 className="text-xl font-bold text-gray-800 mb-1">No matching entries</h4>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">
                        Try a different search term or clear the filters.
                    </p>
                    <button
                        onClick={() => {
                            setQuery('');
                            setTag(null);
                        }}
                        className="px-6 py-2.5 bg-green-800 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10 cursor-pointer"
                    >
                        Reset filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 md:mb-16">
                    {filtered.map((post, index) => {
                        // First entry gets a wide slot; the rest alternate colour.
                        const featured = index === 0 && filtered.length > 2;
                        return (
                            <div key={post.slug} className={featured ? 'md:col-span-2' : 'col-span-1'}>
                                <ThoughtCard
                                    post={post}
                                    variant={index % 2 === 0 ? 'green' : 'white'}
                                    featured={featured}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default ThoughtsGrid;
