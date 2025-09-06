import React from 'react';
import Image from 'next/image';

interface SkillCardProps {
    icon: string;
    title: string;
    description: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ icon, title, description }) => {
    return (
        <div className="flex flex-col items-start space-y-4 p-6">
            {/* Icon Container */}
            <div className="w-16 h-16 flex items-center justify-center bg-transparent">
                <div className="text-white text-2xl">
                    <Image src={icon} alt={title} width={24} height={24} className="w-full h-full" />
                </div>
            </div>
            
            {/* Title */}
            <h3 className="text-xl font-bold text-white">
                {title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-300 text-base leading-relaxed max-w-xs">
                {description}
            </p>
        </div>
    );
};

export default SkillCard;
