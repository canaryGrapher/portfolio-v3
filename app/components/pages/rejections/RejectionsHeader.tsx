import React from 'react';

const RejectionsHeader = () => {
    return (
        <div className="pt-16 pb-10">
            {/* Live Chip Tag */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-6">
                <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                </span>
                No&apos;s &amp; Redirections
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-5 max-w-4xl leading-[1.1]">
                Every rejection is a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-700 to-teal-900">redirection.</span>
            </h1>
            
            {/* Subtitle description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl leading-relaxed font-semibold">
                A collection of &quot;thanks, but no thanks&quot; letters, documenting the setbacks and redirections that paved the way for growth, resilience, and progress.
            </p>
        </div>
    )
}

export default RejectionsHeader

