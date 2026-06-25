"use client";

import React, { useState, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import BlogCard from './BlogCard';
import { HashnodePost } from '@/app/interface/api/hashnode';

interface BlogsGridProps {
    posts: HashnodePost[];
}

const CATEGORIES = [
    { id: 'all', name: 'All Stories' },
    { id: 'tech_dev', name: 'Tech & Dev' },
    { id: 'systems_ai', name: 'Systems & AI' },
    { id: 'finance_culture', name: 'Finance & Culture' }
] as const;

const BlogsGrid: React.FC<BlogsGridProps> = ({ posts }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [categoryFilter, setCategoryFilter] = useState<'all' | 'tech_dev' | 'systems_ai' | 'finance_culture'>('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
    const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const filteredCategories = useMemo(() => {
        return CATEGORIES.filter(cat =>
            cat.name.toLowerCase().includes(categorySearchQuery.toLowerCase())
        );
    }, [categorySearchQuery]);

    const handleButtonClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        if (isLoading || isClicked) {
            return;
        }

        // Open a blank tab synchronously to prevent browser popup blockers from blocking the deferred redirection
        const newTab = window.open('about:blank', '_blank');

        setIsClicked(true);

        // Wait for the arrow slide animation (500ms) to complete before displaying spinner and opening the link
        setTimeout(() => {
            if (newTab) {
                newTab.location.href = "https://medium.com/@theprogrammersrant";
            }
            setIsLoading(true);
        }, 500);

        // Simulated load time (total 3.5 seconds) before resetting back to standard state
        setTimeout(() => {
            setIsClicked(false);
            setIsLoading(false);
        }, 3500);
    };

    const containerRef = useRef<HTMLDivElement>(null);

    // Extract all unique tags alphabetically
    const allTags = useMemo(() => {
        const tagsSet = new Set<string>();
        posts.forEach(post => {
            post.tags.forEach(t => {
                if (t.name) {
                    tagsSet.add(t.name);
                }
            });
        });
        return Array.from(tagsSet).sort((a, b) => a.localeCompare(b));
    }, [posts]);

    // Filter posts
    const filteredPosts = useMemo(() => {
        return posts.filter(post => {
            const matchesSearch = searchQuery === '' ||
                post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.brief.toLowerCase().includes(searchQuery.toLowerCase()) ||
                post.tags.some(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

            const matchesTag = !selectedTag ||
                post.tags.some(t => t.name === selectedTag);

            let matchesCategory = false;
            if (categoryFilter === 'all') {
                matchesCategory = true;
            } else {
                const postTags = post.tags.map(t => t.name.toLowerCase());
                if (categoryFilter === 'tech_dev') {
                    const techKeywords = ['web-development', 'api', 'express', 'mongodb', 'mongoose', 'nodejs', 'java', 'programming', 'data-structures', 'composite-api', 'java-dsa', 'java-programming', 'development', 'javascript', 'react', 'nextjs'];
                    matchesCategory = postTags.some(tag => techKeywords.includes(tag));
                } else if (categoryFilter === 'systems_ai') {
                    const systemsKeywords = ['ai', 'ai-on-device', 'artificial-intelligence', 'operating-systems', 'computer-science', 'cloud-computing', 'edge-computing', 'computer-networking', 'networking', 'network-security', 'cybersecurity', 'zero-trust-security', 'security'];
                    matchesCategory = postTags.some(tag => systemsKeywords.includes(tag));
                } else if (categoryFilter === 'finance_culture') {
                    const financeKeywords = ['blockchain', 'cbdc', 'cryptocurrency', 'finance', 'fintech', 'banking-technology', 'fraud-prevention', 'corporate', 'soft-skills'];
                    matchesCategory = postTags.some(tag => financeKeywords.includes(tag));
                }
            }

            return matchesSearch && matchesTag && matchesCategory;
        });
    }, [posts, searchQuery, selectedTag, categoryFilter]);

    // Bento Span pattern optimized for the current number of posts
    const getBentoSpan = (index: number, totalCount: number): number => {
        // Hand-crafted optimal grid patterns to ensure rows are perfectly filled without awkward gaps
        const patterns: { [key: number]: number[] } = {
            1: [2],
            2: [2, 1],
            3: [1, 1, 1],
            4: [2, 1, 1, 2],
            5: [2, 1, 1, 1, 1],
            6: [2, 1, 1, 2, 2, 1],
            7: [2, 1, 1, 1, 1, 1, 2],
            8: [2, 1, 1, 2, 2, 1, 1, 2],
            9: [2, 1, 1, 1, 1, 1, 2, 1, 2],
            10: [2, 1, 1, 2, 2, 1, 1, 2, 2, 1], // Alternating zig-zag pattern for exactly 10 posts
        };

        const pattern = patterns[totalCount];
        if (pattern && index < pattern.length) {
            return pattern[index];
        }

        // Fallback repeating pattern for larger lists
        const fallbackPattern = [2, 1, 1, 1, 1, 1, 2];
        return fallbackPattern[index % fallbackPattern.length];
    };

    // GSAP Animation triggered on filter or search state change
    useGSAP(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll('.blog-card-animate');
        if (cards.length > 0) {
            gsap.fromTo(cards,
                { opacity: 0, y: 20, scale: 0.98 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    stagger: 0.04,
                    ease: 'power2.out',
                    overwrite: 'auto'
                }
            );
        }
    }, { dependencies: [filteredPosts], scope: containerRef });

    const handleCardClick = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div ref={containerRef} className="w-full">
            {/* Filter controls row */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8 max-w-7xl mx-auto px-4 w-full">

                {/* Category Dropdown */}
                <div className="relative w-full sm:w-56 flex-shrink-0">
                    <button
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800/40 cursor-pointer shadow-sm"
                    >
                        <span className="truncate">
                            {CATEGORIES.find(c => c.id === categoryFilter)?.name || 'All Stories'}
                        </span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isCategoryDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => {
                                setIsCategoryDropdownOpen(false);
                                setCategorySearchQuery('');
                            }} />

                            <div className="absolute left-0 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-2.5 z-20 max-h-60 overflow-y-auto scroll-smooth flex flex-col gap-2">
                                {/* Search input inside dropdown */}
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={categorySearchQuery}
                                        onChange={(e) => setCategorySearchQuery(e.target.value)}
                                        placeholder="Search categories..."
                                        className="w-full pl-8 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[11px] focus:outline-none focus:ring-1.5 focus:ring-green-800/30 focus:border-green-800 transition-all text-gray-800"
                                        autoFocus
                                    />
                                    {categorySearchQuery && (
                                        <button
                                            onClick={() => setCategorySearchQuery('')}
                                            className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-col py-0.5 max-h-40 overflow-y-auto">
                                    {filteredCategories.map((cat) => {
                                        const isSelected = categoryFilter === cat.id;
                                        return (
                                            <button
                                                key={cat.id}
                                                onClick={() => {
                                                    setCategoryFilter(cat.id);
                                                    setSelectedTag(null);
                                                    setIsCategoryDropdownOpen(false);
                                                    setCategorySearchQuery('');
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer ${isSelected ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'}`}
                                            >
                                                <span>{cat.name}</span>
                                                {isSelected && (
                                                    <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                    {filteredCategories.length === 0 && (
                                        <div className="text-gray-400 text-center py-3 text-[11px] font-semibold">
                                            No categories found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Search Input */}
                <div className="relative w-full sm:flex-1">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search articles..."
                        className="w-full pl-9 pr-8 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-green-800/40 focus:border-green-800 transition-all text-gray-800 shadow-sm"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 flex items-center pr-2.5 text-gray-400 hover:text-gray-600 cursor-pointer"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    )}
                </div>

                {/* Tag Dropdown */}
                <div className="relative w-full sm:w-48 flex-shrink-0">
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800/40 cursor-pointer shadow-sm"
                    >
                        <span className="truncate">
                            {selectedTag ? `Tag: #${selectedTag}` : 'All Tags'}
                        </span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />

                            <div className="absolute right-0 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-20 max-h-60 overflow-y-auto scroll-smooth">
                                <button
                                    onClick={() => {
                                        setSelectedTag(null);
                                        setIsDropdownOpen(false);
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 flex items-center justify-between cursor-pointer ${!selectedTag ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'
                                        }`}
                                >
                                    <span>All Tags</span>
                                    {!selectedTag && (
                                        <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </button>
                                {allTags.map((tag) => {
                                    const isSelected = selectedTag === tag;
                                    return (
                                        <button
                                            key={tag}
                                            onClick={() => {
                                                setSelectedTag(isSelected ? null : tag);
                                                setIsDropdownOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 flex items-center justify-between cursor-pointer ${isSelected ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'
                                                }`}
                                        >
                                            <span className="truncate">#{tag}</span>
                                            {isSelected && (
                                                <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Sub-status Indicator */}
            <div className="flex justify-end max-w-7xl mx-auto px-4 mb-4">
                <div className="text-xs font-semibold text-gray-500 bg-white/70 px-3.5 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    Showing <span className="text-green-800 font-bold">{filteredPosts.length}</span> of {posts.length} Articles
                </div>
            </div>

            {/* Bento Grid Blogs Section */}
            {filteredPosts.length === 0 ? (
                <div className="text-center py-20 bg-white/50 border border-gray-200/50 rounded-2xl max-w-7xl mx-auto px-4 shadow-sm">
                    <div className="w-16 h-16 bg-gray-200/60 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">No matching articles</h4>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">We couldn&apos;t find any articles matching your search criteria. Try modifying your keywords or filters.</p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedTag(null);
                            setCategoryFilter('all');
                        }}
                        className="px-6 py-2.5 bg-green-800 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10 cursor-pointer"
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-6 px-4 mb-12 md:mb-16">
                    {filteredPosts.map((post, index) => {
                        const span = getBentoSpan(index, filteredPosts.length);
                        return (
                            <div
                                key={`post-${index}`}
                                className={`blog-card-animate h-full flex flex-col col-span-1 md:${span === 2 ? 'col-span-2' : 'col-span-1'}`}
                            >
                                <BlogCard
                                    post={post}
                                    variant={index % 2 === 0 ? 'green' : 'white'}
                                    span={span}
                                    onClick={() => handleCardClick(post.url)}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Centered Read More Button */}
            <div className="flex justify-center pt-16 md:pt-24 pb-20 md:pb-28">
                <a
                    href="https://medium.com/feed/@theprogrammersrant"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleButtonClick}
                    className={`group relative inline-flex items-center justify-start bg-white border border-gray-200/80 rounded-full shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-green-950/10 hover:border-green-800/30 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer overflow-hidden ${isLoading ? 'pointer-events-none' : ''
                        }`}
                    style={{ height: '56px' }}
                >
                    {/* Normal State Content */}
                    <div className={`flex items-center gap-3 pl-2.5 pr-1 transition-all duration-500 ${isLoading ? 'opacity-0 scale-95 pointer-events-none w-0 overflow-hidden' : 'opacity-100'
                        }`}>
                        {/* Circle Badge on the Left */}
                        <div className={`flex items-center justify-center w-10 h-10 rounded-full bg-green-800 text-white transition-all duration-500 shadow-sm shadow-green-950/20 flex-shrink-0 ${isClicked ? 'translate-x-[110px] opacity-0 scale-90' : 'group-hover:scale-105'
                            }`}>
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                        {/* Text on the Right */}
                        <span className={`flex flex-col text-gray-700 font-extrabold text-sm tracking-wide transition-all duration-500 whitespace-nowrap flex-shrink-0 ${isClicked ? '-translate-x-8 opacity-0' : 'group-hover:text-green-800'
                            }`}>
                            <span>Read more</span>
                            <span className='text-xs font-normal text-green-900'>on medium.com</span>
                        </span>
                    </div>

                    {/* Loading State Content */}
                    <div className={`flex items-center justify-center gap-2.5 px-6 transition-all duration-500 ${isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none w-0 overflow-hidden'
                        }`}>
                        {/* Spinner */}
                        <svg className="animate-spin h-5 w-5 text-green-800 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-green-800 font-extrabold text-sm tracking-wide animate-pulse whitespace-nowrap flex-shrink-0">
                            Opening feed...
                        </span>
                    </div>
                </a>
            </div>
        </div>
    );
};

export default BlogsGrid;
