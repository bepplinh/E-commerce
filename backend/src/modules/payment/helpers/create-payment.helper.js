import * as cartRepository from "../../cart/cart.repository.js";
import OrderRepository from "../../order/order.repository.js";
import PaymentRepository from "../payment.repository.js";
import { BadRequestError, NotFoundError } from "../../../utils/app-error.js";
import { TERMINAL_ORDER_STATUSES } from "../payment.constants.js";
import { buildCheckoutResponse } from "./checkout.builder.js";

export const checkCart = async (userId) => {
    const cart = await cartRepository.findCartByUserId(userId);
    if (!cart) {
        throw new NotFoundError("Không tìm thấy giỏ hàng.");
    }
    if (!cart.items.length) {
        throw new BadRequestError("Giỏ hàng trống.");
    }
    return cart;
};

export const findExistingOrder = async (orderCodeOrIdempotencyKey, idempotencyKey) => {
    if (orderCodeOrIdempotencyKey?.startsWith?.("ORD-")) {
        return OrderRepository.getOrderByCode(orderCodeOrIdempotencyKey);
    }

    if (idempotencyKey) return OrderRepository.getOrderByIdempotencyKey(idempotencyKey);
    if (orderCodeOrIdempotencyKey) return OrderRepository.getOrderByIdempotencyKey(orderCodeOrIdempotencyKey);
    return null;
};

export const resolveExistingOrder = async (order) => {
    if (TERMINAL_ORDER_STATUSES.includes(order.status)) {
        throw new BadRequestError(`Đơn hàng ${order.code} đã được thanh toán hoặc đang vận chuyển.`);
    }

    if (order.status === "CANCELED") {
        throw new BadRequestError("Đơn hàng đã bị hủy. Vui lòng tạo đơn hàng mới.");
    }

    const pendingPayment = await PaymentRepository.getPendingPaymentByOrderId(order.id);
    if (!pendingPayment) {
        throw new NotFoundError("Không tìm thấy yêu cầu thanh toán hợp lệ cho đơn hàng này.");
    }

    return buildCheckoutResponse({
        order,
        totalAmount: Number(order.totalAmount),
        userId: order.userId,
        paymentMethod: pendingPayment.paymentMethod,
    });
};

export const reserveInventory = async (orderItems, tx) => {
    for (const item of orderItems) {
        const updatedRows = await tx.$executeRaw`
            UPDATE product_variants
            SET stock_quantity = stock_quantity - ${item.quantity}
            WHERE id = ${item.variantId} AND stock_quantity >= ${item.quantity}
        `;

        if (updatedRows === 0) {
            throw new BadRequestError(`Sản phẩm "${item.snapshotName}" đã hết hàng hoặc không đủ số lượng.`);
        }
    }
};

export const validateShippingAddress = async (tx, { userId, shippingAddressId }) => {
    const shippingAddress = await tx.address.findUnique({
        where: { id: shippingAddressId },
        select: { id: true, userId: true },
    });

    if (!shippingAddress || shippingAddress.userId !== userId) {
        throw new BadRequestError("Địa chỉ giao hàng không hợp lệ.");
    }

    return shippingAddress;
};

export const resolveShippingMethod = async (tx, shippingMethodId) => {
    const shippingMethod = await tx.shippingMethod.findUnique({
        where: { id: shippingMethodId },
        select: { id: true, baseFee: true },
    });

    if (!shippingMethod) {
        throw new NotFoundError("Không tìm thấy phương thức vận chuyển.");
    }

    return {
        shippingMethod,
        shippingFee: Number(shippingMethod.baseFee),
    };
};

export const resolveVoucherDiscount = async (tx, { voucherId, subtotal, shippingFee }) => {
    if (!voucherId) {
        return { voucher: null, discountAmount: 0 };
    }

    const voucher = await tx.voucher.findUnique({
        where: { id: voucherId },
        select: {
            id: true,
            discountType: true,
            discountValue: true,
            minOrderAmount: true,
            maxDiscountAmount: true,
            usageLimit: true,
            usedCount: true,
            startsAt: true,
            expiresAt: true,
            isActive: true,
        },
    });

    if (!voucher) {
        throw new NotFoundError("Không tìm thấy voucher.");
    }

    const now = new Date();
    if (!voucher.isActive) {
        throw new BadRequestError("Voucher đã bị vô hiệu hóa.");
    }
    if (voucher.startsAt > now || voucher.expiresAt < now) {
        throw new BadRequestError("Voucher đã hết hạn hoặc chưa được kích hoạt.");
    }
    if (voucher.usageLimit !== null && voucher.usedCount >= voucher.usageLimit) {
        throw new BadRequestError("Voucher đã hết lượt sử dụng.");
    }
    if (Number(subtotal) < Number(voucher.minOrderAmount)) {
        throw new BadRequestError("Đơn hàng chưa đạt giá trị tối thiểu để áp dụng voucher.");
    }

    const rawDiscount =
        voucher.discountType === "PERCENTAGE"
            ? (Number(subtotal) * Number(voucher.discountValue)) / 100
            : Number(voucher.discountValue);

    const cappedDiscount =
        voucher.maxDiscountAmount == null ? rawDiscount : Math.min(rawDiscount, Number(voucher.maxDiscountAmount));
    const discountAmount = Math.max(0, Math.min(cappedDiscount, Number(subtotal) + Number(shippingFee)));

    return { voucher, discountAmount };
};
