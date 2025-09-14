"use client";

import React from 'react';
import Image from 'next/image';
import { VolunteerPopupProps } from '@/interface/pages/Landing';



const VolunteerPopup: React.FC<VolunteerPopupProps> = (props) => {
    if (!props.isOpen || !props.experience) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center h-screen w-screen overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/65 backdrop-blur-sm"
                onClick={props.onClose}
            />

            {/* Popup Content - match professional VolunteerPopup */}
            <div
                className="relative w-full md:w-[50%] max-h-[95vh] bg-white/90 overflow-x-hidden overflow-y-scroll transform transition-all duration-300 ease-out rounded-xl"
                style={{
                    transform: props.isOpen ? 'scale(1)' : 'scale(0.8)',
                    opacity: props.isOpen ? 1 : 0
                }}
            >
                <div className="w-[80%] mx-auto py-10 relative overflow-hidden">
                    {/* Header/Banner */}
                    <div className="p-0 relative overflow-hidden">

                        <div className="relative z-10 flex flex-col md:flex-row">
                            <Image src={props.experience.companyLogo} alt={props.experience.companyName} className="md:w-52 md:h-52 w-24 h-24" />
                            <div className="pt-5 md:p-8">
                                <h2 className="text-lg font-bold text-gray-600">
                                    {props.experience.companyName}
                                </h2>
                                <h3 className="text-4xl font-bold text-black opacity-90 mt-1">
                                    {props.experience.role}
                                </h3>
                                <p className="text-md mb-1"
                                    style={{ color: props.experience.companyColor }}
                                >{props.experience.category}</p>
                                <p className="text-lg text-gray-600 opacity-90">
                                    {props.experience.companyDescription}
                                </p>
                            </div>
                        </div>

                        {/* Role and Duration */}
                        <div className="mt-6">
                            <h2 className="text-xl font-bold text-gray-600">Contributions</h2>
                            {props.experience.responsibilities.map((responsibility, index) => (
                                <div key={index} className="mb-2">
                                    <h3 className="text-md font-bold" style={{ color: props.experience.companyColor }}>{responsibility.date}</h3>
                                    <ul className="space-y-1 text-sm leading-relaxed list-disc list-outside ml-4 text-gray-600">
                                        {responsibility.description.map((description, index) => (
                                            <li key={index} className="text-gray-600 leading-relaxed">{description}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Close Button - sticky/fixed like professional */}
            <button
                onClick={props.onClose}
                className="border-2 border-white/90 cursor-pointer w-12 h-12 bg-black/40 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 fixed bottom-6 mr-6 mb-6 z-10"
            >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

export default VolunteerPopup;
