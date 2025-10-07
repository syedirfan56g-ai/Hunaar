#!/bin/bash

# Hunaar Deployment Script for Render.com
# This script helps deploy Hunaar to Render using the CLI

set -e

echo "🚀 Hunaar Deployment Script"
echo "============================"

# Check if render CLI is installed
if ! command -v render &> /dev/null; then
    echo "❌ Render CLI not found. Please install it first:"
    echo "npm install -g @render/cli"
    echo "or visit: https://render.com/docs/cli"
    exit 1
fi

# Check if user is logged in
if ! render auth whoami &> /dev/null; then
    echo "🔑 Please log in to Render first:"
    echo "render auth login"
    exit 1
fi

echo "✅ Render CLI found and authenticated"

# Check for required environment variables
if [ ! -f .env.production ]; then
    echo "⚠️  .env.production not found. Creating template..."
    cat > .env.production << EOF
# Supabase Configuration (REQUIRED)
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here

# Backend Configuration
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secure-jwt-secret-for-production

# Frontend Configuration  
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_API_URL=https://hunaar-backend.onrender.com
EOF
    echo "📝 Please edit .env.production with your actual values before deploying"
    echo "   Then run this script again."
    exit 1
fi

echo "✅ Environment configuration found"

# Install dependencies
echo "📦 Installing dependencies..."
npm run install:all

# Build frontend
echo "🏗️  Building frontend..."
cd frontend && npm run build && cd ..

echo "✅ Build completed successfully"

# Initialize git if not already done
if [ ! -d .git ]; then
    echo "📝 Initializing git repository..."
    git init
    git add .
    git commit -m "Initial commit - Hunaar SaaS Platform"
fi

# Deploy to Render
echo "🚀 Deploying to Render..."
render deploy

echo ""
echo "🎉 Deployment initiated!"
echo "   Check your Render dashboard for deployment status"
echo "   Your app will be available at:"
echo "   - Backend:  https://hunaar-backend.onrender.com"  
echo "   - Frontend: https://hunaar-frontend.onrender.com"
echo ""
echo "📋 Next steps:"
echo "   1. Configure your Supabase environment variables in Render dashboard"
echo "   2. Set up your database using the provided schema"
echo "   3. Test your application"
echo ""
echo "✅ Deployment script completed!"