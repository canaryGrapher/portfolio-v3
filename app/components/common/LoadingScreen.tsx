"use client";

import { useEffect, useState } from "react";
import { usePageLoading } from "../../hooks/usePageLoading";

const LoadingScreen = () => {
  const { isLoading, loadingProgress } = usePageLoading();
  const [showScreen, setShowScreen] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsFadingOut(true);
      // Wait for the exit transition (700ms) to complete before removing from DOM
      const timer = setTimeout(() => {
        setShowScreen(false);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!showScreen) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-[700ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFadingOut ? "opacity-0 scale-[1.03] pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{
        background: "radial-gradient(circle at center, rgba(16, 185, 129, 0.08) 0%, #09090b 100%)",
        backgroundColor: "#09090b",
      }}
    >
      {/* Dev-themed Title */}
      <div className="text-white text-xl md:text-2xl font-mono tracking-wide mb-3 select-none flex items-center">
        <span className="text-emerald-500 font-bold mr-2 select-none">&gt;</span>
        <span>YashAryan</span>
        <span className="text-emerald-400 font-semibold select-none">.init()</span>
      </div>

      {/* Loading Status */}
      <div className="text-[10px] tracking-[0.25em] font-mono text-emerald-400/80 font-bold mb-6 select-none uppercase h-4">
        {loadingProgress < 100 ? (
          <span className="flex items-center gap-1">
            <span>Initializing system...</span>
            <span className="text-emerald-400 font-black">{Math.round(loadingProgress)}%</span>
          </span>
        ) : (
          <span className="text-emerald-400 animate-pulse font-black">Ready</span>
        )}
      </div>

      {/* Progress Bar Container */}
      <div className="w-56 sm:w-64 h-[3px] bg-zinc-900/80 rounded-full overflow-hidden border border-white/5 relative">
        {/* Glow indicator */}
        <div
          className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-150 ease-out"
          style={{
            width: `${loadingProgress}%`,
            boxShadow: "0 0 10px rgba(16, 185, 129, 0.6), 0 0 4px rgba(16, 185, 129, 0.3)",
          }}
        />
      </div>
    </div>
  );
};

export default LoadingScreen;
