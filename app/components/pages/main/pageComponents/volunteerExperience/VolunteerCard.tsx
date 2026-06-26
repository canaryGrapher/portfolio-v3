"use client";

import Image from 'next/image';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { VolunteerCardProps } from '@/interface/pages/Landing';


const VolunteerCard: React.FC<VolunteerCardProps> = (props) => {
    return (
        <div
            ref={props.ref}
            className="bg-white/90 backdrop-blur-sm border border-gray-200/80 hover:border-gray-300 w-[300px] md:w-[400px] h-full min-h-[150px] md:min-h-[250px] rounded-2xl p-6 relative flex flex-col justify-between overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gray-300/40 hover:-translate-y-1.5 group"
        >
            {/* Card content */}
            <div className="flex flex-col space-y-3 items-start w-full">
                {/* Company Logo */}
                <div className="w-16 h-16 bg-gray-50 border border-gray-150 rounded-xl p-2 flex items-center justify-center shadow-inner">
                    <Image src={props.experience.companyLogo} alt={props.experience.companyName} width={64} height={64} className="object-contain w-full h-full" />
                </div>
                <div>
                    {/* Company Name */}
                    <h3 className="text-xs md:text-sm font-extrabold text-gray-500 uppercase tracking-wider mb-1">
                        {props.experience.companyName}
                    </h3>
                    {/* Role */}
                    <p className="text-gray-900 text-base md:text-xl font-bold tracking-tight leading-snug">
                        {props.experience.role}
                    </p>
                </div>
                {/* Company Description */}
                <p className="text-gray-600 text-xs md:text-sm leading-relaxed w-full font-medium">
                    {props.experience.companyDescription}
                </p>
            </div>
            {/* Expand Button */}
            <div className="flex justify-end pt-4 border-t border-dashed border-gray-200/60 mt-4 w-full">
                <button
                    onClick={props.onExpand}
                    className="w-9 h-9 bg-green-800 hover:bg-green-700 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-sm cursor-pointer"
                >
                    <FaPlus className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default VolunteerCard;
