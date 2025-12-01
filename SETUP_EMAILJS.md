# Hướng Dẫn Setup EmailJS cho Contact Form

## Vấn đề hiện tại
Form contact hiện tại chỉ hiển thị thông báo thành công nhưng không thực sự gửi email. Để form hoạt động và gửi email về `info@dinhlegroup.com`, bạn cần setup EmailJS.

## Các bước setup EmailJS

### Bước 1: Tạo tài khoản EmailJS
1. Truy cập https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí (có thể dùng Gmail, Facebook, hoặc email)
3. Xác nhận email nếu cần

### Bước 2: Tạo Email Service
1. Vào **Email Services** trong dashboard
2. Click **Add New Service**
3. Chọn email provider (Gmail, Outlook, hoặc Custom SMTP)
4. Nếu dùng Gmail:
   - Kết nối với Gmail account của bạn
   - Authorize EmailJS để gửi email
5. Lưu lại **Service ID** (ví dụ: `service_abc123`)

### Bước 3: Tạo Email Template
1. Vào **Email Templates** trong dashboard
2. Click **Create New Template**
3. Đặt tên template (ví dụ: "Contact Form")
4. Thiết lập template như sau:

**Subject:**
```
New Contact Form Submission - {{subject}}
```

**Content:**
```
You have received a new message from your website contact form.

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
This email was sent from your website contact form.
```

5. Lưu lại **Template ID** (ví dụ: `template_xyz789`)

### Bước 4: Lấy Public Key
1. Vào **Account** > **General**
2. Copy **Public Key** (ví dụ: `abcdefghijklmnop`)

### Bước 5: Cập nhật code
1. Mở file `script.js`
2. Tìm các dòng này (khoảng dòng 35-37):
```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
```

3. Thay thế bằng thông tin thực tế của bạn:
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123'; // Service ID từ bước 2
const EMAILJS_TEMPLATE_ID = 'template_xyz789'; // Template ID từ bước 3
const EMAILJS_PUBLIC_KEY = 'abcdefghijklmnop'; // Public Key từ bước 4
```

### Bước 6: Test form
1. Mở website và vào trang Contact
2. Điền form và submit
3. Kiểm tra email `info@dinhlegroup.com` (hoặc email bạn đã kết nối với EmailJS)
4. Nếu nhận được email, setup thành công!

## Giới hạn miễn phí EmailJS
- 200 emails/tháng miễn phí
- Nếu cần nhiều hơn, có thể nâng cấp lên gói trả phí

## Lưu ý bảo mật
- Public Key có thể để public (trong code frontend)
- KHÔNG bao giờ để Private Key hoặc API Secret trong code frontend
- EmailJS đã xử lý bảo mật cho Public Key

## Troubleshooting
- Nếu không nhận được email:
  1. Kiểm tra spam folder
  2. Kiểm tra lại Service ID, Template ID, và Public Key
  3. Mở Console (F12) để xem lỗi
  4. Kiểm tra email service connection trong EmailJS dashboard

## Alternative: Sử dụng Formspree
Nếu không muốn dùng EmailJS, có thể dùng Formspree:
1. Truy cập https://formspree.io/
2. Tạo form mới
3. Lấy form endpoint
4. Cập nhật form action trong `contact.html`

