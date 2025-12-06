# Quick GitHub Setup Guide

I've prepared your project for GitHub! Follow these steps:

## Step 1: Run the Setup Script

Open PowerShell in your project folder and run:

```powershell
.\push-to-github.ps1
```

This will:
- ✅ Initialize Git repository
- ✅ Add all files
- ✅ Create initial commit

## Step 2: Create GitHub Repository

1. **Go to:** https://github.com/new
2. **Repository name:** `otaku-store-tunisia`
3. **Description:** `Otaku Store Tunisia - Manga merchandise e-commerce`
4. **Visibility:** Choose Public or Private
5. **⚠️ IMPORTANT:** DO NOT check "Initialize with README"
6. **Click:** "Create repository"

## Step 3: Connect and Push

After creating the repository, GitHub will show you commands. Run these in PowerShell:

```powershell
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/otaku-store-tunisia.git

git branch -M main

git push -u origin main
```

## Step 4: Authentication

If Git asks for credentials:

- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (NOT your GitHub password)

### How to Get Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click: "Generate new token" → "Generate new token (classic)"
3. **Note:** "Vercel Deployment"
4. **Expiration:** 90 days (or No expiration)
5. **Scopes:** Check `repo` (full control)
6. Click: "Generate token"
7. **Copy the token** (you won't see it again!)
8. Use this token as your password

## Alternative: Use GitHub Desktop

If you prefer a GUI:

1. **Download:** https://desktop.github.com/
2. **Install and login** with your GitHub account
3. **File** → **Add Local Repository**
4. Browse to: `C:\Users\IHEB\Desktop\autoecole`
5. Click **"Publish repository"**
6. Name: `otaku-store-tunisia`
7. Click **"Publish Repository"**

## After Pushing to GitHub

Once your code is on GitHub:

1. Go to: https://vercel.com/dashboard
2. Click: **"Add New..." → "Project"**
3. You'll see: `otaku-store-tunisia`
4. Click: **"Import"**
5. Click: **"Deploy"**
6. Wait 2-3 minutes
7. Your site will be live! 🎉

## Troubleshooting

### "Git is not installed"
- Download from: https://git-scm.com/download/win
- Install with default settings
- Restart PowerShell

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository name matches exactly
- Verify you're logged into the correct GitHub account

### "Authentication failed"
- Use Personal Access Token, not password
- Make sure token has `repo` scope
- Token might have expired - generate a new one

### "Permission denied"
- Check repository visibility (Public or Private)
- If Private, make sure Vercel has access
- Verify GitHub account is connected to Vercel

---

**Need help?** The script will guide you through each step!


