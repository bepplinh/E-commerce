import prisma from "../../config/prisma.js";

const normalizeProviderResponse = (providerResponse) => {
    if (!providerResponse || typeof providerResponse !== "object" || Array.isArray(providerResponse)) {
        return { rawPayload: providerResponse ?? null, webhookHistory: [] };
    }

    const webhookHistory = Array.isArray(providerResponse.webhookHistory) ? providerResponse.webhookHistory : [];

    return {
        ...providerResponse,
        webhookHistory,
    };
};

const PaymentRepository = {
    getPaymentByOrderId: (orderId) => {
        return prisma.payment.findFirst({
            where: { orderId },
            orderBy: { id: "desc" },
        });
    },

    getPendingPaymentByOrderId: (orderId) => {
        return prisma.payment.findFirst({
            where: { orderId, status: "PENDING" },
            orderBy: { id: "desc" },
        });
    },

    getPaymentByProviderTransactionId: (providerTransactionId) => {
        return prisma.payment.findFirst({
            where: { transactionId: String(providerTransactionId) },
        });
    },

    updateStatusPayment: ({ paymentId, providerTransactionId, providerResponse }) => {
        return prisma.$transaction(async (tx) => {
            // 1. Tìm thông tin payment để lấy orderId
            const payment = await tx.payment.findUnique({
                where: { id: paymentId },
                select: {
                    orderId: true,
                    order: {
                        select: {
                            userId: true,
                            code: true,
                            voucherId: true,
                        },
                    },
                    providerResponse: true,
                },
            });

            if (!payment) return null;

            // 2. Cập nhật trạng thái Payment sang PAID
            const currentProviderResponse = normalizeProviderResponse(payment.providerResponse);
            const updatedProviderResponse = {
                ...currentProviderResponse,
                rawPayload: providerResponse,
                webhookHistory: [
                    ...currentProviderResponse.webhookHistory,
                    {
                        status: "PAID",
                        providerTransactionId: String(providerTransactionId),
                        receivedAt: new Date().toISOString(),
                        payload: providerResponse,
                    },
                ],
            };

            const result = await tx.payment.updateMany({
                where: { id: paymentId, status: "PENDING" },
                data: {
                    status: "PAID",
                    transactionId: String(providerTransactionId),
                    providerResponse: updatedProviderResponse,
                    paidAt: new Date(),
                },
            });

            if (result.count === 0) return null;

            // 3. Cập nhật trạng thái Order tương ứng sang CONFIRMED
            await tx.order.update({
                where: { id: payment.orderId },
                data: { status: "CONFIRMED" },
            });

            if (payment.order.voucherId) {
                await tx.voucher.update({
                    where: { id: payment.order.voucherId },
                    data: {
                        usedCount: {
                            increment: 1,
                        },
                    },
                });

                await tx.userVoucher.updateMany({
                    where: {
                        userId: payment.order.userId,
                        voucherId: payment.order.voucherId,
                        usedAt: null,
                    },
                    data: {
                        usedAt: new Date(),
                    },
                });
            }

            // 4. Tạo notification cho user để đồng bộ trạng thái thanh toán
            await tx.notification.create({
                data: {
                    userId: payment.order.userId,
                    type: "ORDER",
                    title: `Thanh toán thành công - Đơn ${payment.order.code}`,
                    content: `Đơn hàng ${payment.order.code} đã được thanh toán thành công.`,
                },
            });

            return tx.payment.findUnique({
                where: { id: paymentId },
            });
        });
    },

    appendWebhookAttempt: ({ paymentId, payload, status, reason }) => {
        return prisma.$transaction(async (tx) => {
            const payment = await tx.payment.findUnique({
                where: { id: paymentId },
                select: { providerResponse: true },
            });

            if (!payment) return null;

            const currentProviderResponse = normalizeProviderResponse(payment.providerResponse);
            const nextWebhookHistory = [
                ...currentProviderResponse.webhookHistory,
                {
                    status,
                    reason: reason ?? null,
                    receivedAt: new Date().toISOString(),
                    payload,
                },
            ];

            return tx.payment.update({
                where: { id: paymentId },
                data: {
                    providerResponse: {
                        ...currentProviderResponse,
                        rawPayload: payload,
                        webhookHistory: nextWebhookHistory,
                    },
                },
            });
        });
    },
};

export default PaymentRepository;
