# Automatic Repository Creation and Push

I've created a script that will automatically:
1. ✅ Create the GitHub repository
2. ✅ Connect your local repository
3. ✅ Push all your code

## How to Use

### Step 1: Get GitHub Personal Access Token

1. **Go to:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Note:** "Vercel Deployment"
4. **Expiration:** 90 days (or No expiration)
5. **Scopes:** Check `repo` (full control of private repositories)
6. **Click:** "Generate token"
7. **Copy the token** (you won't see it again!)

### Step 2: Run the Script

```powershell
.\create-and-push-repo.ps1
```

The script will:
- Ask for your Personal Access Token
- Create the repository on GitHub
- Connect your local repo
- Push all your code

### Step 3: Deploy on Vercel

After the script completes:

1. Go to: https://vercel.com/dashboard
2. Click: "Add New..." → "Project"
3. Select: `otaku-store-tunisia`
4. Click: "Import"
5. Click: "Deploy"

---

## Alternative: Manual Method

If you prefer to create the repository manually:

1. **Create repo:** https://github.com/new
   - Name: `otaku-store-tunisia`
   - Don't initialize with README
   
2. **Then run:**
   ```powershell
   & "C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/saidiiheb50-byte/otaku-store-tunisia.git
   & "C:\Program Files\Git\bin\git.exe" branch -M main
   & "C:\Program Files\Git\bin\git.exe" push -u origin main
   ```

---

**The automated script is ready! Just run it and provide your token.**



