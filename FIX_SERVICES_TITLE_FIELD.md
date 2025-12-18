# Fix Services Title Field

## Issue
The services in the homepage are showing only icons without titles because Strapi was using `Title` (capital T) instead of `title` (lowercase t).

## What Was Fixed

### 1. Updated Strapi Schema
Changed the field name from `Title` to `title` in:
- `strapi/src/api/service/content-types/service/schema.json`

### 2. Updated API Transformation
Modified `lib/api.ts` to handle both `Title` and `title` for backward compatibility:
```typescript
title: service.Title || service.title, // Handle both Title and title
```

## Steps to Apply the Fix

### Option 1: Restart Strapi (Recommended)
1. Stop Strapi if it's running (Ctrl+C in the terminal)
2. Start Strapi again:
   ```cmd
   cd strapi
   npm run develop
   ```
3. Strapi will detect the schema change and update the database automatically

### Option 2: Rebuild Strapi Database
If Option 1 doesn't work, you may need to rebuild:
1. Stop Strapi
2. Delete the `.tmp` folder in the strapi directory
3. Start Strapi again

## After Restarting Strapi

The existing services data will still have the old field name. You have two options:

### Option A: Re-enter the Services (Quick)
1. Go to Strapi admin: http://localhost:1337/admin
2. Go to Content Manager > Services
3. For each service:
   - Click Edit
   - The title should now appear in the lowercase `title` field
   - Click Save

### Option B: Keep Current Data
The API is already configured to handle both `Title` and `title`, so your current data will continue to work without changes.

## Verification

After restarting Strapi and refreshing your website:
1. Go to the homepage
2. Scroll to the "Products & Services" section
3. You should now see service titles displayed properly in the tabs
4. Each tab should show:
   - Icon (emoji)
   - Service title
   - "Active" or "Tap to explore" text

## What the Fix Does

The services section will now properly display:
- ✅ Service icons
- ✅ Service titles (from CMS)
- ✅ Service descriptions
- ✅ All service details when clicked

The API transformation ensures compatibility with both old data (using `Title`) and new data (using `title`).
