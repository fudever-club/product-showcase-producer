# Studio Audio DSP, Haptic Foley & Audio-Reactive Motion Standards

> *"Sound is half the picture. If your video looks like 2026 but sounds like 1995, the illusion is shattered. Cinematic tech showcases demand visceral sub-bass, organic mechanical tactile feedback, and seamless musical synchronization."*

Tài liệu kỹ thuật tổng hợp âm thanh đa tầng (Sound Design & Foley Synthesis), thuật toán bộ lọc analog Moog, chống méo tiếng inter-sample overshoot và đồng bộ chuyển động theo sóng âm trong Remotion.

---

## 1. Thuật Toán Chống Méo Tiếng & Đoán Trước Inter-Sample Overshoot

### Vấn Đề
Khi nén âm thanh từ định dạng gốc (PCM 16-bit / 24-bit) sang các định dạng nén suy hao phổ biến (Lossy Audio như MP3 hoặc AAC), quá trình tái tạo sóng (sinc reconstruction) của bộ giải mã sẽ tạo ra các **đỉnh giữa các mẫu âm (Inter-sample Peaks)** có thể cao hơn tín hiệu gốc từ **+0.3 dB đến +0.6 dB**. Nếu bạn chuẩn hóa ở `-0.5 dBFS` hoặc `-1.0 dBFS`, file MP3 cuối cùng sẽ bị đập trần `0.0 dBFS` và gây rè loa (`histogram_0db > 0`).

### Giải Pháp Chuẩn Studio
1. **Bão hòa băng từ mềm (Analog Tape Saturation - Tanh):**
   ```javascript
   // Áp dụng hàm hyperbolic tangent để nén nhẹ các đỉnh xung cao mà không gây méo cạnh vuông:
   let saturatedSample = Math.tanh(rawSample * 0.95);
   ```
2. **Ngưỡng chuẩn hóa PCM an toàn tuyệt đối:**
   ```javascript
   // Chuẩn hóa nghiêm ngặt về -2.0 dBFS trong miền PCM:
   const TARGET_PEAK = Math.pow(10, -2.0 / 20.0); // 0.7943 linear
   const normFactor = TARGET_PEAK / maxRawPeak;
   ```
   *Kết quả đo bằng `ffmpeg -af volumedetect`:* File MP3 sau khi encode sẽ đạt chính xác `-1.8 dBFS` đến `-1.9 dBFS` với **`histogram_0db: 0` (100% không rè tiếng)**.

---

## 2. Mô Hình Bộ Lọc Analog Moog 4-Pole (24 dB / Octave LPF)

Để âm thanh có chất điện ảnh dày dặn, không bị tiếng chói gắt kỹ thuật số (digital harshness), mọi dải âm thanh tổng hợp đều được chạy qua bộ lọc Moog 4-pole bậc 4:

```javascript
class MoogFilter {
  constructor(sampleRate = 44100) {
    this.sampleRate = sampleRate;
    this.y1 = 0; this.y2 = 0; this.y3 = 0; this.y4 = 0;
    this.oldx = 0; this.oldy1 = 0; this.oldy2 = 0; this.oldy3 = 0;
  }

  process(sample, cutoffHz, resonance = 0.3) {
    const f = (2.0 * cutoffHz) / this.sampleRate;
    const k = 3.6 * f - 1.6 * f * f - 1.0; // Hệ số nội suy xấp xỉ
    const p = (k + 1.0) * 0.5;
    const scale = Math.exp((1.0 - p) * 1.386249);
    const r = resonance * scale;

    const x = sample - r * this.y4;
    this.y1 = x * p + this.oldx * p - k * this.y1;
    this.y2 = this.y1 * p + this.oldy1 * p - k * this.y2;
    this.y3 = this.y2 * p + this.oldy2 * p - k * this.y3;
    this.y4 = this.y3 * p + this.oldy3 * p - k * this.y4;

    this.oldx = x;
    this.oldy1 = this.y1;
    this.oldy2 = this.y2;
    this.oldy3 = this.y3;

    return this.y4;
  }
}
```

---

## 3. Thiết Kế Âm Thanh Đa Tầng (Layered Haptic Foley Architecture)

