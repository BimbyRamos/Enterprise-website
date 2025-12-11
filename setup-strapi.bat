@echo off
echo ========================================
echo   Strapi CMS Setup for Windows
echo ========================================
echo.

echo Checking if Strapi is already initialized...
if exist "strapi\package.json" (
    echo Strapi is already initialized!
    echo.
    echo Choose an option:
    echo 1. Start Strapi (Development Mode)
    echo 2. Start All Services (Docker)
    echo 3. Reinitialize Strapi
    echo 4. Exit
    echo.
    set /p choice="Enter your choice (1-4): "
    
    if "%choice%"=="1" goto start_strapi
    if "%choice%"=="2" goto start_docker
    if "%choice%"=="3" goto reinit
    if "%choice%"=="4" goto end
    
    echo Invalid choice!
    goto end
)

echo Strapi is not initialized yet.
echo.
echo This will:
echo - Create Strapi CMS in the strapi folder
echo - Install all dependencies
echo - Set up the database
echo - Open the admin panel
echo.
set /p confirm="Continue? (Y/N): "

if /i not "%confirm%"=="Y" goto end

echo.
echo Initializing Strapi... This may take a few minutes.
echo.

npx create-strapi-app@latest strapi --quickstart

if errorlevel 1 (
    echo.
    echo ERROR: Strapi initialization failed!
    echo Please check the error messages above.
    pause
    goto end
)

echo.
echo ========================================
echo   Strapi Setup Complete!
echo ========================================
echo.
echo Strapi should now be running at:
echo   http://localhost:1337/admin
echo.
echo Create your admin account in the browser.
echo.
pause
goto end

:start_strapi
echo.
echo Starting Strapi in development mode...
echo.
cd strapi
npm run develop
goto end

:start_docker
echo.
echo Starting all services with Docker...
echo.
docker-compose up
goto end

:reinit
echo.
echo WARNING: This will delete the existing Strapi installation!
set /p confirm_delete="Are you sure? (Y/N): "

if /i not "%confirm_delete%"=="Y" goto end

echo Removing old Strapi installation...
rmdir /s /q strapi
mkdir strapi
echo. > strapi\.gitkeep

echo.
echo Reinitializing Strapi...
npx create-strapi-app@latest strapi --quickstart
goto end

:end
echo.
echo Done!
pause
