# Hero & About Us CMS Integration Guide

## Overview

Successfully integrated the Hero and About Us sections with Strapi CMS, allowing you to manage all content through the admin panel.

## What Was Done

### 1. Created Strapi Content Types

#### Hero Section (Single Type)
**Location:** `strapi/src/api/hero/content-types/hero/schema.json`

Fields:
- `headline` (string, required) - Main hero headline
- `subtext` (text, required) - Hero description
- `ctaText` (string, required) - Call-to-action button text
- `ctaLink` (string, required) - CTA button link
- `backgroundImage` (media, optional) - Hero background image
- `stats` (JSON) - Array of statistics displayed at bottom

#### About Us Section (Single Type)
**Location:** `strapi/src/api/about-us/content-types/about-us/schema.json`

Fields:
- `companyName` (string, required) - Company name
- `mainDescription` (text, required) - Primary description
- `secondaryDescription` (text, optional) - Additional context
- `stats` (JSON) - Statistics cards with icons and colors
- `values` (JSON) - Core values/capabilities cards
- `achievements` (JSON) - Achievement badges

### 2. Updated API Functions

**Location:** `lib/api.ts`

Added:
- `HeroSection` interface
- `AboutUsSection` interface
- `fetchHeroSection()` function
- `fetchAboutUsSection()` function

Both functions include:
- Fallback to default data if CMS is unavailable
- Error handling
- Image URL transformation

### 3. Updated Components

#### Hero Component (`components/Hero.tsx`)
- Changed from props-based to CMS-driven
- Added loading state
- Fetches data on mount
- Uses `fetchHeroSection()` API

#### About Us Component (`components/AboutUs.tsx`)
- Changed from hardcoded to CMS-driven
- Added loading state
- Fetches data on mount
- Uses `fetchAboutUsSection()` API
- Supports HTML in descriptions

#### Homepage (`app/page.tsx`)
- Removed Hero props
- Now uses CMS-driven Hero component

## How to Use

### Step 1: Rebuild Strapi

The new content types need to be registered in Strapi:

```bash
cd strapi
npm run build
npm run develop
```

### Step 2: Add Content to CMS

1. Go to http://localhost:1337/admin
2. Look for **Single Types** in the left sidebar
3. You'll see:
   - **Hero Section**
   - **About Us Section**

#### Configure Hero Section

Click "Hero Section" and fill in:
- **headline:** Your main hero text
- **subtext:** Hero description
- **ctaText:** Button text (e.g., "Get Started")
- **ctaLink:** Button link (e.g., "#contact")
- **backgroundImage:** (Optional) Upload hero image
- **stats:** Copy JSON from `SAMPLE_DATA_HERO.md`

Click **Save**

#### Configure About Us Section

Click "About Us Section" and fill in:
- **companyName:** Your company name
- **mainDescription:** Primary description
- **secondaryDescription:** Additional context
- **stats:** Copy JSON from `SAMPLE_DATA_ABOUT_US.md`
- **values:** Copy JSON from `SAMPLE_DATA_ABOUT_US.md`
- **achievements:** Copy JSON from `SAMPLE_DATA_ABOUT_US.md`

Click **Save**

### Step 3: Verify on Website

1. Refresh your website homepage
2. Hero section should display your CMS content
3. About Us section should display your CMS content

## Sample Data Files

- `SAMPLE_DATA_HERO.md` - Complete hero section data with examples
- `SAMPLE_DATA_ABOUT_US.md` - Complete about us section data with examples

## JSON Format Examples

### Hero Stats
```json
[
  {
    "value": "15+",
    "label": "Years Experience"
  },
  {
    "value": "500+",
    "label": "Projects Delivered"
  }
]
```

### About Us Stats
```json
[
  {
    "value": "15+",
    "label": "Years of Excellence",
    "icon": "📅",
    "color": "#8B1538"
  }
]
```

### About Us Values
```json
[
  {
    "icon": "🏢",
    "title": "Part of PJ Lhuillier Group",
    "description": "Backed by the trusted Cebuana Lhuillier brand",
    "features": ["Established Legacy", "Trusted Brand"]
  }
]
```

### About Us Achievements
```json
[
  {
    "title": "Industry Leader",
    "description": "Recognized as a top ICT provider"
  }
]
```

## Features

### Hero Section
- ✅ Editable headline and subtext
- ✅ Customizable CTA button
- ✅ Optional background image
- ✅ Configurable stats
- ✅ Loading state
- ✅ Fallback to defaults if CMS unavailable

### About Us Section
- ✅ Editable company name
- ✅ Customizable descriptions (supports HTML)
- ✅ Configurable stats with icons and colors
- ✅ Customizable values/capabilities cards
- ✅ Configurable achievement badges
- ✅ Loading state
- ✅ Fallback to defaults if CMS unavailable

## Benefits

1. **No Code Changes Needed** - Update content through CMS admin panel
2. **Single Source of Truth** - All content in one place
3. **Graceful Degradation** - Falls back to defaults if CMS is down
4. **Type Safe** - Full TypeScript support
5. **Loading States** - Smooth user experience while fetching
6. **Flexible** - Supports HTML in descriptions for rich formatting

## Troubleshooting

### Content Not Showing

1. Check Strapi is running: http://localhost:1337/admin
2. Verify content is saved in CMS
3. Check browser console for errors
4. Verify API URL in `.env.local`:
   ```
   NEXT_PUBLIC_CMS_URL=http://localhost:1337
   ```

### JSON Format Errors

- Ensure JSON is valid (use a JSON validator)
- Check for missing commas or brackets
- Copy exact format from sample data files

### Images Not Loading

- Ensure images are uploaded to Strapi
- Check image permissions in Strapi settings
- Verify image URLs in browser network tab

## Next Steps

You can now:
1. Update hero content anytime through CMS
2. Modify about us content through CMS
3. Add/remove stats, values, and achievements
4. Change company information without code changes

---

**Created:** December 18, 2024
**Status:** ✅ Complete and Ready to Use
