'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ImageKitService, OptimizedImageKitImage } from '@/app/lib/imagekit';
import RejectionImageCard from './RejectionImageCard';
import RejectionModal from './RejectionModal';
import { useLoading } from '@/app/contexts/LoadingContext';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

const RejectionsContent: React.FC = () => {
  const [images, setImages] = useState<OptimizedImageKitImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [columnsCount, setColumnsCount] = useState(1);
  const { addLoadingTask, removeLoadingTask } = useLoading();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const taskId = 'rejections-api';
    const fetchImages = async () => {
      try {
        setLoading(true);
        setError(null);
        addLoadingTask(taskId);
        const fetchedImages = await ImageKitService.getAllImages('/job-rejections');
        
        // Sort in descending order of date
        const sortedImages = [...fetchedImages].sort((a, b) => {
          const customMetaA = a.customMetadata as any;
          const customMetaB = b.customMetadata as any;
          const dateA = customMetaA?.date || a.embeddedMetadata?.DateTimeOriginal || a.embeddedMetadata?.DateCreated || a.createdAt;
          const dateB = customMetaB?.date || b.embeddedMetadata?.DateTimeOriginal || b.embeddedMetadata?.DateCreated || b.createdAt;
          
          const timeA = dateA ? new Date(dateA).getTime() : 0;
          const timeB = dateB ? new Date(dateB).getTime() : 0;
          
          return timeB - timeA;
        });

        setImages(sortedImages);
      } catch (err) {
        console.error('Error fetching rejection images:', err);
        setError('Failed to load rejection images. Please try again later.');
      } finally {
        setLoading(false);
        removeLoadingTask(taskId);
      }
    };

    fetchImages();
  }, [addLoadingTask, removeLoadingTask]);

  // Handle columns count resizing (hydration safe)
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) {
        setColumnsCount(1);
      } else if (window.innerWidth < 1024) {
        setColumnsCount(2);
      } else {
        setColumnsCount(3);
      }
    };
    
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // GSAP animation triggered when data finishes loading
  useGSAP(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll('.rejection-card-animate');
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
  }, { dependencies: [images, loading, columnsCount], scope: containerRef });

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
          <p className="text-gray-500 text-sm font-semibold">Loading rejections...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-center max-w-md mx-auto p-6 bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-2xl shadow-sm">
          <div className="text-4xl mb-4">📧</div>
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
          <div className="text-4xl mb-4">📧</div>
          <p className="text-gray-500 font-semibold">No rejection emails found. (That&apos;s actually a good thing!)</p>
        </div>
      </div>
    );
  }

  // Distribute cards into static arrays based on column count
  const distributedColumns = Array.from({ length: columnsCount }, () => [] as OptimizedImageKitImage[]);
  images.forEach((image, index) => {
    distributedColumns[index % columnsCount].push(image);
  });

  return (
    <div ref={containerRef}>
      <div className="py-6">
        <div className={`grid gap-6 ${
          columnsCount === 1 
            ? 'grid-cols-1' 
            : columnsCount === 2 
            ? 'grid-cols-2' 
            : 'grid-cols-3'
        }`}>
          {distributedColumns.map((colImages, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-6">
              {colImages.map((image) => {
                const originalIndex = images.findIndex(img => img.fileId === image.fileId);
                const tilts = ["polaroid-tilt-3", "polaroid-tilt-1", "polaroid-tilt-4", "polaroid-tilt-2", "polaroid-tilt-0"];
                const tiltClass = tilts[originalIndex % tilts.length];
                
                return (
                  <div
                    key={image.fileId}
                    className="rejection-card-animate opacity-0 w-full"
                  >
                    <div
                      onClick={() => handleImageClick(originalIndex)}
                      className={`w-full cursor-pointer transition-all duration-300 polaroid-tilt-hover group ${tiltClass}`}
                    >
                      <RejectionImageCard
                        image={image}
                        index={originalIndex}
                        onClick={() => handleImageClick(originalIndex)}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Rejection Modal */}
      <RejectionModal
        images={images}
        currentIndex={currentImageIndex}
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onNavigate={handleNavigate}
      />
    </div>
  );
};

export default RejectionsContent;

