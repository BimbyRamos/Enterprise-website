@echo off
echo ========================================
echo  CONTACT FORM SETUP
echo ========================================
echo.
echo This will install EmailJS and help you setup the contact form.
echo.
pause

echo.
echo [1/3] Installing EmailJS package...
echo.
call npm install @emailjs/browser

echo.
echo ========================================
echo  INSTALLATION COMPLETE!
echo ========================================
echo.
echo NEXT STEPS:
echo.
echo 1. Open EMAILJS_QUICK_SETUP.txt
echo 2. Follow the step-by-step guide
echo 3. Get your EmailJS credentials
echo 4. Add them to .env.local file
echo 5. Restart your dev server
echo.
echo After setup, test the form at:
echo http://localhost:3000/contact
echo.
echo ========================================
pause
