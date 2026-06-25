"use client";

import React, { forwardRef } from 'react';
import { ClassNameProps } from '@/interface/pages/Landing';



const SectionHeader = forwardRef<HTMLDivElement, ClassNameProps>(
    ({ className = "" }, ref) => {
        return (
            <div ref={ref} className={`z-20 max-w-full mx-auto text-center md:text-left ${className}`}>
                {/* Live Chip Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-950/80 border border-green-700/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-200 mb-6">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                    </span>
                    user.fun()
                </div>
                <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-5 leading-[1.1]">
                    Jack is not a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300">dull boy!</span>
                </h2>
            </div>
        );
    }
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
