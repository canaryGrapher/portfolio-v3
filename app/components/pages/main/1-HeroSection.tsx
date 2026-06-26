"use client";

import { HeroSectionData } from "@/data/pages/landing/UserData";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { useRef } from "react";
import { FaMouse } from "react-icons/fa";
import { MdSwipeDown } from "react-icons/md";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const HeroSection = () => {

    const sectionRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const backgroundRef = useRef<HTMLDivElement>(null);
    const nameRefPost = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        if (sectionRef.current) {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom top",
                    pin: true,
                    scrub: 5,
                }
            });

            // Hide the heading parts
            timeline.from(".heading-part", {
                y: 100,
                duration: 1,
                ease: "power2.in",
                stagger: 0.1,
                opacity: 0,
            }, "0")


            // Show the heading parts
            timeline.fromTo(".heading-part", {
                y: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.1,
                opacity: 1,
            }, {
                y: -100,
                duration: 1,
                ease: "power2.in",
                stagger: 0.1,
                opacity: 0,
            }, "0.5")

            // Hide the name
            timeline.to(nameRef.current, {
                opacity: 0,
                duration: 1,
                ease: "power2.out",
            }, "1")

            // Show the background
            timeline.fromTo(backgroundRef.current, {
                opacity: 0,
                duration: 1,
                delay: 1.5,
                height: "0%",
                width: "0%",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
            }, {
                opacity: 1,
                duration: 1,
                ease: "power2.in",
                height: "100%",
                width: "100%",
                top: "0%",
                left: "0%",
                transform: "translate(0%, 0%)",
            }, "1.5")

            // Shrink the background
            timeline.to(backgroundRef.current, {
                duration: 1,
                ease: "power2.out",
                width: "90%",
                height: "60%",
                left: "5%",
                right: "5%",
                bottom: "20%",
                top: "20%",
            }, "2")

            // Show the name post
            timeline.fromTo(nameRefPost.current,
                {
                    y: -100,
                    opacity: 0,
                    duration: 1,
                    delay: 1.5,
                    ease: "power2.in",
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power2.out",
                }, "2.5")

            // Round the background border
            timeline.to('#hero-section-background', {
                duration: 1,
                ease: "power2.in",
                borderRadius: "50px",
            }, "3")
        }
    }, { scope: sectionRef });

    return (
        <section
            className="relative h-screen overflow-hidden text-center w-full bg-gradient-to-b from-green-800 to-gray-600"
            id="hero-section"
            ref={sectionRef}>
            {/* Main Content Section */}
            <div className="flex flex-col justify-center items-center h-full relative">
                {/* Text Overlay */}
                <div className="mx-auto flex flex-col items-center text-center w-full mb-32 md:mb-0">
                    <div className="flex flex-col justify-around h-full mx-aut font-black">
                        <h1
                            ref={nameRef}
                            className="text-[120px] md:text-[250px] font-black leading-none"
                            style={{
                                backgroundImage: `url(${HeroSectionData.image.HeroImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                                backgroundClip: 'text',
                                color: 'transparent'
                            }}
                        >
                            <span className="hidden md:block">{HeroSectionData.name.toUpperCase()}</span>
                            <span className="block md:hidden whitespace-pre-line leading-none">{HeroSectionData.name.toUpperCase().split(" ").join("\n")}</span>
                        </h1>
                    </div>
                    <div className="flex flex-row text-gray-400 font-extrabold uppercase tracking-wide mt-4">
                        {HeroSectionData.title?.map((title, index) => (
                            <p key={index} className={`text-xl md:text-4xl font-extrabold leading-tight heading-part ${index === HeroSectionData.title?.length - 1 ? 'mr-0' : 'mr-2'} text-gray-300`}>
                                {title}{index < HeroSectionData.title?.length - 1 ? <span className="text-emerald-500 font-black">.</span> : ''}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Video Section */}
                <div className="opacity-0 absolute top-0 left-0 h-screen w-screen" ref={backgroundRef}>
                    <Image
                        id="hero-section-background"
                        src={HeroSectionData.image.HeroImage}
                        alt="Motorcycle adventure landscape"
                        unoptimized={true}
                        fill
                        className="object-cover w-full h-full border border-white/10 shadow-[0_0_50px_rgba(16,185,129,0.15)]"
                    />
                    <div
                        ref={nameRefPost}
                        className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center"
                    >
                        <h2
                            className="text-white/10 text-[120px] md:text-[250px] font-black leading-none">
                            {HeroSectionData.name.toUpperCase()}
                        </h2>
                    </div>
                </div>
            </div>

            {/* Scroll down indicator */}
            <div className="absolute bottom-40 md:bottom-20 left-0 w-full h-10 flex flex-col justify-center items-center">
                <div className="hidden md:block animate-bounce mb-2">
                    <FaMouse className="text-emerald-500 text-2xl" />
                </div>
                <div className="block md:hidden animate-bounce mb-2">
                    <MdSwipeDown className="text-emerald-500 text-2xl" />
                </div>

                <p className="text-gray-400 font-extrabold text-xs hidden md:block">Scroll down</p>
                <p className="text-gray-400 font-extrabold text-xs block md:hidden">Swipe down</p>
            </div>
            {/* Header Section */}
        </section>
    );
};

export default HeroSection;