/**
 * @deprecated Các helper trong file này đã được chuyển sang:
 *  - `./create-payment.helper.js` → findExistingOrder, handleExistingOrder, reserveInventory, ...
 *  - `./order.builder.js`         → calculateOrderTotal, buildOrderData
 *  - `./checkout.builder.js`      → buildCheckoutResponse
 *
 * File này giữ lại để tránh breaking imports cũ.
 */
export {
    checkCart,
    findExistingOrder,
    resolveExistingOrder as handleExistingOrder,
    reserveInventory,
    validateShippingAddress,
    resolveShippingMethod,
    resolveVoucherDiscount,
} from "./create-payment.helper.js";
export { buildCheckoutResponse as buildPaymentResponse } from "./checkout.builder.js";
