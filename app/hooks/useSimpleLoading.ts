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
      // Much faster loading times
      const minLoadTime = wasLoading ? 200 : 500;
      
      setTimeout(() => {
        // Only check for critical images (not lazy-loaded ones)
        const criticalImages = document.querySelectorAll('img:not([loading="lazy"]):not([data-lazy])');
        const criticalImagesLoaded =
          criticalImages.length === 0 ||
          Array.from(criticalImages).every(img =>
            (img as HTMLImageElement).complete
          );
        
        // Check if DOM is ready
        const domReady = document.readyState === 'complete';
        // If critical content is ready, hide loading quickly
        if (criticalImagesLoaded && domReady) {
          setTimeout(() => {
            setIsLoading(false);
            setIsNavigating(false);
          }, 100);
        } else {
          // Fallback: hide after maximum 3 seconds
          setTimeout(() => {
            setIsLoading(false);
            setIsNavigating(false);
          }, 3000);
        }
      }, minLoadTime);
    };

    // Start the loading check
    checkAndHideLoading();
  }, [pathname, isLoading]);

  return { isLoading, isNavigating, progress: 0 };
};
