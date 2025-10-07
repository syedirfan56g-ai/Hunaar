@echo off
REM Hunaar Deployment Script for Render.com (Windows)
REM This script helps deploy Hunaar to Render using the CLI

echo 🚀 Hunaar Deployment Script
echo ============================

REM Check if render CLI is installed
where render >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Render CLI not found. Please install it first:
    echo npm install -g @render/cli
    echo or visit: https://render.com/docs/cli
    exit /b 1
)

REM Check if user is logged in
render auth whoami >nul 2>nul
if %errorlevel% neq 0 (
    echo 🔑 Please log in to Render first:
    echo render auth login
    exit /b 1
)

echo ✅ Render CLI found and authenticated

REM Check for required environment variables
if not exist .env.production (
    echo ⚠️  .env.production not found. Creating template...
    copy .env.production.example .env.production
    echo 📝 Please edit .env.production with your actual values before deploying
    echo    Then run this script again.
    exit /b 1
)

echo ✅ Environment configuration found

REM Install dependencies
echo 📦 Installing dependencies...
call npm run install:all

REM Build frontend
echo 🏗️  Building frontend...
cd frontend
call npm run build
cd ..

echo ✅ Build completed successfully

REM Initialize git if not already done
if not exist .git (
    echo 📝 Initializing git repository...
    git init
    git add .
    git commit -m "Initial commit - Hunaar SaaS Platform"
)

REM Deploy to Render
echo 🚀 Deploying to Render...
render deploy

echo.
echo 🎉 Deployment initiated!
echo    Check your Render dashboard for deployment status
echo    Your app will be available at:
echo    - Backend:  https://hunaar-backend.onrender.com
echo    - Frontend: https://hunaar-frontend.onrender.com
echo.
echo 📋 Next steps:
echo    1. Configure your Supabase environment variables in Render dashboard
echo    2. Set up your database using the provided schema
echo    3. Test your application
echo.
echo ✅ Deployment script completed!