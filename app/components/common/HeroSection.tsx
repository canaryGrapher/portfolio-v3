import React from 'react';
import Image from 'next/image';
import { Certificates } from '@/assets/images';

const HeroSection = () => {
    return (
        <div className="relative h-[120vh] max-w-7xl mx-auto overflow-hidden">
            <div className="relative inset-0 w-full h-[600px]">
                <Image
                    src={Certificates.certificateBG.src}
                    alt="Certificate Background"
                    fill
                    className="object-cover h-full w-full"
                />
            </div>
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/50 bg-opacity-50" />
            {/* </div> */}

            {/* Content */}
            <div className="absolute flex h-full flex-col justify-center text-white max-w-7xl mx-auto px-10 py-8">
                <h1 className="mb-4 text-5xl font-bold">Certificates</h1>
                <p className="max-w-2xl text-lg text-gray-200">
                    A tangible demonstration of specialized skills, increasing professional credibility, and facilitating continuous learning.
                </p>
            </div>
        </div>
    );
};

export default HeroSection;
