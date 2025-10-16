"use client";

import { useEffect, useState } from "react";

export const usePageLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let progress = 0;
    const totalChecks = 4; // images, styles, fonts, dom

    const updateProgress = () => {
      progress += 1;
      setLoadingProgress((progress / totalChecks) * 100);
    };

    const checkContentLoaded = () => {
      // Check if all images are loaded
      const images = document.querySelectorAll('img');
      const allImagesLoaded = Array.from(images).every(img => img.complete);
      if (allImagesLoaded) updateProgress();

      // Check if all stylesheets are loaded
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      const allStylesLoaded = Array.from(stylesheets).every(link => {
        const sheet = (link as HTMLLinkElement).sheet;
        return sheet !== null;
      });
      if (allStylesLoaded) updateProgress();

      // Check if DOM is ready
      const domReady = document.readyState === 'complete';
      if (domReady) updateProgress();

      // Check fonts
      if (document.fonts) {
        document.fonts.ready.then(() => {
          updateProgress();
        });
      } else {
        updateProgress();
      }

      // Wait for a minimum time to ensure smooth transition
      const minLoadTime = 2000; // 2 seconds minimum
      const startTime = Date.now();
      
      const finalCheck = () => {
        const elapsed = Date.now() - startTime;
        const remainingTime = Math.max(0, minLoadTime - elapsed);
        
        setTimeout(() => {
          setIsLoading(false);
        }, remainingTime);
      };

      // Start final check after a short delay
      setTimeout(finalCheck, 100);
    };

    // Start checking after a short delay to allow initial rendering
    const timeoutId = setTimeout(checkContentLoaded, 100);
    
    // Also listen for load events
    window.addEventListener('load', checkContentLoaded);
    
    // Listen for font loading
    if (document.fonts) {
      document.fonts.ready.then(checkContentLoaded);
    }

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('load', checkContentLoaded);
    };
  }, []);

  return { isLoading, loadingProgress };
};
