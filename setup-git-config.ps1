# Git Configuration Script
# This will set up your Git identity for commits

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Git Configuration" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get user information
$userName = Read-Host "Enter your name (for Git commits)"
$userEmail = Read-Host "Enter your GitHub email address"

# Configure Git
& "C:\Program Files\Git\bin\git.exe" config --global user.name "$userName"
& "C:\Program Files\Git\bin\git.exe" config --global user.email "$userEmail"

Write-Host ""
Write-Host "✓ Git configured successfully!" -ForegroundColor Green
Write-Host "  Name: $userName" -ForegroundColor White
Write-Host "  Email: $userEmail" -ForegroundColor White
Write-Host ""

# Now create the commit
Write-Host "Creating initial commit..." -ForegroundColor Yellow
& "C:\Program Files\Git\bin\git.exe" commit -m "Initial commit: Otaku Store Tunisia - Next.js e-commerce app"

if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Initial commit created successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "Next Steps:" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "1. Create repository on GitHub:" -ForegroundColor Yellow
    Write-Host "   Go to: https://github.com/new" -ForegroundColor White
    Write-Host "   - Name: otaku-store-tunisia" -ForegroundColor White
    Write-Host "   - Description: Otaku Store Tunisia - Manga merchandise e-commerce" -ForegroundColor White
    Write-Host "   - DO NOT initialize with README" -ForegroundColor White
    Write-Host "   - Click 'Create repository'" -ForegroundColor White
    Write-Host ""
    Write-Host "2. After creating the repo, run:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host '   & "C:\Program Files\Git\bin\git.exe" remote add origin https://github.com/YOUR_USERNAME/otaku-store-tunisia.git' -ForegroundColor Cyan
    Write-Host '   & "C:\Program Files\Git\bin\git.exe" branch -M main' -ForegroundColor Cyan
    Write-Host '   & "C:\Program Files\Git\bin\git.exe" push -u origin main' -ForegroundColor Cyan
    Write-Host ""
    Write-Host "   (Replace YOUR_USERNAME with your GitHub username)" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "✗ Error creating commit" -ForegroundColor Red
}

