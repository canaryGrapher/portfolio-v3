"use client";

import { HeroSectionData } from "@/data/pages/landing/UserData";
import { FaMouse } from "react-icons/fa";
import { MdSwipeDown } from "react-icons/md";
import Image from "next/image";

const HeroSection = () => {
    return (
        <section
            className="relative h-screen w-full overflow-hidden flex flex-col justify-center items-center bg-black"
            id="hero-section"
        >
            {/* Background Image backdrop with Vignette and Gradient Overlays */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    src={HeroSectionData.image.HeroImage}
                    alt="Motorcycle adventure background"
                    fill
                    className="object-cover opacity-60"
                    priority
                    unoptimized={true}
                />
                {/* Overlay layers to ensure high readability of white text */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-zinc-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_20%,rgba(0,0,0,0.85)_100%)]" />
            </div>

            {/* Centered Content Container */}
            <div className="relative z-10 flex flex-col justify-center items-center text-center px-4 max-w-5xl">
                {/* Heading (White, Extra Bold, Extra Wide) */}
                <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-[110px] xl:text-[130px] font-black text-white tracking-[0.18em] uppercase leading-none select-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                    {HeroSectionData.name}
                </h1>

                {/* Sub Text / Subtitle (White, Extra Bold, Extra Wide) */}
                <div className="flex items-center justify-center flex-wrap gap-y-2 text-[9px] sm:text-xs md:text-sm font-black text-white/90 tracking-[0.45em] uppercase mt-6 select-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                    {HeroSectionData.title?.map((title, index) => (
                        <span key={index} className="flex items-center">
                            {title}
                            {index < HeroSectionData.title.length - 1 && (
                                <span className="mx-2 sm:mx-3 text-emerald-500 font-extrabold select-none">•</span>
                            )}
                        </span>
                    ))}
                </div>

                {/* Bio Description (Centered, Clean, Legible) */}
                {HeroSectionData.description && (
                    <p className="text-xs sm:text-sm text-zinc-300/90 max-w-[280px] sm:max-w-md md:max-w-lg mt-6 leading-relaxed font-semibold tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                        {HeroSectionData.description}
                    </p>
                )}
            </div>

            {/* Scroll down indicator */}
            <div className="absolute bottom-8 md:bottom-12 left-0 w-full h-10 flex flex-col justify-center items-center z-10">
                <div className="hidden md:block animate-bounce mb-2">
                    <FaMouse className="text-emerald-500 text-2xl" />
                </div>
                <div className="block md:hidden animate-bounce mb-2">
                    <MdSwipeDown className="text-emerald-500 text-2xl" />
                </div>

                <p className="text-zinc-400 font-extrabold text-[10px] uppercase tracking-[0.25em] hidden md:block">Scroll down</p>
                <p className="text-zinc-400 font-extrabold text-[10px] uppercase tracking-[0.25em] block md:hidden">Swipe down</p>
            </div>
        </section>
    );
};

export default HeroSection;