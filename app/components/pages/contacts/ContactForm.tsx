'use client';

import React, { useState } from 'react';
import { sendEmail, ContactFormData } from '@/lib/emailjs';

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
      const success = await sendEmail(formData);

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
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex flex-row gap-2">
          {/* Name Field */}
          <div className="w-1/2">
            <label htmlFor="name" className="block text-sm font-medium text-blue-500 mb-2">
              NAME
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${formData.name && !isValidName(formData.name)
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-blue-500 focus:ring-blue-300'
                }`}
              placeholder=""
              required
            />
            {formData.name && !isValidName(formData.name) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid name (letters only)</p>
            )}
          </div>

          {/* Phone Field */}
          <div className="w-1/2">
            <label htmlFor="phone" className="block text-sm font-medium text-blue-500 mb-2">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent ${formData.phone && !isValidPhone(formData.phone)
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-blue-500 focus:ring-blue-300'
                }`}
              placeholder=""
              required
            />
            {formData.phone && !isValidPhone(formData.phone) && (
              <p className="text-red-500 text-xs mt-1">Please enter a valid phone number (digits, +, -, spaces, parentheses allowed)</p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div className="w-full">
          <label htmlFor="message" className="block text-sm font-medium text-blue-500 mb-2">
            MESSAGE
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={6}
              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent resize-none ${isOverLimit || (formData.message && !isValidMessage(formData.message))
                  ? 'border-red-500 focus:ring-red-300'
                  : 'border-blue-500 focus:ring-blue-300'
                }`}
              placeholder=""
              required
            />
            <div className={`absolute bottom-2 right-2 text-xs ${isOverLimit ? 'text-red-500' : 'text-gray-500'
              }`}>
              {charCount}/500
            </div>
          </div>
          {formData.message && !isValidMessage(formData.message) && (
            <p className="text-red-500 text-xs mt-1">Please enter a meaningful message (at least 10 characters with letters)</p>
          )}
        </div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className={`w-32 py-3 px-6 rounded-lg font-medium transition-colors ${!isFormValid || isSubmitting
            ? 'border-2 border-blue-500 text-blue-500 cursor-not-allowed'
            : 'border-2 border-blue-500 text-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300'
            }`}
        >
          {isSubmitting ? 'SENDING...' : 'SEND'}
        </button>

        {/* Status Messages */}
        {submitStatus === 'success' && (
          <div className="text-green-600 text-sm text-left">
            Message sent successfully! I&apos;ll get back to you soon.
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="text-red-600 text-sm text-left">
            Failed to send message. Please try again or contact me through .
          </div>
        )}
      </form>
    </div>
  );
};

export default ContactForm;
