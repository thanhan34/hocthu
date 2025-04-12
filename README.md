npm # PTE Intensive - Website Đăng Ký Học Thử

Website đăng ký học thử cho trung tâm PTE Intensive, được xây dựng bằng Next.js, Tailwind CSS và Firebase.

## Tính năng

- Trang chủ với form đăng ký học thử
- Trang cảm ơn sau khi đăng ký
- Trang admin ẩn để quản lý dữ liệu đăng ký
- Gửi email thông báo khi có người đăng ký mới
- Lưu trữ dữ liệu đăng ký vào Firebase Firestore
- Theo dõi UTM parameters cho mục đích marketing

## Cài đặt

1. Clone repository:

```bash
git clone <repository-url>
cd hocthu
```

2. Cài đặt các dependencies:

```bash
npm install
```

3. Tạo file `.env.local` từ file `.env.local.example` và cập nhật các thông tin cấu hình:

```bash
cp .env.local.example .env.local
```

4. Cập nhật file `.env.local` với thông tin Firebase và EmailJS của bạn:

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your-service-id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your-template-id
NEXT_PUBLIC_EMAILJS_USER_ID=your-user-id
```

## Cấu hình Firebase

1. Tạo một dự án Firebase mới tại [Firebase Console](https://console.firebase.google.com/)
2. Tạo một ứng dụng web trong dự án
3. Sao chép thông tin cấu hình Firebase vào file `.env.local`
4. Tạo một Firestore database và collection `hoc_thu_dang_ky`

## Cấu hình EmailJS

1. Đăng ký tài khoản tại [EmailJS](https://www.emailjs.com/)
2. Tạo một service (ví dụ: Gmail)
3. Tạo một email template với các tham số sau:
   - `ho_ten`: Họ tên người đăng ký
   - `so_dien_thoai`: Số điện thoại
   - `muc_dich`: Mục đích học PTE
   - `thoi_gian_can`: Thời gian cần có điểm
   - `thanh_pho`: Thành phố
   - `email`: Email người đăng ký
4. Sao chép Service ID, Template ID và User ID vào file `.env.local`

## Chạy ứng dụng

```bash
npm run dev
```

Mở [http://localhost:3000](http://localhost:3000) để xem trang chủ.

Trang admin có thể truy cập tại [http://localhost:3000/admin-secret-123](http://localhost:3000/admin-secret-123).

## Triển khai

Cách dễ nhất để triển khai ứng dụng Next.js là sử dụng [Vercel Platform](https://vercel.com/new).

1. Đẩy code lên GitHub
2. Kết nối repository với Vercel
3. Thêm các biến môi trường trong cài đặt dự án Vercel
4. Triển khai

## Cấu trúc dự án

- `app/`: Thư mục chính của ứng dụng Next.js
  - `page.tsx`: Trang chủ
  - `thank-you/page.tsx`: Trang cảm ơn
  - `admin-secret-123/page.tsx`: Trang admin
  - `components/`: Các component React
  - `firebase/`: Cấu hình và utility functions cho Firebase
  - `utils/`: Các utility functions khác
- `public/`: Tài nguyên tĩnh (hình ảnh, favicon, v.v.)
