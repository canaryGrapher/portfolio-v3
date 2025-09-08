"use client";

import { StaticImageData } from 'next/image';
import Image from 'next/image';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { VolunteerExperience } from '@/interface/UserData';

interface VolunteerCardProps extends VolunteerExperience {
    onExpand: () => void;
    index: number;
    ref: React.RefObject<HTMLDivElement>;
}

const VolunteerCard: React.FC<VolunteerCardProps> = (props) => {
    return (
        <div
            ref={props.ref}
            className={`bg-white w-[300px] md:w-[400px] h-full min-h-[150px] md:min-h-[250px] rounded-2xl p-5 relative flex flex-col justify-between overflow-hidden ${props.index === 0 ? 'ml-5 md:ml-[calc((100vw-80rem)/2)]' : ''}`}
        >
            {/* Card content */}
            <div className="flex flex-col space-y-2 items-start">
                {/* Company Logo */}
                <div className="w-20 h-20">
                    <Image src={props.companyLogo} alt={props.companyName} />
                </div>
                {/* Company Name */}
                <h3 className="text-xs md:text-base font-medium text-black m-0">
                    {props.companyName}
                </h3>
                {/* Role */}
                <p className="text-black text-base md:text-xl font-bold m-0">
                    {props.role}
                </p>
                {/* Company Description */}
                <p className="p-0 text-gray-500 text-sm w-full">
                    {props.companyDescription}
                </p>
            </div>
            {/* Expand Button */}
            <div className="flex justify-end pt-3">
                <button
                    onClick={props.onExpand}
                    className="p-2 bg-black rounded-full"
                >
                    <FaPlus className="w-6 h-6 text-white" />
                </button>
            </div>
        </div>
    );
};

export default VolunteerCard;
