# Complete Guide - Adding Sample Data to Strapi

This guide will help you add all sample data to your Strapi CMS.

---

## 📁 Sample Data Files Created

1. **SAMPLE_DATA_PROJECTS.md** - 6 project entries
2. **SAMPLE_DATA_SERVICES.md** - 8 service entries
3. **SAMPLE_DATA_INDUSTRIES.md** - 4 industry entries
4. **SAMPLE_DATA_ARTICLES.md** - 5 article entries

**Total: 23 entries to add**

---

## 🚀 Quick Start

### Step 1: Open Strapi Admin
Go to: http://localhost:1337/admin

### Step 2: Navigate to Content Manager
Click "Content Manager" in the left sidebar

### Step 3: Add Content
For each content type, click "Create new entry" and copy/paste the data from the sample files.

---

## 📋 Adding Content - Step by Step

### Projects (6 entries)

1. Click "Content Manager" → "Project"
2. Click "Create new entry"
3. Open `SAMPLE_DATA_PROJECTS.md`
4. Copy and paste each field for Project 1
5. **Important for JSON fields:**
   - For `technologies`: Copy the JSON array exactly as shown
   - For `metrics`: Copy the JSON array exactly as shown
6. Click "Save"
7. Click "Publish"
8. Repeat for all 6 projects

**JSON Field Example:**
```json
["SD-WAN", "Cisco Viptela", "MPLS"]
```

---

### Services (8 entries)

1. Click "Content Manager" → "Service"
2. Click "Create new entry"
3. Open `SAMPLE_DATA_SERVICES.md`
4. Copy and paste each field for Service 1
5. The `slug` field will auto-generate from the title
6. **Important for JSON fields:**
   - For `features`: Copy the JSON array exactly
   - For `benefits`: Copy the JSON array exactly
7. For `detailedDescription`, paste the text and format it in the rich text editor
8. Click "Save"
9. Click "Publish"
10. Repeat for all 8 services

---

### Industries (4 entries)

1. Click "Content Manager" → "Industry"
2. Click "Create new entry"
3. Open `SAMPLE_DATA_INDUSTRIES.md`
4. Copy and paste each field for Industry 1
5. The `slug` field will auto-generate from the title
6. **Important for JSON fields:**
   - For `keyPoints`: Copy the JSON array exactly
   - For `stats`: Copy the JSON array exactly
7. For `gradient`, copy the CSS gradient string exactly
8. Click "Save"
9. Click "Publish"
10. Repeat for all 4 industries

---

### Articles (5 entries)

1. Click "Content Manager" → "Article"
2. Click "Create new entry"
3. Open `SAMPLE_DATA_ARTICLES.md`
4. Copy and paste each field for Article 1
5. The `slug` field will auto-generate from the title
6. For `content`, paste the text into the rich text editor
7. For `publicationDate`, use the date picker or paste the ISO date
8. Click "Save"
9. Click "Publish"
10. Repeat for all 5 articles

---

## ⚠️ Important Notes

### JSON Fields
When copying JSON data, make sure to:
- Copy the entire JSON structure including brackets `[]`
- Don't add extra spaces or line breaks
- Paste directly into the field

### Slug Fields
- Slugs auto-generate from the title
- You don't need to manually enter them
- They'll be in kebab-case (e.g., "enterprise-architecture-consultancy")

### Rich Text Fields
- Paste the content into the rich text editor
- You can format it (bold, headings, lists) in Strapi
- Or just paste as plain text - it will work fine

### Date Fields
- Use the date picker in Strapi
- Or paste ISO format: `2024-01-15T10:00:00.000Z`
- The field name is `publicationDate` (not `publishedAt`)

### Images
- All sample data has image fields left empty
- You can add images later if needed
- The content will work fine without images

---

## ✅ Verification

After adding all content, verify it's working:

1. **Check in Strapi:**
   - Go to Content Manager
   - Click each content type
   - Verify all entries are there and published

2. **Test API Endpoints:**
   ```cmd
   node test-strapi-api.js
   ```
   Should show data for all 4 endpoints

3. **Check in Browser:**
   - http://localhost:1337/api/projects
   - http://localhost:1337/api/services
   - http://localhost:1337/api/industries
   - http://localhost:1337/api/articles
   
   You should see JSON data with your entries!

---

## 📊 Progress Checklist

- [ ] Added 6 Projects
- [ ] Added 8 Services
- [ ] Added 4 Industries
- [ ] Added 5 Articles
- [ ] Verified all content is published
- [ ] Tested API endpoints
- [ ] Checked JSON responses in browser

---

## 🎯 Time Estimate

- Projects: ~15 minutes (6 entries × 2.5 min each)
- Services: ~20 minutes (8 entries × 2.5 min each)
- Industries: ~10 minutes (4 entries × 2.5 min each)
- Articles: ~15 minutes (5 entries × 3 min each)

**Total: ~60 minutes**

---

## 💡 Tips

1. **Copy-Paste is Your Friend:** Don't type manually - copy and paste from the sample files
2. **Save Often:** Click "Save" after filling each entry
3. **Don't Forget to Publish:** Entries must be published to appear in the API
4. **JSON Formatting:** If JSON gives an error, check for missing brackets or commas
5. **Take Breaks:** Add a few entries, test them, then continue

---

## 🐛 Troubleshooting

**JSON Field Error:**
- Make sure you copied the entire JSON structure
- Check for missing brackets `[]` or braces `{}`
- Remove any extra spaces or line breaks

**Slug Not Generating:**
- Make sure you filled in the title first
- The slug generates automatically when you move to another field

**Can't Publish:**
- Make sure all required fields are filled
- Check for validation errors (red text)
- Save first, then publish

**API Returns Empty:**
- Make sure you clicked "Publish" (not just "Save")
- Check that permissions are set (they should be from Task 3)
- Refresh the API endpoint in your browser

---

## 🎉 Next Steps

After adding all sample data:

1. ✅ Task 4 Complete!
2. → Move to Task 5: Connect your website to Strapi
3. → Update `lib/api.ts` to fetch from Strapi instead of mock data
4. → Test your website with real CMS data!

---

## 📝 Summary

You now have:
- 6 sample projects showcasing different types of work
- 8 services covering your full service portfolio
- 4 industries demonstrating sector expertise
- 5 articles for your insights/blog section

This gives you a fully populated CMS to test your website integration!

