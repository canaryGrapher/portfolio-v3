"use client";

import React, { useState, useRef } from 'react';
import { VolunteerExperience } from '@/interface/UserData';
import { VolunteerCard, VolunteerPopup, ScrollButtons } from './pageComponents/volunteerExperience';
import { WorkExperienceData } from '@/data/pages/landing/UserData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const VolunteerSection = () => {

    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const experienceCardRef = useRef<HTMLDivElement>(null);

    const [selectedExperience, setSelectedExperience] = useState<any>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const volunteerExperiences = WorkExperienceData.volunteerWorkExperience;

    const handleExpand = (experience: VolunteerExperience) => {
        setSelectedExperience(experience);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedExperience(null);
    };

    const scrollToCard = (index: number) => {
        if (scrollContainerRef.current) {
            const cardWidth = 400 + 32; // card width + gap
            scrollContainerRef.current.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
            setCurrentCardIndex(index);
        }
    };

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.from(".volunteer-card", {
                opacity: 0,
                y: 50,
                duration: 0.5,
                ease: "power2.in",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: headerRef.current,
                    start: "bottom bottom",
                    toggleActions: "play none none none",
                }
            });
        }
    }, { scope: sectionRef });

    return (
        <section className="w-full bg-gradient-to-b from-gray-200 via-gray-150 to-gray-100 pb-20" ref={sectionRef}>
            <div className="mx-auto">
                {/* Section Header */}
                <div className="mb-10 max-w-7xl mx-auto text-center md:text-left px-4" ref={headerRef}>
                    {/* Live Chip Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                        </span>
                        user.volunteer()
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.1]">
                        Volunteer. <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-705 to-teal-900">Feel Good.</span>
                    </h2>
                </div>

                {/* Cards Container */}
                <div className="relative">
                    {/* Scrollable Cards */}
                    <div
                        ref={scrollContainerRef}
                        className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar-hide"
                        style={{
                            scrollSnapType: 'x mandatory',
                            gridTemplateRows: '1fr'
                        }}
                    >
                        {volunteerExperiences.map((experience: VolunteerExperience, index: number) => (
                            <div key={index} style={{ scrollSnapAlign: 'start' }} className={`${index === volunteerExperiences.length - 1 ? 'mr-2' : ''} volunteer-card`}>
                                <VolunteerCard
                                    ref={experienceCardRef as React.RefObject<HTMLDivElement>}
                                    experience={experience}
                                    index={index}
                                    onExpand={() => handleExpand(experience)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex flex-row justify-end mr-10">
                    <ScrollButtons
                        scrollToCard={scrollToCard}
                        currentCardIndex={currentCardIndex}
                        volunteerExperiences={volunteerExperiences}
                    />
                </div>
            </div>

            {/* Popup */}
            <VolunteerPopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                experience={selectedExperience}
            />
        </section>
    );
};

export default VolunteerSection;
