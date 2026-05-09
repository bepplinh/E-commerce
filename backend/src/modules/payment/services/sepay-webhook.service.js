import { BadRequestError } from "../../../utils/app-error.js";
import PaymentRepository from "../payment.repository.js";
import OrderRepository from "../../order/order.repository.js";
import { addPaymentEmailJob } from "../../../queue/email.queue.js";
import { extractOrderCode, getIgnoreReason } from "../helpers/sepay-webhook.helper.js";

const SepayWebhookService = {
    handleWebhook: async (data) => {
        if (!data || typeof data !== "object") {
            throw new BadRequestError("Invalid webhook payload");
        }

        const { id: sepayTransactionId, transferAmount, transferType } = data;
        const orderCode = extractOrderCode(data);

        // Guard: bỏ qua nếu không đủ điều kiện xử lý
        const ignoreReason = await getIgnoreReason({
            transferType,
            orderCode,
            sepayTransactionId,
        });
        if (ignoreReason) {
            console.log(`[SePay Webhook] Bỏ qua giao dịch ${sepayTransactionId} — lý do: ${ignoreReason}`);
            return { success: true, ignored: true, reason: ignoreReason };
        }

        // Tìm đơn hàng
        const order = await OrderRepository.getOrderByCode(orderCode);
        if (!order) {
            console.log(`[SePay Webhook] Không tìm thấy đơn hàng: ${orderCode}`);
            return { success: true, ignored: true, reason: "order_not_found" };
        }

        // Tìm payment record PENDING
        const pendingPayment = await PaymentRepository.getPendingPaymentByOrderId(order.id);
        const paymentForAudit = pendingPayment ?? (await PaymentRepository.getPaymentByOrderId(order.id));

        // Kiểm tra số tiền khớp
        if (Number(transferAmount) !== Number(order.totalAmount)) {
            if (paymentForAudit) {
                await PaymentRepository.appendWebhookAttempt({
                    paymentId: paymentForAudit.id,
                    payload: data,
                    status: "IGNORED",
                    reason: "amount_mismatch",
                });
            }

            console.log(
                `[SePay Webhook] Số tiền không khớp — đơn hàng: ${order.code}, chờ: ${order.totalAmount}, nhận: ${transferAmount}`,
            );
            return { success: true, ignored: true, reason: "amount_mismatch" };
        }

        if (!pendingPayment) {
            console.log(`[SePay Webhook] Không có bản ghi PENDING cho đơn hàng: ${order.code}`);
            return { success: true, ignored: true, reason: "no_pending_payment" };
        }

        // Cập nhật trạng thái
        console.log(`[SePay Webhook] Xác nhận thanh toán cho đơn hàng: ${order.code}`);
        const updatedPayment = await PaymentRepository.updateStatusPayment({
            paymentId: pendingPayment.id,
            providerTransactionId: sepayTransactionId,
            providerResponse: data,
        });

        addPaymentEmailJob({
            email: order.user?.email,
            orderCode: order.code,
            totalAmount: order.totalAmount,
            paymentMethod: order.paymentMethod,
        }).catch((err) => console.log("Gửi mail thất bại: ", err));

        console.log(`[SePay Webhook] Thành công — paymentId: ${updatedPayment?.id}`);
        return { success: true, payment: updatedPayment };
    },
};

export default SepayWebhookService;
