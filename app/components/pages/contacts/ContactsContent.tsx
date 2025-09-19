import React from 'react';
import ContactForm from './ContactForm';
import Image from 'next/image';
import { HeroImage } from '@/assets/images';

const ContactsContent = () => {
    return (
        <div className="space-y-2">
            {/* Placeholder for image/content */}
            <div className="w-full h-48 mx-auto rounded-lg  overflow-hidden relative">
                <Image
                    src={HeroImage.HeroImage.src}
                    alt="Hero Image"
                    fill
                    className="object-cover"
                />
            </div>
            
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