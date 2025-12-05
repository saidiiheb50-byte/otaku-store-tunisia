# PowerShell script to push project to GitHub
# Run this script after creating the GitHub repository

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "GitHub Push Setup Script" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version
    Write-Host "✓ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git from: https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "Then run this script again." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Step 1: Initializing Git repository..." -ForegroundColor Yellow

# Initialize Git if not already done
if (Test-Path .git) {
    Write-Host "✓ Git repository already initialized" -ForegroundColor Green
} else {
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

Write-Host ""
Write-Host "Step 2: Adding files to Git..." -ForegroundColor Yellow
git add .
Write-Host "✓ Files added" -ForegroundColor Green

Write-Host ""
Write-Host "Step 3: Creating initial commit..." -ForegroundColor Yellow
git commit -m "Initial commit: Otaku Store Tunisia - Next.js e-commerce app"
Write-Host "✓ Initial commit created" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Create a repository on GitHub:" -ForegroundColor Yellow
Write-Host "   Go to: https://github.com/new" -ForegroundColor White
Write-Host "   - Repository name: otaku-store-tunisia" -ForegroundColor White
Write-Host "   - Description: Otaku Store Tunisia - Manga merchandise e-commerce" -ForegroundColor White
Write-Host "   - Choose Public or Private" -ForegroundColor White
Write-Host "   - DO NOT initialize with README" -ForegroundColor White
Write-Host "   - Click 'Create repository'" -ForegroundColor White
Write-Host ""
Write-Host "2. After creating the repository, run these commands:" -ForegroundColor Yellow
Write-Host ""
Write-Host "   git remote add origin https://github.com/YOUR_USERNAME/otaku-store-tunisia.git" -ForegroundColor Cyan
Write-Host "   git branch -M main" -ForegroundColor Cyan
Write-Host "   git push -u origin main" -ForegroundColor Cyan
Write-Host ""
Write-Host "   (Replace YOUR_USERNAME with your GitHub username)" -ForegroundColor White
Write-Host ""
Write-Host "3. If asked for credentials:" -ForegroundColor Yellow
Write-Host "   - Username: Your GitHub username" -ForegroundColor White
Write-Host "   - Password: Use a Personal Access Token (not your password)" -ForegroundColor White
Write-Host "   - Get token from: https://github.com/settings/tokens" -ForegroundColor White
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Ready to push!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan

