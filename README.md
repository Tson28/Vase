# 🏺 Vase - Digital Services & AI Account Platform

Vase là nền tảng thương mại điện tử hiện đại, chuyên cung cấp các giải pháp tăng tương tác mạng xã hội (TikTok, Facebook, Instagram, YouTube) và phân phối các loại tài khoản AI, Premium (ChatGPT, Netflix, Spotify...).

Dự án được xây dựng với triết lý **"Soft Precision"** — Kết hợp giữa sự mềm mại của Glassmorphism và độ chính xác cao trong trải nghiệm người dùng (UX).

---

## ✨ Tính năng nổi bật

### 🛍️ Client Interface (User)
- **Landing Page**: Giao diện chào mừng hiện đại, hiệu ứng gradient mượt mà.
- **Explore & Social Services**: Hệ thống lọc và đặt hàng các dịch vụ tăng View, Like, Follow tự động.
- **AI Products**: Danh mục sản phẩm tài khoản số với bộ lọc thông minh.
- **Cart System**: Giỏ hàng realtime, quản lý số lượng và thanh toán tập trung.
- **User Profile**: Theo dõi số dư ví, lịch sử đơn hàng và cấp bậc thành viên (Rank).
- **Authentication**: Hệ thống đăng nhập/đăng ký hiện đại, bảo mật.

### 🛡️ Admin Dashboard (Management)
- **Overview Stat**: Theo dõi doanh thu, đơn hàng và khách hàng qua biểu đồ trực quan.
- **Product Management**: Quản lý kho hàng, cập nhật giá và tồn kho tức thì.
- **Order Tracking**: Xử lý quy trình đơn hàng từ lúc đặt đến khi hoàn tất.
- **User Management**: Quản lý danh sách thành viên, số dư và phân quyền Admin.
- **System Settings**: Cấu hình website, cổng thanh toán (MoMo/VNPAY) và bảo mật.

---

## 🛠️ Công nghệ sử dụng

- **Frontend**: [Next.js 14+](https://nextjs.org/) (App Router), [TypeScript](https://www.typescriptlang.org/).
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom UI Logic).
- **Icons**: [Lucide React](https://lucide.dev/).
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & CSS keyframes.
- **State Management**: [React Context API](https://react.dev/reference/react/useContext).

---

## 🚀 Cài đặt và Chạy thử

### 1. Clone repository
```bash
git clone https://github.com/liliustwocout/Vase.git
cd Vase
```

### 2. Cài đặt Frontend
```bash
cd frontend
npm install
npm run dev
```
Truy cập tại: `http://localhost:3000`

### 3. Cài đặt Backend
```bash
cd ../backend
# Làm theo hướng dẫn trong thư mục backend (nếu có)
```

---

## 📂 Cấu trúc thư mục

```text
Vase/
├── frontend/               # Mã nguồn ứng dụng Next.js
│   ├── src/
│   │   ├── app/           # App Router (Shop & Admin)
│   │   ├── components/    # UI Components tái sử dụng
│   │   ├── lib/           # Context & Utilities
│   │   └── styles/        # Global styles
├── backend/                # Mã nguồn server (API)
├── example/                # Hình ảnh tham khảo thiết kế
└── DESIGN.md               # Tài liệu hệ thống thiết kế "Soft Precision"
```

---

## 🎨 Design Philosophy: Soft Precision

Vase tuân thủ các quy tắc thiết kế nghiêm ngặt:
- **Tonal Layering**: Sử dụng các lớp màu cùng tông thay vì đường kẻ biên (border) cứng.
- **Glassmorphism**: Hiệu ứng kính mờ cho các thành phần Header và Card.
- **Indigo & Slate Palette**: Màu chủ đạo Indigo (#4647d3) kết hợp với các tone Slate sang trọng.
- **2XL Rounding**: Bo góc lớn (2xl) tạo cảm giác thân thiện và cao cấp.

---

## 🤝 Đóng góp

Nếu bạn muốn đóng góp cho dự án, vui lòng tạo **Pull Request** hoặc báo cáo **Issue**.

---

## 📄 License

Project này được phát triển bởi **liliustwocout**. Bản quyền thuộc về tác giả.
