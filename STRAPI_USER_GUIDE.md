# Strapi CMS User Guide - Complete Tutorial

## 🎉 Welcome to Your CMS!

You now have access to Strapi at: **http://localhost:1337/admin**

This guide will walk you through everything you need to know to manage your website content.

---

## 📋 Table of Contents

1. [Understanding the Dashboard](#dashboard)
2. [Creating Content Types](#content-types)
3. [Adding Content](#adding-content)
4. [Managing Media](#media)
5. [API Permissions](#permissions)
6. [Connecting to Your Website](#connecting)
7. [Daily Usage](#daily-usage)

---

## 🏠 Understanding the Dashboard

When you log in, you'll see:

### Left Sidebar:
- **Content Manager**: Where you add/edit content
- **Content-Type Builder**: Where you create content structures
- **Media Library**: Where you manage images/files
- **Settings**: Configuration and permissions

### Main Area:
- Welcome screen with quick actions
- Statistics and recent activity

---

## 🏗️ Step 1: Creating Content Types

Content Types are like templates for your content. Let's create the ones you need for your enterprise website.

### A. Create "Services" Content Type

1. **Click** "Content-Type Builder" in the left sidebar
2. **Click** "Create new collection type"
3. **Display name**: `Service`
4. **Click** "Continue"

#### Add These Fields:

**1. Title** (Text)
- Click "Add another field"
- Select "Text"
- Name: `title`
- Type: Short text
- Required: Yes
- Click "Finish"

**2. Slug** (UID)
- Click "Add another field"
- Select "UID"
- Name: `slug`
- Attached field: `title`
- Required: Yes
- Click "Finish"

**3. Description** (Rich Text)
- Click "Add another field"
- Select "Rich Text"
- Name: `description`
- Click "Finish"

**4. Icon** (Text)
- Click "Add another field"
- Select "Text"
- Name: `icon`
- Type: Short text
- Click "Finish"

**5. Featured Image** (Media)
- Click "Add another field"
- Select "Media"
- Name: `featured_image`
- Type: Single media
- Allowed types: Images
- Click "Finish"

**6. Features** (JSON)
- Click "Add another field"
- Select "JSON"
- Name: `features`
- Click "Finish"

**7. Benefits** (JSON)
- Click "Add another field"
- Select "JSON"
- Name: `benefits`
- Click "Finish"

**8. Published At** (Date)
- Already included by default

**Click "Save"** - Strapi will restart (wait 10-20 seconds)

---

### B. Create "Projects" Content Type

1. **Click** "Create new collection type"
2. **Display name**: `Project`
3. **Click** "Continue"

#### Add These Fields:

1. **title** (Text - Short, Required)
2. **slug** (UID - Attached to title, Required)
3. **description** (Rich Text)
4. **client** (Text - Short)
5. **year** (Number - Integer)
6. **technologies** (JSON)
7. **images** (Media - Multiple files, Images only)
8. **featured** (Boolean - Default: false)
9. **category** (Enumeration)
   - Values: `web-development`, `mobile-app`, `cloud-infrastructure`, `consulting`

**Click "Save"**

---

### C. Create "Industries" Content Type

1. **Click** "Create new collection type"
2. **Display name**: `Industry`
3. **Click** "Continue"

#### Add These Fields:

1. **name** (Text - Short, Required)
2. **slug** (UID - Attached to name, Required)
3. **description** (Rich Text)
4. **icon** (Text - Short)
5. **image** (Media - Single, Images only)
6. **services** (Relation)
   - Select "Service" collection
   - Relation type: "Industry has many Services"

**Click "Save"**

---

### D. Create "Team Members" Content Type

1. **Click** "Create new collection type"
2. **Display name**: `Team Member`
3. **Click** "Continue"

#### Add These Fields:

1. **name** (Text - Short, Required)
2. **position** (Text - Short, Required)
3. **bio** (Rich Text)
4. **photo** (Media - Single, Images only)
5. **email** (Email)
6. **linkedin** (Text - Short)
7. **order** (Number - Integer)

**Click "Save"**

---

### E. Create "Blog Posts" Content Type

1. **Click** "Create new collection type"
2. **Display name**: `Blog Post`
3. **Click** "Continue"

#### Add These Fields:

1. **title** (Text - Short, Required)
2. **slug** (UID - Attached to title, Required)
3. **excerpt** (Text - Long)
4. **content** (Rich Text, Required)
5. **author** (Text - Short)
6. **featured_image** (Media - Single, Images only)
7. **category** (Enumeration)
   - Values: `technology`, `business`, `case-study`, `news`
8. **tags** (JSON)
9. **published_date** (Date)

**Click "Save"**

---

## ✍️ Step 2: Adding Content

Now that you have content types, let's add some content!

### Adding a Service:

1. **Click** "Content Manager" in left sidebar
2. **Click** "Service" under Collection Types
3. **Click** "Create new entry"

#### Fill in the fields:

**Title**: `Enterprise Architecture Consultancy`

**Description**: 
```
Strategic ICT architecture aligned with business goals. We help organizations design and implement robust enterprise architectures that drive digital transformation and business value.
```

**Icon**: `🏛️` (or any emoji/icon code)

**Features** (JSON):
```json
[
  {
    "title": "EA Roadmapping",
    "description": "Strategic planning and roadmap development"
  },
  {
    "title": "Technology Scanning",
    "description": "Emerging technology evaluation"
  },
  {
    "title": "ICT Governance",
    "description": "Framework establishment and compliance"
  }
]
```

**Benefits** (JSON):
```json
[
  "Aligned IT strategy with business objectives",
  "Reduced technology complexity",
  "Improved decision-making",
  "Cost optimization"
]
```

**Featured Image**: Click "Add new assets" and upload an image

**Click "Save"** then **Click "Publish"**

---

### Adding a Project:

1. **Click** "Content Manager" → "Project"
2. **Click** "Create new entry"

**Title**: `Digital Transformation for Financial Services`

**Client**: `Global Bank Corp`

**Year**: `2024`

**Description**:
```
Comprehensive digital transformation project including cloud migration, microservices architecture, and customer portal development.
```

**Technologies** (JSON):
```json
["AWS", "Kubernetes", "React", "Node.js", "PostgreSQL"]
```

**Category**: Select `web-development`

**Featured**: Check the box

**Images**: Upload project screenshots

**Click "Save"** then **Click "Publish"**

---

### Adding an Industry:

1. **Click** "Content Manager" → "Industry"
2. **Click** "Create new entry"

**Name**: `Healthcare`

**Description**:
```
Specialized ICT solutions for healthcare providers, including HIPAA-compliant systems, patient management platforms, and telemedicine solutions.
```

**Icon**: `🏥`

**Services**: Select related services from the dropdown

**Image**: Upload industry image

**Click "Save"** then **Click "Publish"**

---

## 📸 Step 3: Managing Media

### Uploading Images:

1. **Click** "Media Library" in left sidebar
2. **Click** "Add new assets"
3. **Drag & drop** or **browse** for files
4. **Click** "Upload"

### Organizing Media:

- Create folders for different types (Services, Projects, Team, etc.)
- Use descriptive filenames
- Optimize images before uploading (recommended: max 2MB)

### Best Practices:

- **Services**: 800x600px images
- **Projects**: 1200x800px images
- **Team photos**: 400x400px square
- **Blog featured images**: 1200x630px

---

## 🔐 Step 4: Setting Up API Permissions

Your website needs permission to access the content. Let's set that up:

### Make Content Public:

1. **Click** "Settings" in left sidebar
2. **Click** "Users & Permissions Plugin" → "Roles"
3. **Click** "Public"

4. **Expand each content type** and check these boxes:
   - ✅ **find** (get all entries)
   - ✅ **findOne** (get single entry)

5. Do this for:
   - Service
   - Project
   - Industry
   - Team Member
   - Blog Post

6. **Click "Save"**

Now your website can fetch this content via API!

---

## 🔗 Step 5: Connecting to Your Website

### API Endpoints:

Your content is now available at these URLs:

**All Services**:
```
http://localhost:1337/api/services
```

**Single Service**:
```
http://localhost:1337/api/services/1
```

**All Projects**:
```
http://localhost:1337/api/projects
```

**All Industries**:
```
http://localhost:1337/api/industries
```

### Testing the API:

Open your browser and visit:
```
http://localhost:1337/api/services
```

You should see JSON data with your services!

---

## 📱 Step 6: Daily Usage

### Common Tasks:

#### Adding New Content:
1. Content Manager → Select type
2. Create new entry
3. Fill in fields
4. Save → Publish

#### Editing Content:
1. Content Manager → Select type
2. Click on entry
3. Make changes
4. Save → Publish

#### Unpublishing Content:
1. Open entry
2. Click "Unpublish"
3. Content is hidden from website but not deleted

#### Deleting Content:
1. Open entry
2. Click "..." menu
3. Click "Delete"
4. Confirm

---

## 🎨 Step 7: Content Best Practices

### Writing Descriptions:

**Good**:
```
Strategic ICT architecture aligned with business goals. We help organizations design and implement robust enterprise architectures.
```

**Bad**:
```
We do architecture stuff.
```

### Using Rich Text:

- Use **bold** for emphasis
- Use bullet points for lists
- Add links to related pages
- Keep paragraphs short (2-3 sentences)

### SEO Tips:

- Use descriptive titles (50-60 characters)
- Write compelling descriptions (150-160 characters)
- Use relevant keywords naturally
- Add alt text to images

---

## 🔄 Step 8: Workflow

### Recommended Content Creation Flow:

1. **Plan**: Decide what content you need
2. **Gather**: Collect text, images, data
3. **Create**: Add entries in Strapi
4. **Review**: Check preview/API
5. **Publish**: Make live
6. **Update**: Keep content fresh

### Content Schedule:

- **Services**: Update quarterly
- **Projects**: Add as completed
- **Blog**: Weekly or bi-weekly
- **Team**: Update when changes occur
- **Industries**: Review annually

---

## 🛠️ Troubleshooting

### ⚠️ ERROR: Can't Save Content Type

If you get an error when clicking "Save" after creating a content type:

**Common Causes & Solutions:**

1. **Field Name Conflicts**
   - Don't use reserved words: `id`, `createdAt`, `updatedAt`, `publishedAt`
   - Use camelCase: `featuredImage` not `featured_image`
   - Avoid special characters in field names

2. **Enumeration Field Issues**
   - Strapi has strict rules for enum values
   - ❌ BAD: `"In Progress"`, `"Network & Security"`, `"Web Development 2.0"`
   - ✅ GOOD: `"InProgress"`, `"NetworkSecurity"`, `"WebDevelopment"`
   - **Solution**: Use single words or camelCase without spaces/special characters
   - **Alternative**: Use Text field instead of Enumeration for complex values

3. **Database Connection Issues**
   - Check if Strapi is still running
   - Look for errors in the terminal where Strapi is running
   - Restart Strapi: Press Ctrl+C, then run `npm run develop` again

4. **Too Many Fields at Once**
   - Add fields one at a time
   - Click "Save" after each field
   - Wait for Strapi to restart between saves

5. **Browser Cache Issues**
   - Clear browser cache (Ctrl + Shift + Delete)
   - Try in incognito/private mode
   - Try a different browser

**Step-by-Step Fix:**

1. **Check Terminal for Errors**
   - Look at the terminal where Strapi is running
   - Error messages will show the exact problem
   - Common errors: "Duplicate field name", "Invalid enum value"

2. **Start Fresh**
   - Delete the problematic content type
   - Create it again with simpler field names
   - Add fields one at a time

3. **Use Simple Field Types First**
   - Start with Text and Number fields
   - Test if it saves
   - Then add complex fields (JSON, Relations, etc.)

4. **For Category/Status Fields**
   - Instead of Enumeration with spaces: `"In Progress"`
   - Use Text field with default value: `"InProgress"`
   - Or use simple enum values: `"Completed"`, `"InProgress"`, `"Planned"`

### Can't see content on website?

1. Check if content is **Published** (not just Saved)
2. Verify API permissions are set (Step 4)
3. Check API endpoint in browser
4. Restart your Next.js website

### Images not showing?

1. Check file size (max 2MB recommended)
2. Verify file format (JPG, PNG, WebP)
3. Check API permissions include media
4. Clear browser cache

### Changes not appearing?

1. Hard refresh browser (Ctrl + F5)
2. Check if you clicked "Publish"
3. Restart Strapi if needed
4. Check browser console for errors

### Strapi Won't Start?

1. Check if port 1337 is already in use
2. Delete `.tmp` folder in strapi directory
3. Run `npm install` in strapi folder
4. Check Node.js version (needs 16.x or 18.x)

---

## 📊 Example Content Structure

### Service Entry Example:

```
Title: Cloud Infrastructure Management
Slug: cloud-infrastructure-management
Description: [Rich text with 2-3 paragraphs]
Icon: ☁️
Features: [JSON array of 4-6 features]
Benefits: [JSON array of 4-6 benefits]
Featured Image: [Upload 800x600px image]
Status: Published
```

### Project Entry Example:

```
Title: E-Commerce Platform Modernization
Slug: ecommerce-platform-modernization
Client: Retail Corp
Year: 2024
Description: [Rich text with project details]
Technologies: ["React", "Node.js", "AWS", "MongoDB"]
Category: web-development
Featured: Yes
Images: [3-5 project screenshots]
Status: Published
```

---

## 🎓 Learning Resources

### Strapi Documentation:
- **User Guide**: https://docs.strapi.io/user-docs/intro
- **Content Manager**: https://docs.strapi.io/user-docs/content-manager
- **Media Library**: https://docs.strapi.io/user-docs/media-library

### Video Tutorials:
- Search YouTube for "Strapi tutorial"
- Official Strapi channel has great content

---

## 💡 Pro Tips

1. **Use Draft Mode**: Save without publishing to work on content over time
2. **Duplicate Entries**: Use "Duplicate" to create similar content faster
3. **Bulk Actions**: Select multiple entries to publish/unpublish at once
4. **Search & Filter**: Use the search bar to find content quickly
5. **Keyboard Shortcuts**: 
   - `Ctrl + S`: Save
   - `Ctrl + P`: Publish

---

## 🚀 Next Steps

Now that you know how to use Strapi:

1. ✅ **Create all content types** (Services, Projects, Industries, etc.)
2. ✅ **Add sample content** (At least 3-5 entries per type)
3. ✅ **Set API permissions** (Make content public)
4. ✅ **Test API endpoints** (Visit URLs in browser)
5. ✅ **Connect your website** (Update frontend to fetch from Strapi)
6. ✅ **Add real content** (Replace samples with actual data)
7. ✅ **Upload media** (Add all images and files)
8. ✅ **Publish everything** (Make content live)

---

## 📞 Need Help?

If you get stuck:
1. Check the Strapi documentation
2. Search for your issue on Google
3. Ask me for help with specific questions!

---

## ✅ Quick Reference

### Starting Strapi:
```cmd
cd strapi
npm run develop
```

### Stopping Strapi:
Press `Ctrl + C` in the terminal

### Accessing Admin:
```
http://localhost:1337/admin
```

### API Base URL:
```
http://localhost:1337/api
```

### Common Endpoints:
```
/api/services
/api/projects
/api/industries
/api/team-members
/api/blog-posts
```

---

**You're all set!** 🎉 Start creating content and building your enterprise website!

Need help with anything specific? Just ask!
