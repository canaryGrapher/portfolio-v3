'use client';

import { useEffect, useState, useCallback } from 'react';
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

const splitCommitMessage = (message: string) => {
    const lines = message.split('\n');
    const subject = lines[0];
    const body = lines.slice(1).filter(line => line.trim() !== '').join('\n');
    return { subject, body };
};

const TimelineSkeleton = () => {
    return (
        <div className="relative border-l-2 border-emerald-800/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 py-4 animate-pulse">
            {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="relative">
                    {/* Skeleton Node dot */}
                    <span className="absolute -left-[41px] md:-left-[50px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 border-2 border-gray-200"></span>
                    
                    <div className="flex flex-col space-y-3">
                        {/* Date badge skeleton */}
                        <div className="h-6 w-32 bg-gray-200 rounded-full" />
                        
                        {/* Card skeleton */}
                        <div className="bg-white/50 border border-gray-200/50 rounded-xl p-5 md:p-6 max-w-4xl h-24" />
                    </div>
                </div>
            ))}
        </div>
    );
};

const UpdateTimeline = () => {
    const [commits, setCommits] = useState<GitHubCommit[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { addLoadingTask, removeLoadingTask } = useLoading();

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${day} ${month}, ${year}`;
    };

    const fetchCommits = useCallback(async () => {
        const taskId = 'github-commits-api';
        try {
            setLoading(true);
            setError(null);
            addLoadingTask(taskId);

            const response = await fetch('https://api.github.com/repos/canaryGrapher/portfolio-v3/commits?per_page=35');
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

    if (commits.length === 0) {
        return (
            <div className="flex justify-center items-center py-16">
                <div className="text-center max-w-md mx-auto p-8 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
                    <div className="text-4xl mb-4">🔍</div>
                    <p className="text-gray-500 font-semibold">No recent updates found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative border-l-2 border-emerald-800/10 ml-4 md:ml-8 pl-8 md:pl-12 space-y-12 py-4">
            {commits.map((commit, index) => {
                const { subject, body } = splitCommitMessage(commit.commit.message);
                
                return (
                    <div key={commit.sha} className="relative group">
                        {/* Timeline Node dot */}
                        <span className="absolute -left-[41px] md:-left-[50px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-green-600 shadow-sm group-hover:border-green-800 transition-colors duration-300">
                            <span className="h-2 w-2 rounded-full bg-green-600 group-hover:bg-green-800 transition-colors duration-300"></span>
                        </span>
                        
                        {/* Content */}
                        <div className="flex flex-col space-y-3">
                            {/* Date badge */}
                            <div>
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-green-50/80 text-green-800 border border-green-200/50 shadow-sm uppercase tracking-wider">
                                    {formatDate(commit.commit.author.date)}
                                </span>
                            </div>
                            
                            {/* Detail card */}
                            <div className="bg-white/80 backdrop-blur-sm border border-gray-200/80 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 max-w-4xl">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                                    <div className="flex-grow">
                                        <h3 className="text-gray-800 text-sm sm:text-base md:text-lg font-semibold leading-snug">
                                            {subject}
                                        </h3>
                                        {body && (
                                            <p className="text-gray-500 text-xs sm:text-sm mt-2 whitespace-pre-line leading-relaxed">
                                                {body}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex-shrink-0 flex items-center gap-2">
                                        <a 
                                            href={commit.html_url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-bold text-gray-500 hover:text-green-800 hover:bg-green-50 border border-gray-200 hover:border-green-200/60 transition-colors bg-white/50"
                                        >
                                            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                            </svg>
                                            <span>{commit.sha.substring(0, 7)}</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UpdateTimeline;