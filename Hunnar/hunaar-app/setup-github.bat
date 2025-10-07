@echo off
REM GitHub Setup Script for Hunaar SaaS Platform (Windows)
REM This script helps set up your project for GitHub deployment

echo 🚀 Hunaar GitHub Setup Script
echo ================================

REM Check if git is installed
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Git not found. Please install Git for Windows:
    echo https://git-scm.com/download/win
    echo.
    echo After installation:
    echo 1. Restart this terminal
    echo 2. Run this script again
    exit /b 1
)

echo ✅ Git found

REM Check if this is already a git repository
if exist .git (
    echo ✅ Git repository already initialized
) else (
    echo 📝 Initializing git repository...
    git init
    echo ✅ Git repository initialized
)

REM Add all files to git
echo 📦 Adding files to git...
git add .

REM Create initial commit
echo 💾 Creating initial commit...
git commit -m "Initial commit: Hunaar SaaS Platform ready for GitHub deployment"

echo.
echo 🎉 Setup completed successfully!
echo.
echo 📋 Next steps:
echo 1. Create a new repository on GitHub
echo 2. Copy the repository URL
echo 3. Run: git remote add origin YOUR_REPO_URL
echo 4. Run: git branch -M main
echo 5. Run: git push -u origin main
echo.
echo 📖 For detailed deployment instructions, see:
echo    GITHUB_DEPLOYMENT.md
echo.
echo ✅ Your project is ready for GitHub deployment!
pause