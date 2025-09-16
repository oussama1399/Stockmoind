Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Stockmind - Desktop Application" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Building React application..." -ForegroundColor Yellow
npm run build:react
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error: Failed to build React application" -ForegroundColor Red
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""
Write-Host "Starting Stockmind desktop application..." -ForegroundColor Green
Write-Host ""
npm start

Read-Host "Press Enter to exit"