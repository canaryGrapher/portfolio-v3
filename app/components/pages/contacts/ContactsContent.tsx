import React from 'react';
import ContactForm from './ContactForm';
import Image from 'next/image';
import { HeroImage } from '@/assets/images';

const ContactsContent = () => {
    return (
        <div className="space-y-2">    
            {/* Name */}
            <div>
                <h2 className="text-2xl font-bold text-blue-600">YASH ARYAN</h2>
            </div>
            
            {/* Contact Form */}
            <ContactForm />
        </div>
    );
};

export default ContactsContent;