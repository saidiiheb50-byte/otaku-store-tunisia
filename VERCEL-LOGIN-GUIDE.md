# How to Login and Deploy to Vercel

## Method 1: Deploy via Vercel Website (Easiest - No Login Required Initially)

### Step 1: Push Your Code to GitHub First

1. **Make sure your code is on GitHub:**
   ```bash
   # If you haven't already:
   git add .
   git commit -m "Fix 502 error"
   git push origin main
   ```

### Step 2: Go to Vercel Website

1. **Visit:** https://vercel.com
2. **Click "Sign Up" or "Log In"** (top right)
3. **Choose "Continue with GitHub"** (recommended)
   - This will use your GitHub account
   - No separate Vercel account needed
   - Vercel gets access to your GitHub repos

### Step 3: Import Your Project

1. After logging in, click **"Add New..." → "Project"**
2. You'll see your GitHub repositories
3. **Select your repository** (autoecole or whatever you named it)
4. Click **"Import"**

### Step 4: Configure (Usually Auto-Detected)

Vercel will auto-detect:
- ✅ Framework: Next.js
- ✅ Build Command: `npm run build`
- ✅ Output Directory: `.next`
- ✅ Install Command: `npm install`

**Just click "Deploy"** - no changes needed!

### Step 5: Wait for Deployment

- Takes 2-3 minutes
- You'll see build logs in real-time
- When done, you'll get a URL like: `https://your-project.vercel.app`

---

## Method 2: Deploy via Vercel CLI (Command Line)

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

This will:
- Open your browser
- Ask you to login with GitHub/Email
- Authorize Vercel CLI

### Step 3: Deploy

```bash
# From your project directory
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No (first time)
- **Project name?** → Press Enter (uses folder name)
- **Directory?** → Press Enter (current directory)
- **Override settings?** → No

### Step 4: Production Deploy

```bash
vercel --prod
```

---

## Troubleshooting Login Issues

### Issue: "Not logged in" or "Authentication failed"

**Solution 1: Clear Vercel CLI cache**
```bash
vercel logout
vercel login
```

**Solution 2: Use GitHub OAuth**
- Go to https://vercel.com/login
- Click "Continue with GitHub"
- Authorize the app

**Solution 3: Check if you're logged in**
```bash
vercel whoami
```
Should show your email/username

### Issue: "Repository not found" or "Access denied"

**Solution:**
1. Make sure you've pushed to GitHub
2. Check repository is public (or give Vercel access to private repos)
3. In Vercel dashboard → Settings → Git → Connect repository

### Issue: "Build failed" after login

**Solution:**
1. Check build logs in Vercel dashboard
2. Make sure `package.json` has correct scripts
3. Verify all dependencies are listed

---

## Quick Checklist

- [ ] Code is pushed to GitHub
- [ ] Logged into Vercel (via website or CLI)
- [ ] Repository is connected to Vercel
- [ ] Build settings are correct (auto-detected for Next.js)
- [ ] Deployment started successfully

---

## Which Method Should I Use?

**Use Website Method if:**
- ✅ First time deploying
- ✅ Want visual interface
- ✅ Prefer clicking buttons
- ✅ Want to see build logs visually

**Use CLI Method if:**
- ✅ Comfortable with command line
- ✅ Want to deploy quickly
- ✅ Need to automate deployments
- ✅ Want to deploy from terminal

---

## After First Deployment

Once deployed, Vercel will:
- ✅ Auto-deploy on every `git push`
- ✅ Create preview URLs for pull requests
- ✅ Show deployment history
- ✅ Provide analytics and logs

**No need to login again** - it's all automatic after the first setup!

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Vercel Support: https://vercel.com/support
- Check your deployment: https://vercel.com/dashboard

