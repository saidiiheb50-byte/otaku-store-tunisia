# Script de vérification de l'installation
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Vérification de l'installation Next.js" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Vérifier Node.js
Write-Host "1. Vérification de Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   [OK] Node.js installé: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   [ERREUR] Node.js n'est pas installé" -ForegroundColor Red
    Write-Host "   Installez Node.js depuis https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Vérifier npm
Write-Host "2. Vérification de npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "   [OK] npm installé: $npmVersion" -ForegroundColor Green
} catch {
    Write-Host "   [ERREUR] npm n'est pas installé" -ForegroundColor Red
    exit 1
}

# Vérifier node_modules
Write-Host "3. Vérification des dépendances..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   [OK] Dépendances installées" -ForegroundColor Green
} else {
    Write-Host "   [ATTENTION] Dépendances non installées" -ForegroundColor Yellow
    Write-Host "   Exécutez: npm install" -ForegroundColor Cyan
}

# Vérifier le port 3000
Write-Host "4. Vérification du port 3000..." -ForegroundColor Yellow
$portCheck = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue
if ($portCheck) {
    Write-Host "   [OK] Le serveur est en cours d'exécution sur le port 3000" -ForegroundColor Green
} else {
    Write-Host "   [ATTENTION] Aucun serveur sur le port 3000" -ForegroundColor Yellow
    Write-Host "   Exécutez: npm run dev" -ForegroundColor Cyan
}

# Vérifier les fichiers Next.js
Write-Host "5. Vérification de la structure Next.js..." -ForegroundColor Yellow
$requiredFiles = @("app", "package.json", "next.config.js")
$allPresent = $true
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "   [OK] $file existe" -ForegroundColor Green
    } else {
        Write-Host "   [ERREUR] $file manquant" -ForegroundColor Red
        $allPresent = $false
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
if ($allPresent -and (Test-Path "node_modules")) {
    Write-Host "Prêt à démarrer !" -ForegroundColor Green
    Write-Host "Exécutez: npm run dev" -ForegroundColor Cyan
} else {
    Write-Host "Configuration incomplète" -ForegroundColor Yellow
    Write-Host "Consultez SETUP.md pour les instructions" -ForegroundColor Cyan
}
Write-Host "========================================" -ForegroundColor Cyan

