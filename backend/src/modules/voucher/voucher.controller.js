import VoucherService from "./voucher.service.js";
import ApiResponse from "../../helpers/response.helper.js";

const VoucherController = {
    validateVoucher: async (req, res, next) => {
        try {
            const { code } = req.params;
            const { orderAmount } = req.query;
            const userId = req.user?.id;
            const data = await VoucherService.validateVoucher(code, Number(orderAmount), userId);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Voucher is valid",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    claimVoucher: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const { voucherId } = req.body;
            const data = await VoucherService.claimVoucher(userId, Number(voucherId));
            return ApiResponse(res, {
                statusCode: 201,
                message: "Voucher claimed successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },

    getMyVouchers: async (req, res, next) => {
        try {
            const userId = req.user.id;
            const data = await VoucherService.getMyVouchers(userId);
            return ApiResponse(res, {
                statusCode: 200,
                message: "Your vouchers fetched successfully",
                data,
            });
        } catch (error) {
            next(error);
        }
    },
};

export default VoucherController;
