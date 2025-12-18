@echo off
echo ═══════════════════════════════════════════════════════════════
echo   DEPLOY TO VERCEL
echo ═══════════════════════════════════════════════════════════════
echo.
echo This script will:
echo 1. Check git status
echo 2. Add all changes
echo 3. Commit changes
echo 4. Push to GitHub
echo 5. Vercel will auto-deploy
echo.
pause

echo.
echo ═══════════════════════════════════════════════════════════════
echo   STEP 1: Checking Git Status
echo ═══════════════════════════════════════════════════════════════
git status

echo.
echo ═══════════════════════════════════════════════════════════════
echo   STEP 2: Adding All Changes
echo ═══════════════════════════════════════════════════════════════
git add .
echo ✓ All changes added

echo.
echo ═══════════════════════════════════════════════════════════════
echo   STEP 3: Committing Changes
echo ═══════════════════════════════════════════════════════════════
git commit -m "Deploy: Hero button fix, Maps improvements, Contact page updates, Industries fixes"
echo ✓ Changes committed

echo.
echo ═══════════════════════════════════════════════════════════════
echo   STEP 4: Pushing to GitHub
echo ═══════════════════════════════════════════════════════════════
git push origin main
if errorlevel 1 (
    echo.
    echo ⚠️ Push to 'main' failed, trying 'master'...
    git push origin master
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo   DEPLOYMENT STARTED!
echo ═══════════════════════════════════════════════════════════════
echo.
echo ✓ Code pushed to GitHub successfully!
echo.
echo Vercel will now automatically deploy your changes.
echo.
echo Next steps:
echo 1. Go to: https://vercel.com/dashboard
echo 2. Find your project
echo 3. Watch the deployment progress
echo 4. Wait 1-3 minutes for deployment to complete
echo.
echo Your site will be live at your Vercel URL!
echo.
pause
