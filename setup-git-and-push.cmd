@echo off
echo ========================================
echo   Git Setup and GitHub Push
echo ========================================
echo.

echo Step 1: Configure Git
echo ----------------------
echo.
echo Please enter your information:
echo.

set /p name="Your Name: "
set /p email="Your Email: "

git config --global user.name "%name%"
git config --global user.email "%email%"

echo.
echo ✓ Git configured!
echo.

echo Step 2: Commit Your Code
echo -------------------------
echo.

git commit -m "Initial commit - Enterprise website ready for deployment"

echo.
echo ✓ Code committed!
echo.

echo ========================================
echo   NEXT: Create GitHub Repository
echo ========================================
echo.
echo 1. Open this link in your browser:
echo    https://github.com/new
echo.
echo 2. Fill in:
echo    - Repository name: enterprise-website
echo    - Keep it PUBLIC
echo    - DON'T check any boxes
echo    - Click "Create repository"
echo.
echo 3. After creating, you'll see a URL like:
echo    https://github.com/YOUR_USERNAME/enterprise-website.git
echo.
echo 4. Copy that URL and come back here
echo.
pause

echo.
echo Step 3: Push to GitHub
echo ----------------------
echo.

set /p repo="Paste your GitHub repository URL: "

git remote add origin %repo%
git branch -M main
git push -u origin main

echo.
echo ========================================
echo   SUCCESS! 🎉
echo ========================================
echo.
echo Your code is now on GitHub!
echo.
echo NEXT STEP: Deploy to Vercel
echo 1. Go to: https://vercel.com/signup
echo 2. Sign in with GitHub
echo 3. Import your repository
echo 4. Click Deploy
echo 5. Get your public URL!
echo.
pause
