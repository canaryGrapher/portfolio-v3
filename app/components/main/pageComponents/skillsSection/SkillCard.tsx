import React from 'react';
import Image from 'next/image';
import { SkillCardProps } from '@/interface/pages/Landing';

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description, className }) => {
    return (
        <div className={`flex flex-col items-start space-y-4 p-6 ${className}`}>
            {/* Icon Container */}
            <div className="w-full h-16 flex items-center justify-center md:justify-start">
                <div className="text-white text-2xl w-16 h-16">
                    <Image src={icon} alt={title} width={24} height={24} className="w-full h-full" />
                </div>
            </div>
            
            {/* Title */}
            <h3 className="text-base md:text-xl font-bold text-white text-center md:text-left w-full">
                {title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-300 text-xs md:text-base leading-relaxed max-w-xs text-center md:text-left w-full">
                {description}
            </p>
        </div>
    );
};

export default SkillCard;
