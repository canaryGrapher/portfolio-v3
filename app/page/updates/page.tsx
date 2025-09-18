import React from 'react';
import { UpdateHeader, UpdateTimeline } from '@/components/pages/updates';

const UpdatesPage = () => {
    return (
        <div className="min-h-screen bg-gray-300 text-black">
            <div className="max-w-7xl mx-auto pt-10">
                <UpdateHeader />
                <UpdateTimeline />
            </div>
        </div>
    );
};

export default UpdatesPage;
