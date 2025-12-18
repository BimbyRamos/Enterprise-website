@echo off
echo Testing Hero Section API...
echo.
echo Fetching from: http://localhost:1337/api/hero?populate=*
echo.
curl -X GET "http://localhost:1337/api/hero?populate=*" -H "Content-Type: application/json"
echo.
echo.
pause
