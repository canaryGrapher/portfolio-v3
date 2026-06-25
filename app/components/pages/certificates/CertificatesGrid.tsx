"use client";

import React, { useState, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import CertificateCard from './pageComponents/CertificateCard';
import { CertificateData } from '@/data/pages/certificates/certificateData';

interface CertificatesGridProps {
    certificates: CertificateData[];
}

const CertificatesGrid: React.FC<CertificatesGridProps> = ({ certificates }) => {
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
    const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState<boolean>(false);
    const [isProviderDropdownOpen, setIsProviderDropdownOpen] = useState<boolean>(false);
    const [categorySearchQuery, setCategorySearchQuery] = useState<string>('');
    const [providerSearchQuery, setProviderSearchQuery] = useState<string>('');

    const containerRef = useRef<HTMLDivElement>(null);

    // Extract all unique categories dynamically
    const allCategories = useMemo(() => {
        const cats = certificates.map(c => c.category);
        return Array.from(new Set(cats)).sort((a, b) => a.localeCompare(b));
    }, [certificates]);

    // Extract all unique providers dynamically
    const allProviders = useMemo(() => {
        const providers = certificates.map(c => c.providers.name);
        return Array.from(new Set(providers)).sort((a, b) => a.localeCompare(b));
    }, [certificates]);

    // Filter categories inside the dropdown based on search
    const filteredCategoriesList = useMemo(() => {
        return allCategories.filter(cat => 
            cat.toLowerCase().includes(categorySearchQuery.toLowerCase())
        );
    }, [allCategories, categorySearchQuery]);

    // Filter providers inside the dropdown based on search
    const filteredProvidersList = useMemo(() => {
        return allProviders.filter(prov => 
            prov.toLowerCase().includes(providerSearchQuery.toLowerCase())
        );
    }, [allProviders, providerSearchQuery]);

    // Filter certificates
    const filteredCertificates = useMemo(() => {
        return certificates.filter(cert => {
            const matchesSearch = searchQuery === '' || 
                cert.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cert.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                cert.providers.name.toLowerCase().includes(searchQuery.toLowerCase());
            
            const matchesCategory = !selectedCategory || cert.category === selectedCategory;
            const matchesProvider = !selectedProvider || cert.providers.name === selectedProvider;
            
            return matchesSearch && matchesCategory && matchesProvider;
        });
    }, [certificates, searchQuery, selectedCategory, selectedProvider]);


    // GSAP Animation triggered on filter or search state change
    useGSAP(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll('.certificate-card-animate');
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
    }, { dependencies: [filteredCertificates], scope: containerRef });

    return (
        <div ref={containerRef} className="w-full">
            {/* Filter controls row */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between mb-8 max-w-7xl mx-auto px-4 w-full">
                
                {/* Category Dropdown */}
                <div className="relative w-full sm:w-56 flex-shrink-0">
                    <button
                        onClick={() => {
                            setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                            setIsProviderDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800/40 cursor-pointer shadow-sm"
                    >
                        <span className="truncate">
                            {selectedCategory ? `Category: ${selectedCategory}` : 'All Categories'}
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
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(null);
                                            setIsCategoryDropdownOpen(false);
                                            setCategorySearchQuery('');
                                        }}
                                        className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer ${!selectedCategory ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'}`}
                                    >
                                        <span>All Categories</span>
                                        {!selectedCategory && (
                                            <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    {filteredCategoriesList.map((cat) => {
                                        const isSelected = selectedCategory === cat;
                                        return (
                                            <button
                                                key={cat}
                                                onClick={() => {
                                                    setSelectedCategory(cat);
                                                    setIsCategoryDropdownOpen(false);
                                                    setCategorySearchQuery('');
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer ${isSelected ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'}`}
                                            >
                                                <span>{cat}</span>
                                                {isSelected && (
                                                    <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                    {filteredCategoriesList.length === 0 && (
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
                        placeholder="Search certificates..."
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

                {/* Provider Dropdown */}
                <div className="relative w-full sm:w-56 flex-shrink-0">
                    <button
                        onClick={() => {
                            setIsProviderDropdownOpen(!isProviderDropdownOpen);
                            setIsCategoryDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800/40 cursor-pointer shadow-sm"
                    >
                        <span className="truncate">
                            {selectedProvider ? `Provider: ${selectedProvider}` : 'All Providers'}
                        </span>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isProviderDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {isProviderDropdownOpen && (
                        <>
                            <div className="fixed inset-0 z-10" onClick={() => {
                                setIsProviderDropdownOpen(false);
                                setProviderSearchQuery('');
                            }} />
                            
                            <div className="absolute right-0 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg p-2.5 z-20 max-h-60 overflow-y-auto scroll-smooth flex flex-col gap-2">
                                {/* Search input inside dropdown */}
                                <div className="relative">
                                    <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                                        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                        </svg>
                                    </span>
                                    <input
                                        type="text"
                                        value={providerSearchQuery}
                                        onChange={(e) => setProviderSearchQuery(e.target.value)}
                                        placeholder="Search providers..."
                                        className="w-full pl-8 pr-7 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-[11px] focus:outline-none focus:ring-1.5 focus:ring-green-800/30 focus:border-green-800 transition-all text-gray-800"
                                        autoFocus
                                    />
                                    {providerSearchQuery && (
                                        <button
                                            onClick={() => setProviderSearchQuery('')}
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
                                            setSelectedProvider(null);
                                            setIsProviderDropdownOpen(false);
                                            setProviderSearchQuery('');
                                        }}
                                        className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer ${!selectedProvider ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'}`}
                                    >
                                        <span>All Providers</span>
                                        {!selectedProvider && (
                                            <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    {filteredProvidersList.map((prov) => {
                                        const isSelected = selectedProvider === prov;
                                        return (
                                            <button
                                                key={prov}
                                                onClick={() => {
                                                    setSelectedProvider(prov);
                                                    setIsProviderDropdownOpen(false);
                                                    setProviderSearchQuery('');
                                                }}
                                                className={`w-full text-left px-3 py-2 text-xs font-semibold hover:bg-gray-50 rounded-lg flex items-center justify-between cursor-pointer ${isSelected ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'}`}
                                            >
                                                <span>{prov}</span>
                                                {isSelected && (
                                                    <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        );
                                    })}
                                    {filteredProvidersList.length === 0 && (
                                        <div className="text-gray-400 text-center py-3 text-[11px] font-semibold">
                                            No providers found
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
                    Showing <span className="text-green-800 font-bold">{filteredCertificates.length}</span> of {certificates.length} Certificates
                </div>
            </div>

            {/* Bento Grid Certificates Section */}
            {filteredCertificates.length === 0 ? (
                <div className="text-center py-20 bg-white/50 border border-gray-200/50 rounded-2xl max-w-7xl mx-auto px-4 shadow-sm">
                    <div className="w-16 h-16 bg-gray-200/60 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">No matching certificates</h4>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">We couldn&apos;t find any certificates matching your search criteria. Try modifying your keywords or filters.</p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedCategory(null);
                            setSelectedProvider(null);
                        }}
                        className="px-6 py-2.5 bg-green-800 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10 cursor-pointer"
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : (
                /* Grid Layout */
                <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-6 px-4">
                    {filteredCertificates.map((certificate, index) => {
                        return (
                            <div 
                                key={`certificate-${index}`} 
                                className="certificate-card-animate h-full flex flex-col col-span-1"
                            >
                                <CertificateCard
                                    certificate={certificate}
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

export default CertificatesGrid;
