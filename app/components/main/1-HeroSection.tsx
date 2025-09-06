"use client";

import { HeroSectionData } from "@/data/UserData";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
    useEffect(() => {

        gsap.from("#hero-section-header", {
            opacity: 0,
            y: 100,
            duration: 1.5,
            ease: "power2.inOut",
        });

        gsap.to("#hero-section-video-container", {
            width: "80%",
            scrollTrigger: {
                trigger: "#hero-section",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

        gsap.to("#hero-section-video", {
            borderRadius: "20px",
            duration: 1.5,
            scrollTrigger: {
                trigger: "#hero-section-header",
                start: "top top",
                end: "bottom top",
                scrub: 1,
            }
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className="flex flex-col text-center w-full bg-black pb-10" id="hero-section">
            {/* Header Section */}
            <div className="text-white pt-10 pb-20" id="hero-section-header">
                <div className="mx-auto text-center">
                    <p className="text-sm">user.start()</p>
                    <h1 className="text-4xl md:text-6xl font-medium">{HeroSectionData.name}</h1>
                </div>
            </div>

            {/* Main Content Section */}
            <div className="grid grid-cols-1 relative">
                <div className="flex justify-center">
                    <div 
                        id="hero-section-video-container"
                        className="w-full transition-all duration-300 ease-out rounded-full"
                    >
                        <img
                            id="hero-section-video"
                            src={HeroSectionData.image.src}
                            alt="Motorcycle adventure landscape"
                            className="rounded-none object-cover w-full h-full"
                        />
                    </div>
                </div>

                {/* Text Overlay */}
                <div className="absolute z-10 h-full flex items-center text-center w-full">
                    <div className="max-w-7xl mx-auto px-6 w-full">
                        <div className="text-white flex flex-col items-center justify-center h-full">
                            <h2 className="text-4xl md:text-6xl font-bold opacity-90 leading-tight">
                                {HeroSectionData.title}
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;