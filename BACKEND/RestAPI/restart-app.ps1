# Stop old Java process
Write-Host "🛑 Stopping old Java process..." -ForegroundColor Yellow
Get-Process -Name java -ErrorAction SilentlyContinue | Stop-Process -Force
Start-Sleep -Seconds 2

# Verify it's stopped
$javaProcess = Get-Process -Name java -ErrorAction SilentlyContinue
if ($javaProcess) {
    Write-Host "❌ Failed to stop Java process. Trying taskkill..." -ForegroundColor Red
    taskkill /F /IM java.exe
    Start-Sleep -Seconds 2
}

Write-Host "✅ Old process stopped" -ForegroundColor Green
Write-Host ""

# Navigate to project directory
Set-Location "e:\LyfInk\LyfInk\BACKEND\RestAPI"

Write-Host "🚀 Starting application with new code..." -ForegroundColor Cyan
Write-Host "📋 Watch for these messages:" -ForegroundColor Yellow
Write-Host "   🔐 SecurityConfig initialized - JWT Authentication enabled" -ForegroundColor Gray
Write-Host "   ✅ Public endpoints: /api/users/login, /api/users/register, ..." -ForegroundColor Gray
Write-Host ""

# Start the application
.\mvnw.cmd spring-boot:run
