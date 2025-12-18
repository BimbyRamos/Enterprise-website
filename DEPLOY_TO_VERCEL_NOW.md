# Deploy to Vercel - Complete Guide

## Quick Deployment Steps

### Step 1: Commit Your Changes to Git

```bash
# Check what files have changed
git status

# Add all changes
git add .

# Commit with a message
git commit -m "Update website: Fixed hero button, improved maps, updated contact page"

# Push to GitHub
git push origin main
```

### Step 2: Vercel Will Auto-Deploy

If your Vercel project is already connected to GitHub, it will automatically deploy when you push!

---

## Detailed Step-by-Step Guide

### STEP 1: Check Git Status

```bash
git status
```

You should see all the files you've modified.

### STEP 2: Add All Changes

```bash
git add .
```

This stages all your changes for commit.

### STEP 3: Commit Changes

```bash
git commit -m "Major updates: Hero button fix, Maps improvement, Contact page updates, Industries fixes"
```

### STEP 4: Push to GitHub

```bash
git push origin main
```

If you get an error about the branch name, try:
```bash
git push origin master
```

### STEP 5: Check Vercel Dashboard

1. Go to: https://vercel.com/dashboard
2. Find your project
3. You should see a new deployment starting automatically
4. Wait for it to complete (usually 1-3 minutes)

---

## If Vercel Doesn't Auto-Deploy

### Option A: Deploy from Vercel Dashboard

1. Go to https://vercel.com/dashboard
2. Click on your project
3. Click "Deployments" tab
4. Click "Redeploy" button
5. Select "Use existing Build Cache" (faster)
6. Click "Redeploy"

### Option B: Deploy Using Vercel CLI

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

---

## Environment Variables for Production

You need to add these environment variables in Vercel:

### Required Variables:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables

2. Add these variables:

```
NEXT_PUBLIC_CMS_URL=https://your-strapi-url.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### Optional (if using email):
```
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

---

## Summary of Changes Being Deployed

✅ **Hero Section**
- Fixed "Get Started" button to navigate to Contact page
- Improved button functionality

✅ **Maps**
- Better error handling
- Fallback UI when API key not configured
- Improved loading states

✅ **Contact Page**
- Removed from homepage
- Standalone contact page at `/contact`
- Ready for email integration

✅ **Industries**
- Fixed "Success Stories" section
- Now shows Key Capabilities from CMS
- Aligned with Strapi data

✅ **API Improvements**
- Better error handling
- Console logging for debugging
- Fallback data when CMS unavailable

---

## Troubleshooting

### Build Fails on Vercel

**Check the build logs:**
1. Go to Vercel Dashboard
2. Click on the failed deployment
3. Click "View Build Logs"
4. Look for errors

**Common issues:**
- Missing environment variables
- TypeScript errors
- Missing dependencies

**Fix:**
```bash
# Test build locally first
npm run build

# If it works locally, check Vercel environment variables
```

### Deployment Succeeds But Site Doesn't Work

**Check these:**
1. Environment variables are set correctly
2. CMS URL is correct (production Strapi URL, not localhost)
3. Google Maps API key is valid
4. API key restrictions allow your Vercel domain

---

## Post-Deployment Checklist

After deployment, test these:

- [ ] Homepage loads correctly
- [ ] "Get Started" button navigates to Contact page
- [ ] Contact page displays properly
- [ ] Industries pages work
- [ ] Services pages work
- [ ] Projects page works
- [ ] Navigation works
- [ ] Footer links work

---

## Quick Commands Reference

```bash
# Check status
git status

# Add all changes
git add .

# Commit
git commit -m "Your message here"

# Push to GitHub
git push origin main

# Deploy with Vercel CLI
vercel --prod

# Check deployment status
vercel ls
```

---

## Need Help?

If you encounter any issues:

1. **Build errors**: Check `npm run build` locally first
2. **Environment variables**: Double-check they're set in Vercel
3. **CMS connection**: Make sure Strapi is accessible from internet
4. **Maps not working**: Add Google Maps API key to Vercel environment variables

---

## What Happens Next?

1. Push your code to GitHub
2. Vercel detects the push
3. Vercel builds your site
4. Vercel deploys to production
5. Your site is live at your Vercel URL!

Typical deployment time: **1-3 minutes**

---

## Your Vercel URL

After deployment, your site will be available at:
- `https://your-project-name.vercel.app`
- Or your custom domain if configured

Check the Vercel dashboard for the exact URL!
