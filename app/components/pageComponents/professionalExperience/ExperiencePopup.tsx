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
    if (!props.isOpen || !props.experience) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/65 backdrop-blur-sm"
                onClick={props.onClose}
            />

            {/* Popup Content */}
            <div
                className="relative w-[50%] h-[95vh] bg-black overflow-x-scroll overflow-y-scroll transform transition-all duration-300 ease-out"
                style={{
                    transform: props.isOpen ? 'scale(1)' : 'scale(0.8)',
                    opacity: props.isOpen ? 1 : 0
                }}
            >
                {/* Close Button */}
                <button
                    onClick={props.onClose}
                    className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 fixed bottom-6 right-6"
                >
                    <FaTimes className="text-2xl text-black" />
                </button>
                {/* Container */}
                <div className="w-[80%] mx-auto py-20 relative overflow-hidden">
                    {/* Header */}
                    <div
                        className="mx-auto relative overflow-hidden"
                    >

                        <div className="relative z-10 flex items-start justify-between pb-16">
                            <div className="flex flex-col space-x-6">
                                <div className="w-full rounded-xl overflow-hidden">
                                    <Image src={props.experience.popupImage} alt={props.experience.companyName} className="w-full h-auto" />
                                </div>
                                <div>
                                    <h2 className="text-6xl font-bold text-white mb-2 mt-5">
                                        {props.experience.companyName}
                                    </h2>
                                    <p className="text-lg text-gray-300 opacity-90">
                                        {props.experience.companyDescription}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div>
                        {/* Responsibilities */}
                        <div>
                            {/* Role and Duration */}
                            {props.experience.rolesAndResponsibilities.map((role, index) => (
                                <div className="mt-6" key={index}>
                                    <h3 className="text-xl font-bold text-white">
                                        <span>{props.experience.jobTitle}</span>{' '}{props.experience.employmentType != "Full Time" && <span>({props.experience.employmentType})</span>}
                                    </h3>
                                    <p
                                        className={`opacity-80 mb-4`}
                                        style={{
                                            color: props.experience.companyColor
                                        }}
                                    >
                                        {role.duration}</p>
                                    <ul className="space-y-1 text-sm leading-relaxed">
                                        {role.description.map((description, index) => (
                                            <li key={index} className="opacity-90 leading-relaxed">{description}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Experience Gained */}
                        <div>
                            <h4 className="text-xl font-bold mb-4">Experience Gained</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {props.experience.experienceGained.map((category, index) => (
                                    <div key={index} className="bg-gray-900 rounded-lg p-4">
                                        <h5 className="font-semibold mb-3 text-gray-300">
                                            {category.name}
                                        </h5>
                                        <div className="flex flex-wrap gap-2">
                                            {category.technologies.map((skill, skillIndex) => (
                                                <span
                                                    key={skillIndex}
                                                    className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                                                >
                                                    {skill.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExperiencePopup;
