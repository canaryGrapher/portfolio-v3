"use client";

import React from 'react';
import { ProfessionalExperience } from '@/interface/UserData';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';

interface Props {
    isOpen: boolean;
    onClose: () => void;
    experience: ProfessionalExperience;
}


const ExperiencePopup: React.FC<Props> = (props) => {
    const [activeTooltipKey, setActiveTooltipKey] = React.useState<string | null>(null);
    if (!props.isOpen || !props.experience) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/65 backdrop-blur-sm"
                onClick={props.onClose}
            />

            {/* Close Button - Sticky to bottom of container */}
            <button
                onClick={props.onClose}
                className="cursor-pointer w-12 h-12 bg-black/40 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 fixed bottom-6 right-6 md:right-auto mr-6 mb-6 z-10"
            >
                <FaTimes className="text-2xl text-white" />
            </button>

            {/* Popup Content */}
            <div
                className="relative w-full md:w-[50%] h-[95vh] bg-white/90 overflow-x-hidden overflow-y-scroll transform transition-all duration-300 ease-out rounded-xl"
                style={{
                    transform: props.isOpen ? 'scale(1)' : 'scale(0.8)',
                    opacity: props.isOpen ? 1 : 0
                }}
            >
                {/* Container */}
                <div className="w-[90%] mx-auto py-10 relative overflow-hidden">
                    {/* Banner Section */}
                    <div className="mx-auto relative overflow-hidden">
                        <div className="relative z-10 flex items-start justify-between">
                            <div className="flex flex-col space-x-6">
                                <div className="w-full rounded-t-xl overflow-hidden">
                                    <Image src={props.experience.popupImage} alt={props.experience.companyName} className="w-full h-auto" />
                                </div>
                                <div>
                                    <h2 className="text-6xl font-bold text-black mb-2 mt-5">
                                        {props.experience.companyName}
                                    </h2>
                                    <p className="text-lg text-gray-600 opacity-90">
                                        {props.experience.companyDescription}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Responsibilities Section */}
                    <div className='py-10'>
                        {/* Role and Duration */}
                        {props.experience.rolesAndResponsibilities.map((role, index) => (
                            <div className="mt-6" key={index}>
                                <h3 className="text-2xl text-black">
                                    <span>{props.experience.jobTitle}</span>{' '}{props.experience.employmentType != "Full Time" && <span>({props.experience.employmentType})</span>}
                                </h3>
                                <p className={`opacity-80 mb-2 mt-1 font-bold`} style={{ color: props.experience.companyColor }}>
                                    {role.duration}</p>
                                <ul className="space-y-1 text-sm leading-relaxed list-disc list-outside ml-4 text-gray-600">
                                    {role.description.map((description, index) => (
                                        <li key={index} className="opacity-90 leading-relaxed">{description}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Experience Gained Section */}
                    <div className='flex flex-col'>
                        <h4 className="text-2xl mb-4 text-black">Experience Gained</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ul>
                                {props.experience.experienceGained.map((category, index) => (
                                    <li key={index} className="pb-5 list-disc list-outside ml-4 text-gray-600">
                                        <h5 className="mb-1 text-gray-600">
                                            {category.name}
                                        </h5>
                                        <div className={`flex flex-wrap gap-2`}>
                                            {category.technologies.map((skill, skillIndex) => {
                                                const tooltipKey = `${index}-${skillIndex}`;
                                                const isActive = activeTooltipKey === tooltipKey;
                                                return (
                                                    <div
                                                        key={skillIndex}
                                                        title={skill.name}
                                                        aria-label={skill.name}
                                                        role="button"
                                                        tabIndex={0}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setActiveTooltipKey(isActive ? null : tooltipKey);
                                                        }}
                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter' || e.key === ' ') {
                                                                e.preventDefault();
                                                                setActiveTooltipKey(isActive ? null : tooltipKey);
                                                            }
                                                        }}
                                                        onMouseLeave={() => setActiveTooltipKey((prev) => (prev === tooltipKey ? null : prev))}
                                                        className={`group relative h-12 w-12 flex items-center justify-center`}
                                                        style={{
                                                            background: `linear-gradient(to right, ${props.experience.gradientColors[0]}, ${props.experience.gradientColors[1]})`
                                                        }}
                                                    >
                                                        <Image src={skill.icon} alt={skill.name} width={18} height={18} className="w-full h-full p-2" />
                                                        {/* Tooltip */}
                                                        <span className={`pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-black/80 px-2 py-1 text-xs text-white transition-opacity duration-150 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                            {skill.name}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperiencePopup;
