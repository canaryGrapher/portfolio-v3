"use client";

import React from 'react';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { ProfessionalExperiencePopupProps } from '@/interface/pages/Landing';

const ExperiencePopup: React.FC<ProfessionalExperiencePopupProps> = (props) => {
    if (!props.isOpen || !props.experience) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300"
                onClick={props.onClose}
            />

            {/* Popup Content Card */}
            <div
                className="relative w-full max-w-3xl max-h-[85vh] bg-zinc-950/95 border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8),_0_0_80px_rgba(16,185,129,0.03)] transform transition-all duration-300 ease-out rounded-2xl flex flex-col overflow-hidden"
                style={{
                    transform: props.isOpen ? 'scale(1)' : 'scale(0.95)',
                    opacity: props.isOpen ? 1 : 0
                }}
            >
                {/* Floating Close Button */}
                <button
                    onClick={props.onClose}
                    className="absolute top-4 right-4 z-20 cursor-pointer w-9 h-9 bg-black/50 hover:bg-zinc-800/80 border border-white/10 rounded-full flex items-center justify-center text-zinc-300 hover:text-white transition-all duration-200 shadow-md"
                    aria-label="Close details"
                >
                    <FaTimes className="text-sm" />
                </button>

                {/* Scrollable Container */}
                <div className="flex-1 overflow-y-auto scrollbar-hide">
                    {/* Header Banner Image */}
                    {props.experience.popupImage && (
                        <div className="relative w-full h-44 sm:h-56 overflow-hidden">
                            <Image
                                src={props.experience.popupImage}
                                alt={props.experience.companyName}
                                fill
                                className="object-cover"
                                unoptimized={true}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                        </div>
                    )}

                    {/* Scrollable Content */}
                    <div className="px-6 sm:px-10 pb-10 pt-6">
                        {/* Company Name & description */}
                        <div className="border-b border-white/5 pb-6">
                            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                                {props.experience.companyName}
                            </h2>
                            <p className="text-sm sm:text-base text-zinc-400 mt-2.5 leading-relaxed font-medium">
                                {props.experience.companyDescription}
                            </p>
                        </div>

                        {/* Roles & Responsibilities */}
                        <div className="py-6 border-b border-white/5">
                            <h3 className="text-xs font-black uppercase text-zinc-500 tracking-widest mb-4">
                                Roles & Responsibilities
                            </h3>
                            <div className="space-y-8 relative pl-4 border-l border-zinc-800">
                                {props.experience.rolesAndResponsibilities.map((role, index) => (
                                    <div className="relative" key={index}>
                                        {/* Timeline Marker Dot */}
                                        <div
                                            className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-950"
                                            style={{ backgroundColor: props.experience.companyColor || '#10b981' }}
                                        />

                                        {/* Role title and Type */}
                                        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                                            <h4 className="text-lg sm:text-xl font-bold text-white">
                                                {role.title || props.experience.jobTitle}
                                            </h4>
                                            {role.employmentType && (
                                                <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                                                    ({role.employmentType})
                                                </span>
                                            )}
                                        </div>

                                        {/* Duration */}
                                        <p
                                            className="text-xs font-bold mt-1 inline-block"
                                            style={{ color: props.experience.companyColor || '#10b981' }}
                                        >
                                            {role.duration}
                                        </p>

                                        {/* Responsibility Items */}
                                        <ul className="mt-3 space-y-2 text-sm text-zinc-400 font-medium leading-relaxed">
                                            {role.description.map((desc, descIndex) => (
                                                <li key={descIndex} className="flex items-start">
                                                    <span
                                                        className="mr-2.5 mt-2 w-1.5 h-1.5 shrink-0 rounded-sm"
                                                        style={{ backgroundColor: props.experience.companyColor || '#10b981' }}
                                                    />
                                                    <span>{desc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Skills & Technologies Gained */}
                        <div className="pt-6">
                            <h3 className="text-xs font-black uppercase text-zinc-500 tracking-widest mb-5">
                                Skills & Technologies Gained
                            </h3>
                            <div className="space-y-6">
                                {props.experience.experienceGained.map((category, index) => (
                                    <div key={index} className="space-y-2.5">
                                        <h4 className="text-[10px] font-black uppercase text-zinc-600 tracking-widest">
                                            {category.name}
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {category.technologies.map((skill, skillIndex) => (
                                                <div
                                                    key={skillIndex}
                                                    className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-emerald-500/30 hover:bg-emerald-950/10 transition-all duration-300 shadow-md group"
                                                    title={skill.name}
                                                >
                                                    <div className="relative w-4 h-4 shrink-0 flex items-center justify-center">
                                                        <Image
                                                            src={skill.icon}
                                                            alt={skill.name}
                                                            width={16}
                                                            height={16}
                                                            className="object-contain"
                                                        />
                                                    </div>
                                                    <span className="text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors duration-200">
                                                        {skill.name}
                                                    </span>
                                                </div>
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
