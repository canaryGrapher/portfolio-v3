"use client";

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useImageUpload } from './useImageUpload';

interface FeatureImagePickerProps {
    value: string;
    onChange: (url: string) => void;
}

const FeatureImagePicker: React.FC<FeatureImagePickerProps> = ({ value, onChange }) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [dragOver, setDragOver] = useState(false);
    const { upload, uploading, error } = useImageUpload();

    const handleFile = async (file?: File | null) => {
        if (!file) return;
        const result = await upload(file);
        if (result) onChange(result.url);
    };

    return (
        <div>
            <label className="block text-[11px] font-bold text-gray-600 uppercase tracking-wider mb-1.5">
                Feature image
            </label>

            {value ? (
                <div className="relative rounded-lg overflow-hidden border border-gray-200 group">
                    <div className="relative w-full h-32">
                        <Image src={value} alt="Feature" fill className="object-cover" unoptimized />
                    </div>
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 px-2.5 py-1 bg-white/95 text-red-600 text-[10px] font-bold rounded-md shadow-sm hover:bg-red-50 cursor-pointer"
                    >
                        Remove
                    </button>
                </div>
            ) : (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setDragOver(false);
                        handleFile(e.dataTransfer.files?.[0]);
                    }}
                    className={`w-full h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${dragOver
                        ? 'border-green-800 bg-green-50/50'
                        : 'border-gray-300 bg-gray-50/50 hover:border-green-800/50'
                        }`}
                >
                    {uploading ? (
                        <span className="text-xs font-bold text-green-800">Uploading...</span>
                    ) : (
                        <>
                            <span className="text-xs font-bold text-gray-600">Drop an image or click</span>
                            <span className="text-[10px] text-gray-400 mt-0.5">JPG, PNG, WebP up to 10 MB</span>
                        </>
                    )}
                </div>
            )}

            {error && <p className="mt-1.5 text-[11px] font-semibold text-red-600">{error}</p>}

            <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
            />
        </div>
    );
};

export default FeatureImagePicker;
