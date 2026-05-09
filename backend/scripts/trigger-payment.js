
import 'dotenv/config';
import PaymentService from '../src/modules/payment/payment.service.js';
import fs from 'fs';
import path from 'path';
import prisma from '../src/config/prisma.js';

async function main() {
    // Tìm một user và một sản phẩm có sẵn để tạo đơn hàng test
    const user = await prisma.user.findFirst();
    const variant = await prisma.productVariant.findFirst({ where: { stockQuantity: { gt: 0 } } });

    if (!user || !variant) {
        console.error('Không tìm thấy user hoặc sản phẩm có sẵn trong DB');
        return;
    }

    // Cập nhật giá sản phẩm thành 5000 để test
    console.log(`--- Đang cập nhật giá sản phẩm ${variant.sku} thành 5000 VND ---`);
    await prisma.productVariant.update({
        where: { id: variant.id },
        data: { price: 5000 }
    });

    const paymentData = {
        userId: user.id,
        idempotencyKey: `test_real_${Date.now()}`,
        items: [
            { variantId: variant.id, quantity: 1 }
        ],
        paymentMethod: 'BANK_TRANSFER',
        shippingAddressId: null,
        note: 'Test thanh toán thật 5000 VND qua SePay'
    };

    try {
        console.log('--- Đang tạo đơn hàng test ---');
        const response = await PaymentService.createPayment(paymentData);
        console.log('Đã tạo đơn hàng:', response.order.code);
        console.log('Tổng tiền:', response.order.totalAmount);
        
        const htmlContent = `
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <title>Thanh toán SePay - ${response.order.code}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: #f0f2f5; margin: 0; }
        .card { background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 100%; }
        h2 { color: #1a1a1a; margin-bottom: 0.5rem; }
        .amount { font-size: 24px; font-weight: bold; color: #d32f2f; margin: 1.5rem 0; }
        .info { text-align: left; background: #f8f9fa; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 14px; }
        button { background: #007bff; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; font-size: 16px; font-weight: 600; width: 100%; transition: background 0.2s; }
        button:hover { background: #0056b3; }
        .footer { margin-top: 1.5rem; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="card">
        <h2>Thanh toán đơn hàng</h2>
        <p style="color: #666;">Mã đơn: <strong>${response.order.code}</strong></p>
        
        <div class="amount">${new Intl.NumberFormat('vi-VN').format(response.order.totalAmount)} VND</div>
        
        <div class="info">
            <div><strong>Người mua:</strong> ${user.username}</div>
            <div><strong>Sản phẩm:</strong> ${variant.sku}</div>
        </div>

        <form action="${response.checkoutUrl}" method="POST">
            ${Object.entries(response.fields).map(([key, value]) => `<input type="hidden" name="${key}" value="${value}">`).join('\n            ')}
            <button type="submit">Quét mã QR qua SePay</button>
        </form>
        
        <div class="footer">
            Sau khi nhấn, bạn sẽ được chuyển đến trang hiển thị mã QR của SePay.
            Hãy thực hiện chuyển khoản đúng số tiền và nội dung để hệ thống tự động xác nhận.
        </div>
    </div>
</body>
</html>
        `;

        const filePath = path.resolve('test-checkout.html');
        fs.writeFileSync(filePath, htmlContent);
        console.log('\n--- THÀNH CÔNG ---');
        console.log('1. File checkout đã được tạo tại:', filePath);
        console.log('2. Vui lòng mở file này bằng trình duyệt để thanh toán.');
        console.log('3. Hãy chắc chắn backend của bạn đang chạy và có thể nhận Webhook (dùng ngrok nếu chạy localhost).');
        
    } catch (error) {
        console.error('Lỗi:', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

main();
