@echo off
echo ========================================
echo   Stockmind - Desktop Application
echo ========================================
echo.
echo Building React application...
npm run build:react
if %errorlevel% neq 0 (
    echo Error: Failed to build React application
    pause
    exit /b 1
)

echo.
echo Starting Stockmind desktop application...
echo.
npm start
pause