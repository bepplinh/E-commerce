import { cache } from "react";

const ENDPOINT = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export interface CreatePaymentBody {
    items: {
        variantId: number;
        quantity: number;
    }[];
    shippingAddressId?: number | null;
    paymentMethod: "COD" | "BANK_TRANSFER" | "MOMO" | "VNPAY" | "ZALOPAY" | "CREDIT_CARD";
    voucherId?: number | null;
    note?: string | null;
}

/**
 * Payment Service - Lớp Logic (Implementation)
 * Dùng cho cả Server Components và Server Actions
 */
export const createPaymentService = async (body: CreatePaymentBody, token: string) => {
    try {
        const res = await fetch(`${ENDPOINT}/payments/create-payment`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(body),
            cache: "no-store", // Luôn gọi API mới vì đây là mutation
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.message || "Tạo thanh toán thất bại");
        }

        return data.data;
    } catch (err) {
        console.error("[createPaymentService]", err);
        throw err;
    }
};
