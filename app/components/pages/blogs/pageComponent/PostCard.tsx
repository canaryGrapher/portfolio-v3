import React from 'react';
import { HashnodePost } from '@/app/interface/api/hashnode';
import Image from 'next/image';


// Component: Post card
const PostCard: React.FC<{ post: HashnodePost, className?: string }> = ({ post, className }) => {
    return (
        <article className={`grid gap-1 md:gap-3 ${className}`}>
            <div className="relative w-full h-32 md:h-48 bg-gray-700 rounded-md overflow-hidden">
                {post.coverImage?.url && (
                    <Image src={post.coverImage.url} alt={post.title} fill sizes="(max-width:768px) 100vw, 33vw" className="object-cover" />
                )}
            </div>
            <div className="grid gap-2">
                <div className="text-xs text-gray-600">{new Date(post.publishedAt).toDateString()}</div>
                <h3 className="font-semibold">{post.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-3">{post.brief}</p>
                <div className="flex flex-wrap gap-2">
                    {post.tags.map((t, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 rounded-full bg-gray-500 text-gray-200">#{t.name}</span>
                    ))}
                </div>
                <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-gray-300 underline"
                >
                    Read article
                </a>
            </div>
        </article>
    );
};

export default PostCard;