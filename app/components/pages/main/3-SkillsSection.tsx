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
    const headerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Refresh ScrollTrigger to calculate accurate offsets after previous pinned sections mount
        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.from(".skills-section-card", {
                opacity: 0,
                y: 40,
                duration: 0.6,
                ease: "power2.out",
                stagger: 0.08,
                clearProps: "all",
                scrollTrigger: {
                    trigger: headerRef.current || sectionRef.current,
                    start: "top 85%",
                    toggleActions: "play none none none",
                    once: true,
                }
            });
        }
    }, { scope: sectionRef });

    return (
        <section className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-6" ref={sectionRef} id="skills">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-20 text-center md:text-left" ref={headerRef}>
                    {/* Live Chip Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                        </span>
                        user.skills()
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.1]">
                        What I can <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-705 to-teal-900">do for you.</span>
                    </h2>
                </div>

                {/* Skills Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
                    {SkillsData.skills.map((skill, index) => (
                        <SkillCard
                            className="skills-section-card"
                            key={index}
                            icon={skill.icon.src}
                            title={skill.name}
                            description={skill.description}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;