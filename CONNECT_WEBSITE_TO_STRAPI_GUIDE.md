# Guide - Connect Website to Strapi CMS

## ✅ What Was Updated

I've updated `lib/api.ts` to fetch real data from Strapi instead of using mock data.

### Changes Made:

1. **Added Strapi URL configuration**
   - Uses `NEXT_PUBLIC_CMS_URL` from environment variables
   - Defaults to `http://localhost:1337`

2. **Added helper functions**
   - `transformStrapiData()` - Transforms Strapi's response format
   - `transformStrapiSingleItem()` - Transforms single item responses
   - `getStrapiImageUrl()` - Handles Strapi image URLs

3. **Updated API functions to call Strapi:**
   - `fetchServices()` - Fetches from `/api/services`
   - `fetchServiceBySlug()` - Fetches single service by slug
   - `fetchLatestArticles()` - Fetches from `/api/articles`
   - `fetchIndustries()` - Fetches from `/api/industries`
   - `fetchIndustryBySlug()` - Fetches single industry by slug

4. **Added fallback to mock data**
   - If Strapi is unavailable, falls back to mock data
   - Prevents website from breaking if CMS is down

---

## 🧪 How to Test

### Step 1: Make Sure Both Servers Are Running

**Terminal 1 - Strapi (Port 1337):**
```cmd
cd strapi
npm run develop
```

**Terminal 2 - Next.js Website (Port 3000):**
```cmd
npm run dev
```

### Step 2: Verify Strapi Has Published Content

Make sure you've published your content in Strapi:
1. Go to http://localhost:1337/admin
2. Click "Content Manager"
3. Check each content type (Project, Service, Industry, Article)
4. Make sure entries show "Published" status (not "Draft")

### Step 3: Test the Website

Visit your website: http://localhost:3000

**What to Check:**

1. **Homepage**
   - Should show services from Strapi
   - Should show latest articles from Strapi
   - Check browser console (F12) for any errors

2. **Services Page** (http://localhost:3000/services)
   - Should list all services from Strapi
   - Click on a service to view details

3. **Industries Page** (http://localhost:3000/industries)
   - Should list all industries from Strapi
   - Click on an industry to view details

4. **Check Browser Console**
   - Press F12 to open Developer Tools
   - Go to "Console" tab
   - Look for any errors or warnings

---

## 🔍 Verify Data is Coming from Strapi

### Method 1: Check Network Tab

1. Open your website (http://localhost:3000)
2. Press F12 → Go to "Network" tab
3. Refresh the page
4. Look for requests to `localhost:1337/api/...`
5. Click on them to see the response data

### Method 2: Check Console Logs

The updated code logs errors if Strapi is unavailable:
- Open browser console (F12)
- If you see "Failed to fetch ... from Strapi", there's a connection issue
- If no errors, data is loading successfully!

### Method 3: Compare Data

1. Check what's in Strapi:
   - Go to http://localhost:1337/api/services
   - You should see JSON with your services

2. Check what's on your website:
   - Go to http://localhost:3000/services
   - Should show the same services

---

## 🐛 Troubleshooting

### Problem: Website shows mock data (old data)

**Solution:**
1. Make sure Strapi is running on port 1337
2. Make sure content is published (not draft)
3. Check browser console for errors
4. Try hard refresh: Ctrl + Shift + R

### Problem: "Failed to fetch from Strapi" in console

**Solution:**
1. Verify Strapi is running: http://localhost:1337/admin
2. Test API directly: http://localhost:1337/api/services
3. Check that permissions are set (Task 3)
4. Restart both servers

### Problem: Images not showing

**Solution:**
1. Make sure you uploaded images in Strapi
2. Check that image URLs are correct
3. Images are optional - content will work without them

### Problem: Some fields are missing

**Solution:**
- Strapi field names must match:
  - `projectStatus` (not `status`)
  - `publicationDate` (not `publishedAt`)
- Check that all required fields are filled in Strapi

---

## 📊 Data Mapping

### How Strapi Fields Map to Website:

**Services:**
- Strapi `title` → Website `title`
- Strapi `slug` → Website `slug`
- Strapi `description` → Website `description`
- Strapi `icon` → Website `icon`
- Strapi `features` (JSON) → Website `features` (array)
- Strapi `benefits` (JSON) → Website `benefits` (array)

**Industries:**
- Strapi `title` → Website `name`
- Strapi `slug` → Website `slug`
- Strapi `description` → Website `description`
- Strapi `icon` → Website `icon`
- Strapi `stats` (JSON) → Website `statistics`
- Strapi `keyPoints` (JSON) → Website `caseExamples`

**Articles:**
- Strapi `title` → Website `title`
- Strapi `slug` → Website `slug`
- Strapi `excerpt` → Website `excerpt`
- Strapi `publicationDate` → Website `publishedAt`
- Strapi `category` → Website `category`
- Strapi `author` → Website `author`

---

## ✅ Success Checklist

- [ ] Both servers are running (Strapi on 1337, Next.js on 3000)
- [ ] Content is published in Strapi (not draft)
- [ ] Website homepage loads without errors
- [ ] Services page shows Strapi data
- [ ] Industries page shows Strapi data
- [ ] Service detail pages work (click on a service)
- [ ] Industry detail pages work (click on an industry)
- [ ] No errors in browser console
- [ ] Network tab shows requests to localhost:1337

---

## 🎯 What's Next

Once everything is working:

### ✅ Task 5 Complete!
Your website is now connected to Strapi CMS!

### Next Steps:

1. **Add More Content** (Optional)
   - Add more projects, services, industries, articles in Strapi
   - They'll automatically appear on your website

2. **Test Content Updates**
   - Edit something in Strapi
   - Refresh your website
   - Changes should appear immediately

3. **Prepare for Production** (Task 7+)
   - Deploy Strapi to production (Strapi Cloud, Railway, etc.)
   - Deploy Next.js to Vercel
   - Update environment variables

---

## 💡 Pro Tips

1. **Development Workflow:**
   - Keep both servers running while developing
   - Edit content in Strapi
   - See changes immediately on website

2. **Debugging:**
   - Always check browser console first
   - Test Strapi API directly in browser
   - Use Network tab to see actual requests

3. **Performance:**
   - Next.js caches data automatically
   - Hard refresh (Ctrl + Shift + R) to see latest changes
   - In production, consider adding revalidation

---

## 📝 Environment Variables

Your `.env.local` file should have:

```env
NEXT_PUBLIC_CMS_URL=http://localhost:1337
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
```

For production, update `NEXT_PUBLIC_CMS_URL` to your production Strapi URL.

---

## 🎉 You're Done!

Your website is now powered by Strapi CMS! Content editors can update content in Strapi, and it will automatically appear on your website.

