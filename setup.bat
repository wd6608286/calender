@echo off
echo ====================================
echo Calender Vue Project Setup Script
echo ====================================
echo.

echo Step 1: Copying assets from original project...
if not exist "public\images" (
    xcopy /E /I /Y "..\Calender\images" "public\images"
    echo Images copied successfully
) else (
    echo Images already exist
)

if not exist "public\media" (
    xcopy /E /I /Y "..\Calender\media" "public\media"
    echo Media files copied successfully
) else (
    echo Media files already exist
)

echo.
echo Step 2: Copying CSS files...
if not exist "src\assets" mkdir src\assets
copy /Y "..\Calender\css\style.css" "src\assets\style.css"
copy /Y "..\Calender\css\clndr.css" "src\assets\clndr.css"
copy /Y "..\Calender\css\audio.css" "src\assets\audio.css"
copy /Y "..\Calender\css\easy-responsive-tabs.css" "src\assets\easy-responsive-tabs.css"
echo CSS files copied successfully

echo.
echo Step 3: Installing backend dependencies...
cd server
call npm install
cd ..
echo Backend dependencies installed

echo.
echo ====================================
echo Setup Complete!
echo ====================================
echo.
echo Next steps:
echo 1. Make sure MySQL is running in Docker
echo 2. Update server/index.js with your MySQL credentials
echo 3. Create MySQL database: CREATE DATABASE calender_db;
echo 4. Start backend: cd server ^&^& npm start
echo 5. Start frontend: npm run dev
echo.
pause