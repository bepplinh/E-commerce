/**
 * Danh sách phương thức thanh toán hệ thống hỗ trợ.
 * Dùng cho cả Zod validation lẫn runtime check.
 */
export const PAYMENT_METHODS = ["COD", "BANK_TRANSFER", "MOMO", "VNPAY", "ZALOPAY", "CREDIT_CARD"];

/**
 * Phương thức thanh toán hiện đang được kích hoạt.
 */
export const SUPPORTED_PAYMENT_METHODS = ["BANK_TRANSFER"];

/** Trạng thái đơn hàng */
export const ORDER_STATUS = {
    PENDING: "PENDING",
    CONFIRMED: "CONFIRMED",
    PROCESSING: "PROCESSING",
    SHIPPED: "SHIPPED",
    DELIVERED: "DELIVERED",
    COMPLETED: "COMPLETED",
    CANCELED: "CANCELED",
    REFUNDED: "REFUNDED",
};

/** Trạng thái thanh toán */
export const PAYMENT_STATUS = {
    PENDING: "PENDING",
    PAID: "PAID",
    FAILED: "FAILED",
    REFUNDED: "REFUNDED",
};

/** Trạng thái đơn hàng được coi là đã hoàn tất / không thể tái tạo */
export const TERMINAL_ORDER_STATUSES = [
    ORDER_STATUS.CONFIRMED,
    ORDER_STATUS.PROCESSING,
    ORDER_STATUS.SHIPPED,
    ORDER_STATUS.DELIVERED,
    ORDER_STATUS.COMPLETED,
    ORDER_STATUS.REFUNDED,
];
