'use client';

import React, { useState, useEffect } from 'react';
import { useIntersectionObserver } from '@/app/hooks';
import { OptimizedImageKitImage } from '@/app/lib/imagekit';

interface RejectionImageCardProps {
  image: OptimizedImageKitImage;
  index: number;
  onClick: () => void;
}

const RejectionImageCard: React.FC<RejectionImageCardProps> = ({
  image,
  index,
  onClick,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  });

  const shouldLoadImage = hasIntersected || index < 4;

  // Preload image to detect when it's loaded
  useEffect(() => {
    if (!shouldLoadImage) return;

    const img = new window.Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = image.optimizedUrl;

    return () => {
      img.onload = null;
    };
  }, [shouldLoadImage, image.optimizedUrl]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="cursor-pointer rounded-lg overflow-hidden bg-gray-200 hover:scale-105 transition-transform duration-300 relative"
      style={{
        aspectRatio: '2000/1454',
      }}
    >
      {/* Loading Spinner */}
      {!imageLoaded && shouldLoadImage && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 z-10">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
        </div>
      )}

      {/* Background Image */}
      {shouldLoadImage && (
        <div
          className={`absolute inset-0 transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: imageLoaded 
              ? `url(${image.url})` 
              : `url(${image.thumbnailUrl || image.optimizedUrl})`,
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        />
      )}
    </div>
  );
};

export default RejectionImageCard;

