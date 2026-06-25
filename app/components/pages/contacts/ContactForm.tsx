'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { sendEmail, ContactFormData } from '@/lib/emailjs';

declare global {
  interface Window {
    grecaptcha: any;
  }
}

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const charCount = formData.message.length;
  const isOverLimit = charCount > 500;

  // Validation functions
  const isValidName = (name: string) => {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) return false;
    // Allow letters, spaces, hyphens, and apostrophes
    return /^[a-zA-Z\s\-']+$/.test(trimmedName);
  };

  const isValidPhone = (phone: string) => {
    const trimmedPhone = phone.trim();
    if (trimmedPhone.length < 10) return false;
    // Allow digits, +, -, spaces, and parentheses for country codes
    return /^[\+]?[\d\s\-\(\)]+$/.test(trimmedPhone);
  };

  const isValidMessage = (message: string) => {
    const trimmedMessage = message.trim();
    if (trimmedMessage.length < 10) return false;
    // Check for meaningful content (not just repeated characters or numbers)
    const uniqueChars = new Set(trimmedMessage.toLowerCase().replace(/\s/g, '')).size;
    const hasLetters = /[a-zA-Z]/.test(trimmedMessage);
    const hasReasonableVariety = uniqueChars >= 3;

    return hasLetters && hasReasonableVariety;
  };

  const isFormValid =
    isValidName(formData.name) &&
    isValidPhone(formData.phone) &&
    isValidMessage(formData.message) &&
    !isOverLimit;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
      if (!siteKey) {
        throw new Error('reCAPTCHA site key is not defined.');
      }

      let token = '';
      if (window.grecaptcha) {
        token = await new Promise<string>((resolve, reject) => {
          window.grecaptcha.ready(() => {
            window.grecaptcha
              .execute(siteKey, { action: 'submit_contact' })
              .then(resolve)
              .catch(reject);
          });
        });
      } else {
        throw new Error('reCAPTCHA failed to load.');
      }

      const success = await sendEmail({
        ...formData,
        recaptchaToken: token
      });

      if (success) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-row gap-4">
          {/* Name Field */}
          <div className="w-1/2">
            <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-widest text-green-800 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-white/70 backdrop-blur-sm transition-all duration-300 ${formData.name && !isValidName(formData.name)
                  ? 'border-red-400 focus:ring-red-100 focus:border-red-500'
                  : 'border-gray-200 focus:ring-emerald-100 focus:border-emerald-500'
                }`}
              placeholder="e.g. John Doe"
              required
            />
            {formData.name && !isValidName(formData.name) && (
              <p className="text-red-500 text-xs mt-1.5 font-bold">Please enter a valid name (letters only)</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="w-1/2">
            <label htmlFor="phone" className="block text-[10px] font-black uppercase tracking-widest text-green-800 mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-white/70 backdrop-blur-sm transition-all duration-300 ${formData.phone && !isValidPhone(formData.phone)
                  ? 'border-red-400 focus:ring-red-100 focus:border-red-500'
                  : 'border-gray-200 focus:ring-emerald-100 focus:border-emerald-500'
                }`}
              placeholder="e.g. +1 555-0199"
              required
            />
            {formData.phone && !isValidPhone(formData.phone) && (
              <p className="text-red-500 text-xs mt-1.5 font-bold">Please enter a valid phone number</p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="w-full">
          <label htmlFor="message" className="block text-[10px] font-black uppercase tracking-widest text-green-800 mb-2">
            Message
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 bg-white/70 backdrop-blur-sm transition-all duration-300 resize-none ${isOverLimit || (formData.message && !isValidMessage(formData.message))
                  ? 'border-red-400 focus:ring-red-100 focus:border-red-500'
                  : 'border-gray-200 focus:ring-emerald-100 focus:border-emerald-500'
                }`}
              placeholder="What would you like to discuss?"
              required
            />
            <div className={`absolute bottom-3.5 right-3.5 text-xs ${isOverLimit ? 'text-red-500 font-bold' : 'text-gray-400'
              }`}>
              {charCount}/500
            </div>
          </div>
          {formData.message && !isValidMessage(formData.message) && (
            <p className="text-red-500 text-xs mt-1.5 font-bold">Please enter a meaningful message (at least 10 characters)</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-36 py-3.5 px-6 rounded-xl font-black uppercase text-xs tracking-widest transition-all duration-300 ${!isFormValid || isSubmitting
            ? 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-500 hover:to-green-600 text-white shadow-md shadow-green-950/15 hover:shadow-emerald-950/30 cursor-pointer hover:scale-[1.02]'
            }`}
        >
          {isSubmitting ? 'SENDING...' : 'SEND'}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="text-green-600 text-sm text-left font-bold mt-2">
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="text-red-600 text-sm text-left font-bold mt-2">
            Failed to send message. Please try again or contact me directly via email.
          </div>
        )}
      </form>
      {/* Load reCAPTCHA v3 script */}
      <Script
        src={`https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || '6LeHxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'}`}
        strategy="afterInteractive"
      />
    </div>
  );
};

export default ContactForm;
