/**
 * @deprecated Logic validate payment method đã được inline vào `payment.service.js`.
 * Dùng `SUPPORTED_PAYMENT_METHODS` từ `../payment.constants.js` để tự validate nếu cần.
 */
import { BadRequestError } from "../../../utils/app-error.js";
import { SUPPORTED_PAYMENT_METHODS } from "../payment.constants.js";

export const validatePaymentMethod = (paymentMethod) => {
    if (!SUPPORTED_PAYMENT_METHODS.includes(paymentMethod)) {
        throw new BadRequestError(`Phương thức thanh toán không được hỗ trợ: ${paymentMethod}`);
    }
};
