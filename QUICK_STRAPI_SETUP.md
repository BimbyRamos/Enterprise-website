# Quick Strapi Setup Instructions

## ⚠️ Issue Detected
PowerShell script execution is disabled on your system. You have two options:

---

## Option 1: Use Command Prompt (Easiest) ⭐

### Step 1: Open Command Prompt (CMD)
1. Press `Windows + R`
2. Type `cmd`
3. Press Enter

### Step 2: Navigate to Your Project
```cmd
cd "C:\Users\aqramos\Kiro website new"
```

### Step 3: Run Strapi Setup
```cmd
npx create-strapi-app@latest strapi --quickstart
```

**That's it!** Strapi will install and start automatically.

---

## Option 2: Enable PowerShell Scripts (If You Prefer PowerShell)

### Step 1: Open PowerShell as Administrator
1. Press `Windows + X`
2. Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

### Step 2: Enable Script Execution
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Step 3: Navigate to Project
```powershell
cd "C:\Users\aqramos\Kiro website new"
```

### Step 4: Run Strapi Setup
```powershell
npx create-strapi-app@latest strapi --quickstart
```

---

## Option 3: Use the Batch File (Simplest)

### Just double-click this file in your project folder:
```
setup-strapi.bat
```

This will work even with PowerShell restrictions!

---

## What Happens Next:

1. **Installation** (2-5 minutes)
   ```
   Creating a new Strapi application...
   Installing dependencies...
   ```

2. **Building** (1-2 minutes)
   ```
   Building your admin panel...
   ```

3. **Starting** (30 seconds)
   ```
   Starting your application...
   ```

4. **Browser Opens Automatically**
   - URL: http://localhost:1337/admin
   - Create your admin account
   - Start using Strapi!

---

## Troubleshooting

### If you see "command not found"
Make sure you're in the correct folder:
```cmd
cd "C:\Users\aqramos\Kiro website new"
dir
```
You should see files like `package.json`, `docker-compose.yml`, etc.

### If installation fails
Try with specific version:
```cmd
npx create-strapi-app@4.25.0 strapi --quickstart
```

### If port 1337 is busy
Kill the process:
```cmd
netstat -ano | findstr :1337
taskkill /PID <PID_NUMBER> /F
```

---

## After Setup - Access Strapi

Once installation completes:

1. **Admin Panel**: http://localhost:1337/admin
2. **Create your admin account**
3. **Start building content types**

---

## Quick Commands Reference

```cmd
# Start Strapi (after initial setup)
cd strapi
npm run develop

# Stop Strapi
Ctrl + C

# Restart Strapi
npm run develop

# Build for production
npm run build
npm start
```

---

## Need Help?

If you encounter any errors, copy the error message and let me know!

**Ready?** Open Command Prompt and run:
```cmd
cd "C:\Users\aqramos\Kiro website new"
npx create-strapi-app@latest strapi --quickstart
```

🚀 Let's get Strapi running!
