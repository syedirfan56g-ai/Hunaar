# GitHub Deployment Guide for Hunaar SaaS Platform

This guide covers multiple deployment options for your Hunaar SaaS application using GitHub as the source.

## 🚀 Quick Deployment Options

1. **GitHub Pages** (Frontend only) - Free static hosting
2. **Vercel** (Full-stack) - Serverless deployment
3. **Render** (Full-stack) - Traditional server deployment
4. **Netlify** (Frontend + Functions) - JAMstack deployment

## 📋 Prerequisites

### 1. Install Git
- Download from: https://git-scm.com/download/win
- During installation, select "Add Git to PATH"
- Restart your terminal after installation

### 2. Create GitHub Repository
```bash
# Initialize git repository (run in project root)
git init
git add .
git commit -m "Initial commit: Hunaar SaaS Platform"

# Add GitHub remote (replace with your repository URL)
git remote add origin https://github.com/YOUR_USERNAME/hunaar-app.git
git branch -M main
git push -u origin main
```

### 3. Set Up Supabase
- Create project at [supabase.com](https://supabase.com)
- Run the SQL schema from `config/supabase-schema.sql`
- Get your credentials from Settings → API

## 🎯 Deployment Method 1: GitHub Pages (Frontend Only)

Perfect for showcasing the frontend with a demo backend.

### Setup Steps:

1. **Enable GitHub Pages:**
   - Go to your repository → Settings → Pages
   - Source: "GitHub Actions"

2. **Configure Repository Secrets:**
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_API_URL=https://your-demo-api.herokuapp.com
   ```

3. **Deploy:**
   - Push to main branch
   - GitHub Actions will automatically deploy
   - Site available at: `https://yourusername.github.io/hunaar-app`

## 🚀 Deployment Method 2: Vercel (Recommended)

Full-stack deployment with serverless functions.

### Setup Steps:

1. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Framework: Next.js

2. **Configure Environment Variables:**
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   JWT_SECRET=your_jwt_secret
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   NEXT_PUBLIC_API_URL=https://your-app.vercel.app
   ```

3. **Deploy:**
   - Vercel automatically deploys on push
   - Custom domains supported
   - Automatic HTTPS

## 🌐 Deployment Method 3: Render

Traditional server deployment with persistent storage.

### Setup Steps:

1. **Connect GitHub:**
   - Go to [render.com](https://render.com)
   - Connect your GitHub repository

2. **Create Services:**
   
   **Backend Service:**
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Add environment variables from `.env.github`
   
   **Frontend Service:**
   - Build Command: `cd frontend && npm install && npm run build`
   - Start Command: `cd frontend && npm start`
   - Add environment variables

3. **Alternative: Use render.yaml:**
   - The `render.yaml` file is already configured
   - Just add your environment variables in Render dashboard

## 📱 Deployment Method 4: Netlify

Great for JAMstack with serverless functions.

### Setup Steps:

1. **Connect Repository:**
   - Go to [netlify.com](https://netlify.com)
   - Import from GitHub

2. **Configure Build:**
   - Build command: `cd frontend && npm run build`
   - Publish directory: `frontend/out`

3. **Add Environment Variables:**
   - Same as other methods
   - Use Netlify's environment variable settings

## 🔧 GitHub Actions Workflows

Two workflows are included:

### 1. `deploy.yml` - Multi-platform Deployment
- Builds and tests the application
- Deploys to Render and/or Vercel
- Triggered on push to main branch

### 2. `github-pages.yml` - GitHub Pages Deployment
- Static export for GitHub Pages
- Frontend-only deployment
- Triggered on push to main branch

## 🔑 Environment Variables Setup

### GitHub Repository Secrets

Add these secrets in your GitHub repository:
1. Go to Settings → Secrets and Variables → Actions
2. Add the following secrets:

```
# Required for all deployments
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
JWT_SECRET=your_secure_jwt_secret

# For Render deployment
RENDER_API_KEY=your_render_api_key
RENDER_BACKEND_SERVICE_ID=srv_xxxxx
RENDER_FRONTEND_SERVICE_ID=srv_xxxxx

# For Vercel deployment
VERCEL_TOKEN=your_vercel_token
ORG_ID=your_org_id
PROJECT_ID=your_project_id

# API URL (adjust based on your deployment)
NEXT_PUBLIC_API_URL=https://your-api-url.com
```

## 🛠️ Local Development with GitHub

```bash
# Clone your repository
git clone https://github.com/YOUR_USERNAME/hunaar-app.git
cd hunaar-app

# Install dependencies
npm run install:all

# Copy environment file
cp .env.example .env

# Fill in your Supabase credentials in .env

# Start development servers
npm run dev
```

## 🔄 Continuous Deployment

Once set up, your deployment workflow:

1. **Make changes locally**
2. **Commit and push:**
   ```bash
   git add .
   git commit -m "Your change description"
   git push origin main
   ```
3. **GitHub Actions automatically:**
   - Runs tests
   - Builds the application
   - Deploys to your chosen platform(s)

## 🌍 Custom Domains

### For Vercel:
1. Go to your project settings
2. Add your custom domain
3. Update DNS records as instructed

### For Render:
1. Go to service settings
2. Add custom domain
3. Update DNS to point to Render

### For GitHub Pages:
1. Add CNAME file to frontend/public/
2. Configure custom domain in repository settings

## 🐛 Troubleshooting

### Common Issues:

1. **Build Failures:**
   - Check all environment variables are set
   - Ensure Node.js version compatibility (18+)

2. **API Connection Issues:**
   - Verify NEXT_PUBLIC_API_URL is correct
   - Check CORS settings if deploying separately

3. **Supabase Errors:**
   - Verify all Supabase credentials
   - Check RLS policies are properly configured

4. **GitHub Actions Failing:**
   - Check secrets are properly set
   - Review action logs for specific errors

### Debug Commands:

```bash
# Test build locally
npm run build

# Check environment variables
echo $NEXT_PUBLIC_SUPABASE_URL

# Test API connectivity
curl https://your-api-url.com/health
```

## 📈 Performance Optimization

1. **Enable Next.js Image Optimization**
2. **Configure CDN caching**
3. **Set up monitoring (Vercel Analytics, etc.)**
4. **Enable compression**

## 🔒 Security Checklist

- [ ] All secrets stored in repository secrets (not in code)
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] HTTPS enforced
- [ ] Environment variables validated

## 🎉 You're All Set!

Your Hunaar SaaS platform is now ready for GitHub-based deployment! Choose the method that best fits your needs:

- **GitHub Pages**: Free, perfect for demos
- **Vercel**: Best for Next.js applications
- **Render**: Great for traditional server deployment
- **Netlify**: Excellent for JAMstack applications

Happy deploying! 🚀