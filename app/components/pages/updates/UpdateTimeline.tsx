'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useLoading } from '@/app/contexts/LoadingContext';

interface GitHubCommit {
    sha: string;
    html_url: string;
    commit: {
        author: {
            name: string;
            date: string;
        };
        message: string;
    };
}

interface CommitCategory {
    type: 'feat' | 'fix' | 'refactor' | 'perf' | 'docs' | 'chore' | 'update';
    label: string;
    color: string;
}

const parseCommitType = (subject: string): CommitCategory => {
    const cleanSubject = subject.trim().toLowerCase();
    
    if (cleanSubject.startsWith('feat') || cleanSubject.startsWith('feature')) {
        return { type: 'feat', label: 'Feature', color: 'green' };
    }
    if (cleanSubject.startsWith('fix') || cleanSubject.startsWith('bugfix')) {
        return { type: 'fix', label: 'Bug Fix', color: 'rose' };
    }
    if (cleanSubject.startsWith('refactor')) {
        return { type: 'refactor', label: 'Refactor', color: 'purple' };
    }
    if (cleanSubject.startsWith('perf')) {
        return { type: 'perf', label: 'Performance', color: 'amber' };
    }
    if (cleanSubject.startsWith('docs')) {
        return { type: 'docs', label: 'Documentation', color: 'blue' };
    }
    if (cleanSubject.startsWith('chore') || cleanSubject.startsWith('build') || cleanSubject.startsWith('ci') || cleanSubject.startsWith('style') || cleanSubject.startsWith('test')) {
        return { type: 'chore', label: 'Maintenance', color: 'gray' };
    }
    
    return { type: 'update', label: 'Update', color: 'emerald' };
};

const cleanCommitSubject = (subject: string): string => {
    const match = subject.match(/^(feat|feature|fix|bugfix|refactor|perf|docs|chore|build|ci|style|test)(?:\([^\)]+\))?!?\s*:\s*(.*)$/i);
    if (match && match[2]) {
        const msg = match[2].trim();
        return msg.charAt(0).toUpperCase() + msg.slice(1);
    }
    return subject.charAt(0).toUpperCase() + subject.slice(1);
};

const splitCommitMessage = (message: string) => {
    const lines = message.split('\n');
    const rawSubject = lines[0];
    const subject = cleanCommitSubject(rawSubject);
    const body = lines.slice(1).filter(line => line.trim() !== '').join('\n');
    return { subject, body };
};

const getCategoryIcon = (type: string) => {
    switch (type) {
        case 'feat':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
            );
        case 'fix':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
            );
        case 'refactor':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H18" />
                </svg>
            );
        case 'perf':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            );
        case 'docs':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            );
        case 'chore':
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                </svg>
            );
        default:
            return (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            );
    }
};

const getBadgeStyles = (color: string) => {
    switch (color) {
        case 'green':
            return 'bg-green-50 text-green-800 border-green-200/50';
        case 'rose':
            return 'bg-rose-50 text-rose-800 border-rose-200/50';
        case 'purple':
            return 'bg-purple-50 text-purple-800 border-purple-200/50';
        case 'amber':
            return 'bg-amber-50 text-amber-800 border-amber-200/50';
        case 'blue':
            return 'bg-blue-50 text-blue-800 border-blue-200/50';
        case 'gray':
            return 'bg-gray-50 text-gray-800 border-gray-200/50';
        default:
            return 'bg-emerald-50 text-emerald-800 border-emerald-200/50';
    }
};

const getIconStyles = (color: string) => {
    switch (color) {
        case 'green':
            return 'bg-green-50 text-green-700 border-green-200/60';
        case 'rose':
            return 'bg-rose-50 text-rose-700 border-rose-200/60';
        case 'purple':
            return 'bg-purple-50 text-purple-700 border-purple-200/60';
        case 'amber':
            return 'bg-amber-50 text-amber-700 border-amber-200/60';
        case 'blue':
            return 'bg-blue-50 text-blue-700 border-blue-200/60';
        case 'gray':
            return 'bg-gray-50 text-gray-700 border-gray-200/60';
        default:
            return 'bg-emerald-50 text-emerald-700 border-emerald-200/60';
    }
};

const TimelineSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.8fr] gap-8 py-4 animate-pulse">
            {/* Sidebar Skeleton */}
            <div className="space-y-6">
                <div className="bg-white/50 border border-gray-200/50 rounded-2xl p-6 h-40" />
                <div className="bg-white/50 border border-gray-200/50 rounded-2xl p-6 h-64" />
            </div>
            
            {/* Feed Skeleton */}
            <div className="space-y-6">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white/50 border border-gray-200/50 rounded-2xl p-6 h-36" />
                ))}
            </div>
        </div>
    );
};

