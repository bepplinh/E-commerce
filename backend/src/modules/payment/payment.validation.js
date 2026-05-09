import { z } from "zod";
import { PAYMENT_METHODS } from "./payment.constants.js";

export { PAYMENT_METHODS };

export const createPaymentSchema = z.object({
    body: z
        .object({
            shippingAddressId: z.coerce.number().int().positive("shippingAddressId không hợp lệ"),
            shippingMethodId: z.coerce.number().int().positive("shippingMethodId không hợp lệ"),

            paymentMethod: z.enum(PAYMENT_METHODS, {
                errorMap: () => ({ message: "Phương thức thanh toán không hợp lệ" }),
            }),

            voucherId: z.coerce.number().int().positive().optional(),

            note: z.string().trim().max(500).optional().nullable(),
        })
        .strict(),
});
