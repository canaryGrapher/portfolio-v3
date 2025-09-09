"use client";

import React, { forwardRef } from 'react';
import { ClassNameProps } from '@/interface/pages/Landing';


const FloatingWidgets = forwardRef<HTMLDivElement, ClassNameProps>(
    ({ className = "" }, ref) => {
        return (
            <div ref={ref} className={`absolute -top-20 -left-20 space-y-4 ${className}`}>
                {/* Calendar Widget */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 w-64">
                    <div className="flex items-center space-x-4">
                        <div className="bg-white rounded-lg p-3 text-center">
                            <div className="text-black text-xs font-medium">Fri</div>
                            <div className="text-black text-2xl font-bold">25</div>
                        </div>
                        <div>
                            <p className="text-gray-300 text-sm">September 25, 2025</p>
                            <p className="text-white font-medium">Trip to Ladakh</p>
                        </div>
                    </div>
                </div>

                {/* Time Widget */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 w-64">
                    <div className="text-red-400 text-xs font-medium mb-2">TODAY</div>
                    <div className="text-white text-2xl font-bold mb-1">10:36 pm</div>
                    <div className="text-gray-300 text-sm">September 5, 2025</div>
                </div>

                {/* Updates Widget */}
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-4 border border-white/20 w-64">
                    <div className="text-red-400 text-sm font-medium mb-2">Updates</div>
                    <div className="text-gray-300 text-xs mb-2">September 5, 2025</div>
                    <ul className="text-white text-sm space-y-1">
                        <li>• New update for the portfolio page to add updates launched</li>
                        <li>• Lifted 20kg today</li>
                    </ul>
                </div>
            </div>
        );
    }
);

FloatingWidgets.displayName = "FloatingWidgets";

export default FloatingWidgets;
