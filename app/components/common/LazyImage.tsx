'use client';

import React, { useState, useRef, useEffect } from 'react';
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
  aspectRatio?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  thumbnailSrc,
  className = '',
  width = 400,
  height = 400,
  priority = false,
  aspectRatio = '1/1',
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true,
  });

  const shouldLoadImage = hasIntersected || priority;

  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      setImageLoaded(true);
    };

    const handleError = () => {
      setImageError(true);
    };

    // If it's already complete (cached), set state immediately
    if (img.complete) {
      if (img.naturalWidth > 0) {
        setImageLoaded(true);
      } else {
        setImageError(true);
      }
      return;
    }

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    // Double-check complete state in case it changed during listener registration
    if (img.complete) {
      if (img.naturalWidth > 0) {
        setImageLoaded(true);
      } else {
        setImageError(true);
      }
    }

    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [src, shouldLoadImage]);

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-lg bg-gray-200 ${className}`}
      style={{ aspectRatio: aspectRatio }}
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
              className="object-contain opacity-50 blur-sm"
              style={{ width: '100%', height: '100%' }}
              unoptimized
            />
          ) : (
            <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Main Image */}
      {shouldLoadImage && !imageError && (
        <Image
          ref={imgRef}
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`object-contain transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ width: '100%', height: '100%' }}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageError(true)}
          priority={priority}
          unoptimized
        />
      )}

      {/* Error State */}
      {imageError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100/50 dark:bg-neutral-900/50 text-gray-400 p-4 border border-dashed border-gray-300 dark:border-neutral-800 rounded-2xl">
          <div className="text-center max-w-[90%]">
            <div className="text-xl mb-1.5">🚫</div>
            <div className="text-[10px] font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 leading-snug">
              {src.toLowerCase().includes('.heic') || src.toLowerCase().includes('.heif')
                ? 'image not supported on this browser'
                : 'failed to load image'}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyImage;
