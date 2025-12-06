# Next Steps to Push to GitHub

✅ **Repository initialized!**
✅ **Files added!**

## Step 1: Configure Git (One Time Setup)

Run this script to configure Git with your information:

```powershell
.\setup-git-config.ps1
```

Or manually configure:

```powershell
& "C:\Program Files\Git\bin\git.exe" config --global user.name "Your Name"
& "C:\Program Files\Git\bin\git.exe" config --global user.email "your-email@example.com"
```

Then create the commit:

```powershell
& "C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Otaku Store Tunisia - Next.js e-commerce app"
```

## Step 2: Create Repository on GitHub

1. **Go to:** https://github.com/new
2. **Repository name:** `otaku-store-tunisia`
3. **Description:** `Otaku Store Tunisia - Manga merchandise e-commerce`
4. **Visibility:** Choose Public or Private
5. **⚠️ IMPORTANT:** DO NOT check "Initialize with README"
6. **Click:** "Create repository"

## Step 3: Connect and Push

After creating the repository, run these commands (replace `YOUR_USERNAME`):

```powershell
# Add GitHub as remote
& "C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/YOUR_USERNAME/otaku-store-tunisia.git

# Set main branch
& "C:\Program Files\Git\bin\git.exe" branch -M main

# Push to GitHub
& "C:\Program Files\Git\bin\git.exe" push -u origin main
```

## Step 4: Authentication

When Git asks for credentials:

- **Username:** Your GitHub username
- **Password:** Use a **Personal Access Token** (NOT your password)

### Create Personal Access Token:

1. Go to: https://github.com/settings/tokens
2. Click: **"Generate new token" → "Generate new token (classic)"**
3. **Note:** "Vercel Deployment"
4. **Expiration:** 90 days (or No expiration)
5. **Scopes:** Check `repo` (full control)
6. Click: **"Generate token"**
7. **Copy the token** (you won't see it again!)
8. **Use this token as your password** when Git asks

## After Pushing

Once your code is on GitHub:

1. Go to: https://vercel.com/dashboard
2. Click: **"Add New..." → "Project"**
3. You'll see: `otaku-store-tunisia`
4. Click: **"Import"**
5. Click: **"Deploy"**
6. Wait 2-3 minutes
7. Your site will be live! 🎉

---

**Ready to proceed?** Run the setup script or configure Git manually, then create the GitHub repository!



