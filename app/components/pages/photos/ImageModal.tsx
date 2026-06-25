'use client';

import React, { useCallback, useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { OptimizedImageKitImage } from '@/app/lib/imagekit';
import { 
  FaArrowLeft, 
  FaArrowRight, 
  FaTimes, 
  FaMapMarkerAlt, 
  FaCalendarAlt, 
  FaCamera, 
  FaInfoCircle, 
  FaExpand,
  FaHashtag
} from 'react-icons/fa';

interface ImageModalProps {
  images: OptimizedImageKitImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

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

const formatFileSize = (bytes?: number) => {
  if (!bytes) return '';
  if (bytes < 1024) return `${bytes} B`;
  const kb = bytes / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
};

const ImageModal: React.FC<ImageModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  const currentImage = images[currentIndex];

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

  useEffect(() => {
    setImageLoaded(false);
    setImageError(false);

    const img = imgRef.current;
    if (!img) return;

    const handleLoad = () => {
      setImageLoaded(true);
    };

    const handleError = () => {
      setImageError(true);
    };

    // Check if already completed (e.g. from cache)
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

    // Double check complete state
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
  }, [currentIndex, currentImage?.url]);

  if (!isOpen || !currentImage) return null;

  // Extract metadata variables
  const customMeta = currentImage.customMetadata || {};
  const location = customMeta.location || '';
  const state = customMeta.state || '';
  const country = customMeta.country || '';
  const description = customMeta.description || '';
  
  const locationString = [location, state, country].filter(Boolean).join(', ');
  
  const title = description || locationString || "Captured Moment";
  const subtitle = description ? locationString : "";
  
  const dateStr = customMeta.captured_date || currentImage?.embeddedMetadata?.DateTimeOriginal || currentImage?.embeddedMetadata?.DateCreated || currentImage?.createdAt;
  const formattedDate = formatCapturedDate(dateStr);

  // EXIF Details
  const exif = currentImage.embeddedMetadata || {};
  const cameraModel = exif.Model || exif.Make ? `${exif.Make || ''} ${exif.Model || ''}`.trim() : null;
  const exposureTime = exif.ExposureTime || null;
  const aperture = exif.FNumber ? `f/${exif.FNumber}` : null;
  const iso = exif.ISO ? `ISO ${exif.ISO}` : null;
  const focalLength = exif.FocalLength ? `${exif.FocalLength}` : null;

  const hasExif = !!(cameraModel || exposureTime || aperture || iso || focalLength);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 md:p-6 lg:p-8"
      onClick={onClose}
    >
      {/* Immersive Split Panel Container */}
      <div
        className="relative flex flex-col md:flex-row w-full max-w-6xl h-full md:h-[80vh] bg-[#101012] border border-white/10 rounded-3xl overflow-hidden shadow-2xl transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Side: Photo Container */}
        <div className="relative flex-1 bg-black/40 flex flex-col items-center justify-center p-4 min-h-[40vh] md:h-full group/viewer">
          
          {/* Top Left Floating Indicator */}
          <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[10px] font-extrabold tracking-wider text-gray-300 pointer-events-none select-none">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Navigation Controls overlaying Image */}
          <button
            onClick={handlePrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-black/40 hover:bg-green-800 text-white rounded-full flex items-center justify-center transition-all border border-white/5 shadow-md active:scale-95 cursor-pointer opacity-0 group-hover/viewer:opacity-100 duration-300 md:-translate-x-2 group-hover/viewer:translate-x-0"
          >
            <FaArrowLeft className="w-4 h-4" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-11 h-11 bg-black/40 hover:bg-green-800 text-white rounded-full flex items-center justify-center transition-all border border-white/5 shadow-md active:scale-95 cursor-pointer opacity-0 group-hover/viewer:opacity-100 duration-300 md:translate-x-2 group-hover/viewer:translate-x-0"
          >
            <FaArrowRight className="w-4 h-4" />
          </button>

          {/* Main Visual Frame */}
          <div className="relative w-full h-full flex items-center justify-center max-h-[35vh] md:max-h-[62vh] w-full">
            {!imageLoaded && !imageError && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-gray-600 border-t-green-600 rounded-full animate-spin" />
              </div>
            )}
            
            {imageError ? (
              <div className="flex flex-col items-center justify-center bg-[#18181b] text-gray-400 p-8 border border-dashed border-white/10 rounded-2xl max-w-sm w-full mx-4">
                <div className="text-3xl mb-3">🚫</div>
                <div className="text-xs font-extrabold uppercase tracking-wider text-gray-400 dark:text-gray-500 text-center leading-relaxed">
                  {currentImage.url.toLowerCase().includes('.heic') || currentImage.url.toLowerCase().includes('.heif')
                    ? 'image not supported on this browser'
                    : 'failed to load image'}
                </div>
              </div>
            ) : (
              <Image
                ref={imgRef}
                src={currentImage.url}
                alt={currentImage.name || `Photo ${currentIndex + 1}`}
                width={1600}
                height={1200}
                className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                priority
                unoptimized
              />
            )}
          </div>

          {/* Slider Thumbnails Overlay at Bottom */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full max-w-[85%] bg-black/35 backdrop-blur-md px-3 py-2 rounded-2xl border border-white/5 flex gap-2 overflow-x-auto scrollbar-hide z-10">
            {images.map((image, index) => (
              <button
                key={image.fileId}
                onClick={() => onNavigate(index)}
                className={`flex-shrink-0 w-10 h-10 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                  index === currentIndex
                    ? 'border-green-600 ring-2 ring-green-600/30'
                    : 'border-transparent hover:border-gray-500'
                }`}
              >
                <Image
                  src={image.thumbnailUrl}
                  alt={image.name || `Thumbnail ${index + 1}`}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                  unoptimized
                />
              </button>
            ))}
          </div>

        </div>

        {/* Right Side: Details Panel */}
        <div className="w-full md:w-[340px] lg:w-[380px] flex flex-col bg-[#141416] border-t md:border-t-0 md:border-l border-white/10 h-[45vh] md:h-full">
          
          {/* Header Bar */}
          <div className="flex items-center justify-between p-5 border-b border-white/5 shrink-0">
            <span className="text-[10px] font-extrabold tracking-widest text-green-500 uppercase">
              Photo details
            </span>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/5 flex items-center justify-center transition-colors cursor-pointer group"
            >
              <FaTimes className="w-3.5 h-3.5 text-gray-400 group-hover:text-white" />
            </button>
          </div>

          {/* Scrollable details view */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
            
            {/* Title / Description */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white leading-snug">
                {title}
              </h3>
              {subtitle && (
                <p className="text-xs text-gray-400 font-medium">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Geographic & Temporal Info Card */}
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-3.5 text-xs">
              {locationString && (
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <div className="font-semibold text-gray-300">Location</div>
                    <div className="text-gray-400 text-[11px]">{locationString}</div>
                  </div>
                </div>
              )}
              
              {formattedDate && (
                <div className="flex items-start gap-3">
                  <FaCalendarAlt className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <div className="space-y-0.5">
                    <div className="font-semibold text-gray-300">Captured Date</div>
                    <div className="text-gray-400 text-[11px]">{formattedDate}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Technical Camera specs Grid */}
            {hasExif && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <FaCamera className="w-3.5 h-3.5 text-green-500" />
                  <span>Camera Specifications</span>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {cameraModel && (
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Device</div>
                      <div className="text-[11px] font-semibold text-gray-300 truncate" title={cameraModel}>
                        {cameraModel}
                      </div>
                    </div>
                  )}
                  {aperture && (
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Aperture</div>
                      <div className="text-[11px] font-semibold text-gray-300">{aperture}</div>
                    </div>
                  )}
                  {exposureTime && (
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Shutter Speed</div>
                      <div className="text-[11px] font-semibold text-gray-300">{exposureTime}s</div>
                    </div>
                  )}
                  {iso && (
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1">
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">ISO</div>
                      <div className="text-[11px] font-semibold text-gray-300">{iso}</div>
                    </div>
                  )}
                  {focalLength && (
                    <div className="p-3 bg-white/[0.02] border border-white/5 rounded-xl space-y-1 col-span-2">
                      <div className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Focal Length</div>
                      <div className="text-[11px] font-semibold text-gray-300">{focalLength}</div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* File Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                <FaInfoCircle className="w-3.5 h-3.5 text-green-500" />
                <span>File Specifications</span>
              </div>
              <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl space-y-2.5 text-xs">
                {currentImage.width && currentImage.height && (
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-semibold">Dimensions</span>
                    <span className="text-gray-300 font-medium">
                      {currentImage.width} × {currentImage.height} px
                    </span>
                  </div>
                )}
                {currentImage.size && (
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-semibold">File Size</span>
                    <span className="text-gray-300 font-medium">
                      {formatFileSize(currentImage.size)}
                    </span>
                  </div>
                )}
                {currentImage.mime && (
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-500 font-semibold">Format</span>
                    <span className="text-gray-300 font-medium">
                      {currentImage.mime.split('/')[1]?.toUpperCase() || 'Unknown'}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Library Tags */}
            {currentImage.tags && currentImage.tags.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400">
                  <FaHashtag className="w-3.5 h-3.5 text-green-500" />
                  <span>Library Tags</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {currentImage.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/5 hover:bg-white/10 text-gray-300 text-[10px] font-semibold px-2.5 py-1 rounded-full border border-white/5 transition-colors select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Action Footer */}
          <div className="p-5 border-t border-white/5 bg-[#121214] flex gap-2 shrink-0">
            <a
              href={currentImage.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-800 hover:bg-green-700 text-white font-bold text-[11px] uppercase tracking-wider py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-98"
            >
              <FaExpand className="w-3 h-3" />
              <span>View Original</span>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ImageModal;
