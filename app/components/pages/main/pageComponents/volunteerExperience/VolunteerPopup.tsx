"use client";

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import { VolunteerPopupProps } from '@/interface/pages/Landing';

const VolunteerPopup: React.FC<VolunteerPopupProps> = (props) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (props.isOpen && props.experience) {
            const originalBodyStyle = document.body.style.overflow;
            const originalHtmlStyle = document.documentElement.style.overflow;

            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';

            return () => {
                document.body.style.overflow = originalBodyStyle;
                document.documentElement.style.overflow = originalHtmlStyle;
            };
        }
    }, [props.isOpen, props.experience]);

    if (!props.isOpen || !props.experience || !mounted) return null;

    return createPortal(
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 touch-none"
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

                {/* Header Information Row */}
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6 sm:p-10 border-b border-white/5 bg-zinc-900/10">
                    {props.experience.companyLogo && (
                        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-zinc-900/85 border border-white/10 p-2 flex items-center justify-center shrink-0 shadow-lg shadow-black/25 overflow-hidden">
                            <Image
                                src={props.experience.companyLogo}
                                alt={props.experience.companyName}
                                width={80}
                                height={80}
                                className="w-full h-full object-contain"
                                unoptimized={true}
                            />
                        </div>
                    )}
                    <div className="flex-1">
                        <span
                            className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-zinc-900/60 border-zinc-800/80"
                            style={{ color: props.experience.companyColor || '#10b981' }}
                        >
                            {props.experience.category}
                        </span>
                        <h2 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wide mt-3.5">
                            {props.experience.companyName}
                        </h2>
                        <h3 className="text-lg sm:text-xl font-black text-zinc-400 mt-1 uppercase tracking-wider">
                            {props.experience.role}
                        </h3>
                    </div>
                </div>

                {/* Scrollable Container */}
                <div className="flex-1 overflow-y-auto overscroll-contain scrollbar-hide px-6 sm:px-10 pb-10 pt-6">
                    {/* Description */}
                    <div className="border-b border-white/5 pb-6">
                        <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-medium">
                            {props.experience.companyDescription}
                        </p>
                    </div>

                    {/* Contributions Timeline */}
                    <div className="pt-6">
                        <h3 className="text-xs font-black uppercase text-zinc-500 tracking-widest mb-6">
                            Contributions & Responsibilities
                        </h3>
                        <div className="space-y-8 relative pl-4 border-l border-zinc-800">
                            {props.experience.responsibilities.map((responsibility, index) => (
                                <div className="relative" key={index}>
                                    {/* Timeline Marker Dot */}
                                    <div
                                        className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2 border-zinc-950"
                                        style={{ backgroundColor: props.experience.companyColor || '#10b981' }}
                                    />

                                    {/* Date */}
                                    <h4
                                        className="text-xs sm:text-sm font-black uppercase tracking-wider mb-2.5"
                                        style={{ color: props.experience.companyColor || '#10b981' }}
                                    >
                                        {responsibility.date}
                                    </h4>

                                    {/* Contribution Items */}
                                    <ul className="space-y-2 text-sm text-zinc-400 font-medium leading-relaxed">
                                        {responsibility.description.map((desc, descIndex) => (
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
                </div>
            </div>
        </div>,
        document.body
    );
};

export default VolunteerPopup;
