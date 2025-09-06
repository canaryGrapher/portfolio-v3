"use client";

import React, { useState, useRef, useEffect } from 'react';
import { VolunteerCard, VolunteerPopup, ScrollButtons } from '../pageComponents/volunteerExperience';
import { WorkExperienceData } from '@/data/UserData';

const VolunteerSection = () => {
    const [selectedExperience, setSelectedExperience] = useState<any>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const volunteerExperiences = WorkExperienceData.volunteerWorkExperience;

    const handleExpand = (experience: any) => {
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

    return (
        <section className="w-full bg-gray-300 py-20">
            <div className="mx-auto">
                {/* Section Header */}
                <div className="mb-10 max-w-7xl mx-auto">
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
                        className="grid grid-flow-col auto-cols-max gap-2 overflow-x-auto scrollbar-hide pb-8"
                        style={{
                            scrollSnapType: 'x mandatory',
                            gridTemplateRows: '1fr'
                        }}
                    >
                        {volunteerExperiences.map((experience: any, index: number) => (
                            <div key={index} style={{ scrollSnapAlign: 'start' }} className={`${index === volunteerExperiences.length - 1 ? 'mr-2' : ''}`}>
                                <VolunteerCard
                                    {...experience}
                                    index={index}
                                    onExpand={() => handleExpand(experience)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Navigation Arrows */}
                    <ScrollButtons
                        scrollToCard={scrollToCard}
                        currentCardIndex={currentCardIndex}
                        volunteerExperiences={volunteerExperiences}
                    />
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
