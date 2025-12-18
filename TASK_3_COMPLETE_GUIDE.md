# Task 3: Configure Strapi API Permissions - Complete Guide

This guide covers both subtasks for configuring and testing Strapi API permissions.

## Overview

We need to configure Strapi to allow public (unauthenticated) access to read content through the API. This is essential for your Next.js frontend to fetch and display content.

**Requirements:** 12.1, 14.1

---

## Subtask 3.1: Set Public Permissions

### Step 1: Ensure Strapi is Running

Open a terminal and run:
```bash
cd strapi
npm run develop
```

Wait for the message:
```
[INFO] ⚡️ Server started on http://localhost:1337
```

### Step 2: Access Strapi Admin Panel

1. Open your browser
2. Navigate to: http://localhost:1337/admin
3. Log in with your admin credentials

### Step 3: Navigate to Permissions

1. Click **Settings** in the left sidebar (gear icon at bottom)
2. Under "USERS & PERMISSIONS PLUGIN", click **Roles**
3. Click on the **Public** role

### Step 4: Configure Permissions for Each Content Type

For **each** of the following content types, expand the section and check these permissions:

#### Project
- ☑️ find
- ☑️ findOne

#### Service
- ☑️ find
- ☑️ findOne

#### Industry
- ☑️ find
- ☑️ findOne

#### Article
- ☑️ find
- ☑️ findOne

**Important:** Leave create, update, and delete unchecked for security!

### Step 5: Save Changes

1. Click the **Save** button in the top-right corner
2. Wait for the "Saved" confirmation message

✅ **Subtask 3.1 Complete!**

---

## Subtask 3.2: Test API Endpoints

Now we'll verify that the permissions are working correctly.

### Method 1: Automated Testing (Recommended)

Simply run the test script:

**Windows:**
```bash
test-strapi-api.bat
```

**Or using Node directly:**
```bash
node test-strapi-api.js
```

The script will test all four endpoints and provide a detailed report.

**Expected Output (Success):**
```
═══════════════════════════════════════════════════════
  Strapi API Endpoint Testing
═══════════════════════════════════════════════════════

🌐 Testing Strapi at: http://localhost:1337

🔍 Testing Projects endpoint...
   URL: http://localhost:1337/api/projects
   Status: 200 OK
   ✅ SUCCESS - Received data

🔍 Testing Services endpoint...
   URL: http://localhost:1337/api/services
   Status: 200 OK
   ✅ SUCCESS - Received data

🔍 Testing Industries endpoint...
   URL: http://localhost:1337/api/industries
   Status: 200 OK
   ✅ SUCCESS - Received data

🔍 Testing Articles endpoint...
   URL: http://localhost:1337/api/articles
   Status: 200 OK
   ✅ SUCCESS - Received data

═══════════════════════════════════════════════════════
  Test Summary
═══════════════════════════════════════════════════════

✅ Projects        (200)
✅ Services        (200)
✅ Industries      (200)
✅ Articles        (200)

📊 Results: 4 passed, 0 failed out of 4 tests

🎉 All API endpoints are accessible!
✅ Task 3.2 completed successfully
```

### Method 2: Manual Browser Testing

Open your browser and test each URL:

1. **Projects:** http://localhost:1337/api/projects
2. **Services:** http://localhost:1337/api/services
3. **Industries:** http://localhost:1337/api/industries
4. **Articles:** http://localhost:1337/api/articles

**What to expect:**
- ✅ **Success (200):** You see JSON data like `{"data":[],"meta":{...}}`
- ❌ **Forbidden (403):** You see an error - permissions not configured correctly
- ❌ **Not Found (404):** Content type doesn't exist

Even if the arrays are empty (no content added yet), seeing `{"data":[]}` means the permissions are working!

---

## Troubleshooting

### Problem: "403 Forbidden" Error

**Cause:** Permissions not configured correctly

**Solution:**
1. Go back to Strapi admin → Settings → Roles → Public
2. Verify that find and findOne are checked for all content types
3. Click Save
4. Refresh the browser and test again

### Problem: "404 Not Found" Error

**Cause:** Content type doesn't exist

**Solution:**
1. Go to Content-Type Builder in Strapi admin
2. Verify that Project, Service, Industry, and Article content types exist
3. If missing, create them following Task 2 instructions

### Problem: "Network Error" or "Cannot connect"

**Cause:** Strapi is not running

**Solution:**
1. Open a terminal
2. Run: `cd strapi && npm run develop`
3. Wait for Strapi to start
4. Test again

### Problem: Empty arrays but expected content

**Cause:** No content has been added yet (this is normal!)

**Solution:**
- This is expected if you haven't added content yet
- The API is working correctly
- You'll add content in Task 4

---

## Verification Checklist

Before moving to the next task, verify:

- [ ] Strapi is running on http://localhost:1337
- [ ] You can access the admin panel
- [ ] Public role has find and findOne permissions for all 4 content types
- [ ] All 4 API endpoints return 200 status (not 403 or 404)
- [ ] You see JSON responses (even if empty arrays)

---

## What's Next?

Once both subtasks are complete:
- ✅ Task 3.1: Public permissions configured
- ✅ Task 3.2: API endpoints tested and working

**Next Task:** Task 4 - Add sample content to Strapi

This will populate your content types with actual data that you can see through the API!

---

## Quick Reference

**Strapi Admin:** http://localhost:1337/admin
**API Base URL:** http://localhost:1337/api

**Endpoints:**
- Projects: `/api/projects`
- Services: `/api/services`
- Industries: `/api/industries`
- Articles: `/api/articles`

**Test Command:** `node test-strapi-api.js`
