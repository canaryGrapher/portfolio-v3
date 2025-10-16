"use client";

import { useEffect, useState, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface LoadingState {
  isLoading: boolean;
  isNavigating: boolean;
  progress: number;
}

export const useContentLoading = () => {
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    isNavigating: false,
    progress: 0
  });
  
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const checkContentLoaded = useCallback(() => {
    return new Promise<void>((resolve) => {
      let completedChecks = 0;
      const totalChecks = 4;

      const updateProgress = () => {
        completedChecks++;
        const progress = (completedChecks / totalChecks) * 100;
        setLoadingState(prev => ({ ...prev, progress }));
        
        if (completedChecks === totalChecks) {
          resolve();
        }
      };

      // Check if all images are loaded
      const images = document.querySelectorAll('img');
      if (images.length === 0) {
        updateProgress();
      } else {
        const allImagesLoaded = Array.from(images).every(img => img.complete);
        if (allImagesLoaded) {
          updateProgress();
        } else {
          // Wait for images to load
          const imagePromises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise<void>((imgResolve) => {
              img.onload = () => imgResolve();
              img.onerror = () => imgResolve(); // Resolve even on error
            });
          });
          Promise.all(imagePromises).then(() => updateProgress());
        }
      }

      // Check if all stylesheets are loaded
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      const allStylesLoaded = Array.from(stylesheets).every(link => {
        const sheet = (link as HTMLLinkElement).sheet;
        return sheet !== null;
      });
      if (allStylesLoaded) updateProgress();

      // Check if DOM is ready
      const domReady = document.readyState === 'complete';
      if (domReady) {
        updateProgress();
      } else {
        window.addEventListener('load', () => updateProgress(), { once: true });
      }

      // Check fonts
      if (document.fonts) {
        document.fonts.ready.then(() => updateProgress());
      } else {
        updateProgress();
      }
    });
  }, []);

  useEffect(() => {
    // Reset loading state when route changes
    const wasLoading = loadingState.isLoading;
    setLoadingState(prev => ({
      isLoading: true,
      isNavigating: wasLoading, // Set navigating to true if we were already loading
      progress: 0
    }));

    const performLoadingCheck = async () => {
      try {
        await checkContentLoaded();
        
        // Wait for a minimum time to ensure smooth transition
        const minLoadTime = wasLoading ? 800 : 1500;
        const startTime = Date.now();
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsed);
        
        await new Promise(resolve => setTimeout(resolve, remainingTime));
        
        // Add a small delay for smooth transition
        setTimeout(() => {
          setLoadingState(prev => ({
            ...prev,
            isLoading: false,
            isNavigating: false
          }));
        }, 200);
        
      } catch (error) {
        console.error('Loading check failed:', error);
        // Fallback: hide loading after a reasonable time
        setTimeout(() => {
          setLoadingState(prev => ({
            ...prev,
            isLoading: false,
            isNavigating: false
          }));
        }, 2000);
      }
    };

    // Start checking after a short delay to allow initial rendering
    const timeoutId = setTimeout(performLoadingCheck, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams, checkContentLoaded]);

  return loadingState;
};
