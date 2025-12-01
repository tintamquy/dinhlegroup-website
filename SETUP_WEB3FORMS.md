# Hướng Dẫn Setup Web3Forms cho Contact Form

## Tại sao chọn Web3Forms?
- ✅ **250 emails/tháng miễn phí** (nhiều hơn EmailJS 200)
- ✅ **Không cần đăng ký phức tạp** - chỉ cần email
- ✅ **Dễ setup** - chỉ cần 1 Access Key
- ✅ **Có dashboard** để xem tất cả submissions
- ✅ **Không cần backend** - hoạt động hoàn toàn từ frontend
- ✅ **Bảo mật tốt** - có spam protection

## Các bước setup Web3Forms

### Bước 1: Lấy Access Key
1. Truy cập https://web3forms.com/
2. Nhập email của bạn (ví dụ: `info@dinhlegroup.com`)
3. Click **"Get Your Access Key"**
4. Kiểm tra email và click vào link xác nhận
5. Copy **Access Key** (ví dụ: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### Bước 2: Cập nhật code
1. Mở file `script.js`
2. Tìm dòng này (khoảng dòng 4):
```javascript
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE';
```

3. Thay thế bằng Access Key thực tế của bạn:
```javascript
const WEB3FORMS_ACCESS_KEY = 'a1b2c3d4-e5f6-7890-abcd-ef1234567890';
```

### Bước 3: Test form
1. Mở website và vào trang Contact
2. Điền form và submit
3. Kiểm tra email `info@dinhlegroup.com`
4. Nếu nhận được email, setup thành công! 🎉

## Dashboard Web3Forms
- Truy cập https://web3forms.com/ để xem dashboard
- Xem tất cả submissions đã nhận
- Xem thống kê số lượng emails đã gửi

## Giới hạn miễn phí
- **250 submissions/tháng** miễn phí
- Nếu cần nhiều hơn, có thể nâng cấp lên gói trả phí ($5/tháng cho 1000 submissions)

## Lưu ý bảo mật
- Access Key có thể để public (trong code frontend)
- Web3Forms đã xử lý bảo mật và spam protection
- Không cần lo lắng về bảo mật

## Troubleshooting
- Nếu không nhận được email:
  1. Kiểm tra spam folder
  2. Kiểm tra lại Access Key đã đúng chưa
  3. Mở Console (F12) để xem lỗi
  4. Kiểm tra email đã xác nhận chưa

## Alternative: FormSubmit (Không giới hạn)
Nếu cần không giới hạn và không muốn đăng ký, có thể dùng FormSubmit:
1. Thay đổi form action trong `contact.html`:
```html
<form action="https://formsubmit.co/info@dinhlegroup.com" method="POST">
```
2. Không cần JavaScript, form sẽ tự động gửi email
3. **Không giới hạn** submissions
4. Nhưng không có dashboard để xem submissions

## So sánh các dịch vụ

| Dịch vụ | Free Limit | Setup | Dashboard |
|---------|-----------|-------|-----------|
| **Web3Forms** | 250/tháng | ⭐⭐⭐ Dễ | ✅ Có |
| FormSubmit | Không giới hạn | ⭐⭐⭐⭐⭐ Rất dễ | ❌ Không |
| EmailJS | 200/tháng | ⭐⭐ Phức tạp | ✅ Có |
| Formspree | 50/tháng | ⭐⭐⭐ Dễ | ✅ Có |

**Khuyến nghị: Dùng Web3Forms** vì dễ setup và free nhiều hơn!

