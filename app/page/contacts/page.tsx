import React from 'react';
import { ContactsHeader, ContactsContent, ContactsSocials } from '@/components/pages/contacts';

const ContactsPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 text-gray-900 pt-32 pb-16">
            <div className="max-w-6xl mx-auto py-10 px-4">
                {/* Header */}
                <div className="mb-12">
                    <ContactsHeader />
                </div>
                
                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {/* Left Column - Contact Form Card */}
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-2xl hover:shadow-gray-300/35 hover:-translate-y-1 transition-all duration-300">
                        <ContactsContent />
                    </div>
                    
                    {/* Right Column - Social Links Card */}
                    <div className="bg-white/90 backdrop-blur-sm border border-gray-200/80 rounded-3xl p-6 sm:p-10 shadow-sm hover:shadow-2xl hover:shadow-gray-300/35 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center">
                        <ContactsSocials />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactsPage;
