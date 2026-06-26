"use client";

import React, { useState, useRef, useEffect } from 'react';
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
    const trackRef = useRef<HTMLDivElement>(null);
    const experienceCardRef = useRef<HTMLDivElement>(null);

    const [selectedExperience, setSelectedExperience] = useState<any>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const volunteerExperiences = WorkExperienceData.volunteerWorkExperience;

    const currentCardIndex = Math.round(scrollProgress * (volunteerExperiences.length - 1));

    const handleExpand = (experience: VolunteerExperience) => {
        setSelectedExperience(experience);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedExperience(null);
    };

    const scrollToCard = (index: number) => {
        const trigger = ScrollTrigger.getById("volunteer-section-trigger");
        if (!trigger) return;
        const start = trigger.start;
        const end = trigger.end;
        const targetProgress = index / (volunteerExperiences.length - 1);
        const targetScroll = start + targetProgress * (end - start);
        window.scrollTo({
            top: targetScroll + 2, // Small offset buffer to ensure exact card registration
            behavior: 'smooth'
        });
    };

    // Refresh ScrollTrigger to calculate accurate offsets after previous pinned sections mount
    useEffect(() => {
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (!sectionRef.current || !trackRef.current) return;

        const track = trackRef.current;

        const getScrollAmount = () => {
            return -(track.scrollWidth - window.innerWidth);
        };

        const animation = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                id: "volunteer-section-trigger",
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${(track.scrollWidth - window.innerWidth) * 1.8}`,
                pin: true,
                scrub: 1.5,
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    setScrollProgress(self.progress);
                }
            }
        });

        // Entrance animation for header and track
        gsap.from([headerRef.current, track], {
            opacity: 0,
            y: 40,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none none",
            }
        });

        // Add premium scale/fade container animations to each card
        const cards = gsap.utils.toArray<HTMLElement>(".volunteer-card");
        cards.forEach((card) => {
            // Entrance transition (as card enters viewport from right)
            gsap.fromTo(card, 
                { scale: 0.93, opacity: 0.5, y: 15 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    scrollTrigger: {
                        trigger: card,
                        containerAnimation: animation,
                        start: "left 95%",
                        end: "left 70%",
                        scrub: true,
                    }
                }
            );

            // Exit transition (as card leaves viewport to left)
            gsap.to(card, {
                scale: 0.93,
                opacity: 0.5,
                y: -15,
                scrollTrigger: {
                    trigger: card,
                    containerAnimation: animation,
                    start: "right 30%",
                    end: "right 5%",
                    scrub: true,
                }
            });
        });

        return () => {
            animation.scrollTrigger?.kill();
            animation.kill();
        };
    }, { scope: sectionRef, dependencies: [volunteerExperiences.length] });

    return (
        <section 
            className="w-screen h-[100dvh] relative bg-gradient-to-b from-gray-200 via-gray-150 to-gray-100 overflow-hidden flex flex-col justify-between py-12 md:py-16" 
            ref={sectionRef}
        >
            <div className="flex flex-col justify-between h-full w-full">
                {/* Section Header */}
                <div className="max-w-7xl w-full mx-auto text-center md:text-left px-6 shrink-0" ref={headerRef}>
                    {/* Live Chip Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-4 md:mb-6 select-none">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                        </span>
                        user.volunteer()
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                        Volunteer. <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-705 to-teal-900">Feel Good.</span>
                    </h2>
                </div>

                {/* Cards Container */}
                <div className="w-full overflow-hidden my-auto py-4">
                    {/* Horizontal Cards Track */}
                    <div
                        ref={trackRef}
                        className="flex flex-row justify-start gap-8 flex-nowrap px-6 md:px-[max(2rem,calc((100vw-1280px)/2))]"
                        style={{
                            willChange: "transform"
                        }}
                    >
                        {volunteerExperiences.map((experience: VolunteerExperience, index: number) => (
                            <div key={index} className="flex-none volunteer-card">
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
                <div className="flex justify-end mr-6 md:mr-[max(2rem,calc((100vw-1280px)/2))] shrink-0 pb-4">
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
