"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    AbstractBackground,
    SectionHeader,
    CarPlayDevice,
} from '../pageComponents/funStuff';
import { FunStuffData } from '@/data/UserData';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const FunStuffSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const deviceRef = useRef<HTMLDivElement>(null);
    const headerRef = useRef<HTMLDivElement>(null);
    const contentContainerRef = useRef<HTMLDivElement>(null);
    const deviceContainerRef = useRef<HTMLDivElement>(null);
    const abstractImageRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);

    const backgroundWallpaper = FunStuffData.backgroundVideo;

    useEffect(() => {
        if (contentContainerRef.current) {

            const carPlayTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    pin: true,
                    toggleActions: "play complete reverse reset",
                }
            });

            // First: Slowly darken the overlay (finishes within 20px)
            carPlayTimeline.to(overlayRef.current, {
                opacity: 1,
                duration: 0.2,
                ease: "power2.inOut",
            }, "0");

            // Second: Show header after overlay completes
            carPlayTimeline.from(headerRef.current,
                {
                    y: 100,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power1.inOut",
                }, "0.1")

            // // Third: Show device after header completes
            carPlayTimeline.from(deviceContainerRef.current, {
                y: 100,
                opacity: 0,
                duration: 1.5,
                ease: "power2.inOut",
            }, "0.2");

        }
    }, []);



    return (
        <section ref={sectionRef} className="w-screen h-screen relative bg-black mx-auto">
            <div className="absolute top-0 left-0 w-full h-full z-10">
                <div className="absolute top-0 left-0 w-full h-full z-10">
                    <AbstractBackground backgroundWallpaper={backgroundWallpaper} ref={abstractImageRef} />
                </div>
                <div ref={overlayRef} className="absolute top-0 left-0 w-full h-full bg-black/70 z-20 opacity-0"></div>
            </div>

            <div className="relative py-10 h-full w-full z-10 flex flex-col" ref={contentContainerRef}>
                <div className="md:py-10 z-10 w-full md:w-7xl mx-auto" ref={headerRef}>
                    <SectionHeader />
                </div>

                {/* Right Side - Device and Widgets */}
                {/* from condition for GSAP */}
                <div ref={deviceContainerRef} className="mx-auto max-w-7xl w-full">
                    <CarPlayDevice ref={deviceRef} icons={FunStuffData.icons} />
                </div>
            </div>
        </section>
    );
};

export default FunStuffSection;