"use client";

import { useState, useCallback } from 'react';
import { ThoughtsClient } from '@/app/lib/thoughts/client';
import { UploadedImage } from '@/app/interface/thoughts';

export const useImageUpload = () => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const upload = useCallback(async (file: File): Promise<UploadedImage | null> => {
        setUploading(true);
        setError(null);
        try {
            return await ThoughtsClient.upload(file);
        } catch (e) {
            setError(e instanceof Error ? e.message : 'Upload failed');
            return null;
        } finally {
            setUploading(false);
        }
    }, []);

    return { upload, uploading, error, clearError: () => setError(null) };
};
