import PaymentRepository from "../payment.repository.js";

const ORDER_CODE_PATTERN = /ORD-[A-Z0-9]+/;

export const extractOrderCode = (data) => {
    const candidate = data.order_invoice_number || data.code;

    if (candidate && !candidate.startsWith("PAY")) return candidate;

    const searchText = `${data.content ?? ""} ${data.description ?? ""}`;
    const match = searchText.match(ORDER_CODE_PATTERN);
    return match?.[0] ?? null;
};

export const getIgnoreReason = async ({ transferType, orderCode, sepayTransactionId }) => {
    if (transferType !== "in" || !orderCode) {
        return "not_incoming_or_no_code";
    }

    const existingPayment = await PaymentRepository.getPaymentByProviderTransactionId(sepayTransactionId);
    if (existingPayment?.status === "PAID") {
        return "duplicate_transaction";
    }

    return null;
};
