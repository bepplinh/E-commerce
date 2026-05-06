const PaymentController = {
    createPayment: async (req, res) => {
        const userId = req.user.id;
        const paymentData = { userId: userId, ...req.body };
        const result = await PaymentService.createPayment(paymentData);
    },
};

export default PaymentController;
