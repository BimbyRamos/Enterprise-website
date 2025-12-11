@echo off
echo ========================================
echo   Push Your Website to GitHub
echo ========================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo.
    echo Please download and install Git from:
    echo https://git-scm.com/downloads
    echo.
    pause
    exit /b 1
)

echo Git is installed! ✓
echo.

REM Check if already initialized
if exist ".git" (
    echo Git is already initialized in this folder.
    echo.
    goto :configure
)

echo Initializing Git repository...
git init
if errorlevel 1 (
    echo ERROR: Failed to initialize Git
    pause
    exit /b 1
)
echo Git initialized! ✓
echo.

:configure
echo ========================================
echo   Configure Git (First Time Only)
echo ========================================
echo.

REM Check if user is configured
git config user.name >nul 2>&1
if errorlevel 1 (
    echo Let's set up your Git identity.
    echo.
    set /p username="Enter your name: "
    set /p email="Enter your email: "
    
    git config --global user.name "%username%"
    git config --global user.email "%email%"
    
    echo.
    echo Git configured! ✓
    echo.
)

echo ========================================
echo   Add Files to Git
echo ========================================
echo.

echo Adding all files...
git add .
if errorlevel 1 (
    echo ERROR: Failed to add files
    pause
    exit /b 1
)
echo Files added! ✓
echo.

echo ========================================
echo   Commit Changes
echo ========================================
echo.

git commit -m "Initial commit - Enterprise website ready for deployment"
if errorlevel 1 (
    echo ERROR: Failed to commit
    pause
    exit /b 1
)
echo Changes committed! ✓
echo.

echo ========================================
echo   NEXT STEPS
echo ========================================
echo.
echo Your code is ready to push to GitHub!
echo.
echo Follow these steps:
echo.
echo 1. Go to: https://github.com/new
echo.
echo 2. Create a new repository:
echo    - Name: enterprise-website
echo    - Keep it PUBLIC (required for free Vercel)
echo    - DON'T initialize with README
echo    - Click "Create repository"
echo.
echo 3. Copy the repository URL (looks like):
echo    https://github.com/YOUR_USERNAME/enterprise-website.git
echo.
echo 4. Come back here and press any key...
echo.
pause

echo.
echo ========================================
echo   Push to GitHub
echo ========================================
echo.

set /p repo_url="Paste your GitHub repository URL: "

if "%repo_url%"=="" (
    echo ERROR: No URL provided
    pause
    exit /b 1
)

echo.
echo Adding remote repository...
git remote add origin %repo_url%
if errorlevel 1 (
    echo Remote already exists, updating...
    git remote set-url origin %repo_url%
)

echo.
echo Pushing to GitHub...
echo This may take a minute...
echo.

git branch -M main
git push -u origin main

if errorlevel 1 (
    echo.
    echo ========================================
    echo   Authentication Required
    echo ========================================
    echo.
    echo If you see an authentication error:
    echo.
    echo 1. GitHub will open a browser window
    echo 2. Sign in to your GitHub account
    echo 3. Authorize Git Credential Manager
    echo 4. Come back and try again
    echo.
    pause
    
    echo Trying again...
    git push -u origin main
)

if errorlevel 1 (
    echo.
    echo ERROR: Push failed
    echo.
    echo Common solutions:
    echo 1. Make sure you're logged into GitHub
    echo 2. Check the repository URL is correct
    echo 3. Try running: git push -u origin main
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! 🎉
echo ========================================
echo.
echo Your code is now on GitHub!
echo.
echo View it at: %repo_url%
echo.
echo NEXT STEP: Deploy to Vercel
echo.
echo 1. Go to: https://vercel.com/signup
echo 2. Sign up with GitHub
echo 3. Import your repository
echo 4. Click Deploy
echo 5. Get your public URL!
echo.
pause
