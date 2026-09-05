# Dual-Gate Vision & Aesthetic Taste QA Rubric

> *"Math proves a video is rendered correctly; Taste determines whether the world cares. An engineering pass is merely the entry ticket. The ultimate gatekeeper is aesthetic discernment."*

Tài liệu chuẩn mực kiểm định chất lượng 2 tầng (Dual-Gate QA System):
1. **Cổng 1 (Tầng Vật Lý & Toán Học):** Đo lường trắc lượng tự động bằng OpenCV.
2. **Cổng 2 (Tầng Gu Thẩm Mỹ & Nghệ Thuật):** Thẩm định thị giác bằng mô hình đa phương thức (VLM Vision Gatekeeper) theo 8 chiều kích của Taste.

---

## 🔬 CỔNG 1: Trắc Lượng Vật Lý Bằng OpenCV (Physical Floor Gate)

Script `VideoReviewAgent` phân tích từng frame và tính toán các chỉ số toán học để đảm bảo video không bị lỗi render:

| Chỉ số (Metric) | Thuật toán đo lường | Ngưỡng đạt chuẩn (Threshold) | Tác hại nếu trượt ngưỡng |
| :--- | :--- | :--- | :--- |
| **Contrast STD** | Độ lệch chuẩn ma trận độ xám `np.std(gray)` | **`> 40.0`** (Chuẩn `EXCELLENT`) | Khung hình bị mờ đục, xám xịt hoặc rửa trôi, thiếu độ sâu công nghệ. |
| **Mean Luminance** | Giá trị trung bình độ xám `np.mean(gray)` | **`35.0 - 55.0`** (Night Studio) | Quá tối làm mất chi tiết (<30) hoặc quá sáng làm chói mắt (>65). |
| **Laplacian Sharpness** | Phương sai toán tử Laplace `cv2.Laplacian(gray).var()` | **`> 120.0`** | Chữ hoặc video tương tác bị mờ nét, nhòe cạnh do render sai tỷ lệ resolution. |
| **Motion Flow (Farneback)**| Vector dịch chuyển pixel giữa 2 frame liên tiếp | **`0.15 - 0.35`** | Bằng 0: Đứng hình / freeze; Quá cao (>0.8): Giật khung hình, rách hình. |
| **Zero-Overlap Clearance** | Quét dải pixel tọa độ `y: 868px - 886px` | **Độ sáng đồng nhất, $0$ edge conflict** | Chữ của Feature Dock chạm đè vào cửa sổ thiết bị bên trên. |
| **Audio True Peak** | FFmpeg `volumedetect` | **`<= -1.5 dBFS`** (Target `-2.0 dBFS`) | Rè loa trên iPhone/MacBook do inter-sample overshoot khi nén AAC. |
| **Clipping Histogram** | Số mẫu âm thanh chạm trần `histogram_0db` | **`= 0` (Tuyệt đối không có mẫu nào)** | Âm thanh bị xén cụt sóng âm (flat-top clipping). |

---

## 👁️ CỔNG 2: Thẩm Định Gu Thẩm Mỹ Đa Phương Thức (Master Taste & Aesthetic Gate)

Sau khi Cổng 1 đạt toàn bộ điểm số xanh, Agent bắt buộc trích xuất **Contact Sheet 20 khung hình** (`contact_sheet.png`) và gọi `view_file` để trực tiếp soi chiếu dưới 8 chiều kích của Taste:

### 1. Chiều Kích 1: Tiết Chế Chữ & Typography Đẳng Cấp
- [ ] **Không dùng Gradient Text:** Tiêu đề phải là solid trắng ngà `#FFFFFF` hoặc `#EDEDED`, không bị biến thành dải màu tím/hồng/xanh cải lương.
- [ ] **Tỷ lệ tương phản kích thước:** Tiêu đề chính (`72-110px`) phải lấn át hoàn toàn nhãn phụ (`20-26px`). Không có hiện tượng "nhìn vào không biết đâu là trọng tâm".
- [ ] **Typography Hygiene:** Các ký tự tiếng Việt (`ƯỚ`, `Đ`, `Ễ`, `Ả`, `Ạ`) hiển thị sắc nét, không bị lỗi font fallback dạng ô vuông `▯`. Không có hiện tượng "Orphan Word" (1 từ rớt đơn độc xuống dòng cuối).

### 2. Chiều Kích 2: Không Gian Thở & Tỷ Lệ Vàng (Negative Space)
- [ ] **Bố cục không bị ngộp:** Mọi phần tử đều có tối thiểu `60px` khoảng thở tới mép khung hình.
- [ ] **Khoảng đệm Zero-Overlap:** Khoảng cách giữa đáy sân khấu (`y: 868px`) và đỉnh thanh Feature Dock (`y: 886px`) phải sạch bóng, lộ rõ khoảng không 18px tĩnh lặng.

