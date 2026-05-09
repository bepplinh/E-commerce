"use server";

import {
    createPaymentService,
    CreatePaymentBody,
} from "@/services/client/payment.service";
import { revalidatePath } from "next/cache";

/**
 * Payment Action - Lớp Giao Tiếp (The Trigger)
 * Chịu trách nhiệm nhận tương tác từ Client, validate quyền và gọi Service
 */
export const createPaymentAction = async (formData: FormData) => {
    // 1. Giả lập lấy token từ cookie hoặc session (server-auth-actions)
    const mockToken =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhYmNAZ21haWwuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NzgxNDI1ODksImV4cCI6MTc3ODE0MzQ4OX0.CAloLu9ykJTE5cCf6_40foXRmtbyZ-2mhczP0K7-Bc8";

    // 2. Thu thập dữ liệu từ Form hoặc body giả lập
    // Ở đây tôi lấy dữ liệu từ MOCK để demo đúng yêu cầu của bạn
    const body: CreatePaymentBody = {
        items: [
            {
                variantId: 2,
                quantity: 1,
            },
        ],
        shippingAddressId: null,
        voucherId: null,
        paymentMethod: "BANK_TRANSFER", // Giữ mặc định vì body user không có field này nhưng Schema yêu cầu
        note: "Giao hàng vào giờ hành chính giúp mình nhé",
    };

    try {
        // 3. Gọi Service để xử lý logic (Implementation)
        const result = await createPaymentService(body, mockToken);

        // 4. Revalidate cache nếu cần
        revalidatePath("/payment");

        return { success: true, data: result };
    } catch (err: any) {
        return { success: false, error: err.message };
    }
};
