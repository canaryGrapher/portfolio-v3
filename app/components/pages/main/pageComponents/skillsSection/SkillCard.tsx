import React from 'react';
import Image from 'next/image';
import { SkillCardProps } from '@/interface/pages/Landing';

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description, className }) => {
    return (
        <div className={`flex flex-col items-start space-y-4 p-6 bg-white/90 backdrop-blur-sm border border-gray-200/80 hover:border-gray-350 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl hover:shadow-gray-300/40 ${className}`}>
            {/* Icon Container */}
            <div className="w-full flex items-center justify-center md:justify-start">
                <div className="bg-green-50/80 text-green-800 border border-green-200/50 rounded-xl p-3 w-14 h-14 flex items-center justify-center shadow-inner">
                    <Image src={icon} alt={title} width={32} height={32} className="object-contain" />
                </div>
            </div>
            
            {/* Title */}
            <h3 className="text-base md:text-lg font-extrabold text-gray-900 text-center md:text-left w-full">
                {title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-600 text-xs md:text-sm leading-relaxed text-center md:text-left w-full font-medium">
                {description}
            </p>
        </div>
    );
};

export default SkillCard;
