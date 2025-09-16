"use client";

import React from 'react';
import { StaticImageData } from 'next/image';
import { ExperienceCardProps } from '@/interface/pages/Landing';



const ExperienceCard: React.FC<ExperienceCardProps> = (props) => {
    const getBannerSrc = () => {
        if (typeof props.experience.bannerImage === 'string') return props.experience.bannerImage;
        if ('src' in props.experience.bannerImage) return props.experience.bannerImage.src;
        return (props.experience.bannerImage as StaticImageData).src;
    };

    return (
        <div
            ref={props.ref}
            className={`w-[300px] md:w-[420px] h-[400px] md:h-[600px] flex-none rounded-2xl p-8 relative flex flex-col justify-start overflow-hidden mr-2 ${props.index === 0 ? 'ml-5 md:ml-[calc((100vw-1280px)/2)]' : ''}`}
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
                    {props.experience.companyName}
                </h3>

                {/* Role */}
                <p className="text-base md:text-xl text-white">
                    {props.experience.jobTitle}
                </p>

                {/* Employment Type */}
                <p className="text-white opacity-80 mb-2 text-xs md:text-lg">
                    ({props.experience.employmentType})
                </p>

                {/* Work duration */}
                <p className="text-gray-300 opacity-80 mb-2 smd:mb-8 text-xs md:text-sm">
                    {props.experience.startDate} - {props.experience.endDate}
                </p>

                {/* Description */}
                <p className="text-white text-xs md:text-lg">
                    {props.experience.companyDescription}
                </p>
            </div>

            {/* Expand Button */}
            <button
                onClick={props.onExpand}
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
