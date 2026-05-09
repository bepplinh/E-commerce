import { SePayPgClient } from "sepay-pg-node";

const SePay = new SePayPgClient({
    env: process.env.SEPAY_ENV || "sandbox",
    merchant_id: process.env.SEPAY_MERCHANT_ID,
    secret_key: process.env.SEPAY_SECRET_KEY,
});

export default SePay;
