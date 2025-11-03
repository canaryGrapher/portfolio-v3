import React from 'react';
import { RejectionsHeader, RejectionsFooter, RejectionsContent } from '@/components/pages/rejections';

const RejectionsPage = () => {
    return (
        <div className="min-h-screen bg-gray-300 text-black pt-20">
            <div className="max-w-7xl mx-auto py-10">
                <RejectionsHeader />
                <RejectionsContent />
                <RejectionsFooter />
            </div>
        </div>
    );
};

export default RejectionsPage;

