'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { OptimizedImageKitImage } from '@/app/lib/imagekit';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

interface RejectionModalProps {
  images: OptimizedImageKitImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
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

const RejectionModal: React.FC<RejectionModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentImage = images[currentIndex];

  // Reset imageLoaded state when moving to another image
  useEffect(() => {
    if (isOpen && currentImage) {
      setImageLoaded(false);
    }
  }, [currentIndex, isOpen, currentImage]);

  const handlePrevious = useCallback(() => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    onNavigate(newIndex);
  }, [currentIndex, onNavigate, images.length]);

  const handleNext = useCallback(() => {
    const newIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    onNavigate(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'Escape':
        onClose();
        break;
      case 'ArrowLeft':
        handlePrevious();
        break;
      case 'ArrowRight':
        handleNext();
        break;
    }
  }, [isOpen, onClose, handlePrevious, handleNext]);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentIndex, handleKeyDown]);

  if (!isOpen || !currentImage) return null;

  const customMeta = currentImage.customMetadata as any;
  const company = customMeta?.company || cleanFileName(currentImage.name);
  const role = customMeta?.role || "Job Rejection";
  const dateStr = customMeta?.date || currentImage.embeddedMetadata?.DateTimeOriginal || currentImage.embeddedMetadata?.DateCreated || currentImage.createdAt;
  const formattedDate = formatCapturedDate(dateStr);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 md:p-6 lg:p-8"
      onClick={onClose}
    >
      {/* Immersive Dark Container */}
      <div
        className="relative flex flex-col w-full max-w-5xl h-[85vh] bg-[#101012]/95 border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-5 md:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Section */}
        <div className="flex items-center justify-between gap-4 pb-4 border-b border-white/5 mb-4 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm md:text-base font-extrabold text-white tracking-wide">
                {company}
              </h3>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-green-500/10 text-green-400 border border-green-500/20">
                {role}
              </span>
            </div>
            {formattedDate && (
              <p className="text-[10px] text-gray-500 font-semibold mt-1">
                Received in {formattedDate}
              </p>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Index indicator */}
            <span className="text-[10px] font-extrabold tracking-wider text-gray-400 bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-xl">
              {currentIndex + 1} / {images.length}
            </span>
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2.5 bg-white/5 hover:bg-green-800 hover:text-white text-gray-400 rounded-full border border-white/5 transition-all cursor-pointer active:scale-95"
            >
              <FaTimes className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Image View */}
        <div className="relative flex-1 flex items-center justify-center bg-black/40 rounded-2xl border border-white/5 overflow-hidden p-4 group/viewer min-h-0">
          
          {/* Previous Arrow Button */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-black/40 hover:bg-green-800 text-white rounded-full flex items-center justify-center transition-all border border-white/5 shadow-md active:scale-95 cursor-pointer opacity-0 group-hover/viewer:opacity-100 duration-300"
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>

          {/* Next Arrow Button */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-black/40 hover:bg-green-800 text-white rounded-full flex items-center justify-center transition-all border border-white/5 shadow-md active:scale-95 cursor-pointer opacity-0 group-hover/viewer:opacity-100 duration-300"
          >
            <FaArrowRight className="w-4 h-4" />
          </button>

          {/* Main Visual Frame */}
          <div className="relative w-full h-full flex items-center justify-center">
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-600 border-t-green-600 rounded-full animate-spin" />
              </div>
            )}
            <Image
              src={currentImage.url}
              alt={currentImage.name || `Rejection Letter ${currentIndex + 1}`}
              width={2000}
              height={1454}
              className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              priority
              unoptimized
            />
          </div>
        </div>

        {/* Thumbnail Carousel */}
        <div className="w-full pt-4 border-t border-white/5 mt-4 shrink-0">
          <div className="flex flex-row justify-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {images.map((image, index) => (
              <button
                key={image.fileId}
                onClick={() => onNavigate(index)}
                className={`flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  index === currentIndex
                    ? 'border-green-600 ring-2 ring-green-600/30'
                    : 'border-transparent hover:border-gray-500'
                }`}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${image.thumbnailUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RejectionModal;

