# Fix Git PATH Issue

Git is installed but PowerShell can't find it. Here are solutions:

## Solution 1: Restart PowerShell (Easiest)

1. **Close this PowerShell window completely**
2. **Open a NEW PowerShell window**
3. Navigate to your project: `cd C:\Users\IHEB\Desktop\autoecole`
4. Try: `git --version`

If this works, proceed with the setup!

## Solution 2: Use Git Bash Instead

1. **Open Git Bash** (search for "Git Bash" in Start menu)
2. Navigate to your project:
   ```bash
   cd /c/Users/IHEB/Desktop/autoecole
   ```
3. Run the Git commands there

## Solution 3: Add Git to PATH Manually

1. **Find Git installation:**
   - Usually at: `C:\Program Files\Git\bin\`
   - Or: `C:\Program Files (x86)\Git\bin\`

2. **Add to PATH:**
   - Press `Win + X` → System → Advanced system settings
   - Click "Environment Variables"
   - Under "System variables", find "Path"
   - Click "Edit" → "New"
   - Add: `C:\Program Files\Git\bin`
   - Click OK on all windows
   - **Restart PowerShell**

## Solution 4: Use Full Path

You can use Git with full path:

```powershell
& "C:\Program Files\Git\bin\git.exe" --version
```

If this works, I can create commands using the full path.

---

**Try Solution 1 first (restart PowerShell) - that usually fixes it!**


