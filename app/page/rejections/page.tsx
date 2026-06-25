import React from 'react';
import { RejectionsHeader, RejectionsFooter, RejectionsContent } from '@/components/pages/rejections';

const RejectionsPage = () => {
    return (
        <div className="bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 min-h-screen pt-20 pb-16 md:pb-24">
            <div className="max-w-7xl mx-auto px-4">
                <RejectionsHeader />
                <RejectionsContent />
                <RejectionsFooter />
            </div>
        </div>
    );
};

export default RejectionsPage;

