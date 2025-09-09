"use client";

import React, { forwardRef } from 'react';
import Image from 'next/image';
import { AbstractImageProps } from '@/interface/pages/Landing';

const AbstractImage = forwardRef<HTMLDivElement, AbstractImageProps>(
    ({ className = "", image }, ref) => {
        return (
            <div ref={ref} className={`absolute left-0 top-0 w-screen h-screen ${className}`}>
                <Image src={image} alt="abstract image" fill className="object-cover" />
            </div>
        );
    }
);

AbstractImage.displayName = "AbstractImage";

export default AbstractImage;
