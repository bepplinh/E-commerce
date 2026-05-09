# Implementation Plan: Optimized Payment System

## 1. Kiến trúc Idempotency Layer (Vững chắc)

Tối ưu hóa việc kiểm tra trùng lặp để bảo vệ Database khỏi các request thừa.

- **Pre-check Lock**: Sử dụng Redis để đặt một "Processing Lock" ngắn hạn dựa trên `idempotencyKey` ngay khi request vừa đến. Điều này ngăn chặn 2 request giống hệt nhau đi vào tầng xử lý DB cùng một lúc.
- **State Validation**: Nếu tìm thấy đơn hàng cũ qua `idempotencyKey`, kiểm tra trạng thái:
  - `PAID/COMPLETED`: Trả về lỗi 400 (Already Processed).
  - `CANCELLED/EXPIRED`: Cho phép tạo đơn hàng mới với key mới (hoặc báo lỗi tùy business).
  - `PENDING`: Trả về thông tin thanh toán cũ (như hiện tại).

## 2. Quản lý Kho hàng & Giao dịch (Inventory Integrity)

- **Soft Reservation**: Thay vì trừ thẳng kho khi tạo đơn hàng (làm giảm tồn kho ảo nếu khách không thanh toán), hãy chuyển sang cơ chế:
  - `PENDING`: Giảm `available_stock`, tăng `reserved_stock`.
  - `PAID`: Xóa `reserved_stock`, giữ nguyên `available_stock` đã giảm.
  - `EXPIRED/CANCELLED`: Hoàn lại `available_stock` từ `reserved_stock`.
- **Atomic Transaction**: Đảm bảo toàn bộ luồng: Trừ kho -> Áp voucher -> Tạo đơn hàng -> Tạo payment diễn ra trong 1 Transaction duy nhất.

## 3. Cơ chế Order Expiration (Tự động hoàn kho)

Đây là phần quan trọng nhất còn thiếu:

- **Expires At**: Thêm trường `expiresAt` (ví dụ: 15-30 phút sau khi tạo).
- **Background Worker**: Sử dụng BullMQ hoặc Cron Job để quét các đơn hàng `PENDING` quá hạn:
  - Chuyển trạng thái Order sang `CANCELLED`.
  - Hoàn lại số lượng sản phẩm vào kho.
  - Hủy Voucher (nếu có).

## 4. Webhook & Reconcillation (Đối soát)

- **Partial Payment Handling**: Xử lý trường hợp người dùng chuyển khoản thiếu tiền (SePay báo về nhưng không đủ số tiền đơn hàng). Cần lưu lại lịch sử giao dịch lỗi để Admin đối soát.
- **Provider Logging**: Lưu toàn bộ `raw_payload` từ SePay vào một bảng `PaymentLogs` trước khi xử lý, phục vụ mục đích debug và audit sau này.

## 5. Security & Validation

- **Price Integrity**: Tuyệt đối không tin tưởng giá tiền từ Frontend. Phải tính toán lại toàn bộ `totalAmount` dựa trên DB Price tại thời điểm tạo đơn hàng.
- **Voucher Validation**: Kiểm tra tính hợp lệ của Voucher (hết hạn, số lượng sử dụng, điều kiện đơn hàng) bên trong Transaction.
