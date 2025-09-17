import React, { useEffect, useState } from 'react';
import { HashnodePost } from '@/app/interface/api/hashnode';
import ArticleTile from './pageComponent/ArticleTile';
import UserInfo from './pageComponent/UserInfo';

// Component: Grid of posts following the provided layout
const PostsGrid: React.FC<{ posts: HashnodePost[] }> = ({ posts }) => {
    // Map posts to specific positions to mirror the wireframe
    const first = posts[0];
    const second = posts[1];
    const third = posts[2];
    const rest = posts.slice(3);

    return (
        <div className="grid gap-6">
            {/* Hero section with first article spanning 2 rows and 2 columns */}
            <div className="hidden md:grid grid-cols-3 gap-6 min-h-[600px]">
                {/* First article spans 2 columns and 2 rows */}
                {first && (
                    <ArticleTile
                        post={first}
                        variant="hero"
                        className="col-span-3 md:col-span-2 md:row-span-2 h-[400px] md:h-full"
                    />
                )}

                {/* Right column with two stacked articles - only show on desktop */}
                <div className="hidden md:grid gap-6 col-start-3 row-start-1 row-span-2">
                    {second && (
                        <ArticleTile
                            post={second}
                            variant="side"
                            className="h-full"
                        />
                    )}
                    {third && (
                        <ArticleTile
                            post={third}
                            variant="side"
                            className="h-full"
                        />
                    )}
                </div>
            </div>

            {/* Mobile: Show second and third articles as regular cards */}
            <div className="md:hidden grid grid-cols-1 gap-6">
                {first && <ArticleTile post={first} variant="regular" />}
                {second && <ArticleTile post={second} variant="regular" />}
                {third && <ArticleTile post={third} variant="regular" />}
            </div>

            {/* Remaining posts in 3-column grid */}
            {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {rest.map((post, idx) => (
                        <ArticleTile key={idx} post={post} variant="regular" />
                    ))}
                </div>
            )}

            {/* Bottom User Info - populated from Hashnode user profile */}
            <UserInfo />
        </div>
    );
};

export default PostsGrid;