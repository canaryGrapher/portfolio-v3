import React from 'react';
import ContactForm from './ContactForm';

const ContactsContent = () => {
    return (
        <div className="space-y-4">    
            {/* Name */}
            <div>
                <h2 className="text-2xl font-black text-gray-900 tracking-tight uppercase">
                    YASH ARYAN<span className="text-emerald-600">.</span>
                </h2>
            </div>
            
            {/* Contact Form */}
            <ContactForm />
        </div>
    );
};

export default ContactsContent;