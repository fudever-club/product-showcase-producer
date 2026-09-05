# Narrative Pacing & Variable Velocity Blueprint

> *"Pacing is rhythm; rhythm is emotion. If your video beats like a metronome, your audience falls asleep. If it dances with sudden accelerations and breathless pauses, they cannot look away."*

Tài liệu này cung cấp công thức định nhịp điện ảnh (Cinematic Pacing), cấu trúc kịch bản 5 hồi và bảng lượng tử hóa âm nhạc (Beat Quantization) cho video showcase sản phẩm công nghệ.

---

## 1. Cấu Trúc 5 Hồi Biến Thiên Tốc Độ (The 5-Act Variable Velocity Arc)

Thay vì chia đều các phân cảnh thành 10 giây nhàm chán, video sản phẩm chuẩn Linear / Apple tuân thủ đường cong năng lượng 5 hồi:

```
Năng Lượng
  100% ─┐       [Hồi 1]                    [Hồi 3: Velocity Blitz]            [Hồi 5: Hero Lockup]
        │        HOOK                         BÙNG NỔ TỐC ĐỘ                      CHỐT HẠ ĐỈNH CAO
   70% ─┼───▲─────────────┐                     ▲   ▲   ▲   ▲                  ┌───────────────
        │  / \            │                    / \ / \ / \ / \                 │
   40% ─┼─/   \           │ [Hồi 2: Deep Dive]│   v   v   v   \ [Hồi 4]       │
        │/     \          └───────────────────┘                \ ECOSYSTEM    │
    0% ─┴───────────────────────────────────────────────────────\─────────────┴─────────────────► Thời gian (s)
        0s     5s        15s                 40s               65s           85s - 100s
```

### Chi Tiết Từng Hồi & Vai Trò Tâm Lý

| Hồi | Tên Phân Đoạn | Thời Lượng | Tốc Độ (Tempo) | Trải Nghiệm Cảm Xúc & Kỹ Thuật Dựng |
| :--- | :--- | :--- | :--- | :--- |
| **Hồi 1** | **Hook & Disruption** | `0.0s – 5.0s` | **Tia Chớp (Fast)** | - Mở đầu bằng âm thanh Sub-drop chấn động (`t = 0.0s`).<br/>- Hiện một câu tuyên ngôn đanh thép đập tan cách làm việc cũ.<br/>- Sản phẩm xuất hiện ngay lập tức trong 2 giây đầu, không vòng vo dạo đầu. |
| **Hồi 2** | **Flagship Deep Dive** | `5.0s – 25.0s` | **Điềm Đạm (Largo)** | - Đi sâu vào tính năng "sát thủ" (Hero Feature).<br/>- Camera trôi chậm (Slow push-in zoom từ 0.95 đến 1.05x).<br/>- Người xem được chứng kiến quy trình hoàn chỉnh từ tương tác chuột đến kết quả xuất sắc. |
| **Hồi 3** | **Velocity Blitz** | `25.0s – 50.0s` | **Dồn Dập (Presto)** | - Trình diễn liên hoàn 4–6 tính năng phụ hoặc phím tắt.<br/>- Mỗi tính năng chỉ xuất hiện **2.5s – 3.5s** ăn khớp chính xác với từng phách trống (1-2 bar drum loop).<br/>- Hiệu ứng cắt cảnh giòn giã (Whip pan, Zoom flash, Match cut). |
| **Hồi 4** | **Ecosystem & Scale** | `50.0s – 75.0s` | **Mở Rộng (Moderato)**| - Đưa sản phẩm vào bức tranh lớn: Kết nối đa thiết bị (Mobile + Desktop), cộng tác thời gian thực (Multiplayer), thống kê dữ liệu trực quan.<br/>- Camera lùi xa (Pull-back isometric) để lộ toàn bộ hệ sinh thái. |
| **Hồi 5** | **Hero Lockup & CTA** | `75.0s – 90s/100s`| **Vững Chãi (Maestoso)**| - Logo sản phẩm hiện diện kiêu hãnh giữa hào quang ánh sáng.<br/>- Mã QR độ tương phản cao trên nền trắng tinh khiết, sẵn sàng quét dưới 0.3s.<br/>- URL ngắn gọn, âm nhạc hòa âm vang vọng lắng dần (Reverb tail out). |

