"use client";

import React from "react";
import { FaPlay, FaPause } from "react-icons/fa";

interface ScrollSliderProps {
    isAutoScrolling: boolean;
    progress: number; // 0..1
    onToggleAutoScroll: () => void;
    onSeek: (progress: number) => void; // 0..1
}

const TRACK_PX = 256; // w-64
const THUMB_PX = 40;  // w-10

const ScrollSlider: React.FC<ScrollSliderProps> = ({
    isAutoScrolling,
    progress,
    onToggleAutoScroll,
    onSeek,
}) => {
    const handleMouseDown: React.MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        const track = e.currentTarget.parentElement as HTMLDivElement | null;
        if (!track) return;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const rect = track.getBoundingClientRect();
            const x = moveEvent.clientX - rect.left;
            const p = Math.max(0, Math.min(1, x / rect.width));
            onSeek(p);
        };

        const handleMouseUp = () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };

    return (
        <div className="flex items-center gap-4 bg-black px-5 py-3 rounded-full">
            <button onClick={onToggleAutoScroll} className="transition-all duration-200">
                {isAutoScrolling ? (
                    <div className="flex justify-center items-center h-full text-white cursor-pointer">
                        <FaPause />
                    </div>
                ) : (
                    <div className="flex justify-center items-center h-full text-white cursor-pointer">
                        <FaPlay />
                    </div>
                )}
            </button>

            <div className="relative w-64 h-4 bg-gray-300 rounded-full select-none">
                <div className="w-full h-full bg-gray-300 rounded-full"></div>
                <div
                    className="absolute top-1/2 w-10 h-4 bg-blue-500 rounded-full cursor-pointer transform -translate-y-1/2 hover:scale-110 transition-transform duration-200"
                    style={{ left: `${Math.max(0, Math.min(TRACK_PX - THUMB_PX, progress * (TRACK_PX - THUMB_PX)))}px` }}
                    onMouseDown={handleMouseDown}
                />
            </div>
        </div>
    );
};

export default ScrollSlider;
