"use client";

import React, { useRef } from 'react';
import { RelatedWorkData } from "@/data/UserData";
import { RelatedWorkCard } from "@/components/main/pageComponents/relatedWork";
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
        <section className="w-full bg-black py-20" ref={sectionRef}>
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="mb-10 text-center md:text-left" ref={headerRef}>
                    <p className="text-sm text-gray-300 font-mono mb-4">
                        user.morework()
                    </p>
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-300">
                        Hand of the diligent
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