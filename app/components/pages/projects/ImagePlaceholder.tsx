import React from 'react';
import { Projects } from '@/assets/images';
import { ImagePlaceholderProps } from './types';

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ isWideBox, imageIndex, span = 1 }) => {
    // Get the appropriate image based on type and order
    let backgroundImage;
    if (isWideBox) {
        // Wide images: cycle through WideImage1, WideImage2, then back to WideImage1
        const wideImageName = `WideImage${((imageIndex - 1) % 2) + 1}` as keyof typeof Projects.FillerImages;
        backgroundImage = Projects.FillerImages[wideImageName];
    } else {
        // Single images: use SquareImage1 for all single boxes
        backgroundImage = Projects.FillerImages.SquareImage1;
    }

    return (
        <div
            className={`hidden md:block relative bg-black items-center justify-center ${span === 2 ? 'md:col-span-2' : ''}`}
            style={{
                backgroundImage: `url(${backgroundImage?.src || backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="absolute inset-0 bg-black/50 bg-opacity-30" />
            <div className="relative text-white text-sm font-medium" />
        </div>
    );
};

export default ImagePlaceholder;
