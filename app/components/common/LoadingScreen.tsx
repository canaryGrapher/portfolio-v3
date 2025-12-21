"use client";

import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if this is the first launch
    const hasLaunchedBefore = localStorage.getItem("hasLaunched");
    
    if (!hasLaunchedBefore) {
      // First launch - show loading screen for 1 second
      setIsLoading(true);
      
      // Mark as launched
      localStorage.setItem("hasLaunched", "true");
      
      // Hide after 1 second
      const timer = setTimeout(() => {
        setIsLoading(false);
        onLoadingComplete?.();
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    } else {
      // Not first launch - don't show loading screen
      setIsLoading(false);
      onLoadingComplete?.();
    }
  }, [onLoadingComplete]);

  if (!isLoading) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center">
      {/* Main Text */}
      <div className="text-white text-2xl md:text-3xl font-light mb-8 tracking-wide">
        YashAryan.init()
      </div>
      
      {/* Loading Spinner */}
      <div className="relative w-12 h-12 mb-4">
        <div className="absolute inset-0 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
