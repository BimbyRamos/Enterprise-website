# Google Maps Setup Guide

## Problem
The map in the Contact section shows an error: "This page didn't load Google Maps correctly."

## Root Cause
The Google Maps API key in `.env.local` is set to a placeholder value: `your_google_maps_api_key_here`

You need a real API key from Google Cloud Platform.

## Solution 1: Get a Google Maps API Key (Recommended)

### Step 1: Go to Google Cloud Console
Visit: https://console.cloud.google.com/

### Step 2: Create a New Project (or select existing)
1. Click the project dropdown at the top
2. Click "NEW PROJECT"
3. Name it: "Networld Capital Website"
4. Click "CREATE"

### Step 3: Enable Google Maps JavaScript API
1. Go to: https://console.cloud.google.com/apis/library
2. Search for: "Maps JavaScript API"
3. Click on it
4. Click: "ENABLE"

### Step 4: Create API Key
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click: "CREATE CREDENTIALS" → "API key"
3. Copy the API key that appears

### Step 5: Restrict the API Key (Important for Security)
1. Click on the API key you just created
2. Under "Application restrictions":
   - Select: "HTTP referrers (web sites)"
   - Add these referrers:
     - `http://localhost:3000/*` (for local development)
     - `https://yourwebsite.com/*` (for production)
     - `https://*.vercel.app/*` (if using Vercel)
3. Under "API restrictions":
   - Select: "Restrict key"
   - Check: "Maps JavaScript API"
4. Click: "SAVE"

### Step 6: Update .env.local
Open `.env.local` and replace the placeholder:

```bash
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_ACTUAL_API_KEY_HERE
```

### Step 7: Restart Your Development Server
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### Step 8: Refresh Website
1. Go to: http://localhost:3000
2. Scroll to Contact section
3. The map should now load!

## Solution 2: Use Static Map Image (Temporary Fallback)

If you don't want to set up Google Maps API right now, I can replace the interactive map with a static image or a simple location display.

Would you like me to:
1. Wait for you to get the API key (recommended)
2. Create a temporary fallback without Google Maps

## Pricing Information

Google Maps offers a generous free tier:
- **$200 free credit per month**
- Maps JavaScript API: $7 per 1,000 loads
- With $200 credit = ~28,000 free map loads per month

For a business website, this is usually more than enough and stays within the free tier.

## Troubleshooting

### If map still doesn't load after adding API key:

1. **Check browser console** (F12):
   - Look for specific error messages
   - Common errors:
     - "API key not valid" → Check if key is correct
     - "This API project is not authorized" → Enable Maps JavaScript API
     - "RefererNotAllowedMapError" → Add your domain to API restrictions

2. **Verify API key is loaded**:
   - Open browser console
   - Type: `process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - Should show your API key (not the placeholder)

3. **Clear cache and restart**:
   ```bash
   # Stop server
   # Delete .next folder
   rm -rf .next
   # Restart
   npm run dev
   ```

4. **Check .env.local format**:
   - No spaces around `=`
   - No quotes around the value
   - Correct: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyABC123...`
   - Wrong: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = "AIzaSyABC123..."`

## Quick Test

After setting up, test the API key directly:
```
https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY
```

If it loads without errors, your key is working!

## Need Help?

If you're having trouble getting the API key, let me know and I can:
1. Create a fallback solution without Google Maps
2. Help troubleshoot specific errors
3. Provide alternative mapping solutions
