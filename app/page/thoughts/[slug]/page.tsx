import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPost, getPostSummaries } from '@/app/lib/thoughts/posts';
import PostHeader from '@/app/components/pages/thoughts/PostHeader';
import MarkdownRenderer from '@/app/components/pages/thoughts/MarkdownRenderer';

export const revalidate = 60;
// Slugs are discovered at request time, so a post published after the last
// build still resolves instead of 404ing.
export const dynamicParams = true;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
    try {
        const posts = await getPostSummaries();
        return posts.map((p) => ({ slug: p.slug }));
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    try {
        const post = await getPost(slug);
        if (!post) return { title: 'Entry not found' };

        return {
            title: post.title,
            description: post.excerpt,
            alternates: { canonical: `/page/thoughts/${post.slug}` },
            openGraph: {
                title: post.title,
                description: post.excerpt,
                url: `/page/thoughts/${post.slug}`,
                type: 'article',
                publishedTime: post.date,
                modifiedTime: post.updated,
                tags: post.tags,
                ...(post.featureImage ? { images: [{ url: post.featureImage }] } : {}),
            },
            twitter: {
                card: post.featureImage ? 'summary_large_image' : 'summary',
                title: post.title,
                description: post.excerpt,
                ...(post.featureImage ? { images: [post.featureImage] } : {}),
            },
        };
    } catch {
        return { title: 'Entry' };
    }
}

const ThoughtPage = async ({ params }: Props) => {
    const { slug } = await params;

    let post = null;
    try {
        post = await getPost(slug);
    } catch {
        post = null;
    }

    if (!post) notFound();

    return (
        <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen pt-20 pb-16 md:pb-24">
            <article className="max-w-3xl mx-auto px-4">
                <PostHeader post={post} />

                <div className="py-8">
                    <MarkdownRenderer content={post.content} />
                </div>

                <footer className="mt-12 pt-8 border-t border-dashed border-gray-300">
                    <Link
                        href="/page/thoughts"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-green-800 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        Back to all entries
                    </Link>
                </footer>
            </article>
        </div>
    );
};

export default ThoughtPage;
