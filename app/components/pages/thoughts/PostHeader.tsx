import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThoughtPost } from '@/app/interface/thoughts';

interface PostHeaderProps {
    post: ThoughtPost;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
    const edited = post.updated && post.updated.slice(0, 10) !== post.date.slice(0, 10);

    return (
        <header className="pt-12 pb-8">
            <Link
                href="/page/thoughts"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-green-800 transition-colors mb-8"
            >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
                All entries
            </Link>

            {post.status === 'draft' && (
                <div className="mb-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-300 text-amber-800 text-xs font-bold">
                    Draft, visible only to you
                </div>
            )}

            <div className="flex items-center gap-3 flex-wrap mb-5 text-xs font-semibold text-gray-500">
                <span className="uppercase tracking-wider text-gray-300 bg-green-800 px-2 py-0.5 rounded-sm">
                    {formatDate(post.date)}
                </span>
                {post.readingTime ? <span>{post.readingTime} min read</span> : null}
                {edited && <span className="italic">Updated {formatDate(post.updated!)}</span>}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-gray-900 mb-4 leading-[1.1]">
                {post.title}
            </h1>

            {post.subtitle && (
                <p className="text-base md:text-xl text-gray-600 font-semibold leading-relaxed mb-6 max-w-3xl">
                    {post.subtitle}
                </p>
            )}

            {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-8">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="inline-flex items-center text-[10px] px-2.5 py-1 rounded-full font-bold bg-green-800 text-gray-200"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            {post.featureImage && (
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-gray-200/80 shadow-lg">
                    <Image
                        src={post.featureImage}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 80vw"
                        className="object-cover"
                        priority
                        unoptimized
                    />
                </div>
            )}
        </header>
    );
};

export default PostHeader;
