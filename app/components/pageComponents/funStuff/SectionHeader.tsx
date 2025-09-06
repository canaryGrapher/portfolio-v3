"use client";

import React, { forwardRef } from 'react';

interface SectionHeaderProps {
    className?: string;
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
    ({ className = "" }, ref) => {
        return (
            <div ref={ref} className={`z-20 ${className}`}>
                <p className="text-sm text-gray-300 font-mono mb-2">user.fun()</p>
                <h2 className="text-5xl md:text-6xl font-bold text-white">
                    Jack is not a dull boy!
                </h2>
            </div>
        );
    }
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
