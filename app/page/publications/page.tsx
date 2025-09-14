import React from 'react';
import { PageHeroSection } from "@/components/common";
import { Publications } from "@/assets/images";
import publicationList from "@/data/pages/publications/publicationList";
import PublicationsGrid from "@/components/pages/publications/PublicationGrid";

const PublicationsPage = () => {
    return (
        <div className="bg-gray-200 min-h-screen">
            <div className="pt-10 max-w-7xl mx-auto">
                {/* Hero Section */}
                <PageHeroSection
                    backgroundImage={Publications.publicationBG.src}
                    title="Publications"
                    subtitle="Research showcasing applied knowledge, critical analysis, and contribution to academic discourse."
                    altText="Publication Background"
                />

                {/* Certificates Content */}
                <div className="container mx-auto px-4 py-12">
                    <PublicationsGrid publications={publicationList} />
                </div>
            </div>
        </div>
    );
};

export default PublicationsPage;
