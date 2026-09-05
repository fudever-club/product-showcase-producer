# Zero-Overlap Layout & Screen Safe Zones (1920x1080 @ 30fps)

> *"In broadcast video, a single pixel collision between UI elements ruins the illusion of craft. Every element must breathe in its dedicated spatial envelope."*

Tài liệu hướng dẫn tiêu chuẩn công thái học, tọa độ pixel an toàn và hệ thống tỷ lệ kích thước chữ cho video (Video-Medium Scale) để loại bỏ 100% hiện tượng chồng lấn chữ, đè nút hoặc che khuất giao diện.

---

## 📐 1. Bản Đồ Tọa Độ Trục Dọc Tuyệt Đối (Vertical Elevation Map)

Khung hình tiêu chuẩn: **`1920 x 1080 px`** (Tỷ lệ 16:9)

```
y = 0px   ───────────────────────────────────────────────────────────── (Mép trên video)
            [ ZONE A: HUD Header Container ]
y = 24px  ┌───────────────────────────────────────────────────────────┐
          │  Logo Sản Phẩm • Phân Cảnh • Badge Sự Kiện • Timecode     │ (Chiều cao 56px)
y = 80px  └───────────────────────────────────────────────────────────┘
            (Khoảng đệm an toàn trên: 8px)
y = 88px  ┌───────────────────────────────────────────────────────────┐
          │                                                           │
          │             ZONE B: STAGE VIEWPORT CHÍNH                  │
          │                                                           │
          │   1. Desktop Window: 1380px x 780px (y: 88px - 868px)     │ (Chiều cao max 780px)
          │   2. Phone Mockup:   390px x 770px  (y: 88px - 858px)     │
          │                                                           │
          │                                                           │
y = 868px └───────────────────────────────────────────────────────────┘
            ⭐ [ VÙNG ĐỆM AN TOÀN TUYỆT ĐỐI: 18px BUFFER ZONE ] ⭐  (y: 868px -> 886px)
y = 886px ┌───────────────────────────────────────────────────────────┐
          │             ZONE C: DYNAMIC FEATURE DOCK                  │
          │   [ICON PHÂN HỆ]  Tiêu Đề Tính Năng • Mô Tả Đột Phá [KBD] │ (Chiều cao 74px)
y = 960px └───────────────────────────────────────────────────────────┘
            (Vùng thở hạt bụi không gian / Floating Particles: 102px)
y = 1062px ───────────────────────────────────────────────────────────── [ Neon Progress Scrubber ] (Cao 4px)
y = 1080px ───────────────────────────────────────────────────────────── (Mép dưới video)
```

---

## 📏 2. Quy Chuẩn Kích Thước Chữ Trong Video (Video-Medium Typography Scale)

**Lỗi phổ biến nhất của lập trình viên khi làm video:** Mang nguyên cỡ chữ của website (12px, 14px, 16px) vào video. 
Khi video phát trên màn hình điện thoại (chiều rộng chỉ ~380px thực tế) hoặc trên mạng xã hội bị nén bitrate, chữ 14px trở thành những vệt mờ không thể đọc được.

Bảng quy đổi bắt buộc:

| Thành Phần Văn Bản | Cỡ Chữ Web (Sai khi dùng trong video) | Cỡ Chữ Video Bắt Buộc (Chuẩn Broadcast) | Trọng Lượng (Weight) & Kiểu Chữ |
| :--- | :--- | :--- | :--- |
| **Headline Chính** | `32px - 40px` | **`72px - 96px`** | `700 Bold`, Kerning `-0.04em` |
| **Sub-headline / Tagline** | `16px - 18px` | **`32px - 40px`** | `500 Medium`, Kerning `-0.02em` |
| **Feature Dock Title** | `14px` | **`22px - 26px`** | `700 Bold`, Color `#FFFFFF` |
| **Feature Dock Subtitle** | `12px` | **`16px - 18px`** | `400 Regular`, Color `rgba(255,255,255,0.7)` |
| **KBD / Phím Tắt Badge** | `10px - 11px` | **`16px - 18px`** | Monospace kỹ thuật (`Geist Mono`) |
| **Header Badge** | `11px - 12px` | **`16px - 20px`** | `600 SemiBold`, `UPPERCASE` |

---

## 🛡️ 3. Ba Quy Tắc Vàng Chống Va Chạm (Collision Prevention Proof)

### Quy Tắc 1: Khoảng Đệm 18px Bất Khả Xâm Phạm
- Đáy của màn hình/khung thiết bị (Stage Viewport) kết thúc chính xác tại `y = 868px`.
- Đỉnh của thanh Feature Dock bắt đầu chính xác tại `y = 886px`.
- Giữa hai thành phần **luôn luôn duy trì khoảng trống $886 - 868 = 18\text{ px}$**.
- Trong script OpenCV `VideoReviewAgent`, dải pixel `y: 868 -> 886` được quét tự động. Nếu phát hiện pixel sáng có độ tương phản cao vượt ngưỡng an toàn, hệ thống sẽ kích hoạt cờ cảnh báo `Dock/UI Overlap Suspect`.

### Quy Tắc 2: Giới Hạn Chiều Cao Khung Thiết Bị Đa Nền Tảng
- **Desktop Window:** Chiều cao tối đa $H = 780\text{ px}$ (đặt tại $y = 88\text{ px}$, kết thúc $y = 868\text{ px}$).
- **Mobile Device (iPhone Mockup):** Chiều cao tối đa $H = 770\text{ px}$ (đặt tại $y = 88\text{ px}$, kết thúc $y = 858\text{ px}$). Khoảng đệm tới Dock tăng lên thành **$28\text{ px}$**, giúp bố cục thoáng đãng hơn nữa.

### Quy Tắc 3: Không Dùng Luồng Sáng Cắt Chéo (No Oblique Light Cones)
- Tuyệt đối không đặt các lớp phủ ánh sáng hình nón (`conic-gradient`) từ các góc màn hình cắt chéo qua mặt kính thiết bị. Nó làm mờ các nút điều hướng (Traffic lights), rửa trôi màu sắc và trông cụt hẫng.
- Thay vào đó, sử dụng hiệu ứng **Atmospheric Rim Glow** tỏa ra phía sau lưng thiết bị kết hợp với bóng đổ đa tầng:
  ```css
  box-shadow: 
    0 0 0 1px rgba(255, 255, 255, 0.12),
    0 20px 50px -10px rgba(0, 0, 0, 0.8),
    0 0 80px rgba(59, 130, 246, 0.15);
  ```
