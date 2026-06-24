import React from 'react';
import Image from 'next/image';
import { HashnodePost } from '@/app/interface/api/hashnode';

interface BlogCardProps {
    post: HashnodePost;
    variant: 'green' | 'white';
    span?: number;
    onClick?: () => void;
}

const BlogCard: React.FC<BlogCardProps> = ({
    post,
    variant,
    span = 1,
    onClick
}) => {
    const isGreen = variant === 'green';
    const isSpan2 = span === 2;
    const hasImage = !!post.coverImage?.url;

    const cardClasses = `
        h-full w-full min-h-[360px]
        relative group overflow-hidden rounded-xl border flex flex-col cursor-pointer 
        transition-all duration-300 ease-out hover:-translate-y-1.5
        ${isGreen 
            ? 'bg-gradient-to-br from-green-900 via-green-800 to-emerald-950 border-green-700/40 text-green-100 hover:shadow-2xl hover:shadow-green-900/35' 
            : 'bg-white/90 backdrop-blur-sm border-gray-200/80 text-gray-800 hover:shadow-2xl hover:shadow-gray-300/40 hover:border-gray-300'
        }
    `;

    const dateClasses = `text-xs font-semibold uppercase tracking-wider mb-2 ${isGreen ? 'text-green-300/90' : 'text-gray-500'}`;
    const titleClasses = `text-xl md:text-2xl font-bold mb-3 tracking-tight ${isGreen ? 'text-white' : 'text-gray-900 group-hover:text-black'}`;
    const descriptionClasses = `text-sm leading-relaxed mb-4 line-clamp-3 ${isGreen ? 'text-green-100/90' : 'text-gray-600'}`;
    const arrowClasses = `w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${isGreen ? 'bg-white' : 'bg-black'}`;
    const arrowIconClasses = `w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${isGreen ? 'text-green-800' : 'text-white'}`;

    const formattedDate = new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div className={cardClasses} onClick={onClick}>
            {/* Image Section */}
            {hasImage && (
                <div className={`relative overflow-hidden w-full flex-shrink-0 ${
                    isSpan2 
                        ? 'h-48 md:absolute md:top-0 md:left-0 md:bottom-0 md:h-full md:w-1/2' 
                        : 'h-48 w-full'
                }`}>
                    <Image 
                        src={post.coverImage!.url} 
                        alt={post.title} 
                        fill 
                        sizes={isSpan2 ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 25vw"}
                        className="object-cover transition-transform duration-500 group-hover:scale-105" 
                        unoptimized
                    />
                    {isGreen && (
                        <div className="absolute inset-0 bg-green-950/20 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-0" />
                    )}
                </div>
            )}

            {/* Content Section */}
            <div className={`p-6 flex flex-col justify-between flex-grow ${
                isSpan2 && hasImage ? 'md:ml-[50%] md:w-1/2 h-full' : 'w-full h-full'
            }`}>
                <div>
                    <div className="flex items-center justify-between mb-1">
                        <span className={dateClasses}>
                            {formattedDate}
                        </span>
                    </div>

                    <h3 className={titleClasses}>
                        {post.title}
                    </h3>

                    <p className={descriptionClasses}>
                        {post.brief}
                    </p>
                </div>

                <div>
                    {/* Tags Preview */}
                    {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2 mb-4">
                            {post.tags.slice(0, 3).map((tag, index) => (
                                <span 
                                    key={index} 
                                    className={`inline-flex items-center text-[10px] px-2.5 py-0.5 rounded-full font-bold transition-colors ${
                                        isGreen 
                                            ? 'bg-green-950/65 text-green-200 border border-green-700/50' 
                                            : 'bg-gray-100 text-gray-700 border border-gray-200 group-hover:bg-gray-200/60'
                                    }`}
                                >
                                    #{tag.name}
                                </span>
                            ))}
                            {post.tags.length > 3 && (
                                <span className={`text-[9px] self-center px-2 py-0.5 rounded-full font-bold ${
                                    isGreen ? 'bg-green-700/30 text-green-300' : 'bg-gray-200/50 text-gray-500'
                                }`}>
                                    +{post.tags.length - 3}
                                </span>
                            )}
                        </div>
                    )}

                    {/* Footer Section */}
                    <div className="flex items-center justify-between border-t pt-4 border-dashed border-gray-300/30 mt-2">
                        <span className={`text-xs font-semibold ${isGreen ? 'text-green-300/80' : 'text-gray-500'}`}>
                            Read Article
                        </span>
                        <div className={arrowClasses}>
                            <svg className={arrowIconClasses} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
