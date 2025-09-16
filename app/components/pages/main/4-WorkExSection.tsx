"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ExperienceCard, ExperiencePopup, ScrollSlider } from './pageComponents/professionalExperience';
import { WorkExperienceData } from '@/data/pages/landing/UserData';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const WorkExSection = () => {
    const sectionRef = useRef(null);
    const experienceCardRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [selectedExperience, setSelectedExperience] = useState<any>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const autoScrollRef = useRef<number | null>(null);
    const directionRef = useRef<1 | -1>(1); // 1 = right, -1 = left
    const workExperiences = WorkExperienceData.professionalWorkExperience;

    const handleExpand = (experience) => {
        setSelectedExperience(experience);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedExperience(null);
    };

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth;
            const progress = maxScroll > 0 ? scrollLeft / maxScroll : 0;
            setScrollProgress(progress);
        }
    };

    // Auto-scroll functionality
    const startAutoScroll = () => {
        console.log('Starting auto-scroll from current position');
        setIsAutoScrolling(true);
        // Don't reset direction - continue from current position and direction
    };

    const stopAutoScroll = () => {
        console.log('Stopping auto-scroll at current position');
        setIsAutoScrolling(false);
        if (autoScrollRef.current) {
            cancelAnimationFrame(autoScrollRef.current);
            autoScrollRef.current = null;
        }
        // Keep current scroll position and direction - don't reset
    };

    const toggleAutoScroll = () => {
        console.log('Toggle auto-scroll, current state:', isAutoScrolling);
        if (isAutoScrolling) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    };

    // Auto-scroll animation loop
    useEffect(() => {
        if (!isAutoScrolling) return;

        console.log('Auto-scroll effect triggered, isAutoScrolling:', isAutoScrolling);

        const animate = () => {
            if (!scrollContainerRef.current) {
                console.log('No scroll container ref');
                return;
            }

            const container = scrollContainerRef.current;
            const currentScroll = container.scrollLeft;
            const maxScroll = container.scrollWidth - container.clientWidth;

            console.log('Scroll values:', { currentScroll, maxScroll, scrollWidth: container.scrollWidth, clientWidth: container.clientWidth });

            if (maxScroll <= 0) {
                console.log('No scrollable content, stopping auto-scroll');
                stopAutoScroll();
                return;
            }

            const scrollSpeed = 1;
            let newScroll = currentScroll + (scrollSpeed * directionRef.current);

            // Check boundaries and reverse direction
            if (newScroll >= maxScroll) {
                newScroll = maxScroll;
                directionRef.current = -1; // Reverse to left
                console.log('Reversing direction to left');
            } else if (newScroll <= 0) {
                newScroll = 0;
                directionRef.current = 1; // Reverse to right
                console.log('Reversing direction to right');
            }

            container.scrollLeft = newScroll;
            console.log('Scrolling to:', newScroll, 'Direction:', directionRef.current);

            // Manually update progress to avoid relying on scroll listener timing
            const progress = maxScroll > 0 ? newScroll / maxScroll : 0;
            setScrollProgress(progress);

            autoScrollRef.current = requestAnimationFrame(animate);
        };

        autoScrollRef.current = requestAnimationFrame(animate);

        return () => {
            if (autoScrollRef.current) {
                cancelAnimationFrame(autoScrollRef.current);
            }
        };
    }, [isAutoScrolling]);


    useGSAP(() => {
        if (sectionRef.current) {
            gsap.from(".experience-card", {
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

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (container) {
            container.addEventListener('scroll', handleScroll);
            return () => container.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <section className="max-w-screen bg-gray-300 pt-20 pb-10" ref={sectionRef}>
            <div className="mx-auto">
                {/* Section Header */}
                <div className="mb-10 max-w-7xl mx-auto text-center md:text-left" ref={headerRef}>
                    <p className="text-xs md:text-sm text-gray-800 font-mono mb-4">
                        user.workExperiences()
                    </p>
                    <h2 className="text-4xl md:text-6xl font-bold text-gray-800">
                        Work Experiences.
                    </h2>
                </div>
                {/* Cards Container */}
                <div className="relative">
                    {/* Scrollable Cards */}
                    <div
                        ref={scrollContainerRef}
                        className="flex flex-row justify-start overflow-x-auto scrollbar-hide pb-8"
                        style={{
                            scrollSnapType: isAutoScrolling ? 'none' : 'x mandatory'
                        }}
                    >
                        {workExperiences.map((experience, index) => (
                            <div
                                key={index}
                                className="flex-none experience-card"
                                style={{ scrollSnapAlign: isAutoScrolling ? 'none' : 'start' }}
                            >
                                <ExperienceCard
                                    ref={experienceCardRef}
                                    experience={experience}
                                    index={index}
                                    onExpand={() => handleExpand(experience)}                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slider Component with Auto-scroll Control */}
                <div className="flex items-center justify-center gap-4 mt-8">
                    <ScrollSlider
                        isAutoScrolling={isAutoScrolling}
                        progress={scrollProgress}
                        onToggleAutoScroll={toggleAutoScroll}
                        onSeek={(p) => {
                            if (!scrollContainerRef.current) return;
                            const container = scrollContainerRef.current;
                            const maxScroll = container.scrollWidth - container.clientWidth;
                            container.scrollTo({ left: maxScroll * p, behavior: 'smooth' });
                        }}
                    />
                </div>
            </div>

            {/* Popup */}
            <ExperiencePopup
                isOpen={isPopupOpen}
                onClose={handleClosePopup}
                experience={selectedExperience}
            />
        </section>
    );
};

export default WorkExSection;