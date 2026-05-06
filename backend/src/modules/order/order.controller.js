import ApiResponse from "../../helpers/response.helper.js";
import orderService from "./order.service.js";

const OrderController = {
    getOrderById: async (req, res) => {
        const userId = req.user.id;
        const queryParams = req.query;
        const result = await orderService.getOrderByUserId(userId, queryParams);

        return ApiResponse(res, {
            message: "order fetched successfully",
            data: result.data,
            meta: result.meta,
        });
    },
};

export default OrderController;

