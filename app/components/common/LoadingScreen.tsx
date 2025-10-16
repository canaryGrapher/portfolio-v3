"use client";

import { useSimpleLoading } from "../../hooks";
import { useLoading } from "../../contexts/LoadingContext";

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const { isLoading: contentLoading } = useSimpleLoading();
  const { isLoading: globalLoading } = useLoading();
  
  const isLoading = contentLoading || globalLoading;

  if (!isLoading) {
    onLoadingComplete?.();
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
