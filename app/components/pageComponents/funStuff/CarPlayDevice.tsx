"use client";

import React, { forwardRef } from 'react';
import Image from 'next/image';
import { FaWifi } from "react-icons/fa";

interface CarPlayDeviceProps {
    className?: string;
    icons: any[];
}

const CarPlayDevice = forwardRef<HTMLDivElement, CarPlayDeviceProps>(
    ({ className = "", icons }, ref) => {
        return (
            <div
                ref={ref}
                className={`md:my-10 mx-auto w-full min-h-[500px] h-full md:bg-white/20 backdrop-blur-xl rounded-[20px] md:border border-white/20 flex flex-col md:flex-row-reverse justify-between relative ${className}`}
            >
                {/* Status Bar */}
                <div className="hidden md:flex flex-col justify-between bg-white/40 backdrop-blur-xl rounded-tr-[20px] rounded-br-[20px] w-[80px]">
                    <div className="flex-col justify-start w-full">
                        <div className="text-black text-xl font-bold text-center mt-5">10:36</div>
                        <FaWifi className="text-black text-3xl mx-auto mt-2" />
                    </div>
                    {/* Grid Icon */}
                    <div className="mx-auto w-full mb-4">
                        <div className="w-8 h-8 grid grid-cols-3 gap-1 mx-auto">
                            {Array.from({ length: 9 }).map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 bg-black rounded-full"></div>
                            ))}
                        </div>
                    </div>
                </div>


                {/* App Grid */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-5 p-18">
                    {icons.slice(0, 4).map((item, index) => (
                        <div key={index} className="p-4 text-center transition-all duration-300 cursor-pointer hover:scale-105">
                            <div className="block mx-auto mb-2">
                                <Image
                                    src={item.icon.src}
                                    alt={item.title}
                                    width={100}
                                    height={100}
                                    className="text-white"
                                />
                            </div>
                            <p className="text-white text-sm font-medium mx-auto">{item.title}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
);

CarPlayDevice.displayName = "CarPlayDevice";

export default CarPlayDevice;
