import OrderRepository from "../order/order.repository";
import productRepository from "../product/product.repository";

const PaymentService = {
    createPayment: async (paymentData) => {
        const { userId, items, shippingAddressId, paymentMethod, voucherId, note } = paymentData;

        // items: [
        //     {
        //         variantId: 1,
        //         quantity: 2,
        //     },
        //     {
        //         variantId: 2,
        //         quantity: 3,
        //     },
        // ];

        const variants = await productRepository.findVariantsById(items.map((item) => item.variantId));

        const variantMap = new Map(variants.map((v) => [v.id, v]));

        const { totalAmount, orderItems } = caculateTotalOrder(items, variantMap);
    },
};

export default PaymentService;
