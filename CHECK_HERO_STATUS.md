# Quick Checklist - Hero Section Not Showing

## The Issue
Your CMS content isn't appearing on the website because of the **Draft & Publish** workflow.

## Quick Fix (3 Steps):

### 1️⃣ Rebuild Strapi
```bash
cd strapi
npm run build
npm run develop
```

### 2️⃣ Publish Your Content
- Open: http://localhost:1337/admin
- Go to: Content Manager → Hero Section
- Click: **PUBLISH** button (not just Save)

### 3️⃣ Refresh Website
- Open: http://localhost:3000
- Press: **Ctrl + Shift + R** (hard refresh)

## That's It!

Your content should now appear. The key is clicking **PUBLISH** instead of just **SAVE**.

---

## Still Not Working?

### Check API Permissions:
1. In Strapi admin, go to: **Settings** → **Roles** → **Public**
2. Find **"Hero"** in the list
3. Make sure **"find"** is checked ✅
4. Click **Save**

### Test the API:
Run this command to see if the API returns your content:
```bash
test-hero-api.bat
```

Or visit in browser: http://localhost:1337/api/hero?populate=*

You should see your content in JSON format.

---

## Why This Happens

When `draftAndPublish` is enabled:
- **Save** = Draft (not visible to website)
- **Publish** = Live (visible to website)

This lets you prepare content before making it live!
