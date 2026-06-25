'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useIntersectionObserver } from '@/app/hooks';
import { OptimizedImageKitImage } from '@/app/lib/imagekit';

interface RejectionImageCardProps {
  image: OptimizedImageKitImage;
  index: number;
  onClick: () => void;
}

const cleanFileName = (fileName: string) => {
  let name = fileName.replace(/\.[^/.]+$/, "");
  name = name.replace(/\brejection\b/gi, "");
  name = name.replace(/\bemail\b/gi, "");
  name = name.replace(/[_-]/g, " ");
  name = name.replace(/\s+/g, " ").trim();
  name = name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  return name || "Rejection Letter";
};

const formatCapturedDate = (dateStr?: string) => {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return dateStr;
  }
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric'
  });
};

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

  const customMeta = image.customMetadata as any;
  const company = customMeta?.company || cleanFileName(image.name);
  const role = customMeta?.role || "Job Rejection";
  const dateStr = customMeta?.date || image.embeddedMetadata?.DateTimeOriginal || image.embeddedMetadata?.DateCreated || image.createdAt;
  const formattedDate = formatCapturedDate(dateStr);

  return (
    <div
      ref={ref}
      onClick={onClick}
      className="cursor-pointer rounded-2xl overflow-hidden border border-gray-200/80 bg-white/90 backdrop-blur-sm p-4 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col gap-3 w-full"
    >
      {/* Screenshot Image Container */}
      <div className="relative overflow-hidden rounded-xl bg-white border border-gray-100 w-full">
        {/* Loading Spinner */}
        {!imageLoaded && shouldLoadImage && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50/50 z-10">
            <div className="w-8 h-8 border-2 border-gray-200 border-t-green-800 rounded-full animate-spin" />
          </div>
        )}

        {shouldLoadImage && (
          <Image
            src={image.optimizedUrl}
            alt={image.name || `Rejection Letter ${index + 1}`}
            width={image.width || 800}
            height={image.height || 600}
            className={`w-full h-auto object-contain transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            unoptimized
          />
        )}
      </div>

      {/* Card Caption */}
      <div className="px-1.5 flex flex-col gap-0.5">
        <div className="flex items-start justify-between gap-3">
          <span className="text-xs font-bold text-gray-800 group-hover:text-green-800 transition-colors tracking-wide leading-tight line-clamp-1">
            {company}
          </span>
        </div>
        <div className="text-[10px] font-semibold text-gray-400 flex items-center justify-between mt-1">
          <span className="truncate">{role}</span>
          {formattedDate && <span className="shrink-0">{formattedDate}</span>}
        </div>
      </div>
    </div>
  );
};

export default RejectionImageCard;

