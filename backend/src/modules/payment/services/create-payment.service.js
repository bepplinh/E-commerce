import productRepository from "../../product/product.repository.js";
import OrderRepository from "../../order/order.repository.js";
import { BadRequestError, NotFoundError } from "../../../utils/app-error.js";
import { acquireLock, releaseLock } from "../../../utils/lock.helper.js";
import { SUPPORTED_PAYMENT_METHODS } from "../payment.constants.js";
import { calculateOrderTotal, buildOrderData } from "../helpers/order.builder.js";
import { buildCheckoutResponse } from "../helpers/checkout.builder.js";
import {
    checkCart,
    findExistingOrder,
    resolveExistingOrder,
    reserveInventory,
    resolveShippingMethod,
    resolveVoucherDiscount,
    validateShippingAddress,
} from "../helpers/create-payment.helper.js";

const CreatePaymentService = {
    createPayment: async (paymentData) => {
        const { userId, idempotencyKey, paymentMethod, shippingAddressId, shippingMethodId, voucherId, note } =
            paymentData;

        if (!shippingAddressId) throw new BadRequestError("Vui lòng chọn địa chỉ giao hàng.");
        if (!shippingMethodId) throw new BadRequestError("Vui lòng chọn phương thức vận chuyển.");
        if (!SUPPORTED_PAYMENT_METHODS.includes(paymentMethod)) {
            throw new BadRequestError(`Phương thức thanh toán không được hỗ trợ: ${paymentMethod}`);
        }

        const lockKey = `lock:payment:${idempotencyKey || userId}`;
        const gotLock = await acquireLock(lockKey, 10);
        if (!gotLock) {
            throw new BadRequestError("Yêu cầu đang được xử lý, vui lòng không gửi lại liên tục.");
        }

        try {
            const existingOrder = await findExistingOrder(idempotencyKey);
            if (existingOrder) return resolveExistingOrder(existingOrder);

            const cart = await checkCart(userId);
            const cartItems = cart.items.map((item) => ({
                variantId: item.variantId,
                quantity: item.quantity,
            }));

            const variants = await productRepository.findVariantsById(cartItems.map((i) => i.variantId));
            if (variants.length !== cartItems.length) {
                throw new NotFoundError("Một hoặc nhiều sản phẩm không tồn tại.");
            }

            const variantMap = new Map(variants.map((v) => [v.id, v]));
            const { totalAmount: itemsSubtotal, orderItems } = calculateOrderTotal(cartItems, variantMap);

            const newOrder = await OrderRepository.createOrderInTransaction(async (tx) => {
                await validateShippingAddress(tx, { userId, shippingAddressId });
                const { shippingMethod, shippingFee } = await resolveShippingMethod(tx, shippingMethodId);
                const { voucher, discountAmount } = await resolveVoucherDiscount(tx, {
                    voucherId,
                    subtotal: itemsSubtotal,
                    shippingFee,
                });

                await reserveInventory(orderItems, tx);

                const finalAmount = Math.max(0, Number(itemsSubtotal) + shippingFee - discountAmount);
                const orderData = buildOrderData({
                    userId,
                    totalAmount: finalAmount,
                    orderItems,
                    paymentMethod,
                    shippingFee,
                    discountAmount,
                    shippingAddressId,
                    voucherId: voucher?.id ?? null,
                    note,
                    idempotencyKey,
                });

                const order = await OrderRepository.createOrder(orderData, tx);

                await tx.orderShipping.create({
                    data: {
                        orderId: order.id,
                        shippingMethodId: shippingMethod.id,
                    },
                });

                return order;
            });

            return buildCheckoutResponse({
                order: newOrder,
                totalAmount: Number(newOrder.totalAmount),
                userId,
                paymentMethod,
            });
        } finally {
            await releaseLock(lockKey);
        }
    },
};

export default CreatePaymentService;
