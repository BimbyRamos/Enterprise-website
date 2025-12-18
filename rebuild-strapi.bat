@echo off
echo ========================================
echo Rebuilding Strapi to Fix 404 Errors
echo ========================================
echo.

cd strapi

echo Step 1: Cleaning Strapi build...
if exist .strapi\client rmdir /s /q .strapi\client
if exist .cache rmdir /s /q .cache
if exist build rmdir /s /q build

echo.
echo Step 2: Rebuilding Strapi...
call npm run build

echo.
echo Step 3: Starting Strapi...
call npm run develop

pause
