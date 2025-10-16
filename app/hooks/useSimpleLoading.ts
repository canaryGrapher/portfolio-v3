"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useSimpleLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Set navigating to true if we're already loading (route change)
    const wasLoading = isLoading;
    if (wasLoading) {
      setIsNavigating(true);
    }
    
    // Reset loading state
    setIsLoading(true);

    const checkAndHideLoading = () => {
      // Simple timeout-based loading with minimum display time
      const minLoadTime = wasLoading ? 1000 : 2000;
      
      setTimeout(() => {
        // Check if images are loaded
        const images = document.querySelectorAll('img');
        const allImagesLoaded = images.length === 0 || Array.from(images).every(img => img.complete);
        
        // Check if DOM is ready
        const domReady = document.readyState === 'complete';
        
        // If everything is ready, hide loading
        if (allImagesLoaded && domReady) {
          setTimeout(() => {
            setIsLoading(false);
            setIsNavigating(false);
          }, 300);
        } else {
          // Fallback: hide after maximum time
          setTimeout(() => {
            setIsLoading(false);
            setIsNavigating(false);
          }, 3000);
        }
      }, minLoadTime);
    };

    // Start the loading check
    checkAndHideLoading();
  }, [pathname]);

  return { isLoading, isNavigating, progress: 0 };
};
