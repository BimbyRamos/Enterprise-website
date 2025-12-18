@echo off
echo ========================================
echo DELETE STRAPI CONTENT TYPES
echo ========================================
echo.
echo This will DELETE all custom content types:
echo   - Project
echo   - Service
echo   - Industry
echo   - Article
echo.
echo You will need to recreate them in Strapi UI.
echo.
pause
echo.

cd strapi\src\api

echo Deleting Project content type...
if exist project rmdir /s /q project

echo Deleting Service content type...
if exist service rmdir /s /q service

echo Deleting Industry content type...
if exist industry rmdir /s /q industry

echo Deleting Article content type...
if exist article rmdir /s /q article

echo.
echo ========================================
echo Content types deleted!
echo ========================================
echo.
echo Next steps:
echo 1. Delete build cache folders
echo 2. Rebuild Strapi
echo 3. Recreate content types in Strapi UI
echo.
echo Press any key to continue with cleanup...
pause

cd ..\..

echo.
echo Cleaning build cache...
if exist .strapi\client rmdir /s /q .strapi\client
if exist .cache rmdir /s /q .cache
if exist build rmdir /s /q build

echo.
echo ========================================
echo CLEANUP COMPLETE!
echo ========================================
echo.
echo Now run: npm run develop
echo.
echo Then follow the instructions in:
echo RECREATE_CONTENT_TYPES.txt
echo.
pause
