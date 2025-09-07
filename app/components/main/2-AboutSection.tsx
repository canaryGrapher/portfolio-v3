"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLottie } from "lottie-react";
import { IntroSectionData } from "@/data/UserData";

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}


const AboutSection = () => {

    const TOTAL_LOTTIE_FRAMES = 12;

    const sectionRef = useRef<HTMLElement>(null);
    const lottieRef = useRef<HTMLDivElement>(null);
    const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);

    const IntroLootieStyle = {
        height: "100vh !important",
        width: "100vw !important",
        objectFit: "cover" as const,
        objectPosition: "center" as const,
    }

    const IntroLottieOptions = {
        animationData: IntroSectionData.lottieObject,
        autoplay: false,
    }

    const lottieObject = useLottie(IntroLottieOptions, IntroLootieStyle);

    useEffect(() => {
        if (sectionRef.current && lottieRef.current) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true,
                }
            });

            // Animate Lottie along with the timeline
            const totalParagraphs = IntroSectionData.lines.length; // Use actual data length
            const lastParagraphEndTime = (totalParagraphs - 1) * 0.5 + 0.3; // When last paragraph finishes
            
            timeline.to({ frame: 0 }, {
                frame: TOTAL_LOTTIE_FRAMES - 1,
                duration: lastParagraphEndTime + 0.5, // Continue 0.5s after last paragraph
                ease: "none",
                onUpdate: function() {
                    const currentFrame = Math.round(this.targets()[0].frame);
                    lottieObject.goToAndStop(currentFrame, true);
                },
                onComplete: function() {
                    // Keep Lottie on the last frame
                    lottieObject.goToAndStop(TOTAL_LOTTIE_FRAMES - 1, true);
                }
            }, "0");

            // Animate each paragraph one at a time
            paragraphsRef.current.forEach((paragraph, index) => {
                if (paragraph) {
                    // Hide all paragraphs initially
                    gsap.set(paragraph, { opacity: 0, y: 100 });
                    
                    // Show current paragraph
                    timeline.to(paragraph, {
                        opacity: 1,
                        y: 0,
                        duration: 0.3,
                        ease: "power2.out",
                    }, index * 0.5);
                    
                    // Hide current paragraph before next one appears (except the last one)
                    if (index < paragraphsRef.current.length - 1) {
                        timeline.to(paragraph, {
                            opacity: 0,
                            y: -100,
                            duration: 0.3,
                            ease: "power2.in",
                        }, (index + 1) * 0.5 - 0.1); // Hide before next paragraph appears
                    }
                }
            });
        }
    }, []);

    return (
        <section ref={sectionRef} className="w-screen h-screen bg-black relative">
            <div ref={lottieRef} className="w-screen h-screen absolute top-0 left-0">
                {lottieObject.View}
            </div>
            <div className="text-white absolute top-0 left-0 w-full h-full flex justify-center items-center text-center px-5">
                {IntroSectionData.lines.map((line, index) => (
                    <p 
                        key={index} 
                        ref={(el) => { paragraphsRef.current[index] = el; }}
                        className="text-4xl font-bold absolute max-w-7xl"
                    >
                        {line}
                    </p>
                ))}
            </div>
        </section>
    );
};

export default AboutSection;    