const UpdateTimeline = () => {
    const [commits, setCommits] = useState<GitHubCommit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const { addLoadingTask, removeLoadingTask } = useLoading();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    const fetchCommits = useCallback(async () => {
        const taskId = 'github-commits-api';
        try {
            setLoading(true);
            setError(null);
            addLoadingTask(taskId);

            const response = await fetch('https://api.github.com/repos/canaryGrapher/portfolio-v3/commits?per_page=45');
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('GitHub API rate limit exceeded. Please try again later.');
                }
                throw new Error(`Failed to fetch updates from GitHub (Status ${response.status})`);
            }

            const data: GitHubCommit[] = await response.json();
            
            // Filter out merge commits to keep the changelog concise and readable
            const filteredCommits = data.filter(
                (commit) => !commit.commit.message.startsWith('Merge ')
            );

            setCommits(filteredCommits);
        } catch (err: any) {
            console.error('Error fetching commits:', err);
            setError(err.message || 'An unexpected error occurred while fetching updates.');
        } finally {
            setLoading(false);
            removeLoadingTask(taskId);
        }
    }, [addLoadingTask, removeLoadingTask]);

    useEffect(() => {
        fetchCommits();
    }, [fetchCommits]);

    // Statistics calculations
    const stats = useMemo(() => {
        const counts = {
            all: commits.length,
            feat: 0,
            fix: 0,
            refactor: 0,
            chore: 0,
            other: 0,
        };

        commits.forEach(commit => {
            const category = parseCommitType(commit.commit.message);
            if (category.type === 'feat') counts.feat++;
            else if (category.type === 'fix') counts.fix++;
            else if (category.type === 'refactor') counts.refactor++;
            else if (category.type === 'chore') counts.chore++;
            else counts.other++;
        });

        return counts;
    }, [commits]);

    // Filter commits based on active filter
    const filteredCommits = useMemo(() => {
        if (activeFilter === 'all') return commits;
        return commits.filter(commit => {
            const category = parseCommitType(commit.commit.message);
            if (activeFilter === 'other') {
                return category.type !== 'feat' && category.type !== 'fix' && category.type !== 'refactor' && category.type !== 'chore';
            }
            return category.type === activeFilter;
        });
    }, [commits, activeFilter]);

    if (loading) {
        return <TimelineSkeleton />;
    }

    if (error) {
        return (
            <div className="flex justify-center items-center py-16">
                <div className="text-center max-w-md mx-auto p-6 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
                    <div className="text-4xl mb-4">⚠️</div>
                    <p className="text-red-600 mb-4 font-semibold text-sm">{error}</p>
                    <button
                        onClick={fetchCommits}
                        className="px-5 py-2.5 bg-green-800 text-white rounded-xl hover:bg-green-955 transition-colors border border-green-700/50 shadow-sm text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2.8fr] gap-8 items-start py-4">
            
            {/* Sidebar Section */}
            <div className="lg:sticky lg:top-28 space-y-6">
                
                {/* Repository Info Card */}
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-5 md:p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-green-50 text-green-800 border border-green-200/50 rounded-xl">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-sm font-extrabold text-gray-900 tracking-tight leading-none mb-1">portfolio-v3</h4>
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Public Repository</span>
                        </div>
                    </div>
                    
                    <p className="text-xs text-gray-500 font-semibold leading-relaxed mb-4">
                        Fetching live release streams and commits from the project codebase.
                    </p>
                    
                    <a 
                        href="https://github.com/canaryGrapher/portfolio-v3"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-2 bg-gray-900 hover:bg-black text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                        <span>GitHub Repo</span>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </a>
                </div>

                {/* Filter and Stats Card */}
                <div className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl p-5 md:p-6 shadow-sm">
                    <h4 className="text-xs font-extrabold text-gray-900 uppercase tracking-widest mb-4">Changelog Categories</h4>
                    <div className="flex flex-row lg:flex-col flex-wrap gap-2">
                        
                        {/* Filter Item All */}
                        <button 
                            onClick={() => setActiveFilter('all')}
                            className={`flex-grow lg:w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                activeFilter === 'all'
                                ? 'bg-green-800 text-white border-green-800 shadow-sm shadow-green-800/10'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            <span>All Logs</span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeFilter === 'all' ? 'bg-green-950 text-green-200' : 'bg-gray-100 text-gray-500'}`}>
                                {stats.all}
                            </span>
                        </button>

                        {/* Filter Item Features */}
                        <button 
                            onClick={() => setActiveFilter('feat')}
                            className={`flex-grow lg:w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                activeFilter === 'feat'
                                ? 'bg-green-800 text-white border-green-800 shadow-sm shadow-green-800/10'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                Features
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeFilter === 'feat' ? 'bg-green-950 text-green-200' : 'bg-gray-100 text-gray-500'}`}>
                                {stats.feat}
                            </span>
                        </button>

                        {/* Filter Item Fixes */}
                        <button 
                            onClick={() => setActiveFilter('fix')}
                            className={`flex-grow lg:w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                activeFilter === 'fix'
                                ? 'bg-green-800 text-white border-green-800 shadow-sm shadow-green-800/10'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                                Bug Fixes
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeFilter === 'fix' ? 'bg-green-950 text-green-200' : 'bg-gray-100 text-gray-500'}`}>
                                {stats.fix}
                            </span>
                        </button>

                        {/* Filter Item Refactor */}
                        <button 
                            onClick={() => setActiveFilter('refactor')}
                            className={`flex-grow lg:w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                activeFilter === 'refactor'
                                ? 'bg-green-800 text-white border-green-800 shadow-sm shadow-green-800/10'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                                Refactoring
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeFilter === 'refactor' ? 'bg-green-950 text-green-200' : 'bg-gray-100 text-gray-500'}`}>
                                {stats.refactor}
                            </span>
                        </button>

                        {/* Filter Item Maintenance */}
                        <button 
                            onClick={() => setActiveFilter('chore')}
                            className={`flex-grow lg:w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                activeFilter === 'chore'
                                ? 'bg-green-800 text-white border-green-800 shadow-sm shadow-green-800/10'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-gray-400"></span>
                                Maintenance
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeFilter === 'chore' ? 'bg-green-950 text-green-200' : 'bg-gray-100 text-gray-500'}`}>
                                {stats.chore}
                            </span>
                        </button>

                        {/* Filter Item Others */}
                        <button 
                            onClick={() => setActiveFilter('other')}
                            className={`flex-grow lg:w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                                activeFilter === 'other'
                                ? 'bg-green-800 text-white border-green-800 shadow-sm shadow-green-800/10'
                                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                            }`}
                        >
                            <span className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                                Others
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-[10px] ${activeFilter === 'other' ? 'bg-green-950 text-green-200' : 'bg-gray-100 text-gray-500'}`}>
                                {stats.other}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Feed Section */}
            <div className="space-y-5">
                
                {/* Empty State */}
                {filteredCommits.length === 0 && (
                    <div className="text-center py-16 bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-2xl max-w-4xl shadow-sm">
                        <div className="text-3xl mb-3">🔍</div>
                        <h4 className="text-base font-bold text-gray-800 mb-1">No updates found</h4>
                        <p className="text-gray-400 text-xs font-semibold">No commits matched the selected category filter.</p>
                    </div>
                )}

                {/* Commit Feed Cards */}
                {filteredCommits.map((commit) => {
                    const { subject, body } = splitCommitMessage(commit.commit.message);
                    const category = parseCommitType(commit.commit.message);
                    
                    return (
                        <div 
                            key={commit.sha} 
                            className="bg-white/90 backdrop-blur-sm border border-gray-200/80 hover:border-gray-300 rounded-2xl p-5 md:p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 flex items-start gap-4 md:gap-5 group"
                        >
                            {/* Left Side Category Icon Indicator */}
                            <div className={`flex-shrink-0 w-10 h-10 rounded-xl border flex items-center justify-center shadow-inner transition-colors duration-300 ${getIconStyles(category.color)}`}>
                                {getCategoryIcon(category.type)}
                            </div>

                            {/* Right Side Content Info */}
                            <div className="flex-grow min-w-0">
                                
                                {/* Top Header Info */}
                                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-2.5">
                                    {/* Date */}
                                    <span className="text-[11px] font-extrabold text-gray-400 uppercase tracking-wider">
                                        {formatDate(commit.commit.author.date)}
                                    </span>
                                    
                                    {/* Divider Dot */}
                                    <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300"></span>
                                    
                                    {/* Type Badge */}
                                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest border shadow-sm ${getBadgeStyles(category.color)}`}>
                                        {category.label}
                                    </span>
                                </div>

                                {/* Subject & Message Body */}
                                <h3 className="text-gray-900 text-sm sm:text-base md:text-lg font-bold leading-snug tracking-tight mb-2 group-hover:text-green-900 transition-colors duration-300">
                                    {subject}
                                </h3>
                                {body && (
                                    <p className="text-gray-500 text-xs sm:text-sm font-semibold whitespace-pre-line leading-relaxed mb-3 pr-2">
                                        {body}
                                    </p>
                                )}

                                {/* Bottom Info Row */}
                                <div className="flex items-center justify-between border-t border-dashed border-gray-200/60 pt-3 mt-1.5">
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Committed by</span>
                                        <span className="text-[10px] font-extrabold text-gray-700">{commit.commit.author.name}</span>
                                    </div>
                                    <a 
                                        href={commit.html_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold text-gray-500 hover:text-green-800 hover:bg-green-50 border border-gray-200 hover:border-green-200/60 transition-colors bg-white/50 shadow-sm"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                        </svg>
                                        <span>{commit.sha.substring(0, 7)}</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UpdateTimeline;