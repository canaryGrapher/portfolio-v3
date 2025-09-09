"use client";

import React, { useState, useRef } from 'react';
import { VolunteerExperience } from '@/interface/UserData';
import { VolunteerCard, VolunteerPopup, ScrollButtons } from './pageComponents/volunteerExperience';
import { WorkExperienceData } from '@/data/UserData';
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
        <section className="w-full bg-gray-300 pb-20" ref={sectionRef}>
            <div className="mx-auto">
                {/* Section Header */}
                <div className="mb-10 max-w-7xl mx-auto text-center md:text-left" ref={headerRef}>
                    <p className="text-sm text-gray-800 font-mono mb-4">
                        user.volunteer()
                    </p>
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-800">
                        Volunteer. Feel Good.
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
                                    {...experience}
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
