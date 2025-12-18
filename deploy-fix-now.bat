@echo off
echo ========================================
echo  DEPLOYING BUILD FIX TO VERCEL
echo ========================================
echo.
echo This will push the fix for the build error to GitHub.
echo Vercel will automatically deploy after the push.
echo.
pause

echo.
echo [1/3] Adding all changes...
git add .

echo.
echo [2/3] Committing changes...
git commit -m "Fix: Update industries page to use keyPoints instead of caseExamples"

echo.
echo [3/3] Pushing to GitHub...
git push origin main

echo.
echo ========================================
echo  PUSH COMPLETE!
echo ========================================
echo.
echo Vercel will now automatically deploy your site.
echo.
echo Check deployment status at:
echo https://vercel.com/dashboard
echo.
echo The build should succeed this time!
echo.
echo ========================================
pause
