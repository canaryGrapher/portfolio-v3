import React from 'react';
import type { Metadata } from 'next';
import { getPostSummaries } from '@/app/lib/thoughts/posts';
import { REVALIDATE_SECONDS } from '@/app/lib/thoughts/config';
import ThoughtsHero from '@/app/components/pages/thoughts/ThoughtsHero';
import ThoughtsGrid from '@/app/components/pages/thoughts/ThoughtsGrid';

export const revalidate = 60;

export const metadata: Metadata = {
    title: 'Thoughts',
    description:
        'Short personal entries on politics, culture and whatever else is on my mind. Opinions are my own.',
    alternates: { canonical: '/page/thoughts' },
    openGraph: {
        title: 'Thoughts | Yash Aryan',
        description: 'Short personal entries. Opinions are my own.',
        url: '/page/thoughts',
        type: 'website',
    },
};

const ThoughtsPage = async () => {
    let posts = [];
    let error: string | null = null;

    try {
        posts = await getPostSummaries();
    } catch (e) {
        // A missing token or a GitHub outage should degrade to an explanatory
        // page, not a 500.
        error = e instanceof Error ? e.message : 'Failed to load entries';
    }

    return (
        <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen pt-20 pb-16 md:pb-24">
            <div className="max-w-7xl mx-auto px-4">
                <ThoughtsHero />

                <div className="py-6">
                    {error ? (
                        <div className="text-center py-20 bg-white/50 border border-gray-200/50 rounded-2xl shadow-sm">
                            <h4 className="text-xl font-bold text-red-500 mb-1">Could not load entries</h4>
                            <p className="text-gray-500 text-sm">{error}</p>
                        </div>
                    ) : (
                        <ThoughtsGrid posts={posts} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default ThoughtsPage;
