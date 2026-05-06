import { NotFoundError } from "../../utils/app-error";

const caculateTotalOrder = (items, variantMap) => {
    let totalAmount = 0;
    const orderItems = items.map((item) => {
        const variant = variantMap.get(item.variantId);
        if (!variant) throw new NotFoundError("Variant not found");

        const price = Number(variant.price);
        totalAmount += price * item.quantity;

        return {
            variantId: variant.id,
            price: variant.price,
            snapshotSku: variant.sku,
            snapshotName: variant.product.name,
        };
    });

    return {
        totalAmount,
        orderItems,
    };
};
