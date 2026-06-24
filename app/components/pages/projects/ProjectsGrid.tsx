"use client";

import React, { useState, useMemo, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ProjectCard from './ProjectCard';
import ProjectModal from './ProjectModal';
import { Project, ProjectsGridProps } from './types';

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects }) => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedTech, setSelectedTech] = useState<string | null>(null);
    const [workFilter, setWorkFilter] = useState<'all' | 'professional' | 'personal'>('all');
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

    const containerRef = useRef<HTMLDivElement>(null);

    // Format date range helper
    const formatDateRange = (startDate: string, endDate: string): string => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const startMonth = start.toLocaleDateString('en-US', { month: 'short' });
        const startYear = start.getFullYear().toString().slice(-2);
        const endMonth = end.toLocaleDateString('en-US', { month: 'short' });
        const endYear = end.getFullYear().toString().slice(-2);

        return `${startMonth} ${startYear} - ${endMonth} ${endYear}`;
    };

    // Extract all unique technologies from data for the filtering system
    const allTechs = useMemo(() => {
        const techs = projects.flatMap(p => p.technologies || []);
        const uniqueMap = new Map<string, typeof techs[0]>();
        techs.forEach(t => {
            if (t && t.name) {
                uniqueMap.set(t.name, t);
            }
        });
        return Array.from(uniqueMap.values()).sort((a, b) => a.name.localeCompare(b.name));
    }, [projects]);

    // Filter projects based on search query, selected technology, and work filter (personal vs. professional)
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesSearch = searchQuery === '' || 
                project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.technologies.some(t => t && t.name && t.name.toLowerCase().includes(searchQuery.toLowerCase()));
            
            const matchesTech = !selectedTech || 
                project.technologies.some(t => t && t.name === selectedTech);

            const matchesWork = workFilter === 'all' ||
                (workFilter === 'professional' && project.associatedWith !== null) ||
                (workFilter === 'personal' && project.associatedWith === null);
                
            return matchesSearch && matchesTech && matchesWork;
        });
    }, [projects, searchQuery, selectedTech, workFilter]);

    // Bento Span Logic: repeating row pattern that sums to rows of 3 columns
    const getBentoSpan = (index: number): number => {
        const pattern = [2, 1, 1, 1, 1, 1, 2];
        return pattern[index % pattern.length];
    };

    // GSAP Animation triggered on filter or search state change
    useGSAP(() => {
        if (!containerRef.current) return;
        const cards = containerRef.current.querySelectorAll('.project-card-animate');
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
    }, { dependencies: [filteredProjects], scope: containerRef });

    return (
        <div ref={containerRef} className="w-full">
            {/* Filter controls row */}
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8 max-w-7xl mx-auto px-4">
                
                {/* Segmented Work Filters */}
                <div className="flex bg-white/70 p-1.5 rounded-xl border border-gray-200/80 shadow-sm w-full md:w-auto flex-shrink-0">
                    <button
                        onClick={() => {
                            setWorkFilter('all');
                            setSelectedTech(null);
                        }}
                        className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                            workFilter === 'all'
                                ? 'bg-green-800 text-white shadow-md shadow-green-950/10'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                        }`}
                    >
                        All Work
                    </button>
                    <button
                        onClick={() => {
                            setWorkFilter('professional');
                            setSelectedTech(null);
                        }}
                        className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                            workFilter === 'professional'
                                ? 'bg-green-800 text-white shadow-md shadow-green-950/10'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                        }`}
                    >
                        Professional
                    </button>
                    <button
                        onClick={() => {
                            setWorkFilter('personal');
                            setSelectedTech(null);
                        }}
                        className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs font-extrabold tracking-wide transition-all cursor-pointer ${
                            workFilter === 'personal'
                                ? 'bg-green-800 text-white shadow-md shadow-green-950/10'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/50'
                        }`}
                    >
                        Personal
                    </button>
                </div>

                {/* Search and Technology Selector */}
                <div className="flex flex-col sm:flex-row w-full md:flex-1 md:ml-6 gap-3 items-center">
                    
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
                            placeholder="Search projects..."
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

                    {/* Technology Dropdown */}
                    <div className="relative w-full sm:w-48 flex-shrink-0">
                        <button
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-between hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-800/40 cursor-pointer shadow-sm"
                        >
                            <span className="truncate">
                                {selectedTech ? `Tech: ${selectedTech}` : 'All Technologies'}
                            </span>
                            <svg className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {isDropdownOpen && (
                            <>
                                {/* Backdrop to close dropdown */}
                                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                                
                                {/* Dropdown Menu */}
                                <div className="absolute right-0 mt-1.5 w-full bg-white border border-gray-200 rounded-xl shadow-lg py-1.5 z-20 max-h-60 overflow-y-auto scroll-smooth">
                                    <button
                                        onClick={() => {
                                            setSelectedTech(null);
                                            setIsDropdownOpen(false);
                                        }}
                                        className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 flex items-center justify-between cursor-pointer ${
                                            !selectedTech ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'
                                        }`}
                                    >
                                        <span>All Technologies</span>
                                        {!selectedTech && (
                                            <svg className="w-3.5 h-3.5 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </button>
                                    {allTechs.map((tech) => {
                                        const isSelected = selectedTech === tech.name;
                                        return (
                                            <button
                                                key={tech.name}
                                                onClick={() => {
                                                    setSelectedTech(isSelected ? null : tech.name);
                                                    setIsDropdownOpen(false);
                                                }}
                                                className={`w-full text-left px-4 py-2.5 text-xs font-semibold hover:bg-gray-50 flex items-center justify-between cursor-pointer ${
                                                    isSelected ? 'text-green-800 bg-green-50/50 font-bold' : 'text-gray-700'
                                                }`}
                                            >
                                                <div className="flex items-center gap-2 truncate">
                                                    {tech.icon && (
                                                        <span className="relative w-3.5 h-3.5 flex-shrink-0">
                                                            <Image src={tech.icon} alt="" fill sizes="14px" className="object-contain" unoptimized />
                                                        </span>
                                                    )}
                                                    <span className="truncate">{tech.name}</span>
                                                </div>
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
            </div>

            {/* Sub-status Indicator */}
            <div className="flex justify-end max-w-7xl mx-auto px-4 mb-4">
                <div className="text-xs font-semibold text-gray-500 bg-white/70 px-3.5 py-1.5 rounded-lg border border-gray-200 shadow-sm">
                    Showing <span className="text-green-800 font-bold">{filteredProjects.length}</span> of {projects.length} Projects
                </div>
            </div>

            {/* Bento Grid Projects Section */}
            {filteredProjects.length === 0 ? (
                <div className="text-center py-20 bg-white/50 border border-gray-200/50 rounded-2xl max-w-7xl mx-auto px-4 shadow-sm">
                    <div className="w-16 h-16 bg-gray-200/60 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    </div>
                    <h4 className="text-xl font-bold text-gray-800 mb-1">No matching projects</h4>
                    <p className="text-gray-500 mb-6 max-w-md mx-auto text-sm">We couldn&apos;t find any projects matching your search criteria. Try modifying your keywords or filters.</p>
                    <button
                        onClick={() => {
                            setSearchQuery('');
                            setSelectedTech(null);
                            setWorkFilter('all');
                        }}
                        className="px-6 py-2.5 bg-green-800 text-white font-semibold text-sm rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-900/10 cursor-pointer"
                    >
                        Reset All Filters
                    </button>
                </div>
            ) : (
                /* Bento Grid Layout */
                <div className="grid grid-cols-1 md:grid-cols-3 max-w-7xl mx-auto gap-6 px-4">
                    {filteredProjects.map((project, index) => {
                        const span = getBentoSpan(index);
                        return (
                            <div 
                                key={`project-${project.name}`} 
                                className={`project-card-animate h-full flex flex-col col-span-1 md:${span === 2 ? 'col-span-2' : 'col-span-1'}`}
                            >
                                <ProjectCard
                                    project={project}
                                    variant={index % 2 === 0 ? 'green' : 'white'}
                                    span={span}
                                    formatDateRange={formatDateRange}
                                    onClick={() => setSelectedProject(project)}
                                />
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Project Popup Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    formatDateRange={formatDateRange}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
};

export default ProjectsGrid;
