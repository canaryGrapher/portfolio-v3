# EmailJS Setup Guide

This guide will help you set up EmailJS for the contact form functionality.

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
   - `{{from_name}}` - Sender's name
   - `{{from_phone}}` - Sender's phone number
   - `{{message}}` - Message content
   - `{{to_name}}` - Your name (Yash Aryan)

Example template:
```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Phone: {{from_phone}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. Save the template and note down your **Template ID**

### 3. Get Public Key

1. Go to "Account" in the dashboard
2. Find your **Public Key** in the API Keys section

### 4. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual EmailJS credentials.

### 5. Test the Setup

1. Start your development server: `npm run dev`
2. Navigate to the contacts page
3. Fill out and submit the contact form
4. Check your email to confirm the message was received

## Features

- ✅ 500-word limit with real-time validation
- ✅ Word count display in bottom-right of message field
- ✅ Red border and text when limit exceeded
- ✅ Disabled submit button when form is invalid
- ✅ Success/error feedback messages
- ✅ Responsive design matching the provided mockup

## Troubleshooting

### Common Issues

1. **"EmailJS configuration is missing" error**
   - Ensure all environment variables are set correctly
   - Restart your development server after adding environment variables

2. **Emails not being sent**
   - Check your EmailJS service configuration
   - Verify template variables match the code
   - Check browser console for detailed error messages

3. **CORS errors**
   - Ensure your domain is added to EmailJS allowed origins
   - Check EmailJS dashboard settings

### Support

For EmailJS-specific issues, refer to their [documentation](https://www.emailjs.com/docs/) or [support](https://www.emailjs.com/support/).
