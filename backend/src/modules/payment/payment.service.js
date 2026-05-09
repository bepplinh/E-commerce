import CreatePaymentService from "./services/create-payment.service.js";
import PaymentWebhookService from "./services/payment-webhook.service.js";

const PaymentService = {
    createPayment: (...args) => CreatePaymentService.createPayment(...args),
    handleWebhookSepay: (...args) => PaymentWebhookService.handleWebhookSepay(...args),
};

export default PaymentService;
