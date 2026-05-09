import { Queue } from "bullmq";
import { connection, defaultJobOptions } from "../config/bullmq.config.js";

// Khởi tạo hàng đợi chuyên xử lý việc gửi email
export const emailQueue = new Queue("email-queue", {
    connection,
    defaultJobOptions,
});

// Hàm helper để dễ dàng thêm job gửi email xác nhận thanh toán
export const addPaymentEmailJob = async (emailData) => {
    return emailQueue.add("send-payment-confirmation", emailData, {
        priority: 1, // Ưu tiên cao hơn các email thông thường
        attempts: 3, // Thử lại 3 lần nếu lỗi
    });
};
