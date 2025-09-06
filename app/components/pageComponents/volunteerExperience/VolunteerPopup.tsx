"use client";

import React from 'react';

interface ExperiencePopupProps {
    isOpen: boolean;
    onClose: () => void;
    experience: {
        company: string;
        role: string;
        type: string;
        duration: string;
        description: string;
        companyColor: string;
        logo: React.ReactNode;
        responsibilities: string[];
        experienceGained: {
            category: string;
            skills: string[];
        }[];
    } | null;
}

const ExperiencePopup: React.FC<ExperiencePopupProps> = ({
    isOpen,
    onClose,
    experience
}) => {
    if (!isOpen || !experience) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div 
                className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />
            
            {/* Popup Content */}
            <div 
                className="relative w-full max-w-4xl max-h-[90vh] bg-black rounded-2xl overflow-hidden transform transition-all duration-300 ease-out"
                style={{
                    transform: isOpen ? 'scale(1)' : 'scale(0.8)',
                    opacity: isOpen ? 1 : 0
                }}
            >
                {/* Header */}
                <div 
                    className="p-8 relative overflow-hidden"
                    style={{ backgroundColor: experience.companyColor }}
                >
                    {/* Abstract Background */}
                    <div className="absolute top-0 right-0 w-48 h-48 opacity-20">
                        <div className="w-full h-full bg-white rounded-full transform translate-x-12 -translate-y-12"></div>
                    </div>
                    
                    <div className="relative z-10 flex items-start justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20">
                                {experience.logo}
                            </div>
                            <div>
                                <h2 className="text-4xl font-bold text-white mb-2">
                                    {experience.company}
                                </h2>
                                <p className="text-xl text-white opacity-90">
                                    {experience.description}
                                </p>
                            </div>
                        </div>
                        
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
                        >
                            <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* Role and Duration */}
                    <div className="mt-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                            {experience.role}
                        </h3>
                        <p className="text-white opacity-80 mb-1">
                            ({experience.type})
                        </p>
                        <p className="text-white opacity-80">
                            {experience.duration}
                        </p>
                    </div>
                </div>
                
                {/* Content */}
                <div className="p-8 text-white">
                    {/* Responsibilities */}
                    <div className="mb-8">
                        <h4 className="text-xl font-bold mb-4">Responsibilities</h4>
                        <ul className="space-y-3">
                            {experience.responsibilities.map((responsibility, index) => (
                                <li key={index} className="flex items-start space-x-3">
                                    <span className="w-2 h-2 bg-white rounded-full mt-2 flex-shrink-0"></span>
                                    <span className="opacity-90 leading-relaxed">{responsibility}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Experience Gained */}
                    <div>
                        <h4 className="text-xl font-bold mb-4">Experience Gained</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {experience.experienceGained.map((category, index) => (
                                <div key={index} className="bg-gray-900 rounded-lg p-4">
                                    <h5 className="font-semibold mb-3 text-gray-300">
                                        {category.category}
                                    </h5>
                                    <div className="flex flex-wrap gap-2">
                                        {category.skills.map((skill, skillIndex) => (
                                            <span 
                                                key={skillIndex}
                                                className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                                            >
                                                {skill}
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
    );
};

export default ExperiencePopup;
