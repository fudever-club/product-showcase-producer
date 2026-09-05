# Camera, 3D Depth & Spatial Choreography

> *"Flat interfaces live on computer monitors; cinematic products exist in space. By giving your canvas depth, perspective, and dynamic focal points, you transform flat pixels into an irresistible physical experience."*

Tài liệu này hướng dẫn cách điều khiển camera không gian 3D, lớp chiều sâu điện ảnh (Spatial Sandwich) và vật lý ánh sáng trong Remotion.

---

## 1. Kiến Trúc "Bánh Mì Kẹp 3 Tầng Chiều Sâu" (The 3-Layer Spatial Sandwich)

Một video đơn điệu là video chỉ có 1 lớp duy nhất (cửa sổ sản phẩm nổi trên nền tối). 
Trong điện ảnh chuyên nghiệp, một khung hình luôn được cấu thành từ 3 tầng không gian:

```
[MẮT NGƯỜI XEM] ────────────────────────────────────────────────────────►
   │
   ├─► 1. TẦNG TIỀN CẢNH (Foreground Layer - Z: +150px)
   │     • Hạt bokeh xóa phông nhẹ (`filter: blur(6px)`) trôi lững lờ.
   │     • Các icon trôi nổi, phím bấm tắt (KBD pills) xuất hiện thoáng qua rồi tan biến.
   │
   ├─► 2. TẦNG SÂN KHẤU CHÍNH (Midground Stage - Z: 0px)
   │     • Cửa sổ thiết bị (macOS Window / iPhone Retina Mockup).
   │     • Video quay tương tác Playwright sắc nét 100%, không bị blur.
   │     • Vệt sáng quét phản xạ kính (Specular sheen) và bóng đổ đa tầng.
   │
   └─► 3. TẦNG KHÔNG GIAN HẬU CẢNH (Background Layer - Z: -300px)
         • Lưới tọa độ chìm (32px grid ở độ mờ 4%).
         • Ánh sáng vòm hào quang (Atmospheric Rim Glow) thở chậm theo nhịp nhạc.
         • Lớp Film Grain 1.8% khử vỡ dải màu H.264.
```

Nhờ có tiền cảnh xóa phông và hậu cảnh xa xăm, sân khấu sản phẩm ở giữa tự động nổi bật và có độ sâu vật lý chân thực.

---

## 2. Thiết Lập Camera 3D Perspective Trong Remotion

Remotion kết xuất bằng React và CSS DOM. Để camera có chiều sâu 3 chiều trung thực như trong Blender hay After Effects, áp dụng cấu trúc container không gian:

```tsx
<div
  style={{
    width: 1920,
    height: 1080,
    perspective: 1200, // Tiêu cự ống kính ~50mm điện ảnh
    perspectiveOrigin: '50% 45%', // Tâm mắt nhìn hướng nhẹ lên trên
    transformStyle: 'preserve-3d',
    overflow: 'hidden',
    position: 'relative',
  }}
>
  {/* Các layer con sử dụng translateZ, rotateX, rotateY */}
</div>
```

### Các Góc Camera Điện Ảnh Kinh Điển Cho Sản Phẩm Công Nghệ:

| Tên Góc Máy | Thông số CSS Transform | Cảm Xúc Tạo Ra |
| :--- | :--- | :--- |
| **The Executive Hero** | `rotateX(3deg) rotateY(-4deg) rotateZ(0.5deg)` | Uy quyền, vững chãi, tinh tế như trên trang bìa tạp chí công nghệ. |
| **The Macro Inspection** | `scale(1.45) translate(-180px, -60px) rotateX(6deg)` | Soi cận cảnh một nút bấm, một menu dropdown hoặc hoạt ảnh confetti. |
| **The Speed Flow** | `rotateY(12deg) rotateX(2deg) scale(0.95)` | Cảm giác lướt gió, cực kỳ phù hợp khi trình diễn danh sách scroll vô tận. |
| **The Bird's Eye Matrix**| `rotateX(25deg) scale(0.85)` | Tổng quan toàn bộ sơ đồ kiến trúc, phòng tranh 3D hoặc bản đồ hệ thống. |

---

## 3. Camera Động Tương Tác Theo Con Trỏ (Dynamic Gyroscopic Tracking)

Thay vì camera đứng yên chết một góc, hãy cho camera xoay nhẹ theo vị trí mà con trỏ chuột Playwright đang click vào:

```typescript
// Tính toán độ lệch của chuột so với tâm màn hình
const targetRotateY = (cursorX - 960) / 960 * 5.0; // Xoay tối đa +/- 5 độ
const targetRotateX = -(cursorY - 540) / 540 * 4.0; // Gật tối đa +/- 4 độ

// Làm mượt bằng Remotion spring
const smoothRotateY = spring({
  frame,
  fps,
  from: currentRotateY,
  to: targetRotateY,
  config: { mass: 0.8, damping: 20, stiffness: 80 }
});
```

Chuyển động này khiến người xem cảm giác như đang cầm thiết bị trên tay hoặc một người quay phim đang lia máy quay theo từng cử chỉ của sản phẩm.

---

## 4. Công Thức Film Grain Khử Vỡ Màu (Anti-Banding Filmic Dither)

Thêm component sau vào lớp trên cùng của Remotion Composition:

```tsx
export const FilmGrain: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity: 0.025, // 2.5% vừa đủ khử dải màu H.264 mà không làm mờ chữ
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        mixBlendMode: 'overlay',
        zIndex: 9999,
      }}
    />
  );
};
```
Khi render video MP4 qua FFmpeg, lớp grain này ép bộ mã hóa H.264 phân bổ bitrate đồng đều, loại bỏ triệt để các vết vằn màu (color banding artifacts) trên nền tối.
