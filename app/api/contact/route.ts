import { NextRequest, NextResponse } from 'next/server';

// EmailJS configuration - server-side only
const EMAILJS_SERVICE_ID = process.env.EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.EMAILJS_TEMPLATE_ID;
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY;
const EMAILJS_PUBLIC_KEY = process.env.EMAILJS_PUBLIC_KEY;

export interface ContactFormData {
  name: string;
  phone: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: ContactFormData = await request.json();
    
    // Validate required fields
    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validation functions
    const isValidName = (name: string) => {
      const trimmedName = name.trim();
      if (trimmedName.length < 2) return false;
      return /^[a-zA-Z\s\-']+$/.test(trimmedName);
    };

    const isValidPhone = (phone: string) => {
      const trimmedPhone = phone.trim();
      if (trimmedPhone.length < 10) return false;
      return /^[\+]?[\d\s\-\(\)]+$/.test(trimmedPhone);
    };

    const isValidMessage = (message: string) => {
      const trimmedMessage = message.trim();
      if (trimmedMessage.length < 10) return false;
      const uniqueChars = new Set(trimmedMessage.toLowerCase().replace(/\s/g, '')).size;
      const hasLetters = /[a-zA-Z]/.test(trimmedMessage);
      const hasReasonableVariety = uniqueChars >= 3;
      
      return hasLetters && hasReasonableVariety;
    };

    // Validate each field
    if (!isValidName(body.name)) {
      return NextResponse.json(
        { error: 'Please enter a valid name (letters only)' },
        { status: 400 }
      );
    }

    if (!isValidPhone(body.phone)) {
      return NextResponse.json(
        { error: 'Please enter a valid phone number (digits, +, -, spaces, parentheses allowed)' },
        { status: 400 }
      );
    }

    if (!isValidMessage(body.message)) {
      return NextResponse.json(
        { error: 'Please enter a meaningful message (at least 10 characters with letters)' },
        { status: 400 }
      );
    }


    // Validate character count (1000 characters max)
    const charCount = body.message.length;
    if (charCount > 500) {
      return NextResponse.json(
        { error: 'Message exceeds 500 character limit' },
        { status: 400 }
      );
    }

    // Check if EmailJS is configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PRIVATE_KEY) {
      console.error('EmailJS configuration is missing');
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    // Send email using EmailJS
    const emailjs = await import('@emailjs/nodejs');
    
    const result = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name: body.name,
        phone: body.phone,
        message: body.message,
        time: new Date().toISOString(),
        to_name: 'Yash Aryan',
      },
      {
        publicKey: EMAILJS_PUBLIC_KEY,
        privateKey: EMAILJS_PRIVATE_KEY,
      }
    );

    console.log('Email sent successfully:', result);
    
    return NextResponse.json(
      { success: true, message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Failed to send email:', error);
    
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
