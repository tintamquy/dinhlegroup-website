@echo off
echo ========================================
echo PUSH CODE LEN GITHUB
echo ========================================
echo.

set /p GITHUB_URL="Nhap GitHub repository URL (vi du: https://github.com/username/repo.git): "

if "%GITHUB_URL%"=="" (
    echo.
    echo LOI: Ban phai nhap GitHub URL!
    pause
    exit /b
)

echo.
echo Dang them remote origin...
git remote remove origin 2>nul
git remote add origin %GITHUB_URL%

echo.
echo Dang doi ten branch thanh main...
git branch -M main

echo.
echo Dang push code len GitHub...
echo.
echo LUU Y: Neu duoc yeu cau nhap password, hay su dung Personal Access Token!
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo THANH CONG! Code da duoc push len GitHub!
    echo ========================================
    echo.
    echo Buoc tiep theo:
    echo 1. Vao https://pages.cloudflare.com/
    echo 2. Create project - Connect to Git
    echo 3. Chon GitHub va repository cua ban
    echo 4. Deploy!
    echo.
) else (
    echo.
    echo ========================================
    echo CO LOI XAY RA!
    echo ========================================
    echo.
    echo Kiem tra:
    echo - GitHub URL co dung khong?
    echo - Da tao repository tren GitHub chua?
    echo - Co quyen truy cap repository khong?
    echo - Neu can password, su dung Personal Access Token
    echo.
)

pause

