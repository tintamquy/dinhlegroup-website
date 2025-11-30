# Script push code len GitHub
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "PUSH CODE LEN GITHUB" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$githubUrl = Read-Host "Nhap GitHub repository URL (vi du: https://github.com/username/repo.git)"

if ([string]::IsNullOrWhiteSpace($githubUrl)) {
    Write-Host "LOI: Ban phai nhap GitHub URL!" -ForegroundColor Red
    Read-Host "Nhan Enter de thoat"
    exit
}

Write-Host ""
Write-Host "Dang them remote origin..." -ForegroundColor Yellow
git remote remove origin 2>$null
git remote add origin $githubUrl

Write-Host ""
Write-Host "Dang doi ten branch thanh main..." -ForegroundColor Yellow
git branch -M main

Write-Host ""
Write-Host "Dang push code len GitHub..." -ForegroundColor Yellow
Write-Host ""
Write-Host "LUU Y: Neu duoc yeu cau nhap password, hay su dung Personal Access Token!" -ForegroundColor Yellow
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "THANH CONG! Code da duoc push len GitHub!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Buoc tiep theo:" -ForegroundColor Cyan
    Write-Host "1. Vao https://pages.cloudflare.com/" -ForegroundColor White
    Write-Host "2. Create project - Connect to Git" -ForegroundColor White
    Write-Host "3. Chon GitHub va repository cua ban" -ForegroundColor White
    Write-Host "4. Deploy!" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "CO LOI XAY RA!" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Kiem tra:" -ForegroundColor Yellow
    Write-Host "- GitHub URL co dung khong?" -ForegroundColor White
    Write-Host "- Da tao repository tren GitHub chua?" -ForegroundColor White
    Write-Host "- Co quyen truy cap repository khong?" -ForegroundColor White
    Write-Host "- Neu can password, su dung Personal Access Token" -ForegroundColor White
    Write-Host ""
}

Read-Host "Nhan Enter de thoat"

