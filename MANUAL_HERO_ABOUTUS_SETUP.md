# Manual Hero & About Us Setup Guide

## Problem
The Hero and About Us sections aren't reflecting CMS changes. Let's start fresh by manually creating them in Strapi.

## Step-by-Step Instructions

### STEP 1: Delete Existing Content Types

Run this command:
```bash
delete-hero-aboutus.bat
```

This will delete the existing Hero and About Us folders.

### STEP 2: Rebuild Strapi

```bash
cd strapi
npm run build
npm run develop
```

Wait for Strapi to start (you'll see "Server started on http://localhost:1337")

### STEP 3: Create Hero Section (Single Type)

1. Open Strapi admin: http://localhost:1337/admin
2. Go to: **Content-Type Builder** (left sidebar)
3. Click: **Create new single type**
4. Display name: `Hero Section`
5. Click: **Continue**

Now add these fields:

#### Field 1: headline (Text - Short)
- Click: **Add another field**
- Select: **Text** (short text)
- Name: `headline`
- Type: **Short text**
- Click: **Advanced Settings** tab
- Check: ✅ **Required field**
- Click: **Finish**

#### Field 2: subtext (Text - Long)
- Click: **Add another field**
- Select: **Text** (long text)
- Name: `subtext`
- Type: **Long text**
- Click: **Advanced Settings** tab
- Check: ✅ **Required field**
- Click: **Finish**

#### Field 3: ctaText (Text - Short)
- Click: **Add another field**
- Select: **Text** (short text)
- Name: `ctaText`
- Type: **Short text**
- Default value: `Get Started`
- Click: **Advanced Settings** tab
- Check: ✅ **Required field**
- Click: **Finish**

#### Field 4: ctaLink (Text - Short)
- Click: **Add another field**
- Select: **Text** (short text)
- Name: `ctaLink`
- Type: **Short text**
- Default value: `#contact`
- Click: **Advanced Settings** tab
- Check: ✅ **Required field**
- Click: **Finish**

#### Field 5: backgroundImage (Media - Single)
- Click: **Add another field**
- Select: **Media** (single media)
- Name: `backgroundImage`
- Type: **Single media**
- Allowed types: **Images** only
- Click: **Finish**

#### Field 6: stats (JSON)
- Click: **Add another field**
- Select: **JSON**
- Name: `stats`
- Click: **Finish**

6. Click: **Save** (top right)
7. Wait for Strapi to restart

### STEP 4: Create About Us Section (Single Type)

1. In Content-Type Builder, click: **Create new single type**
2. Display name: `About Us Section`
3. Click: **Continue**

Now add these fields:

#### Field 1: companyName (Text - Short)
- Click: **Add another field**
- Select: **Text** (short text)
- Name: `companyName`
- Type: **Short text**
- Click: **Advanced Settings** tab
- Check: ✅ **Required field**
- Click: **Finish**

#### Field 2: mainDescription (Text - Long)
- Click: **Add another field**
- Select: **Text** (long text)
- Name: `mainDescription`
- Type: **Long text**
- Click: **Advanced Settings** tab
- Check: ✅ **Required field**
- Click: **Finish**

#### Field 3: secondaryDescription (Text - Long)
- Click: **Add another field**
- Select: **Text** (long text)
- Name: `secondaryDescription`
- Type: **Long text**
- Click: **Finish**

#### Field 4: stats (JSON)
- Click: **Add another field**
- Select: **JSON**
- Name: `stats`
- Click: **Finish**

#### Field 5: values (JSON)
- Click: **Add another field**
- Select: **JSON**
- Name: `values`
- Click: **Finish**

#### Field 6: achievements (JSON)
- Click: **Add another field**
- Select: **JSON**
- Name: `achievements`
- Click: **Finish**

4. Click: **Save** (top right)
5. Wait for Strapi to restart

### STEP 5: Set API Permissions

1. Go to: **Settings** → **Roles** → **Public**
2. Scroll down to find **Hero-section** and **About-us-section**
3. Check: ✅ **find** for both
4. Click: **Save**

### STEP 6: Add Content

#### Add Hero Content:
1. Go to: **Content Manager** → **Single Types** → **Hero Section**
2. Fill in:
   - **headline**: `Empowering transformation in integrated techno`
   - **subtext**: `Partner with the ICT arm of PJ Lhuillier Group for comprehensive technology solutions that drive growth, efficiency, and digital transformation across your enterprise.`
   - **ctaText**: `Get Started`
   - **ctaLink**: `#contact`
   - **stats**: Copy this JSON:
   ```json
   [
     {"value": "15+", "label": "Years Experience"},
     {"value": "500+", "label": "Projects Delivered"},
     {"value": "98%", "label": "Client Satisfaction"},
     {"value": "24/7", "label": "Support Available"}
   ]
   ```
3. Click: **Save**

#### Add About Us Content:
1. Go to: **Content Manager** → **Single Types** → **About Us Section**
2. Fill in:
   - **companyName**: `Networld Capital Ventures, Inc.`
   - **mainDescription**: `is the ICT arm of the PJ Lhuillier Group ('Cebuana Lhuillier') of Companies, offering a wide range of innovative ICT solutions that empower businesses to thrive in the digital age.`
   - **secondaryDescription**: `With over 15 years of excellence, we combine deep industry expertise with cutting-edge technology to deliver transformative solutions that drive growth, efficiency, and competitive advantage.`
   - **stats**: Copy this JSON:
   ```json
   [
     {"value": "15+", "label": "Years of Excellence", "icon": "📅", "color": "#8B1538"},
     {"value": "500+", "label": "Projects Delivered", "icon": "🚀", "color": "#2563EB"},
     {"value": "98%", "label": "Client Satisfaction", "icon": "⭐", "color": "#8B1538"},
     {"value": "24/7", "label": "Support Available", "icon": "🛡️", "color": "#2563EB"}
   ]
   ```
   - **values**: Copy this JSON:
   ```json
   [
     {
       "icon": "🏢",
       "title": "Part of PJ Lhuillier Group",
       "description": "Backed by the trusted Cebuana Lhuillier brand with decades of proven excellence in serving Filipino communities",
       "features": ["Established Legacy", "Trusted Brand", "Financial Stability"]
     },
     {
       "icon": "💻",
       "title": "Comprehensive ICT Solutions",
       "description": "End-to-end technology services from infrastructure to cloud, tailored to your unique business needs",
       "features": ["Full-Stack Services", "Custom Solutions", "Scalable Architecture"]
     },
     {
       "icon": "🎯",
       "title": "Innovation Focused",
       "description": "Driving digital transformation and sustainable growth through cutting-edge technology and strategic partnerships",
       "features": ["Latest Technology", "Future-Ready", "Continuous Innovation"]
     }
   ]
   ```
   - **achievements**: Copy this JSON:
   ```json
   [
     {"title": "Industry Leader", "description": "Recognized as a top ICT provider in the Philippines"},
     {"title": "Certified Partners", "description": "Official partners with leading technology vendors"},
     {"title": "Award Winning", "description": "Multiple industry awards for excellence and innovation"}
   ]
   ```
3. Click: **Save**

### STEP 7: Test the API

Open these URLs in your browser:
- Hero: http://localhost:1337/api/hero-section?populate=*
- About Us: http://localhost:1337/api/about-us-section?populate=*

You should see your content in JSON format.

### STEP 8: Update Frontend API Calls

The API endpoints will change from:
- `/api/hero` → `/api/hero-section`
- `/api/about-us` → `/api/about-us-section`

I'll update the code to use the new endpoints.

### STEP 9: Refresh Website

1. Go to: http://localhost:3000
2. Hard refresh: **Ctrl + Shift + R**
3. Your content should now appear!

## Why This Approach?

- **No Draft/Publish**: Simpler workflow, changes are immediate
- **Manual Creation**: More control over field types and settings
- **Fresh Start**: Eliminates any configuration issues from previous attempts

## Troubleshooting

If content still doesn't appear:
1. Check Strapi console for errors
2. Verify API permissions are set (Step 5)
3. Test API endpoints directly (Step 7)
4. Check browser console (F12) for errors
5. Verify `.env.local` has `NEXT_PUBLIC_CMS_URL=http://localhost:1337`
