Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Calender Vue Project Setup Script" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""

$sourceDir = "D:\aiproject\Calender"
$targetDir = "D:\aiproject\calender-vue"

Write-Host "Step 1: Copying images..." -ForegroundColor Yellow
if (Test-Path "$sourceDir\images") {
    Copy-Item -Path "$sourceDir\images" -Destination "$targetDir\public\images" -Recurse -Force
    Write-Host "✓ Images copied successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Source images directory not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "Step 2: Copying media files..." -ForegroundColor Yellow
if (Test-Path "$sourceDir\media") {
    Copy-Item -Path "$sourceDir\media" -Destination "$targetDir\public\media" -Recurse -Force
    Write-Host "✓ Media files copied successfully" -ForegroundColor Green
} else {
    Write-Host "✗ Source media directory not found" -ForegroundColor Red
}

Write-Host ""
Write-Host "Step 3: Copying CSS files..." -ForegroundColor Yellow
if (-not (Test-Path "$targetDir\src\assets")) {
    New-Item -Path "$targetDir\src\assets" -ItemType Directory -Force | Out-Null
}

$cssFiles = @("style.css", "clndr.css", "audio.css", "easy-responsive-tabs.css")
foreach ($cssFile in $cssFiles) {
    if (Test-Path "$sourceDir\css\$cssFile") {
        Copy-Item -Path "$sourceDir\css\$cssFile" -Destination "$targetDir\src\assets\$cssFile" -Force
        Write-Host "✓ Copied $cssFile" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "Step 4: Installing backend dependencies..." -ForegroundColor Yellow
Set-Location "$targetDir\server"
npm install --silent
Write-Host "✓ Backend dependencies installed" -ForegroundColor Green

Write-Host ""
Write-Host "====================================" -ForegroundColor Cyan
Write-Host "Setup Complete!" -ForegroundColor Green
Write-Host "====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Start MySQL: docker-compose up -d" -ForegroundColor White
Write-Host "2. Start backend: cd server && npm start" -ForegroundColor White
Write-Host "3. Start frontend: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Default login credentials:" -ForegroundColor Yellow
Write-Host "  Username: admin" -ForegroundColor White
Write-Host "  Password: admin123" -ForegroundColor White
Write-Host ""
pause