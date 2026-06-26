"use client";

import { useEffect, useState, useRef } from "react";

export const usePageLoading = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 1. Start smooth progress increments up to 95%
    const startProgressTimer = () => {
      progressIntervalRef.current = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev < 40) return prev + 3;
          if (prev < 70) return prev + 1.5;
          if (prev < 90) return prev + 0.6;
          if (prev < 97) return prev + 0.15;
          return prev; // Hold at 97% until assets are actually loaded
        });
      }, 60);
    };

    startProgressTimer();

    // 2. Track real assets
    let isMounted = true;
    let domLoaded = false;
    let fontsLoaded = false;
    let imagesLoaded = false;

    const checkCompletion = () => {
      if (domLoaded && fontsLoaded && imagesLoaded) {
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
        }
        setLoadingProgress(100);
        
        // Small delay to allow the progress bar to fill completely and be seen
        setTimeout(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        }, 300);
      }
    };

    // DOM Ready check
    if (document.readyState === "complete") {
      domLoaded = true;
    } else {
      const handleDomLoad = () => {
        domLoaded = true;
        checkCompletion();
      };
      window.addEventListener("load", handleDomLoad);
    }

    // Fonts Ready check
    if (document.fonts) {
      document.fonts.ready
        .then(() => {
          fontsLoaded = true;
          checkCompletion();
        })
        .catch(() => {
          // Fail gracefully if fonts.ready rejects
          fontsLoaded = true;
          checkCompletion();
        });
    } else {
      fontsLoaded = true;
    }

    // Images check
    const checkImages = () => {
      const images = Array.from(document.querySelectorAll("img"));
      if (images.length === 0) {
        imagesLoaded = true;
        checkCompletion();
        return;
      }

      let loadedCount = 0;
      const totalImages = images.length;

      const onImageLoad = () => {
        loadedCount++;
        if (loadedCount >= totalImages) {
          imagesLoaded = true;
          checkCompletion();
        }
      };

      images.forEach((img) => {
        if (img.complete) {
          onImageLoad();
        } else {
          img.addEventListener("load", onImageLoad);
          img.addEventListener("error", onImageLoad); // Count errors as loaded so we don't block
        }
      });
    };

    // Check images after a tiny delay so the DOM has rendered the initial elements
    const imgTimeout = setTimeout(checkImages, 50);

    // Fallback safety timeout (4 seconds)
    const safetyTimeout = setTimeout(() => {
      if (isMounted && isLoading) {
        domLoaded = true;
        fontsLoaded = true;
        imagesLoaded = true;
        checkCompletion();
      }
    }, 4000);

    return () => {
      isMounted = false;
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      clearTimeout(imgTimeout);
      clearTimeout(safetyTimeout);
      window.removeEventListener("load", checkCompletion);
    };
  }, []);

  return { isLoading, loadingProgress };
};
