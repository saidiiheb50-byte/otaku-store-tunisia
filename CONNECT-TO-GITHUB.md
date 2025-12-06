# How to Connect Your Project to GitHub

Since you've already connected GitHub to Vercel, you just need to push your code to GitHub. Here are your options:

## Option 1: Install Git and Use Command Line (Recommended)

### Step 1: Install Git

1. **Download Git for Windows:**
   - Go to: https://git-scm.com/download/win
   - Download the installer
   - Run the installer (use default settings)
   - Restart your terminal/PowerShell after installation

### Step 2: Initialize Git in Your Project

Open PowerShell in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - Otaku Store Tunisia"
```

### Step 3: Create Repository on GitHub

1. Go to: https://github.com/new
2. **Repository name:** `otaku-store-tunisia` (or any name you like)
3. **Description:** "Otaku Store Tunisia - Manga merchandise e-commerce"
4. **Visibility:** Choose Public or Private
5. **DO NOT** check "Initialize with README" (you already have files)
6. Click **"Create repository"**

### Step 4: Connect and Push

GitHub will show you commands. Run these in your project folder:

```bash
# Add GitHub as remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/otaku-store-tunisia.git

# Rename branch to main
git branch -M main

# Push your code
git push -u origin main
```

You'll be asked to login to GitHub - use your GitHub username and a Personal Access Token (see below).

---

## Option 2: Use GitHub Desktop (Easier - No Command Line)

### Step 1: Install GitHub Desktop

1. Download: https://desktop.github.com/
2. Install and login with your GitHub account

### Step 2: Add Your Project

1. Open GitHub Desktop
2. Click **"File" → "Add Local Repository"**
3. Browse to: `C:\Users\IHEB\Desktop\autoecole`
4. Click **"Add Repository"**

### Step 3: Publish to GitHub

1. Click **"Publish repository"** button (top right)
2. **Name:** `otaku-store-tunisia`
3. **Description:** "Otaku Store Tunisia - Manga merchandise e-commerce"
4. Choose **Public** or **Private**
5. Click **"Publish Repository"**

Done! Your code is now on GitHub.

---

## Option 3: Upload Files Manually (Quick but not ideal)

### Step 1: Create Repository on GitHub

1. Go to: https://github.com/new
2. Name it: `otaku-store-tunisia`
3. Click **"Create repository"**

### Step 2: Upload Files

1. On the repository page, click **"uploading an existing file"**
2. Drag and drop all your project files (except `node_modules`)
3. Add commit message: "Initial commit"
4. Click **"Commit changes"**

⚠️ **Note:** This method doesn't track changes well. Better to use Git.

---

## After Pushing to GitHub

Once your code is on GitHub:

1. **Go to Vercel Dashboard:** https://vercel.com/dashboard
2. Click **"Add New..." → "Project"**
3. You'll see your repository: `otaku-store-tunisia`
4. Click **"Import"**
5. Vercel will auto-detect Next.js settings
6. Click **"Deploy"**
7. Wait 2-3 minutes
8. Your site will be live! 🎉

---

## GitHub Personal Access Token (If Needed)

If Git asks for a password, you need a Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click **"Generate new token" → "Generate new token (classic)"**
3. **Note:** "Vercel Deployment"
4. **Expiration:** 90 days (or No expiration)
5. **Scopes:** Check `repo` (full control of private repositories)
6. Click **"Generate token"**
7. **Copy the token** (you won't see it again!)
8. Use this token as your password when Git asks

---

## Quick Checklist

- [ ] Git installed OR GitHub Desktop installed
- [ ] Repository created on GitHub
- [ ] Code pushed to GitHub
- [ ] Repository visible in Vercel dashboard
- [ ] Project imported and deployed on Vercel

---

## Troubleshooting

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository name matches
- Verify you're logged into the correct GitHub account

### "Authentication failed"
- Use Personal Access Token instead of password
- Make sure token has `repo` scope

### "Permission denied"
- Check repository is public OR you've given Vercel access to private repos
- Verify your GitHub account is connected to Vercel

---

**Recommended:** Use **Option 2 (GitHub Desktop)** - it's the easiest and doesn't require command line knowledge!


