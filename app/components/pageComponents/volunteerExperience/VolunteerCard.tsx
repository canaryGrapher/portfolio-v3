"use client";

import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';
import { FaPlus } from 'react-icons/fa';

interface VolunteerCardProps {
    companyName: string;
    category: string;
    companyLogo: StaticImageData;
    companyDescription: string;
    role: string;
    companyColor: string;
    responsibilities: {
        date: string;
        description: string[];
    }[];
    onExpand: () => void;
    index: number;
    ref: React.RefObject<HTMLDivElement>;
}

const VolunteerCard: React.FC<VolunteerCardProps> = ({
    companyName,
    companyDescription,
    role,
    companyLogo,
    responsibilities,
    index,
    onExpand,
    category,
    ref,
}) => {
    return (
        <div
            ref={ref}
            className={`bg-white w-[300px] md:w-[400px] h-full min-h-[150px] md:min-h-[250px] rounded-2xl p-5 relative flex flex-col justify-between overflow-hidden ${index === 0 ? 'ml-5 md:ml-[calc((100vw-80rem)/2)]' : ''}`}
        >
            {/* Card content */}
            <div className="flex flex-col space-y-2 items-start">
                {/* Company Logo */}
                <div className="w-20 h-20">
                    <Image src={companyLogo} alt={companyName} />
                </div>
                {/* Company Name */}
                <h3 className="text-xs md:text-base font-medium text-black m-0">
                    {companyName}
                </h3>
                {/* Role */}
                <p className="text-black text-base md:text-xl font-bold m-0">
                    {role}
                </p>
                {/* Company Description */}
                <p className="p-0 text-gray-500 text-xs md:text-sm w-full">
                    {companyDescription}
                </p>
            </div>
            {/* Expand Button */}
            <div className="flex justify-end pt-3">
                <button
                    onClick={onExpand}
                    className="p-2 bg-black rounded-full"
                >
                    <FaPlus className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    );
};

export default VolunteerCard;
