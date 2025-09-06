"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    AbstractBackground,
    SectionHeader,
    AbstractImage,
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
    const abstractImageRef = useRef<HTMLDivElement>(null);

    const backgroundWallpaper = FunStuffData.backgroundImage;

    useEffect(() => {
        if (contentContainerRef.current) {
            gsap.to(contentContainerRef.current, {
                scale: 1.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    markers: true,
                    scrub: 1,
                    pin: true,
                    snap: 1,
                    pinSpacing: false,
                    toggleActions: "play none none none",
                }
            });
        }
    }, []);



    return (
        <section ref={sectionRef} className="w-screen h-screen relative"
            style={{
                // background: `url(${backgroundWallpaper.src})`,
                // backgroundSize: "cover",
                // backgroundPosition: "center",
                // backgroundRepeat: "no-repeat",
            }}
        >
            <AbstractBackground backgroundWallpaper={backgroundWallpaper} ref={abstractImageRef} />

            <div className="relative max-w-7xl mx-auto py-10 h-full w-full z-10" ref={contentContainerRef}>
                <SectionHeader ref={headerRef} />

                {/* Right Side - Device and Widgets */}
                <div className="relative mx-auto w-full flex flex-col justify-center">
                    <CarPlayDevice ref={deviceRef} icons={FunStuffData.icons} />
                </div>
            </div>
        </section>
    );
};

export default FunStuffSection;