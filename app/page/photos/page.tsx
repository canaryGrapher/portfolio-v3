import React from 'react';
import { PhotosHeader, PhotosFooter, PhotosContent } from '@/components/pages/photos';

const PhotosPage = () => {
    return (
        <div className="min-h-screen bg-gray-300 text-black">
            <div className="max-w-7xl mx-auto py-10">
                <PhotosHeader />
                <PhotosContent />
                <PhotosFooter />
            </div>
        </div>
    );
};

export default PhotosPage;
