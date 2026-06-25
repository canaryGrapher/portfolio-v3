"use client";

import React from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { RelatedWorkCardProps } from '@/interface/pages/Landing';


const RelatedWorkCard: React.FC<RelatedWorkCardProps> = ({
    title,
    preText,
    image,
    pageRoute,
    relatedWorkRef
}) => {
    const router = useRouter();
    return (
        <div
            ref={relatedWorkRef}
            onClick={() => router.push(pageRoute)}
            className="relative h-48 md:h-80 overflow-hidden group rounded-2xl border border-gray-200/80 hover:border-green-200/60 shadow-sm hover:shadow-2xl hover:shadow-green-800/10 transition-all duration-300 cursor-pointer">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Color Overlay */}
                <div className="absolute inset-0 bg-black/45 group-hover:bg-black/35 transition-colors duration-300" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-6 md:p-8">
                {/* Top Content */}
                <div>
                    <p className="text-green-200/90 text-xs md:text-sm font-semibold uppercase tracking-wider mb-2">
                        {preText}
                    </p>
                    <h3 className="text-white text-2xl md:text-4xl font-extrabold tracking-tight">
                        {title}
                    </h3>
                </div>

                {/* Bottom Arrow Button */}
                <div className="flex justify-end">
                    <div
                        className="w-10 h-10 md:w-12 md:h-12 bg-white text-gray-800 group-hover:bg-green-800 group-hover:text-white rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-md"
                    >
                        <FaArrowRight className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RelatedWorkCard;