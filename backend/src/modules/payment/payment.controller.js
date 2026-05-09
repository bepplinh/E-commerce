import ApiResponse from "../../helpers/response.helper.js";
import PaymentService from "./payment.service.js";

const PaymentController = {
    createPayment: async (req, res) => {
        const userId = req.user.id;
        const paymentData = { userId: userId, ...req.body };
        const result = await PaymentService.createPayment(paymentData);

        return ApiResponse(res, {
            message: "order created successfully",
            data: result,
        });
    },

    webhook: async (req, res) => {
        const payload = req.body;
        await PaymentService.handleWebhookSepay(payload);

        return res.status(200).json({ success: true });
    },
};

export default PaymentController;
