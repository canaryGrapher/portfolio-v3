import React from 'react';
import certificateData from "@/data/pages/certificates/certificateData";
import { CertificatesGrid } from "@/components/pages/certificates";
import { PageHeroSection } from "@/components/common";
import { Certificates } from "@/assets/images";

const CertificatesPage = () => {
    return (
        <div className="bg-gray-200 w-screen pt-20">
            <div className="pt-10 mx-auto container">
                <div className="px-4">
                    {/* Hero Section */}
                    <PageHeroSection
                        backgroundImage={Certificates.certificateBG}
                        title="Certificates"
                        subtitle="A tangible demonstration of specialized skills, increasing professional credibility, and facilitating continuous learning."
                        altText="Certificate Background"
                    />
                </div>

                {/* Certificates Content */}
                <div className="mx-auto py-12 px-5">
                    <CertificatesGrid certificates={certificateData} />
                </div>
            </div>
        </div>
    );
};

export default CertificatesPage;
