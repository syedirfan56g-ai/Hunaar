# Hunaar Setup Instructions

## Quick Start Guide

### 1. Supabase Setup (5 minutes)

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Click "New Project"
   - Choose organization and project name
   - Wait for setup completion

2. **Get API Keys**:
   - Go to Settings → API
   - Copy these values:
     - Project URL
     - Anon public key
     - Service role key (keep secret)

3. **Set up Database**:
   - Go to SQL Editor
   - Copy entire contents of `config/supabase-schema.sql`
   - Paste and run the SQL commands
   - This creates all tables, policies, and sample data

### 2. Local Development Setup

```bash
# 1. Clone or download the project
cd hunaar-app

# 2. Copy environment file
copy .env.example .env

# 3. Edit .env with your Supabase credentials
notepad .env  # Add your actual Supabase values

# 4. Install all dependencies
npm run install:all

# 5. Start development servers
npm run dev
```

### 3. Test Your Setup

1. **Backend Test**: Visit http://localhost:3001/health
   - Should show: `{"status": "OK", "timestamp": "...", "environment": "development"}`

2. **Frontend Test**: Visit http://localhost:3000
   - Should show the Hunaar homepage
   - Click "Get Started" to test signup

3. **Create Test Account**:
   - Fill out signup form
   - Check email for confirmation (if email confirmation enabled)
   - Sign in and access dashboard

### 4. Render.com Deployment

```bash
# 1. Install Render CLI
npm install -g @render/cli

# 2. Login to Render
render auth login

# 3. Set up production environment
copy .env.production.example .env.production
notepad .env.production  # Add your production values

# 4. Deploy
./deploy.bat
```

Your app will be live at:
- Frontend: `https://hunaar-frontend.onrender.com`
- Backend: `https://hunaar-backend.onrender.com`

## Environment Variables Reference

### Required Supabase Variables
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Backend Variables
```env
PORT=3001
NODE_ENV=development
JWT_SECRET=your-secure-random-string-here
```

### Frontend Variables
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Troubleshooting

### "Cannot connect to Supabase"
- Check your SUPABASE_URL and SUPABASE_ANON_KEY
- Ensure they're correctly copied (no extra spaces)
- Verify your Supabase project is active

### "Authentication failed"
- Run the database schema SQL in Supabase
- Check that RLS policies are enabled
- Verify SUPABASE_SERVICE_ROLE_KEY is correct

### "Port already in use"
- Change PORT in .env to 3002 or another free port
- Or kill the process using the port

### Build/Deploy Issues
- Ensure Node.js version is 18+
- Run `npm run install:all` to reinstall dependencies
- Check Render logs for specific error messages

Need help? The main README.md has detailed troubleshooting steps!