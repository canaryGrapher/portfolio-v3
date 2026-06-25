"use client";

import React, { useRef } from 'react';
import { RelatedWorkData } from "@/data/pages/landing/UserData";
import { RelatedWorkCard } from "@/components/pages/main/pageComponents/relatedWork";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const RelatedWorkSection = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (sectionRef.current) {
            gsap.from(cardsRef.current, {
                opacity: 0,
                y: 100,
                duration: 0.5,
                ease: "power2.in",
                stagger: 0.2,
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
        <section className="w-full bg-gradient-to-b from-gray-100 to-gray-50 py-20" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="mb-10 text-center md:text-left" ref={headerRef}>
                    {/* Live Chip Tag */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50/80 border border-green-200/50 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-green-800 mb-6">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
                        </span>
                        user.morework()
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 mb-5 leading-[1.1]">
                        Hand of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-800 via-emerald-705 to-teal-900">diligent.</span>
                    </h2>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-2 mx-auto" ref={cardsRef}>
                    {RelatedWorkData.filter((item) => item.active).map((item, index) => (
                        <RelatedWorkCard
                            key={index}
                            title={item.title}
                            preText={item.preText}
                            image={item.image}
                            pageRoute={item.pageRoute}
                            relatedWorkRef={cardsRef as React.RefObject<HTMLDivElement>}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedWorkSection;