import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThoughtSummary } from '@/app/interface/thoughts';

interface ThoughtCardProps {
    post: ThoughtSummary;
    variant?: 'green' | 'white';
    featured?: boolean;
}

const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

const ThoughtCard: React.FC<ThoughtCardProps> = ({ post, variant = 'white', featured = false }) => {
    const isGreen = variant === 'green';

    return (
        <Link
            href={`/page/thoughts/${post.slug}`}
            className={`h-full w-full ${featured ? 'min-h-[320px]' : 'min-h-[280px]'}
                relative group overflow-hidden rounded-xl border flex flex-col
                transition-all duration-300 ease-out hover:-translate-y-1.5
                ${isGreen
                    ? 'bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 border-green-700/40 text-green-100 hover:shadow-2xl hover:shadow-green-900/35'
                    : 'bg-white/90 backdrop-blur-sm border-gray-200/80 text-gray-800 hover:shadow-2xl hover:shadow-gray-300/40 hover:border-gray-300'
                }`}
        >
            {post.featureImage && (
                <div className={`relative overflow-hidden w-full flex-shrink-0 ${featured ? 'h-56' : 'h-44'}`}>
                    <Image
                        src={post.featureImage}
                        alt={post.title}
                        fill
                        sizes={featured ? '(max-width: 768px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                    />
                    {isGreen && (
                        <div className="absolute inset-0 bg-green-950/20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0" />
                    )}
                </div>
            )}

            <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className={`text-xs font-semibold uppercase tracking-wider ${isGreen ? 'text-green-300/90' : 'text-gray-300 bg-green-800 px-1.5 py-0.5 rounded-sm'
                            }`}>
                            {formatDate(post.date)}
                        </span>
                        {post.status === 'draft' && (
                            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300">
                                Draft
                            </span>
                        )}
                        {post.readingTime ? (
                            <span className={`text-xs font-semibold ${isGreen ? 'text-green-300/70' : 'text-gray-400'}`}>
                                {post.readingTime} min read
                            </span>
                        ) : null}
                    </div>

                    <h3 className={`${featured ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl'} font-bold mb-2 tracking-tight ${isGreen ? 'text-white' : 'text-green-800'
                        }`}>
                        {post.title}
                    </h3>

                    {post.subtitle && (
                        <p className={`text-sm font-semibold mb-2 ${isGreen ? 'text-green-200/90' : 'text-gray-700'}`}>
                            {post.subtitle}
                        </p>
                    )}

                    <p className={`text-sm leading-relaxed mb-4 line-clamp-3 ${isGreen ? 'text-green-100/90' : 'text-gray-600'}`}>
                        {post.excerpt}
                    </p>
                </div>

                <div>
                    {post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className={`inline-flex items-center text-[10px] px-2.5 py-0.5 rounded-full font-bold ${isGreen
                                        ? 'bg-green-950/65 text-green-200 border border-green-700/50'
                                        : 'bg-green-800 text-gray-300 border border-gray-200'
                                        }`}
                                >
                                    #{tag}
                                </span>
                            ))}
                            {post.tags.length > 3 && (
                                <span className={`text-[9px] self-center px-2 py-0.5 rounded-full font-bold ${isGreen ? 'bg-green-950/65 text-green-200' : 'bg-green-800 text-gray-300'
                                    }`}>
                                    +{post.tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="flex items-center justify-between border-t pt-4 border-dashed border-gray-300/30 mt-2">
                        <span className={`text-xs font-semibold ${isGreen ? 'text-green-300/80' : 'text-green-900'}`}>
                            Read entry
                        </span>
                        <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isGreen ? 'bg-white' : 'bg-black'
                            }`}>
                            <svg
                                className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isGreen ? 'text-green-800' : 'text-white'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ThoughtCard;
