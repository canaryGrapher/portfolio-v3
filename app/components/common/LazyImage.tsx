'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from '@/app/hooks';

interface LazyImageProps {
  src: string;
  alt: string;
  thumbnailSrc?: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  thumbnailSrc,
  className = '',
  width = 400,
  height = 400,
  priority = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  });

  const shouldLoadImage = hasIntersected || priority;

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg bg-gray-200 ${className}`}
      style={{ aspectRatio: '1/1' }}
    >
      {/* Placeholder/Thumbnail */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
          {thumbnailSrc && shouldLoadImage ? (
            <Image
              src={thumbnailSrc}
              alt=""
              width={width}
              height={height}
              className="object-cover opacity-50 blur-sm"
              style={{ width: '100%', height: '100%' }}
            />
          ) : (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Main Image */}
      {shouldLoadImage && !imageError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100%', height: '100%' }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          priority={priority}
        />
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
          <div className="text-center">
            <div className="text-2xl mb-2">📷</div>
            <div className="text-sm">Failed to load</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
