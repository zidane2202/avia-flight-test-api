# Deploy Avia test API to Render
# Prerequisites: RENDER_API_KEY env var + GitHub repo URL (or run gh repo create first)

param(
    [string]$RenderApiKey = $env:RENDER_API_KEY,
    [string]$RepoUrl = "",
    [string]$ServiceName = "avia-flight-test-api"
)

$ErrorActionPreference = "Stop"

if (-not $RenderApiKey) {
    Write-Error "RENDER_API_KEY manquant. Créez une clé sur https://dashboard.render.com/u/settings#api-keys"
}

$cliZip = "$env:TEMP\render-cli.zip"
$cliDir = "$env:TEMP\render-cli"
$cliExe = "$cliDir\render.exe"

if (-not (Test-Path $cliExe)) {
    Write-Host "Installation du Render CLI..."
    Invoke-WebRequest -Uri "https://github.com/render-oss/cli/releases/download/v1.1.0/cli_1.1.0_windows_amd64.zip" -OutFile $cliZip
    Expand-Archive -Path $cliZip -DestinationPath $cliDir -Force
    $extracted = Get-ChildItem $cliDir -Filter "render*.exe" -Recurse | Select-Object -First 1
    if ($extracted) { Copy-Item $extracted.FullName $cliExe }
}

if (-not $RepoUrl) {
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    if (Get-Command gh -ErrorAction SilentlyContinue) {
        gh auth status 2>$null | Out-Null
        if ($LASTEXITCODE -eq 0) {
            Write-Host "Création du repo GitHub et push..."
            gh repo create avia-flight-test-api --public --source . --remote origin --push
            $RepoUrl = (gh repo view --json url -q .url)
        }
    }
}

if (-not $RepoUrl) {
    Write-Error "RepoUrl requis. Passez -RepoUrl https://github.com/USER/avia-flight-test-api ou connectez gh auth login"
}

$env:RENDER_API_KEY = $RenderApiKey
$env:CI = "true"

Write-Host "Création du service Render..."
& $cliExe services create `
    --name $ServiceName `
    --type web_service `
    --runtime node `
    --region frankfurt `
    --plan free `
    --repo $RepoUrl `
    --branch master `
    --build-command "npm install" `
    --start-command "npm start" `
    --output json

Write-Host "Deploy terminé. URL: https://${ServiceName}.onrender.com"
Write-Host "Mettez à jour apiBaseUrl dans le workflow n8n avec cette URL."
