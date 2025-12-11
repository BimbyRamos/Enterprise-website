# Push Your Code to GitHub - Step by Step

## ✅ Good News: Git is Already Installed!

Version: 2.52.0.windows.1

---

## 🚀 Quick Method: Use the Script

I created a helper script that does everything for you!

### Just double-click this file:
```
push-to-github.cmd
```

**It will:**
1. ✅ Initialize Git
2. ✅ Configure your name/email
3. ✅ Add all files
4. ✅ Commit changes
5. ✅ Guide you through pushing to GitHub

---

## 📋 Manual Method (If You Prefer)

### Step 1: Configure Git (First Time Only)

Open Command Prompt and run:

```cmd
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

Replace with your actual name and email.

---

### Step 2: Initialize Git

```cmd
git init
```

---

### Step 3: Add All Files

```cmd
git add .
```

---

### Step 4: Commit

```cmd
git commit -m "Initial commit - Enterprise website"
```

---

### Step 5: Create GitHub Repository

1. **Go to**: https://github.com/new

2. **Fill in**:
   - Repository name: `enterprise-website`
   - Description: `Professional enterprise website`
   - Keep it **PUBLIC** (required for free Vercel)
   - **DON'T** check "Initialize with README"

3. **Click** "Create repository"

4. **Copy** the repository URL:
   ```
   https://github.com/YOUR_USERNAME/enterprise-website.git
   ```

---

### Step 6: Push to GitHub

```cmd
git remote add origin https://github.com/YOUR_USERNAME/enterprise-website.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

---

## 🔐 Authentication

When you push for the first time, GitHub will ask you to authenticate:

### Option 1: Browser Authentication (Easiest)
1. A browser window will open
2. Sign in to GitHub
3. Click "Authorize"
4. Done!

### Option 2: Personal Access Token
If browser doesn't open:
1. Go to: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Give it a name: "Vercel Deployment"
4. Check: `repo` (all)
5. Click "Generate token"
6. Copy the token
7. Use it as your password when pushing

---

## ✅ Verify It Worked

After pushing, visit:
```
https://github.com/YOUR_USERNAME/enterprise-website
```

You should see all your files!

---

## 🎯 Next Step: Deploy to Vercel

Once your code is on GitHub:

1. Go to: **https://vercel.com/signup**
2. Click "Continue with GitHub"
3. Click "Add New" → "Project"
4. Select your `enterprise-website` repository
5. Click "Deploy"
6. Wait 2-3 minutes
7. Get your public URL! 🎉

---

## 🔄 Updating Your Code Later

After making changes:

```cmd
git add .
git commit -m "Updated content"
git push
```

Vercel will automatically deploy the changes!

---

## 🐛 Troubleshooting

### "fatal: not a git repository"
Run: `git init`

### "Author identity unknown"
Run:
```cmd
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```

### "Authentication failed"
1. Make sure you're logged into GitHub
2. Try the browser authentication
3. Or use a Personal Access Token

### "remote origin already exists"
Run:
```cmd
git remote set-url origin https://github.com/YOUR_USERNAME/enterprise-website.git
```

---

## 📞 Need Help?

If you get stuck, just let me know the error message and I'll help you fix it!

---

## ✨ Summary

**Easiest way**: Double-click `push-to-github.cmd`

**Manual way**: Run the commands above

**Result**: Your code on GitHub, ready to deploy to Vercel!

🚀 Let's get your website live!
