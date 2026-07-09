param(
    [string]$KeyFile = ".render-key.local",
    [string]$ServiceName = "avia-flight-test-api",
    [string]$RepoUrl = ""
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $KeyFile)) {
    Write-Error "Fichier clé Render introuvable: $KeyFile"
}

$apiKey = (Get-Content $KeyFile -Raw).Trim()
$headers = @{
    Authorization = "Bearer $apiKey"
    "Content-Type" = "application/json"
    Accept = "application/json"
}

$owners = Invoke-RestMethod -Uri "https://api.render.com/v1/owners" -Headers $headers
$owner = $owners[0]
if (-not $owner) { Write-Error "Aucun owner Render trouvé" }
$ownerId = $owner.owner.id
Write-Host "Owner: $($owner.owner.name) ($ownerId)"

$existing = Invoke-RestMethod -Uri "https://api.render.com/v1/services?limit=100" -Headers $headers
$match = $existing | Where-Object { $_.service.name -eq $ServiceName }
if ($match) {
    $service = $match[0].service
    Write-Host "Service existant: $($service.id)"
    $deploy = Invoke-RestMethod -Method Post -Uri "https://api.render.com/v1/services/$($service.id)/deploys" -Headers $headers -Body "{}" 
    Write-Host "Redéploiement déclenché: $($deploy.id)"
    Write-Host "URL: https://$ServiceName.onrender.com"
    exit 0
}

if (-not $RepoUrl) {
    Write-Error @"
RepoUrl requis pour créer le service.
1. Créez un repo public GitHub (ex: avia-flight-test-api)
2. Poussez le code: git remote add origin https://github.com/USER/avia-flight-test-api.git && git push -u origin master
3. Relancez: .\deploy-render-api.ps1 -RepoUrl https://github.com/USER/avia-flight-test-api
"@
}

$body = @{
    type = "web_service"
    name = $ServiceName
    ownerId = $ownerId
    repo = $RepoUrl
    branch = "main"
    autoDeploy = "yes"
    plan = "free"
    region = "frankfurt"
    serviceDetails = @{
        runtime = "node"
        buildCommand = "npm install"
        startCommand = "npm start"
        healthCheckPath = "/health"
        envSpecificDetails = @{
            buildCommand = "npm install"
            startCommand = "npm start"
        }
    }
} | ConvertTo-Json -Depth 6

$created = Invoke-RestMethod -Method Post -Uri "https://api.render.com/v1/services" -Headers $headers -Body $body
Write-Host "Service créé: $($created.service.id)"
Write-Host "URL: https://$ServiceName.onrender.com"
