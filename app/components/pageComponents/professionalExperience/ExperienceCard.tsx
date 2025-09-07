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
    ref: any;
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
    onExpand,
    ref
}) => {
    const getBannerSrc = () => {
        if (typeof bannerImage === 'string') return bannerImage;
        if ('src' in bannerImage) return bannerImage.src;
        return (bannerImage as StaticImageData).src;
    };

    return (
        <div
            ref={ref}
            className={`w-[300px] md:w-[420px] h-[400px] md:h-[600px] flex-none rounded-2xl p-8 relative flex flex-col justify-start overflow-hidden mr-2 ${index === 0 ? 'ml-5 md:ml-[calc((100vw-1280px)/2)]' : ''}`}
            style={{ 
                backgroundImage: `url(${getBannerSrc()})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
            }}
        >
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0 bg-black/70"></div>
            
            {/* Content */}
            <div className="relative w-full p-5">
                {/* Company Name */}
                <h3 className="text-2xl md:text-4xl font-bold text-white md:mb-2">
                    {companyName}
                </h3>

                {/* Role */}
                <p className="text-base md:text-xl text-white">
                    {jobTitle}
                </p>

                {/* Employment Type */}
                <p className="text-white opacity-80 mb-2 text-xs md:text-lg">
                    ({employmentType})
                </p>

                {/* Work duration */}
                <p className="text-gray-300 opacity-80 mb-2 smd:mb-8 text-xs md:text-sm">
                    {startDate} - {endDate}
                </p>

                {/* Description */}
                <p className="text-white text-xs md:text-lg">
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
