"use client";

import { SkillsData } from "@/data/UserData";
import { SkillCard } from "@/components/main/pageComponents/skillsSection";
import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const SkillsSection = () => {

    const sectionRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.from(".skills-section-card", {
                opacity: 0,
                y: 100,
                duration: 1.5,
                ease: "power2.inOut",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none none",
                }
            });
        }
    }, { scope: sectionRef });

    return (
        <section className="min-h-screen bg-black py-20 px-6" ref={sectionRef}>
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="mb-20 text-center md:text-left">
                    <p className="text-sm text-gray-400 font-mono mb-4">
                        user.skills()
                    </p>
                    <h2 className="text-5xl md:text-6xl font-bold text-white">
                        What I can do for you
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