'use client';

import React, { useEffect, useState, useRef } from 'react';
import { LazyImage } from '@/components/common';
import { ImageKitService, OptimizedImageKitImage } from '@/app/lib/imagekit';
import ImageModal from './ImageModal';
import { useLoading } from '@/app/contexts/LoadingContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

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

const PhotosContent: React.FC = () => {
  const [images, setImages] = useState<OptimizedImageKitImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const { addLoadingTask, removeLoadingTask } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const taskId = 'photos-api';
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        addLoadingTask(taskId);
        const fetchedImages = await ImageKitService.getAllImages('/captures');
        setImages(fetchedImages);
      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images. Please try again later.');
      } finally {
        setLoading(false);
        removeLoadingTask(taskId);
      }
    };

    fetchImages();
  }, [addLoadingTask, removeLoadingTask]);

  // GSAP Animation triggered when data finishes loading
  useGSAP(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.photo-card-animate');
    if (cards.length > 0) {
      gsap.set(cards, { opacity: 0, y: 24, scale: 0.96 });
      gsap.fromTo(cards,
        { opacity: 0, y: 24, scale: 0.96 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.5, 
          stagger: 0.04, 
          ease: 'power3.out',
          overwrite: 'auto'
        }
      );
    }
  }, { dependencies: [images, loading], scope: containerRef });

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleNavigate = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gray-200 border-t-green-800 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm font-semibold">Loading photos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center max-w-md mx-auto p-6 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
          <div className="text-4xl mb-4">📷</div>
          <p className="text-red-600 mb-4 font-semibold text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-5 py-2.5 bg-green-800 text-white rounded-xl hover:bg-green-955 transition-colors border border-green-700/50 shadow-sm text-xs font-bold uppercase tracking-wider cursor-pointer"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center max-w-md mx-auto p-8 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
          <div className="text-4xl mb-4">📷</div>
          <p className="text-gray-500 font-semibold">No photos found in the gallery.</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      
      {/* Masonry Columns Gallery */}
      <div className="py-2">
        <div className="masonry-gallery w-full">
          {images.map((image, index) => {
            // Natural photo aspect ratio
            const aspectRatio = image.width && image.height ? `${image.width}/${image.height}` : '1/1';
            
            // Physical scatter rotation tilts
            const tilts = ["polaroid-tilt-3", "polaroid-tilt-1", "polaroid-tilt-4", "polaroid-tilt-2", "polaroid-tilt-0"];
            const tiltClass = tilts[index % tilts.length];
            
            // Custom Metadata Extraction
            const customMeta = image.customMetadata || {};
            const location = customMeta.location || '';
            const state = customMeta.state || '';
            const country = customMeta.country || '';
            const description = customMeta.description || '';
            
            const locationParts = [location, state, country].filter(Boolean);
            const locationString = locationParts.join(', ');
            
            const title = description || locationString || "Captured Moment";
            const subtitle = description ? locationString : "";
            
            const dateStr = customMeta.captured_date || image.embeddedMetadata?.DateTimeOriginal || image.embeddedMetadata?.DateCreated || image.createdAt;
            const formattedDate = formatCapturedDate(dateStr);
            
            return (
              <div
                key={image.fileId}
                className="masonry-item"
              >
                <div className="photo-card-animate opacity-0 w-full">
                  <div
                    onClick={() => handleImageClick(index)}
                    className={`w-full cursor-pointer transition-all duration-300 polaroid-tilt-hover group ${tiltClass}`}
                  >
                    {/* Image Container (No borders, rounded edges) */}
                    <div className="relative overflow-hidden rounded-2xl bg-gray-50/50 shadow-sm group-hover:shadow-xl transition-shadow duration-300">
                      <LazyImage
                        src={image.optimizedUrl}
                        alt={image.name || `Photo ${index + 1}`}
                        thumbnailSrc={image.thumbnailUrl}
                        priority={index < 4}
                        aspectRatio={aspectRatio}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Pinterest-style Caption */}
                    <div className="mt-3 px-1.5 flex flex-col gap-0.5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="text-[11px] font-bold text-gray-800 group-hover:text-green-800 transition-colors tracking-wide leading-tight line-clamp-2">
                          {title}
                        </span>
                      </div>
                      {(subtitle || formattedDate) && (
                        <div className="text-[9px] font-semibold text-gray-400 flex items-center justify-between gap-2 mt-0.5">
                          <span className="truncate">{subtitle}</span>
                          {formattedDate && <span className="shrink-0">{formattedDate}</span>}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        images={images}
        currentIndex={currentImageIndex}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default PhotosContent;