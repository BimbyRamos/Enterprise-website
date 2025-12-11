@echo off
echo ========================================
echo   Strapi CMS Quick Setup
echo ========================================
echo.
echo This will install Strapi CMS in your project.
echo Installation will take 3-5 minutes.
echo.
echo Your browser will open automatically when ready.
echo.
pause

echo.
echo Installing Strapi... Please wait...
echo.

npx create-strapi-app@latest strapi --quickstart

if errorlevel 1 (
    echo.
    echo ========================================
    echo   ERROR: Installation Failed
    echo ========================================
    echo.
    echo Please check the error messages above.
    echo.
    echo Common fixes:
    echo 1. Make sure you have internet connection
    echo 2. Try running as administrator
    echo 3. Check if port 1337 is available
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Strapi is Running
echo ========================================
echo.
echo Access your CMS at:
echo   http://localhost:1337/admin
echo.
echo Create your admin account in the browser.
echo.
echo Press Ctrl+C to stop Strapi when done.
echo.
pause
