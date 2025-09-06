"use client";

import React from 'react';
import { StaticImageData } from 'next/image';

interface ExperienceCardProps {
    companyName: string;
    jobTitle: string;
    companyDescription: string;
    employmentType: string;
    startDate: string;
    endDate: string;
    bannerImage: StaticImageData;
    onExpand: () => void;
    index: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    companyName,
    jobTitle,
    companyDescription,
    employmentType,
    startDate,
    endDate,
    bannerImage,
    index,
    onExpand
}) => {
    const getBannerSrc = () => {
        if (typeof bannerImage === 'string') return bannerImage;
        if ('src' in bannerImage) return bannerImage.src;
        return (bannerImage as StaticImageData).src;
    };

    return (
        <div
            className={`w-[420px] h-[600px] flex-none rounded-2xl p-8 relative flex flex-col justify-start overflow-hidden mr-2`}
            style={{ 
                backgroundImage: `url(${getBannerSrc()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                // Dynamic left margin so the first card starts aligned with centered content width (1280px)
                marginLeft: index === 0 ? 'calc((100vw - 1280px) / 2)' as any : undefined
            }}
        >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/70"></div>
            
            {/* Content */}
            <div className="relative w-full p-5">
                {/* Company Name */}
                <h3 className="text-4xl font-bold text-white mb-2">
                    {companyName}
                </h3>

                {/* Role */}
                <p className="text-xl text-white">
                    {jobTitle}
                </p>

                {/* Employment Type */}
                <p className="text-white opacity-80 mb-2 text-lg">
                    ({employmentType})
                </p>

                {/* Work duration */}
                <p className="text-gray-300 opacity-80 mb-8 text-sm">
                    {startDate} - {endDate}
                </p>

                {/* Description */}
                <p className="text-white text-lg">
                    {companyDescription}
                </p>
            </div>

            {/* Expand Button */}
            <button
                onClick={onExpand}
                className="absolute bottom-6 right-0 mr-5 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 z-20"
            >
                <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </div>
    );
};

export default ExperienceCard;
