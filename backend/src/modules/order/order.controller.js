import orderService from "./order.service.js";

const OrderController = {
    getOrderById: async (req, res) => {
        const userId = req.user.id;
        const queryParams = req.query;
        const result = await orderService.getOrderByUserId(userId, queryParams);

        return ApiResponse(res, "order fetched successfully", result.data, result.meta);
    },
};

export default OrderController;