### 3. Chiều Kích 3: Tính Chân Thực Của Sản Phẩm (Product Authenticity)
- [ ] **100% Ghi hình tương tác thật:** Mọi màn hình chức năng phải là video Playwright ghi hình thao tác chuột, gõ bàn phím thật; tuyệt đối không dùng ảnh tĩnh chụp màn hình gắn vào rồi phóng to giả vờ.
- [ ] **Tốc độ con trỏ tự nhiên:** Chuột di chuyển theo đường cong Bezier mượt mà, không giật cục góc 90 độ.

### 4. Chiều Kích 4: Chiều Sâu Điện Ảnh & Không Gian 3D (Spatial Depth)
- [ ] **Độ nghiêng Perspective:** Cửa sổ thiết bị có độ nghiêng con quay tinh tế (`rotateX: 3deg`, `rotateY: -4deg`), tạo cảm giác vật thể nổi trong không gian 3 chiều.
- [ ] **Vệt sáng Specular Sheen:** Có vệt sáng phản chiếu lướt nhẹ qua mặt kính khi vào cảnh, khẳng định chất liệu cao cấp.
- [ ] **Khử vỡ màu bằng Film Grain:** Nền tối có lớp grain 1.8% mịn màng, triệt tiêu hoàn toàn các vệt vằn màu banding của H.264.

### 5. Chiều Kích 5: Sự Hài Hòa Của Ánh Sáng (No Oblique Spotlights)
- [ ] **Tuyệt đối không có đèn nón chéo:** Không có bất kỳ luồng sáng hình nón nào từ góc màn hình cắt chéo đè lên giao diện làm lóa màn hình hay che mất traffic lights.
- [ ] **Atmospheric Rim Glow:** Ánh sáng hào quang tỏa êm ái từ sau lưng thiết bị, tôn vinh hình khối sản phẩm.

### 6. Chiều Kích 6: Khả Năng Quét Mã QR Tức Thì (Frictionless Onboarding)
- [ ] **Nền QR Trắng Tinh Khiết (`#FFFFFF`):** Mã QR ở phân cảnh kết thúc (Outro) bắt buộc phải nằm trên nền trắng tinh khiết với viền bảo vệ dày tối thiểu 16px.
- [ ] **Tốc độ nhận diện:** Đưa camera điện thoại vào khung hình phải nhận diện và hiển thị link ngay trong **$\le 0.3$ giây**.

### 7. Chiều Kích 7: Đồng Bộ Thị Giác & Âm Thanh (Audio-Visual Quantization)
- [ ] **Khóa phách âm nhạc:** Mỗi cú click chuột, mỗi lần nảy card hay chuyển phân cảnh đều rơi chính xác vào đầu phách hoặc nốt móc đơn (Eighth note) của nhịp 125 BPM.
- [ ] **Dynamic Ducking:** Nhạc nền tự động dìm nhẹ khi có tiếng chuông hoặc tiếng gõ phím đặc biệt.

### 8. Chiều Kích 8: Khơi Gợi Khao Khát Sử Dụng (Desire Induction)
- [ ] Xem xong 15 giây đầu, người xem có cảm nhận được đây là một công cụ xuất sắc, tốc độ và được chăm chút tỉ mỉ không? Nếu video trông như một bài thuyết trình PowerPoint chuyển động, video đó **FAILED TASTE**.

---

## 📋 Phiếu Đánh Giá Tổng Hợp (Master Verdict Contract)

```json
{
  "project_name": "Showcase Video",
  "gate_1_physical_cv": {
    "contrast_std": 43.8,
    "laplacian_sharpness": 185.2,
    "motion_flow": 0.24,
    "zero_overlap_clearance_px": 18,
    "audio_true_peak_dbfs": -1.82,
    "audio_clipping_samples": 0,
    "verdict": "PASS"
  },
  "gate_2_aesthetic_taste": {
    "typography_restraint": "EXCELLENT",
    "negative_space_balance": "EXCELLENT",
    "product_authenticity": "PASS (Playwright 60fps)",
    "spatial_3d_depth": "PASS (Perspective + Sheen)",
    "lighting_elegance": "PASS (Atmospheric Rim Glow)",
    "qr_scan_latency_sec": 0.22,
    "audio_visual_sync": "PASS (Quantized 125 BPM)",
    "overall_taste_score": 9.6,
    "verdict": "CERTIFIED_BROADCAST_GRADE"
  }
}
```
Video chỉ được xuất bản khi cả hai cổng đều đạt trạng thái `PASS`.
