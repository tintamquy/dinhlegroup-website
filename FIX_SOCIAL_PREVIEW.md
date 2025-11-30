# HƯỚNG DẪN SỬA LỖI SOCIAL PREVIEW KHÔNG HIỂN THỊ ẢNH

## VẤN ĐỀ:
Social preview không hiển thị ảnh vì URL trong meta tags chưa đúng với domain thực tế của website.

## GIẢI PHÁP:

### Bước 1: Xác định URL website thực tế
Sau khi deploy lên Cloudflare Pages, bạn sẽ có URL dạng:
- `https://your-project.pages.dev` (Cloudflare Pages)
- HOẶC `https://dinhlegroup.com` (nếu đã setup custom domain)

### Bước 2: Cập nhật URL trong tất cả các file HTML

Tìm và thay thế `https://dinhlegroup.com` bằng URL thực tế của bạn trong các file:
- `index.html`
- `about.html`
- `services.html`
- `contact.html`
- `us-assets.html`
- `vietnam-operations.html`

**Ví dụ:** Nếu URL thực tế là `https://dinhlegroup-website.pages.dev`, thì thay:
```html
<meta property="og:image" content="https://dinhlegroup.com/og-image.png">
```
Thành:
```html
<meta property="og:image" content="https://dinhlegroup-website.pages.dev/og-image.png">
```

### Bước 3: Đảm bảo file og-image.png có thể truy cập được

Sau khi deploy, kiểm tra xem có thể truy cập:
- `https://your-domain.com/og-image.png`

Nếu không truy cập được, kiểm tra:
1. File đã được push lên GitHub chưa
2. Cloudflare Pages đã build và deploy file chưa
3. File có trong thư mục gốc của website

### Bước 4: Clear cache và test lại

Sau khi cập nhật URL:

1. **Facebook Debugger:**
   - Vào: https://developers.facebook.com/tools/debug/
   - Paste URL website
   - Click "Scrape Again" để clear cache
   - Xem preview

2. **Twitter Card Validator:**
   - Vào: https://cards-dev.twitter.com/validator
   - Paste URL
   - Xem preview

3. **LinkedIn Post Inspector:**
   - Vào: https://www.linkedin.com/post-inspector/
   - Paste URL
   - Xem preview

## LƯU Ý QUAN TRỌNG:

1. **URL phải là HTTPS** - Social media chỉ chấp nhận HTTPS
2. **URL phải là absolute** - Phải có đầy đủ `https://domain.com/path`
3. **File ảnh phải accessible** - Phải có thể truy cập công khai
4. **Kích thước ảnh:** 1200x630px (tỷ lệ 1.91:1)
5. **File size:** Nên dưới 1MB để load nhanh

## KIỂM TRA NHANH:

Mở browser và truy cập:
```
https://your-domain.com/og-image.png
```

Nếu thấy ảnh → OK
Nếu không thấy → Kiểm tra lại file và deployment

## SAU KHI SỬA:

1. Commit và push lên GitHub:
```bash
git add .
git commit -m "Update social preview URLs to match actual domain"
git push origin main
```

2. Đợi Cloudflare Pages rebuild (thường 1-2 phút)

3. Test lại bằng các công cụ ở trên

