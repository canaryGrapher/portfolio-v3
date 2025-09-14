import React from 'react';
import certificateData from "@/data/pages/certificates/certificateData";
import { CertificatesGrid } from "@/components/pages/certificates";
import { PageHeroSection } from "@/components/common";
import { Certificates } from "@/assets/images";

const CertificatesPage = () => {
    return (
        <div className="bg-gray-200 w-screen">
            <div className="pt-10 mx-auto">
                {/* Hero Section */}
                <PageHeroSection
                    backgroundImage={Certificates.certificateBG.src}
                    title="Certificates"
                    subtitle="A tangible demonstration of specialized skills, increasing professional credibility, and facilitating continuous learning."
                    altText="Certificate Background"
                />

                {/* Certificates Content */}
                <div className="container mx-auto px-4 py-12">
                    <CertificatesGrid certificates={certificateData} />
                </div>
            </div>
        </div>
    );
};

export default CertificatesPage;
