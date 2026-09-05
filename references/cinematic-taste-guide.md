# Cinematic Taste Guide & Aesthetic Principles for Product Showcases

> *"Good design is obvious. Great design is transparent. World-class product showcases make the viewer fall in love with the tool before they even touch it."*

Tài liệu này là **Kim Chỉ Nam về Gu Thẩm Mỹ (Taste & Craftsmanship)** dành cho AI Agent khi đạo diễn và sản xuất video showcase sản phẩm công nghệ. Nó đúc kết triết lý từ những chuẩn mực hàng đầu thế giới: **Linear, Apple Keynotes, Stripe Press, Raycast, Framer, và Arc Browser**.

---

## 1. Triết Lý Cốt Lõi: "Quiet Confidence" (Sự Tự Tin Tĩnh Lặng)

Phần lớn video giới thiệu sản phẩm của các công ty tầm thường hoặc do AI tạo ra thường mắc lỗi:
- Nhồi nhét quá nhiều hiệu ứng lòe loẹt: hào quang neon tím/xanh ngọc, đèn chùm quét liên tục, hạt particle bay tán loạn.
- Dùng chữ chuyển màu gradient bừa bãi (`background-clip: text`).
- Chuyển động cơ học, giật cục hoặc quá chậm chạp.

Ngược lại, các sản phẩm đẳng cấp toàn cầu toát lên vẻ đẹp **Quiet Confidence**:
1. **Sản phẩm là Ngôi Sao Tuyệt Đối:** Mọi chuyển động camera, ánh sáng và âm thanh sinh ra chỉ để tôn vinh sự mượt mà và sức mạnh của tính năng sản phẩm.
2. **Sự Tiết Chế Có Chủ Đích (Deliberate Restraint):** Trống trải đúng lúc, bùng nổ đúng nhịp. Không bao giờ trang trí chỉ để "cho đỡ trống".
3. **Vật Lý Hữu Cơ (Organic Physics):** Mọi chuyển động phải có khối lượng (mass), độ cản (damping), và gia tốc (stiffness) như các vật thể tinh tế ngoài đời thực.

---

## 2. Bảng Danh Sách Các "Tật Xấu AI" Cần Tuyệt Đối Tránh (Anti-AI Lazy Defaults)

Khi thiết kế video, hãy dừng lại và tự vấn xem bạn có đang rơi vào các thói quen mặc định lười biếng của AI hay không:

| Tật xấu AI (AI Tell / Lazy Default) | Tại sao bị chê là "kém sang"? | Chuẩn mực Thay Thế Của Studio Đẳng Cấp |
| :--- | :--- | :--- |
| **Gradient Text (Chữ tím sang hồng/xanh)** | Rửa trôi độ tương phản, trông rẻ tiền và lỗi thời như template Canva 2018. | **Solid Monochrome cao cấp:** Trắng tinh khôi `#FFFFFF` hoặc `#EDEDED` với độ dày font 700–800, kerning chặt `-0.04em`. |
| **Màu đen thuần `#000000` hoặc xám chết** | Làm video thiếu chiều sâu, trông như màn hình máy tính tắt. | **Deep Tinted Canvas:** Nền đen có ánh xanh thẫm `#07090E`, `#050814` hoặc titan sẫm `#0A0A0C` tạo cảm giác phòng tối Studio. |
| **Đèn nón chiếu chéo (Oblique Conic Light)** | Cắt đứt mặt kính, làm lóa màn hình, che mất navigation và icon. | **Atmospheric Rim Glow & Ambient Occlusion:** Tỏa sáng dịu nhẹ sau lưng thiết bị, bóng đổ đa tầng (`box-shadow: 0 30px 90px rgba(...)`). |
| **Cỡ chữ web tí hon (12px - 16px)** | Vô hình hoàn toàn trên màn hình điện thoại khi xem video 1080p. | **Video Medium Scale:** Tiêu đề `72px - 110px`, nhãn phụ `20px - 26px`, số liệu `90px - 140px`. |
| **Tất cả mọi thứ đều trôi từ dưới lên (y:30 → 0)** | Thiếu biên đạo thị giác (Visual Choreography), gây nhàm chán sau 10 giây. | **Đa dạng trục chuyển động:** Zoom perspective 3D, Masked text reveal từ đường chân trời, Staggered horizontal drift. |
| **Âm thanh tít te vô cảm (Chiptune blips)** | Nghe như trò chơi điện tử thập niên 90, làm hạ giá trị sản phẩm. | **Haptic Analog Foley:** Tiếng click phím cơ có âm trầm gỗ, chuông ma thuật có hồi âm không gian (Hall Reverb), Sub-bass 38Hz đầm chắc. |

---

## 3. Hệ Thống Typography Cho Video (Kinetic Video Typography)

Video là phương tiện chuyển động với thời gian đọc tính bằng mili-giây. Typography không chỉ để đọc, mà còn là **kiến trúc thị giác**:

