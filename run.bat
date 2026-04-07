@echo off
echo =======================================
echo    NovaTrust Chit Fund Application    
echo =======================================

:: Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Node.js is not installed.
    echo Please install Node.js from https://nodejs.org/ (version 14 or later)
    exit /b 1
)

:: Check if npm is installed
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: npm is not installed.
    echo npm should be included with Node.js installation.
    exit /b 1
)

echo Installing dependencies...
call npm install

:: Check if .env file exists
if not exist .env (
    echo Creating sample .env file...
    echo REACT_APP_SUPABASE_URL=your_supabase_url > .env
    echo REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key >> .env
    echo Please update the .env file with your Supabase credentials.
)

echo Starting the development server...
echo =======================================
echo The application will be available at:
echo http://localhost:3000
echo =======================================

call npm start
