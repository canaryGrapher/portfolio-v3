'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { OptimizedImageKitImage } from '@/app/lib/imagekit';
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa';

interface RejectionModalProps {
  images: OptimizedImageKitImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const RejectionModal: React.FC<RejectionModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const currentImage = images[currentIndex];

  // Preload image to detect when it's loaded
  useEffect(() => {
    if (!isOpen || !currentImage) return;

    setImageLoaded(false);
    const img = new window.Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = currentImage.url;

    return () => {
      img.onload = null;
    };
  }, [isOpen, currentImage, currentIndex]);

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

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80"
      onClick={onClose}
    >
      {/* Main Image Container */}
      <div
        className="relative max-w-6xl max-h-[80vh] w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrevious();
          }}
          className="absolute -left-20 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-blue-500 bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
        >
          <FaArrowLeft className="w-6 h-6 text-white" />
        </button>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute -right-20 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-blue-500 bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-all"
        >
          <FaArrowRight className="w-6 h-6 text-white" />
        </button>

        {/* Main Image */}
        <div className="relative bg-gray-200 rounded-lg overflow-hidden" style={{ aspectRatio: '2000/1454' }}>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}
          <div
            className={`w-full h-full transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `url(${currentImage.url})`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              minHeight: '400px',
            }}
          >
          </div>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnail Carousel */}
      <div className="w-full max-w-6xl px-4 pt-5">
        <div className="flex flex-row justify-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={image.fileId}
              onClick={(e) => {
                e.stopPropagation();
                onNavigate(index);
              }}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-blue-500 ring-2 ring-blue-500 ring-opacity-50'
                  : 'border-transparent hover:border-gray-400'
              }`}
              style={{ aspectRatio: '2000/1454' }}
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
      <div className="w-full flex justify-center pt-4">
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="cursor-pointer z-10 w-12 h-12 bg-blue-500 hover:border-2 hover:border-blue-500 bg-opacity-50 rounded-full flex items-center justify-center text-black hover:text-white hover:bg-opacity-70 transition-all"
        >
          <FaTimes className="w-6 h-6 text-white" />
        </button>
      </div>
    </div>
  );
};

export default RejectionModal;

