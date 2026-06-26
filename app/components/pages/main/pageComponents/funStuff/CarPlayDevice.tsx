"use client";

import React, { forwardRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { FaWifi, FaBatteryFull, FaSignal } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import { CarPlayDeviceProps } from '@/interface/pages/Landing';

const CarPlayDevice = forwardRef<HTMLDivElement, CarPlayDeviceProps>(
    ({ icons }, ref) => {
        const router = useRouter();
        const [time, setTime] = useState("");

        useEffect(() => {
            const updateTime = () => {
                setTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
            };
            updateTime();
            const interval = setInterval(updateTime, 60000);
            return () => clearInterval(interval);
        }, []);

        return (
            /* Outer Hardware Bezel Frame mimicking a premium automotive display mount */
            <div className="md:my-8 mx-auto w-full max-w-5xl bg-zinc-950/90 border-t-2 border-l-2 border-zinc-700/40 border-r-2 border-b-2 border-zinc-900 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95),inset_0_1px_2px_rgba(255,255,255,0.05)] rounded-[36px] p-3.5 relative overflow-hidden">
                {/* Highlight/shine ring inside the hardware bezel */}
                <div className="absolute inset-0 rounded-[36px] border border-white/5 pointer-events-none z-10"></div>

                {/* Animated Liquid Color Blobs (rendered behind the glass pane) */}
                <div className="absolute inset-4 rounded-[24px] overflow-hidden pointer-events-none z-0">
                    <div 
                        className="absolute w-80 h-80 rounded-full bg-emerald-500/20 mix-blend-screen filter blur-[80px]"
                        style={{
                            top: '-20%',
                            left: '-10%',
                            animation: 'float-blob-1 15s infinite ease-in-out',
                        }}
                    ></div>
                    <div 
                        className="absolute w-96 h-96 rounded-full bg-emerald-600/15 mix-blend-screen filter blur-[90px]"
                        style={{
                            bottom: '-25%',
                            right: '-10%',
                            animation: 'float-blob-2 20s infinite ease-in-out',
                        }}
                    ></div>
                    <div 
                        className="absolute w-72 h-72 rounded-full bg-green-600/15 mix-blend-screen filter blur-[70px]"
                        style={{
                            top: '40%',
                            left: '30%',
                            animation: 'float-blob-3 18s infinite ease-in-out',
                        }}
                    ></div>

                    <style dangerouslySetInnerHTML={{__html: `
                        @keyframes float-blob-1 {
                            0%, 100% { transform: translate(0, 0) scale(1); }
                            50% { transform: translate(40px, 30px) scale(1.15); }
                        }
                        @keyframes float-blob-2 {
                            0%, 100% { transform: translate(0, 0) scale(1.1); }
                            50% { transform: translate(-50px, -40px) scale(0.9); }
                        }
                        @keyframes float-blob-3 {
                            0%, 100% { transform: translate(0, 0) scale(0.9); }
                            50% { transform: translate(30px, -50px) scale(1.1); }
                        }
                    `}} />
                </div>

                {/* Inner CarPlay OS Screen (Liquid Glass Slab) */}
                <div
                    ref={ref}
                    className="w-full min-h-[320px] md:min-h-[420px] lg:min-h-[500px] bg-white/[0.03] backdrop-blur-xl rounded-[24px] border border-white/15 border-t-white/30 border-l-white/30 flex flex-col md:flex-row overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] relative z-10"
                >
                    {/* Status Bar (Left panel) */}
                    <div className="hidden md:flex flex-col justify-between bg-white/[0.04] backdrop-blur-2xl border-r border-white/10 w-[85px] py-6 px-2 shrink-0 items-center select-none z-20">
                        {/* Status elements: Clock, Network, Battery */}
                        <div className="flex flex-col items-center gap-1.5 w-full">
                            <span className="text-white font-extrabold text-xl tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                                {time || "09:41"}
                            </span>
                            
                            <div className="flex flex-col items-center gap-1.5 mt-2 opacity-80">
                                <FaSignal className="text-emerald-400 text-xs" />
                                <FaWifi className="text-emerald-400 text-xs" />
                                <FaBatteryFull className="text-emerald-400 text-xs" />
                            </div>
                        </div>

                        {/* iOS-style CarPlay Circular Home Button */}
                        <button
                            onClick={() => router.push('/')}
                            className="group w-12 h-12 rounded-full border border-white/20 hover:border-emerald-500/50 hover:bg-emerald-500/10 flex items-center justify-center transition-all duration-300 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_4px_10px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 cursor-pointer z-30"
                            aria-label="CarPlay Home"
                        >
                            <div className="w-5 h-5 rounded-[6px] border border-white/70 group-hover:border-emerald-400 transition-colors"></div>
                        </button>
                    </div>

                    {/* App Grid Area */}
                    <div className="flex-1 flex items-center justify-center p-6 md:p-12 z-20">
                        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl w-full">
                            {icons.filter((item) => item.active).map((item, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center gap-3.5 group cursor-pointer"
                                    onClick={() => {
                                        if (item.pageRoute.startsWith('http')) {
                                            window.open(item.pageRoute, '_blank', 'noopener,noreferrer');
                                        } else {
                                            router.push(item.pageRoute);
                                        }
                                    }}
                                >
                                    {/* App Icon Glass Capsule */}
                                    <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-tr from-white/[0.08] via-white/[0.04] to-white/0 border border-white/15 border-t-white/35 border-l-white/35 group-hover:border-emerald-400/40 rounded-[20px] shadow-[0_8px_32px_0_rgba(0,0,0,0.3),inset_0_1px_2px_rgba(255,255,255,0.15)] flex items-center justify-center transition-all duration-300 group-hover:scale-108 group-hover:-translate-y-1.5 group-hover:shadow-[0_15px_30px_rgba(16,185,129,0.25),inset_0_1px_2px_rgba(255,255,255,0.25)] relative overflow-hidden backdrop-blur-md">
                                        
                                        {/* Radial gradient glow on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/15 via-transparent to-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                        
                                        {/* Liquid Curved Highlight reflection */}
                                        <div className="absolute top-0 left-0 right-0 h-[45%] bg-gradient-to-b from-white/20 to-transparent pointer-events-none rounded-t-[20px]"></div>

                                        {/* Bottom shine */}
                                        <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-white/5 pointer-events-none"></div>

                                        <Image
                                            src={item.icon.src}
                                            alt={item.title}
                                            width={72}
                                            height={72}
                                            unoptimized={true}
                                            className="transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] z-10"
                                        />
                                    </div>
                                    <p className="text-white/85 text-xs md:text-sm font-semibold tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)] group-hover:text-emerald-300 transition-colors select-none">
                                        {item.title}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

CarPlayDevice.displayName = "CarPlayDevice";

export default CarPlayDevice;
