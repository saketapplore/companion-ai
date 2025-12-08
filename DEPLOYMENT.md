# Admin Panel Deployment Guide

This guide covers deploying the AI Companion Admin Panel to various platforms.

## Prerequisites

1. Node.js 18+ installed
2. Backend API deployed and accessible
3. Admin credentials created in backend

## Option 1: Deploy to Vercel (Recommended)

### Steps:

1. **Install Vercel CLI (if not installed):**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Navigate to admin panel directory:**
   ```bash
   cd companion-ai
   ```

4. **Deploy:**
   ```bash
   vercel
   ```
   Follow the prompts:
   - Set up and deploy? **Yes**
   - Which scope? (Select your account)
   - Link to existing project? **No**
   - Project name? (Enter: `ai-companion-admin`)
   - Directory? (Press Enter for current directory)
   - Override settings? **No**

5. **Set Environment Variable:**
   ```bash
   vercel env add VITE_API_BASE_URL
   ```
   - When prompted, enter your backend API URL:
     - For local: `http://localhost:8000/api/v1`
     - For Heroku: `https://your-app-name.herokuapp.com/api/v1`

6. **Redeploy with environment variable:**
   ```bash
   vercel --prod
   ```

### Or Deploy via Vercel Dashboard:

1. Go to https://vercel.com
2. Click "New Project"
3. Import your Git repository (or drag & drop the `companion-ai` folder)
4. Configure:
   - Framework Preset: **Vite**
   - Root Directory: `companion-ai`
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Add Environment Variable:
   - Key: `VITE_API_BASE_URL`
   - Value: Your backend API URL
6. Click "Deploy"

## Option 2: Deploy to Netlify

### Steps:

1. **Install Netlify CLI (if not installed):**
   ```bash
   npm i -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Navigate to admin panel directory:**
   ```bash
   cd companion-ai
   ```

4. **Build the project:**
   ```bash
   npm run build
   ```

5. **Deploy:**
   ```bash
   netlify deploy --prod
   ```
   - Publish directory: `dist`
   - Follow prompts to create site

6. **Set Environment Variable:**
   ```bash
   netlify env:set VITE_API_BASE_URL "https://your-backend-url.com/api/v1"
   ```

7. **Redeploy:**
   ```bash
   netlify deploy --prod
   ```

### Or Deploy via Netlify Dashboard:

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository or drag & drop the `companion-ai` folder
4. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
5. Add Environment Variable:
   - Key: `VITE_API_BASE_URL`
   - Value: Your backend API URL
6. Click "Deploy site"

## Option 3: Deploy to Heroku (Static Site)

### Steps:

1. **Install Heroku CLI:**
   ```bash
   # Already installed if you deployed backend
   ```

2. **Create Heroku App:**
   ```bash
   cd companion-ai
   heroku create ai-companion-admin --buildpack https://github.com/mars/create-react-app-buildpack.git
   ```

3. **Set Environment Variable:**
   ```bash
   heroku config:set VITE_API_BASE_URL="https://your-backend-url.com/api/v1"
   ```

4. **Deploy:**
   ```bash
   git init  # If not already a git repo
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

## Option 4: Deploy to GitHub Pages

### Steps:

1. **Install gh-pages:**
   ```bash
   cd companion-ai
   npm install --save-dev gh-pages
   ```

2. **Update package.json:**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/ai-companion-admin"
   }
   ```

3. **Build and Deploy:**
   ```bash
   npm run deploy
   ```

4. **Set Environment Variable:**
   - Go to GitHub repository Settings → Secrets
   - Add secret: `VITE_API_BASE_URL`
   - Update build to use secret (requires GitHub Actions)

## Environment Variables

### Required:
- `VITE_API_BASE_URL` - Your backend API base URL
  - Local: `http://localhost:8000/api/v1`
  - Production: `https://your-backend-url.com/api/v1`

### Setting Environment Variables:

**Vercel:**
```bash
vercel env add VITE_API_BASE_URL production
```

**Netlify:**
```bash
netlify env:set VITE_API_BASE_URL "https://your-backend-url.com/api/v1"
```

**Heroku:**
```bash
heroku config:set VITE_API_BASE_URL="https://your-backend-url.com/api/v1"
```

## Build and Test Locally

1. **Install dependencies:**
   ```bash
   cd companion-ai
   npm install
   ```

2. **Create .env file:**
   ```bash
   echo "VITE_API_BASE_URL=http://localhost:8000/api/v1" > .env
   ```

3. **Build:**
   ```bash
   npm run build
   ```

4. **Preview build:**
   ```bash
   npm run preview
   ```

5. **Test in browser:**
   - Open http://localhost:4173
   - Login with admin credentials

## Post-Deployment Checklist

- [ ] Admin panel is accessible
- [ ] Login works with backend credentials
- [ ] API calls are successful (check browser console)
- [ ] All pages load correctly
- [ ] Environment variable is set correctly
- [ ] CORS is configured on backend (if needed)

## Troubleshooting

### Build Fails
- Check Node.js version: `node --version` (should be 18+)
- Clear cache: `rm -rf node_modules package-lock.json && npm install`
- Check for errors: `npm run build`

### API Calls Fail
- Verify `VITE_API_BASE_URL` is set correctly
- Check backend CORS settings
- Verify backend is accessible
- Check browser console for errors

### 404 on Refresh
- Ensure redirect rules are configured (handled by `vercel.json` or `netlify.toml`)
- For SPA routing, all routes should redirect to `index.html`

### CORS Errors
- Update backend CORS to allow your admin panel domain
- Check backend `cors` configuration

## Support

For deployment issues:
- Vercel: https://vercel.com/docs
- Netlify: https://docs.netlify.com
- Heroku: https://devcenter.heroku.com

