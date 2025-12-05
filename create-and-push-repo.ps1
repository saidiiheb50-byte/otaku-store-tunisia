# Script to create GitHub repository and push code
# Requires GitHub Personal Access Token

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Create and Push to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Get Personal Access Token
Write-Host "To create the repository, I need your GitHub Personal Access Token." -ForegroundColor Yellow
Write-Host ""
Write-Host "If you don't have one:" -ForegroundColor White
Write-Host "1. Go to: https://github.com/settings/tokens" -ForegroundColor Cyan
Write-Host "2. Click 'Generate new token' -> 'Generate new token (classic)'" -ForegroundColor Cyan
Write-Host "3. Note: 'Vercel Deployment'" -ForegroundColor Cyan
Write-Host "4. Scopes: Check 'repo' (full control)" -ForegroundColor Cyan
Write-Host "5. Generate and copy the token" -ForegroundColor Cyan
Write-Host ""

$token = Read-Host "Enter your GitHub Personal Access Token" -AsSecureString
$BSTR = [System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($token)
$plainToken = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto($BSTR)

if ([string]::IsNullOrWhiteSpace($plainToken)) {
    Write-Host "Token is required. Exiting." -ForegroundColor Red
    exit 1
}

$repoName = "otaku-store-tunisia"
$username = "saidiiheb50-byte"
$description = "Otaku Store Tunisia - Manga merchandise e-commerce"

Write-Host ""
Write-Host "Creating repository on GitHub..." -ForegroundColor Yellow

# Create repository using GitHub API
$headers = @{
    "Authorization" = "token $plainToken"
    "Accept" = "application/vnd.github.v3+json"
}

$body = @{
    name = $repoName
    description = $description
    private = $false
    auto_init = $false
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "https://api.github.com/user/repos" -Method Post -Headers $headers -Body $body -ContentType "application/json"
    
    Write-Host "✓ Repository created successfully!" -ForegroundColor Green
    Write-Host "  URL: $($response.html_url)" -ForegroundColor White
    Write-Host ""
    
    # Add remote and push
    Write-Host "Connecting to GitHub repository..." -ForegroundColor Yellow
    
    # Remove existing remote if any
    & "C:\Program Files\Git\bin\git.exe" remote remove origin 2>$null
    
    # Add remote
    & "C:\Program Files\Git\bin\git.exe" remote add origin "https://$plainToken@github.com/$username/$repoName.git"
    
    Write-Host "✓ Remote added" -ForegroundColor Green
    
    # Set main branch
    Write-Host "Setting main branch..." -ForegroundColor Yellow
    & "C:\Program Files\Git\bin\git.exe" branch -M main
    Write-Host "✓ Branch set to main" -ForegroundColor Green
    
    # Push to GitHub
    Write-Host "Pushing code to GitHub..." -ForegroundColor Yellow
    & "C:\Program Files\Git\bin\git.exe" push -u origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "✓ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        Write-Host ""
        Write-Host "Repository URL: $($response.html_url)" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Next Steps:" -ForegroundColor Yellow
        Write-Host "1. Go to: https://vercel.com/dashboard" -ForegroundColor White
        Write-Host "2. Click 'Add New...' -> 'Project'" -ForegroundColor White
        Write-Host "3. Select 'otaku-store-tunisia'" -ForegroundColor White
        Write-Host "4. Click 'Import' and 'Deploy'" -ForegroundColor White
        Write-Host ""
    } else {
        Write-Host "✗ Error pushing to GitHub" -ForegroundColor Red
        Write-Host "You may need to push manually:" -ForegroundColor Yellow
        Write-Host "  & 'C:\Program Files\Git\bin\git.exe' push -u origin main" -ForegroundColor Cyan
    }
} catch {
    Write-Host "✗ Error creating repository: $($_.Exception.Message)" -ForegroundColor Red
    
    if ($_.Exception.Response.StatusCode.value__ -eq 401) {
        Write-Host "Authentication failed. Please check your token." -ForegroundColor Yellow
    } elseif ($_.Exception.Response.StatusCode.value__ -eq 422) {
        Write-Host "Repository might already exist. Trying to connect..." -ForegroundColor Yellow
        & "C:\Program Files\Git\bin\git.exe" remote remove origin 2>$null
        & "C:\Program Files\Git\bin\git.exe" remote add origin "https://$plainToken@github.com/$username/$repoName.git"
        & "C:\Program Files\Git\bin\git.exe" branch -M main
        & "C:\Program Files\Git\bin\git.exe" push -u origin main
    }
}

# Clear token from memory
$plainToken = $null
$token = $null
