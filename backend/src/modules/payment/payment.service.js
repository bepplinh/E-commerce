import { NotFoundError } from "../../utils/app-error";
import OrderRepository from "../order/order.repository";
import productRepository from "../product/product.repository";

const PaymentService = {
    createPayment: async (paymentData) => {
        const { userId, items, shippingAddressId, paymentMethod, voucherId, note } = paymentData;

        const variants = await productRepository.findVariantsById(items.map((item) => item.variantId));

        const variantMap = new Map(variants);

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
    },
};

export default PaymentService;
