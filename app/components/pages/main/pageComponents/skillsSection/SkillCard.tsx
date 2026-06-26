import React from 'react';
import Image from 'next/image';
import { SkillCardProps } from '@/interface/pages/Landing';
import Technologies from '@/data/general/Technologies';

const SkillCard: React.FC<SkillCardProps> = ({
    icon,
    title,
    description,
    focusAreas,
    techStack,
    impact,
    index,
    className
}) => {
    // Format index as 2 digits (e.g., 01, 02)
    const formattedIndex = String(index + 1).padStart(2, '0');

    return (
        <div
            className={`flex flex-col justify-between p-6 md:p-8 bg-white/95 backdrop-blur-md border border-gray-200/80 rounded-3xl shadow-xl shadow-gray-200/30 w-full h-full hover:border-green-300/60 transition-all duration-300 ${className}`}
            style={{
                willChange: "transform, opacity",
                WebkitBackfaceVisibility: "hidden",
                backfaceVisibility: "hidden"
            }}
        >
            <div>
                {/* Header Row */}
                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        {/* Icon Container */}
                        <div className="bg-green-50 text-green-800 border border-green-200/50 rounded-2xl p-2.5 w-12 h-12 flex items-center justify-center shadow-inner shrink-0">
                            <Image src={icon} alt={title} width={26} height={26} className="object-contain" />
                        </div>
                        {/* Title */}
                        <h3 className="text-lg md:text-xl font-black text-gray-900 leading-tight">
                            {title}
                        </h3>
                    </div>
                    {/* Index Badge */}
                    <span className="text-[10px] md:text-xs font-black text-green-800 bg-green-100/50 border border-green-200/30 rounded-full px-2.5 py-1 select-none shrink-0">
                        {formattedIndex}
                    </span>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed mt-4 font-medium">
                    {description}
                </p>

                {/* Key Expertise Section */}
                <div className="mt-5 md:mt-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
                        Key Expertise
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {focusAreas.map((area, i) => (
                            <li key={i} className="flex items-center text-[11px] md:text-xs text-gray-700 font-semibold">
                                <span className="w-4 h-4 rounded-full bg-green-100/80 text-green-700 flex items-center justify-center text-[9px] font-black mr-2 shrink-0">
                                    ✓
                                </span>
                                {area}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Technologies / Tools Section */}
                <div className="mt-5 md:mt-6">
                    <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2.5">
                        Tools & Technologies
                    </h4>
                    <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {techStack.map((techKey) => {
                            const tech = Technologies[techKey as keyof typeof Technologies];
                            if (!tech) return null;
                            return (
                                <span
                                    key={techKey}
                                    className="inline-flex items-center gap-1 px-2.5 py-1 bg-green-800 border border-gray-200/60 rounded-lg text-[10px] md:text-xs font-bold text-gray-300 shadow-sm hover:text-green-800 hover:border-green-800 hover:bg-green-700/20 transition-all duration-300"
                                >
                                    {tech.icon && (
                                        <Image
                                            src={tech.icon}
                                            alt={tech.name}
                                            width={12}
                                            height={12}
                                            className="object-contain shrink-0"
                                        />
                                    )}
                                    <span>{tech.name}</span>
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Signature Impact Footer */}
            <div className="mt-6 md:mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 bg-green-50/30 -mx-6 md:-mx-8 -mb-6 md:-mb-8 px-6 md:px-8 py-3.5 rounded-b-3xl shrink-0">
                <span className="text-[9px] font-black text-green-800 bg-green-200/50 px-1.5 py-0.5 rounded tracking-wide uppercase shrink-0">
                    IMPACT
                </span>
                <span className="text-[10px] md:text-xs text-green-900 font-extrabold leading-tight">
                    {impact}
                </span>
            </div>
        </div>
    );
};

export default SkillCard;
