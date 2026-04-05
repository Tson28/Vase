# Tài liệu Hệ thống Thiết kế (Design System)

## 1. Creative North Star: "The Digital Curator" (Người Giám Tuyển Số)

Hệ thống thiết kế này không chỉ là một bộ khung giao diện; nó là một trải nghiệm thị giác được tinh chỉnh nhằm tôn vinh các sản phẩm trong thị trường kỹ thuật số. Lấy cảm hứng từ sự tinh tế của Stripe và triết lý tối giản của Vercel, phong cách chủ đạo được xác lập là **"Soft Precision" (Sự Chính Xác Mềm Mại)**.

Chúng ta phá vỡ cấu trúc lưới truyền thống bằng cách sử dụng các lớp (layers) chồng mờ, khoảng trắng có ý đồ và sự bất đối xứng nhẹ nhàng để dẫn dắt ánh nhìn. Thay vì dùng các đường kẻ thô cứng để ngăn cách, chúng ta sử dụng sự thay đổi sắc thái (tonal shifts) để tạo ra một không gian có chiều sâu, cảm giác như những tấm kính mờ đặt trên một mặt phẳng sạch sẽ.

---

## 2. Bảng màu (Colors) & Quy tắc "No-Line"

Hệ thống màu sắc được xây dựng để tạo ra sự chuyển động thị giác mượt mà từ sắc tím Vibrant Purple sang Blue.

### Palette Chính
- **Primary Gradient:** `primary` (#4647d3) tới `primary_container` (#9396ff). Sử dụng cho các hành động quan trọng và các điểm nhấn thương hiệu.
- **Surface & Background:** Sử dụng `surface_container_lowest` (#ffffff) và `background` (#f5f7f9) để tạo ra sự phân tách lớp.

### Quy tắc Vàng: "No-Line"
**Tuyệt đối không sử dụng đường kẻ (border) 1px solid để phân chia các khu vực.** 
- Sự phân chia phải được thực hiện thông qua việc thay đổi màu nền: Ví dụ, một thẻ nội dung `surface_container_lowest` nằm trên nền `surface_container_low`.
- **Ghost Border Fallback:** Trong trường hợp cực kỳ cần thiết để đảm bảo tính dễ đọc, chỉ sử dụng `outline_variant` với độ trong suốt 10-20%.

### Hiệu ứng Glassmorphism & Texture
Để đạt được vẻ ngoài cao cấp, các thành phần nổi (floating elements) như Header hoặc Menu cần sử dụng:
- Nền: `surface` với độ mờ (opacity) 80%.
- Hiệu ứng: `backdrop-blur` (16px - 24px).
- Điều này giúp màu sắc của các phần tử phía dưới "thấm" nhẹ qua lớp phủ, tạo sự gắn kết cho tổng thể.

---

## 3. Hệ Thống Chữ (Typography)

Sử dụng **Inter** — một font chữ hiện đại, tối ưu cho màn hình kỹ thuật số với độ đọc cao.

| Token | Size | Weight | Công dụng |
| :--- | :--- | :--- | :--- |
| **Display-LG** | 3.5rem | Bold | Tiêu đề Hero, những con số ấn tượng. |
| **Headline-MD** | 1.75rem | Semi-bold | Tiêu đề các mục lớn trong Marketplace. |
| **Title-SM** | 1.0rem | Medium | Tiêu đề thẻ sản phẩm, tên mục điều hướng. |
| **Body-LG** | 1.0rem | Regular | Văn bản mô tả sản phẩm chính. |
| **Label-MD** | 0.75rem | Medium | Trạng thái (status), danh mục sản phẩm. |

**Triết lý Editorial:** Sử dụng thang chữ có độ tương phản lớn (ví dụ: Headline lớn đặt cạnh Body nhỏ) để tạo cảm giác chuyên nghiệp như một tạp chí cao cấp.

---

## 4. Chiều Sâu & Phân Lớp (Elevation)

Chúng ta không sử dụng bóng đổ (shadow) mặc định của trình duyệt. Chiều sâu được tạo ra từ việc "Xếp chồng sắc thái" (Tonal Layering).

- **Layering Principle:** 
    - Cấp 0 (Nền): `background` (#f5f7f9).
    - Cấp 1 (Phần thân): `surface_container_low` (#eef1f3).
    - Cấp 2 (Thẻ/Card): `surface_container_lowest` (#ffffff).
- **Ambient Shadows:** Chỉ sử dụng khi phần tử cần "bay" trên bề mặt. Shadow phải có độ mờ cực lớn (blur: 40px-60px) và độ đậm thấp (4-8% opacity), sử dụng màu của `on_surface` pha trộn với tông xanh nhẹ để tạo sự tự nhiên.

---

## 5. Thành Phần Hệ Thống (Components)

### Buttons (Nút)
- **Primary:** Sử dụng gradient từ `primary` sang `primary_dim`. Bo góc 8px (`DEFAULT`). Hiệu ứng hover sẽ tăng độ bão hòa màu thay vì tối đi.
- **Secondary:** Nền `primary_container` với chữ `on_primary_container`. Không có viền.
- **Tertiary:** Chỉ dùng chữ `primary` trên nền trong suốt.

### Cards & Lists (Thẻ & Danh sách)
- **Cấm sử dụng đường kẻ ngang (divider).**
- Phân cách nội dung bằng khoảng cách (Spacing Scale `6` hoặc `8`) hoặc thay đổi nhẹ màu nền của từng dòng.
- Thẻ sản phẩm sử dụng bo góc 8px, nền trắng thuần trên nền trang xám nhạt để tạo sự nổi bật tự nhiên.

### Input Fields (Ô nhập liệu)
- Nền `surface_container_high` với `outline` cực mờ. 
- Khi focus, chuyển sang `primary` ghost border (20% opacity) và thêm một lớp shadow mờ nhẹ màu tím.

### Chips (Nhãn)
- Sử dụng cho danh mục sản phẩm (ví dụ: "Đồ họa", "Mã nguồn").
- Nền `secondary_container`, chữ `on_secondary_container`, không viền.

---

## 6. Do's and Don'ts (Nên và Không nên)

### Nên (Do)
- **Ưu tiên khoảng trắng:** Hãy để nội dung "thở". Sử dụng Spacing Scale `10` (2.5rem) cho các khoảng cách giữa các khối lớn.
- **Sử dụng tiếng Việt chuẩn:** Đảm bảo ngắt dòng hợp lý trong tiếng Việt, tránh để một từ đơn lẻ ở dòng cuối cùng của đoạn văn (orphan word).
- **Căn lề có ý đồ:** Sử dụng căn lề trái cho các đoạn văn bản dài để tối ưu trải nghiệm đọc.

### Không nên (Don't)
- **Không dùng Border đen/xám đậm:** Điều này làm giao diện trở nên "rẻ tiền" và giống như các template cũ.
- **Không dùng Shadow mặc định:** Tránh các bóng đổ tối và hẹp, chúng tạo cảm giác nặng nề.
- **Không lạm dụng Gradient:** Chỉ sử dụng gradient cho những điểm chạm quan trọng nhất (CTA, Hero Section) để giữ sự tinh tế.

---

*Lưu ý: Hệ thống thiết kế này tập trung vào sự tinh khiết và trải nghiệm cao cấp. Mọi quyết định thiết kế nên dựa trên việc giảm thiểu sự lộn xộn thị giác và tăng cường sự tập trung vào sản phẩm của người dùng.*