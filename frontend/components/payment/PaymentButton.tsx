"use client";

import { useState } from "react";
import { createPaymentAction } from "@/actions/payment.action";

export default function PaymentButton() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handlePayment = async () => {
        setLoading(true);
        setResult(null);

        // Tạo FormData giả lập (hoặc lấy từ các input khác)
        const formData = new FormData();
        formData.append("note", "Thanh toán ngay qua Button");

        // Gọi Server Action
        const res = await createPaymentAction(formData);
        
        setResult(res);
        setLoading(false);
    };

    return (
        <div className="space-y-4">
            <button
                onClick={handlePayment}
                disabled={loading}
                className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                    loading 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-blue-600 hover:bg-blue-700 active:scale-95"
                }`}
            >
                {loading ? "Đang xử lý..." : "Thanh toán ngay (Action)"}
            </button>

            {result && (
                <div className={`p-4 rounded-lg border ${
                    result.success ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                }`}>
                    <p className={`font-bold ${result.success ? "text-green-700" : "text-red-700"}`}>
                        {result.success ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
                    </p>
                    <pre className="mt-2 text-xs overflow-auto max-h-40">
                        {JSON.stringify(result.data || result.error, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    );
}
