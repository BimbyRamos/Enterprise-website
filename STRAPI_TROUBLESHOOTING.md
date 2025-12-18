# Strapi CMS - Troubleshooting Guide

Quick solutions to common Strapi issues for your NCVI website.

---

## 🚨 ERROR: Can't Save Content Type

### Symptom
You click "Save" after creating a content type or adding fields, and you get an error message or the save fails.

### Common Causes & Solutions

#### 1. Enumeration Field Values with Spaces/Special Characters

**Problem:**
```
❌ BAD VALUES:
- "In Progress"
- "Network & Security"  
- "Web Development 2.0"
- "Cloud/Infrastructure"
```

**Solution:**
```
✅ GOOD VALUES:
- "InProgress"
- "NetworkSecurity"
- "WebDevelopment"
- "CloudInfrastructure"

OR use simple single words:
- "Completed"
- "Active"
- "Pending"
```

**Best Practice:**
- Use camelCase for multi-word values
- No spaces, no special characters (!@#$%^&*/)
- No numbers at the start
- Keep it simple

**Alternative Solution:**
Instead of Enumeration, use **Text field** with a default value:
1. Select "Text" field type
2. Set default value: "Network Infrastructure"
3. Users can type any value (more flexible)

---

#### 2. Reserved Field Names

**Problem:**
Using field names that Strapi reserves for internal use.

**Reserved Names (DON'T USE):**
- `id`
- `createdAt`
- `updatedAt`
- `publishedAt`
- `createdBy`
- `updatedBy`

**Solution:**
Use different names:
- ❌ `id` → ✅ `identifier` or `customId`
- ❌ `createdAt` → ✅ `creationDate`
- ❌ `publishedAt` → ✅ `publicationDate`

---

#### 3. Adding Too Many Fields at Once

**Problem:**
Adding 10+ fields and clicking save causes timeout or error.

**Solution:**
1. Add 2-3 fields
2. Click "Save"
3. Wait for Strapi to restart (10-20 seconds)
4. Add 2-3 more fields
5. Repeat until done

**Why?** Strapi rebuilds the database schema after each save. Too many changes at once can cause issues.

---

#### 4. Database Connection Issues

**Problem:**
Strapi loses connection to the database during content type creation.

**Solution:**
1. Check the terminal where Strapi is running
2. Look for error messages (red text)
3. Press `Ctrl + C` to stop Strapi
4. Restart: `cd strapi` then `npm run develop`
5. Wait for "Server started" message
6. Try again

---

#### 5. Browser Cache Issues

**Problem:**
Old cached data interfering with new content type creation.

**Solution:**
1. Clear browser cache:
   - Chrome: `Ctrl + Shift + Delete`
   - Select "Cached images and files"
   - Click "Clear data"
2. Or use Incognito/Private mode
3. Or try a different browser

---

## 🔧 Step-by-Step Fix Process

### When You Get a Save Error:

**Step 1: Check Terminal**
```
Look at the terminal where Strapi is running.
Error messages will show the exact problem:
- "Duplicate field name" → You used a reserved name
- "Invalid enum value" → Your enum has spaces/special chars
- "Database error" → Connection issue
```

**Step 2: Identify the Problem Field**
```
The error usually mentions which field caused the issue.
Delete that field and recreate it with a different name/value.
```

**Step 3: Restart Strapi**
```cmd
1. Press Ctrl + C in terminal
2. cd strapi
3. npm run develop
4. Wait for "Server started"
```

**Step 4: Try Again with Fixes**
```
- Use simpler field names
- Use simpler enum values
- Add fields one at a time
```

---

## 📋 Content Type Creation Checklist

Before clicking "Save", verify:

- [ ] No reserved field names (id, createdAt, etc.)
- [ ] Enum values have no spaces or special characters
- [ ] Field names use camelCase (featuredImage, not featured_image)
- [ ] Adding 5 or fewer fields at once
- [ ] Strapi is still running in terminal
- [ ] No red error messages in terminal

---

## 🎯 Recommended Field Setup for Your Website

### For Project Content Type:

**Safe Enumeration Fields:**
```
Status:
- Completed
- InProgress  
- Planned
```

**Use Text Field Instead:**
```
Category (Text field with default value):
- "Network Infrastructure"
- "Cloud Solutions"
- "Digital Transformation"
- "Cybersecurity"
- "Data Analytics"
- "IT Consulting"
```

**JSON Fields (No Issues):**
```
technologies: ["SD-WAN", "Cisco", "Fortinet"]
metrics: [{"label": "Uptime", "value": "99.9%"}]
```

---

## 🔍 Other Common Issues

### Issue: Can't Access Admin Panel

**Symptoms:**
- Browser shows "Cannot connect"
- Page won't load

**Solutions:**
1. Check if Strapi is running (look at terminal)
2. Verify URL: `http://localhost:1337/admin`
3. Check if port 1337 is available
4. Restart Strapi

---

### Issue: API Returns "Forbidden"

**Symptoms:**
- Website can't fetch content
- API endpoints return 403 error

**Solution:**
1. Go to Settings → Users & Permissions → Roles
2. Click "Public"
3. Check `find` and `findOne` for each content type
4. Click "Save"

---

### Issue: Content Not Showing on Website

**Symptoms:**
- Added content in Strapi
- Website still shows old/no content

**Solutions:**
1. Make sure you clicked "Publish" (not just "Save")
2. Check API permissions (see above)
3. Refresh website with `Ctrl + F5`
4. Check browser console for errors (F12)
5. Verify API endpoint works: `http://localhost:1337/api/projects`

---

### Issue: Images Not Uploading

**Symptoms:**
- Upload fails
- Images don't appear

**Solutions:**
1. Check file size (max 10MB by default)
2. Use supported formats: JPG, PNG, WebP, SVG
3. Check available disk space
4. Restart Strapi
5. Check Media Library permissions

---

### Issue: Strapi Won't Start

**Symptoms:**
- Terminal shows errors
- Server doesn't start

**Solutions:**

**1. Port Already in Use:**
```cmd
Error: Port 1337 is already in use

Solution:
- Close other Strapi instances
- Or change port in strapi/config/server.js
```

**2. Node Version Issues:**
```cmd
Check Node version: node --version
Required: 16.x or 18.x

If wrong version:
- Install correct Node.js version
- Use nvm to switch versions
```

**3. Corrupted Cache:**
```cmd
cd strapi
rmdir /s /q .cache
rmdir /s /q .tmp
npm run develop
```

**4. Missing Dependencies:**
```cmd
cd strapi
npm install
npm run develop
```

---

## 💡 Best Practices to Avoid Issues

### 1. Plan Before Creating
- Write down all fields you need
- Check for reserved names
- Decide: Enumeration or Text?

### 2. Create Incrementally
- Add 2-3 fields at a time
- Save and test after each batch
- Don't rush

### 3. Use Simple Values
- Prefer single words for enums
- Use camelCase for field names
- Avoid special characters

### 4. Test Immediately
- After creating content type, add test content
- Check if it appears in API
- Verify on website

### 5. Keep Strapi Running
- Don't close terminal
- Watch for error messages
- Restart if you see errors

---

## 🆘 Still Having Issues?

### Check These Resources:

1. **Terminal Output**
   - Most errors show exact problem
   - Look for red text
   - Read error messages carefully

2. **Strapi Documentation**
   - https://docs.strapi.io
   - Search for your specific error

3. **Browser Console**
   - Press F12
   - Check Console tab
   - Look for red errors

4. **Database**
   - Check if SQLite file exists: `strapi/.tmp/data.db`
   - Check file permissions
   - Check disk space

---

## 📞 Quick Reference Commands

### Restart Strapi:
```cmd
Ctrl + C (stop)
cd strapi
npm run develop
```

### Clear Cache:
```cmd
cd strapi
rmdir /s /q .cache
rmdir /s /q .tmp
npm run develop
```

### Reinstall Dependencies:
```cmd
cd strapi
rmdir /s /q node_modules
npm install
npm run develop
```

### Check Strapi Version:
```cmd
cd strapi
npm list @strapi/strapi
```

---

## ✅ Success Checklist

After fixing issues, verify:

- [ ] Strapi starts without errors
- [ ] Can access admin panel: `http://localhost:1337/admin`
- [ ] Content types save successfully
- [ ] Can add and publish content
- [ ] API returns data: `http://localhost:1337/api/projects`
- [ ] Website displays content correctly

---

**Remember:** Most Strapi errors are simple to fix once you identify the cause. Check the terminal output first - it usually tells you exactly what's wrong!

Need more help? Check `STRAPI_USER_GUIDE.md` for detailed instructions.