---

## 2. Bảng Lượng Tử Hóa Nhịp Âm Nhạc & Số Frame (Beat Quantization Table)

Để video mang lại cảm giác chuyên nghiệp, **tuyệt đối không để chuyển cảnh hay hiệu ứng rơi vào vị trí lơ lửng giữa các phách nhạc**. Mọi chuyển động phải được "khóa" (snap) vào lưới âm thanh:

Tỷ lệ khung hình tiêu chuẩn: **`30 fps`**

| Thông số Nhịp | 120 BPM (House / Tech) | 125 BPM (Electro / Modern) | 128 BPM (Festival / Energetic) |
| :--- | :--- | :--- | :--- |
| **Thời gian 1 Beat (Quarter Note)** | 0.500 giây | 0.480 giây | 0.46875 giây |
| **Số frame / 1 Beat** | **15.0 frames** | **14.4 frames** | **14.06 frames** |
| **1 Bar (4 Beats / 1 Khuông nhạc)** | 2.000s = **60 frames** | 1.920s = **57.6 frames** | 1.875s = **56.25 frames** |
| **2 Bars (8 Beats)** | 4.000s = **120 frames** | 3.840s = **115.2 frames** | 3.750s = **112.5 frames** |
| **4 Bars (1 Đoạn nhạc chuyển)** | 8.000s = **240 frames** | 7.680s = **230.4 frames** | 7.500s = **225 frames** |
| **1/2 Beat (Eighth Note - Phím tắt)** | 0.250s = **7.5 frames** | 0.240s = **7.2 frames** | 0.234s = **7.03 frames** |

### Công Thức Remotion Tính Beat Chính Xác
```typescript
import { useCurrentFrame, useVideoConfig } from 'remotion';

export const useMusicGrid = (bpm = 125) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig(); // 30
  
  const framesPerBeat = (60 / bpm) * fps; // 14.4 frames
  const currentBeat = frame / framesPerBeat;
  const beatProgress = currentBeat % 1; // 0.0 -> 1.0 trong mỗi phách
  
  // Tính xung nảy (Kick pulse) đạt đỉnh ở đầu phách và tắt dần
  const kickPulse = Math.exp(-beatProgress * 4.0);
  
  return { currentBeat, beatProgress, kickPulse, framesPerBeat };
};
```

---

## 3. Quy Tắc Chuyển Cảnh Theo Nội Dung (Contextual Transition Taxonomy)

Đừng lạm dụng một kiểu chuyển cảnh duy nhất (Fade đen hay Trôi ngang). Hãy chọn kiểu chuyển cảnh gắn liền với bản chất của thao tác:

1. **The Match-Cut Zoom (Phóng đại đồng dạng):**
   - *Áp dụng:* Khi bấm vào một thẻ card hoặc một avatar và mở ra trang chi tiết.
   - *Kỹ thuật:* Card phóng to từ tâm điểm màn hình (`scale: 1.0 -> 3.5`), độ mờ tăng dần hòa vào giao diện mới.
2. **The Gyro Whip-Pan (Lắc camera góc xiên):**
   - *Áp dụng:* Khi chuyển đổi giữa các tab ngang hoặc các phân hệ khác nhau trong Hồi 3 (Velocity Blitz).
   - *Kỹ thuật:* Camera nghiêng `rotateY: 15deg` lướt cực nhanh qua phải trong 6 frames (0.2s) kèm âm thanh Whoosh quét tần số cao.
3. **The Focus Rack (Chuyển tiêu cự chiều sâu):**
   - *Áp dụng:* Từ màn hình sản phẩm chuyển sang thanh Feature Dock hoặc chú thích kỹ thuật.
   - *Kỹ thuật:* Khung màn hình sản phẩm áp dụng `filter: blur(8px)` và hạ sáng `brightness(0.6)`, trong khi thanh chú thích bật sắc nét lên tiền cảnh.
