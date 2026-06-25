"use client";

import React, { useState, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import type { PublicationList } from '@/data/pages/publications/publicationList';
import PublicationCard from './pageComponents/PublicationCard';

interface PublicationGridProps {
    publications: PublicationList[];
}

const PublicationGrid: React.FC<PublicationGridProps> = ({ publications }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedPublisher, setSelectedPublisher] = useState<string | null>(null);
    const [isPublisherDropdownOpen, setIsPublisherDropdownOpen] = useState<boolean>(false);
    const [publisherSearchQuery, setPublisherSearchQuery] = useState<string>('');

    const containerRef = useRef<HTMLDivElement>(null);

    // Extract unique publisher parents dynamically
    const allPublishers = useMemo(() => {
        const publishers = publications.map(p => p.journal.publicationsParent).filter(Boolean);
        return Array.from(new Set(publishers)).sort((a, b) => a.localeCompare(b));
    }, [publications]);

    // Filter publishers inside the dropdown
    const filteredPublishersList = useMemo(() => {
        return allPublishers.filter(pub => 
            pub.toLowerCase().includes(publisherSearchQuery.toLowerCase())
        );
    }, [allPublishers, publisherSearchQuery]);

    // Filter publications based on search query and selected publisher parent
    const filteredPublications = useMemo(() => {
        return publications.filter(pub => {
            const matchesSearch = searchQuery === '' || 
                pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                pub.authors.some(auth => auth.toLowerCase().includes(searchQuery.toLowerCase())) ||
                pub.journal.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesPublisher = !selectedPublisher || pub.journal.publicationsParent === selectedPublisher;
            
            return matchesSearch && matchesPublisher;
        });
    }, [publications, searchQuery, selectedPublisher]);

    // GSAP Animation triggered on filter or search state change
    useGSAP(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll('.publication-card-animate');
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
    }, { dependencies: [filteredPublications], scope: containerRef });

    return (
        <div ref={containerRef} className="w-full">
            {/* Filter controls row */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8 max-w-7xl mx-auto px-4 w-full">
                
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
                        placeholder="Search publications..."
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

                {/* Publisher Dropdown */}
                <div className="relative w-full sm:w-56 flex-shrink-0">
                    <button
                        onClick={() => setIsPublisherDropdownOpen(!isPublisherDropdownOpen)}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800/40 cursor-pointer shadow-sm"
                    >
                        <span className="truncate">
                            {selectedPublisher ? `Publisher: ${selectedPublisher}` : 'All Publishers'}
                        </span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isPublisherDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isPublisherDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => {
                                setIsPublisherDropdownOpen(false);
                                setPublisherSearchQuery('');
                            }} />
                            
                            <div className="absolute right-0 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-2.5 z-20 max-h-60 overflow-y-auto scroll-smooth flex flex-col gap-2">
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={publisherSearchQuery}
                                        onChange={(e) => setPublisherSearchQuery(e.target.value)}
                                        placeholder="Search publishers..."
                                        className="w-full pl-8 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[11px] focus:outline-none focus:ring-1.5 focus:ring-green-800/30 focus:border-green-800 transition-all text-gray-800"
                                        autoFocus
                                    />
                                    {publisherSearchQuery && (
                                        <button
                                            onClick={() => setPublisherSearchQuery('')}
                                            className="absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400 hover:text-gray-600 cursor-pointer"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                                <div className="flex flex-col py-0.5 max-h-40 overflow-y-auto">
                                    <button
                                        onClick={() => {
                                            setSelectedPublisher(null);
                                            setIsPublisherDropdownOpen(false);
                                            setPublisherSearchQuery('');
                                        }}
                                        className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer ${!selectedPublisher ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'}`}
                                    >
                                        <span>All Publishers</span>
                                        {!selectedPublisher && (
                                            <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    {filteredPublishersList.map((pub) => {
                                        const isSelected = selectedPublisher === pub;
                                        return (
                                            <button
                                                key={pub}
                                                onClick={() => {
                                                    setSelectedPublisher(pub);
                                                    setIsPublisherDropdownOpen(false);
                                                    setPublisherSearchQuery('');
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer ${isSelected ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'}`}
                                            >
                                                <span>{pub}</span>
                                                {isSelected && (
                                                    <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                    {filteredPublishersList.length === 0 && (
                                        <div className="text-gray-400 text-center py-3 text-[11px] font-semibold">
                                            No publishers found
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Sub-status Indicator */}
            <div className="flex justify-end max-w-7xl mx-auto px-4 mb-4">
                <div className="text-xs font-semibold text-gray-500 bg-white/70 px-3.5 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    Showing <span className="text-green-800 font-bold">{filteredPublications.length}</span> of {publications.length} Publications
                </div>
            </div>

            {/* Grid Publications Section */}
            {filteredPublications.length === 0 ? (
                <div className="text-center py-20 bg-white/50 border border-gray-200/50 rounded-2xl max-w-7xl mx-auto px-4 shadow-sm">
                    <div className="w-16 h-16 bg-gray-200/60 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">No matching publications</h4>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">We couldn&apos;t find any publications matching your search criteria. Try modifying your keywords or filters.</p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedPublisher(null);
                        }}
                        className="px-6 py-2.5 bg-green-800 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10 cursor-pointer"
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-6 px-4">
                    {filteredPublications.map((publication, index) => {
                        return (
                            <div 
                                key={`publication-${index}`} 
                                className="publication-card-animate h-full flex flex-col col-span-1"
                            >
                                <PublicationCard
                                    publication={publication}
                                    variant={index % 2 === 0 ? 'green' : 'white'}
                                />
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default PublicationGrid;
