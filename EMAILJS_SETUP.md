# EmailJS Setup Guide

This guide will help you set up EmailJS for the contact form functionality using secure server-side API routes.

## Prerequisites

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, etc.)

## Setup Steps

### 1. Create Email Service

1. Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
2. Navigate to "Email Services"
3. Click "Add New Service"
4. Choose your email provider (Gmail, Outlook, etc.)
5. Follow the setup instructions for your chosen provider
6. Note down your **Service ID**

### 2. Create Email Template

1. Go to "Email Templates" in the dashboard
2. Click "Create New Template"
3. Use the following template variables:
   - `{{name}}` - Sender's name
   - `{{phone}}` - Sender's phone number
   - `{{message}}` - Message content
   - `{{to_name}}` - Your name (Yash Aryan)

Example template:
```
Subject: New Contact Form Submission from {{name}}

From: {{name}}
Phone: {{phone}}
   
Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

### 3. Get API Keys

1. Go to "Account" in the dashboard
2. Find your **Public Key** and **Private Key** in the API Keys section
3. You'll need BOTH keys for server-side sending

### 4. Set up reCAPTCHA v2

1. Go to [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)
2. Click "Create" to add a new site
3. **IMPORTANT**: Choose "reCAPTCHA v2" and select **"I'm not a robot" Checkbox** (NOT invisible or v3)
4. Add your domain(s) (e.g., `localhost` for development, `yourdomain.com` for production)
5. Accept the terms and submit
6. Note down your **Site Key** and **Secret Key**

**Common Error Fix**: If you get "Invalid key type" error, make sure you selected "I'm not a robot" Checkbox, not "Invisible reCAPTCHA" or "reCAPTCHA v3".

### 5. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# EmailJS Configuration (server-side only)
EMAILJS_SERVICE_ID=your_service_id_here
EMAILJS_TEMPLATE_ID=your_template_id_here
EMAILJS_PUBLIC_KEY=your_public_key_here
EMAILJS_PRIVATE_KEY=your_private_key_here

# reCAPTCHA Configuration
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

**Important:** 
- EmailJS variables are server-side only (no `NEXT_PUBLIC_` prefix) to keep secrets secure
- You need BOTH EmailJS Public Key and Private Key for server-side sending
- reCAPTCHA Site Key is public (with `NEXT_PUBLIC_` prefix) as it's safe to expose
- reCAPTCHA Secret Key is server-side only (no `NEXT_PUBLIC_` prefix)

### 6. Install Dependencies

Install the required reCAPTCHA package:

```bash
npm install react-google-recaptcha @types/react-google-recaptcha
```

### 7. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the contacts page
3. Fill out and submit the contact form
4. Check your email to confirm the message was received

## Security Features

- ✅ **Server-side only secrets** - No API keys exposed to client
- ✅ **API route protection** - EmailJS credentials stay on server
- ✅ **reCAPTCHA v2 protection** - Prevents spam and bot submissions
- ✅ **Input validation** - Server-side validation of form data
- ✅ **Word limit enforcement** - Server-side 500-word limit check
- ✅ **Error handling** - Proper error responses without exposing internals

## Features

- ✅ 500-word limit with real-time validation
- ✅ Word count display in bottom-right of message field
- ✅ Red border and text when limit exceeded
- ✅ Disabled submit button when form is invalid
- ✅ reCAPTCHA v2 "I'm not a robot" checkbox
- ✅ Success/error feedback messages
- ✅ Responsive design matching the provided mockup
- ✅ Secure server-side email processing

## Troubleshooting

### Common Issues

1. **"Email service not configured" error**
   - Ensure all environment variables are set correctly (without `NEXT_PUBLIC_` prefix)
   - Restart your development server after adding environment variables
   - Check that you're using the **Private Key**, not the Public Key

2. **Emails not being sent**
   - Check your EmailJS service configuration
   - Verify template variables match the code (`{{name}}`, `{{phone}}`, `{{message}}`)
   - Check server logs for detailed error messages
   - Ensure you're using the correct Service ID and Template ID

3. **reCAPTCHA issues**
   - Ensure you're using the correct Site Key and Secret Key
   - Verify your domain is added to reCAPTCHA allowed domains
   - Check that `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` is set correctly
   - For development, make sure `localhost` is added to your reCAPTCHA domains

4. **API route errors**
   - Check the browser network tab for API call responses
   - Verify the `/api/contact` endpoint is accessible
   - Check server console for error logs

### Support

For EmailJS-specific issues, refer to their [documentation](https://www.emailjs.com/docs/) or [support](https://www.emailjs.com/support/).