Âm thanh được xây dựng từ 3 luồng độc lập, hòa trộn theo thời gian:

### A. Luồng 1 — Cinematic Bed & Sub-Bass (Âm Trầm Nền)
- **Sub-Drop (t = 0.0s):** Sóng sin trượt từ 85Hz xuống 32Hz theo hàm mũ `Math.exp(-t * 2.2)`, tạo độ rung ép ngực mạnh mẽ khi video bắt đầu.
- **Drone Bed:** Hai dao động sóng cưa (Sawtooth) cách nhau 4 cents (Detuned) đi qua Moog Filter cắt ở 450Hz, tạo cảm giác không gian công nghệ sâu thẳm.

### B. Luồng 2 — Haptic Mechanical Foley (Phản Hồi Xúc Giác)
- **Tiếng Click Bàn Phím Cơ (Mechanical Switch):**
  1. *Transient Click (Xung gõ đanh):* Băng thông 1800Hz - 2400Hz suy giảm cực nhanh trong 8ms (`Math.exp(-t * 350)`).
  2. *Body Resonance (Âm hưởng gỗ bàn):* Xung tần số thấp 180Hz tắt dần trong 40ms.
- **Tiếng Chuông AI Thành Công (Magic Shimmer):**
  - Hợp âm rải (Arpeggio) Pentatonic nốt cao C6 (1046Hz), E6 (1318Hz), G6 (1568Hz), C7 (2093Hz) gảy so le cách nhau 60ms với stereo pan trải từ trái sang phải.
- **Tiếng Đóng Dấu Triện / Xác Thực (Confirmation Slam):**
  - Cú thud 65Hz đầm chắc kèm tiếng rách giấy giòn tan (White noise bandpassed 3000Hz).

### C. Luồng 3 — Transition Sweeps & Whooshes (Chuyển Cảnh)
- Tiếng quét băng tần (Noise Bandpass Sweep) từ 200Hz vọt lên 4000Hz rồi rơi nhanh về 150Hz trong 0.6s.
- Hiệu ứng Stereo Haas Effect (kênh phải trễ hơn kênh trái 12ms) tạo cảm giác âm thanh bay từ màn hình xuyên qua tai người xem.

---

## 4. Dynamic Sidechain Audio Ducking

Để tiếng hiệu ứng (SFX) và giọng nói không bị BGM lấn át, hệ thống tự động dìm nhạc nền xuống theo đường cong bán nguyệt:

```javascript
function applyDucking(duckDepth = 0.35, duckDurationSec = 0.5) {
  // Hạ gain BGM xuống 35% tại tâm điểm và hồi phục mượt mà theo hình sin:
  const duckVal = 1.0 - (1.0 - duckDepth) * Math.sin(progress * Math.PI);
  duckingEnvelope[sampleIndex] = Math.min(duckingEnvelope[sampleIndex], duckVal);
}
```

---

## 5. Bảng Công Thức Audio-Reactive Trong Remotion

Ở nhịp độ **125 BPM** (chuẩn modern tech promo):
- Mỗi phách (Beat) = $30\text{ fps} \times \frac{60}{125} = 14.4\text{ frames}$.
- Mỗi khuông nhạc (1 Bar = 4 Beats) = $57.6\text{ frames}$.
- Mỗi nốt móc đơn (Eighth note) = $7.2\text{ frames}$.

### Thuật Toán Bắt Nhịp Trống & Xung Ánh Sáng
```typescript
import { useCurrentFrame } from 'remotion';

export const useAudioReactiveBeats = (bpm = 125) => {
  const frame = useCurrentFrame();
  const framesPerBeat = (60 / bpm) * 30; // 14.4
  
  const phase = (frame % framesPerBeat) / framesPerBeat;
  // Xung nhọn suy giảm theo hàm mũ, mô phỏng màng loa nảy
  const kickImpulse = Math.exp(-phase * 5.5);
  
  // Tác động lên độ nảy của cửa sổ thiết bị và độ sáng hào quang:
  const scaleBounce = 1.0 + kickImpulse * 0.025;
  const glowIntensity = 0.7 + kickImpulse * 0.4;
  
  return { kickImpulse, scaleBounce, glowIntensity };
};
```
