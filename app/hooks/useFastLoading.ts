"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useFastLoading = () => {
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

    const hideLoading = () => {
      setTimeout(() => {
        setIsLoading(false);
        setIsNavigating(false);
      }, 100);
    };

    const checkAndHideLoading = () => {
      // Very fast loading times
      const minLoadTime = wasLoading ? 100 : 300;
      
      setTimeout(() => {
        // Only check DOM readiness, ignore images completely
        const domReady = document.readyState === 'complete';
        
        if (domReady) {
          hideLoading();
        } else {
          // Wait for DOM to be ready
          const checkDOM = () => {
            if (document.readyState === 'complete') {
              hideLoading();
            } else {
              setTimeout(checkDOM, 50);
            }
          };
          checkDOM();
        }
      }, minLoadTime);
    };

    // Start the loading check
    checkAndHideLoading();
    
    // Safety fallback: always hide after 3 seconds maximum
    const safetyTimeout = setTimeout(() => {
      setIsLoading(false);
      setIsNavigating(false);
    }, 3000);

    return () => {
      clearTimeout(safetyTimeout);
    };
  }, [pathname, isLoading]);

  return { isLoading, isNavigating, progress: 0 };
};
