"use client";

import SkillsData from "@/data/general/Skills";
import { SkillCard } from "@/components/pages/main/pageComponents/skillsSection";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const SkillsSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Refresh ScrollTrigger to calculate accurate offsets after previous pinned sections mount
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (!sectionRef.current) return;

        const cards = gsap.utils.toArray<HTMLElement>(".skill-card-pin");
        if (cards.length === 0) return;

        // Set initial state
        // All cards index > 0 are positioned off-screen to the right
        gsap.set(cards.slice(1), {
            xPercent: 155, // 155% ensures cards are fully off-screen
            scale: 0.95,
            rotate: 4,
            opacity: 0
        });

        // First card is centered and fully active
        gsap.set(cards[0], {
            xPercent: 0,
            scale: 1,
            rotate: 0,
            opacity: 1,
            zIndex: 10
        });

        // Build timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                id: "skills-section-trigger",
                trigger: sectionRef.current,
                start: "top top",
                end: `+=${cards.length * 600}`, // Shortened offset (3600px total instead of 4800px) for less scroll friction
                pin: true,
                scrub: 0.8, // Snappier scrub for responsive, low-lag scroll reaction
                invalidateOnRefresh: true,
                onUpdate: (self) => {
                    // Update mobile progress text dynamically based on actual progress
                    const activeIdx = Math.min(
                        Math.floor(self.progress * cards.length), 
                        cards.length - 1
                    );
                    const progressText = document.querySelector(".mobile-progress-text");
                    if (progressText) {
                        progressText.textContent = `${activeIdx + 1} / ${cards.length}`;
                    }
                }
            }
        });

        // Loop through cards to build timeline
        cards.forEach((card, index) => {
            if (index === 0) {
                // Initialize sidebar item 0 as active
                tl.to(`.sidebar-item-0`, {
                    color: "#065f46", // text-green-800
                    fontWeight: "800",
                    scale: 1.03,
                    duration: 0.1
                }, 0);
                tl.to(`.sidebar-dot-0`, {
                    backgroundColor: "#16a34a", // bg-green-600
                    scale: 1.3,
                    duration: 0.1
                }, 0);
                
                // Update mobile progress bar
                tl.to(".mobile-progress-bar", {
                    width: `${(1 / cards.length) * 100}%`,
                    duration: 0.1
                }, 0);
                return;
            }

            // Cards now animate in contiguous segments: index - 1 to index
            // Eliminates "dead scrolling space" and stuttering
            const position = index - 1;
            
            // 1. Sidebar menu transitions
            tl.to(`.sidebar-item-${index}`, {
                color: "#065f46", // text-green-800
                fontWeight: "800",
                scale: 1.03,
                duration: 0.8
            }, position);
            tl.to(`.sidebar-dot-${index}`, {
                backgroundColor: "#16a34a", // bg-green-600
                scale: 1.3,
                duration: 0.8
            }, position);

            tl.to(`.sidebar-item-${index - 1}`, {
                color: "#9ca3af", // text-gray-400
                fontWeight: "600",
                scale: 1.0,
                duration: 0.8
            }, position);
            tl.to(`.sidebar-dot-${index - 1}`, {
                backgroundColor: "#d1d5db", // bg-gray-300
                scale: 1.0,
                duration: 0.8
            }, position);

            // Update mobile progress bar
            tl.to(".mobile-progress-bar", {
                width: `${((index + 1) / cards.length) * 100}%`,
                duration: 0.8,
                ease: "power1.inOut"
            }, position);

            // 2. Animate card `index` sliding in
            tl.fromTo(card, {
                xPercent: 155,
                rotate: 4,
                scale: 0.95,
                opacity: 0
            }, {
                xPercent: 0,
                rotate: 0,
                scale: 1,
                opacity: 1,
                zIndex: 10 + index,
                ease: "power2.out",
                duration: 1
            }, position);

            // 3. Shift previous card back (Removed brightness filters to fix Safari scroll lag/friction)
            tl.to(cards[index - 1], {
                scale: 0.95,
                y: -20,
                opacity: 0.6,
                ease: "power2.out",
                duration: 1
            }, position);

            // 4. Shift index-2 card even further back
            if (index - 2 >= 0) {
                tl.to(cards[index - 2], {
                    scale: 0.90,
                    y: -40,
                    opacity: 0.3,
                    ease: "power2.out",
                    duration: 1
                }, position);
            }

            // 5. Hide index-3 and older cards to optimize page rendering
            if (index - 3 >= 0) {
                tl.to(cards[index - 3], {
                    opacity: 0,
                    ease: "power2.out",
                    duration: 1
                }, position);
            }
        });

    }, { scope: sectionRef });

    const handleMenuClick = (index: number) => {
        const trigger = ScrollTrigger.getById("skills-section-trigger");
        if (trigger) {
            const start = trigger.start;
            const end = trigger.end;
            const total = end - start;
            
            // Map index directly to progress in the timeline (0 to 1)
            const progress = index / (SkillsData.skills.length - 1);
            const targetScroll = start + progress * total;
            
            window.scrollTo({
                top: targetScroll + 2, // Small offset buffer to ensure exact card registration
                behavior: "smooth"
            });
        }
    };

    return (
        <section 
            className="w-screen h-[100dvh] relative bg-gradient-to-b from-gray-50 to-gray-100 overflow-hidden flex flex-col md:flex-row border-b border-gray-200/50" 
            ref={sectionRef} 
            id="skills"
        >
            {/* Left Sidebar / Top Header */}
            <div className="w-full md:w-[35%] lg:w-[30%] shrink-0 flex flex-col justify-center p-6 md:p-12 md:pl-16 border-b md:border-b-0 md:border-r border-gray-200/50 bg-gray-50/50 backdrop-blur-sm z-20">
                {/* Live Chip Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-4 md:mb-6 self-start select-none">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                    </span>
                    user.skills()
                </div>

                {/* Heading */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight text-gray-900 leading-[1.15] mb-4 md:mb-8">
                    What I can <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-700 to-teal-900">do for you.</span>
                </h2>

                {/* Mobile/Tablet Progress Bar */}
                <div className="w-full mb-2 md:hidden">
                    <div className="flex justify-between items-center text-[10px] font-black text-gray-400 mb-1.5 uppercase">
                        <span>Progress</span>
                        <span className="mobile-progress-text">1 / 6</span>
                    </div>
                    <div className="w-full bg-gray-250/50 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-green-600 h-full mobile-progress-bar transition-all duration-100" style={{ width: "16.67%" }}></div>
                    </div>
                </div>

                {/* Desktop Sidebar Indicator list */}
                <div className="hidden md:flex flex-col gap-3.5 border-l border-gray-200 pl-4 py-2">
                    {SkillsData.skills.map((skill, index) => (
                        <button
                            key={index}
                            onClick={() => handleMenuClick(index)}
                            className={`sidebar-item sidebar-item-${index} text-left text-xs lg:text-sm font-semibold text-gray-400 hover:text-green-800 transition-all duration-300 cursor-pointer flex items-center gap-2 outline-none`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full bg-gray-300 sidebar-dot sidebar-dot-${index} transition-all duration-300`}></span>
                            <span>{skill.name}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Right Card Deck Stacking Area */}
            <div className="w-full md:w-[65%] lg:w-[70%] h-[75vh] md:h-full flex items-center justify-center relative p-4 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
                <div className="relative w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl h-[60vh] md:h-[70vh] max-h-[480px] md:max-h-[560px] flex items-center justify-center">
                    {SkillsData.skills.map((skill, index) => (
                        <div 
                            key={index} 
                            className="absolute w-full h-full skill-card-pin select-none"
                        >
                            <SkillCard
                                icon={skill.icon.src}
                                title={skill.name}
                                description={skill.description}
                                focusAreas={skill.focusAreas}
                                techStack={skill.techStack}
                                impact={skill.impact}
                                index={index}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;