### A. Tỷ Lệ Vàng Về Kích Thước (Video Scale Ratios)
- **Hero Title (Tiêu đề chính):** `72px - 110px`
  - Font: Sans-serif hiện đại (Inter Display, Geist, SF Pro Display).
  - Letter-spacing: Luôn đặt `-0.035em` đến `-0.05em` để chữ cô đọng, sắc sảo.
  - Weight: `700 (Bold)` hoặc `800 (Extrabold)`.
- **Category / Module Badge (Huy hiệu phân hệ):** `18px - 24px`
  - Font: Monospace kỹ thuật (Geist Mono, JetBrains Mono).
  - Casing: `UPPERCASE`.
  - Letter-spacing: `+0.06em` đến `+0.12em` (giãn dòng công nghệ cao).
- **Stat Counter (Số liệu thống kê):** `88px - 140px`
  - Dùng thuộc tính `font-variant-numeric: tabular-nums` để các chữ số nhảy không bị rung lắc layout.

### B. Nghệ Thuật Masked Reveal (Chữ mọc từ hư không)
Thay vì làm chữ mờ dần (`opacity: 0 -> 1`), hãy bọc chữ trong một container có `overflow: hidden`. Dùng Remotion Spring đẩy chữ từ dưới đáy hộp trồi lên:
```tsx
<div style={{ overflow: 'hidden', height: 90 }}>
  <h1 style={{
    transform: `translateY(${interpolate(entranceSpring, [0, 1], [100, 0])}%)`,
    letterSpacing: '-0.04em'
  }}>
    SIÊU TỐC ĐỘ.
  </h1>
</div>
```
Hiệu ứng này tạo cảm giác chữ được "đúc khuôn" và xuất hiện cực kỳ dứt khoát.

---

## 4. Không Gian 3D, Ánh Sáng & Chất Liệu Kính (Material Physics)

Một video showcase đạt điểm 10 phải tạo được **cảm giác chạm (tactile feel)**:

### A. Độ Nghiêng Con Quay 3D (Gyroscopic Perspective Tilt)
Đừng đặt cửa sổ sản phẩm phẳng 100% trên màn hình. Hãy cho nó một góc nhìn nhẹ trong không gian 3 chiều:
```css
perspective: 1400px;
transform: rotateX(4deg) rotateY(-3deg) rotateZ(0.5deg) scale(1.0);
```
Khi người dùng tương tác với sản phẩm (ví dụ click một nút ở góc phải), camera nhẹ nhàng nghiêng thêm `1.5deg` về phía điểm click theo hàm lò xo. Điều này mô phỏng chuyển động của mắt người khi quan sát một món đồ công nghệ trên bàn làm việc.

### B. Vệt Quét Phản Chiếu Mặt Kính (Specular Sheen Sweep)
Khi cửa sổ thiết bị bay vào khung hình, cho một dải sáng phản chiếu quét chéo qua mặt kính:
```tsx
const sheenX = interpolate(frame, [10, 45], [-120, 220], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

<div style={{
  position: 'absolute',
  top: 0, bottom: 0, width: '45%',
  background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.08), transparent)',
  transform: `translateX(${sheenX}%) skewX(-25deg)`,
  pointerEvents: 'none'
}} />
```
Vệt sáng này khẳng định chất liệu kính cao cấp (Liquid Retina / Gorilla Glass) mà không hề cản trở việc đọc nội dung bên trong.

### C. Hạt Nhiễu Điện Ảnh (Subtle Film Grain Overlay)
Trong đồ họa máy tính số, các dải gradient mượt mà trên nền tối thường bị hiện tượng vỡ dải màu (color banding) khi nén MP4 (H.264). 
Thêm một lớp **Film Grain 1.8%** phủ trên toàn bộ canvas:
- Triệt tiêu 100% hiện tượng vỡ dải màu banding.
- Tạo chất cảm điện ảnh (filmic organic feel), làm video ấm áp và cao cấp hơn hẳn các render kỹ thuật số vô hồn.

---

## 5. Nhịp Điệu & Biên Đạo Thời Gian (The Velocity Curve)

Video thương mại không được phép đều đều từ đầu đến cuối:
- **Fast-Slow-Fast (Nhịp Trống Dồn - Lặng - Bùng Nổ):**
  - Giây 0–5: Bùng nổ, dứt khoát.
  - Giây 6–20: Chậm lại, tập trung tối đa vào tính năng "sát thủ" (Hero Feature). Cho người xem thấy từng bước thao tác tinh tế.
  - Giây 21–45: Tăng tốc chóng mặt. Trình diễn 4–5 tính năng phụ theo nhịp dồn dập (mỗi tính năng 2.5–3.5 giây).
  - Giây 46–60+: Đưa về bến đỗ bình yên, logo hiện lên vững chãi, mã QR mời gọi hành động.

Hãy nhớ: **"Nếu mọi thứ đều quan trọng như nhau, thì không có gì quan trọng cả."** Hãy dũng cảm làm một cảnh siêu nhanh và một cảnh thật lắng đọng. Đó chính là TASTE.
