import { generateOrderCode } from "./generateOrderCode.js";
import { ORDER_STATUS, PAYMENT_STATUS } from "../payment.constants.js";
import { NotFoundError } from "../../../utils/app-error.js";

// ─── Normalizers ────────────────────────────────────────────────────────────

const toNullableId = (value) => value ?? null;
const toNullableText = (value) => value?.trim() || null;

// ─── Order Item Builder ──────────────────────────────────────────────────────

/**
 * Tính tổng tiền và build danh sách orderItems từ cart items + variant map.
 * Backend là nguồn sự thật duy nhất về giá — không tin dữ liệu từ client.
 */
export const calculateOrderTotal = (items, variantMap) => {
    let totalAmount = 0;

    const orderItems = items.map((item) => {
        const variant = variantMap.get(item.variantId);
        if (!variant) throw new NotFoundError(`Không tìm thấy variant với id=${item.variantId}`);

        const unitPrice = Number(variant.price);
        totalAmount += unitPrice * item.quantity;

        return {
            variantId: variant.id,
            quantity: item.quantity,
            price: variant.price,
            snapshotSku: variant.sku,
            snapshotName: variant.product.name,
            snapshotOptions: variant.optionValues?.map((ov) => ov.optionValue.value) ?? [],
        };
    });

    return { totalAmount, orderItems };
};

// ─── Order Data Builder ──────────────────────────────────────────────────────
export const buildOrderData = ({
    userId,
    totalAmount,
    orderItems,
    paymentMethod,
    shippingFee = 0,
    discountAmount = 0,
    shippingAddressId,
    voucherId,
    note,
    idempotencyKey,
}) => ({
    userId,
    code: generateOrderCode(),
    totalAmount,
    discountAmount,
    shippingFee,
    status: ORDER_STATUS.PENDING,
    idempotencyKey: idempotencyKey ?? null,
    shippingAddressId: toNullableId(shippingAddressId),
    voucherId: toNullableId(voucherId),
    note: toNullableText(note),
    orderItems,
    payment: {
        paymentMethod,
        status: PAYMENT_STATUS.PENDING,
        amount: totalAmount,
    },
});
