import React from 'react';
import Image from 'next/image';

interface PageHeroSectionProps {
    backgroundImage: string;
    title: string;
    subtitle: string;
    altText?: string;
}

const PageHeroSection: React.FC<PageHeroSectionProps> = ({ 
    backgroundImage, 
    title, 
    subtitle, 
    altText = "Page Background" 
}) => {
    return (
        <div className="relative w-full h-[60vh] min-h-[500px] overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={backgroundImage}
                    alt={altText}
                    fill
                    className="object-cover"
                />
                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-black/60" />
            </div>
            
            {/* Content */}
            <div className="relative flex h-full flex-col justify-center text-left text-white px-10">
                <h1 className="text-6xl md:text-7xl font-bold leading-tight">{title}</h1>
                <p className="max-w-3xl text-xl md:text-2xl text-gray-200 leading-relaxed">
                    {subtitle}
                </p>
            </div>
        </div>
    );
};

export default PageHeroSection;
