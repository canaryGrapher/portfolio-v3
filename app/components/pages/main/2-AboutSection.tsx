"use client";

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useLottie } from "lottie-react";
import { IntroSectionData } from "@/data/pages/landing/UserData";
import { FaArrowDown } from 'react-icons/fa';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AboutSection = () => {

    const [isMobile, setIsMobile] = useState(false);

    const sectionRef = useRef<HTMLElement>(null);
    const lottieRef = useRef<HTMLDivElement>(null);
    const paragraphsRef = useRef<(HTMLParagraphElement | null)[]>([]);
    const mobileBlackoutRef = useRef<HTMLDivElement>(null);

    // Check screen size on mount and resize
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 768); // md breakpoint
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const IntroLottieStyle = {
        height: "100vh !important",
        width: "100vw !important",
        objectFit: "cover" as const,
        objectPosition: "center" as const,
        transform: isMobile ? "scale(1.2)" : "scale(1)", // Scale up for mobile to fill better
    }

    const animationData = isMobile ? IntroSectionData.responsiveLottieObject : IntroSectionData.lottieObject;
    const TOTAL_LOTTIE_FRAMES = (animationData as any)?.op || 12;

    const IntroLottieOptions = {
        animationData: animationData,
        autoplay: false,
        loop: false,
        rendererSettings: {
            preserveAspectRatio: isMobile ? "xMidYMid slice" : "xMidYMid meet", // Different aspect ratio handling
        }
    }

    const lottieObject = useLottie(IntroLottieOptions, IntroLottieStyle);

    useGSAP(() => {
        if (lottieRef.current) {
            // Set initial state for the cross-fade (about starts hidden)
            gsap.set("#about-section-container", { opacity: 0 });

            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: "#hero-about-wrapper",
                    start: "top top",
                    end: "+=350%", // scroll length for transition + about animation
                    scrub: 5,
                    pin: "#hero-about-wrapper",
                    id: "hero-about-trigger",
                }
            });

            // Phase 1: Cross-fade in place (Hero out, Intro in)
            timeline.to("#hero-section-container", {
                opacity: 0,
                duration: 1.0,
                ease: "power2.out",
            }, "0");

            timeline.to("#about-section-container", {
                opacity: 1,
                duration: 1.0,
                ease: "power2.out",
            }, "0");

            // Phase 2: Intro Section animations (Lottie & Text)
            const totalParagraphs = IntroSectionData.lines.length;
            const lastParagraphEndTime = (totalParagraphs - 1) * 0.5 + 0.3;

            // Mobile blackout fade out (starts right after cross-fade is done)
            timeline.to(mobileBlackoutRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power2.in",
            }, "1.0");

            // Lottie scroll update (starts at 1.1)
            timeline.to({ frame: 0 }, {
                frame: TOTAL_LOTTIE_FRAMES - 1,
                duration: lastParagraphEndTime + 0.5,
                ease: "none",
                onUpdate: function () {
                    const currentFrame = Math.round(this.targets()[0].frame);
                    lottieObject.goToAndStop(currentFrame, true);
                },
                onComplete: function () {
                    lottieObject.goToAndStop(TOTAL_LOTTIE_FRAMES - 1, true);
                }
            }, "1.1");

            // Paragraphs display sequentially (starts at 1.2)
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
                    }, 1.2 + index * 0.5);

                    // Hide current paragraph before next one appears (except the last one)
                    if (index < paragraphsRef.current.length - 1) {
                        timeline.to(paragraph, {
                            opacity: 0,
                            y: -100,
                            duration: 0.3,
                            ease: "power2.in",
                        }, 1.2 + (index + 1) * 0.5 - 0.1);
                    }
                }
            });
        }
    });

    return (
        <section ref={sectionRef} className="w-full h-full bg-black relative overflow-hidden">
            <div className="w-full h-full absolute md:hidden top-0 left-0 bg-black z-10 flex flex-col justify-start pt-25 items-center" ref={mobileBlackoutRef} style={{
                transform: isMobile ? 'scale(1.2)' : 'scale(1)',
            }}>
                <h2 className="text-4xl font-bold text-white">About Me</h2>
                <p className="text-white">Get to know a little about me</p>
                <div className="animate-bounce pt-20">
                    <FaArrowDown />
                </div>
            </div>
            <div ref={lottieRef} className="w-full h-full absolute top-0 left-0">
                {lottieObject.View}
            </div>
            <div className="text-white absolute top-0 left-0 w-full h-full flex justify-center items-center text-center px-5">
                {/* Black overlay */}
                <div className="absolute inset-0 bg-black opacity-50" />
                {IntroSectionData.lines.map((line, index) => (
                    <p
                        key={index}
                        ref={(el) => { paragraphsRef.current[index] = el; }}
                        className={`${isMobile ? 'text-xl md:text-2xl lg:text-4xl' : 'text-4xl'} font-bold absolute max-w-7xl px-4`}
                    >
                        {line}
                    </p>
                ))}
            </div>
        </section>
    );
};

export default AboutSection;