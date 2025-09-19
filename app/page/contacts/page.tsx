import React from 'react';
import { ContactsHeader, ContactsContent, ContactsSocials } from '@/components/pages/contacts';

const ContactsPage = () => {
    return (
        <div className="min-h-screen bg-gray-300 text-black">
            <div className="max-w-7xl mx-auto py-10 px-4">
                {/* Header */}
                <div className="mb-8">
                    <ContactsHeader />
                </div>
                
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Left Column - Contact Form */}
                    <div className="rounded-lg p-8">
                        <ContactsContent />
                    </div>
                    
                    {/* Right Column - Social Links */}
                    <div className="rounded-lg p-8 flex items-center">
                        <ContactsSocials />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
