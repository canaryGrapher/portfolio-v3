"use client";

import React from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

interface RelatedWorkCardProps {
    title: string;
    preText: string;
    image: any;
    pageRoute: string;
    relatedWorkRef: any;
}

const RelatedWorkCard: React.FC<RelatedWorkCardProps> = ({
    title,
    preText,
    image,
    pageRoute,
    relatedWorkRef
}) => {
    const router = useRouter();
    return (
        <div
            ref={relatedWorkRef}
            className="relative h-40 md:h-80 overflow-hidden group transition-all duration-300 hover:border-transparent hover:shadow-[0_0_10px_rgba(255,255,255,0.6)] hover:shadow-indigo-500/50">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                />
                {/* Color Overlay */}
                <div className="absolute inset-0" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col justify-between p-8">
                {/* Top Content */}
                <div>
                    <p className="text-white/90 text-sm mb-2">
                        {preText}
                    </p>
                    <h3 className="text-white text-3xl font-bold">
                        {title}
                    </h3>
                </div>

                {/* Bottom Arrow Button */}
                <div className="flex justify-end">
                    <button
                        className="cursor-pointer w-12 h-12 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200 group-hover:bg-gray-100"
                        onClick={() => router.push(pageRoute)}
                    >
                        <FaArrowRight className="w-5 h-5 text-black" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RelatedWorkCard;