import { Worker } from "bullmq";
import { connection } from "../config/bullmq.config.js";
import mailConfig from "../config/mail.js";

// Khởi tạo Worker để lắng nghe "email-queue"
const emailWorker = new Worker(
    "email-queue",
    async (job) => {
        const { name, data } = job;
        const transporter = await mailConfig();

        if (name === "send-payment-confirmation") {
            const { email, orderCode, totalAmount, paymentMethod } = data;

            console.log(`[Worker] Bắt đầu gửi email xác nhận cho đơn hàng ${orderCode} tới ${email}...`);

            // Gửi email
            const info = await transporter.sendMail({
                from: `"Cửa hàng của bạn" <${process.env.SMTP_USER}>`,
                to: email,
                subject: `Xác nhận đặt hàng thành công - Đơn ${orderCode}`,
                html: `
                    <h2>Cảm ơn bạn đã đặt hàng!</h2>
                    <p>Mã đơn hàng: <strong>${orderCode}</strong></p>
                    <p>Tổng tiền: <strong>${totalAmount.toLocaleString("vi-VN")} VND</strong></p>
                    <p>Phương thức thanh toán: <strong>${paymentMethod}</strong></p>
                    <br/>
                    <p>Vui lòng tiến hành thanh toán để chúng tôi giao hàng cho bạn trong thời gian sớm nhất.</p>
                `,
            });

            console.log(`[Worker] Gửi email thành công tới ${email}. Message ID: ${info.messageId}`);
            return info.messageId; // Trả về kết quả để lưu vào job's return value
        }
    },
    { connection },
);

// Xử lý các sự kiện của worker để log lỗi nếu có
emailWorker.on("completed", (job) => {
    console.log(`Job [${job.name}] có ID ${job.id} đã hoàn thành!`);
});

emailWorker.on("failed", (job, err) => {
    console.error(`Job [${job.name}] có ID ${job.id} bị lỗi:`, err.message);
});

export default emailWorker;
