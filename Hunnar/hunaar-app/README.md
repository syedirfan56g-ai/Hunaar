# Hunaar - Full-Stack SaaS Automation Platform

🚀 **A modern, production-ready automation platform similar to Pabbly Connect, built with Next.js, Node.js, and Supabase.**

## 🌟 Features

- **Complete SaaS Platform**: Modern, responsive UI with professional dashboard
- **User Authentication**: Secure signup/signin with Supabase Auth
- **Workflow Builder**: Visual workflow creation and management
- **500+ Integrations**: Connect Gmail, Slack, Trello, Notion, and more
- **Real-time Analytics**: Track workflow performance and success rates
- **Production Ready**: Optimized for Render.com deployment
- **No GitHub Required**: Direct CLI deployment support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express.js, JWT Authentication
- **Database**: Supabase (PostgreSQL + Auth + Real-time)
- **Deployment**: Render.com (CLI-based)
- **Icons**: Lucide React
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod validation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Render.com account (for deployment)

### 1. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings → API to get your credentials:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY` 
   - `SUPABASE_SERVICE_ROLE_KEY`
3. Run the database schema:
   ```sql
   -- Copy and paste the contents of config/supabase-schema.sql
   -- into your Supabase SQL Editor and execute
   ```

### 2. Environment Setup

1. Copy environment variables:
   ```bash
   cp .env.example .env
   ```

2. Fill in your Supabase credentials in `.env`:
   ```env
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   PORT=3001
   JWT_SECRET=your-secure-jwt-secret
   
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

### 3. Install Dependencies

```bash
# Install all dependencies (root, backend, frontend)
npm run install:all
```

### 4. Development

```bash
# Start both backend and frontend in development mode
npm run dev
```

Visit:
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Health Check: http://localhost:3001/health

## 🌐 Deployment Options

### Quick Start: GitHub Deployment

1. **Install Git** (if not already installed):
   - Download from: https://git-scm.com/download/win
   - Run the setup script: `setup-github.bat`

2. **Create GitHub Repository:**
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/hunaar-app.git
   git branch -M main
   git push -u origin main
   ```

3. **Choose Your Deployment Platform:**
   - **GitHub Pages**: Free static hosting (frontend only)
   - **Vercel**: Full-stack serverless (recommended)
   - **Render**: Traditional server deployment
   - **Netlify**: JAMstack with functions

📖 **Detailed Instructions**: See [`GITHUB_DEPLOYMENT.md`](./GITHUB_DEPLOYMENT.md)

### Original: Render.com CLI Deployment

### Method 1: Using Deploy Script (Recommended)

1. Install Render CLI:
   ```bash
   npm install -g @render/cli
   ```

2. Login to Render:
   ```bash
   render auth login
   ```

3. Copy production environment:
   ```bash
   cp .env.production.example .env.production
   ```

4. Edit `.env.production` with your production values

5. Run deployment script:
   ```bash
   # On Windows
   ./deploy.bat
   
   # On Mac/Linux
   chmod +x scripts/deploy.sh
   ./scripts/deploy.sh
   ```

### Method 2: Manual CLI Deployment

```bash
# Initialize git (if not done)
git init
git add .
git commit -m "Initial commit"

# Deploy to Render
render deploy
```

### Method 3: Render Dashboard

1. Create two web services in Render dashboard:
   - **Backend Service**:
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`
     - Environment: Add all backend environment variables
   
   - **Frontend Service**:
     - Build Command: `cd frontend && npm install && npm run build` 
     - Start Command: `cd frontend && npm start`
     - Environment: Add all frontend environment variables

## 📁 Project Structure

```
hunaar-app/
├── backend/                 # Node.js/Express API
│   ├── routes/             # API routes (auth, workflows, integrations)
│   ├── middleware/         # Authentication middleware
│   ├── config/            # Supabase configuration
│   └── server.js          # Express server
├── frontend/               # Next.js React app
│   ├── app/               # Next.js 13+ app directory
│   ├── components/        # React components
│   │   ├── auth/         # Authentication components
│   │   ├── dashboard/    # Dashboard components  
│   │   ├── layout/       # Layout components
│   │   └── providers/    # Context providers
│   └── styles/           # Global styles
├── config/                # Configuration files
│   └── supabase-schema.sql # Database schema
├── scripts/               # Deployment scripts
├── render.yaml           # Render deployment config
└── README.md             # This file
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout
- `GET /api/auth/profile` - Get user profile

### Workflows
- `GET /api/workflows` - Get user workflows
- `POST /api/workflows` - Create new workflow
- `PUT /api/workflows/:id` - Update workflow
- `DELETE /api/workflows/:id` - Delete workflow
- `POST /api/workflows/:id/execute` - Execute workflow

### Integrations
- `GET /api/integrations` - Get available integrations
- `GET /api/integrations/connected` - Get user's connected integrations
- `POST /api/integrations/connect/:id` - Connect integration
- `DELETE /api/integrations/disconnect/:id` - Disconnect integration

## 🎨 UI Components

- **Authentication**: Login/signup forms with validation
- **Dashboard**: Stats overview, recent workflows, quick actions
- **Workflow Builder**: Visual workflow creation interface
- **Integrations**: Available apps and connection management
- **Analytics**: Performance metrics and charts

## 🔒 Security Features

- JWT-based authentication
- Row Level Security (RLS) in Supabase
- Rate limiting on API endpoints
- Input validation and sanitization
- CORS protection
- Helmet.js security headers

## 📊 Sample Integrations

The platform includes sample integrations for:
- **Email**: Gmail
- **Messaging**: Slack, Discord
- **Productivity**: Google Sheets, Trello, Notion
- **CRM**: Salesforce
- **E-commerce**: Shopify
- **Social**: Twitter
- **Developer**: Webhooks

## 🚦 Environment Variables

### Backend (.env)
```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
PORT=3001
NODE_ENV=development
JWT_SECRET=your_jwt_secret
```

### Frontend (.env)
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## 🐛 Troubleshooting

### Common Issues

1. **Supabase Connection Error**
   - Verify your Supabase URL and keys
   - Check if RLS policies are properly set up

2. **Build Failures**
   - Ensure Node.js version is 18+
   - Run `npm run install:all` to install all dependencies

3. **Authentication Issues**
   - Verify JWT_SECRET is set
   - Check Supabase Auth settings

4. **Deployment Issues**
   - Ensure all environment variables are set in Render
   - Check build logs for specific errors

### Development Commands

```bash
# Install dependencies
npm run install:all

# Development (both frontend and backend)
npm run dev

# Backend only
npm run dev:backend

# Frontend only  
npm run dev:frontend

# Build for production
npm run build

# Start production
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🎯 Roadmap

- [ ] Advanced workflow conditions
- [ ] Real-time collaboration
- [ ] Workflow templates
- [ ] Advanced analytics
- [ ] Mobile app
- [ ] Enterprise features

## 💡 Support

- Check the troubleshooting section
- Review Supabase documentation
- Check Render.com deployment guides
- Create an issue for bugs or feature requests

---

**Built with ❤️ for automation enthusiasts**

🚀 **Ready to deploy? Run `./deploy.bat` on Windows or `./scripts/deploy.sh` on Mac/Linux!**