# Push to GitHub - Direct Connection Guide

Follow these steps to push your code directly to GitHub using Git command line:

## Step 1: Install Git (Command Line Tool)

1. **Download Git:** https://git-scm.com/download/win
2. **Install it:**
   - Run the installer
   - Use **default settings** (just click Next)
   - Choose "Git from the command line and also from 3rd-party software"
   - Complete the installation
3. **Restart PowerShell** after installation

## Step 2: Verify Git Installation

Open PowerShell and run:
```powershell
git --version
```

You should see something like: `git version 2.x.x`

## Step 3: Configure Git (First Time Only)

Set your name and email (use your GitHub email):

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

## Step 4: Initialize and Commit Your Code

Run these commands in your project folder:

```powershell
# Initialize Git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Otaku Store Tunisia"
```

## Step 5: Create Repository on GitHub

1. **Go to:** https://github.com/new
2. **Repository name:** `otaku-store-tunisia`
3. **Description:** `Otaku Store Tunisia - Manga merchandise e-commerce`
4. **Visibility:** Public or Private
5. **⚠️ IMPORTANT:** DO NOT check "Initialize with README"
6. **Click:** "Create repository"

## Step 6: Connect and Push to GitHub

After creating the repository, GitHub will show you commands. Run these (replace `YOUR_USERNAME`):

```powershell
# Add GitHub as remote
git remote add origin https://github.com/YOUR_USERNAME/otaku-store-tunisia.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 7: Authentication

When Git asks for credentials:

- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (NOT your GitHub password)

### Create Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token" → "Generate new token (classic)"**
3. **Note:** "Vercel Deployment"
4. **Expiration:** 90 days (or No expiration)
5. **Scopes:** Check `repo` (full control of private repositories)
6. Click: **"Generate token"**
7. **Copy the token immediately** (you won't see it again!)
8. **Use this token as your password** when Git asks

## Complete Command Sequence

Here's everything in one go (after installing Git):

```powershell
# Configure Git (first time only)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Initialize repository
git init
git add .
git commit -m "Initial commit: Otaku Store Tunisia"

# Connect to GitHub (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/otaku-store-tunisia.git
git branch -M main
git push -u origin main
```

## Troubleshooting

### "git: command not found"
- Git is not installed or not in PATH
- Install Git from: https://git-scm.com/download/win
- Restart PowerShell after installation

### "Authentication failed"
- Use Personal Access Token, not password
- Make sure token has `repo` scope
- Token might be expired - create a new one

### "Repository not found"
- Make sure you created the repository on GitHub first
- Check the repository name matches exactly
- Verify the URL is correct

### "Permission denied"
- Check if repository is Private and you have access
- Verify your GitHub account
- Try generating a new Personal Access Token

---

**After pushing, your code will be on GitHub and Vercel will see it automatically!**

