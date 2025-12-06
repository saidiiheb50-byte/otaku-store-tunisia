# Deploying to Vercel

This guide will help you deploy your Otaku Store Tunisia app to Vercel for testing.

## Prerequisites

1. A GitHub account (free)
2. A Vercel account (free) - Sign up at [vercel.com](https://vercel.com)

## Method 1: Deploy via Vercel Dashboard (Recommended for Testing)

### Step 1: Push to GitHub

1. **Initialize Git** (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit - Ready for Vercel deployment"
   ```

2. **Create a GitHub repository**:
   - Go to [github.com](https://github.com) and create a new repository
   - Name it something like `otaku-store-tunisia` or `autoecole`
   - **Don't** initialize with README, .gitignore, or license (we already have these)

3. **Push your code**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com/new](https://vercel.com/new)
   - Sign in with your GitHub account

2. **Import your repository**:
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect it's a Next.js project

3. **Configure Project** (usually auto-detected):
   - **Framework Preset**: Next.js (should be auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
   - **Output Directory**: `.next` (default)
   - **Install Command**: `npm install` (default)

4. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your app will be live at a URL like: `https://your-project-name.vercel.app`

## Method 2: Deploy via Vercel CLI (Alternative)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy**:
   ```bash
   vercel
   ```
   - Follow the prompts
   - For production deployment, run: `vercel --prod`

## Post-Deployment

### Environment Variables (if needed)
If you need environment variables:
1. Go to your project in Vercel dashboard
2. Settings → Environment Variables
3. Add any required variables

### Custom Domain (Optional)
1. Go to your project in Vercel dashboard
2. Settings → Domains
3. Add your custom domain

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Make sure `next.config.js` is correct

### Common Issues
- **Module not found**: Run `npm install` locally and commit `package-lock.json`
- **TypeScript errors**: Fix all TypeScript errors before deploying
- **Build timeout**: Optimize your build or contact Vercel support

## Quick Commands Reference

```bash
# Build locally to test
npm run build

# Start production server locally
npm start

# Deploy to Vercel (if using CLI)
vercel

# Deploy to production (if using CLI)
vercel --prod
```

## Next Steps

After deployment:
1. Test all features on the live site
2. Share the URL with your team
3. Monitor the Vercel dashboard for any errors
4. Set up custom domain if needed

---

**Note**: Vercel provides free hosting with:
- Automatic HTTPS
- Global CDN
- Automatic deployments on git push
- Preview deployments for pull requests



