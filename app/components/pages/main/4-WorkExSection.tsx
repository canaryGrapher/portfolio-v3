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
    const sectionRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const experienceCardRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const [selectedExperience, setSelectedExperience] = useState<any>(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const autoScrollRef = useRef<number | null>(null);
    const directionRef = useRef<1 | -1>(1); // 1 = right, -1 = left
    const workExperiences = WorkExperienceData.professionalWorkExperience;

    const handleExpand = (experience: any) => {
        setSelectedExperience(experience);
        setIsPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsPopupOpen(false);
        setSelectedExperience(null);
    };

    // Auto-scroll functionality
    const startAutoScroll = () => {
        setIsAutoScrolling(true);
    };

    const stopAutoScroll = () => {
        setIsAutoScrolling(false);
        if (autoScrollRef.current) {
            cancelAnimationFrame(autoScrollRef.current);
            autoScrollRef.current = null;
        }
    };

    const toggleAutoScroll = () => {
        if (isAutoScrolling) {
            stopAutoScroll();
        } else {
            startAutoScroll();
        }
    };

    // Auto-scroll animation loop (scrolling the page vertically while in pinned section)
    useEffect(() => {
        if (!isAutoScrolling) return;

        const animate = () => {
            const trigger = ScrollTrigger.getById("workex-section-trigger");
            if (!trigger) {
                setIsAutoScrolling(false);
                return;
            }

            const start = trigger.start;
            const end = trigger.end;
            const currentScroll = window.scrollY;

            // If we are before the pinned section, scroll to the start first
            if (currentScroll < start) {
                const diff = start - currentScroll;
                const step = Math.min(10, Math.max(2, diff / 10));
                window.scrollTo(0, currentScroll + step);
                autoScrollRef.current = requestAnimationFrame(animate);
                return;
            } else if (currentScroll > end) {
                window.scrollTo(0, start);
                directionRef.current = 1;
                autoScrollRef.current = requestAnimationFrame(animate);
                return;
            }

            const scrollSpeed = 1.5; // Smooth scroll speed (pixels per frame)
            let newScroll = currentScroll + (scrollSpeed * directionRef.current);

            // Check boundaries and reverse direction
            if (newScroll >= end) {
                newScroll = end;
                directionRef.current = -1; // Reverse direction (scroll back up)
            } else if (newScroll <= start) {
                newScroll = start;
                directionRef.current = 1; // Reverse direction (scroll down)
            }

            window.scrollTo(0, newScroll);
            autoScrollRef.current = requestAnimationFrame(animate);
        };

        autoScrollRef.current = requestAnimationFrame(animate);

        return () => {
            if (autoScrollRef.current) {
                cancelAnimationFrame(autoScrollRef.current);
            }
        };
    }, [isAutoScrolling]);

    // Stop auto-scroll on user manual interaction
    useEffect(() => {
        if (!isAutoScrolling) return;

        const stopScrolling = () => {
            stopAutoScroll();
        };

        window.addEventListener('wheel', stopScrolling, { passive: true });
        window.addEventListener('touchmove', stopScrolling, { passive: true });
        window.addEventListener('mousedown', stopScrolling, { passive: true });

        return () => {
            window.removeEventListener('wheel', stopScrolling);
            window.removeEventListener('touchmove', stopScrolling);
            window.removeEventListener('mousedown', stopScrolling);
        };
    }, [isAutoScrolling]);

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
        
        // Calculate dynamic translation amount
        const getScrollAmount = () => {
            return -(track.scrollWidth - window.innerWidth);
        };

        // Pin the section and translate the track horizontally
        const animation = gsap.to(track, {
            x: getScrollAmount,
            ease: "none",
            scrollTrigger: {
                id: "workex-section-trigger",
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
        const cards = gsap.utils.toArray<HTMLElement>(".experience-card");
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
    }, { scope: sectionRef, dependencies: [workExperiences.length] });

    return (
        <section 
            className="w-screen h-[100dvh] relative bg-gradient-to-b from-gray-100 via-gray-150 to-gray-200 overflow-hidden flex flex-col justify-between py-12 md:py-16" 
            ref={sectionRef} 
            id="experience"
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
                        user.workExperiences()
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                        Work <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-700 to-teal-900">Experiences.</span>
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
                        {workExperiences.map((experience, index) => (
                            <div
                                key={index}
                                className="flex-none experience-card"
                            >
                                <ExperienceCard
                                    ref={experienceCardRef}
                                    experience={experience}
                                    index={index}
                                    onExpand={() => handleExpand(experience)}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Slider Component with Auto-scroll Control */}
                <div className="flex items-center justify-center gap-4 shrink-0">
                    <ScrollSlider
                        isAutoScrolling={isAutoScrolling}
                        progress={scrollProgress}
                        onToggleAutoScroll={toggleAutoScroll}
                        onSeek={(p) => {
                            const trigger = ScrollTrigger.getById("workex-section-trigger");
                            if (!trigger) return;
                            const start = trigger.start;
                            const end = trigger.end;
                            const targetScroll = start + p * (end - start);
                            window.scrollTo({ top: targetScroll, behavior: 'auto' });
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