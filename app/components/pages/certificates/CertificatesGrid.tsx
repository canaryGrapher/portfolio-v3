import React from 'react';
import CategorySection from './pageComponents/CategorySection';
import { CertificateData } from '@/data/pages/certificates/certificateData';

interface CertificatesGridProps {
    certificates: CertificateData[];
}

const CertificatesGrid: React.FC<CertificatesGridProps> = ({ certificates }) => {
    const categories: string[] = certificates.reduce((accumulatedCategories, certificate) => {
        if (!accumulatedCategories.includes(certificate.category)) {
            accumulatedCategories.push(certificate.category)
        }
        return accumulatedCategories;
    }, [])

    return (
        <div className="">
            {categories.map((category) => (
                <CategorySection
                    key={category}
                    category={category}
                    certificates={certificates.filter((certificate) => certificate.category === category)}
                />
            ))}
        </div>
    );
};

export default CertificatesGrid;
