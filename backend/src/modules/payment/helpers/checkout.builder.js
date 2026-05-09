import SePay from "../../../config/sepay.config.js";

const APP_URL = process.env.APP_URL || "http://localhost:5173";

/**
 * Build payload gửi lên SePay để khởi tạo một phiên thanh toán.
 */
export const buildSePayCheckoutData = ({ order, totalAmount, userId, paymentMethod }) => ({
    operation: "PURCHASE",
    payment_method: paymentMethod,
    order_invoice_number: order.code,
    order_amount: totalAmount,
    currency: "VND",
    order_description: `Thanh toán đơn hàng ${order.code}`,
    customer_id: String(userId),
    success_url: `${APP_URL}/payment/success`,
    error_url: `${APP_URL}/payment/error`,
    cancel_url: `${APP_URL}/payment/cancel`,
    custom_data: JSON.stringify({ orderId: order.id }),
});

/**
 * Build response trả về cho client sau khi tạo đơn hàng thành công.
 * Bao gồm URL thanh toán và các field cần thiết cho SePay checkout form.
 */
export const buildCheckoutResponse = ({ order, totalAmount, userId, paymentMethod }) => {
    const checkoutData = buildSePayCheckoutData({ order, totalAmount, userId, paymentMethod });
    const fields = SePay.checkout.initOneTimePaymentFields(checkoutData);

    return {
        order,
        checkoutUrl: SePay.checkout.initCheckoutUrl(),
        fields,
        paymentLink: `${APP_URL}/checkout/${order.code}`,
    };
};
