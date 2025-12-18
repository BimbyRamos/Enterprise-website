# Strapi API Permissions Configuration Guide

## Task 3.1: Set Public Permissions

This guide will walk you through configuring public API permissions in Strapi so that your Next.js frontend can access the content.

### Prerequisites
- Strapi must be running on http://localhost:1337
- You must be logged into the Strapi admin panel
- Content types (Project, Service, Industry, Article) must be created

### Step-by-Step Instructions

#### 1. Start Strapi (if not already running)
```bash
cd strapi
npm run develop
```

Wait for Strapi to start. You should see:
```
[INFO] ⚡️ Server started on http://localhost:1337
```

#### 2. Access the Admin Panel
- Open your browser and go to: http://localhost:1337/admin
- Log in with your admin credentials

#### 3. Navigate to Permissions Settings
1. In the left sidebar, click on **Settings** (gear icon at the bottom)
2. Under "USERS & PERMISSIONS PLUGIN" section, click on **Roles**
3. Click on the **Public** role (this is the role for unauthenticated users)

#### 4. Configure Project Permissions
1. Scroll down to find the **Project** section
2. Click to expand it
3. Check the following permissions:
   - ☑️ **find** (allows fetching all projects)
   - ☑️ **findOne** (allows fetching a single project by ID)
4. Leave other permissions unchecked (create, update, delete should remain unchecked for security)

#### 5. Configure Service Permissions
1. Find the **Service** section
2. Click to expand it
3. Check the following permissions:
   - ☑️ **find** (allows fetching all services)
   - ☑️ **findOne** (allows fetching a single service by ID)

#### 6. Configure Industry Permissions
1. Find the **Industry** section
2. Click to expand it
3. Check the following permissions:
   - ☑️ **find** (allows fetching all industries)
   - ☑️ **findOne** (allows fetching a single industry by ID)

#### 7. Configure Article Permissions
1. Find the **Article** section
2. Click to expand it
3. Check the following permissions:
   - ☑️ **find** (allows fetching all articles)
   - ☑️ **findOne** (allows fetching a single article by ID)

#### 8. Save Changes
1. Scroll to the top of the page
2. Click the **Save** button in the top-right corner
3. Wait for the confirmation message: "Saved"

### Visual Checklist

After completing the steps above, your Public role permissions should look like this:

```
Public Role Permissions:
├── Project
│   ├── ☑️ find
│   ├── ☑️ findOne
│   ├── ☐ create
│   ├── ☐ update
│   └── ☐ delete
├── Service
│   ├── ☑️ find
│   ├── ☑️ findOne
│   ├── ☐ create
│   ├── ☐ update
│   └── ☐ delete
├── Industry
│   ├── ☑️ find
│   ├── ☑️ findOne
│   ├── ☐ create
│   ├── ☐ update
│   └── ☐ delete
└── Article
    ├── ☑️ find
    ├── ☑️ findOne
    ├── ☐ create
    ├── ☐ update
    └── ☐ delete
```

### Security Note
We're only enabling `find` and `findOne` permissions for the Public role. This allows anyone to read the content but prevents unauthorized users from creating, updating, or deleting content. Only authenticated administrators can modify content through the admin panel.

### Troubleshooting

**Problem:** Can't find the content type sections
- **Solution:** Make sure the content types were created successfully. Go to Content-Type Builder and verify that Project, Service, Industry, and Article exist.

**Problem:** Save button is grayed out
- **Solution:** Make sure you've made at least one change to the permissions before trying to save.

**Problem:** Changes don't seem to take effect
- **Solution:** Try refreshing the Strapi admin panel or restarting the Strapi server.

---

## Next Step: Task 3.2 - Test API Endpoints

Once you've completed the permission configuration above, proceed to test the API endpoints to verify everything is working correctly.
