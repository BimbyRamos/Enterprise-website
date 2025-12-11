@echo off
echo Moving logo to public folder...
move "NCVI logo Dec 10.png" "public\NCVI logo Dec 10.png"
if %errorlevel% == 0 (
    echo Logo moved successfully!
    echo The logo is now at: public\NCVI logo Dec 10.png
) else (
    echo Error: Could not move the logo file.
    echo Please make sure the file "NCVI logo Dec 10.png" exists in the current directory.
)
pause
