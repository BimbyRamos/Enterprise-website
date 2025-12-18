@echo off
echo ═══════════════════════════════════════════════════════════════
echo   DELETING HERO AND ABOUT US CONTENT TYPES
echo ═══════════════════════════════════════════════════════════════
echo.
echo This will delete the existing Hero and About Us content types
echo so we can recreate them fresh.
echo.
pause

cd strapi\src\api

echo.
echo Deleting hero folder...
if exist hero (
    rmdir /s /q hero
    echo ✓ Hero folder deleted
) else (
    echo ! Hero folder not found
)

echo.
echo Deleting about-us folder...
if exist about-us (
    rmdir /s /q about-us
    echo ✓ About Us folder deleted
) else (
    echo ! About Us folder not found
)

echo.
echo ═══════════════════════════════════════════════════════════════
echo   FOLDERS DELETED
echo ═══════════════════════════════════════════════════════════════
echo.
echo Next steps:
echo 1. Rebuild Strapi: cd strapi, then npm run build
echo 2. Start Strapi: npm run develop
echo 3. Manually create content types in Strapi admin
echo.
pause
