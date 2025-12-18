# Contact Form Email Setup Guide

## Overview

To receive emails when customers fill out the contact form, you have several options. I'll explain each one from easiest to most advanced.

## Option 1: EmailJS (Easiest - Recommended for Quick Setup)

EmailJS is a free service that sends emails directly from the browser without needing a backend.

### Pros:
- ✅ No backend code needed
- ✅ Free tier: 200 emails/month
- ✅ Easy to set up (5-10 minutes)
- ✅ Works with Gmail, Outlook, etc.

### Setup Steps:

#### 1. Create EmailJS Account
1. Go to: https://www.emailjs.com/
2. Sign up for free account
3. Verify your email

#### 2. Add Email Service
1. Go to "Email Services" tab
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Connect your Gmail account
5. Copy the **Service ID**

#### 3. Create Email Template
1. Go to "Email Templates" tab
2. Click "Create New Template"
3. Use this template:

```
Subject: New Contact Form Submission from {{from_name}}

From: {{from_name}}
Email: {{from_email}}
Phone: {{from_phone}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from Networld Capital Website Contact Form
```

4. Copy the **Template ID**

#### 4. Get Your Public Key
1. Go to "Account" → "General"
2. Copy your **Public Key**

#### 5. Install EmailJS in Your Project
```bash
npm install @emailjs/browser
```

#### 6. Add Environment Variables
Add to `.env.local`:
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Cost:
- **Free**: 200 emails/month
- **Paid**: $7/month for 1,000 emails

---

## Option 2: Resend (Modern, Developer-Friendly)

Resend is a modern email API that's easy to use and has a generous free tier.

### Pros:
- ✅ 3,000 free emails/month
- ✅ Clean, modern API
- ✅ Great deliverability
- ✅ Easy to set up

### Setup Steps:

#### 1. Create Resend Account
1. Go to: https://resend.com/
2. Sign up for free
3. Verify your email

#### 2. Get API Key
1. Go to "API Keys"
2. Click "Create API Key"
3. Copy the key

#### 3. Install Resend
```bash
npm install resend
```

#### 4. Add to Environment Variables
Add to `.env.local`:
```
RESEND_API_KEY=your_api_key_here
RESEND_FROM_EMAIL=onboarding@resend.dev
RESEND_TO_EMAIL=your-email@networldcapital.com
```

### Cost:
- **Free**: 3,000 emails/month
- **Paid**: $20/month for 50,000 emails

---

## Option 3: SendGrid (Enterprise-Grade)

SendGrid is used by large companies and has excellent deliverability.

### Pros:
- ✅ 100 free emails/day (3,000/month)
- ✅ Enterprise-grade
- ✅ Excellent deliverability
- ✅ Advanced features

### Setup Steps:

#### 1. Create SendGrid Account
1. Go to: https://sendgrid.com/
2. Sign up for free
3. Verify your email

#### 2. Create API Key
1. Go to Settings → API Keys
2. Click "Create API Key"
3. Give it full access
4. Copy the key

#### 3. Verify Sender Email
1. Go to Settings → Sender Authentication
2. Verify your email address
3. Follow the verification steps

#### 4. Install SendGrid
```bash
npm install @sendgrid/mail
```

#### 5. Add to Environment Variables
Add to `.env.local`:
```
SENDGRID_API_KEY=your_api_key_here
SENDGRID_FROM_EMAIL=info@networldcapital.com
SENDGRID_TO_EMAIL=your-email@networldcapital.com
```

### Cost:
- **Free**: 100 emails/day
- **Paid**: $19.95/month for 50,000 emails

---

## Option 4: Nodemailer with Gmail (Free, Self-Hosted)

Use Gmail's SMTP server to send emails for free.

### Pros:
- ✅ Completely free
- ✅ Use your existing Gmail
- ✅ No third-party service

### Cons:
- ❌ Gmail limit: 500 emails/day
- ❌ Requires app password setup
- ❌ May go to spam

### Setup Steps:

#### 1. Enable Gmail App Password
1. Go to Google Account settings
2. Security → 2-Step Verification (enable it)
3. Security → App passwords
4. Generate password for "Mail"
5. Copy the 16-character password

#### 2. Install Nodemailer
```bash
npm install nodemailer
```

#### 3. Add to Environment Variables
Add to `.env.local`:
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your_16_char_password
CONTACT_EMAIL=info@networldcapital.com
```

---

## Comparison Table

| Service | Free Tier | Setup Time | Best For |
|---------|-----------|------------|----------|
| **EmailJS** | 200/month | 5 min | Quick setup, no backend |
| **Resend** | 3,000/month | 10 min | Modern apps, developers |
| **SendGrid** | 3,000/month | 15 min | Enterprise, high volume |
| **Nodemailer** | 500/day | 20 min | Self-hosted, free forever |

---

## My Recommendation

For your use case, I recommend **EmailJS** because:
1. ✅ Easiest to set up (no backend needed)
2. ✅ 200 emails/month is enough for most business websites
3. ✅ Works immediately
4. ✅ Can upgrade later if needed

If you expect more than 200 contacts per month, use **Resend** (3,000 free emails/month).

---

## Next Steps

Let me know which option you prefer, and I'll:
1. Implement the contact form with email functionality
2. Add form validation
3. Add success/error messages
4. Test the email sending

Which option would you like to use?
- **Option 1: EmailJS** (Easiest, recommended)
- **Option 2: Resend** (More emails, modern)
- **Option 3: SendGrid** (Enterprise)
- **Option 4: Nodemailer** (Free forever)
