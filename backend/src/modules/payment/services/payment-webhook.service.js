import SePayWebhookService from "./sepay-webhook.service.js";

const PaymentWebhookService = {
    handleWebhookSepay: async (data) => {
        return SePayWebhookService.handleWebhook(data);
    },
};

export default PaymentWebhookService;
