"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export const useNavigationLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isNavigating, setIsNavigating] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Reset loading state when route changes
    setIsNavigating(true);
    setIsLoading(true);

    const checkContentLoaded = () => {
      // Check if all images are loaded
      const images = document.querySelectorAll('img');
      const allImagesLoaded = Array.from(images).every(img => img.complete);
      
      // Check if all stylesheets are loaded
      const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
      const allStylesLoaded = Array.from(stylesheets).every(link => {
        const sheet = (link as HTMLLinkElement).sheet;
        return sheet !== null;
      });
      
      // Check if DOM is ready
      const domReady = document.readyState === 'complete';
      
      // Check fonts
      const fontsLoaded = document.fonts ? document.fonts.ready : Promise.resolve();
      
      // Wait for a minimum time to ensure smooth transition
      const minLoadTime = isNavigating ? 500 : 1000; // Shorter for navigation
      const startTime = Date.now();
      
      Promise.all([
        Promise.resolve(allImagesLoaded),
        Promise.resolve(allStylesLoaded),
        Promise.resolve(domReady),
        fontsLoaded,
        new Promise(resolve => setTimeout(resolve, Math.max(0, minLoadTime - (Date.now() - startTime))))
      ]).then(() => {
        // Add a small delay for smooth transition
        setTimeout(() => {
          setIsLoading(false);
          setIsNavigating(false);
        }, 200);
      });
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
  }, [pathname, searchParams, isNavigating]);

  return { isLoading, isNavigating };
};
