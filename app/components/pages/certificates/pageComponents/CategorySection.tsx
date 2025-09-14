import React from 'react';
import CertificateCard from './CertificateCard';
import { CertificateData } from '@/data/pages/certificates/certificateData';

interface CategorySectionProps {
    category: string;
    certificates: CertificateData[];
}

const CategorySection: React.FC<CategorySectionProps> = ({ category, certificates }) => {
    return (
        <div className="mb-12">
            {/* Category Header */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{category}</h2>
                <div className="w-full h-px bg-gray-300" />
            </div>
            
            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certificates.map((certificate, index) => (
                    <CertificateCard
                        key={`${index}`}
                        certificate={certificate}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategorySection;
