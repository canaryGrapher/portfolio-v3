"use client";

import React, { forwardRef } from 'react';
import { AbstractBackgroundProps } from '@/interface/pages/Landing';
import Image from 'next/image';

const AbstractBackground = forwardRef<HTMLDivElement, AbstractBackgroundProps>(
    ({ backgroundWallpaper }, ref) => {
        return (
            <div ref={ref} className="absolute w-full h-full z-20">
                <Image 
                    src={backgroundWallpaper} 
                    alt="background wallpaper" 
                    fill
                    className="object-cover"
                />
            </div>
        );
    }
);

AbstractBackground.displayName = "AbstractBackground";

export default AbstractBackground;
