# HƯỚNG DẪN PUSH CODE LÊN GITHUB VÀ KẾT NỐI CLOUDFLARE PAGES

## BƯỚC 1: TẠO GITHUB REPOSITORY

1. **Đăng nhập GitHub:**
   - Vào https://github.com
   - Đăng nhập hoặc tạo tài khoản mới

2. **Tạo Repository mới:**
   - Click nút "+" ở góc trên bên phải
   - Chọn "New repository"
   - Đặt tên: `dinhlegroup-website` (hoặc tên bạn muốn)
   - Chọn **Public** hoặc **Private**
   - **KHÔNG** tích vào "Initialize this repository with a README"
   - Click "Create repository"

3. **Copy URL của repository:**
   - Sau khi tạo, GitHub sẽ hiển thị URL
   - Copy URL (ví dụ: `https://github.com/username/dinhlegroup-website.git`)

## BƯỚC 2: PUSH CODE LÊN GITHUB

### Cách 1: Dùng Command Line (Đã chuẩn bị sẵn)

Mở PowerShell hoặc Command Prompt trong folder `DinhLeGroup-Website` và chạy:

```bash
# Thay YOUR_USERNAME và REPO_NAME bằng thông tin của bạn
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

**Ví dụ:**
```bash
git remote add origin https://github.com/yourusername/dinhlegroup-website.git
git branch -M main
git push -u origin main
```

Nếu được yêu cầu đăng nhập:
- Username: Tên GitHub của bạn
- Password: Sử dụng **Personal Access Token** (xem hướng dẫn bên dưới)

### Cách 2: Dùng GitHub Desktop (Dễ hơn)

1. **Tải GitHub Desktop:**
   - Vào https://desktop.github.com/
   - Tải và cài đặt

2. **Mở project:**
   - File → Add Local Repository
   - Chọn folder `DinhLeGroup-Website`
   - Click "Add repository"

3. **Publish repository:**
   - Click "Publish repository"
   - Chọn tài khoản GitHub
   - Đặt tên repository
   - Click "Publish repository"

## BƯỚC 3: TẠO PERSONAL ACCESS TOKEN (Nếu cần)

Nếu GitHub yêu cầu password khi push:

1. Vào GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Đặt tên: `Cloudflare Pages`
4. Chọn quyền: `repo` (full control)
5. Click "Generate token"
6. **Copy token ngay** (sẽ không hiển thị lại)
7. Dùng token này thay cho password khi push

## BƯỚC 4: KẾT NỐI GITHUB VỚI CLOUDFLARE PAGES

1. **Đăng nhập Cloudflare Pages:**
   - Vào https://pages.cloudflare.com/
   - Đăng nhập hoặc tạo tài khoản

2. **Tạo Project mới:**
   - Click "Create a project"
   - Chọn "Connect to Git"
   - Chọn "GitHub" (hoặc GitLab/Bitbucket nếu dùng)

3. **Authorize Cloudflare:**
   - Click "Authorize Cloudflare"
   - Chọn repository `dinhlegroup-website`
   - Click "Begin setup"

4. **Cấu hình Build Settings:**
   - **Project name:** `dinhlegroup-website` (hoặc tên bạn muốn)
   - **Production branch:** `main`
   - **Framework preset:** `None` hoặc `Plain HTML`
   - **Build command:** (để trống)
   - **Build output directory:** `/` (root)
   - **Root directory:** `/` (root)

5. **Deploy:**
   - Click "Save and Deploy"
   - Cloudflare sẽ tự động deploy website
   - Chờ vài phút để deploy hoàn tất

6. **Xem website:**
   - Sau khi deploy xong, bạn sẽ nhận được URL
   - Ví dụ: `https://dinhlegroup-website.pages.dev`
   - Website đã live!

## BƯỚC 5: TỰ ĐỘNG DEPLOY (Tùy chọn)

Sau khi kết nối, mỗi khi bạn push code mới lên GitHub:
- Cloudflare Pages sẽ tự động deploy lại
- Không cần làm gì thêm!

## CẬP NHẬT CODE MỚI

Khi bạn chỉnh sửa code:

```bash
cd "%USERPROFILE%\Desktop\DinhLeGroup-Website"
git add .
git commit -m "Update website"
git push
```

Cloudflare sẽ tự động deploy bản mới!

## LƯU Ý

- ✅ Repository phải là **Public** hoặc bạn phải authorize Cloudflare truy cập Private repo
- ✅ Đảm bảo tất cả file đã được commit và push
- ✅ Kiểm tra Build settings đúng (không cần build command)
- ✅ Website sẽ có URL dạng: `your-project-name.pages.dev`

## HỖ TRỢ

Nếu gặp vấn đề:
1. Kiểm tra lại Build settings
2. Xem logs trong Cloudflare Pages dashboard
3. Đảm bảo tất cả file HTML/CSS/JS đã được push lên GitHub

