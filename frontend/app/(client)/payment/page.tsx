import PaymentButton from "@/components/payment/PaymentButton";

export default async function PaymentPage() {
    return (
        <div className="max-w-2xl mx-auto p-8">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold text-gray-800">Thanh toán đơn hàng</h1>
                <p className="text-gray-500">Demo luồng Action & Service trong Next.js</p>
            </header>
            
            <section className="bg-white shadow-sm border rounded-xl p-6 mb-8">
                <h2 className="text-lg font-semibold mb-4 text-gray-700">Thông tin giỏ hàng</h2>
                <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between">
                        <span>Sản phẩm mẫu x2</span>
                        <span className="font-medium">200.000đ</span>
                    </div>
                    <div className="flex justify-between text-blue-600">
                        <span>Phí vận chuyển</span>
                        <span>Miễn phí</span>
                    </div>
                </div>

                {/* Đây là nút bấm giả lập gọi Action */}
                <PaymentButton />
            </section>

            <div className="grid grid-cols-2 gap-4 text-xs text-gray-400">
                <div className="p-3 border rounded">
                    <p className="font-bold mb-1">Mô hình Service</p>
                    Chứa logic API/DB thuần túy. Tái sử dụng được cho cả Server Component và Action.
                </div>
                <div className="p-3 border rounded">
                    <p className="font-bold mb-1">Mô hình Action</p>
                    Là "Entry Point" từ Client. Xử lý Form, Auth, và điều hướng UI.
                </div>
            </div>
        </div>
    );
}
