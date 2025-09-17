import React from 'react';
import Image from 'next/image';
import { HashnodePost } from '@/app/interface/api/hashnode';
import { FaExternalLinkAlt } from "react-icons/fa";

interface ArticleTileProps {
    post: HashnodePost;
    variant: 'hero' | 'side' | 'regular';
    className?: string;
}

const ArticleTile: React.FC<ArticleTileProps> = ({ post, variant, className = '' }) => {
    const handleClick = () => {
        window.open(post.url, '_blank', 'noopener,noreferrer');
    };

    if (variant === 'hero') {
        return (
            <div
                className={`relative cursor-pointer group ${className}`}
                onClick={handleClick}
            >
                <div className="relative w-full h-full bg-gray-700 rounded-md overflow-hidden">
                    {post.coverImage?.url && (
                        <Image
                            src={post.coverImage.url}
                            alt={post.title}
                            fill
                            sizes="(max-width:768px) 100vw, 66vw"
                            className="object-cover"
                        />
                    )}
                    {/* Text overlay */}
                    <div className="absolute inset-0 bg-black/70 right-0 p-6"></div>
                    <div className="absolute top-3 right-3 p-6">
                        <FaExternalLinkAlt className="text-white text-lg" />
                    </div>
                    <div className="absolute inset-0  flex flex-col justify-end p-6">
                        <div className="text-xs text-gray-300 mb-2">{new Date(post.publishedAt).toDateString()}</div>
                        <h3 className="font-semibold text-white text-xl md:text-3xl mb-2">{post.title}</h3>
                        <p className="text-sm text-gray-200 line-clamp-3">{post.brief}</p>
                        <div className="flex flex-wrap gap-1 mt-3">
                            {post.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">#{tag.name}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (variant === 'side') {
        return (
            <div
                className={`relative cursor-pointer group ${className}`}
                onClick={handleClick}
            >
                <div className="relative w-full h-full bg-gray-700 rounded-md overflow-hidden">
                    {post.coverImage?.url && (
                        <Image
                            src={post.coverImage.url}
                            alt={post.title}
                            fill
                            sizes="33vw"
                            className="object-cover"
                        />
                    )}
                    {/* Content overlay */}
                    <div className="absolute inset-0 bg-black/80 right-0 p-6"></div>
                    <div className="absolute top-3 right-3 p-6">
                        <FaExternalLinkAlt className="text-white text-lg" />
                    </div>
                    <div className="absolute inset-0  flex">
                        <div className="w-full p-4 flex flex-col justify-end">
                            <div className="text-xs text-gray-300 mb-1">{new Date(post.publishedAt).toDateString()}</div>
                            <h3 className="font-semibold text-white text-sm mb-2">{post.title}</h3>
                            <p className="text-xs text-gray-200 line-clamp-2 mb-2">{post.brief}</p>
                            <div className="flex flex-wrap gap-1">
                                {post.tags.slice(0, 2).map((tag, i) => (
                                    <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-white/20 text-white">#{tag.name}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* External link icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaExternalLinkAlt className="text-white text-lg" />
                    </div>
                </div>
            </div>
        );
    }

    // Regular variant (for remaining articles)
    return (
        <article className={`grid gap-3 group ${className}`}>
            <div
                className="relative w-full h-72 bg-gray-700 rounded-md overflow-hidden"
            >
                {post.coverImage?.url && (
                    <Image
                        src={post.coverImage.url}
                        alt={post.title}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        className="object-cover cursor-pointer"
                        onClick={handleClick}
                    />
                )}
                {/* External link icon */}
            </div>
            <div className="grid gap-2 relative">
                <div className="absolute top-3 right-3">
                    <FaExternalLinkAlt className="text-black text-lg cursor-pointer" />
                </div>
                <div className="text-xs text-gray-600">{new Date(post.publishedAt).toDateString()}</div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{post.brief}</p>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-500 text-gray-200">#{tag.name}</span>
                    ))}
                </div>
            </div>
        </article>
    );
};

export default ArticleTile;
