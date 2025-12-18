@echo off
echo ========================================
echo Strapi Content Types Verification
echo ========================================
echo.
echo This script will help you verify that all content types were created successfully.
echo.
echo Step 1: Starting Strapi server...
echo.
cd strapi
echo Running: npm run develop
echo.
echo After Strapi starts:
echo 1. Open http://localhost:1337/admin in your browser
echo 2. Log in with your admin credentials
echo 3. Check the left sidebar for:
echo    - Projects
echo    - Services  
echo    - Industries
echo    - Articles
echo.
echo Press Ctrl+C to stop the server when done.
echo.
npm run develop
